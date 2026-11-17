import Link from 'next/link'
import { Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'
import { CONDITIONNEMENT, grainsCafe } from '@/lib/catalogue'

export const faq: QuestionFaq[] = [
  {
    question: 'Quand envoyer ses cadeaux clients de fin d’année ?',
    reponse:
      'Idéalement pour qu’ils arrivent dans la première quinzaine de décembre : vos clients sont encore au bureau, et votre attention ne se perd pas parmi les colis des derniers jours avant les congés. Cela suppose de commander dès la fin novembre.',
  },
  {
    question: 'Chocolat noir, au lait ou blanc : lequel offrir à des clients ?',
    reponse:
      'Quand vous ne connaissez pas les goûts de chacun, un assortiment est le choix le plus sûr. Le chocolat au lait plaît au plus grand nombre, le noir aux amateurs de cacao ; mêler les deux, voire ajouter du blanc ou du caramel, évite de deviner.',
  },
  {
    question: 'Un cadeau d’affaires en chocolat est-il déductible ?',
    reponse:
      'Les cadeaux d’affaires obéissent à des règles fiscales particulières, pour la déduction des charges comme pour la TVA. Elles dépendent de la valeur unitaire des cadeaux et de leur montant total sur l’année : faites le point avec votre expert-comptable avant de commander.',
  },
  {
    question: 'Comment offrir du chocolat à une équipe entière chez un client ?',
    reponse:
      'Privilégiez un grand coffret à partager, posé à l’accueil ou en salle de pause, ou une coupe de chocolats emballés un à un : chacun se sert quand il veut, et le cadeau profite à toute l’équipe plutôt qu’au seul interlocuteur habituel.',
  },
]

export default function CadeauClientsFinDAnneeChocolatEntreprise() {
  return (
    <>
      <p className="lead">
        Pour remercier ses clients en fin d’année, le chocolat reste un cadeau sûr : il se partage, il se consomme
        pendant les fêtes et il ne s’encombre pas sur un bureau. La réussite tient à trois choix : le format (une boîte
        par client ou des pièces à partager), le moment (avant la mi-décembre) et la provenance, qui donne au cadeau son
        histoire.
      </p>

      <h2>Pourquoi offrir du chocolat à ses clients en fin d’année ?</h2>
      <p>
        Le chocolat est associé aux fêtes depuis longtemps, de la Saint-Nicolas aux papillotes du réveillon (nous
        racontons ces coutumes dans{' '}
        <Link href="/blog/chocolats-de-noel-traditions">l’origine des chocolats de Noël</Link>). Pour une entreprise,
        il a des qualités pratiques :
      </p>
      <ul>
        <li>
          <strong>Il convient à presque tout le monde</strong>, du dirigeant à l’équipe de l’accueil, sans connaître
          les goûts personnels de chacun.
        </li>
        <li>
          <strong>Il ne crée pas de gêne</strong> : c’est une attention, pas un objet de valeur qui pourrait mettre le
          destinataire mal à l’aise vis-à-vis des règles internes de sa propre société.
        </li>
        <li>
          <strong>Il se partage</strong> : une boîte ouverte en réunion ou en salle de pause fait parler de vous à
          plusieurs personnes, pas à une seule.
        </li>
        <li>
          <strong>Il ne finit pas dans un tiroir</strong>, à l’inverse des objets publicitaires que l’on reçoit en
          nombre à cette période.
        </li>
      </ul>

      <h2>Quel format choisir : un coffret par client ou des chocolats à partager ?</h2>
      <p>
        Tout dépend de la relation. On distingue en général trois cas.
      </p>
      <h3>Le coffret individuel, pour vos interlocuteurs principaux</h3>
      <p>
        Une boîte au nom du client, remise en main propre ou expédiée, reste le geste le plus personnel. Une petite
        boîte suffit pour un contact ; une grande se justifie quand elle sera ouverte à plusieurs. Choisissez un
        coffret dont la présentation se suffit à elle-même : il doit pouvoir être offert tel quel, sans papier cadeau
        supplémentaire.
      </p>
      <h3>Le grand format à partager, pour une équipe</h3>
      <p>
        Chez un client où vous travaillez avec cinq ou dix personnes, une grande boîte posée sur la table de la salle
        de pause touche tout le monde. Mieux vaut un seul cadeau généreux que plusieurs petits répartis au hasard.
      </p>
      <h3>Les chocolats emballés un à un, pour l’accueil et les envois</h3>
      <p>
        Les pièces emballées individuellement se glissent dans une enveloppe avec une carte de vœux, se déposent dans
        une coupe à l’accueil de vos locaux pendant tout décembre, ou accompagnent chaque livraison et chaque facture
        de fin d’année. C’est le même principe que le{' '}
        <Link href="/blog/chocolat-cafe-restaurant-hotel">petit chocolat servi avec le café</Link> au restaurant : un
        geste modeste, mais répété à chaque contact.
      </p>

      <Figure
        src="/images/atelier/emballages-cadre.jpg"
        alt="Chocolats emballés un à un dans des sachets marron marqués « Chocolat » et d’une cabosse, posés en vrac sur un plateau doré"
        width={2000}
        height={1500}
        legende="Emballés un à un, les chocolats se servent à l’accueil ou se glissent dans un envoi."
      />

      <h2>Quand commander ses cadeaux clients de Noël ?</h2>
      <p>
        Visez une remise ou une livraison dans la première quinzaine de décembre. Plus tard, vos clients reçoivent
        déjà beaucoup, certains partent en congés et votre cadeau arrive dans un bureau vide. Concrètement :
      </p>
      <ol>
        <li>
          <strong>Début novembre</strong> : dressez la liste des destinataires et fixez votre budget par client.
        </li>
        <li>
          <strong>Fin novembre</strong> : passez commande, surtout pour des quantités importantes : à l’approche des
          fêtes, tout le monde commande en même temps.
        </li>
        <li>
          <strong>Début décembre</strong> : préparez les cartes et les étiquettes d’adresse.
        </li>
        <li>
          <strong>Avant le 15 décembre</strong> : remettez ou expédiez les cadeaux.
        </li>
      </ol>

      <h2>Comment bien présenter un cadeau d’affaires en chocolat ?</h2>
      <ul>
        <li>
          <strong>Une carte manuscrite</strong> : quelques mots signés de la personne qui suit le client valent plus
          qu’un message imprimé. Remerciez pour l’année écoulée, sans parler de vos offres.
        </li>
        <li>
          <strong>Le bon moment dans la relation</strong> : un cadeau qui suit de près une négociation peut être mal
          interprété. Le cadeau de fin d’année remercie, il ne sollicite pas.
        </li>
        <li>
          <strong>La composition visible</strong> : laissez l’étiquette sur la boîte. Le destinataire y trouve la liste
          des ingrédients et peut vérifier ce qu’il consomme, ou ce qu’il fait goûter à ses collègues.
        </li>
        <li>
          <strong>Une histoire à raconter</strong> : un chocolat fabriqué par un artisan, dans une région précise, se
          présente en une phrase sur la carte. C’est ce qui le distingue d’une boîte achetée au dernier moment.
        </li>
      </ul>

      <h2>Comment éviter que les chocolats souffrent pendant le transport ?</h2>
      <p>
        En décembre, le risque vient moins du froid extérieur que des écarts de température : une voiture chauffée,
        un bureau au-dessus d’un radiateur, un colis qui passe du camion froid à une pièce chaude. Le chocolat peut
        alors se couvrir d’un voile blanc, sans danger mais moins joli. Stockez les boîtes dans une pièce fraîche
        jusqu’à leur remise, ne les laissez pas dans un coffre et, si vous les distribuez sur plusieurs jours, gardez-les
        loin des sources de chaleur. Nos{' '}
        <Link href="/blog/comment-conserver-le-chocolat">conseils pour conserver le chocolat</Link> détaillent les
        bonnes conditions.
      </p>

      <h2>Et la fiscalité des cadeaux d’affaires ?</h2>
      <p>
        Les cadeaux offerts à des clients relèvent de règles fiscales propres, aussi bien pour la déduction de la dépense
        que pour la récupération de la TVA, avec des seuils liés à la valeur des cadeaux. Ces seuils sont révisés de
        temps à autre : plutôt que de vous fier à un chiffre lu en ligne, demandez à votre expert-comptable ce qui
        s’applique à votre entreprise cette année, et gardez les factures nominatives de vos achats.
      </p>

      <h2>Ce que propose notre atelier de Charquemont</h2>
      <p>
        Dans notre atelier du Haut-Doubs, nous moulons, enrobons et emballons nous-mêmes nos chocolats. Deux familles
        de produits peuvent servir à vos cadeaux de fin d’année :
      </p>
      <ul>
        <li>
          <strong>Les Belles Comtoises</strong>, nos vaches montbéliardes en chocolat garnies de praliné noisette, en
          lait, noir, blanc ou caramel. Elles se vendent en coffrets de 6, 12, 20 ou 30 sur{' '}
          <Link href="/belles-comtoises#coffrets">la page des coffrets</Link> : la réglette de 6 pour un contact, la
          boîte de 30 pour une équipe.
        </li>
        <li>
          <strong>Notre gamme professionnelle emballée à l’unité</strong> : petits poissons,{' '}
          <Link href="/petits-beurres">petits beurres en chocolat</Link>,{' '}
          <Link href="/orangettes">orangettes</Link> et grains de café enrobés. Elle est livrée par cartons de{' '}
          {CONDITIONNEMENT} pièces ({grainsCafe[0].conditionnement} sachets pour les grains de café), de quoi garnir
          l’accueil ou accompagner tous vos envois de décembre.
        </li>
      </ul>

      <Encadre titre="Commander en tant qu’entreprise">
        <p>
          Notre espace professionnel est ouvert aux entreprises et aux comités d’entreprise : créez un compte avec
          votre numéro SIRET, vérifié auprès du répertoire officiel, pour accéder aux tarifs et commander en ligne.
          Tout est présenté sur <Link href="/professionnels">l’espace professionnels</Link>.
        </p>
      </Encadre>
    </>
  )
}
