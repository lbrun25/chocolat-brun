'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import SafeImage from '@/components/SafeImage'
import { useRouter } from 'next/navigation'
import { getPackagingPrices } from '@/types/product'
import { calculateShippingCost, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const router = useRouter()
  
  // Calcul des frais de port
  const shippingCost = calculateShippingCost(cart.totalWeight, cart.totalTTC)
  const totalWithShipping = cart.totalTTC + shippingCost
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cart.totalTTC)

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-chocolate-light/30 via-white to-chocolate-light/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <svg
                  className="w-24 h-24 mx-auto text-chocolate-dark/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-chocolate-dark mb-4 font-serif">
                Votre panier est vide
              </h1>
              <p className="text-xl text-chocolate-dark/70 mb-8">
                Découvrez nos délicieux napolitains artisanaux
              </p>
              <Link
                href="/#nos-gouts"
                className="inline-block bg-chocolate-dark text-chocolate-light px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg"
              >
                Découvrir nos produits
              </Link>
            </motion.div>
          </div>
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
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-chocolate-dark mb-2 font-serif">
              Mon panier
            </h1>
            <p className="text-lg text-chocolate-dark/70">
              {cart.items.length} {cart.items.length === 1 ? 'article' : 'articles'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des articles */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item, index) => {
                const packagingInfo = getPackagingPrices(item.product)[item.packaging]
                const priceTTCPackaging = packagingInfo.priceTTC
                const totalTTC = priceTTCPackaging * item.quantity
                const pieces = packagingInfo.pieces
                const weight = packagingInfo.weight

                return (
                  <motion.div
                    key={`${item.product.id}-${item.packaging}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Image */}
                        <Link href={`/produits/${item.product.slug}`} className="flex-shrink-0">
                          <div className="relative w-full md:w-32 h-32 bg-chocolate-light/20 rounded-lg overflow-hidden">
                            <SafeImage
                              src={item.product.imageSrc}
                              fallbackSrc={item.product.fallbackSrc}
                              alt={item.product.imageAlt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Link>

                        {/* Détails */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <Link href={`/produits/${item.product.slug}`}>
                              <h3 className="text-2xl font-bold text-chocolate-dark mb-2 font-serif hover:text-chocolate-medium transition-colors">
                                {item.product.name}
                              </h3>
                            </Link>
                            <p className="text-chocolate-dark/70 mb-2">
                              Conditionnement : <span className="font-semibold">{pieces} pièces</span> ({weight}g net)
                            </p>
                            <div className="flex items-center gap-4 text-sm text-chocolate-dark/70">
                              <span className="font-semibold">{priceTTCPackaging.toFixed(2)} € TTC / unité</span>
                            </div>
                          </div>

                          {/* Contrôles quantité et prix */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-chocolate-dark/10">
                            {/* Quantité */}
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold text-chocolate-dark">Quantité :</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.packaging, item.quantity - 1)}
                                  className="w-8 h-8 rounded-lg border-2 border-chocolate-dark/30 hover:border-chocolate-dark hover:bg-chocolate-light/30 transition-all flex items-center justify-center"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                  </svg>
                                </button>
                                <span className="w-12 text-center font-semibold text-chocolate-dark">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.packaging, item.quantity + 1)}
                                  className="w-8 h-8 rounded-lg border-2 border-chocolate-dark/30 hover:border-chocolate-dark hover:bg-chocolate-light/30 transition-all flex items-center justify-center"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            {/* Prix total */}
                            <div className="text-right">
                              <div className="text-lg font-bold text-chocolate-dark">
                                {totalTTC.toFixed(2)} € TTC
                              </div>
                            </div>
                          </div>

                          {/* Bouton supprimer */}
                          <button
                            onClick={() => removeFromCart(item.product.id, item.packaging)}
                            className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              {/* Bouton vider le panier */}
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-chocolate-dark/70 hover:text-chocolate-dark text-sm font-medium transition-colors"
                >
                  Vider le panier
                </button>
              </div>
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

                <div className="space-y-4 mb-6">
                  {/* Sous-total */}
                  <div className="flex justify-between items-center text-chocolate-dark/80">
                    <span>Sous-total TTC</span>
                    <span className="font-semibold">{cart.totalTTC.toFixed(2)} €</span>
                  </div>

                  {/* Frais de port */}
                  <div className="flex justify-between items-center text-chocolate-dark/80 border-t border-chocolate-dark/10 pt-4">
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
                  {shippingCost > 0 && remainingForFreeShipping > 0 && (
                    <div className="bg-chocolate-light/30 rounded-lg p-3 text-sm text-chocolate-dark/70">
                      <p className="font-semibold mb-1">Livraison gratuite dès {FREE_SHIPPING_THRESHOLD}€</p>
                      <p>Il vous manque {remainingForFreeShipping.toFixed(2)} €</p>
                    </div>
                  )}

                  {/* Total */}
                  <div className="pt-4 border-t-2 border-chocolate-dark/20">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-chocolate-dark">Total TTC</span>
                      <span className="text-2xl font-bold text-chocolate-medium">{totalWithShipping.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6 text-sm text-chocolate-dark/60">
                  <p className="mb-2">Poids total : {(cart.totalWeight / 1000).toFixed(2)} kg</p>
                  <p>Nombre de pièces : {cart.items.reduce((sum, item) => {
                    const pieces = getPackagingPrices(item.product)[item.packaging].pieces
                    return sum + pieces * item.quantity
                  }, 0)}</p>
                </div>

                <motion.button
                  onClick={() => router.push('/checkout')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-chocolate-dark text-chocolate-light px-6 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg mb-4"
                >
                  Passer la commande
                </motion.button>

                <Link
                  href="/#nos-gouts"
                  className="block text-center text-chocolate-dark/70 hover:text-chocolate-dark text-sm font-medium transition-colors"
                >
                  ← Continuer mes achats
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
