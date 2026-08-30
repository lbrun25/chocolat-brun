import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getBaseUrlFromRequest } from '@/lib/get-base-url'
import { TVA_RATE, computeEstimate, prixCartonHT, toTTC } from '@/lib/catalogue'
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

interface Body {
  items?: Array<{ id?: unknown; cartons?: unknown }>
  etablissement?: unknown
  siret?: unknown
  nom?: unknown
  prenom?: unknown
  email?: unknown
  telephone?: unknown
  adresse?: unknown
  codePostal?: unknown
  ville?: unknown
  pays?: unknown
  notes?: unknown
  facturationDifferente?: unknown
  facturation?: {
    etablissement?: unknown
    email?: unknown
    telephone?: unknown
    adresse?: unknown
    codePostal?: unknown
    ville?: unknown
    pays?: unknown
  }
  website?: unknown
}

const PAYS_AUTORISES = ['FR', 'BE', 'CH', 'LU']

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body

    // Honeypot anti-spam
    if (str(body.website)) {
      return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
    }

    // --- Panier : les prix sont TOUJOURS recalculés côté serveur depuis le catalogue ---
    const items = Array.isArray(body.items)
      ? body.items.map((l) => ({ id: str(l?.id, 60), cartons: Math.floor(Number(l?.cartons)) || 0 }))
      : []
    const estimate = computeEstimate(items.filter((l) => l.id && l.cartons > 0))

    if (estimate.lines.length === 0) {
      return NextResponse.json({ error: 'Votre panier est vide.' }, { status: 400 })
    }

    // --- Coordonnées ---
    const etablissement = str(body.etablissement, 160)
    const siret = str(body.siret, 20).replace(/\s/g, '')
    const nom = str(body.nom, 80)
    const prenom = str(body.prenom, 80)
    const email = str(body.email, 200)
    const telephone = str(body.telephone, 40)
    const adresse = str(body.adresse, 200)
    const codePostal = str(body.codePostal, 12)
    const ville = str(body.ville, 100)
    const pays = PAYS_AUTORISES.includes(str(body.pays, 2).toUpperCase())
      ? str(body.pays, 2).toUpperCase()
      : 'FR'
    const notes = str(body.notes, 900)

    if (!etablissement || !nom || !email || !telephone || !adresse || !codePostal || !ville) {
      return NextResponse.json(
        { error: 'Merci de compléter les informations de livraison.' },
        { status: 400 }
      )
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
    }

    // --- Facturation (optionnelle) ---
    const factDiff = body.facturationDifferente === true
    const f = body.facturation ?? {}
    const facturation = factDiff
      ? {
          etablissement: str(f.etablissement, 160),
          email: str(f.email, 200),
          telephone: str(f.telephone, 40),
          adresse: str(f.adresse, 200),
          codePostal: str(f.codePostal, 12),
          ville: str(f.ville, 100),
          pays: PAYS_AUTORISES.includes(str(f.pays, 2).toUpperCase())
            ? str(f.pays, 2).toUpperCase()
            : 'FR',
        }
      : null

    // --- Lignes Stripe : produits HT, port HT, puis TVA ---
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = estimate.lines.map((l) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: `${l.ref.nom} — carton de ${l.ref.conditionnement}`,
          description: `${l.pieces} pièces · ${l.ref.poidsG} g l'unité · prix HT`,
        },
        unit_amount: Math.round(prixCartonHT(l.ref) * 100),
      },
      quantity: l.cartons,
    }))

    if (estimate.port > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Frais de port',
            description: 'Livraison France métropolitaine · prix HT',
          },
          unit_amount: Math.round(estimate.port * 100),
        },
        quantity: 1,
      })
    }

    if (estimate.tva > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `TVA ${(TVA_RATE * 100).toLocaleString('fr-FR')} %`,
            description: `Sur ${estimate.totalHT.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} € HT`,
          },
          unit_amount: Math.round(estimate.tva * 100),
        },
        quantity: 1,
      })
    }

    // --- Metadata : même contrat que le tunnel existant (webhook + sync-order) ---
    const orderItems: OrderItemMetadata[] = estimate.lines.map((l) => ({
      productId: l.ref.id,
      productName: l.ref.nom,
      packaging: `${l.ref.conditionnement} pièces`,
      quantity: l.cartons,
      priceTTC: toTTC(prixCartonHT(l.ref)),
    }))

    // Le SIRET n'a pas de colonne dédiée en base : on le joint aux notes de livraison
    const deliveryNotes = [siret ? `SIRET : ${siret}` : '', notes].filter(Boolean).join(' — ').slice(0, 480)

    const baseUrl = getBaseUrlFromRequest(request)
    const stripe = getStripe()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      locale: 'fr',
      customer_email: email,
      success_url: `${baseUrl}/commander/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/commander`,
      // L'adresse de livraison est saisie sur notre page : pas de double saisie chez Stripe.
      metadata: {
        orderType: 'pro',
        customerFirstName: prenom,
        customerLastName: nom,
        customerPhone: telephone,
        customerCompany: etablissement,
        customerSiret: siret,
        deliveryNotes,
        shippingAddress: adresse,
        shippingCity: ville,
        shippingPostalCode: codePostal,
        shippingCountry: pays,
        ...(facturation && {
          bFirstName: prenom,
          bLastName: nom,
          bEmail: facturation.email || email,
          bPhone: facturation.telephone || telephone,
          bAddress: facturation.adresse,
          bCity: facturation.ville,
          bPostalCode: facturation.codePostal,
          bCountry: facturation.pays,
        }),
        ...writeOrderItemsMetadata(orderItems),
        // L'email de confirmation additionne « sous-total TTC » + « frais de livraison » = « total ».
        // On publie donc le sous-total marchandises seul, et le port converti en TTC.
        totalHT: estimate.sousTotalHT.toString(),
        totalTTC: toTTC(estimate.sousTotalHT).toString(),
        shippingCost: toTTC(estimate.port).toString(),
        totalWithShipping: estimate.totalTTC.toString(),
        cartons: estimate.cartons.toString(),
        pieces: estimate.pieces.toString(),
      },
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue'
    console.error('Erreur création session Stripe (pro):', message)
    return NextResponse.json(
      { error: 'Le paiement n’a pas pu être ouvert. Réessayez ou contactez-nous au 03 81 44 07 36.' },
      { status: 500 }
    )
  }
}
