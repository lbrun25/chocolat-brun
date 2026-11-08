import Link from 'next/link'
import { Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'

export const faq: QuestionFaq[] = [
  {
    question: 'Quand commence l’Avent ?',
    reponse:
      'Selon l’Église catholique en France, l’Avent commence le quatrième dimanche avant Noël et s’achève le 24 décembre. Le mot vient du latin adventus, « avènement ». La plupart des calendriers de l’Avent du commerce, eux, partent du 1er décembre pour compter vingt-quatre cases.',
  },
  {
    question: 'Qu’y a-t-il dans une papillote ?',
    reponse:
      'Une papillote est une friandise, le plus souvent un chocolat, enveloppée dans un papier brillant aux extrémités frangées. Le papier glissé à l’intérieur porte en général une citation, une devinette ou une blague. Certaines versions contiennent aussi un pétard qui claque quand on tire sur les deux bouts.',
  },
  {
    question: 'Pourquoi offre-t-on des friandises à la Saint-Nicolas ?',
    reponse:
      'Dans la légende, saint Nicolas protège les enfants. Le 6 décembre, il vient récompenser les enfants sages avec des sucreries et des présents. La fête reste très vivante dans l’Est et le Nord de la France ; celle de Nancy figure depuis 2018 à l’Inventaire national du patrimoine culturel immatériel.',
  },
  {
    question: 'Quand acheter ses chocolats de Noël ?',
    reponse:
      'Assez tôt pour avoir le choix, assez tard pour les offrir dans leur fraîcheur. Les chocolats pralinés se dégustent de préférence dans les semaines qui suivent l’achat : fiez-vous à la date indiquée sur l’emballage et gardez-les au frais, entre 15 et 18 °C, en attendant le jour J.',
  },
]

export default function ChocolatsDeNoelTraditions() {
  return (
    <>
      <p className="lead">
        On offre des chocolats à Noël parce que plusieurs coutumes de décembre se sont rejointes : les friandises données
        aux enfants sages à la Saint-Nicolas, l’attente de l’Avent qu’on compte jour après jour, puis, à la fin du XIXe
        siècle, les papillotes fabriquées en grand par les chocolatiers lyonnais. Voici d’où vient chacune de ces
        traditions, et ce qu’elles disent des chocolats que l’on s’offre aujourd’hui.
      </p>

      <h2>Pourquoi offre-t-on du chocolat à Noël ?</h2>
      <p>
        Il n’existe pas une origine unique, mais un calendrier. Décembre est, en France, le mois des petits cadeaux
        sucrés : on en reçoit le 6 décembre pour la Saint-Nicolas, on en découvre un chaque matin dans le calendrier de
        l’Avent, on en partage le soir du réveillon. Le chocolat a pris dans ces rituels la place qu’occupaient les
        fruits secs, les oranges et le pain d’épices.
      </p>
      <p>
        Il a aussi des atouts pratiques. Il se moule en toutes formes, du père Noël au sapin, il se partage par petites
        pièces et il se présente bien en coffret. Et l’hiver lui convient : le beurre de cacao ramollit à la chaleur,
        alors qu’une maison fraîche de décembre le garde ferme et brillant.
      </p>

      <h2>Qu’est-ce que l’Avent, et pourquoi un calendrier en chocolat ?</h2>
      <p>
        <strong>L’Avent</strong> est, selon l’Église catholique en France, la période qui prépare Noël. Il commence le{' '}
        <strong>quatrième dimanche avant Noël</strong> et s’achève le 24 décembre ; le mot vient du latin{' '}
        <em>adventus</em>, « avènement ». C’est aussi le début de l’année liturgique.
      </p>
      <p>
        Le calendrier de l’Avent sert à rendre cette attente visible, surtout pour les enfants : une case par jour, une
        petite surprise derrière chaque fenêtre. La version chocolatée s’est imposée parce qu’une bouchée par jour est
        une récompense simple, qu’on peut glisser dans un emballage plat. Notez un détail : la plupart des calendriers
        vendus démarrent le 1er décembre, quelle que soit la date réelle du premier dimanche de l’Avent.
      </p>

      <h2>Pourquoi la Saint-Nicolas, le 6 décembre, est-elle si gourmande ?</h2>
      <p>
        Dans la légende, saint Nicolas ressuscite trois enfants et devient leur protecteur. La Bibliothèque nationale de
        France le résume ainsi : le saint « vient récompenser les enfants sages et leur offrir des sucreries et des
        présents ». La fête est restée très vivante dans l’Est et le Nord de la France, de Nancy à
        Villeneuve-d’Ascq, où elle a aussi sa fiche à l’inventaire du patrimoine immatériel.
      </p>
      <p>
        À Nancy, elle est même reconnue officiellement : <strong>les fêtes de Saint-Nicolas</strong> sont inscrites
        depuis 2018 à l’Inventaire national du patrimoine culturel immatériel. La fiche du ministère de la Culture décrit
        les vitrines des pâtissiers, chocolatiers et confiseurs qui se remplissent, avant le défilé, de saint Nicolas et
        d’ânes en pain d’épices et en chocolat. Les enfants laissent un morceau de sucre ou une carotte pour l’âne du
        saint, dans l’espoir de trouver des cadeaux au matin.
      </p>

      <h2>D’où viennent les papillotes de Noël ?</h2>
      <p>
        La papillote est née à Lyon. Une histoire très répandue l’attribue à un confiseur nommé Papillot, dont l’apprenti
        aurait enveloppé des chocolats dans des mots doux. C’est une <strong>légende</strong> : nous n’avons trouvé aucun
        document d’archives qui la confirme.
      </p>
      <p>
        L’histoire industrielle, elle, est documentée. Selon l’inventaire général du patrimoine culturel (base Mérimée du
        ministère de la Culture), la chocolaterie fondée à Lyon en <strong>1898</strong> par Jean-Baptiste Thomas et
        Claudius Pelen, connue sous la marque Révillon, s’était spécialisée dans la fabrication des{' '}
        <strong>papillotes de Noël</strong>. Installée rue Victor-Lagrange, dans le quartier de Gerland, elle
        s’agrandit dès 1904. Le portail de l’usine porte encore des feuilles et des cabosses de cacaoyer en fer forgé.
      </p>
      <ul>
        <li>
          <strong>Le papier</strong> : brillant, souvent doré ou argenté, frangé aux deux extrémités.
        </li>
        <li>
          <strong>Le message</strong> : une citation, une devinette ou une blague, que l’on lit à voix haute à table.
        </li>
        <li>
          <strong>Le pétard</strong> : dans certaines versions, une languette claque quand on tire sur les deux bouts.
        </li>
      </ul>

      <h2>Quels sont les autres chocolats traditionnels de Noël ?</h2>
      <h3>Les truffes</h3>
      <p>
        Une ganache, mélange de chocolat et de crème, roulée à la main puis enrobée de cacao en poudre. Sa forme
        irrégulière et sa couleur sombre rappellent le champignon dont elle porte le nom. Fragile, elle se prépare au
        plus près des fêtes.
      </p>
      <h3>Les sujets moulés</h3>
      <p>
        Pères Noël, sapins, animaux : le chocolat tempéré est coulé dans un moule, laissé à figer, puis démoulé. C’est le
        même geste que nous faisons toute l’année à l’atelier de Charquemont, où nos chocolats sont moulés, enrobés et
        emballés.
      </p>
      <h3>Les bouchées et pralinés en coffret</h3>
      <p>
        Le coffret assorti reste le cadeau de Noël le plus classique : on l’offre à la famille, on l’apporte quand on est
        invité, on le pose sur la table à l’heure du café. Il a l’avantage de faire goûter plusieurs chocolats, noir,
        lait ou blanc, à des convives qui n’ont pas tous les mêmes préférences.
      </p>

      <Figure
        src="/images/galerie/ecureuils-chocolat-moules.jpg"
        alt="Coques de chocolat au lait encore dans leurs moules, posées sur une grille à l’atelier"
        width={3024}
        height={4032}
        ajustement="contain"
        legende="Le moulage, technique de tous les sujets de Noël : le chocolat fige dans le moule avant le démoulage."
      />

      <h2>Comment choisir des chocolats à offrir à Noël ?</h2>
      <ul>
        <li>
          <strong>Pensez aux goûts de chacun</strong> : un assortiment mêlant noir, lait et blanc plaît à une tablée
          entière.
        </li>
        <li>
          <strong>Choisissez un chocolat qui raconte quelque chose</strong> : une forme, une région, un savoir-faire.
          Nous avons rassemblé des idées dans notre article{' '}
          <Link href="/blog/cadeau-gourmand-franche-comte">sur les cadeaux gourmands de Franche-Comté</Link>.
        </li>
        <li>
          <strong>Prévoyez la conservation</strong> : entre l’achat et le réveillon, gardez les boîtes au frais et au
          sec, loin du sapin et des radiateurs. Tout est détaillé dans{' '}
          <Link href="/blog/comment-conserver-le-chocolat">notre guide pour conserver le chocolat</Link>.
        </li>
      </ul>
      <p>
        Pour un cadeau franc-comtois, nos <Link href="/#coffrets">Belles Comtoises</Link> sont des vaches montbéliardes
        en chocolat pur beurre de cacao, fourrées d’un praliné noisette, en quatre recettes : lait, noir, blanc et
        caramel. Elles existent en coffrets de 6, 12, 20 et 30 pièces. L’histoire de la race qui les a inspirées est à
        lire dans <Link href="/blog/vache-montbeliarde-franche-comte">notre portrait de la vache montbéliarde</Link>.
      </p>

      <Encadre titre="À retenir" sombre>
        <ul>
          <li>L’Avent commence le quatrième dimanche avant Noël ; les calendriers en chocolat partent souvent du 1er décembre.</li>
          <li>Le 6 décembre, saint Nicolas récompense les enfants sages : une fête inscrite au patrimoine immatériel à Nancy.</li>
          <li>La papillote est lyonnaise ; la légende de Papillot n’est pas attestée, la chocolaterie de 1898 l’est.</li>
          <li>Truffes, sujets moulés et coffrets assortis complètent la table des fêtes.</li>
        </ul>
      </Encadre>
    </>
  )
}
