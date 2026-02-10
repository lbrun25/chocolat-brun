'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'chocolat_brun_pro_siret'
const CACHE_DAYS = 30

export interface ProSiretCache {
  siret: string
  raisonSociale: string
  validatedAt: string
}

function getCached(): ProSiretCache | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as ProSiretCache
    const validatedAt = new Date(data.validatedAt).getTime()
    const expiry = validatedAt + CACHE_DAYS * 24 * 60 * 60 * 1000
    if (Date.now() > expiry) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return data
  } catch {
    return null
  }
}

function setCached(data: ProSiretCache) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

function clearCached() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {}
}

interface ProSiretContextValue {
  /** SIRET validé en cache, ou null si pas encore validé / expiré */
  cached: ProSiretCache | null
  /** Valide un SIRET via l’API et met en cache si OK */
  validateSiret: (siret: string) => Promise<{ valid: boolean; error?: string; raisonSociale?: string }>
  /** Supprime le cache (pour se “déconnecter” du mode pro) */
  clearCache: () => void
  /** Chargement en cours (validation en cours) */
  validating: boolean
}

const ProSiretContext = createContext<ProSiretContextValue | null>(null)

export function ProSiretProvider({ children }: { children: ReactNode }) {
  const [cached, setCachedState] = useState<ProSiretCache | null>(null)
  const [validating, setValidating] = useState(false)

  useEffect(() => {
    setCachedState(getCached())
  }, [])

  const validateSiret = useCallback(async (siret: string) => {
    setValidating(true)
    try {
      const res = await fetch('/api/siret/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siret: siret.trim() }),
      })
      const data = await res.json()

      if (data.valid && data.siret && data.raisonSociale) {
        const payload: ProSiretCache = {
          siret: data.siret,
          raisonSociale: data.raisonSociale,
          validatedAt: new Date().toISOString(),
        }
        setCached(payload)
        setCachedState(payload)
        return { valid: true, raisonSociale: data.raisonSociale }
      }

      return {
        valid: false,
        error: data.error || 'SIRET invalide',
      }
    } catch (e) {
      return {
        valid: false,
        error: 'Impossible de vérifier le SIRET. Réessayez plus tard.',
      }
    } finally {
      setValidating(false)
    }
  }, [])

  const clearCache = useCallback(() => {
    clearCached()
    setCachedState(null)
  }, [])

  return (
    <ProSiretContext.Provider
      value={{ cached, validateSiret, clearCache, validating }}
    >
      {children}
    </ProSiretContext.Provider>
  )
}

export function useProSiret() {
  const ctx = useContext(ProSiretContext)
  if (!ctx) {
    throw new Error('useProSiret must be used within ProSiretProvider')
  }
  return ctx
}
