'use client'

import { useEffect } from 'react'

/**
 * Envoie un ping à Supabase au chargement du site pour éviter
 * que l'instance (free tier) se mette en pause après inactivité.
 */
export default function SupabaseKeepAlive() {
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
    if (!url || !key) return

    // Endpoint health officiel Supabase (GoTrue) - requête légère
    fetch(`${url}/auth/v1/health`, {
      method: 'GET',
      headers: { apikey: key },
      keepalive: true,
    }).catch(() => {
      // Ignorer les erreurs (réseau, etc.) pour ne pas impacter l'UX
    })
  }, [])

  return null
}
