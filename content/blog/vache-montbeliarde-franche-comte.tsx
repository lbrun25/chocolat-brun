import Link from 'next/link'
import { Cta, Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'

export const faq: QuestionFaq[] = [
  {
    question: 'Pourquoi la vache montbéliarde porte-t-elle ce nom ?',
    reponse:
      'Elle doit son nom au pays de Montbéliard, dans le nord de la Franche-Comté, où la race a été sélectionnée à partir du bétail suisse amené par des familles d’éleveurs mennonites au XVIIIe siècle.',
  },
  {
    question: 'Quels fromages sont fabriqués avec le lait de montbéliarde ?',
    reponse:
      'Les grands fromages AOP du massif jurassien, comme le Comté, le Morbier ou le Mont d’Or, sont fabriqués avec le lait de vaches montbéliardes ou simmentales françaises, nourries à l’herbe et au foin.',
  },
  {
    question: 'Comment reconnaître une vache montbéliarde ?',
    reponse:
      'À sa robe « pie rouge » : un pelage blanc marqué de grandes taches rouge-brun, une tête généralement blanche et un mufle clair. Dans le Haut-Doubs, elle porte souvent une clarine au cou.',
  },
]

export default function VacheMontbeliarde() {
  return (
    <>
      <p className="lead">
        Impossible de traverser le Haut-Doubs sans la croiser : robe blanche tachée de rouge, clarine qui tinte au cou,
        silhouette paisible dans les prés d’altitude. La vache montbéliarde est bien plus qu’une race laitière, c’est un
        symbole de la Franche-Comté. Au point que nous lui avons consacré nos{' '}
        <Link href="/">Belles Comtoises</Link>, de petites vaches en chocolat.
      </p>

      <h2>Une race née aux portes de la Suisse</h2>
      <p>
        L’histoire de la montbéliarde commence au XVIIIe siècle. Des familles d’éleveurs mennonites, venues de Suisse,
        s’installent dans la région de Montbéliard avec leur bétail. Réputés pour la qualité de leur élevage, ils
        sélectionnent patiemment des animaux robustes, bons laitiers et adaptés aux hivers rigoureux du massif jurassien.
      </p>
      <p>
        À la fin du XIXe siècle, la race est officiellement baptisée <strong>montbéliarde</strong>, du nom du pays qui
        l’a vue naître. Elle s’étend ensuite à tout le Doubs, au Jura et bien au-delà : elle est aujourd’hui la deuxième
        race laitière de France.
      </p>

      <h2>Comment reconnaître une montbéliarde ?</h2>
      <ul>
        <li>
          <strong>Une robe « pie rouge »</strong> : un pelage blanc marqué de grandes taches rouge-brun, celles-là mêmes
          qui décorent nos coffrets.
        </li>
        <li>
          <strong>Une tête généralement blanche</strong> et un mufle clair.
        </li>
        <li>
          <strong>Une clarine</strong> au cou, dans les pâturages du Haut-Doubs : la cloche qui permet de repérer le
          troupeau et dont le tintement fait partie du paysage sonore de nos montagnes.
        </li>
      </ul>

      <Figure
        src="/images/blog/super-comice-morteau-2026/emballage-belles-comtoises.jpg"
        alt="Réglette Les Belles Comtoises au décor pie rouge, inspiré de la robe de la vache montbéliarde"
        width={1086}
        height={1448}
        ajustement="contain"
        legende="Le décor de nos coffrets reprend la robe pie rouge de la montbéliarde."
      />

      <h2>La reine du Comté</h2>
      <p>
        Si la montbéliarde est si chère au cœur des Francs-Comtois, c’est aussi parce qu’elle est indissociable de nos
        grands fromages. Les cahiers des charges du <strong>Comté</strong>, du <strong>Morbier</strong> ou du{' '}
        <strong>Mont d’Or</strong> réservent leur production au lait de vaches montbéliardes ou simmentales françaises,
        nourries à l’herbe des prés en été et au foin en hiver.
      </p>
      <p>
        Cette alimentation, liée à la flore très riche des prairies d’altitude, donne au lait les arômes que l’on retrouve
        ensuite dans chaque meule. La montbéliarde façonne ainsi le paysage, l’économie et le goût de toute une région.
      </p>

      <h2>La star des comices agricoles</h2>
      <p>
        Chaque année, les comices sont l’occasion pour les éleveurs de présenter leurs plus belles bêtes, toilettées et
        parées de leurs plus belles clarines. Juges, familles et curieux s’y pressent pour admirer la reine du Haut-Doubs.
        Le{' '}
        <Link href="/blog/super-comice-morteau-2026">Super Comice du patrimoine de Morteau, le 24 octobre 2026</Link>, en
        est un bel exemple : nous y serons, avec nos Belles Comtoises.
      </p>

      <h2>De la prairie au chocolat : nos Belles Comtoises</h2>
      <p>
        C’est cet attachement à la montbéliarde qui a donné naissance aux <strong>Belles Comtoises</strong> : de petites
        vaches couchées, moulées dans notre atelier de Charquemont, en chocolat pur beurre de cacao et garnies d’un
        praliné noisette. Elles existent en quatre recettes, au chocolat au lait, noir, blanc et caramel.
      </p>
      <p>
        Présentées en réglette de 6 ou en boîtes de 12, 20 et 30, elles se prêtent aussi bien à un petit plaisir qu’à{' '}
        <Link href="/blog/cadeau-gourmand-franche-comte">un cadeau 100 % franc-comtois</Link>.
      </p>

      <Encadre titre="Le saviez-vous ?">
        <p>
          « Les Belles Comtoises » est une marque déposée par la Fédération des Belles Comtoises de Franche-Comté. Nos
          petites vaches en sont l’hommage chocolaté, fabriqué artisanalement dans le Haut-Doubs.
        </p>
        <div className="pt-2">
          <Cta href="/#coffrets">Voir les coffrets</Cta>
        </div>
      </Encadre>
    </>
  )
}
