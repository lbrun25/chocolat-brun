/**
 * Les deux espaces du site : particuliers (vente en ligne aux particuliers, prix TTC)
 * et professionnels (gammes vendues par carton, tarifs réservés aux comptes SIRET).
 *
 * Source unique du rangement : le menu de l'en-tête (liens propres à l'espace + menu
 * « Produits »), le pied de page, l'accueil et les pages d'espace s'y réfèrent. Un
 * nouveau produit se range ici, dans l'espace où il est vendu.
 */
import { GAMMES_PRO } from '@/lib/catalogue'

export type EspaceId = 'particuliers' | 'professionnels'

export interface ProduitEspace {
  href: string
  /** Libellé court, pour la barre de navigation */
  label: string
  /** Libellé long, pour les listes et le pied de page */
  labelLong: string
  image: string
}

export interface Espace {
  id: EspaceId
  href: string
  /** Libellé court, ex. « Particuliers » */
  label: string
  /** Titre complet, ex. « Espace particuliers » */
  titre: string
  produits: ReadonlyArray<ProduitEspace>
  /** Pages rattachées à l'espace en plus des pages produits (panier, commande, compte…) */
  autresPages: ReadonlyArray<string>
}

/** Produits vendus aux particuliers (paiement en ligne, prix TTC). */
export const PRODUITS_PARTICULIERS: ReadonlyArray<ProduitEspace> = [
  {
    href: '/belles-comtoises',
    label: 'Belles Comtoises',
    labelLong: 'Les Belles Comtoises',
    image: '/images/comtoises/vache-lait.jpg',
  },
]

export const ESPACES: Record<EspaceId, Espace> = {
  particuliers: {
    id: 'particuliers',
    href: '/particuliers',
    label: 'Particuliers',
    titre: 'Espace particuliers',
    produits: PRODUITS_PARTICULIERS,
    autresPages: ['/panier-comtoises'],
  },
  professionnels: {
    id: 'professionnels',
    href: '/professionnels',
    label: 'Professionnels',
    titre: 'Espace professionnels',
    produits: GAMMES_PRO,
    autresPages: ['/commander', '/espace-pro'],
  },
}

/** Ordre d'affichage des espaces (accueil, menu « Produits », pied de page). */
export const LISTE_ESPACES: ReadonlyArray<Espace> = [ESPACES.particuliers, ESPACES.professionnels]

function correspond(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`)
}

/** Espace auquel appartient une page, ou null pour les pages communes (accueil, histoire, blog…). */
export function espaceDe(pathname: string): EspaceId | null {
  for (const espace of LISTE_ESPACES) {
    const pages = [espace.href, ...espace.produits.map((p) => p.href), ...espace.autresPages]
    if (pages.some((href) => correspond(pathname, href))) return espace.id
  }
  return null
}
