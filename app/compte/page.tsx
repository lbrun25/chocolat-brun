'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import CheckoutAuth from '@/components/CheckoutAuth'

interface Order {
  id: string
  stripe_session_id: string
  order_number?: string
  status: string
  customer_first_name: string
  customer_last_name: string
  customer_phone?: string | null
  customer_company?: string | null
  email?: string | null
  total_with_shipping: number
  created_at: string
  order_items: OrderItem[]
  shipping_address?: string | null
  shipping_city?: string | null
  shipping_postal_code?: string | null
  shipping_country?: string | null
  delivery_notes?: string | null
  payment_method?: string | null
  billing_first_name?: string | null
  billing_last_name?: string | null
  billing_phone?: string | null
  billing_email?: string | null
  billing_address?: string | null
  billing_city?: string | null
  billing_postal_code?: string | null
  billing_country?: string | null
}

interface OrderItem {
  id: string
  product_name: string
  packaging: string
  quantity: number
  price_ttc: number
}

export default function ComptePage() {
  const { user, profile, loading: authLoading, signOut, refreshSession, refreshProfile } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    company: '',
  })
  const [profileSaveError, setProfileSaveError] = useState<string | null>(null)
  const [profileSaving, setProfileSaving] = useState(false)
  const [showRetry, setShowRetry] = useState(false)
  const loadedForUserRef = useRef<string | null>(null)

  // Si le chargement prend trop longtemps, proposer un bouton Réessayer
  useEffect(() => {
    if (!authLoading && !(user && loading)) return
    const t = setTimeout(() => setShowRetry(true), 8000)
    return () => clearTimeout(t)
  }, [authLoading, user, loading])

  useEffect(() => {
    if (user && profile) {
      setProfileForm({
        first_name: profile.first_name ?? '',
        last_name: profile.last_name ?? '',
        phone: profile.phone ?? '',
        company: profile.company ?? '',
      })
      if (loadedForUserRef.current !== user.id) {
        loadedForUserRef.current = user.id
        setLoading(true)
        setShowRetry(false)
        loadOrders()
      } else {
        setLoading(false)
      }
    } else if (!user && !authLoading) {
      loadedForUserRef.current = null
      setLoading(false)
      setShowRetry(false)
    } else if (user && !profile && !authLoading) {
      setLoading(false)
      setShowRetry(true)
    }
  }, [user, profile, authLoading])

  const handleRetry = async () => {
    setShowRetry(false)
    loadedForUserRef.current = null
    setLoading(true)
    await refreshSession()
  }

  const hasPaidOrder = orders.some((o) => o.status === 'paid')
  // Les infos personnelles (nom, prénom, tél, entreprise) restent modifiables pour l'auto-complétion au checkout.
  // Seules les adresses des commandes passées sont figées (affichées en lecture seule).
  const canEditProfile = true

  const hasAddress = (order: Order) =>
    !!(order.shipping_address?.trim() || order.shipping_city?.trim() || order.shipping_postal_code?.trim())

  // Dernière adresse de livraison utilisée (commande payée la plus récente)
  const lastOrderWithAddress = orders.find(
    (o) => o.status === 'paid' && hasAddress(o)
  )

  // Dernière adresse de facturation (commande payée la plus récente avec données de facturation)
  const hasBilling = (order: Order) =>
    !!(
      order.billing_address?.trim() ||
      order.billing_city?.trim() ||
      order.billing_postal_code?.trim() ||
      order.billing_first_name?.trim() ||
      order.billing_last_name?.trim() ||
      order.billing_email?.trim() ||
      order.billing_phone?.trim()
    )
  const lastOrderWithBilling = orders.find(
    (o) => o.status === 'paid' && hasBilling(o)
  )

  function formatOrderAddress(order: Order): string {
    const parts = [
      order.shipping_address,
      [order.shipping_postal_code, order.shipping_city].filter(Boolean).join(' '),
      order.shipping_country,
    ].filter(Boolean)
    return parts.length ? parts.join(', ') : '—'
  }

  /** Adresse de livraison sur plusieurs lignes (comme au checkout) */
  function getOrderAddressLines(order: Order): { line1: string; line2: string; line3: string } {
    const line1 = order.shipping_address?.trim() || ''
    const line2 = [order.shipping_postal_code, order.shipping_city].filter(Boolean).join(' ')
    const country = order.shipping_country?.trim() || ''
    const countryLabel = country === 'FR' ? 'France' : country === 'BE' ? 'Belgique' : country === 'CH' ? 'Suisse' : country === 'LU' ? 'Luxembourg' : country
    return { line1, line2, line3: countryLabel }
  }

  /** Adresse de facturation sur plusieurs lignes */
  function getOrderBillingAddressLines(order: Order): { line1: string; line2: string; line3: string } {
    const line1 = order.billing_address?.trim() || ''
    const line2 = [order.billing_postal_code, order.billing_city].filter(Boolean).join(' ')
    const country = order.billing_country?.trim() || ''
    const countryLabel = country === 'FR' ? 'France' : country === 'BE' ? 'Belgique' : country === 'CH' ? 'Suisse' : country === 'LU' ? 'Luxembourg' : country
    return { line1, line2, line3: countryLabel }
  }

  function getPaymentMethodLabel(order: Order): string {
    if (order.payment_method) return order.payment_method
    return 'Carte bancaire'
  }

  const handleStartEditProfile = () => {
    if (!profile) return
    setProfileForm({
      first_name: profile.first_name ?? '',
      last_name: profile.last_name ?? '',
      phone: profile.phone ?? '',
      company: profile.company ?? '',
    })
    setProfileSaveError(null)
    setIsEditingProfile(true)
  }

  const handleCancelEditProfile = () => {
    setIsEditingProfile(false)
    setProfileSaveError(null)
  }

  const handleSaveProfile = async () => {
    if (!user || !profile) return
    setProfileSaving(true)
    setProfileSaveError(null)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profileForm.first_name.trim() || null,
          last_name: profileForm.last_name.trim() || null,
          phone: profileForm.phone.trim() || null,
          company: profileForm.company.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)

      if (error) throw error
      await refreshProfile()
      setIsEditingProfile(false)
    } catch (e: unknown) {
      setProfileSaveError(e instanceof Error ? e.message : 'Erreur lors de l\'enregistrement')
    } finally {
      setProfileSaving(false)
    }
  }

  const loadOrders = async () => {
    if (!profile) {
      setLoading(false)
      return
    }

    const selectWithBilling = `
        id,
        stripe_session_id,
        order_number,
        status,
        customer_first_name,
        customer_last_name,
        customer_phone,
        customer_company,
        email,
        total_with_shipping,
        created_at,
        shipping_address,
        shipping_city,
        shipping_postal_code,
        shipping_country,
        delivery_notes,
        billing_first_name,
        billing_last_name,
        billing_phone,
        billing_email,
        billing_address,
        billing_city,
        billing_postal_code,
        billing_country,
        order_items (
          id,
          product_name,
          packaging,
          quantity,
          price_ttc
        )
      `
    const selectWithoutBilling = `
        id,
        stripe_session_id,
        order_number,
        status,
        customer_first_name,
        customer_last_name,
        customer_phone,
        customer_company,
        email,
        total_with_shipping,
        created_at,
        shipping_address,
        shipping_city,
        shipping_postal_code,
        shipping_country,
        delivery_notes,
        order_items (
          id,
          product_name,
          packaging,
          quantity,
          price_ttc
        )
      `

    const runQuery = async (selectQuery: string): Promise<{ error: unknown; data: Order[] | null }> => {
      const [byUserId, byEmail] = await Promise.all([
        supabase.from('orders').select(selectQuery).eq('user_id', profile.id).order('created_at', { ascending: false }),
        supabase.from('orders').select(selectQuery).eq('email', profile.email).order('created_at', { ascending: false }),
      ])
      const error = byUserId.error || byEmail.error
      if (error) return { error, data: null }
      const rawA = (byUserId.data || []) as unknown as Order[]
      const rawB = (byEmail.data || []) as unknown as Order[]
      const seen = new Set<string>()
      const ordersData: Order[] = [...rawA, ...rawB]
        .filter(o => {
          if (seen.has(o.id)) return false
          seen.add(o.id)
          return true
        })
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      return { error: null, data: ordersData }
    }

    try {
      let result = await runQuery(selectWithBilling)
      if (result.error) {
        result = await runQuery(selectWithoutBilling)
      }
      if (result.error) {
        setOrders([])
        return
      }
      setOrders(result.data || [])
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  // Afficher le chargement uniquement : pendant l'auth, ou pendant le chargement des commandes (si connecté)
  if (authLoading || (user && loading)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chocolate-dark mx-auto mb-4"></div>
          <p className="text-chocolate-dark/70">Chargement...</p>
          {showRetry && (
            <button
              type="button"
              onClick={handleRetry}
              className="mt-6 px-6 py-3 bg-chocolate-dark text-chocolate-light rounded-lg font-semibold hover:bg-chocolate-dark/90 transition-colors"
            >
              Réessayer
            </button>
          )}
        </div>
      </div>
    )
  }

  // Utilisateur non connecté : afficher le formulaire de connexion/inscription
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-chocolate-dark mb-8 font-serif">
              Mon compte
            </h1>
            <CheckoutAuth
              allowGuest={false}
              onGuestContinue={() => {}}
              onAuthenticated={async () => {
                await refreshSession()
                // Déjà sur /compte : pas de redirection, le state AuthContext met à jour l'UI
              }}
            />
          </motion.div>
        </div>
      </div>
    )
  }

  // Profil inaccessible (ex: AbortError après réinitialisation mot de passe) — proposer Réessayer
  if (user && !profile && !authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <p className="text-chocolate-dark/70 mb-4">
            Impossible de charger votre profil. Vérifiez votre connexion et réessayez.
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="px-6 py-3 bg-chocolate-dark text-chocolate-light rounded-lg font-semibold hover:bg-chocolate-dark/90 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-chocolate-dark font-serif">
              Mon compte
            </h1>
            <button
              onClick={handleSignOut}
              className="px-6 py-3 bg-chocolate-dark/10 text-chocolate-dark rounded-lg font-semibold hover:bg-chocolate-dark/20 transition-colors"
            >
              Se déconnecter
            </button>
          </div>

          {/* Informations du profil */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 p-6 md:p-8 mb-8"
          >
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-chocolate-dark font-serif">
                Mes informations
              </h2>
              {canEditProfile && !isEditingProfile && (
                <button
                  type="button"
                  onClick={handleStartEditProfile}
                  className="px-4 py-2 bg-chocolate-dark text-chocolate-light rounded-lg font-semibold hover:bg-chocolate-dark/90 transition-colors"
                >
                  Modifier
                </button>
              )}
              {canEditProfile && isEditingProfile && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCancelEditProfile}
                    className="px-4 py-2 bg-chocolate-dark/10 text-chocolate-dark rounded-lg font-semibold hover:bg-chocolate-dark/20 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={profileSaving}
                    className="px-4 py-2 bg-chocolate-dark text-chocolate-light rounded-lg font-semibold hover:bg-chocolate-dark/90 transition-colors disabled:opacity-50"
                  >
                    {profileSaving ? 'Enregistrement…' : 'Enregistrer'}
                  </button>
                </div>
              )}
            </div>
            {!isEditingProfile && (
              <p className="text-sm text-chocolate-dark/70 mb-6">
                Ces informations sont utilisées pour pré-remplir le formulaire lors de vos prochaines commandes.
              </p>
            )}

            {isEditingProfile ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="compte-last_name" className="block text-sm font-medium text-chocolate-dark/70 mb-1">Nom</label>
                    <input
                      id="compte-last_name"
                      type="text"
                      value={profileForm.last_name}
                      onChange={(e) => setProfileForm((p) => ({ ...p, last_name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="compte-first_name" className="block text-sm font-medium text-chocolate-dark/70 mb-1">Prénom</label>
                    <input
                      id="compte-first_name"
                      type="text"
                      value={profileForm.first_name}
                      onChange={(e) => setProfileForm((p) => ({ ...p, first_name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label htmlFor="compte-phone" className="block text-sm font-medium text-chocolate-dark/70 mb-1">Téléphone</label>
                    <input
                      id="compte-phone"
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="compte-company" className="block text-sm font-medium text-chocolate-dark/70 mb-1">Entreprise (optionnel)</label>
                  <input
                    id="compte-company"
                    type="text"
                    value={profileForm.company}
                    onChange={(e) => setProfileForm((p) => ({ ...p, company: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark"
                    placeholder="Nom de l'entreprise"
                  />
                </div>
                <p className="text-sm text-chocolate-dark/60">
                  L&apos;adresse de livraison est renseignée à chaque commande au checkout.
                </p>
                {profileSaveError && (
                  <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{profileSaveError}</p>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-8 md:gap-x-12 gap-y-4 md:gap-y-5">
                  <p className="text-sm text-chocolate-dark/70 md:py-0.5">Nom</p>
                  <p className="font-semibold text-chocolate-dark uppercase md:py-0.5">
                    {profile.last_name || 'Non renseigné'}
                  </p>
                  <p className="text-sm text-chocolate-dark/70 md:py-0.5">Prénom</p>
                  <p className="font-semibold text-chocolate-dark md:py-0.5">
                    {profile.first_name
                      ? profile.first_name.charAt(0).toUpperCase() + profile.first_name.slice(1).toLowerCase()
                      : 'Non renseigné'}
                  </p>
                  <p className="text-sm text-chocolate-dark/70 md:py-0.5">Numéro de téléphone</p>
                  <p className="font-semibold text-chocolate-dark md:py-0.5">{profile.phone || 'Non renseigné'}</p>
                  <p className="text-sm text-chocolate-dark/70 md:py-0.5">Adresse de livraison</p>
                  <div className="font-semibold text-chocolate-dark md:py-0.5">
                    {lastOrderWithAddress ? (
                      <>
                        {(() => {
                          const { line1, line2, line3 } = getOrderAddressLines(lastOrderWithAddress)
                          const hasName = lastOrderWithAddress.customer_first_name?.trim() || lastOrderWithAddress.customer_last_name?.trim()
                          return (
                            <div className="space-y-0.5">
                              {hasName && (
                                <p>
                                  {[lastOrderWithAddress.customer_first_name, lastOrderWithAddress.customer_last_name].filter(Boolean).join(' ')}
                                </p>
                              )}
                              {line1 && <p>{line1}</p>}
                              {line2 && <p>{line2}</p>}
                              {line3 && <p>{line3}</p>}
                              {!line1 && !line2 && !line3 && !hasName && <p>—</p>}
                            </div>
                          )
                        })()}
                        <p className="text-xs font-normal text-chocolate-dark/60 mt-2">
                          Dernière adresse utilisée (commande du{' '}
                          {new Date(lastOrderWithAddress.created_at).toLocaleDateString('fr-FR')})
                        </p>
                      </>
                    ) : (
                      <p>Renseignée à chaque commande</p>
                    )}
                  </div>
                  {hasPaidOrder && (
                    <>
                      <p className="text-sm text-chocolate-dark/70 md:py-0.5">Adresse de facturation</p>
                      <div className="font-semibold text-chocolate-dark md:py-0.5">
                        {lastOrderWithBilling ? (
                          <>
                            <p className="text-xs font-normal text-chocolate-dark/60 mb-1.5">
                              Enregistrée pour la facture, non modifiable.
                            </p>
                            <div className="space-y-0.5">
                              {(lastOrderWithBilling.billing_first_name?.trim() || lastOrderWithBilling.billing_last_name?.trim()) && (
                                <p>
                                  {[lastOrderWithBilling.billing_first_name, lastOrderWithBilling.billing_last_name].filter(Boolean).join(' ')}
                                </p>
                              )}
                              {(() => {
                                const { line1, line2, line3 } = getOrderBillingAddressLines(lastOrderWithBilling)
                                return (
                                  <>
                                    {line1 && <p>{line1}</p>}
                                    {(line2 || line3) && (
                                      <p>{[line2, line3].filter(Boolean).join(' — ')}</p>
                                    )}
                                  </>
                                )
                              })()}
                              {lastOrderWithBilling.billing_phone && (
                                <p className="text-chocolate-dark/80">{lastOrderWithBilling.billing_phone}</p>
                              )}
                              {lastOrderWithBilling.billing_email && (
                                <p className="text-chocolate-dark/80">{lastOrderWithBilling.billing_email}</p>
                              )}
                            </div>
                            <p className="text-xs font-normal text-chocolate-dark/60 mt-2">
                              Dernière adresse utilisée (commande du{' '}
                              {new Date(lastOrderWithBilling.created_at).toLocaleDateString('fr-FR')})
                            </p>
                          </>
                        ) : (
                          <p className="text-chocolate-dark/80">Non enregistrée pour vos commandes payées.</p>
                        )}
                      </div>
                    </>
                  )}
                  <p className="text-sm text-chocolate-dark/70 md:py-0.5">Entreprise</p>
                  <p className="font-semibold text-chocolate-dark md:py-0.5">{profile.company || 'Non renseigné'}</p>
                </div>
                {profile.is_guest && (
                  <div className="md:col-span-2">
                    <div className="bg-chocolate-light/30 rounded-lg p-4">
                      <p className="text-sm text-chocolate-dark/70 mb-2">
                        Vous avez commandé en mode invité. Créez un mot de passe pour retrouver facilement vos commandes la prochaine fois.
                      </p>
                      <Link
                        href="/compte/creer-mot-de-passe"
                        className="inline-block bg-chocolate-dark text-chocolate-light px-4 py-2 rounded-lg text-sm font-semibold hover:bg-chocolate-dark/90 transition-colors"
                      >
                        Créer un mot de passe
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Liste des commandes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-chocolate-dark mb-6 font-serif">
              Mes commandes
            </h2>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-chocolate-dark/70 mb-4">Aucune commande pour le moment.</p>
                <Link
                  href="/"
                  className="inline-block bg-chocolate-dark text-chocolate-light px-6 py-3 rounded-lg font-semibold hover:bg-chocolate-dark/90 transition-colors"
                >
                  Découvrir nos produits
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const items = order.order_items || []
                  return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-chocolate-dark/20 rounded-lg p-4 hover:border-chocolate-dark/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-chocolate-dark">
                          Commande #{order.order_number ?? order.stripe_session_id.substring(0, 20) + '…'}
                        </p>
                        <p className="text-sm text-chocolate-dark/70 mt-1">
                          {new Date(order.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-sm text-chocolate-dark/70 mt-1">
                          {items.length} article(s)
                        </p>
                        {/* Adresse de livraison (résumé) */}
                        {(order.shipping_address || order.shipping_city) && (
                          <p className="text-sm text-chocolate-dark/70 mt-2">
                            Livraison : {formatOrderAddress(order)}
                          </p>
                        )}
                        {/* Récap produits directement visible */}
                        {items.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-chocolate-dark/10">
                            <p className="text-xs font-medium text-chocolate-dark/60 mb-1.5">Récapitulatif :</p>
                            <ul className="text-sm text-chocolate-dark/80 space-y-1">
                              {items.map((item) => (
                                <li key={item.id}>
                                  {item.product_name} — {item.packaging} pièces × {item.quantity} · {(item.price_ttc * item.quantity).toFixed(2)} €
                                </li>
                              ))}
                            </ul>
                            <p className="text-xs text-chocolate-dark/60 mt-1.5">
                              Paiement : {getPaymentMethodLabel(order)}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-chocolate-dark text-lg">
                          {order.total_with_shipping.toFixed(2)} €
                        </p>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${
                          order.status === 'paid' ? 'bg-green-100 text-green-700' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'delivered' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {order.status === 'paid' ? 'Payée' :
                           order.status === 'processing' ? 'En préparation' :
                           order.status === 'shipped' ? 'Expédiée' :
                           order.status === 'delivered' ? 'Livrée' :
                           order.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>

          {/* Modal de détails de commande */}
          {selectedOrder && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedOrder(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-chocolate-dark font-serif">
                    Détails de la commande
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-chocolate-dark/70 hover:text-chocolate-dark p-1 rounded-lg hover:bg-chocolate-dark/10 transition-colors"
                    aria-label="Fermer"
                  >
                    <X className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-chocolate-dark/70 mb-1">Numéro de commande</p>
                    <p className="font-semibold text-chocolate-dark">{selectedOrder.order_number ?? selectedOrder.stripe_session_id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-chocolate-dark/70 mb-1">Date</p>
                    <p className="font-semibold text-chocolate-dark">
                      {new Date(selectedOrder.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-chocolate-dark/70 mb-1">Statut</p>
                    <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                      selectedOrder.status === 'paid' ? 'bg-green-100 text-green-700' :
                      selectedOrder.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      selectedOrder.status === 'delivered' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedOrder.status === 'paid' ? 'Payée' :
                       selectedOrder.status === 'processing' ? 'En préparation' :
                       selectedOrder.status === 'shipped' ? 'Expédiée' :
                       selectedOrder.status === 'delivered' ? 'Livrée' :
                       selectedOrder.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-chocolate-dark/70 mb-3">Récapitulatif des produits</p>
                    <div className="space-y-2">
                      {(selectedOrder.order_items || []).map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b border-chocolate-dark/10">
                          <div>
                            <p className="font-semibold text-chocolate-dark">{item.product_name}</p>
                            <p className="text-sm text-chocolate-dark/70">
                              {item.packaging} pièces × {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold text-chocolate-dark">
                            {(item.price_ttc * item.quantity).toFixed(2)} €
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {(selectedOrder.shipping_address || selectedOrder.shipping_city || selectedOrder.customer_first_name || selectedOrder.customer_last_name) && (
                    <div>
                      <p className="text-sm text-chocolate-dark/70 mb-1">Adresse de livraison</p>
                      <div className="font-semibold text-chocolate-dark space-y-0.5">
                        {(selectedOrder.customer_first_name || selectedOrder.customer_last_name) && (
                          <p>
                            {[selectedOrder.customer_first_name, selectedOrder.customer_last_name].filter(Boolean).join(' ')}
                          </p>
                        )}
                        {selectedOrder.customer_company && (
                          <p>{selectedOrder.customer_company}</p>
                        )}
                        {(() => {
                          const { line1, line2, line3 } = getOrderAddressLines(selectedOrder)
                          return (
                            <>
                              {line1 && <p>{line1}</p>}
                              {(line2 || line3) && (
                                <p>{[line2, line3].filter(Boolean).join(' — ')}</p>
                              )}
                            </>
                          )
                        })()}
                        {selectedOrder.customer_phone && (
                          <p className="text-chocolate-dark/80">{selectedOrder.customer_phone}</p>
                        )}
                        {selectedOrder.email && (
                          <p className="text-chocolate-dark/80">{selectedOrder.email}</p>
                        )}
                        {selectedOrder.delivery_notes && (
                          <p className="text-chocolate-dark/80">
                            <span className="font-medium">Notes :</span> {selectedOrder.delivery_notes}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-chocolate-dark/70 mb-1">Adresse de facturation</p>
                    <p className="text-xs text-chocolate-dark/60 mb-2">Figée au moment du paiement, non modifiable.</p>
                    {(selectedOrder.billing_address?.trim() || selectedOrder.billing_city?.trim() || selectedOrder.billing_first_name || selectedOrder.billing_last_name) ? (
                      <div className="font-semibold text-chocolate-dark space-y-0.5">
                        {(selectedOrder.billing_first_name || selectedOrder.billing_last_name) && (
                          <p>
                            {[selectedOrder.billing_first_name, selectedOrder.billing_last_name].filter(Boolean).join(' ')}
                          </p>
                        )}
                        {(() => {
                          const { line1, line2, line3 } = getOrderBillingAddressLines(selectedOrder)
                          return (
                            <>
                              {line1 && <p>{line1}</p>}
                              {(line2 || line3) && (
                                <p>
                                  {[line2, line3].filter(Boolean).join(' — ')}
                                </p>
                              )}
                            </>
                          )
                        })()}
                        {selectedOrder.billing_phone && (
                          <p className="text-chocolate-dark/80">{selectedOrder.billing_phone}</p>
                        )}
                        {selectedOrder.billing_email && (
                          <p className="text-chocolate-dark/80">{selectedOrder.billing_email}</p>
                        )}
                      </div>
                    ) : (
                      <p className="font-semibold text-chocolate-dark">Non enregistrée pour cette commande.</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-chocolate-dark/70 mb-1">Mode de paiement</p>
                    <p className="font-semibold text-chocolate-dark">
                      {getPaymentMethodLabel(selectedOrder)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-chocolate-dark/20">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-chocolate-dark">Total</span>
                      <span className="text-xl font-bold text-chocolate-medium">
                        {selectedOrder.total_with_shipping.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
