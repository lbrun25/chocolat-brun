'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PasswordInput from '@/components/PasswordInput'

export default function CreerMotDePassePage() {
  const { user, profile, convertGuestToStandard } = useAuth()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!password || password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (!user || !profile || !profile.is_guest) {
      setError('Vous n\'avez pas de profil invité à convertir')
      return
    }

    setLoading(true)

    const { error: convertError } = await convertGuestToStandard(password)

    if (convertError) {
      setError(convertError.message || 'Erreur lors de la création du mot de passe')
      setLoading(false)
    } else {
      router.push('/compte')
    }
  }

  if (!user || !profile || !profile.is_guest) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-chocolate-dark/70 mb-4">Vous n'avez pas de profil invité à convertir.</p>
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
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-chocolate-dark mb-8 font-serif text-center">
            Créer un mot de passe
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 p-6 md:p-8"
          >
            <p className="text-chocolate-dark/70 mb-6">
              Créez un mot de passe pour retrouver facilement vos commandes la prochaine fois.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-chocolate-dark mb-2">
                  Mot de passe
                </label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <p className="text-xs text-chocolate-dark/60 mt-1">Minimum 6 caractères</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-chocolate-dark mb-2">
                  Confirmer le mot de passe
                </label>
                <PasswordInput
                  id="confirmPassword"
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

              <div className="flex gap-4">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="flex-1 bg-chocolate-dark text-chocolate-light px-6 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Création...' : 'Créer mon mot de passe'}
                </motion.button>
                <Link
                  href="/compte"
                  className="px-6 py-4 border-2 border-chocolate-dark text-chocolate-dark rounded-lg font-semibold hover:bg-chocolate-dark/10 transition-colors"
                >
                  Annuler
                </Link>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
