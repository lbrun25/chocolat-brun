import { Product } from '@/types/product'

// Données des produits avec prix
export const products: Product[] = [
  {
    id: 'chocolat-noir',
    name: 'Chocolat noir',
    slug: 'chocolat-noir',
    description: 'Un chocolat noir pur et équilibré, révélant toute la richesse aromatique du cacao dans une dégustation authentique et raffinée.',
    notes: 'Cacao puissant • Notes boisées • Finale longue',
    ingredients: 'Sucre, fèves de cacao, beurre de cacao, émulsifiant : lécithine de tournesol, extrait naturel de vanille.',
    allergens: 'Présence possible de : LAIT.',
    imageSrc: '/images/products/chocolat_noir_vrac.jpg',
    fallbackSrc: '/images/napolitain-noir.svg',
    imageAlt: 'Napolitain chocolat noir',
    priceHT: 11.20, // Prix pour 40 pièces (200g) HT
    priceTTC: 11.82, // Prix TTC pour 40 pièces (200g) (TVA 5.5%)
    pricePerKg: 56, // €/kg HT
    weight: 5, // grammes par napolitain
  },
  {
    id: 'chocolat-lait',
    name: 'Chocolat au lait',
    slug: 'chocolat-au-lait',
    description: 'Un chocolat au lait fondant et généreux, alliant douceur lactée et intensité cacaotée dans un parfait équilibre.',
    notes: 'Lait • Cacao • Douceur gourmande',
    ingredients: 'Sucre, beurre de cacao, LAIT entier en poudre, fèves de cacao, émulsifiant : lécithine de tournesol, extrait naturel de vanille.',
    allergens: 'LAIT. Présence possible de : fruits à coque.',
    imageSrc: '/images/products/chocolat_lait_vrac.jpg',
    fallbackSrc: '/images/napolitain-lait.svg',
    imageAlt: 'Napolitain chocolat au lait',
    priceHT: 28.00,
    priceTTC: 29.54,
    pricePerKg: 56,
    weight: 5,
  },
  {
    id: 'chocolat-blanc',
    name: 'Chocolat blanc',
    slug: 'chocolat-blanc',
    description: 'Un chocolat blanc onctueux et délicat, aux notes de lait frais et de vanille naturelle, pour une dégustation tout en douceur.',
    notes: 'Lait frais • Vanille • Rondeur',
    ingredients: 'Sucre, beurre de cacao, LAIT entier en poudre, émulsifiant : lécithine de tournesol, extrait naturel de vanille.',
    allergens: 'LAIT. Présence possible de : gluten, fruits à coque, soja.',
    imageSrc: '/images/products/chocolat_blanc_vrac.jpg',
    fallbackSrc: '/images/napolitain-blanc.svg',
    imageAlt: 'Napolitain chocolat blanc',
    priceHT: 28.00,
    priceTTC: 29.54,
    pricePerKg: 56,
    weight: 5,
  },
  {
    id: 'chocolat-dulcey',
    name: 'Chocolat Dulcey',
    slug: 'chocolat-dulcey',
    description: 'Un chocolat blond aux saveurs uniques de biscuit et de caramel, signature d\'une gourmandise intense et raffinée.',
    notes: 'Biscuit • Caramel • Céréales toastées',
    ingredients: 'Beurre de cacao, sucre, LAIT entier en poudre, LAIT écrémé en poudre, lactosérum (LAIT), beurre (LAIT), émulsifiant : lécithine de tournesol, extrait naturel de vanille.',
    allergens: 'LAIT. Présence possible de : fruits à coque, soja.',
    imageSrc: '/images/products/dulcey_chocolat_vrac.jpg',
    fallbackSrc: '/images/napolitain-dulcey.svg',
    imageAlt: 'Napolitain chocolat Dulcey',
    priceHT: 28.00,
    priceTTC: 29.54,
    pricePerKg: 56,
    weight: 5,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}
