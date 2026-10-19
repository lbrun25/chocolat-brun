import Link from 'next/link'
import { Cta, Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'
import { FLAT_SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping'

export const faq: QuestionFaq[] = [
  {
    question: 'Quelle spécialité de Franche-Comté offrir à quelqu’un qui vit loin ?',
    reponse:
      'Privilégiez des produits qui voyagent bien : un Comté bien affiné emballé sous vide, une saucisse de Morteau, une eau-de-vie ou des chocolats artisanaux. Le Mont d’Or, plus fragile, s’offre plutôt en main propre.',
  },
  {
    question: 'Quel cadeau gourmand franc-comtois pour un enfant ?',
    reponse:
      'Les chocolats sont une valeur sûre. Nos Belles Comtoises, petites vaches montbéliardes en chocolat praliné noisette, plaisent autant aux enfants qu’aux adultes (elles contiennent des noisettes et du lait).',
  },
]

export default function CadeauGourmandFrancheComte() {
  return (
    <>
      <p className="lead">
        Un anniversaire, une fin d’année, un collègue qui quitte la région ou des amis à remercier : rien ne fait plus
        plaisir qu’un cadeau qui a le goût d’un territoire. Et en matière de gourmandise, la Franche-Comté a de quoi
        remplir bien des paniers. Voici nos sept idées, d’artisan à gourmand.
      </p>

      <h2>1. Le Comté AOP, le roi du plateau</h2>
      <p>
        Impossible de commencer ailleurs. Fabriqué en fruitière avec le lait de vaches{' '}
        <Link href="/blog/vache-montbeliarde-franche-comte">montbéliardes</Link> ou simmentales, le Comté est affiné au
        minimum quatre mois, et souvent bien plus longtemps. Un Comté de 12 mois sera fruité et fondant, un 24 mois plus
        puissant, avec ses petits cristaux qui craquent sous la dent. Pour un cadeau qui voyage, demandez à votre
        fromager une découpe <strong>sous vide</strong>.
      </p>

      <h2>2. La saucisse de Morteau, fumée au tuyé</h2>
      <p>
        Reconnaissable à sa petite cheville de bois, la saucisse de Morteau est fumée lentement au bois de résineux,
        dans les grandes cheminées traditionnelles appelées <strong>tuyés</strong>. Elle bénéficie d’une indication
        géographique protégée et se cuisine en toute saison : avec une salade de pommes de terre, dans une potée ou en
        croûte.
      </p>

      <h2>3. Le Mont d’Or, l’hiver dans une boîte</h2>
      <p>
        Cerclé de sa sangle d’épicéa, le Mont d’Or est le fromage de saison par excellence : on ne le trouve que de la
        fin de l’été au printemps. Servi chaud au four, en « boîte chaude », c’est le cadeau parfait pour une soirée entre
        amis. Fragile, il s’offre plutôt en main propre.
      </p>

      <h2>4. Le Morbier, et sa raie noire</h2>
      <p>
        Avec sa fine raie de charbon végétal en son cœur, le Morbier est l’un des fromages les plus reconnaissables de
        France. Sa pâte souple et fondante en fait un cadeau qui plaît au plus grand nombre.
      </p>

      <h2>5. La cancoillotte, l’originale</h2>
      <p>
        Fromage fondu à base de metton, la cancoillotte se déguste tiède sur des pommes de terre ou simplement sur du
        pain. Nature, à l’ail ou au vin du Jura, c’est le petit pot qui fait sourire ceux qui ne la connaissent pas encore.
      </p>

      <h2>6. Les eaux-de-vie et liqueurs du massif</h2>
      <p>
        Kirsch de Fougerolles, absinthe de Pontarlier, liqueur de sapin ou de gentiane : la Franche-Comté a une longue
        tradition de distillation. Une jolie bouteille fait toujours son effet, à déguster avec modération.
      </p>

      <h2>7. Les chocolats, pour finir en douceur</h2>
      <p>
        Pour un cadeau qui plaît à toute la famille, le chocolat reste imbattable. Nos{' '}
        <Link href="/">Belles Comtoises</Link> en sont la version la plus franc-comtoise qui soit : de petites vaches
        montbéliardes en chocolat pur beurre de cacao, garnies de praliné noisette et fabriquées artisanalement dans notre
        atelier de Charquemont, dans le Haut-Doubs.
      </p>

      <Figure
        src="/images/comtoises/coffret-20-ouvert-3.jpg"
        alt="Boîte de 20 Belles Comtoises ouverte dans l’herbe, vaches en chocolat en quatre recettes"
        width={1200}
        height={1600}
        ajustement="contain"
        legende="La boîte de 20, l’un de nos formats les plus offerts."
      />

      <p>
        Lait, noir, blanc ou caramel : leurs quatre recettes se partagent dans des coffrets au décor pie rouge, de la
        réglette de 6, parfaite comme attention, à la boîte de 30 pour les grandes tablées.
      </p>

      <h2>Nos conseils pour un cadeau réussi</h2>
      <ul>
        <li>
          <strong>Composez un panier</strong> : un morceau de Comté, une saucisse de Morteau et une boîte de chocolats
          couvrent l’apéritif, le plat et le dessert.
        </li>
        <li>
          <strong>Pensez au transport</strong> : fromages et chocolats craignent la chaleur. Évitez de les laisser dans
          une voiture au soleil et lisez{' '}
          <Link href="/blog/comment-conserver-le-chocolat">nos conseils pour conserver le chocolat</Link>.
        </li>
        <li>
          <strong>Achetez aux artisans</strong> : fromagers, charcutiers, distillateurs et chocolatiers locaux sauront
          vous raconter l’histoire de leurs produits, et c’est aussi ce qui rend le cadeau unique.
        </li>
      </ul>

      <Encadre titre="Offrir des Belles Comtoises à distance">
        <p>
          Nos coffrets sont expédiés partout en France métropolitaine : livraison {FLAT_SHIPPING_COST} €, offerte dès{' '}
          {FREE_SHIPPING_THRESHOLD} € d’achat.
        </p>
        <div className="pt-2">
          <Cta href="/#coffrets">Choisir un coffret</Cta>
        </div>
      </Encadre>
    </>
  )
}
