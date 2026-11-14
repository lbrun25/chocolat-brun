/**
 * Crée une commande en base à partir d'une session Stripe checkout complétée, puis envoie les emails
 * (client et maison). Appelée par le webhook ET par l'API sync-order (page de confirmation), en parallèle :
 * seul l'appel qui crée la commande envoie les emails. L'index unique de
 * supabase/migrations/20261114000000_orders_stripe_session_unique.sql ferme la course entre les deux.
 */
import type Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { sendOrderConfirmationEmail } from '@/lib/order-confirmation-email'
import { sendOrderNotificationToOwner } from '@/lib/order-notification-owner-email'
import { readOrderItemsMetadata } from '@/lib/order-items-metadata'
import { adresseLivraison } from '@/lib/stripe-shipping'

export async function createOrderFromStripeSession(session: Stripe.Checkout.Session): Promise<{ orderId?: string; orderNumber?: string; created: boolean; error?: string }> {
  try {
    // Vérifier si la commande existe déjà (idempotence)
    // limit(1) et non maybeSingle() : s'il existe déjà des doublons, maybeSingle() renverrait une erreur
    // (data null) et une commande de plus serait créée.
    const { data: dejaCreees } = await supabase
      .from('orders')
      .select('id, order_number')
      .eq('stripe_session_id', session.id)
      .order('created_at', { ascending: true })
      .limit(1)
    const existingOrder = dejaCreees?.[0]

    if (existingOrder) {
      // Déjà créée par l'autre chemin (webhook ou page de confirmation), qui a envoyé les emails.
      // Ne rien renvoyer : la page de confirmation rappelle cette fonction à chaque chargement.
      return { orderId: existingOrder.id, orderNumber: existingOrder.order_number, created: false }
    }

    const email = session.customer_email || (session.metadata?.customerEmail as string) || ''
    const customerFirstName = (session.metadata?.customerFirstName as string) || ''
    const customerLastName = (session.metadata?.customerLastName as string) || ''
    const customerPhone = (session.metadata?.customerPhone as string) || ''
    const customerCompany = (session.metadata?.customerCompany as string) || ''
    const deliveryNotes = (session.metadata?.deliveryNotes as string) || ''

    // Adresse de facturation (metadata checkout)
    const billingFirstName = (session.metadata?.bFirstName as string) || ''
    const billingLastName = (session.metadata?.bLastName as string) || ''
    const billingPhone = (session.metadata?.bPhone as string) || ''
    const billingEmail = (session.metadata?.bEmail as string) || ''
    const billingAddress = (session.metadata?.bAddress as string) || ''
    const billingCity = (session.metadata?.bCity as string) || ''
    const billingPostalCode = (session.metadata?.bPostalCode as string) || ''
    const billingCountry = (session.metadata?.bCountry as string) || ''

    // Adresse : page de paiement Stripe (Belles Comtoises) ou metadata (commandes pros)
    const {
      ligne: shippingAddressLine,
      ville: shippingCity,
      codePostal: shippingPostalCode,
      pays: shippingCountry,
    } = adresseLivraison(session)

    const orderItems = readOrderItemsMetadata(session.metadata as Record<string, string> | null)

    // Renseigné si un écrit en base échoue : on continue quand même jusqu'aux emails
    let erreurBase: string | null = null

    const totalHT = parseFloat((session.metadata?.totalHT as string) || '0')
    const totalTTC = parseFloat((session.metadata?.totalTTC as string) || '0')
    const shippingCost = parseFloat((session.metadata?.shippingCost as string) || '0')
    const totalWithShipping = parseFloat((session.metadata?.totalWithShipping as string) || '0')

    if (!email) {
      return { created: false, error: 'Email client manquant' }
    }

    // 1. Créer ou récupérer le profil pour lier la commande
    let profileId: string | null = (session.metadata?.profileId as string) || null

    // Données d'identité du profil = client / livraison uniquement (pas la facturation, qui peut être un autre nom)
    const profileFirstName = customerFirstName
    const profileLastName = customerLastName
    const profilePhone = customerPhone
    const profileCompany = customerCompany

    if (profileId) {
      const { data: profileCheck } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, phone, company')
        .eq('id', profileId)
        .maybeSingle()
      if (!profileCheck) {
        profileId = null
      } else {
        // Mettre à jour le profil avec les données client (livraison), pas la facturation
        await supabase
          .from('profiles')
          .update({
            first_name: profileFirstName || profileCheck.first_name,
            last_name: profileLastName || profileCheck.last_name,
            phone: profilePhone || profileCheck.phone,
            company: profileCompany ?? profileCheck.company,
            updated_at: new Date().toISOString(),
          })
          .eq('id', profileId)
      }
    }

    if (!profileId) {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, phone, company')
        .eq('email', email)
        .maybeSingle()

      if (existingProfile) {
        profileId = existingProfile.id
        await supabase
          .from('profiles')
          .update({
            first_name: profileFirstName || existingProfile.first_name,
            last_name: profileLastName || existingProfile.last_name,
            phone: profilePhone || existingProfile.phone,
            company: profileCompany ?? existingProfile.company,
            updated_at: new Date().toISOString(),
          })
          .eq('id', profileId)
      } else {
        const { data: newProfile, error: profileError } = await supabase
          .from('profiles')
          .insert({
            email,
            first_name: profileFirstName,
            last_name: profileLastName,
            phone: profilePhone,
            company: profileCompany,
            is_guest: true,
            user_id: null,
          })
          .select('id')
          .single()

        if (profileError) {
          // On n'interrompt pas : la commande et les emails ne dépendent pas du profil.
          console.error('Erreur création profil invité:', profileError)
          erreurBase = profileError.message
        }
        if (newProfile) profileId = newProfile.id
      }
    }

    // 2. Créer la commande (livraison + facturation)
    const orderInsert: Record<string, unknown> = {
      user_id: profileId,
      email,
      stripe_session_id: session.id,
      stripe_payment_intent_id: (session.payment_intent as string) || '',
      status: 'paid',
      customer_first_name: customerFirstName,
      customer_last_name: customerLastName,
      customer_phone: customerPhone,
      customer_company: customerCompany,
      shipping_address: shippingAddressLine,
      shipping_city: shippingCity,
      shipping_postal_code: shippingPostalCode,
      shipping_country: shippingCountry,
      delivery_notes: deliveryNotes,
      total_ht: totalHT,
      total_ttc: totalTTC,
      shipping_cost: shippingCost,
      total_with_shipping: totalWithShipping,
    }
    const hasAnyBilling =
      billingFirstName?.trim() ||
      billingLastName?.trim() ||
      billingAddress?.trim() ||
      billingCity?.trim() ||
      billingPostalCode?.trim() ||
      billingEmail?.trim() ||
      billingPhone?.trim()
    if (hasAnyBilling) {
      orderInsert.billing_first_name = billingFirstName?.trim() || null
      orderInsert.billing_last_name = billingLastName?.trim() || null
      orderInsert.billing_phone = billingPhone?.trim() || null
      orderInsert.billing_email = billingEmail?.trim() || null
      orderInsert.billing_address = billingAddress?.trim() || null
      orderInsert.billing_city = billingCity?.trim() || null
      orderInsert.billing_postal_code = billingPostalCode?.trim() || null
      orderInsert.billing_country = billingCountry?.trim() || null
    }
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderInsert)
      .select('id, order_number')
      .single()

    if (orderError?.code === '23505') {
      // Index unique sur stripe_session_id : l'autre chemin a créé la commande au même instant
      // et envoie les emails. Rien à faire ici.
      const { data: gagnantes } = await supabase
        .from('orders')
        .select('id, order_number')
        .eq('stripe_session_id', session.id)
        .limit(1)
      return { orderId: gagnantes?.[0]?.id, orderNumber: gagnantes?.[0]?.order_number, created: false }
    }

    if (orderError) {
      // Le paiement est encaissé : on poursuit pour que le client et la maison
      // reçoivent malgré tout leur email, construit à partir des metadata Stripe.
      console.error('Erreur création commande:', orderError)
      erreurBase = orderError.message
    }

    // 3. Créer les items de commande
    if (order && orderItems.length > 0) {
      const itemsToInsert = orderItems.map((item) => ({
        order_id: order.id,
        product_id: item.productId || null,
        product_name: item.productName,
        packaging: item.packaging,
        quantity: item.quantity,
        price_ttc: item.priceTTC,
      }))

      const { error: itemsError } = await supabase.from('order_items').insert(itemsToInsert)
      if (itemsError) console.error('Erreur items de commande:', itemsError)
    }

    // 4. Emails — envoyés même si l'enregistrement en base a échoué (voir plus bas) :
    //    toutes les données de la commande viennent des metadata Stripe, pas de la base.
    const emailPayload = {
      customerFirstName: customerFirstName || '',
      customerLastName: customerLastName || '',
      customerEmail: email,
      customerPhone: customerPhone || undefined,
      customerCompany: customerCompany || undefined,
      shippingAddressLine: shippingAddressLine || '',
      shippingCity: shippingCity || '',
      shippingPostalCode: shippingPostalCode || '',
      shippingCountry: shippingCountry || 'France',
      deliveryNotes: deliveryNotes || undefined,
      orderItems: orderItems.map((item) => ({
        product_name: item.productName,
        packaging: item.packaging,
        quantity: item.quantity,
        price_ttc: item.priceTTC,
      })),
      totalHT,
      totalTTC,
      shippingCost,
      totalWithShipping,
      orderReference: order?.order_number || session.id?.substring(0, 24) || '',
      orderDate: new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    }
    const emailResult = await sendOrderConfirmationEmail(emailPayload)
    if (!emailResult.ok) console.error('Email de confirmation non envoyé:', emailResult.error)

    // Notification au propriétaire (patisseriebrun-25@orange.fr)
    const ownerPayload = {
      ...emailPayload,
      billingFirstName: billingFirstName || undefined,
      billingLastName: billingLastName || undefined,
      billingEmail: billingEmail?.trim() || undefined,
      billingPhone: billingPhone || undefined,
      billingAddress: billingAddress || undefined,
      billingCity: billingCity || undefined,
      billingPostalCode: billingPostalCode || undefined,
      billingCountry: billingCountry || undefined,
    }
    const ownerResult = await sendOrderNotificationToOwner(ownerPayload)
    if (!ownerResult.ok) console.error('Notification propriétaire non envoyée:', ownerResult.error)

    if (erreurBase || !order) {
      return { created: false, error: erreurBase ?? 'Commande non enregistrée' }
    }
    return { orderId: order.id, orderNumber: order.order_number, created: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('createOrderFromStripeSession:', msg)
    return { created: false, error: msg }
  }
}
