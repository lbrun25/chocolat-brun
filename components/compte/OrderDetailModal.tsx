'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Order } from '@/lib/order-utils'
import { getShippingAddressLines, getBillingAddressLines, getStatusConfig, getPaymentMethodLabel } from '@/lib/order-utils'

interface Props {
  order: Order
  onClose: () => void
}

export default function OrderDetailModal({ order, onClose }: Props) {
  const status = getStatusConfig(order.status)
  const shipping = getShippingAddressLines(order)
  const billing = getBillingAddressLines(order)
  const items = order.order_items || []

  const hasShipping = !!(order.shipping_address || order.shipping_city || order.customer_first_name || order.customer_last_name)
  const hasBilling = !!(order.billing_address?.trim() || order.billing_city?.trim() || order.billing_first_name || order.billing_last_name)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-chocolate-dark font-serif">Détails de la commande</h2>
          <button type="button" onClick={onClose} aria-label="Fermer"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-chocolate-dark/70 hover:text-chocolate-dark p-2 rounded-lg hover:bg-chocolate-dark/10 transition-colors touch-manipulation">
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-6">
          <DetailRow label="Numéro de commande" value={order.order_number ?? order.stripe_session_id} />
          <DetailRow label="Date" value={new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} />

          <div>
            <p className="text-sm text-chocolate-dark/70 mb-1">Statut</p>
            <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${status.className}`}>{status.label}</span>
          </div>

          <div>
            <p className="text-sm text-chocolate-dark/70 mb-3">Récapitulatif des produits</p>
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-chocolate-dark/10">
                  <div>
                    <p className="font-semibold text-chocolate-dark">{item.product_name}</p>
                    <p className="text-sm text-chocolate-dark/70">{item.packaging} pièces × {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-chocolate-dark">{(item.price_ttc * item.quantity).toFixed(2)} €</p>
                </div>
              ))}
            </div>
          </div>

          {hasShipping && (
            <div>
              <p className="text-sm text-chocolate-dark/70 mb-1">Adresse de livraison</p>
              <div className="font-semibold text-chocolate-dark space-y-0.5">
                {(order.customer_first_name || order.customer_last_name) && (
                  <p>{[order.customer_first_name, order.customer_last_name].filter(Boolean).join(' ')}</p>
                )}
                {order.customer_company && <p>{order.customer_company}</p>}
                {shipping.line1 && <p>{shipping.line1}</p>}
                {(shipping.line2 || shipping.line3) && <p>{[shipping.line2, shipping.line3].filter(Boolean).join(' — ')}</p>}
                {order.customer_phone && <p className="text-chocolate-dark/80">{order.customer_phone}</p>}
                {order.email && <p className="text-chocolate-dark/80">{order.email}</p>}
                {order.delivery_notes && (
                  <p className="text-chocolate-dark/80"><span className="font-medium">Notes :</span> {order.delivery_notes}</p>
                )}
              </div>
            </div>
          )}

          <div>
            <p className="text-sm text-chocolate-dark/70 mb-1">Adresse de facturation</p>
            <p className="text-xs text-chocolate-dark/60 mb-2">Figée au moment du paiement, non modifiable.</p>
            {hasBilling ? (
              <div className="font-semibold text-chocolate-dark space-y-0.5">
                {(order.billing_first_name || order.billing_last_name) && (
                  <p>{[order.billing_first_name, order.billing_last_name].filter(Boolean).join(' ')}</p>
                )}
                {billing.line1 && <p>{billing.line1}</p>}
                {(billing.line2 || billing.line3) && <p>{[billing.line2, billing.line3].filter(Boolean).join(' — ')}</p>}
                {order.billing_phone && <p className="text-chocolate-dark/80">{order.billing_phone}</p>}
                {order.billing_email && <p className="text-chocolate-dark/80">{order.billing_email}</p>}
              </div>
            ) : (
              <p className="font-semibold text-chocolate-dark">Non enregistrée pour cette commande.</p>
            )}
          </div>

          <DetailRow label="Mode de paiement" value={getPaymentMethodLabel(order)} />

          <div className="pt-4 border-t border-chocolate-dark/20">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-chocolate-dark">Total</span>
              <span className="text-xl font-bold text-chocolate-medium">{order.total_with_shipping.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-chocolate-dark/70 mb-1">{label}</p>
      <p className="font-semibold text-chocolate-dark">{value}</p>
    </div>
  )
}
