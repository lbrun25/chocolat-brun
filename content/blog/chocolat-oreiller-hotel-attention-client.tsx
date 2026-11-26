import Link from 'next/link'
import { Cta, Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'
import { CONDITIONNEMENT } from '@/lib/catalogue'

export const faq: QuestionFaq[] = [
  {
    question: 'Pourquoi les hôtels mettent-ils un chocolat sur l’oreiller ?',
    reponse:
      'Parce que ce chocolat dit au client, sans un mot, que sa chambre a été préparée pour la nuit pendant son absence. Posé au moment de la couverture du soir, il transforme un geste d’entretien en attention personnelle.',
  },
  {
    question: 'Quel chocolat mettre sur l’oreiller d’un hôtel ?',
    reponse:
      'Une bouchée emballée individuellement, d’une forme reconnaissable, plutôt au lait ou au noir. Les petits poissons et les petits beurres en chocolat de Mélanie et Cédric Brun, moulés et emballés un par un dans leur atelier de Charquemont (Doubs), sont faits pour ce geste : ils se posent sur le linge sans le toucher et s’emportent dans un bagage.',
  },
  {
    question: 'Combien de chocolats prévoir par chambre et par nuit ?',
    reponse:
      'Une pièce par client et par nuit où la couverture est faite, ou une par chambre si l’attention est déposée à l’arrivée. Le calcul se fait sur les nuitées occupées, pas sur le nombre de chambres de l’établissement, avec une petite marge pour les remplacements.',
  },
  {
    question: 'Une chambre d’hôtes ou un gîte peut-il offrir un chocolat d’accueil ?',
    reponse:
      'Oui, et c’est même plus simple : sans service du soir, le chocolat se dépose avant l’arrivée, sur le plateau d’accueil ou la table de nuit, avec un mot manuscrit. Une pièce emballée tient sans souci jusqu’à l’arrivée du client, à condition de ne pas la poser près d’un radiateur ou au soleil.',
  },
]

export default function ChocolatOreillerHotelAttentionClient() {
  return (
    <>
      <p className="lead">
        Le chocolat sur l’oreiller est la petite pièce qu’un hôtel dépose dans la chambre au moment de la couverture du
        soir, quand le lit est entrouvert et la lumière tamisée pour la nuit. Pour faire son effet, il doit être petit,
        emballé un par un et posé au bon endroit. Voici comment l’organiser, que l’on tienne un grand hôtel, un hôtel de
        ville ou trois chambres d’hôtes.
      </p>

      <h2>Que signifie le chocolat sur l’oreiller à l’hôtel ?</h2>
      <p>
        Le client rentre de dîner. Les rideaux sont tirés, le couvre-lit a disparu, un coin de drap est replié, et un
        chocolat l’attend. Ce chocolat est la signature de la <strong>couverture</strong> (le « turndown » des hôtels
        anglophones) : il prouve que quelqu’un est passé, et que ce passage était pour lui.
      </p>
      <p>
        Sans lui, la préparation du soir passe souvent inaperçue : un lit ouvert, des rideaux tirés, rien qui dise que
        c’était pour ce client-là. Avec lui, elle devient un cadeau, pour une bouchée qui pèse peu dans le prix d’une
        nuitée.
      </p>

      <h2>Faut-il le poser à l’arrivée ou à la couverture du soir ?</h2>
      <p>Les deux se font. Le choix dépend surtout de l’équipe dont vous disposez en soirée.</p>
      <ul>
        <li>
          <strong>À la couverture du soir</strong> : c’est l’usage classique, et le plus marquant. Il suppose une équipe
          aux étages en fin de journée, qui repasse dans chaque chambre occupée.
        </li>
        <li>
          <strong>À l’arrivée</strong> : le chocolat attend sur le bureau ou la table de nuit avec un mot de bienvenue.
          C’est la solution des petits hôtels, des chambres d’hôtes et des gîtes, qui n’ont personne aux étages le soir.
        </li>
        <li>
          <strong>Au ménage du matin</strong>, pour les longs séjours : une pièce renouvelée chaque jour montre que la
          chambre a été suivie, même sans service du soir.
        </li>
      </ul>
      <p>
        Évitez de cumuler les trois : une attention par jour suffit, et elle compte d’autant plus qu’elle arrive au même
        moment chaque soir.
      </p>

      <h2>Quel chocolat choisir pour l’oreiller ?</h2>
      <p>
        Sur un lit, les contraintes ne sont pas celles d’une soucoupe de café. Le chocolat repose sur du linge blanc,
        le client s’allonge parfois sans le voir, et il le garde souvent pour plus tard, dans une poche ou une valise.
        Trois critères en découlent.
      </p>
      <h3>Une pièce emballée une par une</h3>
      <p>
        Le sachet protège le linge du chocolat et le chocolat des mains de l’équipe. Il permet aussi au client de
        l’emporter sans se salir. Un chocolat nu sur une taie d’oreiller, c’est une tache possible et un geste moins
        net.
      </p>
      <h3>Une bouchée à la forme reconnaissable</h3>
      <p>
        Le soir, personne ne veut une gourmandise copieuse. Une bouchée suffit, et sa forme fait le reste : les{' '}
        <Link href="/poissons">petits poissons en chocolat</Link> de Mélanie et Cédric Brun, moulés puis emballés un par un
        dans l’atelier de Charquemont (Doubs), se posent sur un oreiller comme un clin d’œil, et les{' '}
        <Link href="/petits-beurres">petits beurres en chocolat</Link>, dessinés comme le biscuit, font sourire avant
        même d’être ouverts.
      </p>
      <h3>Une recette qui plaît au plus grand nombre</h3>
      <p>
        Vous ne connaissez pas les goûts de chaque client : le chocolat au lait (« fondant et généreux » pour nos
        poissons) est le choix le plus consensuel, le noir (« puissant et équilibré ») convient aux amateurs de cacao,
        le blanc aux plus gourmands. Gardez le noir au café pour le service du café, où il prolonge l’expresso (voir{' '}
        <Link href="/blog/chocolat-et-cafe-accords">nos accords chocolat et café</Link>).
      </p>

      <Figure
        src="/images/galerie/chocolat_emballage_vrac.jpg"
        alt="Plateau doré à bords moulurés rempli de petits chocolats emballés un par un dans des sachets brun foncé brillants, marqués « Chocolat » et ornés d’une cabosse de cacao"
        width={4032}
        height={3024}
        legende="Emballés un par un dans l’atelier de Charquemont : prêts à rejoindre la tournée des étages."
      />

      <h2>Comment nos chocolats répondent à la couverture du soir</h2>
      <p>
        Nous fabriquons nos gammes professionnelles pour ces petits gestes de l’hôtellerie et de la restauration.
        Concrètement, pour vos chambres :
      </p>
      <ul>
        <li>
          <strong>Les poissons</strong>, en lait, noir, noir au café et blanc : une bouchée de 4 g, idéale pour
          l’oreiller, une par client.
        </li>
        <li>
          <strong>Les petits beurres</strong>, dans les mêmes recettes : une forme que tout le monde reconnaît, pour une
          attention un peu plus généreuse.
        </li>
        <li>
          <strong>Les <Link href="/orangettes">orangettes</Link></strong>, écorce d’orange confite enrobée de chocolat
          noir : pour un soir de fête, une suite ou la dernière nuit d’un séjour.
        </li>
        <li>
          <strong>Les grains de café enrobés</strong>, en sachet de trois : à poser près de la bouilloire ou de la
          machine à café de la chambre, pour le café du matin.
        </li>
      </ul>
      <p>
        Pour un long séjour, alternez : poisson le premier soir, petit beurre le deuxième, orangette le dernier. Le
        client remarque que l’attention change, donc qu’elle n’est pas automatique.
      </p>

      <h2>Où poser le chocolat dans la chambre ?</h2>
      <ul>
        <li>
          <strong>Sur l’oreiller</strong>, au centre, éventuellement sur une petite carte : c’est le geste attendu, et le
          plus visible.
        </li>
        <li>
          <strong>Sur la table de nuit</strong>, près du réveil ou de la lampe de chevet, si les oreillers sont
          nombreux ou décoratifs : le client les écarte souvent d’un bras, chocolat compris.
        </li>
        <li>
          <strong>Jamais près d’une source de chaleur</strong> : radiateur, plafonnier halogène, rebord de fenêtre au
          soleil, arrière d’un minibar. Une pièce qui a ramolli puis durci fait moins plaisir qu’aucune pièce.
        </li>
      </ul>

      <h2>Combien de chocolats prévoir par chambre et par nuit ?</h2>
      <p>
        La règle tient en une ligne : <strong>une pièce par client et par nuit de couverture</strong>, ou une par
        chambre si elle est déposée à l’arrivée. On compte les nuitées occupées, pas le nombre de chambres.
      </p>
      <p>
        Un exemple, avec des chiffres fictifs pour poser le calcul : un hôtel de 20 chambres en remplit en moyenne 15
        par nuit, avec deux personnes par chambre. Cela fait 30 pièces par soir, donc 900 sur un mois de trente nuits.
        Un carton de {CONDITIONNEMENT} pièces couvre alors environ {Math.floor(CONDITIONNEMENT / 30)} soirs. Ajoutez
        une petite marge pour les chambres refaites deux fois et les pièces abîmées, et recalculez à chaque changement
        de saison : un hôtel de montagne ne remplit pas en novembre comme en février.
      </p>

      <h2>Comment stocker les chocolats côté étages ?</h2>
      <p>
        Le chocolat d’oreiller a ses propres pièges, différents de ceux de la cuisine. Les plus fréquents :
      </p>
      <ul>
        <li>
          <strong>Le chariot de ménage</strong>, où il côtoie toute la journée produits d’entretien et désodorisants :
          n’y mettez que la quantité de la tournée du soir.
        </li>
        <li>
          <strong>La lingerie</strong>, réchauffée par les sèche-linge et la repasseuse : une pièce chaude, à éviter
          pour le chocolat.
        </li>
        <li>
          <strong>La réserve des étages</strong>, si elle est fraîche, sèche et fermée : le bon endroit, dans une boîte
          close, cartons ouverts dans l’ordre d’arrivée.
        </li>
      </ul>
      <p>
        Pour les règles générales (température, humidité, blanchiment), reportez-vous à{' '}
        <Link href="/blog/comment-conserver-le-chocolat">notre guide de conservation du chocolat</Link>.
      </p>

      <h2>Que mettre à côté du chocolat, ou à sa place ?</h2>
      <p>
        Le chocolat n’a pas besoin d’être seul. Quelques compléments qui renforcent le geste, sans le compliquer :
      </p>
      <ul>
        <li>
          <strong>Une carte</strong> écrite à la main, avec le prénom du client, la météo du lendemain ou l’heure du
          petit-déjeuner.
        </li>
        <li>
          <strong>Une bouteille d’eau</strong> sur la table de nuit, le geste pratique qui accompagne le geste gourmand.
        </li>
        <li>
          <strong>Un produit d’ici</strong> : pour un hôtel de Franche-Comté, un chocolat fabriqué dans le Haut-Doubs
          raconte la région autant qu’il régale. Ailleurs, dites simplement d’où il vient.
        </li>
      </ul>
      <p>
        Le même chocolat peut d’ailleurs servir dans tout l’établissement : avec le café du restaurant (voir{' '}
        <Link href="/blog/chocolat-cafe-restaurant-hotel">le petit chocolat servi avec le café</Link>), au comptoir de la
        réception, ou dans la chambre d’un séjour de fêtes, dont nous parlons dans{' '}
        <Link href="/blog/menu-de-fetes-restaurant-attention-clients">notre article sur les menus de fêtes</Link>.
      </p>

      <Encadre titre="Commander pour vos chambres" sombre>
        <p>
          Nos poissons, petits beurres et orangettes sont vendus aux professionnels par cartons de {CONDITIONNEMENT}{' '}
          pièces, emballées une par une et livrées en France métropolitaine. Créez votre compte avec le SIRET de votre
          établissement pour voir les tarifs et commander en ligne.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Cta href="/poissons" clair>
            Découvrir les poissons
          </Cta>
          <Cta href="/professionnels" clair>
            Toutes les gammes pros
          </Cta>
        </div>
      </Encadre>
    </>
  )
}
