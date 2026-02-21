/**
 * Crée une commande en base à partir d'une session Stripe checkout complétée.
 * Utilisé par le webhook et par l'API sync-order (fallback si le webhook n'a pas encore tourné).
 */
import type Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { sendOrderConfirmationEmail } from '@/lib/order-confirmation-email'
import { sendOrderNotificationToOwner } from '@/lib/order-notification-owner-email'

type SessionWithShipping = Stripe.Checkout.Session & {
  shipping_details?: { address?: { line1?: string; city?: string; postal_code?: string; country?: string } }
}

export async function createOrderFromStripeSession(session: SessionWithShipping): Promise<{ orderId?: string; orderNumber?: string; created: boolean; error?: string }> {
  try {
    // Vérifier si la commande existe déjà (idempotence)
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id, order_number')
      .eq('stripe_session_id', session.id)
      .maybeSingle()

    if (existingOrder) {
      // Commande déjà créée (ex. par le webhook) : renvoyer l'email de confirmation au cas où l'envoi aurait échoué
      const email = session.customer_email || (session.metadata?.customerEmail as string) || ''
      if (email) {
        const customerFirstName = (session.metadata?.customerFirstName as string) || ''
        const customerLastName = (session.metadata?.customerLastName as string) || ''
        const customerPhone = (session.metadata?.customerPhone as string) || ''
        const customerCompany = (session.metadata?.customerCompany as string) || ''
        const deliveryNotes = (session.metadata?.deliveryNotes as string) || ''
        const stripeAddr = session.shipping_details?.address
        const shippingAddressLine = stripeAddr?.line1 || (session.metadata?.shippingAddress as string) || ''
        const shippingCity = stripeAddr?.city || (session.metadata?.shippingCity as string) || ''
        const shippingPostalCode = stripeAddr?.postal_code || (session.metadata?.shippingPostalCode as string) || ''
        const shippingCountry = stripeAddr?.country || (session.metadata?.shippingCountry as string) || 'France'
        const orderItems = session.metadata?.orderItems
          ? (JSON.parse(session.metadata.orderItems as string) as Array<{ productName: string; packaging: string; quantity: number; priceTTC: number }>)
          : []
        const totalHT = parseFloat((session.metadata?.totalHT as string) || '0')
        const totalTTC = parseFloat((session.metadata?.totalTTC as string) || '0')
        const shippingCost = parseFloat((session.metadata?.shippingCost as string) || '0')
        const totalWithShipping = parseFloat((session.metadata?.totalWithShipping as string) || '0')
        const emailPayload = {
          customerFirstName,
          customerLastName,
          customerEmail: email,
          customerPhone: customerPhone || undefined,
          customerCompany: customerCompany || undefined,
          shippingAddressLine,
          shippingCity,
          shippingPostalCode,
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
          orderReference: existingOrder?.order_number || session.id?.substring(0, 24) || existingOrder.id,
          orderDate: new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
        }
        const emailResult = await sendOrderConfirmationEmail(emailPayload)
        if (!emailResult.ok) console.error('Email de confirmation (commande existante) non envoyé:', emailResult.error)
      }
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

    // Adresse : priorité à Stripe shipping_details, sinon metadata (saisie au checkout)
    const stripeAddress = session.shipping_details?.address
    const shippingAddressLine = stripeAddress?.line1
      || (session.metadata?.shippingAddress as string) || ''
    const shippingCity = stripeAddress?.city
      || (session.metadata?.shippingCity as string) || ''
    const shippingPostalCode = stripeAddress?.postal_code
      || (session.metadata?.shippingPostalCode as string) || ''
    const shippingCountry = stripeAddress?.country
      || (session.metadata?.shippingCountry as string) || 'France'

    const orderItems = session.metadata?.orderItems
      ? (JSON.parse(session.metadata.orderItems as string) as Array<{ productId?: string; productName: string; packaging: string; quantity: number; priceTTC: number }>)
      : []

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
          console.error('Erreur création profil invité:', profileError)
          return { created: false, error: profileError.message }
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

    if (orderError) {
      console.error('Erreur création commande:', orderError)
      return { created: false, error: orderError.message }
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

    // 4. Email de confirmation
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
      orderReference: order?.order_number || session.id?.substring(0, 24) || order.id,
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

    return { orderId: order.id, orderNumber: order.order_number, created: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('createOrderFromStripeSession:', msg)
    return { created: false, error: msg }
  }
}
