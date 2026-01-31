'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState, useRef, type RefObject } from 'react'

const CHOCOLATE_IMAGES = [
  '/images/chocolate_transparent/chocolat_blanc_ia_transparent.png',
  '/images/chocolate_transparent/chocolat_dulcey_ia_transparent.png',
  '/images/chocolate_transparent/chocolat_noir_ia_transparent.png',
  '/images/chocolate_transparent/chocolat_lait_ia_transparent.png',
] as const

function FloatingChocolate({
  src,
  alt,
  initialXPercent,
  initialYPercent,
  delay = 0,
  opacity = 1.0,
  containerRef,
  zone = 'left',
  chocolateOpacity = 1,
}: {
  src: string
  alt: string
  initialXPercent: number
  initialYPercent: number
  delay?: number
  opacity?: number
  containerRef: RefObject<HTMLDivElement>
  zone?: 'left' | 'right'
  chocolateOpacity?: number
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useMotionValue(Math.random() * 360)

  const springX = useSpring(x, { stiffness: 30, damping: 20 })
  const springY = useSpring(y, { stiffness: 30, damping: 20 })

  const generateNormalizedDirection = () => {
    const angle = Math.random() * Math.PI * 2
    return { x: Math.cos(angle), y: Math.sin(angle) }
  }

  const [direction, setDirection] = useState(generateNormalizedDirection())
  const [speed] = useState(0.3 + Math.random() * 0.3)
  const [rotationSpeed] = useState((Math.random() - 0.5) * 1.5)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const initialX = (rect.width * initialXPercent) / 100
      const initialY = (rect.height * initialYPercent) / 100
      x.set(initialX)
      y.set(initialY)
      rotate.set(Math.random() * 360)
    }
  }, [initialXPercent, initialYPercent, containerRef, x, y, rotate])

  useEffect(() => {
    if (!isMounted || !containerRef.current) return

    const boundaryPadding = 30
    const avgSize = 200

    const animate = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()

      let minX: number
      let maxX: number

      if (zone === 'left') {
        minX = boundaryPadding
        maxX = rect.width * 0.3 - avgSize - boundaryPadding
      } else {
        minX = rect.width * 0.7 + boundaryPadding
        maxX = rect.width - avgSize - boundaryPadding
      }

      const minY = 100
      const maxY = rect.height - avgSize - boundaryPadding

      const currentX = x.get()
      const currentY = y.get()
      const currentRotate = rotate.get()

      let newX = currentX + direction.x * speed
      let newY = currentY + direction.y * speed
      const newDirection = { ...direction }
      const newRotate = currentRotate + rotationSpeed

      if (newX < minX || newX > maxX) {
        newDirection.x = -direction.x
        newX = Math.max(minX, Math.min(maxX, currentX))
        const angleVariation = (Math.random() - 0.5) * 0.3
        const currentAngle = Math.atan2(newDirection.y, newDirection.x)
        newDirection.x = Math.cos(currentAngle + angleVariation)
        newDirection.y = Math.sin(currentAngle + angleVariation)
      }

      if (newY < minY || newY > maxY) {
        newDirection.y = -direction.y
        newY = Math.max(minY, Math.min(maxY, currentY))
        const angleVariation = (Math.random() - 0.5) * 0.3
        const currentAngle = Math.atan2(newDirection.y, newDirection.x)
        newDirection.x = Math.cos(currentAngle + angleVariation)
        newDirection.y = Math.sin(currentAngle + angleVariation)
      }

      if (newDirection.x !== direction.x || newDirection.y !== direction.y) {
        setDirection(newDirection)
      }

      x.set(newX)
      y.set(newY)
      rotate.set(newRotate)
    }

    const interval = setInterval(animate, 16)
    return () => clearInterval(interval)
  }, [direction, speed, rotationSpeed, isMounted, containerRef, zone, x, y, rotate])

  if (!isMounted) return null

  const opacityValue = opacity * chocolateOpacity

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: opacityValue, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        opacity: { duration: 1 },
        scale: { duration: 0.8 },
      }}
      style={{
        x: springX,
        y: springY,
        rotate,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '176px',
        height: '176px',
        pointerEvents: 'none',
      }}
      className="relative md:w-52 md:h-52 lg:w-60 lg:h-60"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 176px, (max-width: 1024px) 208px, 240px"
      />
    </motion.div>
  )
}

const DEFAULT_LEFT_CHOCOLATES = [
  { src: CHOCOLATE_IMAGES[0], initialXPercent: 5, initialYPercent: 20, delay: 0, zone: 'left' as const },
  { src: CHOCOLATE_IMAGES[1], initialXPercent: 12, initialYPercent: 60, delay: 0.3, zone: 'left' as const },
  { src: CHOCOLATE_IMAGES[2], initialXPercent: 8, initialYPercent: 80, delay: 0.6, zone: 'left' as const },
  { src: CHOCOLATE_IMAGES[3], initialXPercent: 15, initialYPercent: 40, delay: 0.9, zone: 'left' as const },
]

const DEFAULT_RIGHT_CHOCOLATES = [
  { src: CHOCOLATE_IMAGES[3], initialXPercent: 75, initialYPercent: 25, delay: 0.2, zone: 'right' as const },
  { src: CHOCOLATE_IMAGES[0], initialXPercent: 85, initialYPercent: 65, delay: 0.5, zone: 'right' as const },
  { src: CHOCOLATE_IMAGES[1], initialXPercent: 90, initialYPercent: 85, delay: 0.8, zone: 'right' as const },
  { src: CHOCOLATE_IMAGES[2], initialXPercent: 72, initialYPercent: 45, delay: 1.1, zone: 'right' as const },
]

export default function FloatingChocolates({
  chocolateOpacity = 1,
  className = 'absolute inset-0 overflow-hidden pointer-events-none',
}: {
  chocolateOpacity?: number
  className?: string
} = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const allChocolates = [...DEFAULT_LEFT_CHOCOLATES, ...DEFAULT_RIGHT_CHOCOLATES]

  return (
    <div ref={containerRef} className={className}>
      {allChocolates.map((chocolate, index) => (
        <FloatingChocolate
          key={`${chocolate.src}-${chocolate.zone}-${index}`}
          src={chocolate.src}
          alt=""
          initialXPercent={chocolate.initialXPercent}
          initialYPercent={chocolate.initialYPercent}
          delay={chocolate.delay}
          opacity={1}
          containerRef={containerRef}
          zone={chocolate.zone}
          chocolateOpacity={chocolateOpacity}
        />
      ))}
    </div>
  )
}
