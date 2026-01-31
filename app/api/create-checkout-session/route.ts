import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPackagingPrices } from '@/types/product'
import { getProductById } from '@/lib/products'
import { calculateShippingCost } from '@/lib/shipping'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cart, customerInfo, totalTTC, shippingCost, totalWithShipping } = body

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        { error: 'Le panier est vide' },
        { status: 400 }
      )
    }

    // Calculer le poids total pour vérifier les frais de port côté serveur
    let totalWeight = 0
    const lineItems = cart.map((item: any) => {
      const product = getProductById(item.productId)
      if (!product) {
        throw new Error(`Produit introuvable: ${item.productId}`)
      }
      const packagingInfo = getPackagingPrices(product)[item.packaging as '40' | '100']
      const priceTTC = packagingInfo.priceTTC
      const pieces = packagingInfo.pieces
      const weight = packagingInfo.weight
      
      totalWeight += weight * item.quantity
      
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${item.productName} - ${pieces} pièces`,
            description: `Conditionnement de ${pieces} napolitains (${weight}g net)`,
            images: [], // Vous pouvez ajouter des images si nécessaire
          },
          unit_amount: Math.round(priceTTC * 100), // Stripe utilise les centimes
        },
        quantity: item.quantity,
      }
    })

    // Vérifier et ajouter les frais de port si nécessaire
    const serverShippingCost = calculateShippingCost(totalWeight, totalTTC)
    if (serverShippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Frais de port',
            description: 'Livraison en France Métropolitaine',
          },
          unit_amount: Math.round(serverShippingCost * 100),
        },
        quantity: 1,
      })
    }

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
        shippingCost: serverShippingCost.toString(),
        totalWithShipping: (totalTTC + serverShippingCost).toString(),
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
