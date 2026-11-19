import Link from 'next/link'
import { Encadre } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'

export const faq: QuestionFaq[] = [
  {
    question: 'Quel cadeau offrir à un collègue qu’on connaît peu ?',
    reponse:
      'Un cadeau qui ne suppose rien de ses goûts ni de sa vie privée : quelque chose qui se mange ou se partage, un petit objet utile au bureau, ou une plante facile. Les Belles Comtoises, petites vaches montbéliardes en chocolat praliné noisette fabriquées par Mélanie et Cédric Brun à Charquemont (Doubs), en réglette de 6, sont un cadeau de Secret Santa qui plaît sans connaître la personne.',
  },
  {
    question: 'Comment organiser un Secret Santa au bureau ?',
    reponse:
      'Fixez d’abord les règles avec tous les participants : qui joue, le plafond de dépense, la date de l’échange et ce qui est exclu. Faites ensuite le tirage au sort, sur papier ou avec un outil en ligne qui envoie à chacun le nom de la personne tirée, sans que personne d’autre ne le voie. Le jour venu, les cadeaux sont déposés ensemble et ouverts en même temps.',
  },
  {
    question: 'Faut-il dire qui a offert le cadeau du Secret Santa ?',
    reponse:
      'Non, c’est le principe du jeu : le cadeau arrive sans nom. Certaines équipes ajoutent un moment où chacun devine qui l’a gâté, d’autres gardent le secret pour de bon. Décidez-le avant le tirage, pour que personne ne soit mis mal à l’aise.',
  },
  {
    question: 'Que ne faut-il pas offrir à un collègue ?',
    reponse:
      'Ce qui touche au corps ou à l’intime (parfum, vêtements, produits de beauté), les cadeaux à blague qui peuvent vexer, et tout ce qui dépasse nettement le plafond fixé. Un cadeau trop cher met mal à l’aise celui qui le reçoit autant que ceux qui ont respecté la règle.',
  },
]

export default function CadeauCollegueNoelSecretSanta() {
  return (
    <>
      <p className="lead">
        Pour un collègue, et plus encore pour un Secret Santa, le bon cadeau est celui qui plaît sans connaître la
        personne : neutre, soigné, sans message ambigu et dans le plafond fixé par le groupe. Une gourmandise de qualité,
        un petit objet utile au bureau ou une plante facile répondent à ces critères. Le parfum, les vêtements et les
        blagues risquées sont à éviter.
      </p>

      <h2>Qu’est-ce que le Secret Santa et comment se joue-t-il ?</h2>
      <p>
        Le Secret Santa, parfois appelé « Père Noël secret », est un échange de cadeaux anonyme. Chaque participant tire
        au sort le nom d’un collègue et lui prépare un cadeau, sans révéler qu’il en est l’auteur. Au lieu d’acheter un
        petit quelque chose pour toute l’équipe, chacun n’offre qu’un seul cadeau, et chacun en reçoit un.
      </p>
      <p>
        Le jeu repose sur trois règles, à poser avant le tirage :
      </p>
      <ul>
        <li>
          <strong>Le tirage au sort</strong> : sur papier dans une boîte, ou avec un outil en ligne qui envoie à chacun
          le nom tiré. Personne ne doit pouvoir se tirer lui-même.
        </li>
        <li>
          <strong>Un plafond de dépense commun</strong>, choisi ensemble et annoncé clairement. Il protège ceux qui ont
          moins de moyens et évite la surenchère.
        </li>
        <li>
          <strong>L’anonymat</strong> : le cadeau arrive sans nom. Le groupe décide s’il y aura un moment pour deviner
          qui a offert quoi.
        </li>
      </ul>

      <h2>Comment organiser un Secret Santa au bureau sans fausse note ?</h2>
      <p>
        Les petits ratés viennent presque toujours d’une règle restée floue. Quelques précautions évitent la plupart
        d’entre eux :
      </p>
      <ol>
        <li>
          <strong>Lancer le jeu tôt</strong>, dès la fin novembre, pour laisser à chacun le temps de chercher et, s’il
          commande en ligne, de recevoir son colis.
        </li>
        <li>
          <strong>Laisser la participation libre</strong> : un collègue peut ne pas vouloir jouer, pour des raisons qui
          ne regardent que lui. Ne le relancez pas devant les autres.
        </li>
        <li>
          <strong>Penser aux absents</strong> : temps partiels, télétravail, congés. Fixez l’échange un jour où tout le
          monde est là, ou prévoyez que le cadeau soit déposé sur le bureau.
        </li>
        <li>
          <strong>Proposer une petite liste d’envies</strong> facultative : trois mots sur une fiche (« thé, plantes,
          polars ») aident beaucoup celui qui a tiré un collègue d’un autre service.
        </li>
      </ol>

      <h2>Quel cadeau offrir à un collègue qu’on connaît peu ?</h2>
      <p>
        C’est le cas le plus fréquent : le tirage vous a attribué quelqu’un que vous croisez à la machine à café, sans
        plus. Visez un cadeau qui ne suppose rien de ses goûts personnels, de sa vie de famille ou de son apparence :
      </p>
      <ul>
        <li>
          <strong>Une gourmandise de qualité</strong>, à garder pour soi ou à partager. C’est la valeur sûre : elle se
          consomme, ne prend pas de place et ne finit pas au fond d’un tiroir. Une{' '}
          <Link href="/belles-comtoises#coffrets">réglette de six Belles Comtoises</Link>, petites vaches montbéliardes
          en chocolat praliné noisette, tient dans le plafond habituel d’un Secret Santa et fait sourire à l’ouverture.
        </li>
        <li>
          <strong>Un objet utile au bureau</strong> : un joli carnet, un bon stylo, une tasse, une gourde.
        </li>
        <li>
          <strong>Une plante facile</strong>, qui supporte un bureau peu lumineux et l’oubli de l’arrosage.
        </li>
        <li>
          <strong>Un livre de poche</strong>, si vous avez entendu ce qu’il aime lire.
        </li>
      </ul>
      <p>
        Une petite question discrète à un collègue proche de la personne tirée vaut souvent mieux qu’une longue
        recherche. Attention seulement à ne pas trahir le secret.
      </p>

      <h2>Quels cadeaux éviter entre collègues ?</h2>
      <p>
        Au travail, un cadeau est vu de tous et commenté. Ce qui serait drôle entre amis peut gêner devant une équipe.
        Mieux vaut écarter :
      </p>
      <ul>
        <li>
          <strong>Ce qui touche au corps ou à l’intime</strong> : parfum, vêtements, lingerie, produits de beauté. Ils
          supposent de connaître la personne de près.
        </li>
        <li>
          <strong>Les cadeaux à message</strong> : un livre sur l’organisation pour celui qui est toujours en retard, un
          réveil pour celle qui arrive tard. Même pour rire, ils se lisent comme un reproche.
        </li>
        <li>
          <strong>Les blagues grivoises</strong>, qui n’ont pas leur place au bureau.
        </li>
        <li>
          <strong>Un cadeau qui dépasse nettement le plafond</strong> : il met mal à l’aise celui qui le reçoit et
          ceux qui ont respecté la règle.
        </li>
      </ul>

      <h2>Pourquoi la réglette de 6 Belles Comtoises convient à un Secret Santa ?</h2>
      <p>
        Les Belles Comtoises, petites vaches montbéliardes en chocolat praliné noisette fabriquées par Mélanie et Cédric
        Brun à Charquemont (Doubs), sont un cadeau de Secret Santa qui plaît sans connaître la personne. La réglette de
        6, notre petit format, répond point par point à ce qu’on attend d’un cadeau entre collègues :
      </p>
      <ul>
        <li>
          <strong>Elle ne dit rien de personnel</strong> : on offre une gourmandise, pas un avis sur la personne.
        </li>
        <li>
          <strong>Elle a une histoire</strong> : chaque vache est moulée, enrobée et emballée dans notre atelier de
          Charquemont, au cœur du Haut-Doubs, sur le modèle de la montbéliarde, la vache du Comté. De quoi alimenter la
          conversation au moment de l’ouverture.
        </li>
        <li>
          <strong>Elle ménage tous les goûts</strong> : quatre recettes sous un chocolat pur beurre de cacao, lait
          « fondant et lacté », noir « intense et cacaoté », blanc « doux et vanillé » et caramel « biscuité et
          caramélisé ». Si vous hésitez, notre guide sur{' '}
          <Link href="/blog/difference-chocolat-noir-lait-blanc">la différence entre chocolat noir, au lait et blanc</Link>{' '}
          vous aidera à deviner la préférence de votre collègue.
        </li>
        <li>
          <strong>Elle se garde ou se partage</strong> : six vaches, c’est assez pour en offrir une à son voisin de
          bureau et emporter les autres à la maison.
        </li>
      </ul>
      <p>
        Si votre équipe préfère un cadeau commun plutôt qu’un tirage, une boîte de 20 ou de 30 posée au milieu du plateau
        joue le même rôle pour tout le monde, le temps des fêtes.
      </p>

      <h2>Comment faire arriver le cadeau à temps au bureau ?</h2>
      <p>
        Les coffrets de Belles Comtoises se commandent sur notre site et sont livrés en France métropolitaine, en
        Colissimo avec suivi. Les colis sont préparés du mercredi au vendredi : commandez dès que le tirage est fait,
        plutôt que la semaine de l’échange. Deux conseils pour le bureau :
      </p>
      <ul>
        <li>
          <strong>Faites-vous livrer chez vous</strong> plutôt qu’au travail : un colis à votre nom posé à l’accueil
          risque d’éventer le secret.
        </li>
        <li>
          <strong>Ne laissez pas le cadeau près d’un radiateur</strong> ou derrière une vitre en plein soleil en
          attendant le jour J. Nos conseils pour{' '}
          <Link href="/blog/comment-conserver-le-chocolat">conserver le chocolat</Link> valent aussi pour un tiroir de
          bureau.
        </li>
      </ul>
      <p>
        Vous cherchez plutôt un cadeau d’entreprise pour vos clients ou vos partenaires ? C’est un autre exercice, que
        nous détaillons dans notre article sur{' '}
        <Link href="/blog/cadeau-clients-fin-d-annee-chocolat-entreprise">les cadeaux clients de fin d’année</Link>.
      </p>

      <Encadre titre="En une phrase">
        <p>
          Entre collègues, offrez un cadeau neutre, soigné et dans le plafond fixé ; Les Belles Comtoises, vaches
          montbéliardes en chocolat praliné noisette de Mélanie et Cédric Brun à Charquemont (Doubs), en réglette de 6,
          en sont un, à découvrir sur <Link href="/belles-comtoises#coffrets">la page des coffrets</Link>.
        </p>
      </Encadre>
    </>
  )
}
