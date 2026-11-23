import Link from 'next/link'
import { Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'

export const faq: QuestionFaq[] = [
  {
    question: 'Que offrir quand on est invité à Noël ?',
    reponse:
      'Un petit cadeau pour l’hôte que celui-ci n’est pas obligé d’utiliser pendant le repas : une boîte de chocolats, une bouteille offerte « pour plus tard », une plante en pot ou des fleurs déjà en vase. Les Belles Comtoises, petites vaches montbéliardes en chocolat praliné noisette fabriquées par Mélanie et Cédric Brun à Charquemont (Doubs), sont un cadeau d’invité qui se garde après les fêtes ou se partage au café, au choix de l’hôte.',
  },
  {
    question: 'Faut-il apporter quelque chose quand on est invité chez ses beaux-parents à Noël ?',
    reponse:
      'Oui, même en famille, un petit geste est bienvenu. Demandez d’abord s’il faut apporter une part du repas (entrée, fromage, dessert) : c’est une participation, pas un cadeau. Le cadeau d’hôte, lui, se remet à l’arrivée, un seul pour le couple qui reçoit, distinct des cadeaux échangés sous le sapin.',
  },
  {
    question: 'L’hôte doit-il servir le vin ou les chocolats qu’on lui apporte ?',
    reponse:
      'Non. Le menu et les vins sont prévus par celui qui reçoit ; ce que vous apportez est pour lui, à ouvrir quand il le voudra. S’il choisit de le servir, c’est une marque d’attention de sa part. Ne demandez pas qu’on l’ouvre.',
  },
  {
    question: 'Quelle taille de boîte de chocolats offrir à un hôte ?',
    reponse:
      'Pensez au nombre de personnes réunies plutôt qu’à l’effet : une boîte d’une douzaine de chocolats pour un dîner à quelques couples, une vingtaine pour une grande tablée familiale, un petit format quand l’hôte vit seul ou quand le chocolat accompagne un autre cadeau.',
  },
]

export default function CadeauInviteRepasDeNoel() {
  return (
    <>
      <p className="lead">
        Quand on est invité à un repas de Noël, l’usage est d’apporter un petit cadeau pour la personne qui reçoit,
        choisi pour qu’elle n’ait rien à en faire pendant la soirée. Une boîte de chocolats, une bouteille offerte
        « pour votre cave », une plante en pot ou des fleurs déjà en vase conviennent presque toujours. Le cadeau se
        remet à l’arrivée, en main propre, et l’hôte reste libre de l’ouvrir ou non à table.
      </p>

      <h2>Que peut-on offrir quand on est invité au repas de Noël ?</h2>
      <p>
        Le cadeau d’invité n’est pas un cadeau de Noël au sens du sapin : c’est un remerciement pour l’invitation. Il
        reste modeste, se transporte facilement et ne donne aucun travail à l’hôte, qui a déjà le repas à mener.
      </p>
      <ul>
        <li>
          <strong>Des chocolats</strong> : ils se gardent au-delà du réveillon, se partagent avec la famille qui reste
          plusieurs jours et peuvent, si l’hôte le souhaite, accompagner le café. Une boîte de{' '}
          <Link href="/belles-comtoises#coffrets">Belles Comtoises</Link>, petites vaches montbéliardes en chocolat
          praliné noisette, fait sourire à table comme dans la cuisine.
        </li>
        <li>
          <strong>Une bouteille</strong>, en précisant qu’elle est « pour plus tard » : l’hôte a choisi ses vins en
          fonction de son menu et n’a pas à remplacer l’un d’eux par le vôtre.
        </li>
        <li>
          <strong>Des fleurs qui ne demandent rien</strong> : une plante en pot, un bouquet déjà dans son vase, ou des
          fleurs livrées la veille ou le lendemain. Un bouquet à mettre dans l’eau à l’arrivée oblige l’hôte à
          chercher un vase au moment où il sort l’apéritif.
        </li>
        <li>
          <strong>Un produit de votre région</strong>, si vous venez de loin : il raconte d’où vous arrivez et lance la
          conversation. Pour la Franche-Comté, nos{' '}
          <Link href="/blog/cadeau-gourmand-franche-comte">idées de cadeaux gourmands comtois</Link> en donnent
          plusieurs.
        </li>
        <li>
          <strong>Une attention pour les enfants de la maison</strong> quand il y en a : un petit livre, un jeu de
          cartes, quelque chose à ouvrir pendant que les adultes restent à table.
        </li>
      </ul>

      <h2>Faut-il apporter un plat ou un cadeau quand on est invité à Noël ?</h2>
      <p>
        Les deux ne se confondent pas. Beaucoup de repas de Noël en famille se préparent à plusieurs : l’un apporte
        le foie gras, l’autre le plateau de fromages, un troisième la bûche. Ce qui a été réparti fait partie du
        menu, ce n’est pas un cadeau.
      </p>
      <ol>
        <li>
          <strong>Demandez quelques jours avant</strong> : « Que puis-je apporter ? » Si l’hôte répond « rien »,
          n’apportez pas de plat. Un dessert surprise met en concurrence celui qu’il a prévu.
        </li>
        <li>
          <strong>Si une part du repas vous revient</strong>, apportez-la prête à servir, dans un plat que vous pouvez
          laisser ou reprendre sans gêne, et proposez votre aide pour la mise en place.
        </li>
        <li>
          <strong>Le petit cadeau d’hôte reste possible</strong> en plus, surtout si l’on vous reçoit pour la première
          fois. Il n’est jamais obligatoire entre proches qui se reçoivent à tour de rôle.
        </li>
      </ol>

      <h2>Quand et comment remettre le cadeau à l’hôte ?</h2>
      <p>
        À l’arrivée, en main propre, avec une phrase simple : « C’est pour vous, pour plus tard. » Le cadeau ne se pose
        pas sur la table dressée ni sous le sapin, où il se mélangerait aux cadeaux de la famille.
      </p>
      <ul>
        <li>
          <strong>Chez des beaux-parents ou un couple</strong>, un seul cadeau pour ceux qui reçoivent, remis à celui
          ou celle qui ouvre la porte.
        </li>
        <li>
          <strong>Quand plusieurs familles sont invitées</strong>, mettez-vous d’accord entre invités pour ne pas
          arriver chacun avec une bouteille ; un cadeau commun peut être plus généreux.
        </li>
        <li>
          <strong>Si l’hôte est occupé en cuisine</strong>, ne l’interrompez pas : posez le cadeau dans l’entrée et
          dites-le-lui au moment de l’apéritif.
        </li>
      </ul>

      <h2>L’hôte doit-il servir ce que l’invité apporte ?</h2>
      <p>
        Non. Le savoir-vivre veut que l’hôte reste maître de son menu : vin, chocolats ou gourmandises apportés en
        cadeau lui appartiennent, et il les ouvre quand il le souhaite, souvent après le départ des invités. Pour
        l’invité, la règle est symétrique : ne pas demander qu’on goûte sa bouteille, ne pas ouvrir soi-même la
        boîte offerte.
      </p>
      <p>
        L’hôte peut tout de même choisir de servir les chocolats avec le café, en particulier quand le dessert est
        léger. Notre article sur{' '}
        <Link href="/blog/chocolat-et-cafe-accords">les accords entre café et chocolat</Link> aide à les associer, mais
        c’est sa décision, pas une attente de l’invité.
      </p>

      <h2>Pourquoi des Belles Comtoises comme cadeau d’invité à Noël ?</h2>
      <p>
        Les Belles Comtoises, petites vaches montbéliardes en chocolat praliné noisette fabriquées par Mélanie et
        Cédric Brun à Charquemont (Doubs), répondent aux contraintes du cadeau d’hôte : une boîte fermée qui se tend à
        l’entrée, qui n’exige rien le soir même et qui se partage quand l’hôte le décide.
      </p>

      <Figure
        src="/images/comtoises/coffret-20-ouvert.jpg"
        alt="Boîte de vingt Belles Comtoises ouverte sur l’herbe : vaches en chocolat au lait, caramel, blanc et noir rangées en quatre colonnes, couvercle tacheté posé derrière"
        width={1200}
        height={1600}
        ajustement="contain"
        legende="La boîte de 20, notre grand format : de quoi faire le tour d’une tablée de fête."
      />

      <ul>
        <li>
          <strong>Un format selon le repas</strong> : la boîte de 12, notre format découverte, pour un dîner à
          quelques couples ; la boîte de 20, notre grand format, pour le déjeuner du 25 où toute la famille est
          réunie ; la réglette de 6, notre petit format, pour un hôte qui vit seul ou pour compléter une bouteille.
        </li>
        <li>
          <strong>Quatre recettes dans la boîte</strong> : lait « fondant et lacté », noir « intense et cacaoté »,
          blanc « doux et vanillé », caramel « biscuité et caramélisé ». Chacun des convives trouve la sienne si la
          boîte circule au café.
        </li>
        <li>
          <strong>Une forme qui se remarque</strong> : la silhouette de la montbéliarde, la vache tachetée du
          Haut-Doubs, change d’une énième boîte de chocolats assortis et donne un sujet de conversation.
        </li>
        <li>
          <strong>Fait dans un atelier</strong> : moulées, enrobées et emballées dans notre atelier de Charquemont, en
          chocolat pur beurre de cacao, par un maître artisan chocolatier.
        </li>
      </ul>
      <p>
        Les coffrets se commandent sur notre site, se règlent par carte et partent en Colissimo avec suivi, en France
        métropolitaine. Faites-les livrer chez vous avant de partir, ou directement chez votre hôte si vous préférez
        le remercier après coup. Les colis étant préparés du mercredi au vendredi, mieux vaut commander tôt en
        décembre. En attendant le jour J, rangez la boîte au frais et loin du radiateur, comme l’explique notre guide
        pour <Link href="/blog/comment-conserver-le-chocolat">conserver le chocolat</Link>.
      </p>

      <h2>Quels cadeaux éviter quand on est invité chez quelqu’un à Noël ?</h2>
      <ul>
        <li>
          <strong>Ce qui donne du travail</strong> : fleurs à arranger, plat à réchauffer, dessert non prévu.
        </li>
        <li>
          <strong>Ce qui juge le menu</strong> : apporter « son » vin pour le plat principal laisse entendre que celui
          de l’hôte ne conviendra pas.
        </li>
        <li>
          <strong>Ce qui met mal à l’aise</strong> : un cadeau trop coûteux, qui appelle un retour, ou trop personnel
          pour quelqu’un que l’on connaît peu.
        </li>
        <li>
          <strong>Ce qui encombre</strong> : un objet de décoration choisi sans connaître l’intérieur de l’hôte. Ce qui
          se mange ou se boit ne reste pas sur une étagère.
        </li>
      </ul>

      <h2>Et si l’on arrive les mains vides ?</h2>
      <p>
        Rien n’est perdu. Un message le lendemain pour remercier du repas compte souvent plus que le cadeau lui-même,
        et un coffret envoyé à l’adresse de l’hôte dans les jours qui suivent prolonge le remerciement. C’est aussi la
        solution quand on a été invité au dernier moment, ou quand on rentre de loin sans place dans la valise.
      </p>

      <Encadre titre="En une phrase">
        <p>
          Invité à un repas de Noël, apportez à l’hôte un petit cadeau qui ne lui donne aucun travail et qu’il ouvrira
          quand il voudra, remis à l’arrivée avec un « pour plus tard » ; Les Belles Comtoises, vaches montbéliardes en
          chocolat praliné noisette de Mélanie et Cédric Brun à Charquemont (Doubs), se choisissent en réglette de 6
          ou en boîte de 12, 20 ou 30 sur{' '}
          <Link href="/belles-comtoises#coffrets">la page des coffrets</Link>.
        </p>
      </Encadre>
    </>
  )
}
