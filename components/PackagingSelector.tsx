'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PackagingType, getPackagingPrices, PACKAGING_PRICES, Product } from '@/types/product'
import { Package, Gift } from 'lucide-react'

interface PackagingSelectorProps {
  selectedPackaging: PackagingType
  onPackagingChange: (packaging: PackagingType) => void
  product?: Product
  className?: string
}

export default function PackagingSelector({
  selectedPackaging,
  onPackagingChange,
  product,
  className = '',
}: PackagingSelectorProps) {
  const prices = product ? getPackagingPrices(product) : PACKAGING_PRICES

  const packages: Array<{ type: PackagingType; label: string; icon: (isSelected: boolean) => React.ReactNode }> = [
    {
      type: '40',
      label: '40 pièces',
      icon: (isSelected) => <Package className={`w-8 h-8 ${isSelected ? 'text-chocolate-light' : 'text-chocolate-dark'}`} />,
    },
    {
      type: '100',
      label: '100 pièces',
      icon: (isSelected) => <Gift className={`w-8 h-8 ${isSelected ? 'text-chocolate-light' : 'text-chocolate-dark'}`} />,
    },
  ]

  // Calculer l'économie pour 100 pièces (basé sur le prix au kg)
  const pricePerKg40 = prices['40'].pricePerKgTTC
  const pricePerKg100 = prices['100'].pricePerKgTTC
  const savingsPerKg = pricePerKg40 - pricePerKg100 // Économie par kg

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-lg font-semibold text-chocolate-dark mb-2">
        Choisissez votre conditionnement
      </label>
      <div className="grid grid-cols-2 gap-4">
        {packages.map((pkg) => {
          const packagingInfo = prices[pkg.type]
          const isSelected = selectedPackaging === pkg.type
          
          return (
            <motion.button
              key={pkg.type}
              onClick={() => onPackagingChange(pkg.type)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-5 rounded-2xl border-2 transition-all duration-300 overflow-visible
                ${isSelected
                  ? 'border-chocolate-dark bg-gradient-to-br from-chocolate-dark to-chocolate-medium text-chocolate-light shadow-xl ring-2 ring-chocolate-dark/20 ring-offset-2'
                  : 'border-chocolate-dark/20 bg-white text-chocolate-dark hover:border-chocolate-dark/50 hover:bg-gradient-to-br hover:from-chocolate-light/30 hover:to-white shadow-md hover:shadow-lg'
                }
              `}
            >
              {/* Conteneur pour l'effet de brillance avec overflow-hidden */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                {/* Effet de brillance animé pour l'option sélectionnée */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%, transparent 100%)',
                      width: '200%',
                      height: '200%',
                    }}
                    animate={{
                      x: ['-100%', '100%'],
                      y: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  />
                )}
              </div>

              {/* Badge sélectionné avec animation */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute -top-2 -right-2 w-7 h-7 bg-chocolate-medium rounded-full flex items-center justify-center shadow-xl z-10"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}

              {/* Badge "Populaire" pour 100 pièces */}
              {pkg.type === '100' && !isSelected && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
                  Populaire
                </div>
              )}

              {/* Contenu */}
              <div className="relative z-0 text-center space-y-2">
                {/* Icône */}
                <div className="flex justify-center mb-2">{pkg.icon(isSelected)}</div>
                
                {/* Label */}
                <div className={`font-bold text-lg ${isSelected ? 'text-chocolate-light' : 'text-chocolate-dark'}`}>
                  {pkg.label}
                </div>
                
                {/* Poids */}
                <div className={`text-xs font-medium ${isSelected ? 'text-chocolate-light/90' : 'text-chocolate-dark/70'}`}>
                  {packagingInfo.weight}g net
                </div>
                
                {/* Prix TTC */}
                <div className={`font-bold text-xl mt-3 ${isSelected ? 'text-chocolate-light' : 'text-chocolate-medium'}`}>
                  {pkg.type === '100' && 'priceTTCWithoutDiscount' in packagingInfo && packagingInfo.priceTTCWithoutDiscount ? (
                    <span>
                      <span className="line-through opacity-75 mr-2">{packagingInfo.priceTTCWithoutDiscount.toFixed(2)} €</span>
                      {packagingInfo.priceTTC.toFixed(2)} € TTC
                    </span>
                  ) : (
                    <>{packagingInfo.priceTTC.toFixed(2)} € TTC</>
                  )}
                </div>

                {/* Prix au kg */}
                <div className={`text-sm font-semibold ${isSelected ? 'text-chocolate-light/90' : 'text-chocolate-dark/70'}`}>
                  {packagingInfo.pricePerKgTTC.toFixed(2)} € / kg TTC
                  {pkg.type === '100' && (
                    <span className="ml-2 text-xs text-green-600 font-bold">(-{savingsPerKg.toFixed(0)}€)</span>
                  )}
                </div>
              </div>

              {/* Effet de brillance au hover pour les options non sélectionnées */}
              {!isSelected && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-chocolate-light/0 via-chocolate-light/0 to-chocolate-light/0 hover:from-chocolate-light/20 hover:via-transparent hover:to-transparent transition-all duration-300 pointer-events-none" />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Indicateur d'économie pour 100 pièces */}
      {selectedPackaging === '100' && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-green-700 bg-gradient-to-r from-green-50 to-green-100 border border-green-300 rounded-xl p-3 shadow-sm"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </motion.div>
          <span className="font-semibold">Prix remisé au kg</span>
          <span className="text-xs text-green-600/80 ml-auto">
            Économisez {savingsPerKg.toFixed(0)} € / kg
          </span>
        </motion.div>
      )}
    </div>
  )
}
