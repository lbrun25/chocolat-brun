'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SafeImage from '@/components/SafeImage'
import { loadStripe } from '@stripe/stripe-js'
import { getPackagingPrices } from '@/types/product'
import { calculateShippingCost, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  address: string
  city: string
  postalCode: string
  country: string
  deliveryNotes: string
}

export default function CheckoutPage() {
  const { cart } = useCart()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  // Calcul des frais de port
  const shippingCost = calculateShippingCost(cart.totalWeight, cart.totalTTC)
  const totalWithShipping = cart.totalTTC + shippingCost
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    deliveryNotes: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/panier')
    }
  }, [cart.items.length, router])

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis'
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis'
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis'
    } else if (!/^[0-9+\s-]+$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide'
    }
    if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise'
    if (!formData.city.trim()) newErrors.city = 'La ville est requise'
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est requis'
    } else if (!/^[0-9]{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Code postal invalide (5 chiffres)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: cart.items.map(item => ({
            productId: item.product.id,
            productName: item.product.name,
            packaging: item.packaging,
            quantity: item.quantity,
            priceTTC: getPackagingPrices(item.product)[item.packaging].priceTTC,
          })),
          customerInfo: formData,
          totalHT: cart.totalHT,
          totalTTC: cart.totalTTC,
          shippingCost: shippingCost,
          totalWithShipping: totalWithShipping,
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe n\'est pas initialisé')
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (error) {
      console.error('Erreur lors de la création de la session de paiement:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
      setIsLoading(false)
    }
  }

  if (cart.items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-chocolate-dark mb-8 font-serif">
            Finaliser la commande
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 p-6 md:p-8"
              >
                <h2 className="text-2xl font-bold text-chocolate-dark mb-6 font-serif">
                  Informations de livraison
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom et Prénom */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-chocolate-dark mb-2">
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.firstName ? 'border-red-500' : 'border-chocolate-dark/30'
                        } focus:outline-none focus:border-chocolate-dark transition-colors`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-chocolate-dark mb-2">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.lastName ? 'border-red-500' : 'border-chocolate-dark/30'
                        } focus:outline-none focus:border-chocolate-dark transition-colors`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email et Téléphone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-chocolate-dark mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.email ? 'border-red-500' : 'border-chocolate-dark/30'
                        } focus:outline-none focus:border-chocolate-dark transition-colors`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-chocolate-dark mb-2">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.phone ? 'border-red-500' : 'border-chocolate-dark/30'
                        } focus:outline-none focus:border-chocolate-dark transition-colors`}
                        placeholder="+33 6 12 34 56 78"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Entreprise */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-chocolate-dark mb-2">
                      Entreprise (optionnel)
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors"
                    />
                  </div>

                  {/* Adresse */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-chocolate-dark mb-2">
                      Adresse <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.address ? 'border-red-500' : 'border-chocolate-dark/30'
                      } focus:outline-none focus:border-chocolate-dark transition-colors`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Ville et Code postal */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="city" className="block text-sm font-semibold text-chocolate-dark mb-2">
                        Ville <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.city ? 'border-red-500' : 'border-chocolate-dark/30'
                        } focus:outline-none focus:border-chocolate-dark transition-colors`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-semibold text-chocolate-dark mb-2">
                        Code postal <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.postalCode ? 'border-red-500' : 'border-chocolate-dark/30'
                        } focus:outline-none focus:border-chocolate-dark transition-colors`}
                        maxLength={5}
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                      )}
                    </div>
                  </div>

                  {/* Pays */}
                  <div>
                    <label htmlFor="country" className="block text-sm font-semibold text-chocolate-dark mb-2">
                      Pays <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors"
                    >
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Luxembourg">Luxembourg</option>
                    </select>
                  </div>

                  {/* Notes de livraison */}
                  <div>
                    <label htmlFor="deliveryNotes" className="block text-sm font-semibold text-chocolate-dark mb-2">
                      Notes de livraison (optionnel)
                    </label>
                    <textarea
                      id="deliveryNotes"
                      value={formData.deliveryNotes}
                      onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors resize-none"
                      placeholder="Instructions spéciales pour la livraison..."
                    />
                  </div>

                  {/* Bouton de soumission */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className="w-full bg-chocolate-dark text-chocolate-light px-6 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Traitement...' : 'Procéder au paiement'}
                  </motion.button>
                </form>
              </motion.div>
            </div>

            {/* Récapitulatif */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 p-6 sticky top-24"
              >
                <h2 className="text-2xl font-bold text-chocolate-dark mb-6 font-serif">
                  Récapitulatif
                </h2>

                <div className="space-y-3 mb-6">
                  {cart.items.map((item) => {
                    const packagingInfo = getPackagingPrices(item.product)[item.packaging]
                    const totalTTC = packagingInfo.priceTTC * item.quantity

                    return (
                      <div key={`${item.product.id}-${item.packaging}`} className="flex gap-3 pb-3 border-b border-chocolate-dark/10">
                        <div className="relative w-16 h-16 bg-chocolate-light/20 rounded-lg overflow-hidden flex-shrink-0">
                          <SafeImage
                            src={item.product.imageSrc}
                            fallbackSrc={item.product.fallbackSrc}
                            alt={item.product.imageAlt}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-chocolate-dark text-sm truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-chocolate-dark/70">
                            {packagingInfo.pieces} pièces × {item.quantity}
                          </p>
                          <p className="text-sm font-semibold text-chocolate-dark mt-1">
                            {totalTTC.toFixed(2)} € TTC
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="space-y-3 mb-6 pt-4 border-t border-chocolate-dark/20">
                  {/* Sous-total */}
                  <div className="flex justify-between items-center text-chocolate-dark/80">
                    <span>Sous-total TTC</span>
                    <span className="font-semibold">{cart.totalTTC.toFixed(2)} €</span>
                  </div>

                  {/* Frais de port */}
                  <div className="flex justify-between items-center text-chocolate-dark/80">
                    <span>Frais de port</span>
                    <span className="font-semibold">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Gratuit</span>
                      ) : (
                        `${shippingCost.toFixed(2)} €`
                      )}
                    </span>
                  </div>

                  {/* Message pour livraison gratuite */}
                  {shippingCost > 0 && (FREE_SHIPPING_THRESHOLD - cart.totalTTC) > 0 && (
                    <div className="bg-chocolate-light/30 rounded-lg p-3 text-xs text-chocolate-dark/70">
                      <p className="font-semibold mb-1">Livraison gratuite dès {FREE_SHIPPING_THRESHOLD}€</p>
                      <p>Il vous manque {(FREE_SHIPPING_THRESHOLD - cart.totalTTC).toFixed(2)} €</p>
                    </div>
                  )}

                  {/* Total */}
                  <div className="pt-3 border-t border-chocolate-dark/20">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-chocolate-dark">Total TTC</span>
                      <span className="text-2xl font-bold text-chocolate-medium">{totalWithShipping.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/panier"
                  className="block text-center text-chocolate-dark/70 hover:text-chocolate-dark text-sm font-medium transition-colors"
                >
                  ← Modifier le panier
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
