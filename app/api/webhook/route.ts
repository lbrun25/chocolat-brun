import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { sendOrderConfirmationEmail } from '@/lib/order-confirmation-email'

export const dynamic = 'force-dynamic'

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key, { apiVersion: '2026-01-28.clover' })
}

export async function POST(request: NextRequest) {
  const stripe = getStripe()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Signature manquante' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Erreur de vérification de la signature webhook:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Gérer les différents types d'événements
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const sessionWithShipping = session as Stripe.Checkout.Session & {
        shipping_details?: { address?: { line1?: string; city?: string; postal_code?: string; country?: string } }
      }

      try {
        const email = session.customer_email || session.metadata?.customerEmail || ''
        const customerFirstName = session.metadata?.customerFirstName || ''
        const customerLastName = session.metadata?.customerLastName || ''
        const customerPhone = session.metadata?.customerPhone || ''
        const customerCompany = session.metadata?.customerCompany || ''
        const deliveryNotes = session.metadata?.deliveryNotes || ''
        
        // Adresse : priorité à Stripe shipping_details, sinon metadata (saisie au checkout)
        const stripeAddress = sessionWithShipping.shipping_details?.address
        const shippingAddressLine = stripeAddress?.line1
          || (session.metadata?.shippingAddress as string) || ''
        const shippingCity = stripeAddress?.city
          || (session.metadata?.shippingCity as string) || ''
        const shippingPostalCode = stripeAddress?.postal_code
          || (session.metadata?.shippingPostalCode as string) || ''
        const shippingCountry = stripeAddress?.country
          || (session.metadata?.shippingCountry as string) || 'France'
        
        // Parser les items de commande
        const orderItems = session.metadata?.orderItems 
          ? JSON.parse(session.metadata.orderItems)
          : []
        
        const totalHT = parseFloat(session.metadata?.totalHT || '0')
        const totalTTC = parseFloat(session.metadata?.totalTTC || '0')
        const shippingCost = parseFloat(session.metadata?.shippingCost || '0')
        const totalWithShipping = parseFloat(session.metadata?.totalWithShipping || '0')
        
        // 1. Créer ou récupérer le profil pour lier la commande
        let profileId: string | null = session.metadata?.profileId as string | undefined || null
        
        if (profileId) {
          // Vérifier que le profileId existe (utilisateur connecté au checkout)
          const { data: profileCheck } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', profileId)
            .single()
          if (!profileCheck) profileId = null
        }
        
        if (!profileId && email) {
          // Fallback : rechercher par email
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id, first_name, last_name, phone, company')
            .eq('email', email)
            .single()
          
          if (existingProfile) {
            profileId = existingProfile.id
            // Mettre à jour les informations si nécessaire
            await supabase
              .from('profiles')
              .update({
                first_name: customerFirstName || existingProfile?.first_name,
                last_name: customerLastName || existingProfile?.last_name,
                phone: customerPhone || existingProfile?.phone,
                company: customerCompany || existingProfile?.company,
                updated_at: new Date().toISOString(),
              })
              .eq('id', profileId)
          } else {
            // Créer un nouveau profil invité
            const { data: newProfile, error: profileError } = await supabase
              .from('profiles')
              .insert({
                email,
                first_name: customerFirstName,
                last_name: customerLastName,
                phone: customerPhone,
                company: customerCompany,
                is_guest: true,
                user_id: null,
              })
              .select('id')
              .single()
            
            if (profileError) {
              console.error('Erreur lors de la création du profil invité:', profileError)
            } else if (newProfile) {
              profileId = newProfile.id
            }
          }
        }
        
        // 2. Créer la commande
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: profileId,
            email,
            stripe_session_id: session.id,
            stripe_payment_intent_id: session.payment_intent as string,
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
          })
          .select('id')
          .single()
        
        if (orderError) {
          console.error('Erreur lors de la création de la commande:', orderError)
          throw orderError
        }
        
        // 3. Créer les items de commande
        if (order && orderItems.length > 0) {
          const itemsToInsert = orderItems.map((item: any) => ({
            order_id: order.id,
            product_id: item.productId,
            product_name: item.productName,
            packaging: item.packaging,
            quantity: item.quantity,
            price_ttc: item.priceTTC,
          }))
          
          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(itemsToInsert)
          
          if (itemsError) {
            console.error('Erreur lors de la création des items de commande:', itemsError)
          }
        }
        
        console.log('Commande créée avec succès:', order.id)
        console.log('Profil invité:', profileId)

        // Envoyer l'email de confirmation (si RESEND_API_KEY est défini)
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
          orderItems: orderItems.map((item: any) => ({
            product_name: item.productName,
            packaging: item.packaging,
            quantity: item.quantity,
            price_ttc: item.priceTTC,
          })),
          totalHT,
          totalTTC,
          shippingCost,
          totalWithShipping,
          orderReference: session.id?.substring(0, 24) || order.id,
          orderDate: new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
        }
        const emailResult = await sendOrderConfirmationEmail(emailPayload)
        if (!emailResult.ok) {
          console.error('Email de confirmation non envoyé:', emailResult.error)
        }

      } catch (error: any) {
        console.error('Erreur lors du traitement de la commande:', error)
        // Ne pas retourner d'erreur pour éviter que Stripe réessaie indéfiniment
        // Vous pouvez logger l'erreur dans un service de monitoring
      }
      
      break
    }
    
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('Paiement réussi:', paymentIntent.id)
      break
    }
    
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('Échec du paiement:', paymentIntent.id)
      break
    }
    
    default:
      console.log(`Événement non géré: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
