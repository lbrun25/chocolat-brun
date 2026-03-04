// Structure des prix par conditionnement (clé '40' = paquet 100 pièces, clé '100' = boîte 40 pièces)
export interface PackagingPricesConfig {
  '40': {
    priceTTC: number
    priceHT: number
    pieces: 100
    weight: 500
    pricePerKgTTC: number
    priceTTCWithoutDiscount?: number // Prix TTC sans remise (affichage barré)
  }
  '100': {
    priceTTC: number
    priceHT: number
    pieces: 40
    weight: 200
    pricePerKgTTC: number
  }
}

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
  /** Images supplémentaires affichées sous la première au clic (sachet, coffret) */
  extraImages?: [string, string]
  priceHT: number // Prix HT pour 40 pièces (200g) en euros
  priceTTC: number // Prix TTC pour 40 pièces (200g) en euros (TVA 5.5%)
  pricePerKg: number // Prix au kilo
  weight: number // Poids en grammes (5g par napolitain)
  packagingPrices?: PackagingPricesConfig // Prix spécifiques (remplace PACKAGING_PRICES si défini)
}

// Prix pour les conditionnements particuliers (prix TTC) - par défaut
const TVA_RATE = 0.055 // 5.5%

export const PACKAGING_PRICES: PackagingPricesConfig = {
  '40': {
    priceTTC: 35.00, // Prix TTC pour le paquet 100 pièces (500g)
    priceHT: 35.00 / (1 + TVA_RATE),
    pieces: 100,
    weight: 500,
    pricePerKgTTC: 70.00,
  },
  '100': {
    priceTTC: 16.00, // Prix TTC pour la boîte 40 pièces (200g)
    priceHT: 16.00 / (1 + TVA_RATE),
    pieces: 40,
    weight: 200,
    pricePerKgTTC: 80.00,
  },
}

export type PackagingType = '40' | '100'

/** Retourne les prix de conditionnement pour un produit (spécifiques ou par défaut) */
export function getPackagingPrices(product: Product): PackagingPricesConfig {
  return product.packagingPrices ?? PACKAGING_PRICES
}

/** Nombre de pièces affiché pour une clé de conditionnement (pour affichage commandes) */
export function getPiecesForPackaging(key: PackagingType): number {
  return PACKAGING_PRICES[key].pieces
}

export interface CartItem {
  product: Product
  quantity: number
  packaging: PackagingType // Nombre de pièces (40 ou 100 pièces pour les produits particuliers)
}

export interface Cart {
  items: CartItem[]
  totalHT: number
  totalTTC: number
  totalWeight: number
}
