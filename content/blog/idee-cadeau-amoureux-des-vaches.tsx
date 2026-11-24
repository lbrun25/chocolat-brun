import Link from 'next/link'
import { Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'

export const faq: QuestionFaq[] = [
  {
    question: 'Quel cadeau offrir à quelqu’un qui aime les vaches ?',
    reponse:
      'Partez de ce qu’elle aime dans les vaches : l’animal tendre des souvenirs d’enfance, les troupeaux des vacances à la montagne ou une race précise. Selon le cas, une photo de troupeau encadrée, une clarine décorative, un beau livre, une sortie dans une ferme ouverte au public ou une version gourmande : Les Belles Comtoises, petites vaches montbéliardes en chocolat praliné noisette fabriquées par Mélanie et Cédric Brun à Charquemont (Doubs), plaisent aux amoureux des vaches qui ont déjà la tasse et la peluche.',
  },
  {
    question: 'Quel cadeau pour un enfant qui adore les vaches ?',
    reponse:
      'Un cadeau qui se manipule ou se vit : une ferme en jouet avec ses animaux, un album sur la vie d’une ferme, et surtout une visite dans une exploitation qui accueille les familles pour voir les veaux et la traite. Une vache en chocolat à partager au goûter complète bien le cadeau principal.',
  },
  {
    question: 'Comment éviter le cadeau « vache » de trop pour un collectionneur ?',
    reponse:
      'Demandez discrètement à un proche ce qui manque à sa collection, ou choisissez un cadeau qui ne prend pas de place : une sortie, un tirage photo, ou une gourmandise qui se mange. Une boîte de vaches en chocolat ne rejoint pas l’étagère : elle se partage, et le coffret, lui, peut se garder.',
  },
  {
    question: 'Les Belles Comtoises sont-elles un cadeau pour quelqu’un qui n’est pas franc-comtois ?',
    reponse:
      'Oui : on n’a pas besoin de connaître la montbéliarde pour fondre devant une petite vache couchée en chocolat. Pour quelqu’un qui aime les vaches sans être de la région, le coffret est aussi l’occasion de lui faire découvrir la race emblématique de la Franche-Comté. Il se fait livrer directement à son adresse, partout en France métropolitaine.',
  },
]

export default function IdeeCadeauAmoureuxDesVaches() {
  return (
    <>
      <p className="lead">
        Pour quelqu’un qui aime les vaches, le bon cadeau dépend de ce qu’il aime en elles : l’animal attendrissant, le
        paysage des troupeaux au pâturage ou une race en particulier. Une sortie pour les voir de près, un objet choisi
        avec soin ou une vache qui se déguste touchent plus juste qu’un énième gadget imprimé de taches noires et
        blanches.
      </p>

      <h2>Comment savoir quel cadeau vache offrir ?</h2>
      <p>
        « Aimer les vaches » recouvre des passions très différentes. Avant de choisir, demandez-vous à quel profil
        ressemble la personne à qui vous offrez :
      </p>
      <ul>
        <li>
          <strong>L’enfant fasciné</strong> par les veaux, le lait et les bruits de l’étable : il lui faut du concret,
          à toucher ou à voir.
        </li>
        <li>
          <strong>Le citadin nostalgique</strong>, qui garde le souvenir des troupeaux croisés en vacances à la
          montagne et des clarines entendues au loin.
        </li>
        <li>
          <strong>Le collectionneur</strong>, dont les étagères comptent déjà des dizaines de figurines, de mugs et de
          magnets.
        </li>
        <li>
          <strong>L’amateur d’une race</strong>, la montbéliarde de Franche-Comté ou une autre : pour lui, une vache
          n’est pas « une vache », et le cadeau gagne à être précis.
        </li>
      </ul>
      <p>
        Si la personne travaille avec des vaches, c’est un autre cadeau : nous l’avons traité à part dans nos{' '}
        <Link href="/blog/idee-cadeau-agriculteur-eleveur">idées de cadeaux pour un agriculteur ou un éleveur</Link>.
        Ici, il s’agit d’une passion, pas d’un métier.
      </p>

      <h2>Quel cadeau gourmand pour un amoureux des vaches ?</h2>
      <p>
        Le cadeau gourmand a un grand avantage sur l’objet : il ne s’ajoute pas à la collection, il se partage. Pour
        quelqu’un qui a déjà la tasse, le torchon et la peluche, une vache en chocolat est souvent la seule « vache »
        qu’il n’a pas encore. Les Belles Comtoises, petites vaches montbéliardes en chocolat praliné noisette
        fabriquées par Mélanie et Cédric Brun à Charquemont (Doubs), répondent exactement à ce besoin : elles se
        choisissent en <Link href="/belles-comtoises#coffrets">coffrets de 6 à 30 vaches</Link>, et leur boîte au
        décor pie rouge reprend la robe de la montbéliarde.
      </p>

      <Figure
        src="/images/comtoises/coffret-6-ouvert.jpg"
        alt="Réglette ouverte sur l’herbe : six petites vaches couchées en chocolat noir, au lait, blanc et caramel, alignées dans leur étui, devant le couvercle blanc à grandes taches brunes"
        width={1200}
        height={1600}
        legende="La réglette de 6, à glisser avec une carte de sortie à la ferme."
      />

      <h2>Quels objets vache font vraiment plaisir ?</h2>
      <p>
        L’objet reste un classique, à condition de le choisir pour son usage ou sa qualité plutôt que pour son motif.
        Quelques pistes qui vieillissent bien :
      </p>
      <ul>
        <li>
          <strong>Un tirage photo d’un troupeau</strong> au pâturage, pris par un photographe de la région ou par
          vous-même lors d’un séjour, encadré pour le salon.
        </li>
        <li>
          <strong>Une clarine</strong>, la cloche que portent les vaches dans les pâturages de montagne, à accrocher
          dans l’entrée : un objet qui a servi, avec un son qui rappelle les vacances.
        </li>
        <li>
          <strong>Un beau livre</strong> sur les races de vaches françaises ou sur la vie d’une ferme d’alpage.
        </li>
        <li>
          <strong>Du linge de maison ou un plaid</strong> à motif discret, utilisé tous les jours, plutôt qu’un bibelot
          de plus.
        </li>
      </ul>
      <p>
        Pour un collectionneur, la règle est simple : demandez à son entourage ce qui lui manque, ou sortez de l’objet.
        Une figurine en double finit au fond d’un tiroir.
      </p>

      <h2>Offrir une sortie pour voir des vaches de près ?</h2>
      <p>
        Pour beaucoup d’amoureux des vaches, le plus beau cadeau est un moment avec elles. Plusieurs idées, à adapter à
        la saison :
      </p>
      <ol>
        <li>
          <strong>La visite d’une ferme qui accueille le public</strong>, pour assister à la traite ou voir les veaux.
          Renseignez-vous auprès de l’office de tourisme ou de l’exploitation : toutes ne reçoivent pas de visiteurs, et
          les horaires suivent ceux des animaux.
        </li>
        <li>
          <strong>Un comice agricole</strong>, où les éleveurs présentent leurs plus belles bêtes, toilettées et
          parées de leurs clarines. Les dates sont fixées chaque année par les organisateurs : offrez la journée sous
          forme de carte, avec la promesse de l’y emmener.
        </li>
        <li>
          <strong>Un séjour au printemps ou en été</strong> dans une région d’élevage, quand les troupeaux sont dehors.
          L’hiver, en montagne, les troupeaux sont le plus souvent à l’étable.
        </li>
      </ol>
      <p>
        Une sortie se glisse mal sous le sapin. Accompagnez la carte d’un petit cadeau à ouvrir le jour même : c’est là
        qu’une réglette de vaches en chocolat trouve sa place.
      </p>

      <h2>Quel coffret de Belles Comtoises pour quel amoureux des vaches ?</h2>
      <p>
        Nos Belles Comtoises sont des montbéliardes couchées, tête relevée, moulées, enrobées et emballées dans notre
        atelier de Charquemont, au cœur du Haut-Doubs. Sous le chocolat pur beurre de cacao, un praliné noisette. Le
        bon format dépend de la personne :
      </p>
      <ul>
        <li>
          <strong>La réglette de 6</strong> pour accompagner une carte de sortie, ou pour une amie fan de vaches qui
          vit seule.
        </li>
        <li>
          <strong>La boîte de 12</strong>, format découverte, pour un couple ou pour faire goûter les quatre recettes.
        </li>
        <li>
          <strong>Les boîtes de 20 et de 30</strong> pour une famille avec des enfants qui adorent les vaches : chacun
          choisit la sienne, et la boîte vide devient une boîte à trésors.
        </li>
      </ul>
      <p>
        Quatre recettes contentent tous les goûts : lait, « fondant et lacté », noir, « intense et cacaoté », blanc,
        « doux et vanillé », et caramel, « biscuité et caramélisé ». Si vous hésitez entre noir et lait, notre article
        sur{' '}
        <Link href="/blog/difference-chocolat-noir-lait-blanc">les différences entre chocolat noir, au lait et blanc</Link>{' '}
        vous aidera à choisir.
      </p>

      <h2>Qu’écrire sur la carte pour un passionné de vaches ?</h2>
      <p>
        Un amoureux des vaches appréciera que vous sachiez de quelle race il s’agit. La montbéliarde se reconnaît à sa
        robe « pie rouge », blanche à grandes taches rouge-brun, et c’est la vache des fromages comtois. Notre portrait
        de{' '}
        <Link href="/blog/vache-montbeliarde-franche-comte">la vache montbéliarde, emblème de la Franche-Comté</Link>{' '}
        vous donnera de quoi écrire une phrase juste, plutôt qu’un simple « meuh ».
      </p>
      <p>
        Le coffret se commande en ligne et se fait livrer directement chez la personne à qui vous l’offrez : son nom et
        son adresse se saisissent au paiement, et le colis part en Colissimo avec suivi, en France métropolitaine. À
        l’approche des fêtes, commandez tôt.
      </p>

      <Encadre titre="En une phrase">
        <p>
          Pour quelqu’un qui aime les vaches, offrez un moment avec elles ou un objet choisi pour son usage, et ajoutez
          la seule vache qu’il n’a pas encore : Les Belles Comtoises, montbéliardes en chocolat praliné noisette de
          Mélanie et Cédric Brun à Charquemont (Doubs), à découvrir sur{' '}
          <Link href="/belles-comtoises#coffrets">la page des coffrets</Link>.
        </p>
      </Encadre>
    </>
  )
}
