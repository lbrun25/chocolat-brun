import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getBaseUrlFromRequest } from '@/lib/get-base-url'
import { MAX_QUANTITE, computeTotalComtoises, formatEUR, round2 } from '@/lib/belles-comtoises'
import { TVA_RATE } from '@/lib/catalogue'
import { FREE_SHIPPING_THRESHOLD, calculateShippingCost } from '@/lib/shipping'
import { writeOrderItemsMetadata, type OrderItemMetadata } from '@/lib/order-items-metadata'

export const dynamic = 'force-dynamic'

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key, { apiVersion: '2026-01-28.clover' })
}

function str(v: unknown, max = 200): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
}

/**
 * Commande grand public « Les Belles Comtoises ».
 * Prix TTC recalculés côté serveur ; l'adresse de livraison est collectée par Stripe.
 */
export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
    }

    if (str(body.website)) {
      return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
    }

    // Les quantités sont fusionnées par référence puis plafonnées côté serveur :
    // le plafond appliqué par le navigateur ne doit jamais faire autorité.
    const parPanier = new Map<string, number>()
    if (Array.isArray(body.items)) {
      for (const l of body.items as Array<{ id?: unknown; quantite?: unknown }>) {
        const id = str(l?.id, 60)
        const q = Math.floor(Number(l?.quantite))
        if (!id || !Number.isFinite(q) || q <= 0) continue
        parPanier.set(id, Math.min(MAX_QUANTITE, (parPanier.get(id) ?? 0) + q))
      }
    }
    const items = [...parPanier].map(([id, quantite]) => ({ id, quantite }))

    const total = computeTotalComtoises(items, calculateShippingCost, FREE_SHIPPING_THRESHOLD)

    if (total.lignes.length === 0) {
      return NextResponse.json({ error: 'Votre panier est vide.' }, { status: 400 })
    }

    const prenom = str(body.prenom, 80)
    const nom = str(body.nom, 80)
    const email = str(body.email, 200)
    const telephone = str(body.telephone, 40)
    const notes = str(body.notes, 500)

    if (!nom || !email) {
      return NextResponse.json({ error: 'Merci d’indiquer votre nom et votre email.' }, { status: 400 })
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = total.lignes.map((l) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: l.coffret.nom,
          description: `${l.coffret.pieces} vaches en chocolat · ${l.coffret.detail}`,
        },
        unit_amount: Math.round(l.coffret.prixTTC * 100),
      },
      quantity: l.quantite,
    }))

    if (total.port > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Frais de port',
            description: `Livraison France métropolitaine — offerte dès ${formatEUR(FREE_SHIPPING_THRESHOLD)} d’achat`,
          },
          unit_amount: Math.round(total.port * 100),
        },
        quantity: 1,
      })
    }

    const orderItems: OrderItemMetadata[] = total.lignes.map((l) => ({
      productId: l.coffret.id,
      productName: l.coffret.nom,
      packaging: `${l.coffret.pieces} pièces`,
      quantity: l.quantite,
      priceTTC: l.coffret.prixTTC,
    }))

    const baseUrl = getBaseUrlFromRequest(request)
    const stripe = getStripe()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      locale: 'fr',
      customer_email: email,
      // Le forfait de port annoncé ne couvre que la France métropolitaine.
      shipping_address_collection: { allowed_countries: ['FR'] },
      success_url: `${baseUrl}/panier-comtoises/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/panier-comtoises`,
      metadata: {
        orderType: 'comtoises',
        customerFirstName: prenom,
        customerLastName: nom,
        customerPhone: telephone,
        customerCompany: '',
        deliveryNotes: notes,
        ...writeOrderItemsMetadata(orderItems),
        // Contrat attendu par l'email de confirmation et la table `orders` :
        // totalTTC = sous-total marchandises TTC, shippingCost = port, totalWithShipping = montant débité.
        totalHT: round2(total.sousTotalTTC / (1 + TVA_RATE)).toString(),
        totalTTC: total.sousTotalTTC.toString(),
        shippingCost: total.port.toString(),
        totalWithShipping: total.totalTTC.toString(),
      },
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue'
    console.error('Erreur création session Stripe (boutique):', message)
    return NextResponse.json(
      { error: 'Le paiement n’a pas pu être ouvert. Réessayez ou contactez-nous au 03 81 44 07 36.' },
      { status: 500 }
    )
  }
}
