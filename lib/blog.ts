/**
 * Blog — métadonnées des articles (sans le contenu).
 * Ce fichier est importable côté client (landing) : le corps des articles vit dans
 * `content/blog/`, chargé uniquement par la page article.
 */

export { absoluteUrl } from '@/lib/site-url'

export type CategorieArticle = 'Actualités' | 'Terroir' | 'Conseils' | 'Professionnels'

export interface ArticleImage {
  src: string
  alt: string
  width: number
  height: number
  /** Cadrage CSS (object-position) quand l'image est recadrée dans une carte */
  cadrage?: string
}

export interface ArticleMeta {
  slug: string
  /** Titre affiché (H1) */
  titre: string
  /** Balise <title> : 60 caractères max, suffixée par « – Cédric Brun » via le template */
  titreSeo: string
  /** Meta description : 150-160 caractères */
  description: string
  /** Résumé affiché sur les cartes */
  extrait: string
  categorie: CategorieArticle
  /** Dates ISO (AAAA-MM-JJ) */
  datePublication: string
  dateMiseAJour?: string
  image: ArticleImage
  /** Image de partage 1200 × 630 (sinon l'image de couverture) */
  ogImage?: string
  tempsLectureMin: number
  motsCles: string[]
  /** Articles liés, par slug */
  liens?: string[]
  /** Événement annoncé par l'article (données structurées schema.org/Event) */
  evenement?: {
    nom: string
    /** Date ISO (AAAA-MM-JJ) */
    date: string
    lieu: string
    ville: string
    codePostal: string
  }
}

export const AUTEUR = {
  nom: 'Mélanie et Cédric Brun',
  role: 'Maître Artisan Pâtissier Chocolatier à Charquemont (Doubs)',
} as const

/** Nom de la maison, identique à l'og:siteName du layout racine */
export const SITE_NAME = 'Cédric Brun – Maître Artisan Pâtissier Chocolatier'

const ARTICLES: ArticleMeta[] = [
  {
    slug: 'super-comice-morteau-2026',
    titre: 'Retrouvez-nous au Super Comice du patrimoine de Morteau, le 24 octobre 2026',
    titreSeo: 'Super Comice de Morteau 2026 : venez nous rencontrer',
    description:
      'Mélanie et Cédric Brun seront au Super Comice du patrimoine de Morteau le samedi 24 octobre 2026 avec Les Belles Comtoises, vaches en chocolat praliné.',
    extrait:
      'Le samedi 24 octobre 2026, nous vous donnons rendez-vous à Morteau pour une journée dédiée aux traditions franc-comtoises… et à nos Belles Comtoises.',
    categorie: 'Actualités',
    datePublication: '2026-10-19',
    image: {
      src: '/images/blog/super-comice-morteau-2026/affiche-super-comice-morteau-2026.jpg',
      alt: 'Affiche du Super Comice du patrimoine, Val de Morteau 2026 : vaches montbéliardes dans la rue de Morteau, samedi 24 octobre',
      width: 1115,
      height: 1407,
      cadrage: '50% 0%',
    },
    ogImage: '/images/blog/super-comice-morteau-2026/og-super-comice-morteau-2026.jpg',
    tempsLectureMin: 3,
    motsCles: ['Super Comice Morteau', 'comice Morteau 2026', 'Val de Morteau', 'Belles Comtoises', 'vache en chocolat'],
    liens: ['vache-montbeliarde-franche-comte', 'cadeau-gourmand-franche-comte'],
    evenement: {
      nom: 'Super Comice du patrimoine – Val de Morteau 2026',
      date: '2026-10-24',
      lieu: 'Centre-ville de Morteau',
      ville: 'Morteau',
      codePostal: '25500',
    },
  },
  {
    slug: 'vache-montbeliarde-franche-comte',
    titre: 'La vache montbéliarde, emblème de la Franche-Comté (et de nos Belles Comtoises)',
    titreSeo: 'La vache montbéliarde, emblème de la Franche-Comté',
    description:
      'Robe pie rouge, clarines et lait à Comté : l’histoire de la vache montbéliarde, reine du Haut-Doubs, qui a inspiré nos Belles Comtoises en chocolat.',
    extrait:
      'Robe pie rouge, clarine au cou et lait réservé aux grands fromages : portrait de la reine des prés du Haut-Doubs, qui a inspiré nos petites vaches en chocolat.',
    categorie: 'Terroir',
    datePublication: '2026-10-19',
    image: {
      src: '/images/comtoises/melanie-cedric-facade.jpg',
      alt: 'Mélanie et Cédric Brun devant leur boutique de Charquemont, avec une vache montbéliarde et leurs coffrets',
      width: 2400,
      height: 1800,
    },
    tempsLectureMin: 5,
    motsCles: ['vache montbéliarde', 'race montbéliarde', 'Franche-Comté', 'Comté AOP', 'vache en chocolat'],
    liens: ['super-comice-morteau-2026', 'cadeau-gourmand-franche-comte'],
  },
  {
    slug: 'cadeau-gourmand-franche-comte',
    titre: 'Quel cadeau gourmand offrir de Franche-Comté ? Nos idées 100 % comtoises',
    titreSeo: 'Cadeau gourmand de Franche-Comté : 7 idées locales',
    description:
      'Comté, saucisse de Morteau, Mont d’Or, chocolats… Nos idées de cadeaux gourmands typiques de Franche-Comté, et nos conseils pour bien les offrir.',
    extrait:
      'Fromages AOP, salaisons fumées, eaux-de-vie et chocolats : notre sélection de spécialités franc-comtoises à offrir, et comment les choisir.',
    categorie: 'Terroir',
    datePublication: '2026-10-19',
    image: {
      src: '/images/comtoises/coffret-carre-ferme.jpg',
      alt: 'Coffret carré de Belles Comtoises fermé, au décor tacheté de vache montbéliarde',
      width: 1200,
      height: 1600,
    },
    tempsLectureMin: 6,
    motsCles: ['cadeau Franche-Comté', 'spécialités franc-comtoises', 'cadeau gourmand Doubs', 'idée cadeau régional'],
    liens: ['vache-montbeliarde-franche-comte', 'comment-conserver-le-chocolat'],
  },
  {
    slug: 'comment-conserver-le-chocolat',
    titre: 'Comment conserver le chocolat ? Les conseils d’un artisan chocolatier',
    titreSeo: 'Comment conserver le chocolat : conseils d’artisan',
    description:
      'Quelle température, faut-il le mettre au frigo, pourquoi blanchit-il ? Nos conseils d’artisan chocolatier pour conserver vos chocolats et pralinés.',
    extrait:
      'Température idéale, réfrigérateur, chocolat qui blanchit : tout ce qu’il faut savoir pour garder vos chocolats aussi bons qu’au premier jour.',
    categorie: 'Conseils',
    datePublication: '2026-10-19',
    image: {
      src: '/images/galerie/vaches-noir-coques-moules.jpg',
      alt: 'Coques de vaches Belles Comtoises en chocolat noir dans leurs moules, à l’atelier',
      width: 1600,
      height: 1200,
    },
    tempsLectureMin: 5,
    motsCles: ['conserver le chocolat', 'chocolat frigo', 'chocolat blanchi', 'température chocolat', 'conservation praliné'],
    liens: ['cadeau-gourmand-franche-comte', 'chocolat-cafe-restaurant-hotel'],
  },
  {
    slug: 'chocolat-cafe-restaurant-hotel',
    titre: 'Le petit chocolat servi avec le café : un détail qui compte pour les restaurants et hôtels',
    titreSeo: 'Chocolat pour café : restaurants, hôtels et bars',
    description:
      'Pourquoi servir un petit chocolat avec le café, quel format choisir, emballé ou non ? Le guide des professionnels de la restauration et de l’hôtellerie.',
    extrait:
      'Servi avec l’expresso, glissé sur l’oreiller ou offert à l’accueil : pourquoi la mignardise chocolatée marque vos clients, et comment bien la choisir.',
    categorie: 'Professionnels',
    datePublication: '2026-10-19',
    image: {
      src: '/images/galerie/cafe_chocolat.png',
      alt: 'Tasse de café accompagnée d’un petit chocolat emballé individuellement',
      width: 1024,
      height: 1024,
    },
    tempsLectureMin: 6,
    motsCles: [
      'chocolat pour café',
      'chocolat restaurant',
      'chocolat hôtel',
      'chocolat emballé individuellement',
      'mignardise café',
    ],
    liens: ['comment-conserver-le-chocolat', 'super-comice-morteau-2026'],
  },
]

/** Articles du plus récent au plus ancien (ordre de déclaration à date égale). */
export const articles: ArticleMeta[] = ARTICLES.map((a, i) => ({ a, i }))
  .sort((x, y) => y.a.datePublication.localeCompare(x.a.datePublication) || x.i - y.i)
  .map(({ a }) => a)

export function getArticle(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug)
}

export function articlesLies(article: ArticleMeta, max = 2): ArticleMeta[] {
  const lies = (article.liens ?? []).map(getArticle).filter((a): a is ArticleMeta => !!a)
  const autres = articles.filter((a) => a.slug !== article.slug && !lies.includes(a))
  return [...lies, ...autres].slice(0, max)
}

export function formatDateArticle(iso: string): string {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`)
  )
}
