'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const RESET_PAGE = '/compte/reinitialiser-mot-de-passe'

/**
 * Redirige vers la page de réinitialisation de mot de passe quand :
 * 1. Supabase renvoie une erreur (lien expiré, invalide, etc.) dans le hash
 * 2. On reçoit des tokens de récupération (access_token + type=recovery) mais qu'on
 *    a atterri sur une autre page (ex: page d'accueil). Cela peut arriver quand
 *    un autre onglet est ouvert : Supabase peut rediriger vers Site URL au lieu
 *    de redirect_to.
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
    const accessToken = params.get('access_token')
    const type = params.get('type')

    const isAuthError =
      (error === 'access_denied' && (errorCode === 'otp_expired' || errorCode === 'email_not_confirmed')) ||
      (errorDescription?.toLowerCase().includes('invalid') && errorDescription?.toLowerCase().includes('expired'))

    const isRecoveryTokens = accessToken && type === 'recovery'

    if (pathname === RESET_PAGE) return

    if (isAuthError || isRecoveryTokens) {
      window.location.replace(`${RESET_PAGE}${hash}`)
    }
  }, [pathname])

  return null
}
