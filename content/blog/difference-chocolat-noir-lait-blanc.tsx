import Link from 'next/link'
import { Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'

export const faq: QuestionFaq[] = [
  {
    question: 'Le chocolat blanc contient-il du cacao ?',
    reponse:
      'Oui, mais seulement sa matière grasse : le beurre de cacao. La réglementation européenne (directive 2000/36/CE) lui impose au moins 20 % de beurre de cacao et au moins 14 % de matière sèche de lait. Il ne contient pas la partie sèche et brune de la fève, d’où sa couleur ivoire et l’absence d’amertume.',
  },
  {
    question: 'Quelle est la teneur minimale en cacao d’un chocolat au lait ?',
    reponse:
      'En France comme dans toute l’Union européenne, un chocolat au lait doit contenir au moins 25 % de matière sèche totale de cacao et au moins 14 % de matière sèche de lait. Pour porter une mention de qualité comme « extra », il faut au moins 30 % de cacao et 18 % de lait.',
  },
  {
    question: 'À partir de quel pourcentage de cacao un chocolat est-il noir ?',
    reponse:
      'La dénomination « chocolat » exige au moins 35 % de matière sèche totale de cacao. Selon la fiche du ministère de l’Économie consacrée aux dénominations du chocolat, la mention « noir » correspond à au moins 43 % de matière sèche totale de cacao, dont au moins 26 % de beurre de cacao.',
  },
  {
    question: 'Que veut dire « cacao : 70 % minimum » sur un emballage ?',
    reponse:
      'Cette mention, imposée par la directive 2000/36/CE, indique la part de matière sèche totale de cacao du produit : beurre de cacao et cacao sec dégraissé additionnés. Les 30 % restants sont surtout du sucre, avec parfois de la vanille ou un émulsifiant.',
  },
]

export default function DifferenceChocolatNoirLaitBlanc() {
  return (
    <>
      <p className="lead">
        Le chocolat noir, le chocolat au lait et le chocolat blanc se distinguent par ce qu’ils gardent de la fève de
        cacao. Le noir réunit les deux parties de la fève, sa matière sèche et son beurre, avec du sucre. Le chocolat au
        lait y ajoute du lait et contient moins de cacao. Le blanc ne garde que le beurre de cacao, mêlé à du lait et à
        du sucre. Ces trois recettes sont encadrées par la loi, avec des seuils précis.
      </p>

      <h2>De quoi est fait le chocolat, au départ ?</h2>
      <p>
        Tout part de la fève de cacao. Une fois broyée, elle donne une pâte, la{' '}
        <strong>masse de cacao</strong>, qui contient deux choses :
      </p>
      <ul>
        <li>
          <strong>le beurre de cacao</strong>, la matière grasse de la fève, de couleur pâle, qui donne le fondant ;
        </li>
        <li>
          <strong>le cacao sec dégraissé</strong>, la partie brune et sèche, qui porte la couleur, l’amertume et
          l’essentiel des arômes de cacao.
        </li>
      </ul>
      <p>
        Les trois chocolats se construisent à partir de ces deux éléments. La directive européenne 2000/36/CE du 23 juin
        2000, reprise en droit français par le décret n° 2003-702 du 29 juillet 2003, fixe pour chacun des teneurs
        minimales. Un fabricant qui ne les atteint pas n’a pas le droit d’utiliser le nom.
      </p>

      <h2>Qu’est-ce que la loi appelle « chocolat » noir ?</h2>
      <p>
        Le produit appelé simplement « chocolat » est fait de produits de cacao et de sucres, avec au moins{' '}
        <strong>35 % de matière sèche totale de cacao</strong>, dont au moins 18 % de beurre de cacao et au moins 14 %
        de cacao sec dégraissé. Pas de lait dans la définition : c’est la base du chocolat noir.
      </p>
      <p>
        Le texte européen autorise des mentions de qualité au-delà de <strong>43 % de cacao, dont 26 % de beurre de
        cacao</strong>. Selon la fiche du ministère de l’Économie sur les dénominations du chocolat, c’est à ce seuil
        que correspond la mention « noir ». Beaucoup de chocolats noirs affichent davantage : le chiffre de
        l’emballage est un minimum garanti.
      </p>
      <p>
        Plus le pourcentage monte, moins il reste de place pour le sucre. Un noir à 70 % est donc plus intense, plus
        amer et moins sucré qu’un noir à 50 %, même si la fève et la torréfaction comptent autant que le chiffre.
      </p>

      <h2>Qu’est-ce qu’un chocolat au lait ?</h2>
      <p>
        Un chocolat au lait associe produits de cacao, sucres et lait. La directive 2000/36/CE lui impose au moins :
      </p>
      <ul>
        <li>25 % de matière sèche totale de cacao, dont 2,5 % de cacao sec dégraissé ;</li>
        <li>14 % de matière sèche de lait, dont 3,5 % de matière grasse lactique ;</li>
        <li>25 % de matières grasses au total (beurre de cacao et matière grasse lactique).</li>
      </ul>
      <p>
        Pour une mention de qualité comme « extra », les seuils montent à 30 % de cacao et 18 % de matière sèche de
        lait, dont 4,5 % de matière grasse lactique.
      </p>
      <p>
        Le lait, ajouté en poudre, adoucit l’amertume et apporte des notes lactées et caramélisées. Moins de cacao sec
        dégraissé, c’est aussi une couleur plus claire, d’un brun noisette.
      </p>

      <h2>Le chocolat blanc est-il vraiment du chocolat ?</h2>
      <p>
        Oui, au sens de la loi. La directive le définit comme un produit à base de beurre de cacao, de lait et de
        sucres, avec au moins <strong>20 % de beurre de cacao</strong> et au moins{' '}
        <strong>14 % de matière sèche de lait</strong>, dont 3,5 % de matière grasse lactique.
      </p>
      <p>
        Ce qui lui manque, c’est le cacao sec dégraissé. Sans cette partie brune de la fève, il n’a ni la couleur ni
        l’amertume du cacao : il reste ivoire, très doux, avec un goût dominé par le lait, le sucre et souvent la
        vanille. Son caractère vient surtout de la qualité de son beurre de cacao.
      </p>

      <Figure
        src="/images/comtoises/coffret-30-ouvert.jpg"
        alt="Coffret ouvert de trente Belles Comtoises rangées en colonnes, du chocolat blanc ivoire au chocolat noir, couvercle tacheté posé sur l’herbe"
        width={1086}
        height={1448}
        ajustement="contain"
        legende="Côte à côte dans un même coffret, les nuances vont du blanc ivoire au brun très foncé du noir."
      />

      <h2>Quelles différences de goût et de texture ?</h2>
      <ul>
        <li>
          <strong>Le noir</strong> : amertume, arômes de cacao torréfié, parfois fruités ou boisés selon l’origine ; une
          cassure nette et un fondant plus lent.
        </li>
        <li>
          <strong>Le lait</strong> : plus sucré, plus rond, avec des notes de lait et de caramel ; une texture plus
          tendre en bouche.
        </li>
        <li>
          <strong>Le blanc</strong> : le plus doux des trois, crémeux, sans amertume ; très sensible à la chaleur et
          aux odeurs.
        </li>
      </ul>
      <p>
        Ces écarts de composition expliquent aussi qu’ils ne vieillissent pas de la même façon. Nous détaillons les
        bons gestes dans <Link href="/blog/comment-conserver-le-chocolat">notre article sur la conservation du
        chocolat</Link>.
      </p>

      <h2>Comment reconnaître un chocolat sur l’étiquette ?</h2>
      <p>Trois mentions suffisent pour savoir ce que vous achetez :</p>
      <ol>
        <li>
          <strong>La dénomination</strong> : « chocolat », « chocolat au lait », « chocolat blanc ». Elle n’est
          permise que si les seuils ci-dessus sont atteints.
        </li>
        <li>
          <strong>La teneur en cacao</strong>, sous la forme « cacao : … % minimum ». La directive l’impose pour le
          chocolat noir et le chocolat au lait. Le chiffre additionne beurre de cacao et cacao sec dégraissé.
        </li>
        <li>
          <strong>Les matières grasses végétales.</strong> La directive autorise jusqu’à 5 % du produit fini de
          certaines graisses autres que le beurre de cacao (palme, karité, illipé…), sans baisser les minimums de
          cacao. Elles imposent alors la mention « contient des matières grasses végétales en plus du beurre de
          cacao », près de la dénomination. À l’inverse, seul un chocolat qui n’en contient pas peut se dire « pur
          beurre de cacao ».
        </li>
      </ol>

      <Encadre titre="Le cas du chocolat de couverture">
        <p>
          Le chocolat de couverture, celui que travaillent chocolatiers et pâtissiers, est plus riche en beurre de
          cacao. La directive 2000/36/CE lui impose au moins 35 % de matière sèche totale de cacao, dont au moins
          31 % de beurre de cacao, contre 18 % pour le chocolat ordinaire.
        </p>
      </Encadre>

      <h2>Noir, lait ou blanc : lequel choisir ?</h2>
      <p>
        C’est une affaire de goût et d’usage, pas de hiérarchie. Le noir plaît à ceux qui cherchent l’intensité du
        cacao, et il accompagne bien un expresso, comme les mignardises que servent les restaurants et dont nous
        parlons dans <Link href="/blog/chocolat-cafe-restaurant-hotel">notre guide pour les cafés, restaurants et
        hôtels</Link>. Le lait rassemble petits et grands. Le blanc séduit les amateurs de douceur.
      </p>
      <p>
        Pour un cadeau, le plus simple est souvent de ne pas choisir. Nos{' '}
        <Link href="/belles-comtoises#coffrets">Belles Comtoises</Link>, des vaches montbéliardes en chocolat pur beurre de cacao
        fourrées de praliné noisette, existent en quatre recettes : lait, noir, blanc et caramel, moulées et enrobées
        dans notre atelier de Charquemont. Et si vous cherchez d’autres idées régionales, voyez{' '}
        <Link href="/blog/cadeau-gourmand-franche-comte">nos cadeaux gourmands de Franche-Comté</Link>.
      </p>

      <Encadre titre="À retenir" sombre>
        <ul>
          <li>Chocolat noir : cacao et sucre, au moins 35 % de cacao ; mention « noir » dès 43 %.</li>
          <li>Chocolat au lait : au moins 25 % de cacao et 14 % de matière sèche de lait.</li>
          <li>Chocolat blanc : au moins 20 % de beurre de cacao et 14 % de matière sèche de lait, sans cacao sec.</li>
          <li>Sur l’étiquette : dénomination, « cacao : … % minimum » et mention des matières grasses végétales.</li>
        </ul>
      </Encadre>
    </>
  )
}
