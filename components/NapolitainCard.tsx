'use client'

import { motion } from 'framer-motion'
import { memo, useState } from 'react'
import SafeImage from './SafeImage'
import ProductModal from './ProductModal'

interface NapolitainCardProps {
  name: string
  description: string
  notes?: string
  ingredients?: string
  imageSrc: string
  fallbackSrc: string
  imageAlt: string
  delay?: number
}

function NapolitainCardComponent({
  name,
  description,
  notes,
  ingredients,
  imageSrc,
  fallbackSrc,
  imageAlt,
  delay = 0,
}: NapolitainCardProps) {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        whileHover={{ y: -5 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
      >
        {/* Image Container - Plus grande et cliquable */}
        <div 
          className="relative h-80 bg-white overflow-hidden cursor-pointer"
          onClick={() => setIsProductModalOpen(true)}
        >
          <SafeImage
            src={imageSrc}
            fallbackSrc={fallbackSrc}
            alt={imageAlt}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-125 p-6"
          />
          {/* Overlay avec indication */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white/90 rounded-full px-4 py-2 text-chocolate-dark font-semibold text-sm shadow-lg transform scale-95 group-hover:scale-100 transition-transform">
              Voir le produit
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-chocolate-dark mb-4 font-serif text-center">{name}</h3>
        </div>
      </motion.div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        name={name}
        description={description}
        notes={notes}
        ingredients={ingredients}
        imageSrc={imageSrc}
        fallbackSrc={fallbackSrc}
        imageAlt={imageAlt}
      />
    </>
  )
}

export default memo(NapolitainCardComponent)


