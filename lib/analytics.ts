import { hasAnalyticsConsent } from '@/lib/cookie-consent'

type EventParams = Record<string, unknown>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const PENDING_ORDER_KEY = 'ga-pending-order'

/**
 * Envoie un événement GA4. No-op sans consentement : `window.gtag` n'existe qu'une fois
 * la balise chargée par GoogleTagManager. Juste après un retour de Stripe, la balise peut
 * ne pas être encore prête : on réessaie quelques fois avant d'abandonner.
 */
export function trackEvent(name: string, params?: EventParams, attempts = 10) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  } else if (attempts > 0) {
    window.setTimeout(() => trackEvent(name, params, attempts - 1), 300)
  }
}

/** Mémorise le panier au moment du paiement pour l'événement `purchase` de la page de succès. */
export function rememberPendingOrder(order: { value: number; items: EventParams[] }) {
  try {
    sessionStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(order))
  } catch {
    // sessionStorage indisponible : l'achat sera suivi sans montant
  }
}

export function trackPurchase(transactionId: string | null) {
  let order: { value?: number; items?: EventParams[] } = {}
  try {
    const raw = sessionStorage.getItem(PENDING_ORDER_KEY)
    if (raw) order = JSON.parse(raw)
    sessionStorage.removeItem(PENDING_ORDER_KEY)
  } catch {
    // ignoré
  }
  trackEvent('purchase', {
    transaction_id: transactionId ?? undefined,
    currency: 'EUR',
    value: order.value,
    items: order.items,
  })
}
