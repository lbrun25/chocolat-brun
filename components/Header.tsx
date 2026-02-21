'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { memo, useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import CartIcon from './CartIcon'
import BrandLogo from './BrandLogo'

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/pro', label: 'Pro' },
]

function HeaderComponent() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Toujours afficher le header en haut de la page
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else {
        // Masquer quand on scroll vers le bas, afficher quand on scroll vers le haut
        setIsVisible(currentScrollY < lastScrollY)
      }
      
      setLastScrollY(currentScrollY)
    }

    // Throttle pour améliorer les performances
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [lastScrollY])

  return (
    <>
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-chocolate-dark shadow-lg min-h-[5rem] md:min-h-[6rem]"
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
            <Link href="/" className="group" aria-label="Accueil - Cédric Brun">
              <BrandLogo />
            </Link>
          </motion.div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-1 md:space-x-2 lg:space-x-4">
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
            <div className="flex items-center space-x-4">
              <Link
                href="/compte"
                className="p-2 text-chocolate-light/90 hover:text-chocolate-light hover:bg-chocolate-dark/50 transition-all duration-300 rounded-lg"
                aria-label={user ? 'Mon compte' : 'Se connecter'}
              >
                {user ? (
                  <span className="text-sm md:text-base">Mon compte</span>
                ) : (
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </Link>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <CartIcon />
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="flex md:hidden items-center space-x-4">
            <Link
              href="/compte"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-chocolate-light/90 hover:text-chocolate-light p-2 rounded-lg hover:bg-chocolate-dark/50 transition-colors touch-manipulation"
              aria-label={user ? 'Mon compte' : 'Se connecter'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CartIcon />
            </motion.div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-chocolate-light p-2 rounded-lg hover:bg-chocolate-dark/50 transition-colors touch-manipulation"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-chocolate-dark border-t border-chocolate-dark/20 overflow-hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-6 py-4 text-chocolate-light/90 transition-all duration-300 ${
                        isActive 
                          ? 'text-chocolate-light font-semibold bg-chocolate-dark/70' 
                          : 'hover:text-chocolate-light hover:bg-chocolate-dark/50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
              <li>
                <Link
                  href="/compte"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-6 py-4 text-chocolate-light/90 transition-all duration-300 ${
                    pathname === '/compte'
                      ? 'text-chocolate-light font-semibold bg-chocolate-dark/70' 
                      : 'hover:text-chocolate-light hover:bg-chocolate-dark/50'
                  }`}
                  aria-label={user ? 'Mon compte' : 'Se connecter'}
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {user ? 'Mon compte' : null}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  )
}

export default memo(HeaderComponent)


