import { articles, absoluteUrl, AUTEUR } from '@/lib/blog'
import { ALLERGENES, COMPOSITION, coffrets, formatEUR, recettes } from '@/lib/belles-comtoises'
import { CONTACT, GAMMES_PRO } from '@/lib/catalogue'
import { ESPACES } from '@/lib/espaces'
import {
  DELAI_ACHEMINEMENT_JOURS,
  DELAI_PREPARATION,
  FLAT_SHIPPING_COST,
  FREE_SHIPPING_THRESHOLD,
  TRANSPORTEUR,
} from '@/lib/shipping'

export const dynamic = 'force-static'
export const revalidate = 3600

/**
 * Présentation du site pour les assistants IA (convention llms.txt). Générée depuis le code, donc
 * toujours à jour : prix publics des Belles Comtoises, livraison, articles. Jamais de prix pros
 * (réservés aux comptes SIRET vérifiés).
 */
export function GET() {
  const lignes = [
    `# ${CONTACT.marque} — ${CONTACT.signature}`,
    '',
    `> Maison artisanale de chocolat à ${CONTACT.ville} (Doubs, Haut-Doubs), tenue par ${AUTEUR.nom}. ` +
      'Les Belles Comtoises, vaches montbéliardes en chocolat praliné noisette, pour les particuliers ; ' +
      'petits poissons, petits beurres, orangettes et grains de café enrobés de chocolat, emballés individuellement, ' +
      'pour les professionnels (restaurants, hôtels, cafés).',
    '',
    '## Les Belles Comtoises (vente en ligne aux particuliers)',
    `- Ce que c'est : petites vaches montbéliardes en chocolat pur beurre de cacao, fourrées au praliné noisette, fabriquées par ${AUTEUR.nom} dans leur atelier de ${CONTACT.ville} (Doubs). Une idée de cadeau gourmand et franc-comtois.`,
    `- Recettes : ${recettes.map((r) => `${r.nom.toLowerCase()} (${r.note.toLowerCase()})`).join(', ')}.`,
    ...coffrets.map(
      (c) => `- ${c.nom} : ${c.pieces} vaches, ${formatEUR(c.prixTTC)} TTC — [commander](${absoluteUrl('/belles-comtoises#coffrets')})`
    ),
    `- Livraison en France métropolitaine par ${TRANSPORTEUR} : ${formatEUR(FLAT_SHIPPING_COST)}, offerte dès ${formatEUR(FREE_SHIPPING_THRESHOLD)} d'achat. Colis préparés ${DELAI_PREPARATION}, puis ${DELAI_ACHEMINEMENT_JOURS} jours ouvrés d'acheminement.`,
    `- Pour offrir : le nom et l'adresse du destinataire se saisissent au paiement, le coffret peut être livré directement chez la personne à qui on l'offre. Paiement par carte bancaire.`,
    `- Composition : ${COMPOSITION} ${ALLERGENES}`,
    '',
    '## Pages principales',
    `- [Accueil](${absoluteUrl('/')}): la maison et ses deux espaces, particuliers et professionnels`,
    `- [${ESPACES.particuliers.titre}](${absoluteUrl(ESPACES.particuliers.href)}): les créations vendues aux particuliers`,
    `- [Les Belles Comtoises](${absoluteUrl('/belles-comtoises')}): coffrets de vaches en chocolat, quatre recettes (lait, noir, blanc, caramel)`,
    `- [${ESPACES.professionnels.titre}](${absoluteUrl(ESPACES.professionnels.href)}): les gammes vendues aux restaurants, hôtels et cafés`,
    ...GAMMES_PRO.map((g) => `- [${g.labelLong}](${absoluteUrl(g.href)}): gamme professionnelle, tarifs réservés aux comptes SIRET vérifiés`),
    `- [Notre histoire](${absoluteUrl('/histoire')}): la maison, Mélanie et Cédric Brun`,
    `- [Galerie](${absoluteUrl('/galerie')}): photos de l'atelier`,
    `- [Livraison](${absoluteUrl('/livraison')}): modalités de livraison`,
    '',
    '## Articles du blog',
    ...articles.map((a) => `- [${a.titre}](${absoluteUrl(`/blog/${a.slug}`)}): ${a.description}`),
    '',
    '## Contact',
    `- ${CONTACT.adresse}, ${CONTACT.codePostal} ${CONTACT.ville}`,
    `- Téléphone : ${CONTACT.telFixe}`,
    `- E-mail : ${CONTACT.email}`,
    '',
  ]
  return new Response(lignes.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
