'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import SafeImage from '@/components/SafeImage'
import { getProductBySlug } from '@/lib/products'
import { useCart } from '@/contexts/CartContext'

interface ProductPageProps {
  params: { slug: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params
  const product = getProductBySlug(slug)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addToCart(product, '40', quantity)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const priceForPackaging = product.priceHT // Prix pour 40 pièces (200g)
  const priceTTCPackaging = priceForPackaging * 1.055
  const totalHT = priceForPackaging * quantity
  const totalTTC = totalHT * 1.055

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec breadcrumb */}
      <div className="bg-chocolate-light/30 border-b border-chocolate-dark/10">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-chocolate-dark/70">
            <Link href="/" className="hover:text-chocolate-dark transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/#nos-gouts" className="hover:text-chocolate-dark transition-colors">
              Nos goûts
            </Link>
            <span>/</span>
            <span className="text-chocolate-dark font-semibold">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative h-[500px] md:h-[600px] bg-chocolate-light/20 rounded-lg overflow-hidden">
              <div className="relative w-full h-full p-8">
                <SafeImage
                  src={product.imageSrc}
                  fallbackSrc={product.fallbackSrc}
                  alt={product.imageAlt}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6 flex flex-col justify-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-chocolate-dark mb-4 font-serif">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-chocolate-medium">
                  {priceForPackaging.toFixed(2)} € HT
                </span>
                <span className="text-xl text-chocolate-dark/70">
                  ({priceTTCPackaging.toFixed(2)} € TTC)
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-2xl font-bold text-chocolate-dark mb-3 font-serif">Description</h3>
              <p className="text-lg text-chocolate-dark/80 leading-relaxed font-sans">{product.description}</p>
            </div>

            {/* Notes aromatiques */}
            {product.notes && (
              <div>
                <h3 className="text-2xl font-bold text-chocolate-dark mb-3 font-serif">Notes aromatiques</h3>
                <div className="flex flex-wrap gap-2">
                  {product.notes.split(' • ').map((note, index) => (
                    <span
                      key={index}
                      className="inline-block bg-chocolate-light/50 text-chocolate-dark text-sm font-medium px-3 py-1.5 rounded-full border border-chocolate-light"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Composition */}
            {(product.ingredients || product.allergens) && (
              <div>
                <h3 className="text-2xl font-bold text-chocolate-dark mb-3 font-serif">Composition</h3>
                {product.ingredients && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-chocolate-dark mb-2 font-serif">Ingrédients</h4>
                    <p className="text-lg text-chocolate-dark/80 leading-relaxed font-sans">{product.ingredients}</p>
                  </div>
                )}
                {product.allergens && (
                  <div>
                    <h4 className="text-lg font-semibold text-chocolate-dark mb-2 font-serif">Allergènes</h4>
                    <p className="text-lg text-chocolate-dark/80 leading-relaxed font-sans font-medium">{product.allergens}</p>
                  </div>
                )}
              </div>
            )}

            {/* Conditionnement */}
            <div className="pt-6 border-t border-chocolate-dark/10">
              <h3 className="text-xl font-bold text-chocolate-dark mb-4 font-serif">Conditionnement</h3>
              <div className="bg-chocolate-light/30 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="font-bold text-2xl text-chocolate-dark mb-2">40 pièces</div>
                  <div className="text-lg text-chocolate-dark/70 mb-3">200 g net</div>
                  <div className="text-xl font-bold text-chocolate-medium">{product.priceHT.toFixed(2)} € HT</div>
                  <div className="text-sm text-chocolate-dark/70">({priceTTCPackaging.toFixed(2)} € TTC)</div>
                </div>
              </div>

              {/* Quantité */}
              <div className="mb-6">
                <label className="block text-lg font-semibold text-chocolate-dark mb-3">Quantité</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border-2 border-chocolate-dark/30 hover:border-chocolate-dark hover:bg-chocolate-light/30 transition-all flex items-center justify-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center text-xl font-bold border-2 border-chocolate-dark/30 rounded-lg py-2 focus:outline-none focus:border-chocolate-dark"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border-2 border-chocolate-dark/30 hover:border-chocolate-dark hover:bg-chocolate-light/30 transition-all flex items-center justify-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="bg-chocolate-light/30 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-chocolate-dark">Total HT</span>
                  <span className="text-xl font-bold text-chocolate-dark">{totalHT.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center text-sm text-chocolate-dark/70 mb-2">
                  <span>TVA (5.5%)</span>
                  <span>{(totalHT * 0.055).toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-chocolate-dark/20">
                  <span className="text-xl font-bold text-chocolate-dark">Total TTC</span>
                  <span className="text-2xl font-bold text-chocolate-medium">{totalTTC.toFixed(2)} €</span>
                </div>
              </div>

              {/* Bouton Ajouter au panier */}
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-chocolate-dark text-chocolate-light px-8 py-5 rounded-lg text-xl font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg flex items-center justify-center gap-3"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Ajouter au panier
              </motion.button>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 bg-green-500 text-white p-4 rounded-lg text-center"
                >
                  ✓ Produit ajouté au panier !
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
