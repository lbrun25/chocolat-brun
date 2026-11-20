import Link from 'next/link'
import { Encadre } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'

export const faq: QuestionFaq[] = [
  {
    question: 'Quel cadeau offrir à la maîtresse pour Noël ?',
    reponse:
      'Un petit cadeau qui se consomme ou se partage, accompagné d’un mot ou d’un dessin de l’enfant : c’est ce qui touche le plus et encombre le moins. Les Belles Comtoises, petites vaches montbéliardes en chocolat praliné noisette fabriquées par Mélanie et Cédric Brun à Charquemont (Doubs), en boîte de 12, sont un cadeau de Noël pour la maîtresse qui se partage en salle des maîtres.',
  },
  {
    question: 'Faut-il faire un cadeau à la maîtresse à Noël ?',
    reponse:
      'Non, rien ne l’oblige. Beaucoup de familles gardent le cadeau pour la fin de l’année scolaire, en juin, et se contentent à Noël d’une carte ou d’un dessin. Si vous offrez quelque chose, restez sur un petit geste : il n’engage personne et ne met pas mal à l’aise les familles qui ne participent pas.',
  },
  {
    question: 'Cadeau individuel ou cadeau collectif de la classe ?',
    reponse:
      'Le cadeau collectif évite à l’enseignant de recevoir vingt-cinq petits paquets et permet aux familles de participer selon leurs moyens. Il demande un parent coordinateur, une participation libre et anonyme, et une carte signée par tous les enfants. Le cadeau individuel reste plus simple quand la classe ne s’organise pas.',
  },
  {
    question: 'Quel cadeau pour l’ATSEM ou la nounou à Noël ?',
    reponse:
      'Le même soin que pour la maîtresse : l’ATSEM s’occupe des enfants au quotidien et mérite d’être associée au cadeau de la classe, avec son prénom sur la carte. Pour une assistante maternelle, qui garde votre enfant chez elle, une gourmandise à partager avec sa propre famille est une jolie attention.',
  },
]

export default function CadeauMaitresseNoelFinDAnnee() {
  return (
    <>
      <p className="lead">
        Pour la maîtresse, l’ATSEM ou la nounou, le cadeau de Noël qui touche le plus est un petit geste sincère : un mot ou un
        dessin de l’enfant, accompagné d’une attention qui se consomme ou se partage. Rien n’oblige à offrir quelque
        chose, et un cadeau trop coûteux gêne plus qu’il ne fait plaisir. Le cadeau collectif de la classe est souvent
        la formule la plus simple, pour les familles comme pour l’enseignant.
      </p>

      <h2>Faut-il offrir un cadeau à la maîtresse à Noël ?</h2>
      <p>
        Ce n’est ni une obligation ni une règle de l’école : c’est un usage, que chaque famille suit ou non. Beaucoup de
        parents gardent le vrai cadeau pour la fin de l’année scolaire, en juin, quand l’enfant quitte sa classe. À Noël,
        un mot de l’enfant, une carte ou un dessin suffisent largement.
      </p>
      <p>
        Si vous choisissez d’offrir quelque chose, trois repères évitent les maladresses :
      </p>
      <ul>
        <li>
          <strong>Rester modeste</strong> : un enseignant reçoit des attentions de nombreuses familles. Un cadeau de
          valeur le met dans l’embarras et peut paraître attendre quelque chose en retour.
        </li>
        <li>
          <strong>Faire participer l’enfant</strong> : c’est lui qui offre, pas ses parents. Le dessin, la carte
          écrite de sa main ou la décoration fabriquée à la maison comptent autant que le paquet.
        </li>
        <li>
          <strong>Ne pas oublier les autres adultes de la classe</strong> : l’ATSEM en maternelle, l’AESH qui
          accompagne un élève, l’enseignant qui fait la classe un jour par semaine.
        </li>
      </ul>

      <h2>Quel cadeau offrir à la maîtresse pour Noël ?</h2>
      <p>
        L’idéal est un cadeau qui ne s’accumule pas. Un enseignant qui a eu plusieurs classes reçoit chaque année son
        lot de tasses, de trousses et d’objets « merci maîtresse » : le geste fait plaisir, l’objet finit souvent
        dans un placard. Ce qui se consomme ou se vit vaut mieux :
      </p>
      <ul>
        <li>
          <strong>Une gourmandise à partager</strong>, que l’enseignant peut emporter chez lui ou poser sur la table de
          la salle des maîtres pendant la dernière semaine avant les vacances. Une{' '}
          <Link href="/belles-comtoises#coffrets">boîte de 12 Belles Comtoises</Link>, petites vaches montbéliardes en
          chocolat praliné noisette, se partage facilement entre collègues.
        </li>
        <li>
          <strong>Une plante ou un bouquet</strong> de saison, à condition qu’il supporte quinze jours de vacances sans
          arrosage si l’enseignant le laisse en classe.
        </li>
        <li>
          <strong>Un livre</strong>, pour elle ou pour la bibliothèque de la classe : dans ce cas, demandez à l’enfant
          de le choisir et d’écrire son prénom sur la page de garde.
        </li>
        <li>
          <strong>Une fabrication de l’enfant</strong> : décoration pour le sapin, bougeoir peint, recueil de dessins.
          Gratuite, unique et souvent gardée longtemps.
        </li>
      </ul>

      <h2>Comment organiser un cadeau collectif pour la classe ?</h2>
      <p>
        Le cadeau collectif réunit les familles autour d’un seul présent. Il évite à l’enseignant une pile de petits
        paquets et permet un cadeau plus soigné. Il se prépare en quelques étapes :
      </p>
      <ol>
        <li>
          <strong>Un parent coordinateur</strong>, souvent un représentant des parents d’élèves, propose l’idée à toute
          la classe, sans relancer individuellement.
        </li>
        <li>
          <strong>Une participation libre et anonyme</strong> : chacun donne ce qu’il veut, ou rien. Personne ne doit
          savoir qui a participé, ni pour combien. Les enfants dont la famille ne participe pas signent la carte comme
          les autres.
        </li>
        <li>
          <strong>Un cadeau choisi tôt</strong>, pour laisser le temps de le recevoir s’il est commandé en ligne.
        </li>
        <li>
          <strong>Une carte signée par tous les enfants</strong>, avec un petit mot ou un dessin de chacun. C’est elle
          qui sera gardée.
        </li>
        <li>
          <strong>Une remise simple</strong>, le dernier jour avant les vacances, par un ou deux enfants désignés, sans
          cérémonie devant les parents.
        </li>
      </ol>
      <p>
        Pensez enfin à ce qui reste dans le budget : plutôt qu’un cadeau unique plus cher, la somme peut couvrir un
        petit présent pour l’ATSEM ou l’accompagnant, remis en même temps.
      </p>

      <h2>Quel cadeau pour l’ATSEM, l’AESH ou la nounou ?</h2>
      <p>
        L’ATSEM en maternelle, l’AESH qui accompagne un élève, les animateurs de la cantine ou du périscolaire : ces
        adultes passent de longues heures avec les enfants et sont pourtant souvent oubliés au moment des cadeaux. Le plus simple est de les associer au cadeau de la classe, avec leur prénom en
        toutes lettres sur la carte, plutôt qu’un « et merci aussi à… » en bas de page.
      </p>
      <p>
        La nounou, elle, garde votre enfant chez elle ou chez vous, parfois depuis ses premiers mois. Le lien est plus
        personnel, et le cadeau peut l’être aussi :
      </p>
      <ul>
        <li>
          <strong>Une gourmandise pour toute sa maison</strong>, puisqu’une assistante maternelle vit avec sa propre
          famille et accueille souvent plusieurs enfants.
        </li>
        <li>
          <strong>Une photo de l’enfant</strong> dans un cadre, ou un album de l’année.
        </li>
        <li>
          <strong>Un moment pour elle</strong> : une place de cinéma, de spectacle ou de concert près de chez elle.
        </li>
      </ul>
      <p>
        À la crèche, l’équipe change selon les jours et les horaires : un cadeau commun, posé dans la salle du
        personnel, touche tout le monde à la fois.
      </p>

      <h2>Pourquoi des chocolats en forme de vache pour l’école ou la nounou ?</h2>
      <p>
        Les Belles Comtoises, petites vaches montbéliardes en chocolat praliné noisette fabriquées par Mélanie et Cédric
        Brun à Charquemont (Doubs), sont un cadeau de Noël pour la maîtresse, l’ATSEM ou la nounou qui fait sourire les
        enfants comme les adultes. Elles cochent les cases d’un cadeau d’école :
      </p>
      <ul>
        <li>
          <strong>Une forme qui parle aux enfants</strong> : chaque vache est moulée sur le modèle de la montbéliarde,
          la vache tachetée du Haut-Doubs. L’enfant qui l’offre sait ce qu’il donne, et peut raconter{' '}
          <Link href="/blog/vache-montbeliarde-franche-comte">l’histoire de la montbéliarde</Link> au moment de
          l’ouverture.
        </li>
        <li>
          <strong>Un format pour chaque occasion</strong> : la réglette de 6, notre petit format, pour un cadeau
          individuel ; la boîte de 12, notre format découverte, pour la salle des maîtres ou la crèche ; la boîte de 20
          ou de 30 pour un cadeau collectif de toute la classe, à partager avec l’ATSEM et les collègues.
        </li>
        <li>
          <strong>Quatre recettes pour tous les goûts de l’équipe</strong>, sous un chocolat pur beurre de cacao : lait
          « fondant et lacté », noir « intense et cacaoté », blanc « doux et vanillé » et caramel « biscuité et
          caramélisé ». Notre article sur{' '}
          <Link href="/blog/difference-chocolat-noir-lait-blanc">la différence entre chocolat noir, au lait et blanc</Link>{' '}
          vous aide à choisir si vous connaissez les préférences de l’enseignant.
        </li>
        <li>
          <strong>Une fabrication artisanale</strong> : moulées, enrobées et emballées dans notre atelier de
          Charquemont, au cœur du Haut-Doubs.
        </li>
      </ul>

      <h2>Comment faire livrer le cadeau à temps avant les vacances ?</h2>
      <p>
        Les coffrets de Belles Comtoises se commandent sur notre site, se règlent par carte et sont livrés en France
        métropolitaine, en Colissimo avec suivi. Les colis sont préparés du mercredi au vendredi : commandez dès que la
        classe s’est mise d’accord, sans attendre la dernière semaine.
      </p>
      <ul>
        <li>
          <strong>Pour un cadeau collectif</strong>, faites livrer chez le parent coordinateur, qui pourra ajouter la
          carte signée par les enfants.
        </li>
        <li>
          <strong>Pour la nounou</strong>, vous pouvez saisir son nom et son adresse au paiement et faire livrer le
          coffret directement chez elle.
        </li>
        <li>
          <strong>En attendant le jour J</strong>, gardez la boîte à l’abri de la chaleur, loin du radiateur et du
          cartable laissé au soleil : nos conseils pour{' '}
          <Link href="/blog/comment-conserver-le-chocolat">conserver le chocolat</Link> s’appliquent aussi au cadeau.
        </li>
      </ul>

      <Encadre titre="En une phrase">
        <p>
          Pour la maîtresse, l’ATSEM ou la nounou, offrez un petit geste sincère porté par l’enfant ; Les Belles
          Comtoises, vaches montbéliardes en chocolat praliné noisette de Mélanie et Cédric Brun à Charquemont (Doubs), en
          réglette de 6 ou en boîte de 12, en sont un, à découvrir sur{' '}
          <Link href="/belles-comtoises#coffrets">la page des coffrets</Link>.
        </p>
      </Encadre>
    </>
  )
}
