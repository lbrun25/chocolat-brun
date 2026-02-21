import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrderFromStripeSession } from '@/lib/create-order-from-session'

export const dynamic = 'force-dynamic'

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key, { apiVersion: '2026-01-28.clover' })
}

/**
 * Synchronise une commande Stripe vers Supabase.
 * Appelée depuis la page de confirmation pour garantir que la commande
 * apparaisse dans "Mes commandes" même si le webhook n'a pas encore tourné.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { session_id: sessionId } = body

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json(
        { error: 'session_id requis' },
        { status: 400 }
      )
    }

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Session non payée' },
        { status: 400 }
      )
    }

    const result = await createOrderFromStripeSession(session as Parameters<typeof createOrderFromStripeSession>[0])

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      orderId: result.orderId,
      orderNumber: result.orderNumber,
      created: result.created,
    })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Erreur inconnue'
    console.error('sync-order:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
