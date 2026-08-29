'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export const EASE_OUT = [0.22, 1, 0.36, 1] as const

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  duration?: number
  once?: boolean
}

/** Apparition douce au défilement (respecte prefers-reduced-motion). */
export function Reveal({ children, className, delay = 0, y = 28, duration = 0.8, once = true }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px -6% 0px' }}
      transition={{ duration, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  )
}
