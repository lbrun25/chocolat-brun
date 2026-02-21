'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Vérifier si l'utilisateur a déjà fait un choix (uniquement côté client)
    if (typeof window !== 'undefined') {
      try {
        const cookieConsent = localStorage.getItem('cookie-consent')
        if (!cookieConsent) {
          // Afficher la bannière après un court délai pour une meilleure UX
          const timer = setTimeout(() => setIsVisible(true), 1000)
          return () => clearTimeout(timer)
        }
      } catch (error) {
        // Ignorer les erreurs localStorage
        console.warn('Erreur localStorage:', error)
      }
    }
  }, [])

  const handleAccept = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie-consent', 'accepted')
    }
    setIsVisible(false)
  }, [])

  const handleReject = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie-consent', 'rejected')
    }
    setIsVisible(false)
  }, [])

  const handleCustomize = useCallback(() => {
    setShowCustomize(prev => !prev)
  }, [])

  const handleSavePreferences = useCallback(() => {
    // Ici vous pouvez ajouter la logique pour sauvegarder les préférences personnalisées
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie-consent', 'customized')
    }
    setIsVisible(false)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-chocolate-light via-chocolate-light/95 to-chocolate-light/90 rounded-2xl shadow-2xl border-2 border-chocolate-dark/20 p-6 md:p-8">
              {/* Contenu principal */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Icône ou décoration */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-chocolate-dark/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-chocolate-dark"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                </div>

                {/* Texte */}
                <div className="flex-1">
                  <p className="text-chocolate-dark text-base md:text-lg leading-relaxed mb-4">
                    Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez{' '}
                    <span className="font-semibold">accepter</span>,{' '}
                    <span className="font-semibold">refuser</span> ou{' '}
                    <span className="font-semibold">personnaliser</span> vos choix.
                  </p>

                  {/* Options personnalisées (si activées) */}
                  <AnimatePresence initial={false}>
                    {showCustomize && (
                      <motion.div
                        key="customize-options"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="mb-4 overflow-hidden"
                      >
                        <div className="p-4 bg-white/50 rounded-lg border border-chocolate-dark/10">
                          <div className="space-y-3">
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                defaultChecked
                                className="w-4 h-4 text-chocolate-dark border-chocolate-dark/30 rounded focus:ring-chocolate-dark"
                              />
                              <span className="text-chocolate-dark text-sm">
                                Cookies essentiels (nécessaires au fonctionnement du site)
                              </span>
                            </label>
                            <label className="flex items-center space-x-3 cursor-pointer opacity-60">
                              <input type="checkbox" disabled className="w-4 h-4 rounded" />
                              <span className="text-chocolate-dark text-sm">
                                Cookies analytiques (non utilisés actuellement)
                              </span>
                            </label>
                            <label className="flex items-center space-x-3 cursor-pointer opacity-60">
                              <input type="checkbox" disabled className="w-4 h-4 rounded" />
                              <span className="text-chocolate-dark text-sm">
                                Cookies marketing (non utilisés actuellement)
                              </span>
                            </label>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Lien politique de confidentialité */}
                  <Link
                    href="/politique-confidentialite"
                    className="text-chocolate-dark/70 hover:text-chocolate-dark text-sm underline transition-colors"
                  >
                    En savoir plus – Politique de confidentialité
                  </Link>
                </div>

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
                  <AnimatePresence mode="wait">
                    {showCustomize ? (
                      <motion.button
                        type="button"
                        key="save-button"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleSavePreferences}
                        className="min-h-[44px] px-6 py-3 bg-chocolate-dark text-chocolate-light rounded-lg font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg touch-manipulation"
                      >
                        Enregistrer mes préférences
                      </motion.button>
                    ) : (
                      <motion.div
                        key="action-buttons"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
                      >
                        <button
                          type="button"
                          onClick={handleAccept}
                          className="min-h-[44px] px-6 py-3 bg-chocolate-dark text-chocolate-light rounded-lg font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg touch-manipulation"
                        >
                          Tout accepter
                        </button>
                        <button
                          type="button"
                          onClick={handleReject}
                          className="min-h-[44px] px-6 py-3 bg-white text-chocolate-dark border-2 border-chocolate-dark/30 rounded-lg font-semibold hover:bg-chocolate-light/50 transition-colors shadow-md touch-manipulation"
                        >
                          Tout refuser
                        </button>
                        <button
                          type="button"
                          onClick={handleCustomize}
                          className="min-h-[44px] px-6 py-3 bg-chocolate-medium/20 text-chocolate-dark border-2 border-chocolate-medium/40 rounded-lg font-semibold hover:bg-chocolate-medium/30 transition-colors shadow-md touch-manipulation"
                        >
                          Personnaliser
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

