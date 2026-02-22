'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import SafeImage from './SafeImage'

const VIDEO_EXTENSIONS = ['.mov', '.mp4', '.webm', '.ogg']

function isVideo(src: string) {
  return VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext))
}

export interface LightboxItem {
  src: string
  alt: string
}

interface MediaLightboxProps {
  isOpen: boolean
  onClose: () => void
  items: LightboxItem[]
  currentIndex: number
  onPrev: () => void
  onNext: () => void
  fallbackSrc?: string
}

export default function MediaLightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onPrev,
  onNext,
  fallbackSrc = '/images/emballage-1.svg',
}: MediaLightboxProps) {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const videoRef = useRef<HTMLVideoElement>(null)

  const item = items[currentIndex]
  const isVideoFile = item ? isVideo(item.src) : false

  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < items.length - 1

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setZoom(1)
      setPosition({ x: 0, y: 0 })
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') hasPrev && onPrev()
      if (e.key === 'ArrowRight') hasNext && onNext()
      if (!isVideoFile) {
        if (e.key === '+') setZoom((z) => Math.min(z + 0.1, 3))
        if (e.key === '-') setZoom((z) => Math.max(z - 0.1, 0.5))
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onPrev, onNext, hasPrev, hasNext, isVideoFile])

  useEffect(() => {
    if (isOpen) {
      setZoom(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [currentIndex, isOpen])

  const handleWheel = (e: React.WheelEvent) => {
    if (isVideoFile) return
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom((z) => Math.max(0.5, Math.min(3, z + delta)))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1 && !isVideoFile) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetZoom = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  if (!item) return null

  const { src, alt } = item

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 z-[100] backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[101] flex items-center justify-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose()
            }}
          >
            <div
              className={`absolute inset-0 ${isVideoFile ? '' : 'cursor-move'}`}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  transform: isVideoFile
                    ? 'none'
                    : `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {isVideoFile ? (
                  <video
                    key={src}
                    ref={videoRef}
                    src={src}
                    autoPlay
                    muted
                    playsInline
                    className="max-w-full max-h-full w-auto h-auto object-contain cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      const v = e.currentTarget
                      v.paused ? v.play() : v.pause()
                    }}
                    onEnded={() => videoRef.current?.pause()}
                  >
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                ) : (
                  <SafeImage
                    key={src}
                    src={src}
                    fallbackSrc={fallbackSrc}
                    alt={alt}
                    fill
                    className="object-contain"
                  />
                )}
              </motion.div>
            </div>

            {/* Prev / Next - flèches gauche et droite */}
            {items.length > 1 && (
              <>
                {hasPrev && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onPrev()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center p-4 bg-white/95 hover:bg-white text-chocolate-dark rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 touch-manipulation"
                    aria-label="Précédent"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                {hasNext && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onNext()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center p-4 bg-white/95 hover:bg-white text-chocolate-dark rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 touch-manipulation"
                    aria-label="Suivant"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </>
            )}

            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 text-white">
              {!isVideoFile && (
                <div className="flex items-center gap-1 bg-black/40 backdrop-blur rounded-full px-3 py-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setZoom((z) => Math.max(0.5, z - 0.1))
                    }}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 hover:bg-white/20 rounded-full transition-colors touch-manipulation"
                    aria-label="Zoom arrière"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="8" y1="11" x2="16" y2="11" />
                    </svg>
                  </button>
                  <span className="text-xs font-medium min-w-[2.5rem] text-center tabular-nums">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setZoom((z) => Math.min(3, z + 0.1))
                    }}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 hover:bg-white/20 rounded-full transition-colors touch-manipulation"
                    aria-label="Zoom avant"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  {zoom !== 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        resetZoom()
                      }}
                      className="min-h-[44px] ml-1 px-3 py-2 text-xs hover:bg-white/20 rounded-full transition-colors touch-manipulation"
                    >
                      Réinit.
                    </button>
                  )}
                </div>
              )}
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 bg-black/40 backdrop-blur hover:bg-black/60 rounded-full transition-colors touch-manipulation"
                aria-label="Fermer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs pointer-events-none">
              {items.length > 1 && (
                <span className="mr-2">{currentIndex + 1} / {items.length}</span>
              )}
              {isVideoFile
                ? 'Échap pour fermer • Flèches pour naviguer'
                : 'Molette pour zoomer • Glisser pour déplacer • Échap pour fermer • Flèches pour naviguer'}
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
