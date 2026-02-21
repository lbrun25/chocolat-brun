'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import SafeImage from './SafeImage'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  name: string
  description: string
  notes?: string
  ingredients?: string
  allergens?: string
  imageSrc: string
  fallbackSrc: string
  imageAlt: string
}

export default function ProductModal({
  isOpen,
  onClose,
  name,
  description,
  notes,
  ingredients,
  allergens,
  imageSrc,
  fallbackSrc,
  imageAlt,
}: ProductModalProps) {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    
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
    if (typeof window === 'undefined') return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
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
          {/* Modal Content - Plein écran */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[101] bg-white overflow-y-auto"
          >
            <div className="relative w-full h-full min-h-screen">
              {/* Header avec bouton fermer - Fixe en haut */}
              <div className="sticky top-0 z-10 bg-white border-b border-chocolate-dark/10 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                  <h2 className="text-4xl md:text-5xl font-bold text-chocolate-dark font-serif">{name}</h2>
                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center p-3 hover:bg-chocolate-dark/10 rounded-full transition-colors touch-manipulation"
                    aria-label="Fermer"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-chocolate-dark">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content - Plein écran */}
              <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                  {/* Image Section */}
                  <div className="space-y-4">
                    <div
                      className="relative h-[600px] md:h-[700px] bg-chocolate-light/20 rounded-lg overflow-hidden cursor-move"
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
                        <div className="relative w-full h-full p-8">
                          <SafeImage
                            src={imageSrc}
                            fallbackSrc={fallbackSrc}
                            alt={imageAlt}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </motion.div>
                      
                      {/* Zoom Controls */}
                      {zoom > 1 && (
                        <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-2 shadow-lg flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setZoom((z) => Math.max(0.5, z - 0.1))
                            }}
                            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 hover:bg-chocolate-dark/10 rounded transition-colors touch-manipulation"
                            aria-label="Zoom out"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="11" cy="11" r="8" />
                              <line x1="8" y1="11" x2="14" y2="11" />
                            </svg>
                          </button>
                          <span className="text-xs font-semibold min-w-[2.5rem] text-center">
                            {Math.round(zoom * 100)}%
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setZoom((z) => Math.min(3, z + 0.1))
                            }}
                            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 hover:bg-chocolate-dark/10 rounded transition-colors touch-manipulation"
                            aria-label="Zoom in"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="11" cy="11" r="8" />
                              <line x1="11" y1="8" x2="11" y2="14" />
                              <line x1="8" y1="11" x2="14" y2="11" />
                            </svg>
                          </button>
                          {zoom !== 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                resetZoom()
                              }}
                              className="min-h-[44px] ml-2 px-3 py-2 text-xs bg-chocolate-dark/10 hover:bg-chocolate-dark/20 rounded transition-colors touch-manipulation"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-chocolate-dark/60 text-center font-sans">
                      Utilisez la molette de la souris pour zoomer • Cliquez et glissez pour déplacer
                    </p>
                  </div>

                  {/* Details Section */}
                  <div className="space-y-8 flex flex-col justify-center">
                    {/* Description */}
                    <div>
                      <h3 className="text-3xl font-bold text-chocolate-dark mb-4 font-serif">Description</h3>
                      <p className="text-xl text-chocolate-dark/80 leading-relaxed font-sans">{description}</p>
                    </div>

                    {/* Notes aromatiques */}
                    {notes && (
                      <div>
                        <h3 className="text-3xl font-bold text-chocolate-dark mb-4 font-serif">Notes aromatiques</h3>
                        <p className="text-xl text-chocolate-dark/80 leading-relaxed font-sans">{notes}</p>
                      </div>
                    )}

                    {/* Composition */}
                    {(ingredients || allergens) && (
                      <div>
                        <h3 className="text-3xl font-bold text-chocolate-dark mb-4 font-serif">Composition</h3>
                        {ingredients && (
                          <div className="mb-4">
                            <h4 className="text-xl font-semibold text-chocolate-dark mb-2 font-serif">Ingrédients</h4>
                            <p className="text-xl text-chocolate-dark/80 leading-relaxed font-sans">{ingredients}</p>
                          </div>
                        )}
                        {allergens && (
                          <div>
                            <h4 className="text-xl font-semibold text-chocolate-dark mb-2 font-serif">Allergènes</h4>
                            <p className="text-xl text-chocolate-dark/80 leading-relaxed font-sans font-medium">{allergens}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="pt-6">
                      <Link
                        href="/prix"
                        onClick={onClose}
                        className="inline-block w-full bg-chocolate-dark text-chocolate-light px-8 py-5 rounded-lg text-xl font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg text-center"
                      >
                        Voir les prix et commander
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

