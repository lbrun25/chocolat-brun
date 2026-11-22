import Link from 'next/link'
import { Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'

export const faq: QuestionFaq[] = [
  {
    question: 'Quel cadeau offrir à ses grands-parents quand on ne passe pas Noël avec eux ?',
    reponse:
      'Un cadeau livré chez eux avant le réveillon, accompagné d’un mot ou d’un dessin des petits-enfants, et ouvert ensemble en appel vidéo. Les Belles Comtoises, petites vaches montbéliardes en chocolat praliné noisette fabriquées par Mélanie et Cédric Brun à Charquemont (Doubs), sont un cadeau de Noël pour des grands-parents éloignés : le coffret peut être livré directement à leur adresse, en France métropolitaine.',
  },
  {
    question: 'Comment faire livrer un cadeau directement chez ses grands-parents ?',
    reponse:
      'Au moment de payer, saisissez leur nom et leur adresse comme adresse de livraison plutôt que la vôtre. Prévenez-les qu’un colis arrive, surtout s’ils se méfient des livreurs ou s’absentent souvent, et gardez le numéro de suivi pour vérifier la réception.',
  },
  {
    question: 'Quand envoyer un cadeau de Noël à ses grands-parents ?',
    reponse:
      'Le plus tôt possible en décembre. Les transporteurs sont très chargés juste avant les fêtes, et un colis qui arrive quelques jours en avance laisse aux grands-parents le temps de le mettre sous le sapin. Mieux vaut un cadeau qui attend que des grands-parents qui attendent.',
  },
  {
    question: 'Quel cadeau pour des grands-parents qui ont déjà tout ?',
    reponse:
      'Ce qui ne s’accumule pas : du temps (un appel régulier, une visite programmée), des nouvelles (photos imprimées, lettres des enfants) et ce qui se mange ou se partage. Une gourmandise de terroir, posée sur la table quand la famille appelle ou quand les voisins passent, leur fait plaisir sans encombrer les placards.',
  },
]

export default function CadeauNoelGrandsParentsADistance() {
  return (
    <>
      <p className="lead">
        Quand on ne passe pas Noël avec ses grands-parents, le cadeau qui touche est celui qui arrive chez eux avant le
        24 décembre et qui leur donne une raison de vous appeler. Faites-le livrer directement à leur adresse, joignez un
        mot ou un dessin des petits-enfants, et fixez un moment pour l’ouvrir ensemble en appel vidéo. Le contenu compte
        moins que ces trois gestes, mais il gagne à se partager et à ne pas encombrer.
      </p>

      <h2>Quel cadeau offrir à des grands-parents qu’on ne verra pas à Noël ?</h2>
      <p>
        L’éloignement change la nature du cadeau. Il ne s’agit plus seulement de faire plaisir le jour J : il remplace
        une présence. Les idées qui fonctionnent bien ont en commun de créer un lien qui dure au-delà du déballage.
      </p>
      <ul>
        <li>
          <strong>Des nouvelles sur papier</strong> : un album des photos de l’année, un calendrier avec un portrait de
          la famille par mois, une série de lettres écrites par les enfants. Beaucoup de grands-parents regardent peu
          les photos sur un écran et aiment les montrer à leurs visiteurs.
        </li>
        <li>
          <strong>Du temps réservé</strong> : un bon pour une visite au printemps, un appel fixé chaque dimanche, un
          week-end ensemble inscrit dans l’agenda. C’est le cadeau le plus attendu, même s’il ne tient pas dans un colis.
        </li>
        <li>
          <strong>Quelque chose à partager</strong> : une gourmandise qu’ils ouvriront avec leurs propres invités du
          réveillon, avec les voisins ou au club. Pour une famille attachée au terroir, une boîte de{' '}
          <Link href="/belles-comtoises#coffrets">Belles Comtoises</Link>, petites vaches montbéliardes en chocolat
          praliné noisette, livrée chez eux, rappelle le Haut-Doubs et se partage autour du café.
        </li>
        <li>
          <strong>Un objet qui simplifie le lien</strong>, seulement s’ils le souhaitent : un cadre photo qui reçoit les
          images à distance, un téléphone aux grosses touches. Demandez d’abord à un proche qui les voit souvent si
          l’appareil sera vraiment utilisé.
        </li>
      </ul>

      <h2>Comment faire livrer un cadeau directement chez ses grands-parents ?</h2>
      <p>
        La plupart des boutiques en ligne permettent de saisir une adresse de livraison différente de la vôtre. C’est la
        solution la plus simple : vous payez, le colis part chez eux, sans passer par la poste de votre quartier.
        Quelques précautions évitent les mauvaises surprises :
      </p>
      <ol>
        <li>
          <strong>Vérifiez l’adresse complète</strong> : nom inscrit sur la boîte aux lettres, numéro de bâtiment,
          code d’accès à la résidence. Un détail manquant suffit à renvoyer le colis.
        </li>
        <li>
          <strong>Prévenez-les</strong> qu’un paquet va arriver, sans forcément dire ce qu’il contient. Certaines
          personnes âgées hésitent à ouvrir à un livreur qu’elles n’attendent pas.
        </li>
        <li>
          <strong>Gardez le suivi</strong> : avec un numéro de suivi, vous savez quand le colis est remis et vous pouvez
          appeler le jour même pour vérifier qu’il est bien rangé.
        </li>
        <li>
          <strong>En résidence ou en établissement</strong>, renseignez-vous auprès de l’accueil sur la façon dont les
          colis sont réceptionnés et remis aux résidents, et sur ce qui peut être apporté en chambre.
        </li>
      </ol>

      <h2>Comment associer les petits-enfants au cadeau à distance ?</h2>
      <p>
        Pour des grands-parents, le cadeau vient d’abord des petits-enfants. À distance, leur part est encore plus
        importante, parce qu’elle remplace leur présence dans le salon.
      </p>
      <ul>
        <li>
          <strong>Un dessin ou une lettre glissés dans le colis</strong>, ou envoyés par courrier séparé quelques jours
          avant. Les plus petits peuvent dessiner la famille, les plus grands raconter leur trimestre.
        </li>
        <li>
          <strong>Le choix du cadeau</strong> : laissez l’enfant choisir entre deux ou trois idées, il aura envie de
          savoir si elle a plu.
        </li>
        <li>
          <strong>Un message enregistré</strong> : une chanson, une poésie de l’école ou un simple « joyeux Noël »
          filmé, à envoyer par message ou à graver sur une clé si les grands-parents préfèrent la télévision.
        </li>
      </ul>

      <h2>Pourquoi des chocolats en forme de vache pour des grands-parents éloignés ?</h2>
      <p>
        Les Belles Comtoises, petites vaches montbéliardes en chocolat praliné noisette fabriquées par Mélanie et Cédric
        Brun à Charquemont (Doubs), sont un cadeau de Noël pensé pour être envoyé : elles se commandent en ligne et
        sont livrées directement chez les grands-parents, en France métropolitaine.
      </p>

      <Figure
        src="/images/comtoises/coffret-6-ferme.jpg"
        alt="Réglette de six Belles Comtoises fermée, posée sur l’herbe : étui blanc à grandes taches brunes, noué d’un lien de raphia avec une étiquette à tête de vache"
        width={1200}
        height={1600}
        ajustement="contain"
        legende="La réglette de 6, notre petit format, dans son étui tacheté."
      />

      <ul>
        <li>
          <strong>Un clin d’œil au pays</strong> : chaque vache reprend la silhouette de la montbéliarde, la vache
          tachetée du Haut-Doubs. Pour des grands-parents qui ont grandi en Franche-Comté ou y ont passé leurs vacances,
          c’est un souvenir autant qu’un chocolat ; notre article sur{' '}
          <Link href="/blog/vache-montbeliarde-franche-comte">la vache montbéliarde</Link> raconte son histoire.
        </li>
        <li>
          <strong>Des formats selon la tablée</strong> : la réglette de 6, notre petit format, pour un couple qui fête
          Noël à deux ; la boîte de 12, notre format découverte, ou la boîte de 20, notre grand format, quand ils
          reçoivent leurs enfants ou leurs voisins ; la boîte de 30, notre très grand format, pour une grande famille
          réunie chez eux.
        </li>
        <li>
          <strong>Quatre recettes, de quoi en parler au téléphone</strong> : lait « fondant et lacté », noir « intense
          et cacaoté », blanc « doux et vanillé », caramel « biscuité et caramélisé », sous un chocolat pur beurre de
          cacao. Chacun dit sa préférée pendant l’appel ; notre article sur{' '}
          <Link href="/blog/difference-chocolat-noir-lait-blanc">la différence entre chocolat noir, au lait et blanc</Link>{' '}
          aide à deviner la leur.
        </li>
        <li>
          <strong>Un produit d’atelier</strong> : moulées, enrobées et emballées dans notre atelier de Charquemont, elles
          sortent de l’atelier d’un maître artisan chocolatier installé dans le Haut-Doubs.
        </li>
      </ul>

      <h2>Comment ouvrir le cadeau ensemble en appel vidéo ?</h2>
      <p>
        Le déballage en visio transforme un colis en moment partagé. Il demande un peu d’organisation, surtout si les
        grands-parents sont peu familiers des écrans.
      </p>
      <ul>
        <li>
          <strong>Fixez l’heure à l’avance</strong>, de préférence en dehors du réveillon lui-même, quand chacun est
          occupé à table : le 24 en fin d’après-midi ou le 25 au matin conviennent souvent mieux.
        </li>
        <li>
          <strong>Demandez-leur d’attendre</strong> : un mot sur le colis, « à ouvrir avec nous », suffit.
        </li>
        <li>
          <strong>Faites un essai quelques jours avant</strong> si l’application est nouvelle pour eux, avec l’aide
          d’un voisin ou d’un proche qui passe les voir.
        </li>
        <li>
          <strong>Ouvrez quelque chose en même temps</strong> de votre côté : la même boîte, commandée en double, ou
          simplement le dessert. Goûter ensemble, même à des centaines de kilomètres, fait partie du cadeau.
        </li>
      </ul>

      <h2>Quand commander pour que le colis arrive avant le réveillon ?</h2>
      <p>
        Les coffrets de Belles Comtoises se règlent par carte sur notre site et partent en Colissimo avec suivi. Les colis
        sont préparés du mercredi au vendredi, puis acheminés en France métropolitaine : commandez dès les premiers jours
        de décembre, sans attendre la dernière semaine, quand les transporteurs sont les plus chargés.
      </p>
      <p>
        À la réception, demandez aux grands-parents de ranger la boîte au frais, loin du radiateur et de la cheminée,
        jusqu’au jour de l’ouverture : nos conseils pour{' '}
        <Link href="/blog/comment-conserver-le-chocolat">conserver le chocolat</Link> valent aussi pour un cadeau qui
        attend sous le sapin.
      </p>

      <Encadre titre="En une phrase">
        <p>
          Pour des grands-parents que vous ne verrez pas à Noël, faites livrer chez eux un cadeau qui se partage,
          accompagné d’un mot des petits-enfants, et ouvrez-le ensemble en appel vidéo ; Les Belles Comtoises, vaches
          montbéliardes en chocolat praliné noisette de Mélanie et Cédric Brun à Charquemont (Doubs), s’envoient
          directement à leur adresse depuis{' '}
          <Link href="/belles-comtoises#coffrets">la page des coffrets</Link>.
        </p>
      </Encadre>
    </>
  )
}
