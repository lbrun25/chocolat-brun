'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'
import { useEffect, useState } from 'react'

export default function CartIcon() {
  const { getItemCount } = useCart()
  const [itemCount, setItemCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const count = getItemCount()

  useEffect(() => {
    if (count > itemCount) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)
    }
    setItemCount(count)
  }, [count, itemCount])

  return (
    <Link href="/panier" className="relative">
      <motion.div
        animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.6 }}
        className="relative p-2 hover:bg-chocolate-dark/50 rounded-lg transition-colors"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-chocolate-light"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        {count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-chocolate-medium text-chocolate-light text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {count > 99 ? '99+' : count}
          </motion.span>
        )}
      </motion.div>
    </Link>
  )
}
