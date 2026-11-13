'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { saveCookieConsent } from '@/lib/cookie-consent'

/**
 * Bandeau de consentement : petite carte en bas à gauche (pleine largeur en bas sur mobile).
 * « Refuser » et « Accepter » ont le même poids visuel (recommandation CNIL : refuser aussi simple qu'accepter).
 */
export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const reduireAnimations = useReducedMotion()

  useEffect(() => {
    setMounted(true)
    try {
      if (!localStorage.getItem('cookie-consent')) {
        // Court délai : le bandeau n'apparaît pas en même temps que le contenu de la page
        const timer = setTimeout(() => setIsVisible(true), 1000)
        return () => clearTimeout(timer)
      }
    } catch {
      // localStorage indisponible : pas de bandeau, aucune mesure d'audience
    }
  }, [])

  const handleAccept = useCallback(() => {
    saveCookieConsent('accepted')
    setIsVisible(false)
  }, [])

  const handleReject = useCallback(() => {
    saveCookieConsent('rejected')
    setIsVisible(false)
  }, [])

  const handleSavePreferences = useCallback(() => {
    saveCookieConsent(analytics ? 'accepted' : 'customized')
    setIsVisible(false)
  }, [analytics])

  if (!mounted) return null

  const bouton =
    'inline-flex h-10 items-center justify-center rounded-full px-4 text-[14px] font-medium transition-colors touch-manipulation'
  const boutonPlein = `${bouton} bg-ink text-ivory hover:bg-cacao`
  const boutonClair = `${bouton} bg-ink/[0.06] text-ink hover:bg-ink/[0.11]`

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cookie-banner"
          role="dialog"
          aria-live="polite"
          aria-labelledby="cookie-titre"
          initial={reduireAnimations ? { opacity: 0 } : { y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduireAnimations ? { opacity: 0 } : { y: 16, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-x-3 bottom-3 z-50 font-sans sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[360px]"
        >
          <div className="rounded-2xl bg-paper p-5 text-ink shadow-lift ring-1 ring-ink/[0.08]">
            <p id="cookie-titre" className="font-display text-[17px] leading-tight">
              {showCustomize ? 'Vos préférences' : 'Cookies'}
            </p>

            {showCustomize ? (
              <fieldset className="mt-3 space-y-2.5 text-[13.5px] leading-snug text-bark">
                <legend className="sr-only">Catégories de cookies</legend>
                <label className="flex items-start gap-2.5 opacity-70">
                  <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4 shrink-0 accent-[#1B100B]" />
                  <span>Essentiels, nécessaires au fonctionnement du site (panier, compte). Toujours actifs.</span>
                </label>
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#1B100B]"
                  />
                  <span>Mesure d’audience (Google Tag Manager), pour savoir quelles pages sont lues.</span>
                </label>
              </fieldset>
            ) : (
              <p className="mt-2 text-[13.5px] leading-relaxed text-bark">
                Le site utilise des cookies nécessaires à son fonctionnement et, avec votre accord, des cookies de
                mesure d’audience.{' '}
                <Link
                  href="/politique-confidentialite"
                  className="text-ink underline decoration-brass/60 underline-offset-2 hover:decoration-brass"
                >
                  En savoir plus
                </Link>
              </p>
            )}

            <div className="mt-4 grid grid-cols-2 gap-2">
              {showCustomize ? (
                <>
                  <button type="button" onClick={() => setShowCustomize(false)} className={boutonClair}>
                    Retour
                  </button>
                  <button type="button" onClick={handleSavePreferences} className={boutonPlein}>
                    Enregistrer
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={handleReject} className={boutonClair}>
                    Refuser
                  </button>
                  <button type="button" onClick={handleAccept} className={boutonPlein}>
                    Accepter
                  </button>
                </>
              )}
            </div>

            {!showCustomize && (
              <button
                type="button"
                onClick={() => setShowCustomize(true)}
                className="mt-3 w-full text-center text-[12.5px] text-bark underline decoration-ink/20 underline-offset-2 hover:text-ink hover:decoration-ink/50"
              >
                Personnaliser
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
