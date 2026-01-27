'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { memo } from 'react'

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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-chocolate-dark shadow-lg relative overflow-hidden"
      style={{ minHeight: '100px' }}
    >
      {/* Arrière-plan avec le logo "Logo avant cédric BRUN" */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/Logo avant cédric BRUN.png)',
          backgroundSize: 'auto 80%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15,
          filter: 'brightness(1.1)',
        }}
      />
      
      {/* Overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-chocolate-dark/85 pointer-events-none" />
      
      {/* Contenu par-dessus */}
      <nav className="container mx-auto px-4 py-6 relative z-20 pointer-events-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 relative z-10">
            {/* Espace réservé pour maintenir la mise en page */}
          </div>

          <ul className="flex space-x-6 relative z-10">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative px-3 py-2 text-chocolate-light transition-colors hover:text-chocolate-light/80 cursor-pointer ${
                      isActive ? 'font-semibold' : ''
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-chocolate-light pointer-events-none"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        layout
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </motion.header>
  )
}

export default memo(HeaderComponent)


