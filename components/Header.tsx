'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { memo } from 'react'
import CartIcon from './CartIcon'
import BrandLogo from './BrandLogo'

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/prix', label: 'Prix' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/devis', label: 'Devis' },
]

function HeaderComponent() {
  const pathname = usePathname()

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-chocolate-dark/95 backdrop-blur-md shadow-lg border-b border-chocolate-dark/20"
    >
      {/* Effet de brillance subtil en arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-chocolate-dark/5 to-transparent pointer-events-none" />
      
      <nav className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center"
          >
            <Link href="/" className="group">
              <BrandLogo />
            </Link>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-4">
            <ul className="flex items-center space-x-1 md:space-x-2 lg:space-x-4">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <Link
                        href={item.href}
                        className={`relative px-3 md:px-4 py-2 text-sm md:text-base text-chocolate-light/90 transition-all duration-300 rounded-lg group ${
                          isActive 
                            ? 'text-chocolate-light font-semibold' 
                            : 'hover:text-chocolate-light hover:bg-chocolate-dark/50'
                        }`}
                      >
                        <span className="relative z-10">{item.label}</span>
                        
                        {isActive && (
                          <motion.div
                            layoutId="navbar-indicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-chocolate-light rounded-full"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            layout
                          />
                        )}
                        
                        {/* Effet hover */}
                        {!isActive && (
                          <motion.div
                            className="absolute inset-0 bg-chocolate-light/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={false}
                          />
                        )}
                      </Link>
                    </motion.div>
                  </li>
                )
              })}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CartIcon />
            </motion.div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

export default memo(HeaderComponent)


