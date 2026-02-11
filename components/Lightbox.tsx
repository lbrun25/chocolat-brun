'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import SafeImage from './SafeImage'

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  fallbackSrc: string
  alt: string
  title?: string
}

export default function Lightbox({
  isOpen,
  onClose,
  imageSrc,
  fallbackSrc,
  alt,
  title,
}: LightboxProps) {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

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
      if (e.key === '+') setZoom((z) => Math.min(z + 0.1, 3))
      if (e.key === '-') setZoom((z) => Math.max(z - 0.1, 0.5))
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom((z) => Math.max(0.5, Math.min(3, z + delta)))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 z-[100] backdrop-blur-sm"
          />

          {/* Lightbox Content */}
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
            {/* Image en plein écran, pas de bordure ni de boîte */}
            <div
              className="absolute inset-0 cursor-move"
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <motion.div
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                }}
                className="absolute inset-0"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <SafeImage
                  src={imageSrc}
                  fallbackSrc={fallbackSrc}
                  alt={alt}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>

            {/* Contrôles en overlay discret en haut à droite */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 text-white">
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur rounded-full px-3 py-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setZoom((z) => Math.max(0.5, z - 0.1))
                  }}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
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
                  onClick={(e) => {
                    e.stopPropagation()
                    setZoom((z) => Math.min(3, z + 0.1))
                  }}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Zoom avant"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                {zoom !== 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      resetZoom()
                    }}
                    className="ml-1 px-2 py-0.5 text-xs hover:bg-white/20 rounded-full transition-colors"
                  >
                    Réinit.
                  </button>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2.5 bg-black/40 backdrop-blur hover:bg-black/60 rounded-full transition-colors"
                aria-label="Fermer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Légende en bas, discrète */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs pointer-events-none">
              Molette pour zoomer • Glisser pour déplacer • Échap pour fermer
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

