'use client'

import { motion } from 'framer-motion'
import { memo } from 'react'
import SafeImage from './SafeImage'

interface IllustrationCardProps {
  src: string
  fallbackSrc: string
  alt: string
  delay?: number
}

function IllustrationCardComponent({ src, fallbackSrc, alt, delay = 0 }: IllustrationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      className="relative overflow-hidden rounded-lg shadow-lg bg-chocolate-light/50 cursor-pointer group"
    >
      <div className="relative aspect-square">
        <SafeImage
          src={src}
          fallbackSrc={fallbackSrc}
          alt={alt}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
          style={{ filter: 'sepia(15%) contrast(1.05)' }}
        />
      </div>
      <div className="absolute inset-0 bg-chocolate-dark/0 group-hover:bg-chocolate-dark/20 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
        <span className="text-chocolate-light font-semibold">Voir en grand</span>
      </div>
    </motion.div>
  )
}

export default memo(IllustrationCardComponent)


