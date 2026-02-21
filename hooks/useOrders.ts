'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Order } from '@/lib/order-utils'

const ORDER_SELECT = `
  id, stripe_session_id, order_number, status,
  customer_first_name, customer_last_name, customer_phone, customer_company,
  email, total_with_shipping, created_at,
  shipping_address, shipping_city, shipping_postal_code, shipping_country, delivery_notes,
  billing_first_name, billing_last_name, billing_phone, billing_email,
  billing_address, billing_city, billing_postal_code, billing_country,
  order_items ( id, product_name, packaging, quantity, price_ttc )
`

const ORDER_SELECT_NO_BILLING = `
  id, stripe_session_id, order_number, status,
  customer_first_name, customer_last_name, customer_phone, customer_company,
  email, total_with_shipping, created_at,
  shipping_address, shipping_city, shipping_postal_code, shipping_country, delivery_notes,
  order_items ( id, product_name, packaging, quantity, price_ttc )
`

async function fetchOrders(profileId: string, email: string): Promise<Order[]> {
  const run = async (select: string) => {
    const [byId, byEmail] = await Promise.all([
      supabase.from('orders').select(select).eq('user_id', profileId).order('created_at', { ascending: false }),
      supabase.from('orders').select(select).eq('email', email).order('created_at', { ascending: false }),
    ])
    if (byId.error || byEmail.error) throw byId.error || byEmail.error
    const seen = new Set<string>()
    return ([...(byId.data || []), ...(byEmail.data || [])] as unknown as Order[])
      .filter(o => { if (seen.has(o.id)) return false; seen.add(o.id); return true })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  try {
    return await run(ORDER_SELECT)
  } catch {
    return await run(ORDER_SELECT_NO_BILLING)
  }
}

export function useOrders(profileId: string | undefined, email: string | undefined) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!profileId || !email) {
      setOrders([])
      return
    }
    let cancelled = false
    setLoading(true)
    fetchOrders(profileId, email)
      .then(data => { if (!cancelled) setOrders(data) })
      .catch(() => { if (!cancelled) setOrders([]) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [profileId, email])

  return { orders, loading }
}
