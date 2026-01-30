import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cart, customerInfo, totalTTC } = body

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        { error: 'Le panier est vide' },
        { status: 400 }
      )
    }

    // Créer les line items pour Stripe
    const lineItems = cart.map((item: any) => {
      const priceForPackaging = item.priceHT * 1.055 // Prix TTC
      const pieces = 40 // 40 pièces = 200g pour les produits particuliers
      
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${item.productName} - ${pieces} pièces`,
            description: `Conditionnement de ${pieces} napolitains (${pieces * 5}g net)`,
            images: [], // Vous pouvez ajouter des images si nécessaire
          },
          unit_amount: Math.round(priceForPackaging * 100), // Stripe utilise les centimes
        },
        quantity: item.quantity,
      }
    })

    // Créer la session de checkout Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/commande/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout`,
      customer_email: customerInfo.email,
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU'],
      },
      metadata: {
        customerFirstName: customerInfo.firstName,
        customerLastName: customerInfo.lastName,
        customerPhone: customerInfo.phone,
        customerCompany: customerInfo.company || '',
        deliveryNotes: customerInfo.deliveryNotes || '',
        orderItems: JSON.stringify(cart),
        totalHT: body.totalHT.toString(),
        totalTTC: totalTTC.toString(),
      },
      locale: 'fr',
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error('Erreur lors de la création de la session Stripe:', error)
    return NextResponse.json(
      { error: error.message || 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
