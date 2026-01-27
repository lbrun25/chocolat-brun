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
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose()
            }}
          >
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 text-white">
                {title && (
                  <h3 className="text-2xl font-bold font-serif">{title}</h3>
                )}
                <div className="flex items-center gap-4 ml-auto">
                  {/* Zoom Controls */}
                  <div className="flex items-center gap-2 bg-black/50 rounded-lg px-3 py-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setZoom((z) => Math.max(0.5, z - 0.1))
                      }}
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                      aria-label="Zoom out"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </button>
                    <span className="text-sm font-semibold min-w-[3rem] text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setZoom((z) => Math.min(3, z + 0.1))
                      }}
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                      aria-label="Zoom in"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </button>
                    {zoom !== 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          resetZoom()
                        }}
                        className="ml-2 px-2 py-1 text-xs bg-white/20 hover:bg-white/30 rounded transition-colors"
                      >
                        Réinitialiser
                      </button>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Fermer"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Image Container */}
              <div
                className="relative flex-1 bg-white rounded-lg overflow-hidden cursor-move"
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
                  className="absolute inset-0 flex items-center justify-center"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="relative w-full h-full max-w-full max-h-full p-8">
                    <SafeImage
                      src={imageSrc}
                      fallbackSrc={fallbackSrc}
                      alt={alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Instructions */}
              <div className="mt-4 text-center text-white/70 text-sm">
                <p>Utilisez la molette de la souris pour zoomer • Cliquez et glissez pour déplacer • Appuyez sur Échap pour fermer</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

