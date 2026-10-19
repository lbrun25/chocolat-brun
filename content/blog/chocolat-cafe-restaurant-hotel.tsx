import Link from 'next/link'
import { Cta, Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'
import { CONDITIONNEMENT } from '@/lib/catalogue'

export const faq: QuestionFaq[] = [
  {
    question: 'Quel poids de chocolat servir avec un café ?',
    reponse:
      'Entre 4 et 6 grammes : une bouchée qui se déguste en une fois, sans couper l’appétit ni alourdir la fin du repas. Nos poissons pèsent 4 g, nos orangettes 5 g et nos petits beurres 6 g.',
  },
  {
    question: 'Pourquoi choisir des chocolats emballés individuellement ?',
    reponse:
      'L’emballage individuel garantit l’hygiène, protège le chocolat de l’humidité et des odeurs, évite le gaspillage (une pièce non servie reste vendable) et permet de le poser directement sur la soucoupe.',
  },
  {
    question: 'Comment commander des chocolats pour un restaurant ou un hôtel ?',
    reponse: `Créez votre compte professionnel avec le SIRET de votre établissement pour accéder aux tarifs, puis commandez en ligne par cartons de ${CONDITIONNEMENT} pièces, livrés partout en France métropolitaine.`,
  },
]

export default function ChocolatCafeRestaurantHotel() {
  return (
    <>
      <p className="lead">
        Il ne pèse que quelques grammes, mais c’est souvent lui qui conclut l’expérience d’un client : le petit chocolat
        posé sur la soucoupe du café. Restaurants, hôtels, bars et salons de thé, voici pourquoi ce détail compte, et
        comment bien le choisir.
      </p>

      <h2>Pourquoi offrir un chocolat avec le café ?</h2>
      <p>
        Le café est le dernier moment du repas, celui dont on se souvient en repartant. Une mignardise chocolatée le
        transforme en attention : elle signale le soin apporté à chaque détail et prolonge le plaisir de la table.
      </p>
      <ul>
        <li>
          <strong>Une touche de générosité</strong> : un geste offert, simple, que les clients remarquent et apprécient.
        </li>
        <li>
          <strong>Un accord naturel</strong> : l’amertume du café met en valeur le fondant du chocolat, et inversement.
        </li>
        <li>
          <strong>Une image de qualité</strong> : un chocolat artisanal, fabriqué en France, raconte quelque chose de votre
          maison.
        </li>
      </ul>

      <Figure
        src="/images/galerie/the_chocolat.jpg"
        alt="Tasse de thé servie avec un petit chocolat et une tablette"
        width={1536}
        height={1024}
        legende="Avec un café, un thé ou une infusion, le petit chocolat signe la fin du repas."
      />

      <h2>Bien choisir son format</h2>
      <h3>Le bon poids : entre 4 et 6 grammes</h3>
      <p>
        Une seule bouchée, qui fond sans couper l’appétit ni alourdir la fin du repas. Au-delà, le chocolat devient un
        dessert. En deçà, il passe inaperçu.
      </p>
      <h3>Une forme qui se remarque</h3>
      <p>
        Un carré anonyme s’oublie vite. Une forme reconnaissable, comme nos <Link href="/poissons">petits poissons</Link>{' '}
        de 4 g ou nos <Link href="/petits-beurres">petits beurres</Link> de 6 g, moulés comme le célèbre biscuit, fait
        sourire et donne envie de goûter.
      </p>
      <h3>Plusieurs saveurs pour tous les goûts</h3>
      <p>
        Le chocolat au lait plaît au plus grand nombre, le noir aux amateurs de cacao, le blanc aux gourmands. Le noir au
        café prolonge l’arôme de l’expresso. Et pour accompagner un thé ou un digestif, les{' '}
        <Link href="/orangettes">orangettes enrobées de chocolat noir</Link> (5 g) apportent une note d’agrume
        élégante.
      </p>

      <h2>Emballé individuellement : un vrai atout en salle</h2>
      <ul>
        <li>
          <strong>Hygiène</strong> : chaque pièce reste protégée jusqu’au client, sans manipulation.
        </li>
        <li>
          <strong>Conservation</strong> : l’emballage protège le chocolat de l’air, de l’humidité et des odeurs de cuisine
          (voir <Link href="/blog/comment-conserver-le-chocolat">nos conseils de conservation</Link>).
        </li>
        <li>
          <strong>Zéro gaspillage</strong> : une pièce non servie retourne en réserve.
        </li>
        <li>
          <strong>Rapidité de service</strong> : on la pose directement sur la soucoupe, en un geste.
        </li>
      </ul>

      <h2>Au-delà du café : d’autres usages</h2>
      <ul>
        <li>
          <strong>Hôtels</strong> : en chambre, sur l’oreiller à la couverture du soir, ou à l’accueil.
        </li>
        <li>
          <strong>Traiteurs et événementiel</strong> : en fin de buffet, de cocktail ou de séminaire.
        </li>
        <li>
          <strong>Entreprises</strong> : en salle de réunion, à l’accueil clients ou dans les colis de fin d’année.
        </li>
        <li>
          <strong>Épiceries fines et caves</strong> : à la caisse, comme petite douceur à emporter.
        </li>
      </ul>

      <h2>Pourquoi un artisan plutôt qu’un industriel ?</h2>
      <p>
        Nos chocolats sont moulés, refroidis puis emballés un par un dans notre atelier de Charquemont, dans le Haut-Doubs,
        où nous travaillons depuis 1999. Vous savez d’où vient ce que vous servez, et vous pouvez le dire à vos clients.
        Pour voir les coulisses, faites un tour dans <Link href="/galerie">notre galerie</Link>.
      </p>

      <Encadre titre="Commander pour votre établissement" sombre>
        <p>
          Nos poissons, petits beurres et orangettes sont vendus par cartons de {CONDITIONNEMENT} pièces, livrés partout
          en France métropolitaine. Créez votre compte professionnel avec le SIRET de votre établissement pour accéder
          aux tarifs et commander en ligne.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Cta href="/poissons" clair>
            Découvrir les poissons
          </Cta>
          <Cta href="/espace-pro/inscription" clair>
            Créer mon compte pro
          </Cta>
        </div>
      </Encadre>
    </>
  )
}
