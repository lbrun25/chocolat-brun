'use client'

import { motion } from 'framer-motion'
import { memo, useState } from 'react'
import SafeImage from './SafeImage'
import MediaLightbox from './MediaLightbox'

const VIDEO_EXTENSIONS = ['.mov', '.mp4', '.webm', '.ogg']
const FALLBACK_IMAGE = '/images/emballage-1.svg'

function isVideo(src: string) {
  return VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext))
}

export interface MediaItem {
  src: string
  alt: string
  type: 'image' | 'video'
}

interface MediaCardProps {
  src: string
  alt: string
  delay?: number
  aspectRatio?: 'square' | 'video' | '4/3'
  /** En mode galerie : appelle ce callback au lieu d'ouvrir le lightbox intégré */
  onOpen?: () => void
}

const aspectClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  '4/3': 'aspect-[4/3]',
}

function MediaCardComponent({
  src,
  alt,
  delay = 0,
  aspectRatio = 'square',
  onOpen,
}: MediaCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const isVideoFile = isVideo(src)
  const handleClick = onOpen ?? (() => setIsLightboxOpen(true))

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        onClick={handleClick}
        className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group bg-chocolate-dark/10"
      >
        <div className={`relative w-full overflow-hidden ${aspectClasses[aspectRatio]} bg-chocolate-dark/10`}>
          {isVideoFile ? (
            <>
              <div className="absolute inset-0 overflow-hidden">
                <video
                  src={src}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute left-1/2 top-1/2 min-h-full min-w-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    filter: 'sepia(15%) contrast(1.05)',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-chocolate-dark ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <SafeImage
              src={src}
              fallbackSrc={FALLBACK_IMAGE}
              alt={alt}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-110 !p-0"
              style={{ filter: 'sepia(15%) contrast(1.05)' }}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-chocolate-dark/0 group-hover:bg-chocolate-dark/20 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
          <span className="text-chocolate-light font-semibold">
            {isVideoFile ? 'Lire la vidéo' : 'Voir en grand'}
          </span>
        </div>
      </motion.div>
      {!onOpen && (
        <MediaLightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          items={[{ src, alt }]}
          currentIndex={0}
          onPrev={() => {}}
          onNext={() => {}}
        />
      )}
    </>
  )
}

export default memo(MediaCardComponent)
export { isVideo }
