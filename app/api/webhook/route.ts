import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrderFromStripeSession } from '@/lib/create-order-from-session'

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
      // Même fonction que la page de confirmation (/api/sync-order), qui tourne au même moment :
      // la commande n'est créée, et les emails envoyés, qu'une seule fois.
      if (session.payment_status === 'paid') {
        const result = await createOrderFromStripeSession(session)
        if (result.error) console.error('Webhook, commande', session.id, ':', result.error)
      }
      // Toujours 200 : un nouvel essai de Stripe ne rattraperait pas une erreur de base et renverrait les emails.
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
