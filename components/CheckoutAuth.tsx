'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Lock, UserPlus } from 'lucide-react'
import PasswordInput from './PasswordInput'
import { useAuth } from '@/contexts/AuthContext'

interface CheckoutAuthProps {
  onGuestContinue: () => void
  onAuthenticated: () => void
  defaultEmail?: string
  /** Masquer l'option invité (pour la page compte) */
  allowGuest?: boolean
}

type AuthMode = 'guest' | 'signin' | 'signup' | 'signup_pending_confirmation' | 'forgot'

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
  const [resetLink, setResetLink] = useState<string | null>(null)

  // Si l'utilisateur est déjà connecté, continuer directement
  if (user) {
    return null
  }

  // Messages d'erreur en français pour les erreurs Supabase courantes
  const ACCOUNT_EXISTS_MSG =
    'Un compte existe déjà avec cet email. Connectez-vous pour accéder à votre compte.'

  const getAuthErrorMessage = (err: Error | { message?: string } | null, context: 'signin' | 'signup'): string => {
    if (!err?.message) return context === 'signin' ? 'Erreur lors de la connexion' : "Erreur lors de l'inscription"
    const msg = err.message.toLowerCase()
    if (msg.includes('email rate limit exceeded') || msg.includes('rate limit')) {
      return "Trop de tentatives avec cet email. Veuillez patienter quelques minutes avant de réessayer, ou continuez en mode invité pour finaliser votre commande."
    }
    if (msg.includes('invalid login credentials')) {
      return "Email ou mot de passe incorrect. Vérifiez vos identifiants ou créez un compte si vous n'en avez pas encore."
    }
    if (
      msg.includes('user already registered') ||
      msg.includes('already registered') ||
      msg.includes('compte existe déjà') ||
      msg.includes('duplicate') ||
      msg.includes('conflict') ||
      msg.includes('409')
    ) {
      return ACCOUNT_EXISTS_MSG
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
      setLoading(false)
      onAuthenticated()
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signUpError, requiresEmailConfirmation } = await signUp(email, password, firstName, lastName)
    
    if (signUpError) {
      const errMsg = getAuthErrorMessage(signUpError, 'signup')
      setError(errMsg)
      setLoading(false)
      // Compte existant : basculer vers la connexion
      if (errMsg === ACCOUNT_EXISTS_MSG) {
        setMode('signin')
      }
    } else if (requiresEmailConfirmation) {
      setLoading(false)
      setMode('signup_pending_confirmation')
    } else {
      setLoading(false)
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
    setResetLink(null)
    setLoading(true)
    const { error: resetError, link } = await resetPasswordForEmail(email)
    setLoading(false)
    if (resetError) {
      const msg = resetError.message?.toLowerCase() ?? ''
      if (msg.includes('rate limit')) {
        setError('Trop de demandes. Veuillez patienter quelques minutes avant de réessayer.')
      } else {
        setError(resetError.message || 'Une erreur est survenue.')
      }
    } else if (link) {
      setSuccess('Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe.')
      setResetLink(link)
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
            type="button"
            onClick={() => { setMode('guest'); setShowResendConfirmation(false); setSuccess(null); setError(null); }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`min-h-[44px] p-4 rounded-lg border-2 transition-all touch-manipulation ${
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
          type="button"
          onClick={() => { setMode('signin'); setShowResendConfirmation(false); setSuccess(null); setError(null); }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`min-h-[44px] p-4 rounded-lg border-2 transition-all touch-manipulation ${
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
          type="button"
          onClick={() => { setMode('signup'); setShowResendConfirmation(false); setSuccess(null); setError(null); }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`min-h-[44px] p-4 rounded-lg border-2 transition-all touch-manipulation ${
            mode === 'signup' || mode === 'signup_pending_confirmation'
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
              type="button"
              onClick={handleGuestContinue}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="min-h-[44px] w-full bg-chocolate-dark text-chocolate-light px-6 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg touch-manipulation"
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
              <PasswordInput
                id="signin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => { setMode('forgot'); setError(null); setSuccess(null); setResetLink(null); }}
                className="min-h-[44px] mt-2 px-3 py-2 text-sm text-chocolate-dark/80 hover:text-chocolate-dark underline touch-manipulation"
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
                    className="min-h-[44px] block w-full mt-2 py-2 px-3 rounded-lg bg-chocolate-dark/10 text-chocolate-dark font-semibold hover:bg-chocolate-dark/20 transition-colors disabled:opacity-50 touch-manipulation"
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
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm space-y-3">
                <p>{success}</p>
                {resetLink && (
                  <a
                    href={resetLink}
                    className="inline-block w-full text-center py-3 px-4 bg-chocolate-dark text-chocolate-light rounded-lg font-semibold hover:bg-chocolate-dark/90 transition-colors"
                  >
                    Réinitialiser mon mot de passe
                  </a>
                )}
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
                onClick={() => { setMode('signin'); setError(null); setSuccess(null); setResetLink(null); setShowResendConfirmation(false); }}
                className="min-h-[44px] px-6 py-4 border-2 border-chocolate-dark/50 text-chocolate-dark rounded-lg font-semibold hover:bg-chocolate-dark/10 transition-colors touch-manipulation"
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
              <PasswordInput
                id="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
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

        {mode === 'signup_pending_confirmation' && (
          <motion.div
            key="signup_pending_confirmation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-chocolate-dark mb-2">Vérifiez votre boîte mail</h3>
              <p className="text-chocolate-dark/80 text-sm mb-4">
                Un email de confirmation a été envoyé à <strong className="text-chocolate-dark">{email}</strong>. Cliquez sur le lien dans l&apos;email pour activer votre compte.
              </p>
              <p className="text-sm text-chocolate-dark/60 mb-6">
                Pensez à vérifier vos spams si vous ne voyez pas l&apos;email. Il peut arriver que les emails de confirmation soient filtrés.
              </p>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={async () => {
                    setResendLoading(true)
                    const { error: resendErr } = await resendConfirmationEmail(email)
                    setResendLoading(false)
                    if (resendErr) {
                      setError(resendErr.message || 'Impossible d\'envoyer un nouvel email. Réessayez plus tard.')
                    } else {
                      setError(null)
                      setSuccess('Un nouvel email a été envoyé. Consultez votre boîte mail.')
                    }
                  }}
                  disabled={resendLoading}
                  className="min-h-[44px] w-full py-3 px-4 rounded-lg bg-chocolate-dark/10 text-chocolate-dark font-semibold hover:bg-chocolate-dark/20 transition-colors disabled:opacity-50 touch-manipulation"
                >
                  {resendLoading ? 'Envoi...' : 'Renvoyer l\'email de confirmation'}
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signin'); setError(null); setSuccess(null); }}
                  className="min-h-[44px] w-full py-3 px-4 rounded-lg border-2 border-chocolate-dark/50 text-chocolate-dark font-semibold hover:bg-chocolate-dark/10 transition-colors touch-manipulation"
                >
                  Retour à la connexion
                </button>
              </div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
