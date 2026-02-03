'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Lock, UserPlus } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface CheckoutAuthProps {
  onGuestContinue: () => void
  onAuthenticated: () => void
  defaultEmail?: string
}

type AuthMode = 'guest' | 'signin' | 'signup'

export default function CheckoutAuth({
  onGuestContinue,
  onAuthenticated,
  defaultEmail = '',
}: CheckoutAuthProps) {
  const { user, signIn, signUp } = useAuth()
  const [mode, setMode] = useState<AuthMode>('guest')
  const [email, setEmail] = useState(defaultEmail)
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Si l'utilisateur est déjà connecté, continuer directement
  if (user) {
    return null
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await signIn(email, password)
    
    if (signInError) {
      setError(signInError.message || 'Erreur lors de la connexion')
      setLoading(false)
    } else {
      onAuthenticated()
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signUpError } = await signUp(email, password, firstName, lastName)
    
    if (signUpError) {
      setError(signUpError.message || 'Erreur lors de l\'inscription')
      setLoading(false)
    } else {
      onAuthenticated()
    }
  }

  const handleGuestContinue = () => {
    if (!email) {
      setError('Veuillez renseigner votre email pour continuer en mode invité')
      return
    }
    onGuestContinue()
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-bold text-chocolate-dark mb-6 font-serif">
        Authentification (optionnel)
      </h2>

      <p className="text-chocolate-dark/70 mb-6">
        Vous pouvez créer un compte pour retrouver facilement vos commandes, ou continuer en mode invité.
      </p>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.button
          onClick={() => setMode('guest')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-4 rounded-lg border-2 transition-all ${
            mode === 'guest'
              ? 'border-chocolate-dark bg-chocolate-light/30'
              : 'border-chocolate-dark/30 hover:border-chocolate-dark/50'
          }`}
        >
          <div className="mb-2 flex justify-center">
            <ShoppingCart className="w-8 h-8 text-chocolate-dark" aria-hidden="true" />
          </div>
          <div className="font-semibold text-chocolate-dark">Mode invité</div>
          <div className="text-sm text-chocolate-dark/70 mt-1">Le plus rapide</div>
        </motion.button>

        <motion.button
          onClick={() => setMode('signin')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-4 rounded-lg border-2 transition-all ${
            mode === 'signin'
              ? 'border-chocolate-dark bg-chocolate-light/30'
              : 'border-chocolate-dark/30 hover:border-chocolate-dark/50'
          }`}
        >
          <div className="mb-2 flex justify-center">
            <Lock className="w-8 h-8 text-chocolate-dark" aria-hidden="true" />
          </div>
          <div className="font-semibold text-chocolate-dark">Se connecter</div>
          <div className="text-sm text-chocolate-dark/70 mt-1">Déjà un compte</div>
        </motion.button>

        <motion.button
          onClick={() => setMode('signup')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-4 rounded-lg border-2 transition-all ${
            mode === 'signup'
              ? 'border-chocolate-dark bg-chocolate-light/30'
              : 'border-chocolate-dark/30 hover:border-chocolate-dark/50'
          }`}
        >
          <div className="mb-2 flex justify-center">
            <UserPlus className="w-8 h-8 text-chocolate-dark" aria-hidden="true" />
          </div>
          <div className="font-semibold text-chocolate-dark">S'inscrire</div>
          <div className="text-sm text-chocolate-dark/70 mt-1">Créer un compte</div>
        </motion.button>
      </div>

      {/* Formulaire selon le mode */}
      <AnimatePresence mode="wait">
        {mode === 'guest' && (
          <motion.div
            key="guest"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="guest-email" className="block text-sm font-semibold text-chocolate-dark mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="guest-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors"
                placeholder="votre@email.com"
              />
            </div>
            <motion.button
              onClick={handleGuestContinue}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-chocolate-dark text-chocolate-light px-6 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg"
            >
              Continuer en mode invité →
            </motion.button>
          </motion.div>
        )}

        {mode === 'signin' && (
          <motion.form
            key="signin"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSignIn}
            className="space-y-4"
          >
            <div>
              <label htmlFor="signin-email" className="block text-sm font-semibold text-chocolate-dark mb-2">
                Email
              </label>
              <input
                type="email"
                id="signin-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors"
              />
            </div>
            <div>
              <label htmlFor="signin-password" className="block text-sm font-semibold text-chocolate-dark mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="signin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors"
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
              {loading ? 'Connexion...' : 'Se connecter'}
            </motion.button>
          </motion.form>
        )}

        {mode === 'signup' && (
          <motion.form
            key="signup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSignUp}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="signup-firstname" className="block text-sm font-semibold text-chocolate-dark mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  id="signup-firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors"
                />
              </div>
              <div>
                <label htmlFor="signup-lastname" className="block text-sm font-semibold text-chocolate-dark mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  id="signup-lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors"
                />
              </div>
            </div>
            <div>
              <label htmlFor="signup-email" className="block text-sm font-semibold text-chocolate-dark mb-2">
                Email
              </label>
              <input
                type="email"
                id="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors"
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="block text-sm font-semibold text-chocolate-dark mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors"
              />
              <p className="text-xs text-chocolate-dark/60 mt-1">Minimum 6 caractères</p>
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
              {loading ? 'Inscription...' : 'Créer mon compte'}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
