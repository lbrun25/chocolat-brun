'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { MAX_QUANTITE, computeTotalComtoises, getCoffret, type TotalComtoises } from '@/lib/belles-comtoises'
import { FREE_SHIPPING_THRESHOLD, calculateShippingCost } from '@/lib/shipping'

const STORAGE_KEY = 'chocolat-brun-panier-comtoises'

export { MAX_QUANTITE }

interface ComtoisesCartContextType {
  /** Quantité par coffret (clé = id du coffret) */
  quantites: Record<string, number>
  setQuantite: (id: string, n: number) => void
  ajouter: (id: string, n?: number) => void
  vider: () => void
  total: TotalComtoises
  articles: number
  isEmpty: boolean
  hydrated: boolean
}

const ComtoisesCartContext = createContext<ComtoisesCartContextType | undefined>(undefined)

function sanitize(raw: unknown): Record<string, number> {
  if (!raw || typeof raw !== 'object') return {}
  const out: Record<string, number> = {}
  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    const n = Math.floor(Number(value))
    if (Number.isFinite(n) && n > 0 && getCoffret(id)) out[id] = Math.min(MAX_QUANTITE, n)
  }
  return out
}

export function ComtoisesCartProvider({ children }: { children: React.ReactNode }) {
  const [quantites, setQuantites] = useState<Record<string, number>>({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setQuantites(sanitize(JSON.parse(saved)))
    } catch {
      // panier illisible : on repart d'un panier vide
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quantites))
    } catch {
      // quota / navigation privée
    }
  }, [quantites, hydrated])

  const setQuantite = useCallback((id: string, n: number) => {
    if (!getCoffret(id)) return
    const value = Math.min(MAX_QUANTITE, Math.max(0, Math.floor(Number.isFinite(n) ? n : 0)))
    setQuantites((prev) => {
      if (value === 0) {
        if (!(id in prev)) return prev
        const next = { ...prev }
        delete next[id]
        return next
      }
      if (prev[id] === value) return prev
      return { ...prev, [id]: value }
    })
  }, [])

  const ajouter = useCallback((id: string, n: number = 1) => {
    if (!getCoffret(id)) return
    setQuantites((prev) => {
      const value = Math.min(MAX_QUANTITE, Math.max(0, (prev[id] ?? 0) + n))
      if (value === 0) {
        const next = { ...prev }
        delete next[id]
        return next
      }
      return { ...prev, [id]: value }
    })
  }, [])

  const vider = useCallback(() => setQuantites({}), [])

  const total = useMemo(
    () =>
      computeTotalComtoises(
        Object.entries(quantites).map(([id, quantite]) => ({ id, quantite })),
        calculateShippingCost,
        FREE_SHIPPING_THRESHOLD
      ),
    [quantites]
  )

  const value = useMemo(
    () => ({
      quantites,
      setQuantite,
      ajouter,
      vider,
      total,
      articles: total.articles,
      isEmpty: total.lignes.length === 0,
      hydrated,
    }),
    [quantites, setQuantite, ajouter, vider, total, hydrated]
  )

  return <ComtoisesCartContext.Provider value={value}>{children}</ComtoisesCartContext.Provider>
}

export function useComtoisesCart(): ComtoisesCartContextType {
  const context = useContext(ComtoisesCartContext)
  if (context === undefined) {
    throw new Error('useComtoisesCart doit être utilisé dans un ComtoisesCartProvider')
  }
  return context
}
