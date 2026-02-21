'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Redirige vers la page de réinitialisation de mot de passe quand Supabase renvoie
 * une erreur (lien expiré, invalide, etc.) dans le hash. Supabase peut rediriger
 * vers la page d'accueil (Site URL) au lieu de redirect_to si la configuration
 * n'est pas correcte.
 */
export default function AuthErrorRedirect() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash
    if (!hash) return

    const params = new URLSearchParams(hash.replace(/^#/, ''))
    const error = params.get('error')
    const errorCode = params.get('error_code')
    const errorDescription = params.get('error_description')

    const isAuthError =
      (error === 'access_denied' && (errorCode === 'otp_expired' || errorCode === 'email_not_confirmed')) ||
      (errorDescription?.toLowerCase().includes('invalid') && errorDescription?.toLowerCase().includes('expired'))

    if (isAuthError && pathname !== '/compte/reinitialiser-mot-de-passe') {
      window.location.replace('/compte/reinitialiser-mot-de-passe')
    }
  }, [pathname])

  return null
}
