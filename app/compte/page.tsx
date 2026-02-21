'use client'

import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useOrders } from '@/hooks/useOrders'
import CheckoutAuth from '@/components/CheckoutAuth'
import ProfileSection from '@/components/compte/ProfileSection'
import OrderList from '@/components/compte/OrderList'

export default function ComptePage() {
  const { user, profile, loading: authLoading, signOut, refreshSession } = useAuth()
  const router = useRouter()
  const { orders, loading: ordersLoading } = useOrders(profile?.id, profile?.email)

  const isLoading = authLoading || (user && !profile) || ordersLoading

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chocolate-dark mx-auto mb-4" />
          <p className="text-chocolate-dark/70">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-chocolate-dark mb-8 font-serif">Mon compte</h1>
            <CheckoutAuth
              allowGuest={false}
              onGuestContinue={() => {}}
              onAuthenticated={() => refreshSession()}
            />
          </motion.div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <p className="text-chocolate-dark/70 mb-4">Impossible de charger votre profil. Vérifiez votre connexion et réessayez.</p>
          <button type="button" onClick={() => refreshSession()}
            className="px-6 py-3 bg-chocolate-dark text-chocolate-light rounded-lg font-semibold hover:bg-chocolate-dark/90 transition-colors">
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-chocolate-dark font-serif">Mon compte</h1>
            <button type="button" onClick={async () => { await signOut(); router.push('/') }}
              className="min-h-[44px] px-6 py-3 bg-chocolate-dark/10 text-chocolate-dark rounded-lg font-semibold hover:bg-chocolate-dark/20 active:bg-chocolate-dark/25 transition-colors touch-manipulation">
              Se déconnecter
            </button>
          </div>

          <ProfileSection orders={orders} />
          <OrderList orders={orders} />
        </motion.div>
      </div>
    </div>
  )
}
