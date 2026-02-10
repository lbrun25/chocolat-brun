'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const prixCafe = [
  {
    name: 'Chocolat noir au café',
    weight: '5 g',
    pieces100: '26,00 € HT',
    pieces100Weight: '(500 g)',
    pieces200: '52,00 € HT',
    pieces200Weight: '(1000 g)',
    unitPrice: '0,26 €',
    pricePerKg: '52 €/kg',
  },
]

const prixStandard = [
  {
    name: 'Chocolat noir',
    weight: '5 g',
    pieces100: '22,00 € HT',
    pieces100Weight: '(500 g)',
    pieces200: '44,00 € HT',
    pieces200Weight: '(1000 g)',
    unitPrice: '0,22 €',
    pricePerKg: '44 €/kg',
  },
  {
    name: 'Chocolat au lait',
    weight: '5 g',
    pieces100: '22,00 € HT',
    pieces100Weight: '(500 g)',
    pieces200: '44,00 € HT',
    pieces200Weight: '(1000 g)',
    unitPrice: '0,22 €',
    pricePerKg: '44 €/kg',
  },
  {
    name: 'Chocolat blanc',
    weight: '5 g',
    pieces100: '22,00 € HT',
    pieces100Weight: '(500 g)',
    pieces200: '44,00 € HT',
    pieces200Weight: '(1000 g)',
    unitPrice: '0,22 €',
    pricePerKg: '44 €/kg',
  },
  {
    name: 'Chocolat Dulcey',
    weight: '5 g',
    pieces100: '22,00 € HT',
    pieces100Weight: '(500 g)',
    pieces200: '44,00 € HT',
    pieces200Weight: '(1000 g)',
    unitPrice: '0,22 €',
    pricePerKg: '44 €/kg',
  },
]

interface PriceRow {
  name: string
  weight: string
  pieces100: string
  pieces100Weight: string
  pieces200: string
  pieces200Weight: string
  unitPrice: string
  pricePerKg: string
}

interface PriceCardProps {
  row: PriceRow
  index: number
}

function PriceCard({ row, index }: PriceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-chocolate-light via-chocolate-light/95 to-chocolate-light/90 rounded-2xl shadow-xl border border-chocolate-dark/10 overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      {/* En-tête de la carte */}
      <div className="bg-gradient-to-r from-chocolate-dark via-chocolate-dark/95 to-chocolate-dark/90 px-8 py-6">
        <h3 className="text-2xl font-bold text-chocolate-light tracking-wide font-serif">
          {row.name}
        </h3>
      </div>

      {/* Corps de la carte avec bandes subtiles */}
      <div className="p-8 bg-gradient-to-b from-white via-chocolate-light/20 to-chocolate-light/30">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Poids */}
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider text-chocolate-dark/60 font-semibold mb-2">
              Poids
            </span>
            <span className="text-lg font-semibold text-chocolate-dark">{row.weight}</span>
          </div>

          {/* 100 pièces */}
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider text-chocolate-dark/60 font-semibold mb-2">
              100 pièces
            </span>
            <span className="text-xl font-bold text-chocolate-dark mb-1">{row.pieces100}</span>
            <span className="text-sm text-chocolate-dark/70">{row.pieces100Weight}</span>
          </div>

          {/* 200 pièces */}
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider text-chocolate-dark/60 font-semibold mb-2">
              200 pièces
            </span>
            <span className="text-xl font-bold text-chocolate-dark mb-1">{row.pieces200}</span>
            <span className="text-sm text-chocolate-dark/70">{row.pieces200Weight}</span>
          </div>

          {/* Prix unitaire */}
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider text-chocolate-dark/60 font-semibold mb-2">
              Prix unitaire
            </span>
            <span className="text-lg font-semibold text-chocolate-dark">{row.unitPrice}</span>
          </div>

          {/* Prix au kilo */}
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider text-chocolate-dark/60 font-semibold mb-2">
              Prix au kilo
            </span>
            <span className="text-xl font-bold text-chocolate-dark">{row.pricePerKg}</span>
          </div>
        </div>
      </div>

      {/* Séparateur fin */}
      <div className="h-px bg-gradient-to-r from-transparent via-chocolate-dark/20 to-transparent" />
    </motion.div>
  )
}

interface PriceSectionProps {
  title: string
  rows: PriceRow[]
  delay?: number
}

function PriceSection({ title, rows, delay = 0 }: PriceSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-chocolate-dark mb-4 font-serif">
          {title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-chocolate-medium/50 to-transparent mx-auto" />
      </div>

      <div className="space-y-6">
        {rows.map((row, index) => (
          <PriceCard key={row.name} row={row} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

export default function PrixPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-chocolate-light/40 via-chocolate-light/30 to-chocolate-light/40 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* En-tête centré élégant */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-chocolate-dark mb-6 tracking-tight font-serif">
            Prix & Conditionnements
          </h1>
          <p className="text-xl md:text-2xl text-chocolate-dark/70 font-light max-w-3xl mx-auto leading-relaxed">
            Découvrez nos tarifs pour nos napolitains artisanaux
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-chocolate-medium/60 to-transparent mx-auto mt-8" />
        </motion.div>

        {/* Sections de prix */}
        <div className="mb-20">
          <PriceSection
            title="Napolitains Chocolat noir au café"
            rows={prixCafe}
            delay={0.1}
          />

          <PriceSection
            title="Napolitains Chocolat noir / lait / blanc / dulcey"
            rows={prixStandard}
            delay={0.2}
          />
        </div>

        {/* Informations importantes - Carte premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="bg-gradient-to-br from-white via-chocolate-light/30 to-chocolate-light/40 rounded-3xl shadow-2xl border border-chocolate-dark/10 p-10 md:p-12 mb-12"
        >
          <h2 className="text-3xl font-bold text-chocolate-dark mb-8 text-center font-serif">
            Informations importantes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-4 text-chocolate-dark/80">
              <li className="flex items-start">
                <span className="text-chocolate-medium mr-3 text-xl">•</span>
                <span>Tous les prix sont indiqués en <strong className="text-chocolate-dark">HT (Hors Taxes)</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-chocolate-medium mr-3 text-xl">•</span>
                <span><strong className="text-chocolate-dark">TVA : 5,5%</strong> (taux réduit pour les produits alimentaires)</span>
              </li>
              <li className="flex items-start">
                <span className="text-chocolate-medium mr-3 text-xl">•</span>
                <span>Conditionnements disponibles : <strong className="text-chocolate-dark">100 pièces (500 g)</strong> ou <strong className="text-chocolate-dark">200 pièces (1000 g)</strong></span>
              </li>
            </ul>
            <ul className="space-y-4 text-chocolate-dark/80">
              <li className="flex items-start">
                <span className="text-chocolate-medium mr-3 text-xl">•</span>
                <span>Poids unitaire : <strong className="text-chocolate-dark">5 grammes</strong> par napolitain</span>
              </li>
              <li className="flex items-start">
                <span className="text-chocolate-medium mr-3 text-xl">•</span>
                <span>Prix valables au <strong className="text-chocolate-dark">10 novembre 2025</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-chocolate-medium mr-3 text-xl">•</span>
                <span>Pour les commandes importantes, n'hésitez pas à nous contacter</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* CTA élégant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="text-center"
        >
          <Link
            href="/devis"
            className="inline-block bg-gradient-to-r from-chocolate-dark via-chocolate-dark/95 to-chocolate-dark text-chocolate-light px-10 py-5 rounded-2xl text-xl font-semibold hover:from-chocolate-dark/95 hover:via-chocolate-dark/90 hover:to-chocolate-dark/95 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Passer une commande
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
