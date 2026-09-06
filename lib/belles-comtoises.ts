/**
 * Les Belles Comtoises — gamme grand public (particuliers).
 * Petites vaches montbéliardes en chocolat, pur beurre de cacao, praliné noisette.
 * « Les Belles Comtoises » est une marque déposée par la Fédération des Belles Comtoises de Franche-Comté.
 *
 * Tarifs TTC officiels communiqués par la cliente (août 2026).
 */

/** Passe à `true` pour afficher un bandeau « tarifs provisoires » si la grille évolue. */
export const PRIX_PROVISOIRES = false

export interface Coffret {
  id: string
  nom: string
  /** Sous-titre court affiché sous le nom */
  detail: string
  /** Nombre de vaches dans le coffret */
  pieces: number
  /** Poids net indicatif, en grammes */
  poidsG: number
  /** Prix TTC en euros (TVA 5,5 % incluse) */
  prixTTC: number
  image: string
  imageAlt: string
}

/** Les quatre recettes, présentées sur la page */
export const recettes = [
  {
    id: 'lait',
    nom: 'Chocolat au lait',
    note: 'Fondant et lacté',
    image: '/images/comtoises/vache-lait.jpg',
  },
  {
    id: 'noir',
    nom: 'Chocolat noir',
    note: 'Intense et cacaoté',
    image: '/images/comtoises/vache-noir.jpg',
  },
  {
    id: 'blanc',
    nom: 'Chocolat blanc',
    note: 'Doux et vanillé',
    image: '/images/comtoises/vache-blanc.jpg',
  },
  {
    id: 'caramel',
    nom: 'Chocolat caramel',
    note: 'Biscuité et caramélisé',
    image: '/images/comtoises/vache-caramel.jpg',
  },
] as const

/** Quantité maximale d'un même coffret dans un panier (appliquée côté client ET côté serveur). */
export const MAX_QUANTITE = 20

/** Poids indicatif d'une vache en chocolat, en grammes (sert au récapitulatif, pas au calcul du port). */
const POIDS_PIECE_G = 10

/**
 * Information alimentaire obligatoire avant achat (vente à distance de denrées).
 * Reprise de l'étiquette officielle transmise par la cliente
 * (ingrédients belles_comtoises.pdf, reçue le 1er septembre 2026).
 */
export const ALLERGENES = 'Contient : NOISETTES (fruits à coque), LAIT. Traces de coques.'

export const COMPOSITION =
  'Intérieur praliné 75 % : noisettes, sucre, beurre de cacao. Enrobage chocolat 25 % : pâte de cacao, beurre de cacao, lait en poudre, matières grasses de lait, lécithine, vanilline. Fabrication artisanale à Charquemont (Doubs).'

export const CONSERVATION =
  'À conserver dans un endroit frais et sec, à l’abri de la lumière, entre 15 et 18 °C.'

export const coffrets: Coffret[] = [
  {
    id: 'coffret-6',
    nom: 'Coffret de 6',
    detail: 'Petit format',
    pieces: 6,
    poidsG: 6 * POIDS_PIECE_G,
    prixTTC: 12,
    image: '/images/comtoises/coffret-6-ouvert.jpg',
    imageAlt: 'Coffret de 6 Belles Comtoises ouvert dans l’herbe',
  },
  {
    id: 'coffret-12',
    nom: 'Coffret de 12',
    detail: 'Format découverte',
    pieces: 12,
    poidsG: 12 * POIDS_PIECE_G,
    prixTTC: 18,
    image: '/images/comtoises/coffret-carre-ferme.jpg',
    imageAlt: 'Coffret carré de 12 Belles Comtoises fermé, au décor tacheté',
  },
  {
    id: 'coffret-20',
    nom: 'Coffret de 24',
    detail: 'Grand format',
    pieces: 24,
    poidsG: 24 * POIDS_PIECE_G,
    prixTTC: 26,
    // ⚠️ Coffret passé de 20 à 24 pièces (info cliente, 1er sept. 2026) : les photos ci-dessous
    // montrent encore l'ancien coffret de 20. À remplacer dès réception des nouvelles prises de vue.
    // Le tarif TTC n'a pas été révisé pour les 4 pièces supplémentaires : à confirmer avec la cliente.
    image: '/images/comtoises/coffret-20-ouvert-3.jpg',
    imageAlt: 'Coffret de 24 Belles Comtoises ouvert dans l’herbe',
  },
  {
    id: 'coffret-30',
    nom: 'Coffret de 30',
    detail: 'Très grand format',
    pieces: 30,
    poidsG: 30 * POIDS_PIECE_G,
    prixTTC: 35,
    image: '/images/comtoises/coffret-30-ouvert.jpg',
    imageAlt: 'Coffret de 30 Belles Comtoises ouvert dans l’herbe, cinq rangées de six vaches',
  },
]

export function getCoffret(id: string): Coffret | undefined {
  return coffrets.find((c) => c.id === id)
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

export function round2(n: number): number {
  return Math.round(n * 100) / 100
}

export interface PanierComtoisesLigne {
  id: string
  quantite: number
}

export interface TotalComtoises {
  lignes: Array<{ coffret: Coffret; quantite: number; totalTTC: number }>
  articles: number
  poidsG: number
  sousTotalTTC: number
  port: number
  livraisonOfferte: boolean
  resteAvantFranco: number
  totalTTC: number
}

/** Calcule le total d’un panier Belles Comtoises (prix TTC, particuliers). */
export function computeTotalComtoises(
  input: PanierComtoisesLigne[],
  calculePort: (poidsG: number, sousTotalTTC: number) => number,
  seuilFranco: number
): TotalComtoises {
  const lignes = input
    .filter((l) => l.quantite > 0)
    .map((l) => {
      const coffret = getCoffret(l.id)
      if (!coffret) return null
      return {
        coffret,
        quantite: l.quantite,
        totalTTC: round2(coffret.prixTTC * l.quantite),
      }
    })
    .filter((l): l is NonNullable<typeof l> => l !== null)

  // Toujours présenter les lignes dans l'ordre du catalogue, pas dans l'ordre d'ajout au panier
  lignes.sort((a, b) => coffrets.indexOf(a.coffret) - coffrets.indexOf(b.coffret))

  const articles = lignes.reduce((s, l) => s + l.quantite, 0)
  const poidsG = lignes.reduce((s, l) => s + l.coffret.poidsG * l.quantite, 0)
  const sousTotalTTC = round2(lignes.reduce((s, l) => s + l.totalTTC, 0))
  const port = lignes.length === 0 ? 0 : calculePort(poidsG, sousTotalTTC)
  const livraisonOfferte = lignes.length > 0 && port === 0
  const resteAvantFranco =
    lignes.length === 0 || livraisonOfferte ? 0 : round2(Math.max(0, seuilFranco - sousTotalTTC))

  return {
    lignes,
    articles,
    poidsG,
    sousTotalTTC,
    port,
    livraisonOfferte,
    resteAvantFranco,
    totalTTC: round2(sousTotalTTC + port),
  }
}
