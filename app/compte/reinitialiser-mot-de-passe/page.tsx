'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PasswordInput from '@/components/PasswordInput'

export default function ReinitialiserMotDePassePage() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'invalid'>('loading')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    const checkSession = () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (cancelled) return
        const hasHash = typeof window !== 'undefined' && window.location.hash?.length > 0
        if (session?.user) {
          setStatus('ready')
          return
        }
        if (hasHash) {
          setTimeout(checkSession, 400)
        } else {
          setStatus('invalid')
        }
      })
    }

    checkSession()
    const t = setTimeout(() => {
      if (cancelled) return
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!cancelled && !session?.user && status === 'loading') setStatus('invalid')
      })
    }, 3000)

    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    setLoading(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    if (updateError) {
      setError(updateError.message || 'Une erreur est survenue')
      setLoading(false)
      return
    }
    // Redirection complète (full page) pour éviter AbortError lors de la navigation :
    // la navigation client laisse des requêtes Supabase en vol qui sont annulées.
    window.location.assign('/compte')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chocolate-dark mx-auto mb-4" />
          <p className="text-chocolate-dark/70">Vérification du lien...</p>
        </div>
      </div>
    )
  }

  if (status === 'invalid') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <p className="text-chocolate-dark/70 mb-4">
            Lien invalide ou expiré. Les liens de réinitialisation sont valables un temps limité. Demandez-en un nouveau depuis la page de connexion.
          </p>
          <Link
            href="/compte"
            className="inline-block bg-chocolate-dark text-chocolate-light px-6 py-3 rounded-lg font-semibold hover:bg-chocolate-dark/90 transition-colors"
          >
            Retour à mon compte
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-chocolate-dark mb-6 font-serif text-center">
            Nouveau mot de passe
          </h1>
          <p className="text-chocolate-dark/70 mb-6 text-center">
            Choisissez un nouveau mot de passe pour votre compte.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="reset-password" className="block text-sm font-semibold text-chocolate-dark mb-2">
                  Nouveau mot de passe
                </label>
                <PasswordInput
                  id="reset-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <p className="text-xs text-chocolate-dark/60 mt-1">Minimum 6 caractères</p>
              </div>
              <div>
                <label htmlFor="reset-confirm" className="block text-sm font-semibold text-chocolate-dark mb-2">
                  Confirmer le mot de passe
                </label>
                <PasswordInput
                  id="reset-confirm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full bg-chocolate-dark text-chocolate-light px-6 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enregistrement...' : 'Enregistrer le mot de passe'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
