/**
 * Catalogue professionnel — trois gammes vendues aux professionnels :
 * les petits poissons (4 g), les biscuits petits beurres (6 g) et les
 * orangettes enrobées de chocolat noir (5 g).
 * Source : listes de prix officielles Cédric Brun.
 * Tous les prix sont exprimés HORS TAXES (TVA en vigueur en supplément).
 */

export type Gamme = 'poisson' | 'petit-beurre' | 'orangette'
export type Chocolat = 'lait' | 'noir' | 'noir-cafe' | 'blanc'

export interface Reference {
  id: string
  gamme: Gamme
  /** Libellé complet, ex. « Poisson chocolat au lait » */
  nom: string
  /** Libellé court, ex. « Lait » */
  court: string
  chocolat: Chocolat
  /** Poids unitaire en grammes */
  poidsG: number
  /** Prix HT à la pièce, en euros */
  prixPieceHT: number
  /** Prix HT au kilo, en euros */
  prixKgHT: number
  /** Nombre de pièces par conditionnement */
  conditionnement: number
  /** Visuel détouré (fond transparent) */
  image: string
  /** Note de dégustation, une ligne */
  note: string
}

/** Conditionnement standard : 200 pièces par référence */
export const CONDITIONNEMENT = 200
/** Frais de port HT par commande, France métropolitaine */
export const FRAIS_PORT_HT = 14
/** Franco de port à partir de ce montant HT de commande */
export const FRANCO_HT = 290
/**
 * Taux de TVA appliqué au paiement en ligne (5,5 %, taux réduit chocolat).
 * ⚠️ À faire confirmer par le comptable : certaines confiseries relèvent de 20 %.
 */
export const TVA_RATE = 0.055

export const CONTACT = {
  raisonSociale: 'Pâtisserie Brun Cédric',
  marque: 'Cédric Brun',
  /** Signature officielle de la maison */
  signature: 'Maître Artisan Chocolatier depuis 1999',
  adresse: '2 rue du Chalet',
  codePostal: '25140',
  ville: 'Charquemont',
  telFixe: '03 81 44 07 36',
  telFixeHref: 'tel:+33381440736',
  telMobile: '06 89 32 18 98',
  telMobileHref: 'tel:+33689321898',
  email: 'patisseriebrun-25@orange.fr',
  site: 'cedric-brun.com',
} as const

export const references: Reference[] = [
  // ---------------- Petits poissons — 4 g ----------------
  {
    id: 'poisson-lait',
    gamme: 'poisson',
    nom: 'Poisson chocolat au lait',
    court: 'Lait',
    chocolat: 'lait',
    poidsG: 4,
    prixPieceHT: 0.19,
    prixKgHT: 47.5,
    conditionnement: CONDITIONNEMENT,
    image: '/images/poissons/poisson-lait.png',
    note: 'Fondant et généreux',
  },
  {
    id: 'poisson-noir',
    gamme: 'poisson',
    nom: 'Poisson chocolat noir',
    court: 'Noir',
    chocolat: 'noir',
    poidsG: 4,
    prixPieceHT: 0.15,
    prixKgHT: 37.5,
    conditionnement: CONDITIONNEMENT,
    image: '/images/poissons/poisson-noir.png',
    note: 'Puissant et équilibré',
  },
  {
    id: 'poisson-noir-cafe',
    gamme: 'poisson',
    nom: 'Poisson chocolat noir au café',
    court: 'Noir café',
    chocolat: 'noir-cafe',
    poidsG: 4,
    prixPieceHT: 0.19,
    prixKgHT: 47.5,
    conditionnement: CONDITIONNEMENT,
    image: '/images/poissons/poisson-noir-cafe.png',
    note: 'Cacao et café torréfié',
  },
  {
    id: 'poisson-blanc',
    gamme: 'poisson',
    nom: 'Poisson chocolat blanc',
    court: 'Blanc',
    chocolat: 'blanc',
    poidsG: 4,
    prixPieceHT: 0.15,
    prixKgHT: 37.5,
    conditionnement: CONDITIONNEMENT,
    image: '/images/poissons/poisson-blanc.png',
    note: 'Crémeux et vanillé',
  },

  // ---------------- Biscuits petits beurres — 6 g ----------------
  {
    id: 'petit-beurre-lait',
    gamme: 'petit-beurre',
    nom: 'Petit beurre chocolat au lait',
    court: 'Lait',
    chocolat: 'lait',
    poidsG: 6,
    prixPieceHT: 0.22,
    prixKgHT: 36.66,
    conditionnement: CONDITIONNEMENT,
    image: '/images/petits-beurres/biscuit-lait.png',
    note: 'Fondant, généreux et délicatement caramélisé',
  },
  {
    id: 'petit-beurre-noir',
    gamme: 'petit-beurre',
    nom: 'Petit beurre chocolat noir',
    court: 'Noir',
    chocolat: 'noir',
    poidsG: 6,
    prixPieceHT: 0.18,
    prixKgHT: 30,
    conditionnement: CONDITIONNEMENT,
    image: '/images/petits-beurres/biscuit-noir.png',
    note: 'Des notes de cacao puissantes et équilibrées',
  },
  {
    id: 'petit-beurre-noir-cafe',
    gamme: 'petit-beurre',
    nom: 'Petit beurre chocolat noir au café',
    court: 'Noir café',
    chocolat: 'noir-cafe',
    poidsG: 6,
    prixPieceHT: 0.22,
    prixKgHT: 36.66,
    conditionnement: CONDITIONNEMENT,
    image: '/images/petits-beurres/biscuit-noir-cafe.png',
    note: 'L’intensité du noir sublimée par le café',
  },
  {
    id: 'petit-beurre-blanc',
    gamme: 'petit-beurre',
    nom: 'Petit beurre chocolat blanc',
    court: 'Blanc',
    chocolat: 'blanc',
    poidsG: 6,
    prixPieceHT: 0.18,
    prixKgHT: 30,
    conditionnement: CONDITIONNEMENT,
    image: '/images/petits-beurres/biscuit-blanc.png',
    note: 'Une douceur crémeuse aux notes de vanille',
  },

  // ---------------- Orangettes enrobées chocolat noir — 5 g ----------------
  {
    id: 'orangette-noir',
    gamme: 'orangette',
    nom: 'Orangette enrobée chocolat noir',
    court: 'Chocolat noir',
    chocolat: 'noir',
    poidsG: 5,
    prixPieceHT: 0.19,
    prixKgHT: 38,
    conditionnement: CONDITIONNEMENT,
    image: '/images/orangettes/orangette.png',
    note: 'Écorce d’orange confite et cacao intense',
  },
]

export const poissons = references.filter((r) => r.gamme === 'poisson')
export const petitsBeurres = references.filter((r) => r.gamme === 'petit-beurre')
export const orangettes = references.filter((r) => r.gamme === 'orangette')

/**
 * Les gammes professionnelles et leur page. Source unique : la navigation, la
 * passerelle de l'accueil, l'espace pro et le panier de l'en-tête s'y réfèrent,
 * pour qu'ajouter une gamme ne demande plus de penser à chaque endroit.
 */
export const GAMMES_PRO = [
  { gamme: 'poisson', href: '/poissons', label: 'Poissons', labelLong: 'Les poissons', image: '/images/poissons/poisson-lait.png' },
  { gamme: 'petit-beurre', href: '/petits-beurres', label: 'Petits beurres', labelLong: 'Les petits beurres', image: '/images/petits-beurres/biscuit-lait.png' },
  { gamme: 'orangette', href: '/orangettes', label: 'Orangettes', labelLong: 'Les orangettes', image: '/images/orangettes/orangette.png' },
] as const satisfies ReadonlyArray<{ gamme: Gamme; href: string; label: string; labelLong: string; image: string }>

/** Vrai si l'URL est une page de gamme professionnelle (donc rattachée au panier pro). */
export function estPageGammePro(pathname: string): boolean {
  return GAMMES_PRO.some((g) => pathname.startsWith(g.href))
}

export function referencesDeGamme(gamme: Gamme): Reference[] {
  return references.filter((r) => r.gamme === gamme)
}

export function getReference(id: string): Reference | undefined {
  return references.find((r) => r.id === id)
}

/** Prix HT d’un conditionnement complet (200 pièces) */
export function prixCartonHT(ref: Reference): number {
  return round2(ref.prixPieceHT * ref.conditionnement)
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100
}

/** Convertit un montant HT en TTC (TVA en vigueur). */
export function toTTC(ht: number): number {
  return round2(ht * (1 + TVA_RATE))
}

const eur = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatEUR(n: number): string {
  return eur.format(n)
}

export function formatKg(g: number): string {
  const kg = g / 1000
  return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(kg)} kg`
}

export interface EstimateLine {
  id: string
  cartons: number
}

export interface Estimate {
  lines: Array<{ ref: Reference; cartons: number; pieces: number; poidsG: number; totalHT: number }>
  cartons: number
  pieces: number
  poidsG: number
  sousTotalHT: number
  port: number
  franco: boolean
  resteAvantFranco: number
  /** Sous-total + frais de port, hors taxes */
  totalHT: number
  /** Montant de TVA sur (sous-total + port) */
  tva: number
  /** Montant réellement débité au paiement */
  totalTTC: number
}

/** Calcule le total d’une commande professionnelle (référence × nombre de cartons). */
export function computeEstimate(input: EstimateLine[]): Estimate {
  const lines = input
    .filter((l) => l.cartons > 0)
    .map((l) => {
      const ref = getReference(l.id)
      if (!ref) return null
      const pieces = ref.conditionnement * l.cartons
      return {
        ref,
        cartons: l.cartons,
        pieces,
        poidsG: pieces * ref.poidsG,
        totalHT: round2(pieces * ref.prixPieceHT),
      }
    })
    .filter((l): l is NonNullable<typeof l> => l !== null)

  const cartons = lines.reduce((s, l) => s + l.cartons, 0)
  const pieces = lines.reduce((s, l) => s + l.pieces, 0)
  const poidsG = lines.reduce((s, l) => s + l.poidsG, 0)
  const sousTotalHT = round2(lines.reduce((s, l) => s + l.totalHT, 0))
  const franco = sousTotalHT >= FRANCO_HT
  const port = lines.length === 0 ? 0 : franco ? 0 : FRAIS_PORT_HT
  const resteAvantFranco = franco ? 0 : round2(FRANCO_HT - sousTotalHT)
  const totalHT = round2(sousTotalHT + port)
  const tva = round2(totalHT * TVA_RATE)

  return {
    lines,
    cartons,
    pieces,
    poidsG,
    sousTotalHT,
    port,
    franco,
    resteAvantFranco,
    totalHT,
    tva,
    totalTTC: round2(totalHT + tva),
  }
}

/** Types d’établissement proposés à l’inscription et à la commande */
export const TYPES_ETABLISSEMENT = [
  'Restaurant',
  'Hôtel',
  'Café · Bar · Salon de thé',
  'Traiteur · Événementiel',
  'Entreprise · Comité d’entreprise',
  'Épicerie fine · Cave · Autre commerce',
  'Autre',
] as const
