'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Order {
  id: string
  stripe_session_id: string
  status: string
  customer_first_name: string
  customer_last_name: string
  total_with_shipping: number
  created_at: string
  order_items: OrderItem[]
}

interface OrderItem {
  id: string
  product_name: string
  packaging: string
  quantity: number
  price_ttc: number
}

export default function ComptePage() {
  const { user, profile, loading: authLoading, signOut } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/checkout')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user && profile) {
      loadOrders()
    }
  }, [user, profile])

  const loadOrders = async () => {
    if (!profile) return

    try {
      // Récupérer les commandes par user_id (ID du profil)
      // Les commandes sont toujours créées avec user_id = profile.id dans le webhook
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select(`
          id,
          stripe_session_id,
          status,
          customer_first_name,
          customer_last_name,
          total_with_shipping,
          created_at,
          order_items (
            id,
            product_name,
            packaging,
            quantity,
            price_ttc
          )
        `)
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erreur lors du chargement des commandes:', error)
        return
      }

      setOrders(ordersData || [])
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chocolate-dark mx-auto mb-4"></div>
          <p className="text-chocolate-dark/70">Chargement...</p>
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
            <h2 className="text-2xl font-bold text-chocolate-dark mb-6 font-serif">
              Mes informations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-chocolate-dark/70 mb-1">Email</p>
                <p className="font-semibold text-chocolate-dark">{profile.email}</p>
              </div>
              {profile.first_name && (
                <div>
                  <p className="text-sm text-chocolate-dark/70 mb-1">Prénom</p>
                  <p className="font-semibold text-chocolate-dark">{profile.first_name}</p>
                </div>
              )}
              {profile.last_name && (
                <div>
                  <p className="text-sm text-chocolate-dark/70 mb-1">Nom</p>
                  <p className="font-semibold text-chocolate-dark">{profile.last_name}</p>
                </div>
              )}
              {profile.phone && (
                <div>
                  <p className="text-sm text-chocolate-dark/70 mb-1">Téléphone</p>
                  <p className="font-semibold text-chocolate-dark">{profile.phone}</p>
                </div>
              )}
              {profile.company && (
                <div>
                  <p className="text-sm text-chocolate-dark/70 mb-1">Entreprise</p>
                  <p className="font-semibold text-chocolate-dark">{profile.company}</p>
                </div>
              )}
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
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-chocolate-dark/20 rounded-lg p-4 hover:border-chocolate-dark/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-chocolate-dark">
                          Commande #{order.stripe_session_id.substring(0, 20)}...
                        </p>
                        <p className="text-sm text-chocolate-dark/70 mt-1">
                          {new Date(order.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-sm text-chocolate-dark/70">
                          {order.order_items.length} article(s)
                        </p>
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
                ))}
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
                    <p className="font-semibold text-chocolate-dark">{selectedOrder.stripe_session_id}</p>
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
                    <p className="text-sm text-chocolate-dark/70 mb-3">Articles</p>
                    <div className="space-y-2">
                      {selectedOrder.order_items.map((item) => (
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
