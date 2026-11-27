import Link from 'next/link'
import { Cta, Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'
import { CONDITIONNEMENT } from '@/lib/catalogue'

export const faq: QuestionFaq[] = [
  {
    question: 'Combien de mignardises dans un café gourmand ?',
    reponse:
      'Trois ou quatre, rarement plus. Au-delà, l’assiette devient un dessert complet et perd ce qui fait le café gourmand : goûter un peu de tout sans sortir de table alourdi. Mieux vaut trois bouchées bien différentes que six variations sur le même thème.',
  },
  {
    question: 'Que mettre dans un café gourmand au restaurant ?',
    reponse:
      'Une pièce crémeuse (mousse, crème, panna cotta en verrine), une pièce fondante ou moelleuse (financier, moelleux, part de tarte), une note fraîche ou fruitée (sorbet, salade de fruits, fruit poché) et une bouchée de chocolat croquante, prête à servir. Cet équilibre de textures compte plus que le nombre de pièces.',
  },
  {
    question: 'Quelle bouchée chocolat mettre dans un café gourmand ?',
    reponse:
      'Une pièce qui ne demande aucune préparation et se mange en une fois : une orangette, un petit chocolat moulé ou des grains de café enrobés. Les petits poissons, petits beurres en chocolat, orangettes et grains de café enrobés de Mélanie et Cédric Brun, fabriqués à Charquemont (Doubs) et emballés un par un, sont conçus pour l’assiette des cafés, restaurants et hôtels.',
  },
  {
    question: 'Peut-on proposer un thé gourmand ?',
    reponse:
      'Oui, sur la même assiette, en remplaçant l’expresso par un thé ou une infusion. Les pièces très amères ou très caféinées vont moins bien avec un thé vert ou blanc : une orangette au chocolat noir ou une mignardise aux fruits s’y accordent mieux.',
  },
]

export default function MignardisesCafeGourmandRestaurant() {
  return (
    <>
      <p className="lead">
        Un café gourmand se compose d’un café, le plus souvent un expresso, servi avec trois ou quatre mignardises en
        format réduit, à la place d’un dessert. Pour bien le composer au restaurant, il faut varier les textures (une
        crème, un moelleux, une note fraîche, une bouchée croquante), garder chaque pièce petite et prévoir au moins un
        élément prêt à servir pour tenir le rythme du service.
      </p>

      <h2>Qu’est-ce qu’un café gourmand, exactement ?</h2>
      <p>
        C’est une assiette de fin de repas : la tasse de café au centre ou à une extrémité, et autour, quelques desserts
        miniatures. Le client n’a pas à choisir entre un dessert et un café : il a les deux, en petite quantité. Il n’en
        existe aucune recette officielle, chaque maison compose le sien selon sa carte, la saison et ce que la cuisine
        peut dresser vite.
      </p>
      <p>
        Pour l’établissement, c’est une ligne de carte qui fonctionne à condition d’être pensée comme un vrai dessert, pas
        comme un plateau de restes. Le client juge l’assiette d’un coup d’œil : quatre pièces bien distinctes, nettes et
        de la même taille donnent une impression de soin que trois parts découpées au hasard ne donnent pas.
      </p>

      <h2>Combien de mignardises mettre dans un café gourmand ?</h2>
      <p>
        Trois ou quatre suffisent. C’est assez pour donner le choix et faire voyager la cuillère, pas assez pour couper
        la fin du repas. Les assiettes qui en alignent sept ou huit transforment le café gourmand en buffet de desserts :
        elles coûtent plus de travail en cuisine et laissent souvent des pièces entamées.
      </p>
      <p>Quelques repères de taille, pièce par pièce :</p>
      <ul>
        <li>
          <strong>Une à deux cuillerées</strong> pour une crème ou une mousse servie en verrine.
        </li>
        <li>
          <strong>Deux bouchées</strong> pour un moelleux, un financier ou une part de tarte.
        </li>
        <li>
          <strong>Une seule bouchée</strong> pour la pièce chocolat, qui se mange avec les doigts, sans couverts.
        </li>
      </ul>

      <h2>Comment équilibrer les mignardises de l’assiette ?</h2>
      <p>
        Le piège le plus courant est la répétition : une mousse au chocolat, un fondant au chocolat et une truffe sur la
        même assiette, c’est trois fois la même sensation. Pensez plutôt en contrastes :
      </p>
      <ul>
        <li>
          <strong>Les textures</strong> : un crémeux (mousse, crème brûlée, panna cotta), un moelleux (financier,
          madeleine, part de tarte), un croquant (sablé, praliné, chocolat enrobé).
        </li>
        <li>
          <strong>Le chaud et le froid</strong> : une boule de glace ou de sorbet réveille une assiette de pâtisseries ;
          servez-la en dernier, au moment d’envoyer.
        </li>
        <li>
          <strong>La note fraîche</strong> : un fruit, un agrume, une compotée. Elle allège l’ensemble après un repas
          copieux.
        </li>
        <li>
          <strong>Les couleurs</strong> : une assiette où tout est brun paraît lourde. Le blanc d’une crème, le rouge
          d’un fruit, l’orange d’une écorce confite (celle d’une{' '}
          <Link href="/orangettes">orangette</Link>, par exemple) la rendent appétissante.
        </li>
      </ul>
      <p>
        Le chocolat reste attendu dans un café gourmand, mais une seule fois, sous une forme nette. Pour le choisir selon
        le café servi, notre article sur <Link href="/blog/chocolat-et-cafe-accords">l’accord café chocolat</Link> donne
        les repères, du ristretto au café allongé.
      </p>

      <h2>Quelle place pour le chocolat dans un café gourmand ?</h2>
      <p>
        La bouchée chocolat a un rôle à part : c’est la pièce qu’on peut garder pour la fin, avec la dernière gorgée
        de café. Elle doit donc se tenir à température de salle, ne pas fondre au contact d’une verrine ou d’une
        boule de glace, et se manger en une fois.
      </p>
      <p>
        C’est aussi la seule pièce qui peut ne rien demander à la cuisine. Les{' '}
        <Link href="/orangettes">orangettes enrobées de chocolat noir</Link>, les{' '}
        <Link href="/grains-de-cafe">grains de café enrobés de chocolat noir</Link>, les petits poissons et les petits
        beurres en chocolat de Mélanie et Cédric Brun arrivent prêts à poser sur l’assiette, chacun dans son sachet, moulés
        ou enrobés puis emballés dans l’atelier de Charquemont (Doubs). Pendant que la pâtisserie dresse les crèmes et
        les moelleux, la salle ajoute la pièce chocolat au dernier moment.
      </p>

      <Figure
        src="/images/orangettes/orangette-the.webp"
        alt="Orangette enrobée de chocolat noir dans son sachet transparent, posée devant une tasse en verre remplie de thé ambré"
        width={1535}
        height={1024}
        legende="Une orangette dans son sachet : la pièce chocolat qui accompagne aussi bien le thé que le café."
      />

      <h2>Quel chocolat de la maison pour quelle assiette ?</h2>
      <p>
        Chacune de nos gammes professionnelles répond à un type de café gourmand. Choisissez celle qui complète ce que
        votre cuisine sert déjà :
      </p>
      <ul>
        <li>
          <strong>Une assiette riche en crèmes et en chocolat</strong> : l’orangette, écorce d’orange confite et cacao
          intense, apporte la note d’agrume qui manque et un croquant qui tranche avec le crémeux.
        </li>
        <li>
          <strong>Une carte d’expressos serrés</strong> : les grains de café enrobés de chocolat noir, trois par sachet,
          prolongent l’arôme du café et se glissent sur le bord de l’assiette sans prendre de place.
        </li>
        <li>
          <strong>Une clientèle familiale ou de passage</strong> : les{' '}
          <Link href="/poissons">petits poissons en chocolat</Link>, en quatre recettes (lait « fondant et généreux »,
          noir « puissant et équilibré », noir au café, blanc « crémeux et vanillé »), permettent de varier la pièce d’une
          table à l’autre.
        </li>
        <li>
          <strong>Une assiette autour du biscuit et du goûter</strong> : les{' '}
          <Link href="/petits-beurres">petits beurres en chocolat</Link>, moulés comme le biscuit, font le lien avec un
          sablé ou un financier et amusent le client avant même d’être ouverts.
        </li>
      </ul>
      <p>
        Toutes ces pièces sont emballées une à une : celles qui ne partent pas en salle retournent en réserve au lieu
        d’être jetées en fin de service.
      </p>

      <h2>Comment préparer le café gourmand pendant le service ?</h2>
      <p>
        Le café gourmand se commande en fin de repas, au moment où la salle est la plus chargée et où la cuisine
        commence à ranger. Tout ce qui peut être prêt avant le service doit l’être :
      </p>
      <ol>
        <li>
          <strong>Le matin</strong> : crèmes et mousses coulées en verrines, moelleux cuits et portionnés, fruits
          taillés.
        </li>
        <li>
          <strong>Avant le service</strong> : assiettes ou ardoises sorties et comptées, pièces chocolat disposées dans
          un bac près du poste café, loin de la machine et de sa vapeur.
        </li>
        <li>
          <strong>À la commande</strong> : on dresse les pièces froides, on ajoute la bouchée chocolat, puis la glace en
          dernier si la carte en prévoit une.
        </li>
        <li>
          <strong>À l’envoi</strong> : le café part en même temps que l’assiette, jamais avant. Un café servi seul refroidit
          pendant que le client attend ses mignardises.
        </li>
      </ol>
      <p>
        Pour garder les chocolats en bon état en réserve, suivez nos{' '}
        <Link href="/blog/comment-conserver-le-chocolat">conseils de conservation du chocolat</Link> : un endroit frais,
        sec, sans odeur forte, à l’abri de la lumière.
      </p>

      <h2>Comment dresser un café gourmand ?</h2>
      <p>
        Une assiette longue ou une ardoise permet d’aligner les pièces dans l’ordre où on les goûte : de la plus fraîche
        à la plus intense, la bouchée chocolat près de la tasse. Une assiette ronde fonctionne aussi, la tasse au centre
        et les mignardises autour. Dans les deux cas :
      </p>
      <ul>
        <li>Laissez un peu d’espace entre les pièces : une assiette surchargée paraît négligée.</li>
        <li>Posez la cuillère de la verrine à côté d’elle, pas dans la soucoupe du café.</li>
        <li>Gardez la même composition pendant toute une saison, pour que la salle la connaisse par cœur.</li>
      </ul>

      <h2>Et le thé gourmand ?</h2>
      <p>
        Rien n’empêche de proposer la même assiette avec un thé ou une infusion. Il suffit d’ajuster la pièce
        chocolat : les grains de café enrobés se marient moins naturellement avec un thé vert, alors qu’une orangette au chocolat noir ou un
        petit chocolat au lait s’accordent avec la plupart des thés noirs et des infusions fruitées. Annoncez-le sur la
        carte : un client qui ne boit pas de café peut ainsi, lui aussi, finir son repas sur une assiette gourmande.
      </p>

      <Encadre titre="Commander pour vos cafés gourmands" sombre>
        <p>
          Nos poissons, petits beurres et orangettes sont vendus aux professionnels par cartons de {CONDITIONNEMENT}{' '}
          pièces, et nos grains de café enrobés en sachets de trois grains, tous emballés un par un et livrés en France
          métropolitaine. Créez votre compte avec le SIRET de votre établissement pour voir les tarifs et commander en
          ligne.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Cta href="/orangettes" clair>
            Découvrir les orangettes
          </Cta>
          <Cta href="/professionnels" clair>
            Toutes les gammes pros
          </Cta>
        </div>
      </Encadre>
    </>
  )
}
