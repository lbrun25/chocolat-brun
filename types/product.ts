export interface Product {
  id: string
  name: string
  slug: string
  description: string
  notes?: string
  ingredients?: string
  allergens?: string
  imageSrc: string
  fallbackSrc: string
  imageAlt: string
  priceHT: number // Prix HT pour 40 pièces (200g) en euros
  priceTTC: number // Prix TTC pour 40 pièces (200g) en euros (TVA 5.5%)
  pricePerKg: number // Prix au kilo
  weight: number // Poids en grammes (5g par napolitain)
}

export interface CartItem {
  product: Product
  quantity: number
  packaging: '40' // Nombre de pièces (40 pièces = 200g pour les produits particuliers)
}

export interface Cart {
  items: CartItem[]
  totalHT: number
  totalTTC: number
  totalWeight: number
}
