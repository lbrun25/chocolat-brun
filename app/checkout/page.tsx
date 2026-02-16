'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SafeImage from '@/components/SafeImage'
import CheckoutAuth from '@/components/CheckoutAuth'
import { getPackagingPrices } from '@/types/product'
import { calculateShippingCost, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping'
import { supabase } from '@/lib/supabase'

/** Convertit le code pays (ex. FR) en libellé pour le formulaire */
function countryCodeToLabel(code: string | null | undefined): string {
  if (!code || !code.trim()) return 'France'
  const c = code.trim().toUpperCase()
  if (c === 'FR') return 'France'
  if (c === 'BE') return 'Belgique'
  if (c === 'CH') return 'Suisse'
  if (c === 'LU') return 'Luxembourg'
  return code
}

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
  acceptedCGU: boolean
}

interface BillingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  address: string
  city: string
  postalCode: string
  country: string
  notes: string
}

export default function CheckoutPage() {
  const { cart } = useCart()
  const { user, profile } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showAuth, setShowAuth] = useState(true)
  const [authCompleted, setAuthCompleted] = useState(false)
  
  // Calcul des frais de port
  const shippingCost = calculateShippingCost(cart.totalWeight, cart.totalTTC)
  const totalWithShipping = cart.totalTTC + shippingCost
  const [formData, setFormData] = useState<FormData>({
    firstName: profile?.first_name || '',
    lastName: profile?.last_name || '',
    email: profile?.email || user?.email || '',
    phone: profile?.phone || '',
    company: profile?.company || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    deliveryNotes: '',
    acceptedCGU: false,
  })
  const [billingData, setBillingData] = useState<BillingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [billingErrors, setBillingErrors] = useState<Partial<Record<keyof BillingFormData, string>>>({})

  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/panier')
    }
  }, [cart.items.length, router])

  // Si l'utilisateur est connecté, masquer l'auth et pré-remplir les données (profil + dernière adresse)
  useEffect(() => {
    if (!user || !profile) return
    setShowAuth(false)
    setAuthCompleted(true)
    setFormData(prev => ({
      ...prev,
      firstName: profile.first_name || prev.firstName,
      lastName: profile.last_name || prev.lastName,
      email: profile.email || prev.email,
      phone: profile.phone || prev.phone,
      company: profile.company || prev.company,
    }))

    // Charger la dernière adresse de livraison (dernière commande payée) et pré-remplir livraison + facturation
    const loadLastAddress = async () => {
      const selectQuery = `
        id,
        shipping_address,
        shipping_city,
        shipping_postal_code,
        shipping_country
      `
      const { data: byUserId } = await supabase
        .from('orders')
        .select(selectQuery)
        .eq('user_id', profile.id)
        .eq('status', 'paid')
        .not('shipping_address', 'is', null)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      const { data: byEmail } = await supabase
        .from('orders')
        .select(selectQuery)
        .eq('email', profile.email)
        .eq('status', 'paid')
        .not('shipping_address', 'is', null)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      const lastOrder = byUserId || byEmail
      if (!lastOrder?.shipping_address?.trim()) return

      const address = lastOrder.shipping_address.trim()
      const city = lastOrder.shipping_city?.trim() || ''
      const postalCode = lastOrder.shipping_postal_code?.trim() || ''
      const country = countryCodeToLabel(lastOrder.shipping_country)

      setFormData(prev => ({
        ...prev,
        firstName: profile.first_name || prev.firstName,
        lastName: profile.last_name || prev.lastName,
        email: profile.email || prev.email,
        phone: profile.phone || prev.phone,
        company: profile.company || prev.company,
        address,
        city,
        postalCode,
        country,
      }))

      // Pré-remplir la facturation avec la même adresse (cohérent avec "Mon compte")
      setBillingData({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        company: profile.company || '',
        address,
        city,
        postalCode,
        country,
        notes: '',
      })
    }
    loadLastAddress()
  }, [user, profile])

  const handleGuestContinue = async () => {
    // Créer ou récupérer le profil invité
    try {
      await fetch('/api/auth/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          company: formData.company,
        }),
      })
      setShowAuth(false)
      setAuthCompleted(true)
    } catch (error) {
      console.error('Erreur lors de la création du profil invité:', error)
    }
  }

  const handleAuthenticated = () => {
    setShowAuth(false)
    setAuthCompleted(true)
  }

  const copyDeliveryToBilling = () => {
    setBillingData({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
      notes: '',
    })
    setBillingErrors({})
  }

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
    if (!formData.acceptedCGU) {
      newErrors.acceptedCGU = 'Vous devez accepter les CGU/CGV'
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
          billingAddress: billingData,
          totalHT: cart.totalHT,
          totalTTC: cart.totalTTC,
          shippingCost: shippingCost,
          totalWithShipping: totalWithShipping,
          ...(profile?.id && { profileId: profile.id }),
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('URL de paiement non reçue')
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
            <div className="lg:col-span-2 space-y-6">
              {/* Authentification (optionnel) */}
              {showAuth && (
                <CheckoutAuth
                  onGuestContinue={handleGuestContinue}
                  onAuthenticated={handleAuthenticated}
                  defaultEmail={formData.email}
                />
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 p-6 md:p-8"
              >
                <h2 className="text-2xl font-bold text-chocolate-dark mb-6 font-serif">
                  Informations de livraison
                </h2>

                <div className="space-y-6">
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
                </div>
              </motion.div>

              {/* Adresse de facturation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 p-6 md:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-chocolate-dark font-serif">
                    Adresse de facturation
                  </h2>
                  <button
                    type="button"
                    onClick={copyDeliveryToBilling}
                    className="text-sm font-medium text-chocolate-dark/80 hover:text-chocolate-dark border border-chocolate-dark/30 hover:border-chocolate-dark/50 px-4 py-2 rounded-lg transition-colors"
                  >
                    Reprendre l&apos;adresse de livraison
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="billingFirstName" className="block text-sm font-semibold text-chocolate-dark mb-2">
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="billingFirstName"
                        value={billingData.firstName}
                        onChange={(e) => setBillingData({ ...billingData, firstName: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          billingErrors.firstName ? 'border-red-500' : 'border-chocolate-dark/30'
                        } focus:outline-none focus:border-chocolate-dark transition-colors`}
                      />
                      {billingErrors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{billingErrors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="billingLastName" className="block text-sm font-semibold text-chocolate-dark mb-2">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="billingLastName"
                        value={billingData.lastName}
                        onChange={(e) => setBillingData({ ...billingData, lastName: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          billingErrors.lastName ? 'border-red-500' : 'border-chocolate-dark/30'
                        } focus:outline-none focus:border-chocolate-dark transition-colors`}
                      />
                      {billingErrors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{billingErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="billingEmail" className="block text-sm font-semibold text-chocolate-dark mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="billingEmail"
                        value={billingData.email}
                        onChange={(e) => setBillingData({ ...billingData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          billingErrors.email ? 'border-red-500' : 'border-chocolate-dark/30'
                        } focus:outline-none focus:border-chocolate-dark transition-colors`}
                      />
                      {billingErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{billingErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="billingPhone" className="block text-sm font-semibold text-chocolate-dark mb-2">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="billingPhone"
                        value={billingData.phone}
                        onChange={(e) => setBillingData({ ...billingData, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          billingErrors.phone ? 'border-red-500' : 'border-chocolate-dark/30'
                        } focus:outline-none focus:border-chocolate-dark transition-colors`}
                        placeholder="+33 6 12 34 56 78"
                      />
                      {billingErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{billingErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="billingCompany" className="block text-sm font-semibold text-chocolate-dark mb-2">
                      Entreprise (optionnel)
                    </label>
                    <input
                      type="text"
                      id="billingCompany"
                      value={billingData.company}
                      onChange={(e) => setBillingData({ ...billingData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="billingAddress" className="block text-sm font-semibold text-chocolate-dark mb-2">
                      Adresse <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="billingAddress"
                      value={billingData.address}
                      onChange={(e) => setBillingData({ ...billingData, address: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        billingErrors.address ? 'border-red-500' : 'border-chocolate-dark/30'
                      } focus:outline-none focus:border-chocolate-dark transition-colors`}
                    />
                    {billingErrors.address && (
                      <p className="text-red-500 text-sm mt-1">{billingErrors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="billingCity" className="block text-sm font-semibold text-chocolate-dark mb-2">
                        Ville <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="billingCity"
                        value={billingData.city}
                        onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          billingErrors.city ? 'border-red-500' : 'border-chocolate-dark/30'
                        } focus:outline-none focus:border-chocolate-dark transition-colors`}
                      />
                      {billingErrors.city && (
                        <p className="text-red-500 text-sm mt-1">{billingErrors.city}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="billingPostalCode" className="block text-sm font-semibold text-chocolate-dark mb-2">
                        Code postal <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="billingPostalCode"
                        value={billingData.postalCode}
                        onChange={(e) => setBillingData({ ...billingData, postalCode: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          billingErrors.postalCode ? 'border-red-500' : 'border-chocolate-dark/30'
                        } focus:outline-none focus:border-chocolate-dark transition-colors`}
                        maxLength={5}
                      />
                      {billingErrors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">{billingErrors.postalCode}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="billingCountry" className="block text-sm font-semibold text-chocolate-dark mb-2">
                      Pays <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="billingCountry"
                      value={billingData.country}
                      onChange={(e) => setBillingData({ ...billingData, country: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors"
                    >
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Luxembourg">Luxembourg</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="billingNotes" className="block text-sm font-semibold text-chocolate-dark mb-2">
                      Notes (optionnel)
                    </label>
                    <textarea
                      id="billingNotes"
                      value={billingData.notes}
                      onChange={(e) => setBillingData({ ...billingData, notes: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark transition-colors resize-none"
                      placeholder="Instructions ou références pour la facturation..."
                    />
                  </div>
                </div>
              </motion.div>

              {/* CGU et bouton */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 p-6 md:p-8"
              >
                {/* Acceptation des CGU/CGV */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptedCGU}
                      onChange={(e) => setFormData({ ...formData, acceptedCGU: e.target.checked })}
                      className={`mt-1 w-5 h-5 rounded border-2 ${
                        errors.acceptedCGU ? 'border-red-500' : 'border-chocolate-dark/30'
                      } text-chocolate-dark focus:ring-chocolate-dark cursor-pointer`}
                    />
                    <span className="text-sm text-chocolate-dark/80">
                      En cliquant sur Procéder au paiement, vous acceptez les{' '}
                      <Link
                        href="/cgu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-chocolate-dark font-semibold hover:underline"
                      >
                        Conditions Générales d'Utilisation et de Vente
                      </Link>{' '}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.acceptedCGU && (
                    <p className="text-red-500 text-sm mt-1 ml-8">{errors.acceptedCGU}</p>
                  )}
                </div>

                <p className="text-sm text-chocolate-dark/70 mt-4">Toutes les transactions sont sécurisées et chiffrées.</p>

                {/* Bouton de soumission */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="w-full mt-6 bg-chocolate-dark text-chocolate-light px-6 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Traitement...' : 'Procéder au paiement'}
                </motion.button>
              </motion.div>
              </form>
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

                {/* Adresses utilisées pour la commande (même infos que les formulaires) */}
                <div className="space-y-4 mb-6 pb-6 border-b border-chocolate-dark/10">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-chocolate-dark/70 mb-1">Livraison</p>
                    <p className="text-sm text-chocolate-dark">
                      {formData.firstName} {formData.lastName}
                    </p>
                    {formData.address ? (
                      <>
                        <p className="text-sm text-chocolate-dark">{formData.address}</p>
                        <p className="text-sm text-chocolate-dark">
                          {[formData.postalCode, formData.city].filter(Boolean).join(' ')}
                          {formData.country ? `, ${formData.country}` : ''}
                        </p>
                        {formData.phone && <p className="text-sm text-chocolate-dark/80">{formData.phone}</p>}
                        {formData.email && <p className="text-sm text-chocolate-dark/80">{formData.email}</p>}
                      </>
                    ) : (
                      <p className="text-sm text-chocolate-dark/60">Remplissez le formulaire à gauche</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-chocolate-dark/70 mb-1">Facturation</p>
                    <p className="text-sm text-chocolate-dark">
                      {billingData.firstName} {billingData.lastName}
                    </p>
                    {billingData.address ? (
                      <>
                        <p className="text-sm text-chocolate-dark">{billingData.address}</p>
                        <p className="text-sm text-chocolate-dark">
                          {[billingData.postalCode, billingData.city].filter(Boolean).join(' ')}
                          {billingData.country ? `, ${billingData.country}` : ''}
                        </p>
                        {billingData.phone && <p className="text-sm text-chocolate-dark/80">{billingData.phone}</p>}
                        {billingData.email && <p className="text-sm text-chocolate-dark/80">{billingData.email}</p>}
                      </>
                    ) : (
                      <p className="text-sm text-chocolate-dark/60">Remplissez l&apos;adresse de facturation ou reprenez la livraison</p>
                    )}
                  </div>
                </div>

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
                    <span>Sous-total</span>
                    <span className="font-semibold">{cart.totalTTC.toFixed(2)} €</span>
                  </div>

                  {/* Expédition */}
                  <div className="flex justify-between items-center text-chocolate-dark/80">
                    <span>Expédition</span>
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
                      <span className="text-xl font-bold text-chocolate-dark">Total</span>
                      <span className="text-2xl font-bold text-chocolate-medium">EUR {totalWithShipping.toFixed(2)} €</span>
                    </div>
                    <p className="text-xs text-chocolate-dark/60 mt-1">Taxes incluses</p>
                  </div>
                </div>

                {/* Blocs d'information style référence (sans promotion) */}
                <div className="grid grid-cols-1 gap-4 pt-4 border-t border-chocolate-dark/10">
                  <div className="flex gap-3 items-start">
                    <span className="text-chocolate-dark/50 text-xl" aria-hidden>💳</span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-chocolate-dark/80">Paiement sécurisé</p>
                      <p className="text-xs text-chocolate-dark/70">Par carte bancaire</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-chocolate-dark/50 text-xl" aria-hidden>🎧</span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-chocolate-dark/80">À votre écoute</p>
                      <p className="text-xs text-chocolate-dark/70">Du lundi au vendredi de 10h à 18h</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-chocolate-dark/50 text-xl" aria-hidden>🚚</span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-chocolate-dark/80">Livraison offerte</p>
                      <p className="text-xs text-chocolate-dark/70">En France métropolitaine à partir de {FREE_SHIPPING_THRESHOLD}€ d'achat</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-chocolate-dark/50 text-xl" aria-hidden>🌿</span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-chocolate-dark/80">Marques engagées</p>
                      <p className="text-xs text-chocolate-dark/70">Pour une gastronomie plus juste et durable</p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/panier"
                  className="block text-center text-chocolate-dark/70 hover:text-chocolate-dark text-sm font-medium transition-colors mt-8"
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
