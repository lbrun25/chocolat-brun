import type { ContenuArticle } from './types'
import SuperComiceMorteau2026 from './super-comice-morteau-2026'
import RetourSuperComiceMorteau2026 from './retour-super-comice-morteau-2026'
import VacheMontbeliarde, { faq as faqMontbeliarde } from './vache-montbeliarde-franche-comte'
import CadeauGourmandFrancheComte, { faq as faqCadeau } from './cadeau-gourmand-franche-comte'
import CommentConserverLeChocolat, { faq as faqConserver } from './comment-conserver-le-chocolat'
import ChocolatCafeRestaurantHotel, { faq as faqChr } from './chocolat-cafe-restaurant-hotel'
import ChocolatsDeNoelTraditions, { faq as faqNoel } from './chocolats-de-noel-traditions'
import DifferenceChocolatNoirLaitBlanc, { faq as faqNoirLaitBlanc } from './difference-chocolat-noir-lait-blanc'
import PurBeurreDeCacaoSignification, { faq as faqPurBeurre } from './pur-beurre-de-cacao-signification'
import PralineGiandujaDifference, { faq as faqPralineGianduja } from './praline-gianduja-difference'
import DuCacaoAuChocolatEtapesFabrication, { faq as faqFabrication } from './du-cacao-au-chocolat-etapes-fabrication'

/** Corps des articles, par slug (voir lib/blog.ts pour les métadonnées). Usage serveur uniquement. */
export const contenus: Record<string, ContenuArticle> = {
  'super-comice-morteau-2026': { Corps: SuperComiceMorteau2026 },
  'retour-super-comice-morteau-2026': { Corps: RetourSuperComiceMorteau2026 },
  'vache-montbeliarde-franche-comte': { Corps: VacheMontbeliarde, faq: faqMontbeliarde },
  'cadeau-gourmand-franche-comte': { Corps: CadeauGourmandFrancheComte, faq: faqCadeau },
  'comment-conserver-le-chocolat': { Corps: CommentConserverLeChocolat, faq: faqConserver },
  'chocolat-cafe-restaurant-hotel': { Corps: ChocolatCafeRestaurantHotel, faq: faqChr },
  'chocolats-de-noel-traditions': { Corps: ChocolatsDeNoelTraditions, faq: faqNoel },
  'difference-chocolat-noir-lait-blanc': { Corps: DifferenceChocolatNoirLaitBlanc, faq: faqNoirLaitBlanc },
  'pur-beurre-de-cacao-signification': { Corps: PurBeurreDeCacaoSignification, faq: faqPurBeurre },
  'praline-gianduja-difference': { Corps: PralineGiandujaDifference, faq: faqPralineGianduja },
  'du-cacao-au-chocolat-etapes-fabrication': { Corps: DuCacaoAuChocolatEtapesFabrication, faq: faqFabrication },
}
