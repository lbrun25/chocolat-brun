/**
 * Sérialisation des lignes de commande dans les metadata Stripe.
 *
 * Stripe limite chaque valeur de metadata à 500 caractères. Une commande
 * professionnelle peut contenir jusqu'à 9 références : le JSON est donc découpé
 * en plusieurs clés (`orderItems`, `orderItems2`, `orderItems3`, …) puis
 * reconstitué à la lecture.
 *
 * Rétrocompatible : une session qui ne possède que la clé `orderItems`
 * (toutes les commandes existantes) est lue exactement comme avant.
 */

/** Ligne de commande telle qu'attendue par le webhook et la création de commande. */
export interface OrderItemMetadata {
  productId?: string
  productName: string
  packaging: string
  quantity: number
  priceTTC: number
}

/** Marge de sécurité sous la limite Stripe de 500 caractères par valeur. */
const CHUNK_SIZE = 450
/** Nombre maximum de fragments (`orderItems` + `orderItems2..10`). */
const MAX_CHUNKS = 10

/** Découpe les lignes de commande en clés de metadata Stripe. */
export function writeOrderItemsMetadata(items: OrderItemMetadata[]): Record<string, string> {
  const json = JSON.stringify(items)
  const out: Record<string, string> = {}

  for (let i = 0; i < MAX_CHUNKS; i++) {
    const chunk = json.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
    if (!chunk) break
    out[i === 0 ? 'orderItems' : `orderItems${i + 1}`] = chunk
  }

  return out
}

/** Reconstitue les lignes de commande depuis les metadata d'une session Stripe. */
export function readOrderItemsMetadata(
  metadata: Record<string, string> | null | undefined
): OrderItemMetadata[] {
  if (!metadata) return []

  let raw = typeof metadata.orderItems === 'string' ? metadata.orderItems : ''
  if (!raw) return []

  for (let i = 2; i <= MAX_CHUNKS; i++) {
    const chunk = metadata[`orderItems${i}`]
    if (typeof chunk !== 'string' || chunk === '') break
    raw += chunk
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('orderItems illisibles dans les metadata Stripe:', error)
    return []
  }
}
