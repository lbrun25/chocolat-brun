'use client'

import { useAuth } from '@/contexts/AuthContext'

/**
 * Accès aux tarifs professionnels : réservé aux comptes dont le SIRET
 * a été vérifié auprès du répertoire Sirene (INSEE) à l'inscription.
 */
export function useProAccess() {
  const { user, profile, loading } = useAuth()

  const p = profile as (typeof profile & {
    siret?: string | null
    raison_sociale?: string | null
    siret_verified_at?: string | null
  }) | null

  const hasAccess = Boolean(user && p?.siret && p?.siret_verified_at)

  return {
    /** true : les tarifs peuvent être affichés */
    hasAccess,
    /** true tant que la session n'est pas résolue (évite un flash « tarifs masqués ») */
    loading,
    /** true : connecté mais sans SIRET vérifié (compte particulier) */
    needsSiret: Boolean(user && !p?.siret),
    raisonSociale: p?.raison_sociale ?? p?.company ?? null,
    siret: p?.siret ?? null,
  }
}
