export type CookieConsent = 'accepted' | 'rejected' | 'customized'

export const COOKIE_CONSENT_KEY = 'cookie-consent'
export const COOKIE_CONSENT_EVENT = 'cookie-consent-change'

export function saveCookieConsent(value: CookieConsent) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value)
  } catch {
    // localStorage indisponible : le choix ne sera pas mémorisé
  }
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))
}

/** La mesure d'audience n'est autorisée qu'après un « Tout accepter » (ou l'option dédiée cochée). */
export function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted'
  } catch {
    return false
  }
}
