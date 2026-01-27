'use client'

import { motion } from 'framer-motion'

interface PriceRow {
  name: string
  weight: string
  pieces100: string
  pieces150: string
  unitPrice: string
  pricePerKg: string
}

interface PriceTableProps {
  title: string
  rows: PriceRow[]
  delay?: number
}

export default function PriceTable({ title, rows, delay = 0 }: PriceTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
    >
      <div className="bg-chocolate-dark text-chocolate-light p-4">
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-chocolate-light">
            <tr>
              <th className="px-6 py-4 text-left text-chocolate-dark font-semibold">Poids</th>
              <th className="px-6 py-4 text-left text-chocolate-dark font-semibold">100 pièces</th>
              <th className="px-6 py-4 text-left text-chocolate-dark font-semibold">150 pièces</th>
              <th className="px-6 py-4 text-left text-chocolate-dark font-semibold">Prix unitaire</th>
              <th className="px-6 py-4 text-left text-chocolate-dark font-semibold">Prix au kilo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-chocolate-light/30 hover:bg-chocolate-light/20 transition-colors"
              >
                <td className="px-6 py-4 text-chocolate-dark font-medium">{row.weight}</td>
                <td className="px-6 py-4 text-chocolate-dark">{row.pieces100}</td>
                <td className="px-6 py-4 text-chocolate-dark">{row.pieces150}</td>
                <td className="px-6 py-4 text-chocolate-dark">{row.unitPrice}</td>
                <td className="px-6 py-4 text-chocolate-dark font-semibold">{row.pricePerKg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-chocolate-light/30 text-sm text-chocolate-dark/70">
        <p>TVA : 5,5%</p>
        <p>Prix valables au 10 novembre 2025</p>
      </div>
    </motion.div>
  )
}







