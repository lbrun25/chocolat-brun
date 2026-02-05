'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Lock, UserPlus } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface CheckoutAuthProps {
  onGuestContinue: () => void
  onAuthenticated: () => void
  defaultEmail?: string
  /** Masquer l'option invité (pour la page compte) */
  allowGuest?: boolean
}

type AuthMode = 'guest' | 'signin' | 'signup' | 'forgot'

export default function CheckoutAuth({
  onGuestContinue,
  onAuthenticated,
  defaultEmail = '',
  allowGuest = true,
}: CheckoutAuthProps) {
  const { user, signIn, signUp, resetPasswordForEmail, resendConfirmationEmail } = useAuth()
  const [mode, setMode] = useState<AuthMode>(allowGuest ? 'guest' : 'signin')
  const [email, setEmail] = useState(defaultEmail)
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [resendLoading, setResendLoading] = useState(false)
  const [showResendConfirmation, setShowResendConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)

  // Si l'utilisateur est déjà connecté, continuer directement
  if (user) {
    return null
  }

  // Messages d'erreur en français pour les erreurs Supabase courantes
  const getAuthErrorMessage = (err: Error | { message?: string } | null, context: 'signin' | 'signup'): string => {
    if (!err?.message) return context === 'signin' ? 'Erreur lors de la connexion' : "Erreur lors de l'inscription"
    const msg = err.message.toLowerCase()
    if (msg.includes('email rate limit exceeded') || msg.includes('rate limit')) {
      return "Trop de tentatives avec cet email. Veuillez patienter quelques minutes avant de réessayer, ou continuez en mode invité pour finaliser votre commande."
    }
    if (msg.includes('invalid login credentials')) {
      return "Email ou mot de passe incorrect. Vérifiez vos identifiants ou créez un compte si vous n'en avez pas encore."
    }
    if (msg.includes('user already registered') || msg.includes('already registered')) {
      return "Un compte existe déjà avec cet email. Utilisez « Se connecter » pour vous connecter."
    }
    if (msg.includes('email not confirmed')) {
      return "Votre adresse email n'a pas encore été confirmée. Consultez votre boîte mail (et les spams) et cliquez sur le lien de confirmation, ou utilisez le bouton ci-dessous pour recevoir un nouvel email."
    }
    return err.message
  }


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await signIn(email, password)
    
    if (signInError) {
      setShowResendConfirmation(signInError.message?.toLowerCase().includes('email not confirmed') ?? false)
      setError(getAuthErrorMessage(signInError, 'signin'))
      setLoading(false)
    } else {
      setShowResendConfirmation(false)
      onAuthenticated()
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signUpError } = await signUp(email, password, firstName, lastName)
    
    if (signUpError) {
      setError(getAuthErrorMessage(signUpError, 'signup'))
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    const { error: resetError } = await resetPasswordForEmail(email)
    setLoading(false)
    if (resetError) {
      const msg = resetError.message?.toLowerCase() ?? ''
      if (msg.includes('rate limit')) {
        setError('Trop de demandes. Veuillez patienter quelques minutes avant de réessayer.')
      } else {
        setError(resetError.message || 'Une erreur est survenue.')
      }
    } else {
      setSuccess('Si un compte existe avec cet email, un lien de réinitialisation a été envoyé. Consultez votre boîte mail (et les spams) puis cliquez sur le lien pour définir un nouveau mot de passe.')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-bold text-chocolate-dark mb-6 font-serif">
        {allowGuest ? 'Authentification (optionnel)' : 'Accéder à mon compte'}
      </h2>

      <p className="text-chocolate-dark/70 mb-6">
        {allowGuest
          ? 'Vous pouvez créer un compte pour retrouver facilement vos commandes, ou continuer en mode invité.'
          : 'Connectez-vous ou créez un compte pour consulter l\'historique de vos commandes.'}
      </p>

      {/* Options */}
      <div className={`grid grid-cols-1 gap-4 mb-6 ${allowGuest ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {allowGuest && (
          <motion.button
            onClick={() => { setMode('guest'); setShowResendConfirmation(false); setSuccess(null); }}
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
        )}

        <motion.button
          onClick={() => { setMode('signin'); setShowResendConfirmation(false); setSuccess(null); }}
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
          onClick={() => { setMode('signup'); setShowResendConfirmation(false); setSuccess(null); }}
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
              <button
                type="button"
                onClick={() => { setMode('forgot'); setError(null); setSuccess(null); }}
                className="mt-2 text-sm text-chocolate-dark/80 hover:text-chocolate-dark underline"
              >
                Mot de passe oublié ?
              </button>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm space-y-2">
                <p>{error}</p>
                {showResendConfirmation && (
                  <button
                    type="button"
                    disabled={resendLoading}
                    onClick={async () => {
                      setResendLoading(true)
                      setSuccess(null)
                      const { error: resendErr } = await resendConfirmationEmail(email)
                      setResendLoading(false)
                      if (resendErr) {
                        setError(resendErr.message || 'Impossible d\'envoyer l\'email. Réessayez plus tard.')
                      } else {
                        setError(null)
                        setShowResendConfirmation(false)
                        setSuccess('Un nouvel email de confirmation a été envoyé. Consultez votre boîte mail (et les spams), cliquez sur le lien puis reconnectez-vous ici.')
                      }
                    }}
                    className="block w-full mt-2 py-2 px-3 rounded-lg bg-chocolate-dark/10 text-chocolate-dark font-semibold hover:bg-chocolate-dark/20 transition-colors disabled:opacity-50"
                  >
                    {resendLoading ? 'Envoi...' : 'Renvoyer l\'email de confirmation'}
                  </button>
                )}
              </div>
            )}
            {success && mode === 'signin' && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
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

        {mode === 'forgot' && (
          <motion.form
            key="forgot"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleForgotPassword}
            className="space-y-4"
          >
            <p className="text-chocolate-dark/70 text-sm">
              Saisissez l’email de votre compte. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
            <div>
              <label htmlFor="forgot-email" className="block text-sm font-semibold text-chocolate-dark mb-2">
                Email
              </label>
              <input
                type="email"
                id="forgot-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors"
                placeholder="votre@email.com"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="flex-1 bg-chocolate-dark text-chocolate-light px-6 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Envoi...' : 'Envoyer le lien par email'}
              </motion.button>
              <button
                type="button"
                onClick={() => { setMode('signin'); setError(null); setSuccess(null); setShowResendConfirmation(false); }}
                className="px-6 py-4 border-2 border-chocolate-dark/50 text-chocolate-dark rounded-lg font-semibold hover:bg-chocolate-dark/10 transition-colors"
              >
                Retour à la connexion
              </button>
            </div>
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
