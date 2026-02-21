export interface Order {
  id: string
  stripe_session_id: string
  order_number?: string
  status: string
  customer_first_name: string
  customer_last_name: string
  customer_phone?: string | null
  customer_company?: string | null
  email?: string | null
  total_with_shipping: number
  created_at: string
  order_items: OrderItem[]
  shipping_address?: string | null
  shipping_city?: string | null
  shipping_postal_code?: string | null
  shipping_country?: string | null
  delivery_notes?: string | null
  payment_method?: string | null
  billing_first_name?: string | null
  billing_last_name?: string | null
  billing_phone?: string | null
  billing_email?: string | null
  billing_address?: string | null
  billing_city?: string | null
  billing_postal_code?: string | null
  billing_country?: string | null
}

export interface OrderItem {
  id: string
  product_name: string
  packaging: string
  quantity: number
  price_ttc: number
}

const COUNTRY_LABELS: Record<string, string> = {
  FR: 'France',
  BE: 'Belgique',
  CH: 'Suisse',
  LU: 'Luxembourg',
}

function countryLabel(code: string): string {
  return COUNTRY_LABELS[code] || code
}

export interface AddressLines {
  line1: string
  line2: string
  line3: string
}

export function getShippingAddressLines(order: Order): AddressLines {
  return {
    line1: order.shipping_address?.trim() || '',
    line2: [order.shipping_postal_code, order.shipping_city].filter(Boolean).join(' '),
    line3: countryLabel(order.shipping_country?.trim() || ''),
  }
}

export function getBillingAddressLines(order: Order): AddressLines {
  return {
    line1: order.billing_address?.trim() || '',
    line2: [order.billing_postal_code, order.billing_city].filter(Boolean).join(' '),
    line3: countryLabel(order.billing_country?.trim() || ''),
  }
}

export function formatShippingAddressInline(order: Order): string {
  const parts = [
    order.shipping_address,
    [order.shipping_postal_code, order.shipping_city].filter(Boolean).join(' '),
    order.shipping_country,
  ].filter(Boolean)
  return parts.length ? parts.join(', ') : '—'
}

export function hasShippingAddress(order: Order): boolean {
  return !!(order.shipping_address?.trim() || order.shipping_city?.trim() || order.shipping_postal_code?.trim())
}

export function hasBillingAddress(order: Order): boolean {
  return !!(
    order.billing_address?.trim() ||
    order.billing_city?.trim() ||
    order.billing_postal_code?.trim() ||
    order.billing_first_name?.trim() ||
    order.billing_last_name?.trim() ||
    order.billing_email?.trim() ||
    order.billing_phone?.trim()
  )
}

export function getPaymentMethodLabel(order: Order): string {
  return order.payment_method || 'Carte bancaire'
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  paid: { label: 'Payée', className: 'bg-green-100 text-green-700' },
  processing: { label: 'En préparation', className: 'bg-gray-100 text-gray-700' },
  shipped: { label: 'Expédiée', className: 'bg-blue-100 text-blue-700' },
  delivered: { label: 'Livrée', className: 'bg-purple-100 text-purple-700' },
}

export function getStatusConfig(status: string) {
  return STATUS_CONFIG[status] || { label: status, className: 'bg-gray-100 text-gray-700' }
}
