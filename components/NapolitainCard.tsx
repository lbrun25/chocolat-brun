'use client'

import { motion } from 'framer-motion'
import { memo, useState } from 'react'
import Link from 'next/link'
import SafeImage from './SafeImage'
import { Product } from '@/types/product'
import { useCart } from '@/contexts/CartContext'

interface NapolitainCardProps {
  product: Product
  delay?: number
  simple?: boolean
}

function NapolitainCardComponent({
  product,
  delay = 0,
  simple = false,
}: NapolitainCardProps) {
  const { addToCart } = useCart()
  const [showSuccess, setShowSuccess] = useState(false)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, '40', 1)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-chocolate-light/50"
    >
      <Link href={`/produits/${product.slug}`}>
        {/* Image Container avec fond dégradé élégant - Ratio carré */}
        <div className="relative aspect-square bg-gradient-to-br from-chocolate-light/30 via-white to-chocolate-light/20 overflow-hidden cursor-pointer">
          {/* Décoration subtile en arrière-plan */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-chocolate-dark rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-chocolate-medium rounded-full blur-2xl"></div>
          </div>
          
          {/* Image du produit - Zoomé pour remplir l'espace */}
          <div className="relative h-full w-full">
            <SafeImage
              src={product.imageSrc}
              fallbackSrc={product.fallbackSrc}
              alt={product.imageAlt}
              fill
              className="object-cover object-center scale-110 transition-transform duration-700 group-hover:scale-125"
            />
          </div>

          {/* Overlay avec indication au hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-chocolate-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 text-chocolate-dark font-semibold text-sm shadow-xl border border-chocolate-light/50"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Voir les détails
              </span>
            </motion.div>
          </div>

          {/* Badge artisanal en haut à droite */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-chocolate-dark/90 backdrop-blur-sm text-chocolate-light text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              ✦ Artisanal
            </div>
          </div>
        </div>
      </Link>

      {/* Contenu de la carte */}
      <div className={`${simple ? 'p-4' : 'p-6'} space-y-4`}>
        {/* Titre */}
        <Link href={`/produits/${product.slug}`}>
          <h3 className={`${simple ? 'text-xl' : 'text-2xl'} font-bold text-chocolate-dark font-serif text-center group-hover:text-chocolate-medium transition-colors duration-300`}>
            {product.name}
          </h3>
        </Link>

        {/* Notes de dégustation */}
        {product.notes && (
          <div className="flex flex-wrap gap-2 justify-center">
            {product.notes.split(' • ').map((note, index) => (
              <span
                key={index}
                className="inline-block bg-chocolate-light/50 text-chocolate-dark text-xs font-medium px-3 py-1.5 rounded-full border border-chocolate-light"
              >
                {note}
              </span>
            ))}
          </div>
        )}

        {/* Bouton Ajouter au panier pour la version simple */}
        {simple && (
          <div className="pt-2">
            <motion.button
              onClick={handleQuickAdd}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-chocolate-medium text-white font-semibold text-sm py-3 rounded-lg hover:bg-chocolate-medium/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                className="text-center text-sm text-green-600 font-medium mt-2"
              >
                ✓ Ajouté !
              </motion.div>
            )}
          </div>
        )}

        {/* Contenu complet (prix, description, actions) - seulement si simple = false */}
        {!simple && (
          <>
            {/* Prix */}
            <div className="text-center">
              <span className="text-xl font-bold text-chocolate-medium">{product.priceHT.toFixed(2)} € HT</span>
              <span className="text-sm text-chocolate-dark/70 ml-2">({(product.priceHT * 1.055).toFixed(2)} € TTC)</span>
            </div>

            {/* Description courte */}
            <p className="text-chocolate-dark/70 text-sm text-center leading-relaxed line-clamp-2">
              {product.description}
            </p>

            {/* Ajout au panier */}
            <div className="pt-2 space-y-3">
              <motion.button
                onClick={handleQuickAdd}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-chocolate-medium text-white font-semibold text-sm py-3 rounded-lg hover:bg-chocolate-medium/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  className="text-center text-sm text-green-600 font-medium"
                >
                  ✓ Ajouté !
                </motion.div>
              )}
              <Link
                href={`/produits/${product.slug}`}
                className="w-full text-chocolate-medium hover:text-chocolate-dark font-semibold text-sm py-2 rounded-lg hover:bg-chocolate-light/30 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
              >
                En savoir plus
                <svg 
                  className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Bordure décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-chocolate-medium/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  )
}

export default memo(NapolitainCardComponent)


