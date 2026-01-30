'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useCart()
  const [session, setSession] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      // Récupérer les détails de la session depuis votre API
      fetch(`/api/get-checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSession(data.session)
          setIsLoading(false)
          // Vider le panier après confirmation
          clearCart()
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération de la session:', error)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [sessionId, clearCart])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chocolate-dark mx-auto mb-4"></div>
          <p className="text-chocolate-dark/70">Chargement...</p>
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
          className="max-w-2xl mx-auto text-center"
        >
          {/* Icône de succès */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </motion.div>

          {/* Titre */}
          <h1 className="text-4xl md:text-5xl font-bold text-chocolate-dark mb-4 font-serif">
            Commande confirmée !
          </h1>

          <p className="text-xl text-chocolate-dark/70 mb-8">
            Merci pour votre commande. Nous avons bien reçu votre paiement.
          </p>

          {/* Détails de la commande */}
          {session && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 p-6 md:p-8 mb-8 text-left"
            >
              <h2 className="text-2xl font-bold text-chocolate-dark mb-6 font-serif">
                Détails de la commande
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-chocolate-dark/70">Numéro de commande</span>
                  <span className="font-semibold text-chocolate-dark">
                    {session.id.substring(0, 20)}...
                  </span>
                </div>

                {session.metadata?.customerFirstName && (
                  <div className="flex justify-between">
                    <span className="text-chocolate-dark/70">Client</span>
                    <span className="font-semibold text-chocolate-dark">
                      {session.metadata.customerFirstName} {session.metadata.customerLastName}
                    </span>
                  </div>
                )}

                {session.amount_total && (
                  <div className="flex justify-between pt-4 border-t border-chocolate-dark/10">
                    <span className="text-lg font-semibold text-chocolate-dark">Total payé</span>
                    <span className="text-xl font-bold text-chocolate-medium">
                      {(session.amount_total / 100).toFixed(2)} €
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Informations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-chocolate-light/30 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-chocolate-dark mb-3">
              Prochaines étapes
            </h3>
            <ul className="text-left space-y-2 text-chocolate-dark/70">
              <li className="flex items-start">
                <span className="text-chocolate-medium mr-2">✓</span>
                <span>Vous recevrez un email de confirmation dans les prochaines minutes</span>
              </li>
              <li className="flex items-start">
                <span className="text-chocolate-medium mr-2">✓</span>
                <span>Votre commande sera préparée et expédiée sous 2-3 jours ouvrés</span>
              </li>
              <li className="flex items-start">
                <span className="text-chocolate-medium mr-2">✓</span>
                <span>Vous recevrez un email avec le numéro de suivi dès l'expédition</span>
              </li>
            </ul>
          </motion.div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-chocolate-dark text-chocolate-light px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg"
            >
              Retour à l'accueil
            </Link>
            <Link
              href="/#nos-gouts"
              className="inline-block bg-transparent border-2 border-chocolate-dark text-chocolate-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark hover:text-chocolate-light transition-all"
            >
              Continuer mes achats
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
