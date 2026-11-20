/**
 * Blog — métadonnées des articles (sans le contenu).
 * Ce fichier est importable côté client (landing) : le corps des articles vit dans
 * `content/blog/`, chargé uniquement par la page article.
 */

export { absoluteUrl } from '@/lib/site-url'

export type CategorieArticle = 'Actualités' | 'Terroir' | 'Conseils' | 'Professionnels'

/**
 * Produit présenté en vitrine à la fin de l'article (components/blog/VitrineProduit) :
 * les coffrets de Belles Comtoises (particuliers) ou les gammes pros.
 */
export type ProduitVitrine = 'belles-comtoises' | 'gammes-pro'

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
  /** Vitrine de fin d'article ; par défaut, les gammes pros pour la rubrique Professionnels, les Belles Comtoises sinon */
  produit?: ProduitVitrine
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
    slug: 'cadeau-maitresse-noel-fin-d-annee',
    titre: 'Cadeau pour la maîtresse à Noël : idées pour l’enseignant, l’ATSEM et la nounou, en individuel ou en collectif',
    titreSeo: 'Cadeau maîtresse Noël : idées pour l’école et la nounou',
    description:
      'Faut-il offrir un cadeau à la maîtresse à Noël ? Idées qui ne s’accumulent pas, cadeau collectif de la classe, attention pour l’ATSEM et la nounou.',
    extrait:
      'Un petit geste porté par l’enfant plutôt qu’un objet de plus : quoi offrir à la maîtresse à Noël, comment organiser un cadeau collectif sans gêner personne, et comment ne pas oublier l’ATSEM, l’AESH ou la nounou.',
    categorie: 'Conseils',
    datePublication: '2026-11-20',
    image: {
      src: '/images/comtoises/coffret-20-detail.jpg',
      alt: 'Boîte ouverte de douze Belles Comtoises sur l’herbe : vaches en chocolat au lait, blanc, caramel et noir rangées en trois colonnes, couvercle tacheté posé derrière',
      width: 1200,
      height: 1600,
    },
    tempsLectureMin: 6,
    motsCles: ['cadeau maîtresse Noël', 'cadeau ATSEM Noël', 'cadeau nounou Noël', 'cadeau collectif maîtresse', 'cadeau fin d’année maîtresse'],
    liens: ['cadeau-collegue-noel-secret-santa', 'vache-montbeliarde-franche-comte'],
  },
  {
    // Texte, photo et vidéo de la maison : hors règles éditoriales de l'agent (ARTICLES_MAISON, scripts/verifier-blog.mjs)
    slug: 'orangettes-chocolat-noir',
    titre: 'Les orangettes au chocolat noir : une gourmandise artisanale à savourer pour les fêtes',
    titreSeo: 'Orangettes au chocolat noir, une gourmandise de fêtes',
    description:
      'Orangettes au chocolat noir de Cédric Brun, à Charquemont : l’orange confite enrobée de chocolat noir, présentée pour Noël dans de jolies boîtes transparentes.',
    extrait: 'Le mariage délicat de l’orange et du chocolat noir, une gourmandise intemporelle.',
    categorie: 'Actualités',
    datePublication: '2026-11-19',
    image: {
      src: '/images/blog/orangettes-chocolat-noir/boites-orangettes-noel.jpg',
      alt: 'Boîtes transparentes remplies d’orangettes au chocolat noir, nouées de rubans rouges et blancs et décorées de poinsettias',
      width: 1448,
      height: 1086,
    },
    ogImage: '/images/blog/orangettes-chocolat-noir/og-orangettes-chocolat-noir.jpg',
    tempsLectureMin: 2,
    motsCles: ['orangettes chocolat noir', 'orangettes artisanales', 'orangettes Noël', 'cadeau gourmand Noël', 'chocolatier Charquemont'],
    liens: ['chocolat-et-cafe-accords', 'chocolats-de-noel-traditions'],
  },
  {
    // Texte et photo de la maison : hors règles éditoriales de l'agent (ARTICLES_MAISON, scripts/verifier-blog.mjs)
    slug: 'calendrier-de-l-avent-chocolat',
    titre: 'Calendrier de l’Avent chocolaté : 24 jours de gourmandise avant Noël',
    titreSeo: 'Calendrier de l’Avent chocolaté à Charquemont',
    description:
      'Notre calendrier de l’Avent chocolaté, 24 fenêtres au décor bleu nuit enneigé : disponible dans notre boutique de Charquemont ou sur commande par e-mail.',
    extrait: 'La magie de Noël commence par une petite douceur chocolatée…',
    categorie: 'Actualités',
    datePublication: '2026-11-19',
    image: {
      src: '/images/blog/calendrier-de-l-avent-chocolat/calendriers-boutique.jpg',
      alt: 'Calendriers de l’Avent au décor bleu nuit et enneigé alignés sur les étagères en verre de la boutique, avec les pancartes « Calendrier de l’Avent 12 € »',
      width: 1536,
      height: 994,
    },
    ogImage: '/images/blog/calendrier-de-l-avent-chocolat/og-calendrier-de-l-avent-chocolat.jpg',
    tempsLectureMin: 2,
    motsCles: ['calendrier de l’Avent chocolat', 'calendrier de l’Avent Charquemont', 'calendrier de l’Avent Haut-Doubs', 'cadeau de Noël', 'chocolatier Charquemont'],
    liens: ['chocolats-de-noel-traditions', 'cadeau-gourmand-franche-comte'],
  },
  {
    slug: 'cadeau-collegue-noel-secret-santa',
    titre: 'Cadeau collègue à Noël : les règles du Secret Santa et les idées qui plaisent sans connaître la personne',
    titreSeo: 'Cadeau collègue Noël : réussir son Secret Santa',
    description:
      'Tirage, plafond de dépense, anonymat : comment organiser un Secret Santa au bureau, quel cadeau offrir à un collègue qu’on connaît peu et ce qu’il faut éviter.',
    extrait:
      'Les trois règles du Secret Santa, les précautions qui évitent les fausses notes au bureau, les cadeaux neutres qui plaisent à un collègue qu’on connaît peu et ceux qu’il vaut mieux laisser en rayon.',
    categorie: 'Conseils',
    datePublication: '2026-11-19',
    image: {
      src: '/images/comtoises/coffret-6-ouvert.jpg',
      alt: 'Réglette de 6 Belles Comtoises ouverte sur l’herbe : six petites vaches en chocolat noir, au lait, caramel et blanc alignées, couvercle tacheté posé en travers',
      width: 1200,
      height: 1600,
    },
    tempsLectureMin: 6,
    motsCles: ['cadeau collègue Noël', 'idée cadeau Secret Santa', 'Secret Santa bureau', 'cadeau collègue pas cher', 'organiser un Secret Santa'],
    liens: ['cadeau-clients-fin-d-annee-chocolat-entreprise', 'difference-chocolat-noir-lait-blanc'],
  },
  {
    slug: 'idee-cadeau-agriculteur-eleveur',
    titre: 'Idée cadeau pour un agriculteur ou un éleveur : ce qui fait vraiment plaisir à Noël',
    titreSeo: 'Idée cadeau agriculteur : quoi offrir à un éleveur ?',
    description:
      'Cadeaux utiles dehors, clin d’œil au troupeau, gourmandise à partager à la ferme : nos idées pour offrir à un agriculteur ou un éleveur à Noël.',
    extrait:
      'Gants et lampe frontale, photo du troupeau, sortie compatible avec les soins des bêtes, grande boîte à partager en famille : comment choisir un cadeau qui tient compte du métier d’agriculteur ou d’éleveur.',
    categorie: 'Conseils',
    datePublication: '2026-11-18',
    image: {
      src: '/images/comtoises/coffret-20-ouvert-3.jpg',
      alt: 'Boîte de 20 Belles Comtoises ouverte sur l’herbe : quatre rangées de vaches en chocolat au lait, caramel, blanc et noir',
      width: 1200,
      height: 1600,
    },
    tempsLectureMin: 5,
    motsCles: ['idée cadeau agriculteur', 'cadeau éleveur', 'cadeau Noël agriculteur', 'cadeau éleveur de vaches', 'vache en chocolat'],
    liens: ['vache-montbeliarde-franche-comte', 'cadeau-gourmand-franche-comte'],
  },
  {
    slug: 'cadeau-clients-fin-d-annee-chocolat-entreprise',
    titre: 'Cadeau clients de fin d’année : comment offrir du chocolat quand on est une entreprise',
    titreSeo: 'Cadeau clients fin d’année : offrir du chocolat',
    description:
      'Coffret par client ou chocolats à partager, date de commande, présentation et transport : le guide pour réussir vos cadeaux clients de fin d’année en chocolat.',
    extrait:
      'Une boîte pour vos interlocuteurs principaux, un grand format pour les équipes, des chocolats emballés un à un pour l’accueil et les envois : comment choisir, quand commander et comment présenter vos cadeaux clients de fin d’année.',
    categorie: 'Professionnels',
    datePublication: '2026-11-17',
    image: {
      src: '/images/atelier/emballages-cadre.jpg',
      alt: 'Chocolats emballés un à un dans des sachets marron marqués « Chocolat » et d’une cabosse, posés en vrac sur un plateau doré',
      width: 2000,
      height: 1500,
    },
    tempsLectureMin: 6,
    motsCles: ['cadeau clients fin d’année', 'cadeau entreprise chocolat', 'cadeau d’affaires chocolat', 'chocolat de Noël entreprise', 'cadeau client Noël'],
    liens: ['chocolat-cafe-restaurant-hotel', 'chocolats-de-noel-traditions'],
  },
  {
    slug: 'chocolat-et-cafe-accords',
    titre: 'Accord café chocolat : quel chocolat avec quel café ? Expresso, filtre, café au lait',
    titreSeo: 'Accord café chocolat : quel chocolat avec quel café ?',
    description:
      'Chocolat noir, au lait ou blanc : lequel servir avec un expresso, un café filtre ou un cappuccino, pourquoi ils s’accordent et comment les déguster ensemble.',
    extrait:
      'Noir avec l’expresso, lait avec le café filtre, blanc par contraste avec un café très torréfié : les règles simples pour accorder café et chocolat, et les arômes de torréfaction qui les rapprochent.',
    categorie: 'Conseils',
    datePublication: '2026-11-16',
    image: {
      src: '/images/grains-de-cafe/cafe-et-sachet.webp',
      alt: 'Tasse d’expresso sur sa soucoupe, à côté d’un sachet transparent de trois grains de café enrobés de chocolat noir et de grains de café torréfiés',
      width: 1055,
      height: 529,
    },
    tempsLectureMin: 6,
    motsCles: ['accord café chocolat', 'quel chocolat avec un café', 'chocolat et expresso', 'chocolat noir café', 'déguster café et chocolat'],
    liens: ['du-cacao-au-chocolat-etapes-fabrication', 'difference-chocolat-noir-lait-blanc'],
  },
  {
    slug: 'du-cacao-au-chocolat-etapes-fabrication',
    titre: 'Comment fabrique-t-on le chocolat ? Les étapes, de la cabosse au chocolat moulé',
    titreSeo: 'Fabrication du chocolat : les étapes, de la fève au moule',
    description:
      'Récolte, fermentation, séchage, torréfaction, broyage, conchage, tempérage, moulage : chaque étape de fabrication du chocolat et ce qu’elle change au goût.',
    extrait:
      'Cinq jours de fermentation, des fèves séchées jusqu’à 7,5 % d’humidité, une pâte pressée à 550 bars, un beurre de cacao à faire cristalliser sous la bonne forme : le chemin de la fève au chocolat, étape par étape.',
    categorie: 'Conseils',
    datePublication: '2026-11-13',
    image: {
      src: '/images/galerie/troix_cabosses.jpg',
      alt: 'Trois cabosses de cacao décoratives, rouge, verte et jaune, alignées sur un fond brun',
      width: 6000,
      height: 4000,
    },
    tempsLectureMin: 6,
    motsCles: ['fabrication du chocolat', 'étapes fabrication chocolat', 'fermentation cacao', 'conchage chocolat', 'tempérage chocolat', 'pâte de cacao'],
    liens: ['difference-chocolat-noir-lait-blanc', 'pur-beurre-de-cacao-signification'],
  },
  {
    // Texte et photos de la maison : hors règles éditoriales de l'agent (ARTICLES_MAISON, scripts/verifier-blog.mjs)
    slug: 'retour-super-comice-morteau-2026',
    titre: 'Les Belles Comtoises au Super Comice du Val de Morteau',
    titreSeo: 'Les Belles Comtoises au Super Comice de Morteau 2026',
    description:
      'Retour sur le Super Comice du Val de Morteau 2026 : les Belles Comtoises, chocolats artisanaux de Mélanie et Cédric Brun à Charquemont.',
    extrait: 'Un rendez-vous au cœur du Haut-Doubs, entre traditions, rencontres et gourmandises chocolatées.',
    categorie: 'Actualités',
    datePublication: '2026-11-11',
    image: {
      src: '/images/blog/retour-super-comice-morteau-2026/stand-chocolats.jpg',
      alt: 'Mélanie et Cédric Brun devant les chocolats Les Belles Comtoises sur leur stand au Super Comice',
      width: 1600,
      height: 1200,
    },
    ogImage: '/images/blog/retour-super-comice-morteau-2026/og-retour-super-comice-morteau-2026.jpg',
    tempsLectureMin: 2,
    motsCles: ['Super Comice Morteau', 'comice Morteau 2026', 'Val de Morteau', 'Belles Comtoises', 'marché des producteurs'],
    liens: ['super-comice-morteau-2026', 'vache-montbeliarde-franche-comte'],
  },
  {
    slug: 'praline-gianduja-difference',
    titre: 'Praliné ou gianduja : quelle différence ? Ingrédients, définitions et étiquette',
    titreSeo: 'Différence praliné gianduja : ce qui les distingue',
    description:
      'Praliné et gianduja : l’un est fait de fruits à coque et de sucre, l’autre de chocolat et de noisettes. Définitions, seuils et lecture de l’étiquette.',
    extrait:
      'Au moins 50 % de fruits à coque pour le praliné selon le code de la profession, 20 à 40 g de noisettes pour 100 g de gianduja selon la directive européenne : deux pâtes de noisette qui ne se confondent pas.',
    categorie: 'Conseils',
    datePublication: '2026-11-12',
    image: {
      src: '/images/galerie/vaches-coques-chocolat-detail.jpg',
      alt: 'Gros plan sur des moules en plastique vert où sèchent des coques de chocolat au lait en forme de vache, encore creuses',
      width: 1200,
      height: 1600,
    },
    tempsLectureMin: 5,
    motsCles: ['différence praliné gianduja', 'gianduja définition', 'praliné définition', 'chocolat au gianduja noisettes', 'praliné à l’ancienne'],
    liens: ['pur-beurre-de-cacao-signification', 'difference-chocolat-noir-lait-blanc'],
  },
  {
    slug: 'pur-beurre-de-cacao-signification',
    titre: 'Chocolat « pur beurre de cacao » : que signifie la mention, et que dit la loi ?',
    titreSeo: 'Pur beurre de cacao : ce que veut dire la mention',
    description:
      'Chocolat « pur beurre de cacao » : ce que garantit la mention, les six graisses végétales autorisées à 5 % et comment les repérer sur l’étiquette.',
    extrait:
      'Mention facultative mais encadrée depuis 2001, graisses de substitution autorisées, « chocolat pur » refusé par la justice européenne : ce que dit vraiment l’étiquette.',
    categorie: 'Conseils',
    datePublication: '2026-11-10',
    image: {
      src: '/images/galerie/cabosse_ouverte.jpg',
      alt: 'Deux cabosses de cacao séchées sur une toile de jute : l’une entière, l’autre ouverte sur ses rangées de fèves',
      width: 6000,
      height: 4000,
    },
    tempsLectureMin: 6,
    motsCles: ['pur beurre de cacao', 'chocolat pur beurre de cacao signification', 'matières grasses végétales chocolat', 'chocolat traditionnel mention', 'huile de palme chocolat étiquette'],
    liens: ['difference-chocolat-noir-lait-blanc', 'comment-conserver-le-chocolat'],
  },
  {
    slug: 'difference-chocolat-noir-lait-blanc',
    titre: 'Chocolat noir, au lait ou blanc : quelles différences ? Composition, seuils légaux et goût',
    titreSeo: 'Différence chocolat noir, lait et blanc : le guide',
    description:
      'Chocolat noir, au lait, blanc : ce que chacun garde de la fève de cacao, les teneurs minimales fixées par la loi et comment les reconnaître sur l’étiquette.',
    extrait:
      'Beurre de cacao, cacao sec, lait : ce qui distingue vraiment le chocolat noir, le chocolat au lait et le chocolat blanc, seuils de la directive européenne à l’appui.',
    categorie: 'Conseils',
    datePublication: '2026-11-09',
    image: {
      src: '/images/comtoises/coffret-30-ouvert.jpg',
      alt: 'Coffret ouvert de trente Belles Comtoises rangées en colonnes, du chocolat blanc ivoire au chocolat noir',
      width: 1086,
      height: 1448,
    },
    tempsLectureMin: 5,
    motsCles: ['différence chocolat noir lait blanc', 'chocolat blanc cacao', 'teneur en cacao chocolat au lait', 'définition légale chocolat', 'chocolat de couverture'],
    liens: ['comment-conserver-le-chocolat', 'chocolat-cafe-restaurant-hotel'],
  },
  {
    slug: 'chocolats-de-noel-traditions',
    titre: 'Pourquoi offre-t-on des chocolats à Noël ? L’origine des traditions, de l’Avent aux papillotes',
    titreSeo: 'Chocolats de Noël : l’origine des traditions',
    description:
      'Avent, Saint-Nicolas, papillotes lyonnaises, truffes : d’où viennent les traditions du chocolat de Noël, ce qui est attesté et ce qui relève de la légende.',
    extrait:
      'Calendrier de l’Avent, friandises de la Saint-Nicolas, papillotes nées à Lyon : comment le chocolat est devenu le cadeau de décembre, sources à l’appui.',
    categorie: 'Terroir',
    datePublication: '2026-11-08',
    image: {
      src: '/images/comtoises/coffret-20-ouvert.jpg',
      alt: 'Coffret ouvert de vingt Belles Comtoises en chocolat noir, lait, caramel et blanc, posé sur l’herbe',
      width: 1200,
      height: 1600,
    },
    tempsLectureMin: 5,
    motsCles: ['chocolats de Noël', 'tradition chocolat Noël', 'origine papillote', 'calendrier de l’Avent chocolat', 'Saint-Nicolas friandises'],
    liens: ['cadeau-gourmand-franche-comte', 'comment-conserver-le-chocolat'],
  },
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
    dateMiseAJour: '2026-11-11',
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

export function produitDe(article: ArticleMeta): ProduitVitrine {
  return article.produit ?? (article.categorie === 'Professionnels' ? 'gammes-pro' : 'belles-comtoises')
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
