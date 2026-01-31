// Structure des prix par conditionnement
export interface PackagingPricesConfig {
  '40': {
    priceTTC: number
    priceHT: number
    pieces: 40
    weight: 200
    pricePerKgTTC: number
  }
  '100': {
    priceTTC: number
    priceHT: number
    pieces: 100
    weight: 500
    pricePerKgTTC: number
    priceTTCWithoutDiscount?: number // Prix TTC sans remise (affichage barré)
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
    priceTTC: 16.00, // Prix TTC pour 40 pièces
    priceHT: 16.00 / (1 + TVA_RATE), // Calculé à partir du TTC
    pieces: 40,
    weight: 200, // 40 * 5g
    pricePerKgTTC: 80.00, // 16€ / 0.2kg = 80€/kg TTC
  },
  '100': {
    priceTTC: 35.00, // Prix TTC pour 100 pièces
    priceHT: 35.00 / (1 + TVA_RATE), // Calculé à partir du TTC
    pieces: 100,
    weight: 500, // 100 * 5g
    pricePerKgTTC: 70.00, // 35€ / 0.5kg = 70€/kg TTC (remisé)
  },
}

export type PackagingType = '40' | '100'

/** Retourne les prix de conditionnement pour un produit (spécifiques ou par défaut) */
export function getPackagingPrices(product: Product): PackagingPricesConfig {
  return product.packagingPrices ?? PACKAGING_PRICES
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
