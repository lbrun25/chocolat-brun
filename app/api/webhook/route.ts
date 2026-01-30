import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(request: NextRequest) {
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
      
      // Ici, vous pouvez :
      // - Enregistrer la commande dans une base de données
      // - Envoyer un email de confirmation
      // - Mettre à jour le stock
      // - etc.
      
      console.log('Paiement réussi pour la session:', session.id)
      console.log('Métadonnées:', session.metadata)
      
      // Exemple : Envoyer un email de confirmation
      // await sendOrderConfirmationEmail(session)
      
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
