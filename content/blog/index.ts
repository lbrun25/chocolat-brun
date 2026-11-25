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
import ChocolatEtCafeAccords, { faq as faqCafeAccords } from './chocolat-et-cafe-accords'
import CadeauClientsFinDAnnee, { faq as faqCadeauClients } from './cadeau-clients-fin-d-annee-chocolat-entreprise'
import IdeeCadeauAgriculteurEleveur, { faq as faqAgriculteur } from './idee-cadeau-agriculteur-eleveur'
import CadeauCollegueNoelSecretSanta, { faq as faqSecretSanta } from './cadeau-collegue-noel-secret-santa'
import CadeauMaitresseNoelFinDAnnee, { faq as faqMaitresse } from './cadeau-maitresse-noel-fin-d-annee'
import MenuDeFetesRestaurant, { faq as faqMenuDeFetes } from './menu-de-fetes-restaurant-attention-clients'
import CadeauNoelGrandsParentsADistance, { faq as faqGrandsParents } from './cadeau-noel-grands-parents-a-distance'
import CadeauInviteRepasDeNoel, { faq as faqInviteNoel } from './cadeau-invite-repas-de-noel'
import IdeeCadeauAmoureuxDesVaches, { faq as faqAmoureuxVaches } from './idee-cadeau-amoureux-des-vaches'
import EnvoyerDesChocolatsParLaPoste, { faq as faqEnvoyerChocolats } from './envoyer-des-chocolats-par-la-poste'
import CalendrierDeLAventChocolat from './calendrier-de-l-avent-chocolat'
import OrangettesChocolatNoir from './orangettes-chocolat-noir'

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
  'chocolat-et-cafe-accords': { Corps: ChocolatEtCafeAccords, faq: faqCafeAccords },
  'cadeau-clients-fin-d-annee-chocolat-entreprise': { Corps: CadeauClientsFinDAnnee, faq: faqCadeauClients },
  'idee-cadeau-agriculteur-eleveur': { Corps: IdeeCadeauAgriculteurEleveur, faq: faqAgriculteur },
  'cadeau-collegue-noel-secret-santa': { Corps: CadeauCollegueNoelSecretSanta, faq: faqSecretSanta },
  'menu-de-fetes-restaurant-attention-clients': { Corps: MenuDeFetesRestaurant, faq: faqMenuDeFetes },
  'cadeau-maitresse-noel-fin-d-annee': { Corps: CadeauMaitresseNoelFinDAnnee, faq: faqMaitresse },
  'cadeau-noel-grands-parents-a-distance': { Corps: CadeauNoelGrandsParentsADistance, faq: faqGrandsParents },
  'cadeau-invite-repas-de-noel': { Corps: CadeauInviteRepasDeNoel, faq: faqInviteNoel },
  'idee-cadeau-amoureux-des-vaches': { Corps: IdeeCadeauAmoureuxDesVaches, faq: faqAmoureuxVaches },
  'envoyer-des-chocolats-par-la-poste': { Corps: EnvoyerDesChocolatsParLaPoste, faq: faqEnvoyerChocolats },
  'calendrier-de-l-avent-chocolat': { Corps: CalendrierDeLAventChocolat },
  'orangettes-chocolat-noir': { Corps: OrangettesChocolatNoir },
}
