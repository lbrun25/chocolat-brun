'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { useProSiret } from '@/contexts/ProSiretContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Loader2, AlertCircle } from 'lucide-react'

interface ProGateProps {
  children: ReactNode
}

export function ProGate({ children }: ProGateProps) {
  const { cached, validateSiret, clearCache, validating } = useProSiret()
  const [siretInput, setSiretInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const result = await validateSiret(siretInput)
    if (result.valid) {
      setSiretInput('')
    } else {
      setError(result.error ?? 'SIRET invalide')
    }
  }

  // Pendant l’hydratation, ne pas afficher le contenu protégé pour éviter le flash
  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-chocolate-dark" />
      </div>
    )
  }

  if (cached) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen artisan-texture flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-chocolate-dark/10 p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-chocolate-dark/10 p-4">
            <Building2 className="w-12 h-12 text-chocolate-dark" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-chocolate-dark text-center font-serif mb-2">
          Accès professionnel
        </h1>
        <p className="text-chocolate-dark/70 text-center font-sans mb-6">
          Pour accéder aux tarifs et pages réservés aux professionnels, veuillez
          indiquer le numéro SIRET de votre entreprise. Il sera vérifié auprès
          du répertoire officiel (INSEE).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="pro-siret"
              className="block text-sm font-semibold text-chocolate-dark mb-2 font-sans"
            >
              Numéro SIRET (14 chiffres)
            </label>
            <input
              id="pro-siret"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="123 456 789 00012"
              value={siretInput}
              onChange={(e) => {
                setSiretInput(e.target.value.replace(/\D/g, '').slice(0, 14))
                setError(null)
              }}
              className="w-full px-4 py-3 border-2 border-chocolate-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-chocolate-dark focus:border-chocolate-dark font-sans text-lg tracking-wider"
              disabled={validating}
            />
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm font-sans"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={validating || siretInput.replace(/\D/g, '').length !== 14}
            className="w-full bg-chocolate-dark text-chocolate-light px-6 py-3 rounded-xl font-semibold hover:bg-chocolate-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sans flex items-center justify-center gap-2"
          >
            {validating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Vérification en cours...
              </>
            ) : (
              'Valider et accéder'
            )}
          </button>
        </form>

        <p className="text-xs text-chocolate-dark/50 text-center mt-4 font-sans">
          Votre SIRET est vérifié via l’API Sirene (INSEE) et conservé localement
          pour ne pas vous redemander à chaque visite.
        </p>
      </motion.div>
    </div>
  )
}
