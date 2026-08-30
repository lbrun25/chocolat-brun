'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { computeEstimate, getReference, type Estimate } from '@/lib/catalogue'

const STORAGE_KEY = 'chocolat-brun-panier-pro'
/** Nombre maximum de cartons par référence */
export const MAX_CARTONS = 99

interface ProCartContextType {
  /** Nombre de cartons par référence (clé = id de référence) */
  cartons: Record<string, number>
  /** Définit le nombre de cartons d'une référence (0 = retirée du panier) */
  setCartons: (id: string, n: number) => void
  /** Ajoute n cartons à une référence */
  addCartons: (id: string, n?: number) => void
  clear: () => void
  /** Totaux recalculés (sous-total HT, port, TVA, TTC…) */
  estimate: Estimate
  /** Nombre total de cartons, toutes références confondues */
  totalCartons: number
  isEmpty: boolean
  /** false tant que le panier n'a pas été relu depuis localStorage */
  hydrated: boolean
}

const ProCartContext = createContext<ProCartContextType | undefined>(undefined)

function sanitize(raw: unknown): Record<string, number> {
  if (!raw || typeof raw !== 'object') return {}
  const out: Record<string, number> = {}
  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    const n = Math.floor(Number(value))
    // On ignore les références qui n'existent plus au catalogue
    if (Number.isFinite(n) && n > 0 && getReference(id)) {
      out[id] = Math.min(MAX_CARTONS, n)
    }
  }
  return out
}

export function ProCartProvider({ children }: { children: React.ReactNode }) {
  const [cartons, setCartonsState] = useState<Record<string, number>>({})
  const [hydrated, setHydrated] = useState(false)

  // Relecture du panier au montage (évite toute erreur d'hydratation)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setCartonsState(sanitize(JSON.parse(saved)))
    } catch {
      // panier illisible : on repart d'un panier vide
    }
    setHydrated(true)
  }, [])

  // Persistance
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartons))
    } catch {
      // quota / mode privé : le panier reste utilisable pour la session
    }
  }, [cartons, hydrated])

  const setCartons = useCallback((id: string, n: number) => {
    if (!getReference(id)) return
    const value = Math.min(MAX_CARTONS, Math.max(0, Math.floor(Number.isFinite(n) ? n : 0)))
    setCartonsState((prev) => {
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

  const addCartons = useCallback(
    (id: string, n: number = 1) => {
      setCartonsState((prev) => {
        if (!getReference(id)) return prev
        const value = Math.min(MAX_CARTONS, Math.max(0, (prev[id] ?? 0) + n))
        if (value === 0) {
          const next = { ...prev }
          delete next[id]
          return next
        }
        return { ...prev, [id]: value }
      })
    },
    []
  )

  const clear = useCallback(() => setCartonsState({}), [])

  const estimate = useMemo(
    () => computeEstimate(Object.entries(cartons).map(([id, n]) => ({ id, cartons: n }))),
    [cartons]
  )

  const totalCartons = estimate.cartons

  const value = useMemo(
    () => ({
      cartons,
      setCartons,
      addCartons,
      clear,
      estimate,
      totalCartons,
      isEmpty: estimate.lines.length === 0,
      hydrated,
    }),
    [cartons, setCartons, addCartons, clear, estimate, totalCartons, hydrated]
  )

  return <ProCartContext.Provider value={value}>{children}</ProCartContext.Provider>
}

export function useProCart(): ProCartContextType {
  const context = useContext(ProCartContext)
  if (context === undefined) {
    throw new Error('useProCart doit être utilisé dans un ProCartProvider')
  }
  return context
}
