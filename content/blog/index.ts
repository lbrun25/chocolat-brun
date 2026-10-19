import type { ContenuArticle } from './types'
import SuperComiceMorteau2026 from './super-comice-morteau-2026'
import VacheMontbeliarde, { faq as faqMontbeliarde } from './vache-montbeliarde-franche-comte'
import CadeauGourmandFrancheComte, { faq as faqCadeau } from './cadeau-gourmand-franche-comte'
import CommentConserverLeChocolat, { faq as faqConserver } from './comment-conserver-le-chocolat'
import ChocolatCafeRestaurantHotel, { faq as faqChr } from './chocolat-cafe-restaurant-hotel'

/** Corps des articles, par slug (voir lib/blog.ts pour les métadonnées). Usage serveur uniquement. */
export const contenus: Record<string, ContenuArticle> = {
  'super-comice-morteau-2026': { Corps: SuperComiceMorteau2026 },
  'vache-montbeliarde-franche-comte': { Corps: VacheMontbeliarde, faq: faqMontbeliarde },
  'cadeau-gourmand-franche-comte': { Corps: CadeauGourmandFrancheComte, faq: faqCadeau },
  'comment-conserver-le-chocolat': { Corps: CommentConserverLeChocolat, faq: faqConserver },
  'chocolat-cafe-restaurant-hotel': { Corps: ChocolatCafeRestaurantHotel, faq: faqChr },
}
