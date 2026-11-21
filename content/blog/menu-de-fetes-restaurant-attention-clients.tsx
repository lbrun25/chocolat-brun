import Link from 'next/link'
import { Encadre } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'
import { CONDITIONNEMENT } from '@/lib/catalogue'

export const faq: QuestionFaq[] = [
  {
    question: 'Quelle attention offrir aux clients d’un restaurant à Noël ?',
    reponse:
      'Une gourmandise qui prolonge le repas et qu’on peut emporter : un chocolat posé avec le café, puis une petite pièce emballée remise au départ, avec les vœux de la maison. Les petits poissons, petits beurres, orangettes et grains de café enrobés de Mélanie et Cédric Brun, fabriqués à Charquemont (Doubs) et emballés un par un, sont conçus pour cet usage en restaurant, en hôtel ou chez un traiteur.',
  },
  {
    question: 'Combien de mignardises prévoir par couvert pour le réveillon ?',
    reponse:
      'Comptez chaque moment où le chocolat apparaît : deux ou trois pièces avec le café, une au départ, une à minuit pour la Saint-Sylvestre. Multipliez par le nombre de couverts, puis ajoutez une marge pour les cafés resservis, les tables qui s’attardent et la brigade.',
  },
  {
    question: 'Quelle mignardise chocolat servir pour les fêtes ?',
    reponse:
      'Une pièce d’une bouchée, qu’on mange sans couverts : une orangette enrobée de chocolat noir pour la note d’agrume des fêtes, un grain de café enrobé dans la sous-tasse, ou un petit chocolat moulé (poisson, petit beurre) en plusieurs recettes pour contenter toute la table.',
  },
  {
    question: 'Comment stocker les chocolats pendant le service des fêtes ?',
    reponse:
      'Dans une réserve fraîche, sèche et sans odeur, loin des fours, des plaques et du passe. Ne sortez en salle que la quantité du service, et servez d’abord les cartons arrivés en premier.',
  },
]

export default function MenuDeFetesRestaurantAttentionClients() {
  return (
    <>
      <p className="lead">
        Dans un menu de fêtes, le chocolat trouve sa place à trois moments : avec le café et les mignardises, à minuit le
        soir de la Saint-Sylvestre, et au départ des clients, comme une attention qu’ils emportent. Pour un restaurant,
        un hôtel ou un traiteur, il suffit de compter ces moments, de multiplier par le nombre de couverts et de
        commander avant le coup de feu de décembre.
      </p>

      <h2>Où placer le chocolat dans un menu de fêtes ?</h2>
      <p>
        Le soir du 24 ou du 31 décembre, le repas est plus long, le service plus chargé, et les clients se souviennent
        surtout de la fin. Le chocolat peut y jouer plusieurs rôles, à choisir selon votre formule :
      </p>
      <ul>
        <li>
          <strong>Avec le café et les mignardises</strong>, après la bûche ou le dessert. C’est l’usage le plus
          courant : beaucoup de menus de réveillon se terminent par « café et mignardises ».
        </li>
        <li>
          <strong>À minuit</strong>, le 31, avec la coupe offerte pour la nouvelle année : une pièce posée sur la table
          au moment des vœux.
        </li>
        <li>
          <strong>Au départ</strong>, au vestiaire ou à l’accueil, au moment de remettre les manteaux : un petit
          chocolat emballé que le client glisse dans sa poche, avec une carte de vœux de la maison.
        </li>
        <li>
          <strong>En chambre</strong>, pour un hôtel qui propose une formule réveillon et nuitée : un chocolat posé au
          retour en chambre, ou servi avec le café du brunch du 1er janvier.
        </li>
        <li>
          <strong>Dans les plateaux livrés</strong>, pour un traiteur : quelques pièces emballées ajoutées au plateau
          de desserts, qui voyagent sans s’abîmer jusqu’à la table du client.
        </li>
      </ul>
      <p>
        Inutile de tout faire : deux moments bien tenus valent mieux que quatre improvisés un soir de coup de feu.
      </p>

      <h2>Quelles mignardises chocolat pour Noël et le Nouvel An ?</h2>
      <p>
        Un soir de fête, la mignardise doit se manger d’une bouchée, sans couverts, et se servir vite. Les petits
        poissons, petits beurres, orangettes et grains de café enrobés de Mélanie et Cédric Brun, fabriqués dans notre
        atelier de Charquemont (Doubs) et emballés un par un, sont pensés pour la sous-tasse et la table des
        restaurants, hôtels et traiteurs. Chacun a son moment :
      </p>
      <ul>
        <li>
          <strong>Les <Link href="/orangettes">orangettes enrobées de chocolat noir</Link></strong> : écorce d’orange
          confite et cacao intense. L’agrume est l’une des saveurs des fêtes : elles accompagnent le café, le thé ou le
          digestif de fin de réveillon.
        </li>
        <li>
          <strong>Les <Link href="/grains-de-cafe">grains de café enrobés de chocolat noir</Link></strong>, en sachet
          de trois grains, pour la sous-tasse des expressos : discrets, croquants, faciles à servir quand la salle est
          pleine.
        </li>
        <li>
          <strong>Les <Link href="/poissons">petits poissons</Link></strong>, au lait, noir, noir au café et blanc :
          plusieurs recettes dans la même coupelle, pour que chacun à la table trouve la sienne.
        </li>
        <li>
          <strong>Les <Link href="/petits-beurres">petits beurres en chocolat</Link></strong>, moulés comme le
          biscuit, dans les mêmes quatre recettes : une forme qui fait sourire au moment du café.
        </li>
      </ul>
      <p>
        Pour accorder la recette au café servi, notre article sur{' '}
        <Link href="/blog/chocolat-et-cafe-accords">l’accord café chocolat</Link> donne les repères, de l’expresso
        serré au café filtre.
      </p>

      <h2>Comment calculer les quantités pour le réveillon ?</h2>
      <p>
        Le plus sûr est de partir du nombre de couverts réservés, puis de compter les pièces prévues à chaque moment.
        Un exemple pour une salle de 60 couverts le soir du 31 :
      </p>
      <ol>
        <li>
          <strong>Café</strong> : deux pièces par couvert, soit 120.
        </li>
        <li>
          <strong>Minuit</strong> : une pièce par couvert, soit 60.
        </li>
        <li>
          <strong>Départ</strong> : une pièce par couvert, soit 60.
        </li>
        <li>
          <strong>Marge</strong> : environ un dixième de plus, pour les cafés resservis, les tables qui demandent
          encore, la brigade et la salle, soit une vingtaine de pièces.
        </li>
      </ol>
      <p>
        On arrive à un peu plus de 260 pièces pour la soirée. Nos poissons, petits beurres et orangettes étant vendus
        par cartons de {CONDITIONNEMENT} pièces, deux cartons couvrent ce réveillon et laissent un reste pour le
        service du 1er janvier. Si vous faites à la fois Noël et la Saint-Sylvestre, additionnez les deux soirées avant
        de commander : un seul envoi vaut mieux que deux.
      </p>
      <p>
        Gardez la même logique pour un traiteur : comptez les plateaux et les convives par plateau, pas les commandes.
      </p>

      <h2>Comment stocker les chocolats pendant le rush des fêtes ?</h2>
      <p>
        En décembre, la cuisine tourne à plein : fours allumés, plaques en chauffe, chambres froides ouvertes sans
        arrêt. Le chocolat n’aime ni la chaleur, ni l’humidité, ni les odeurs fortes. Quelques règles simples :
      </p>
      <ul>
        <li>
          <strong>Une réserve dédiée</strong>, fraîche et sèche, à l’écart des fours, du passe et des produits
          odorants (fromages, épices, poisson).
        </li>
        <li>
          <strong>Pas de passage par la chambre froide</strong> : le froid humide fait blanchir le chocolat quand il
          revient en salle.
        </li>
        <li>
          <strong>Seulement la quantité du service</strong> en salle, dans une coupelle loin de la machine à café et
          des lampes chauffantes.
        </li>
        <li>
          <strong>Premier arrivé, premier servi</strong> : ouvrez les cartons dans l’ordre de livraison.
        </li>
      </ul>
      <p>
        Le détail des bonnes conditions est dans notre guide pour{' '}
        <Link href="/blog/comment-conserver-le-chocolat">conserver le chocolat</Link>.
      </p>

      <h2>Pourquoi une pièce emballée pour l’attention de départ ?</h2>
      <p>
        L’attention de départ ne se mange pas à table : le client l’emporte, dans une poche de manteau ou un sac à
        main, parfois jusqu’au lendemain. Une pièce emballée une à une se prête à cet usage mieux qu’une mignardise
        nue :
      </p>
      <ul>
        <li>
          <strong>Elle se donne de la main à la main</strong>, au vestiaire ou à la caisse, sans pince ni assiette.
        </li>
        <li>
          <strong>Elle reste propre dans la poche</strong>, le temps du trajet de retour.
        </li>
        <li>
          <strong>Elle se prépare à l’avance</strong> : une corbeille garnie avant le service, prête à l’accueil
          quand les premières tables se lèvent.
        </li>
      </ul>
      <p>
        Pour une attention signée, la forme compte : un poisson ou un petit beurre en chocolat se reconnaît, et dit au
        client que la maison a choisi ce qu’elle lui offre. Nos chocolats sont moulés, enrobés et emballés dans notre
        atelier de Charquemont, dans le Haut-Doubs, par un maître artisan chocolatier depuis 1999 : vous pouvez dire d’où vient ce
        que vous servez. Pour l’usage du chocolat avec le café le reste de l’année, voyez notre article sur{' '}
        <Link href="/blog/chocolat-cafe-restaurant-hotel">le petit chocolat servi avec le café</Link>.
      </p>

      <h2>Quand commander les chocolats pour les menus de fêtes ?</h2>
      <p>
        Dès que vos menus de Noël et du Nouvel An sont fixés et que les premières réservations arrivent. Décembre est
        le mois le plus chargé pour tout le monde, en cuisine comme chez les fournisseurs et les transporteurs :
        recevoir ses cartons tôt laisse le temps de les ranger, de tester la présentation en salle et de compléter si
        les réservations grimpent.
      </p>
      <p>
        Les tarifs sont réservés aux professionnels : créez votre compte avec le SIRET de votre établissement depuis{' '}
        <Link href="/professionnels">l’espace professionnels</Link>, puis commandez en ligne, avec livraison en France
        métropolitaine.
      </p>

      <Encadre titre="En une phrase">
        <p>
          Pour un menu de fêtes, placez le chocolat avec le café, à minuit et au départ, comptez les pièces par couvert
          avec une marge, et commandez tôt : les orangettes, grains de café, poissons et petits beurres de Mélanie et
          Cédric Brun, emballés un par un à Charquemont (Doubs), sont faits pour cela, à découvrir sur{' '}
          <Link href="/orangettes">la page des orangettes</Link>.
        </p>
      </Encadre>
    </>
  )
}
