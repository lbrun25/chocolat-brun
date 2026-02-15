'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import NapolitainCard from './NapolitainCard'
import { Product } from '@/types/product'

interface ProductCarouselProps {
  products: Product[]
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // États pour le swipe tactile
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const minSwipeDistance = 50 // Distance minimale en pixels pour déclencher un swipe
  const [isSwiping, setIsSwiping] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Détecter si on est sur un appareil tactile
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      )
    }
    checkTouchDevice()
    window.addEventListener('resize', checkTouchDevice)
    return () => window.removeEventListener('resize', checkTouchDevice)
  }, [])

  // Nombre de produits visibles selon la taille d'écran
  // Toujours initialiser à 1 pour éviter hydration mismatch (Lighthouse utilise viewport mobile)
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 1
    if (window.innerWidth >= 1024) return 4 // lg
    if (window.innerWidth >= 768) return 2 // md
    return 1 // mobile
  }

  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount())
    }
    // Exécuter au montage pour afficher le bon nombre de cartes sur desktop
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying && !isHovered && !isSwiping && products.length > visibleCount) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % (products.length - visibleCount + 1))
      }, 4000) // Change toutes les 4 secondes
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current)
      }
    }
  }, [isAutoPlaying, isHovered, isSwiping, products.length, visibleCount])

  const maxIndex = Math.max(0, products.length - visibleCount)

  // Référence au container pour mesurer sa largeur (sans le padding)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const computedStyle = window.getComputedStyle(containerRef.current)
        const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0
        const paddingRight = parseFloat(computedStyle.paddingRight) || 0
        // Largeur disponible = offsetWidth - padding
        const availableWidth = containerRef.current.offsetWidth - paddingLeft - paddingRight
        setContainerWidth(availableWidth)
      }
    }
    updateContainerWidth()
    window.addEventListener('resize', updateContainerWidth)
    return () => window.removeEventListener('resize', updateContainerWidth)
  }, [])

  // Gap responsive : un peu plus serré pour laisser les cartes un peu plus larges
  // Initialiser à 12 (mobile) pour correspondre au viewport Lighthouse
  const getGap = () => {
    if (typeof window === 'undefined') return 12
    if (window.innerWidth >= 1024) return 24 // 1.5rem
    if (window.innerWidth >= 768) return 20 // 1.25rem
    return 12 // 0.75rem
  }

  const [gap, setGap] = useState(12)

  useEffect(() => {
    const updateGap = () => setGap(getGap())
    updateGap()
    window.addEventListener('resize', updateGap)
    return () => window.removeEventListener('resize', updateGap)
  }, [])

  // Largeur d'un item : (containerWidth - (visibleCount - 1) * gap) / visibleCount
  const itemWidth = containerWidth > 0 
    ? (containerWidth - (visibleCount - 1) * gap) / visibleCount 
    : 0

  // Translation en pixels : currentIndex * (itemWidth + gap)
  const getTranslation = () => {
    return -currentIndex * (itemWidth + gap)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
    setIsAutoPlaying(false)
    // Nettoyer le timeout précédent s'il existe
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current)
    }
    // Réactiver l'auto-play après 5 secondes
    autoPlayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1))
    setIsAutoPlaying(false)
    // Nettoyer le timeout précédent s'il existe
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current)
    }
    // Réactiver l'auto-play après 5 secondes
    autoPlayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Nettoyer le timeout précédent s'il existe
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current)
    }
    // Réactiver l'auto-play après 5 secondes
    autoPlayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // Gestionnaires pour le swipe tactile
  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null
    touchStartX.current = e.targetTouches[0].clientX
    setIsSwiping(true)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      touchEndX.current = e.targetTouches[0].clientX
      // Si on bouge significativement, on est en train de swiper
      const distance = Math.abs(touchStartX.current - (touchEndX.current || touchStartX.current))
      if (distance > 10) {
        setIsSwiping(true)
      }
    }
  }

  const onTouchEnd = () => {
    if (!touchStartX.current) {
      setIsSwiping(false)
      return
    }
    
    if (touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current
      const isLeftSwipe = distance > minSwipeDistance
      const isRightSwipe = distance < -minSwipeDistance

      if (isLeftSwipe && currentIndex < maxIndex) {
        goToNext()
      }
      if (isRightSwipe && currentIndex > 0) {
        goToPrevious()
      }
    }

    // Réinitialiser les valeurs
    touchStartX.current = null
    touchEndX.current = null
    // Désactiver le flag de swipe après un délai pour éviter les hover
    // Réactiver l'auto-play après le swipe
    // Nettoyer le timeout précédent s'il existe
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current)
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsSwiping(false)
      setIsAutoPlaying(true)
    }, 300)
  }

  return (
    <div 
      className={`relative w-full ${isSwiping ? 'swiping' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Container du carousel - padding pour éviter que les shadows soient coupées */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden px-4 md:px-8 py-8"
      >
        <motion.div
          className="flex"
          animate={{
            x: getTranslation(),
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          style={{
            gap: `${gap}px`,
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{ 
                width: itemWidth > 0 ? `${itemWidth}px` : `calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`,
              }}
            >
              <NapolitainCard
                product={product}
                delay={index * 0.05}
                simple={true}
                disableHover={isTouchDevice || isSwiping}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Boutons de navigation */}
      {products.length > visibleCount && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 border border-chocolate-light/50 group"
            aria-label="Produit précédent"
          >
            <ChevronLeft className="w-6 h-6 text-chocolate-dark group-hover:text-chocolate-medium transition-colors" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 border border-chocolate-light/50 group"
            aria-label="Produit suivant"
          >
            <ChevronRight className="w-6 h-6 text-chocolate-dark group-hover:text-chocolate-medium transition-colors" />
          </button>
        </>
      )}

      {/* Indicateurs de pagination */}
      {products.length > visibleCount && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'bg-chocolate-dark w-8 h-2'
                  : 'bg-chocolate-dark/30 w-2 h-2 hover:bg-chocolate-dark/50'
              }`}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Gradient fade sur les bords - seulement si nécessaire */}
      {currentIndex > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-chocolate-light/30 to-transparent pointer-events-none z-0" />
      )}
      {currentIndex < maxIndex && (
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-chocolate-light/30 to-transparent pointer-events-none z-0" />
      )}
    </div>
  )
}
