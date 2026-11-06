import { articles, absoluteUrl, AUTEUR } from '@/lib/blog'
import { CONTACT, GAMMES_PRO } from '@/lib/catalogue'

export const dynamic = 'force-static'
export const revalidate = 3600

/**
 * Présentation du site pour les assistants IA (convention llms.txt). Générée depuis le code :
 * aucun prix (tarifs pros réservés aux comptes SIRET), jamais de texte écrit à la main à tenir à jour.
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
    '## Pages principales',
    `- [Les Belles Comtoises](${absoluteUrl('/')}): coffrets de vaches en chocolat, quatre recettes (lait, noir, blanc, caramel)`,
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
