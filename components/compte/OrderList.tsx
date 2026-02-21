'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Order } from '@/lib/order-utils'
import { formatShippingAddressInline, getStatusConfig, getPaymentMethodLabel } from '@/lib/order-utils'
import OrderDetailModal from './OrderDetailModal'

interface Props {
  orders: Order[]
}

export default function OrderList({ orders }: Props) {
  const [selected, setSelected] = useState<Order | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-chocolate-dark mb-6 font-serif">Mes commandes</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-chocolate-dark/70 mb-4">Aucune commande pour le moment.</p>
          <Link href="/" className="inline-block bg-chocolate-dark text-chocolate-light px-6 py-3 rounded-lg font-semibold hover:bg-chocolate-dark/90 transition-colors">
            Découvrir nos produits
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} onClick={() => setSelected(order)} />
          ))}
        </div>
      )}

      {selected && <OrderDetailModal order={selected} onClose={() => setSelected(null)} />}
    </motion.div>
  )
}

function OrderCard({ order, onClick }: { order: Order; onClick: () => void }) {
  const items = order.order_items || []
  const status = getStatusConfig(order.status)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-chocolate-dark/20 rounded-lg p-4 hover:border-chocolate-dark/40 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-chocolate-dark">
            Commande #{order.order_number ?? order.stripe_session_id.substring(0, 20) + '…'}
          </p>
          <p className="text-sm text-chocolate-dark/70 mt-1">
            {new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <p className="text-sm text-chocolate-dark/70 mt-1">{items.length} article(s)</p>

          {(order.shipping_address || order.shipping_city) && (
            <p className="text-sm text-chocolate-dark/70 mt-2">Livraison : {formatShippingAddressInline(order)}</p>
          )}

          {items.length > 0 && (
            <div className="mt-3 pt-3 border-t border-chocolate-dark/10">
              <p className="text-xs font-medium text-chocolate-dark/60 mb-1.5">Récapitulatif :</p>
              <ul className="text-sm text-chocolate-dark/80 space-y-1">
                {items.map(item => (
                  <li key={item.id}>
                    {item.product_name} — {item.packaging} pièces × {item.quantity} · {(item.price_ttc * item.quantity).toFixed(2)} €
                  </li>
                ))}
              </ul>
              <p className="text-xs text-chocolate-dark/60 mt-1.5">Paiement : {getPaymentMethodLabel(order)}</p>
            </div>
          )}
        </div>
        <div className="text-right">
          <p className="font-bold text-chocolate-dark text-lg">{order.total_with_shipping.toFixed(2)} €</p>
          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${status.className}`}>
            {status.label}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
