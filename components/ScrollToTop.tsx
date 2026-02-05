'use client'

import { useEffect } from 'react'

/**
 * Remet la page en haut au chargement / rafraîchissement pour éviter
 * que le navigateur restaure l’ancienne position (souvent en bas).
 */
export default function ScrollToTop() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])
  return null
}
