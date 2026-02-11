'use client'

import { motion } from 'framer-motion'
import { memo, useState } from 'react'
import SafeImage from './SafeImage'
import Lightbox from './Lightbox'

interface IllustrationCardProps {
  src: string
  fallbackSrc: string
  alt: string
  delay?: number
  /** Remplir tout le cadre (object-cover) au lieu de contenir l'image */
  cover?: boolean
  /** Ratio du cadre : square (défaut), video (16/9), 4/3 */
  aspectRatio?: 'square' | 'video' | '4/3'
}

const aspectClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  '4/3': 'aspect-[4/3]',
}

function IllustrationCardComponent({ src, fallbackSrc, alt, delay = 0, cover = false, aspectRatio = 'square' }: IllustrationCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsLightboxOpen(true)}
        className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer group ${cover ? 'bg-chocolate-dark/10' : 'bg-chocolate-light/50'}`}
      >
        <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]}`}>
          <SafeImage
            src={src}
            fallbackSrc={fallbackSrc}
            alt={alt}
            fill
            className={`transition-transform duration-300 group-hover:scale-110 ${cover ? '!object-cover !p-0 object-center' : 'object-contain p-4'}`}
            style={{ filter: 'sepia(15%) contrast(1.05)' }}
          />
        </div>
        <div className="absolute inset-0 bg-chocolate-dark/0 group-hover:bg-chocolate-dark/20 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
          <span className="text-chocolate-light font-semibold">Voir en grand</span>
        </div>
      </motion.div>
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageSrc={src}
        fallbackSrc={fallbackSrc}
        alt={alt}
      />
    </>
  )
}

export default memo(IllustrationCardComponent)


