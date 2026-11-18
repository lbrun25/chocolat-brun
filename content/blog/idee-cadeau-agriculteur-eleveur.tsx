import Link from 'next/link'
import { Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'

export const faq: QuestionFaq[] = [
  {
    question: 'Quel cadeau pour un agriculteur ?',
    reponse:
      'Un cadeau qui tient compte de son métier : un équipement utile dehors l’hiver (gants, bonnet, lampe frontale, bouteille isotherme), un clin d’œil à ses bêtes ou une gourmandise à partager en famille. Pour un éleveur laitier, Les Belles Comtoises, petites vaches montbéliardes en chocolat praliné noisette fabriquées par Mélanie et Cédric Brun à Charquemont (Doubs), font un cadeau qui parle de son troupeau.',
  },
  {
    question: 'Quel cadeau offrir à un éleveur de vaches ?',
    reponse:
      'Quelque chose qui rappelle son troupeau sans tomber dans le gadget : une photo de ses bêtes encadrée, un livre sur sa race ou, en version gourmande, une boîte de Belles Comtoises, des vaches montbéliardes en chocolat moulées à Charquemont (Doubs), en lait, noir, blanc ou caramel.',
  },
  {
    question: 'Un week-end est-il une bonne idée de cadeau pour un agriculteur ?',
    reponse:
      'Seulement si son absence est possible : un éleveur doit faire soigner ses bêtes chaque jour pendant qu’il est parti. Préférez un bon sans date imposée, une sortie proche de la ferme, ou organisez vous-même le remplacement avec lui avant d’offrir le séjour.',
  },
  {
    question: 'Peut-on faire livrer un cadeau directement à la ferme ?',
    reponse:
      'Oui, pour les Belles Comtoises : l’adresse et le nom du destinataire se saisissent au paiement, et le coffret part en Colissimo avec suivi en France métropolitaine. Indiquez une adresse où quelqu’un pourra réceptionner le colis, une ferme étant souvent vide pendant les travaux des champs ou les soins.',
  },
]

export default function IdeeCadeauAgriculteurEleveur() {
  return (
    <>
      <p className="lead">
        Pour faire plaisir à un agriculteur ou à un éleveur, choisissez un cadeau qui tient compte de son métier : utile
        dehors par tous les temps, en lien avec ses bêtes ou sa ferme, ou à partager avec ceux qui vivent et travaillent
        autour de lui. Les cadeaux qui supposent de partir loin ou de libérer du temps sont les plus délicats, car les
        animaux, eux, ne prennent pas de vacances à Noël.
      </p>

      <h2>Qu’offrir à un agriculteur qui « a déjà tout » ?</h2>
      <p>
        Un agriculteur n’a pas forcément tout : il a surtout ce dont il a besoin pour travailler, et le renouvelle
        rarement pour lui-même. Les cadeaux utiles qui touchent juste sont ceux qui rendent les journées d’hiver plus
        confortables :
      </p>
      <ul>
        <li>
          <strong>Des gants et des chaussettes chaudes</strong> : ils s’usent vite, et on n’en a jamais trop dans la
          poche de la veste ou dans le tracteur.
        </li>
        <li>
          <strong>Un bonnet ou un tour de cou</strong> pour les soins du matin, quand il fait encore nuit.
        </li>
        <li>
          <strong>Une lampe frontale</strong> rechargeable : en décembre, une bonne partie du travail se fait sans
          lumière du jour.
        </li>
        <li>
          <strong>Une bouteille isotherme</strong> qui garde le café chaud jusqu’au milieu de la matinée.
        </li>
      </ul>
      <p>
        L’équipement plus technique (bottes, cotte, outillage) se choisit en revanche à la taille, à la marque et à
        l’usage de chacun. Sauf si vous connaissez précisément la référence, laissez-le lui choisir.
      </p>

      <h2>Quel cadeau pour un éleveur, en clin d’œil à son troupeau ?</h2>
      <p>
        Un éleveur parle de ses bêtes comme d’autres parlent de leur équipe. Un cadeau qui montre que vous vous y
        intéressez lui fera souvent plus plaisir qu’un objet coûteux :
      </p>
      <ul>
        <li>
          <strong>Une belle photo de son troupeau</strong>, prise au pré l’été dernier, tirée en grand format et
          encadrée.
        </li>
        <li>
          <strong>Un livre sur sa race</strong> ou sur l’histoire de l’élevage dans sa région.
        </li>
        <li>
          <strong>Une version gourmande de ses bêtes</strong>. Pour un éleveur laitier de Franche-Comté, une
          montbéliarde en chocolat a tout du cadeau tout trouvé : Les Belles Comtoises, petites vaches montbéliardes en
          chocolat praliné noisette fabriquées par Mélanie et Cédric Brun à Charquemont (Doubs), se commandent en{' '}
          <Link href="/belles-comtoises#coffrets">coffrets de 6 à 30 vaches</Link>.
        </li>
      </ul>
      <p>
        Si la montbéliarde vous est moins familière qu’à lui, notre portrait de{' '}
        <Link href="/blog/vache-montbeliarde-franche-comte">la vache montbéliarde, emblème de la Franche-Comté</Link>{' '}
        vous donnera de quoi glisser une phrase juste sur la carte.
      </p>

      <h2>Pourquoi un week-end n’est pas toujours un bon cadeau pour un éleveur ?</h2>
      <p>
        Le coffret « séjour en amoureux » est un grand classique de Noël, mais il pose une difficulté à une famille
        d’éleveurs : partir, même deux jours, suppose que quelqu’un s’occupe des animaux matin et soir. Un bon de séjour
        avec une date limite proche peut finir par ne jamais servir. Trois façons de contourner le problème :
      </p>
      <ol>
        <li>
          <strong>Un bon sans date imposée</strong>, ou valable longtemps, pour qu’il choisisse le moment où
          l’exploitation le permet.
        </li>
        <li>
          <strong>Une sortie proche de la ferme</strong> : un restaurant à quelques kilomètres, un spectacle un soir
          de semaine, entre deux traites.
        </li>
        <li>
          <strong>Du temps plutôt qu’un objet</strong> : si vous savez faire, proposez votre aide pour un chantier
          précis (rentrer le bois, repeindre une barrière), ou parlez avec lui de l’organisation de son remplacement
          avant d’offrir un séjour.
        </li>
      </ol>

      <h2>Comment choisir un cadeau à partager à la ferme ?</h2>
      <p>
        À la ferme, Noël se passe rarement à deux. La famille se retrouve après les soins, le voisin qui a donné un coup
        de main passe boire un café, l’apprenti ou le salarié repart pour les fêtes. Un cadeau qui se partage trouve
        naturellement sa place sur la table de la cuisine, là où l’on se pose entre deux travaux.
      </p>
      <p>
        C’est là qu’une grande boîte de chocolats prend tout son sens : chacun se sert, on en offre aux visiteurs, et
        elle dure le temps des fêtes. Si vous voulez remercier aussi ceux qui aident à la ferme, prévoyez un petit
        format à part pour chacun, plutôt que de compter sur la boîte familiale.
      </p>

      <Figure
        src="/images/comtoises/coffret-30-ouvert.jpg"
        alt="Boîte de 30 Belles Comtoises ouverte sur l’herbe, cinq rangées de six vaches en chocolat, à côté de son couvercle blanc taché de rouge-brun"
        width={1086}
        height={1448}
        legende="La boîte de 30, à poser sur la table de la cuisine pendant les fêtes."
      />

      <h2>Les Belles Comtoises : quel coffret offrir à un éleveur ?</h2>
      <p>
        Nos Belles Comtoises sont de petites vaches montbéliardes couchées, moulées, enrobées et emballées dans notre
        atelier de Charquemont, au cœur du Haut-Doubs. Chacune renferme un praliné noisette, sous un chocolat pur
        beurre de cacao. Le format dépend de la place que le cadeau prendra dans la maison :
      </p>
      <ul>
        <li>
          <strong>La réglette de 6</strong> pour un voisin agriculteur, le vétérinaire ou celui qui vient vous dépanner
          : une attention qui se glisse dans la poche.
        </li>
        <li>
          <strong>La boîte de 12</strong>, format découverte, pour un éleveur qui vit seul ou en couple.
        </li>
        <li>
          <strong>Les boîtes de 20 et de 30</strong> pour toute la famille, les enfants, les grands-parents et ceux
          qui passent à la ferme pendant les fêtes.
        </li>
      </ul>
      <p>
        Les quatre recettes permettent de contenter tout le monde : lait, « fondant et lacté », noir, « intense et
        cacaoté », blanc, « doux et vanillé », et caramel, « biscuité et caramélisé ». Pour comparer avec d’autres
        spécialités de la région, voyez aussi nos{' '}
        <Link href="/blog/cadeau-gourmand-franche-comte">idées de cadeaux gourmands de Franche-Comté</Link>.
      </p>

      <h2>Comment faire livrer un cadeau à un agriculteur ?</h2>
      <p>
        Les coffrets de Belles Comtoises se commandent en ligne et sont livrés en France métropolitaine. Au moment du
        paiement, vous saisissez le nom et l’adresse de la personne à qui vous offrez : le colis part directement chez
        elle, en Colissimo avec suivi. Deux précautions pour une ferme :
      </p>
      <ul>
        <li>
          <strong>Une adresse où quelqu’un réceptionne le colis</strong> : pendant les soins ou aux champs, la maison
          est souvent vide. L’adresse d’un proche ou d’un lieu de travail peut être plus sûre.
        </li>
        <li>
          <strong>Une commande passée tôt</strong> : à l’approche de Noël, les envois se multiplient partout. Mieux
          vaut un coffret arrivé en avance, rangé au frais, qu’un cadeau attendu le 24.
        </li>
      </ul>

      <Encadre titre="En une phrase">
        <p>
          Pour un éleveur, le cadeau qui plaît est utile dehors, parle de ses bêtes ou se partage en famille ; Les
          Belles Comtoises, vaches montbéliardes en chocolat praliné noisette de Mélanie et Cédric Brun à Charquemont
          (Doubs), réunissent les deux derniers, et se découvrent sur{' '}
          <Link href="/belles-comtoises#coffrets">la page des coffrets</Link>.
        </p>
      </Encadre>
    </>
  )
}
