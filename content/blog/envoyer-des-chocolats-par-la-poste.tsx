import Link from 'next/link'
import { Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'
import { DELAI_ACHEMINEMENT_JOURS, TRANSPORTEUR } from '@/lib/shipping'

export const faq: QuestionFaq[] = [
  {
    question: 'Peut-on envoyer des chocolats par la poste ?',
    reponse:
      'Oui, en France, à condition de les protéger des écarts de température, des chocs et des odeurs : chocolats dans leur boîte d’origine, calés dans un carton rigide, envoyés en début de semaine avec un suivi. Le plus sûr reste de commander chez un artisan qui expédie lui-même, directement à l’adresse de la personne à qui l’on offre.',
  },
  {
    question: 'Comment emballer des chocolats pour un colis ?',
    reponse:
      'Laissez-les dans leur boîte fermée, glissez-la dans un sachet propre et bien fermé contre les odeurs, puis placez-la dans un carton rigide un peu plus grand, sans vide autour : papier froissé ou calage sur tous les côtés, pour que rien ne bouge quand on secoue le colis.',
  },
  {
    question: 'Les chocolats risquent-ils de fondre dans un colis en hiver ?',
    reponse:
      'Le froid de décembre les abîme rarement ; ce sont les passages brusques du froid au chaud qui posent problème. Un colis glacé ouvert tout de suite dans une pièce chauffée se couvre de buée, et les chocolats peuvent blanchir. Laissez le carton fermé revenir à température ambiante avant de l’ouvrir.',
  },
  {
    question: 'Quel cadeau en chocolat faire livrer pour Noël ?',
    reponse:
      'Un coffret envoyé par l’artisan qui l’a fabriqué. Les Belles Comtoises, petites vaches montbéliardes en chocolat praliné noisette fabriquées par Mélanie et Cédric Brun à Charquemont (Doubs), se commandent en ligne et sont livrées directement chez la personne à qui on les offre, en France métropolitaine, en Colissimo avec suivi.',
  },
]

export default function EnvoyerDesChocolatsParLaPoste() {
  return (
    <>
      <p className="lead">
        On peut tout à fait envoyer des chocolats par la poste, à trois conditions : les protéger des écarts de
        température, les caler pour qu’ils ne bougent pas, et réduire le temps qu’ils passent en transit. Un colis
        préparé avec soin et posté en début de semaine arrive en bon état. Le plus simple, pour un cadeau, reste de
        les faire expédier directement par l’artisan qui les a fabriqués.
      </p>

      <h2>Qu’est-ce qui abîme des chocolats pendant le transport ?</h2>
      <p>
        Un colis passe par une boîte aux lettres ou un bureau de poste, un centre de tri, un ou plusieurs camions, parfois
        un entrepôt pendant un week-end, puis une tournée de livraison. À chaque étape, les chocolats subissent ce qu’ils
        supportent mal :
      </p>
      <ul>
        <li>
          <strong>Les écarts de température</strong> : un camion froid le matin, un entrepôt chauffé l’après-midi, un
          coffre de voiture au soleil. C’est le va-et-vient qui fait perdre aux chocolats leur brillant.
        </li>
        <li>
          <strong>La buée</strong> : un colis glacé ouvert aussitôt dans un salon chauffé se couvre d’humidité, qui
          laisse un voile blanc en séchant.
        </li>
        <li>
          <strong>Les chocs</strong> : un carton trop grand, où la boîte glisse, suffit à casser des oreilles, des décors
          ou des coins.
        </li>
        <li>
          <strong>Les odeurs</strong> : un colis voyage parfois à côté de produits parfumés, et le chocolat les absorbe.
        </li>
      </ul>
      <p>
        Pour la façon de les garder une fois arrivés, nos conseils pour{' '}
        <Link href="/blog/comment-conserver-le-chocolat">conserver le chocolat</Link> prennent le relais ; ici, il
        s’agit du trajet.
      </p>

      <h2>Quels chocolats voyagent bien par colis ?</h2>
      <p>
        Tous les chocolats ne se valent pas face au transport. Les pièces pleines et compactes, rangées chacune dans
        son alvéole, encaissent mieux les secousses que des décors fins ou des sujets creux de grande taille. Une boîte
        rigide, fermée, où chaque chocolat a sa place, protège mieux qu’un sachet souple.
      </p>
      <p>
        C’est le cas des <Link href="/belles-comtoises#coffrets">Belles Comtoises</Link> : de petites vaches
        montbéliardes couchées, en chocolat pur beurre de cacao fourré de praliné noisette, posées une par une dans les
        alvéoles de leur coffret. Pour un cadeau à envoyer loin, une forme ramassée et une boîte à compartiments sont
        deux bonnes raisons de les choisir.
      </p>

      <Figure
        src="/images/comtoises/coffret-20-detail.jpg"
        alt="Boîte de Belles Comtoises ouverte sur l’herbe : vaches en chocolat au lait, blanc, caramel et noir rangées chacune dans son alvéole, couvercle à taches brunes posé derrière"
        width={1200}
        height={1600}
        ajustement="contain"
        legende="Chaque vache dans son alvéole : rien ne s’entrechoque pendant le trajet."
      />

      <h2>Comment emballer des chocolats pour un envoi par la poste ?</h2>
      <p>Si vous envoyez vous-même des chocolats achetés ou reçus, procédez dans cet ordre :</p>
      <ol>
        <li>
          <strong>Gardez la boîte d’origine</strong>, fermée. Elle a été pensée pour ces chocolats, mieux que n’importe
          quel contenant improvisé.
        </li>
        <li>
          <strong>Enfermez-la dans un sachet propre</strong>, bien clos, pour la tenir à l’écart des odeurs et de
          l’humidité du trajet.
        </li>
        <li>
          <strong>Choisissez un carton rigide</strong>, à peine plus grand que la boîte. Une enveloppe matelassée ne
          protège pas d’un colis posé dessus.
        </li>
        <li>
          <strong>Calez sur les six faces</strong> avec du papier froissé ou du calage. Fermez, secouez : si quelque
          chose bouge, ajoutez-en.
        </li>
        <li>
          <strong>Ne glissez rien de chaud ou de parfumé</strong> dans le même colis : bougie, savon, épices, café
          moulu.
        </li>
        <li>
          <strong>Écrivez l’adresse complète</strong>, avec le nom qui figure sur la boîte aux lettres et un numéro de
          téléphone si le service le permet, pour éviter un retour au dépôt.
        </li>
      </ol>

      <h2>Quand poster un colis de chocolats ?</h2>
      <p>
        Le temps passé en transit compte autant que l’emballage. Quelques réflexes réduisent les étapes où le colis
        attend :
      </p>
      <ul>
        <li>
          <strong>Postez en début de semaine</strong>. Un colis envoyé le vendredi risque de passer le week-end dans un
          entrepôt ou un camion à l’arrêt.
        </li>
        <li>
          <strong>Choisissez un envoi suivi</strong> : vous saurez s’il est bloqué quelque part et pourrez prévenir le
          destinataire du jour de livraison.
        </li>
        <li>
          <strong>Évitez les jours de forte chaleur</strong>. En été, un colis de chocolats peut attendre une semaine
          plus fraîche ; en décembre, le risque est plutôt le froid suivi d’une pièce chauffée.
        </li>
        <li>
          <strong>Avant Noël, prenez de l’avance</strong> : les transporteurs sont très chargés les derniers jours, et
          un colis arrivé tôt attend plus sereinement dans un placard frais que dans un centre de tri.
        </li>
      </ul>
      <Encadre titre="Envoyer à l’étranger ou outre-mer">
        <p>
          Chaque pays fixe ses propres règles pour les denrées alimentaires qui entrent sur son territoire, et le
          climat de certaines destinations complique le voyage. Avant d’envoyer des chocolats hors de France
          métropolitaine, renseignez-vous auprès de votre transporteur sur ce qui est accepté vers le pays de destination.
        </p>
      </Encadre>

      <h2>Que faire à la réception d’un colis de chocolats ?</h2>
      <p>Le trajet ne s’arrête pas au paillasson. Prévenez le destinataire de ces quelques gestes :</p>
      <ul>
        <li>
          <strong>Récupérer le colis vite</strong> : pas d’après-midi dans une boîte aux lettres au soleil, ni de nuit
          dans une voiture.
        </li>
        <li>
          <strong>Le laisser revenir à température, fermé</strong>, s’il arrive glacé : on l’ouvre une fois le carton à
          température de la pièce, pour que la buée ne se dépose pas sur les chocolats.
        </li>
        <li>
          <strong>Ne pas le ranger sous le sapin près d’un radiateur</strong> ou d’une cheminée en attendant le
          réveillon : un coin frais de la maison convient mieux.
        </li>
      </ul>
      <p>
        Un léger voile blanc à l’ouverture n’empêche pas de les déguster : il vient d’un écart de température ou
        d’humidité pendant le trajet et touche surtout l’aspect.
      </p>

      <h2>Faire expédier ses chocolats par l’artisan : le plus simple pour un cadeau</h2>
      <p>
        Pour offrir, la solution la plus sûre est souvent de ne pas faire le colis soi-même : commander chez un artisan
        qui expédie, et saisir l’adresse de la personne à qui l’on offre. Les chocolats partent alors directement de
        l’atelier, dans un carton préparé pour eux, sans passer par votre cuisine ni par un second envoi.
      </p>
      <p>
        Les Belles Comtoises, petites vaches montbéliardes en chocolat praliné noisette fabriquées par Mélanie et Cédric
        Brun à Charquemont (Doubs), sont un cadeau qui s’envoie : elles sont moulées, enrobées et emballées dans notre
        atelier de Charquemont, puis expédiées en {TRANSPORTEUR} avec suivi, en France métropolitaine. Les colis sont
        préparés du mercredi au vendredi et acheminés en {DELAI_ACHEMINEMENT_JOURS} jours ouvrés.
      </p>
      <ul>
        <li>
          <strong>Quel coffret envoyer ?</strong> La réglette de 6, notre petit format, pour un petit colis à une
          personne seule ; la boîte de 12, notre format découverte, pour faire goûter les quatre recettes ; la boîte de
          20, notre grand format, ou de 30, notre très grand format, pour une famille qui fêtera Noël à plusieurs.
        </li>
        <li>
          <strong>Quatre recettes sous la même forme</strong> : lait « fondant et lacté », noir « intense et
          cacaoté », blanc « doux et vanillé », caramel « biscuité et caramélisé ». Notre article sur{' '}
          <Link href="/blog/difference-chocolat-noir-lait-blanc">la différence entre chocolat noir, au lait et blanc</Link>{' '}
          aide à deviner celle que préférera le destinataire.
        </li>
        <li>
          <strong>Livré chez la personne à qui vous offrez</strong> : son nom et son adresse se saisissent au
          paiement. Si vous ne la verrez pas pendant les fêtes, notre article sur{' '}
          <Link href="/blog/cadeau-noel-grands-parents-a-distance">le cadeau à des grands-parents éloignés</Link>{' '}
          donne des idées pour l’ouvrir ensemble à distance.
        </li>
      </ul>

      <Encadre titre="À retenir" sombre>
        <ul>
          <li>Boîte d’origine, sachet fermé, carton rigide calé sur six faces.</li>
          <li>Envoi suivi, posté en début de semaine, tôt avant Noël.</li>
          <li>À l’arrivée : carton fermé jusqu’à ce qu’il soit à température de la pièce.</li>
          <li>
            Pour un cadeau, faites expédier par l’artisan : les{' '}
            <Link href="/belles-comtoises#coffrets">coffrets de Belles Comtoises</Link> partent de Charquemont vers
            l’adresse de votre choix.
          </li>
        </ul>
      </Encadre>
    </>
  )
}
