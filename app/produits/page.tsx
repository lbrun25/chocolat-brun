'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import NapolitainCard from '@/components/NapolitainCard'
import { products } from '@/lib/products'

const PRODUCT_ORDER = [
  'chocolat-noir-cafe',
  'chocolat-lait',
  'chocolat-blanc',
  'chocolat-dulcey',
  'chocolat-noir',
] as const

const orderedProducts = PRODUCT_ORDER
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean)

export default function ProduitsPage() {
  return (
    <div className="artisan-texture">
      <section className="py-16 md:py-24 bg-chocolate-light/30 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-chocolate-dark mb-4 font-serif">
              Nos produits
            </h1>
            <p className="text-xl text-chocolate-dark/70 font-sans max-w-2xl mx-auto">
              Découvrez notre gamme complète de napolitains artisanaux, fabriqués avec soin à Charquemont.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto"
          >
            {orderedProducts.map((product, index) => (
              <motion.div
                key={product!.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index, ease: 'easeOut' }}
              >
                <NapolitainCard
                  product={product!}
                  delay={index * 0.05}
                  simple={true}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link
              href="/prix"
              className="inline-flex items-center gap-2 text-chocolate-dark hover:text-chocolate-medium font-medium transition-colors"
            >
              Voir nos assortiments et tarifs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
