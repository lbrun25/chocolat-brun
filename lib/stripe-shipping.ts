import type Stripe from 'stripe'

export interface AdresseLivraison {
  /** Rue (lignes 1 et 2), précédée du destinataire s'il n'est pas le client (coffret offert) */
  ligne: string
  ville: string
  codePostal: string
  pays: string
}

const PAYS: Record<string, string> = { FR: 'France' }
const normaliser = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/\s+/g, ' ').trim()

/**
 * Adresse de livraison d'une session Stripe Checkout.
 *
 * Belles Comtoises : saisie sur la page de paiement Stripe. Depuis l'API 2025-03-31.basil (le site est en
 * 2026-01-28.clover), Stripe la range dans `collected_information.shipping_details` : l'ancien champ
 * `shipping_details` n'existe plus, et le lire donnait une adresse vide.
 * Commandes pros : saisie sur le site et transmise dans les metadata (shippingAddress, shippingCity…).
 */
export function adresseLivraison(session: Stripe.Checkout.Session): AdresseLivraison {
  const ancien = (session as unknown as { shipping_details?: Stripe.Checkout.Session.CollectedInformation.ShippingDetails | null })
    .shipping_details
  const details = session.collected_information?.shipping_details ?? ancien ?? null
  const a = details?.address
  const m = (session.metadata ?? {}) as Record<string, string>

  const rue = [a?.line1, a?.line2].filter(Boolean).join(', ')
  const client = [m.customerFirstName, m.customerLastName].filter(Boolean).join(' ')
  const destinataire = details?.name?.trim() ?? ''
  const autreDestinataire = destinataire && normaliser(destinataire) !== normaliser(client)

  return {
    ligne: rue ? (autreDestinataire ? `${destinataire}, ${rue}` : rue) : m.shippingAddress || '',
    ville: a?.city || m.shippingCity || '',
    codePostal: a?.postal_code || m.shippingPostalCode || '',
    pays: (a?.country && (PAYS[a.country] ?? a.country)) || m.shippingCountry || 'France',
  }
}
