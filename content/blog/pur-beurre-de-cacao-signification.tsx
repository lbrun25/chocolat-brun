import Link from 'next/link'
import { Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'

export const faq: QuestionFaq[] = [
  {
    question: 'La mention « pur beurre de cacao » est-elle obligatoire ?',
    reponse:
      'Non. Elle est facultative : un fabricant dont le chocolat ne contient aucune autre graisse végétale que le beurre de cacao peut l’écrire, sans y être tenu. Ce qui est obligatoire, c’est l’inverse : un chocolat qui contient d’autres matières grasses végétales doit l’annoncer par une mention spécifique, en caractères gras.',
  },
  {
    question: 'Quelles graisses végétales peut-on ajouter au chocolat ?',
    reponse:
      'Selon la directive européenne 2000/36/CE, rappelée par la DGCCRF, seules six matières grasses sont admises, dans la limite de 5 % du produit fini : l’illipé, l’huile de palme, le sal, le karité, le kokum gurgi et les noyaux de mangue. Toute autre graisse végétale est exclue.',
  },
  {
    question: 'Un chocolat « pur beurre de cacao » contient-il plus de cacao ?',
    reponse:
      'Pas forcément. La mention renseigne sur la nature des matières grasses, pas sur le pourcentage de cacao. Pour connaître la teneur en cacao, il faut lire la ligne « cacao : … % minimum » de l’emballage.',
  },
  {
    question: 'Que veut dire « chocolat traditionnel » sur un emballage ?',
    reponse:
      'En France, l’article R. 412-48 du code de la consommation met sur le même plan « chocolat pur beurre de cacao », « chocolat traditionnel » et toute dénomination équivalente. Les trois signalent un chocolat fabriqué sans matière grasse végétale autre que le beurre de cacao.',
  },
]

export default function PurBeurreDeCacaoSignification() {
  return (
    <>
      <p className="lead">
        « Pur beurre de cacao » signifie que la seule matière grasse végétale du chocolat est le beurre de cacao, la
        graisse naturelle de la fève. Aucune huile de palme, aucun karité, aucune autre graisse de substitution n’a été
        ajoutée. En France, cette mention est encadrée par le code de la consommation : elle est facultative, mais
        réservée aux chocolats qui la respectent.
      </p>

      <h2>Que signifie « pur beurre de cacao » sur un chocolat ?</h2>
      <p>
        Le beurre de cacao est la matière grasse contenue dans la fève de cacao. Une fois la fève broyée, il
        constitue avec le cacao sec la base de tout chocolat, et c’est lui qui apporte le fondant.
      </p>
      <p>
        La mention garantit une seule chose : dans ce chocolat, le beurre de cacao n’a été ni complété ni remplacé en
        partie par une autre graisse végétale. Elle ne dit rien d’autre. Ni le pourcentage de cacao, ni la quantité de
        sucre, ni l’origine des fèves ne sont concernés.
      </p>

      <Figure
        src="/images/galerie/cabosse_ouverte.jpg"
        alt="Deux cabosses de cacao séchées sur une toile de jute : l’une entière, l’autre ouverte sur ses rangées de fèves"
        width={6000}
        height={4000}
        legende="Les fèves, logées dans la cabosse, contiennent le beurre de cacao. C’est la seule graisse végétale d’un chocolat « pur beurre de cacao »."
      />

      <h2>Pourquoi cette mention existe-t-elle ?</h2>
      <p>
        Parce que la loi autorise, à côté du beurre de cacao, d’autres matières grasses végétales. La directive
        européenne 2000/36/CE du 23 juin 2000 constate dans ses considérants que plusieurs États membres admettaient
        déjà cet ajout, jusqu’à 5 %, et l’étend à toute l’Union. La France a transposé le texte par le décret
        n° 2003-702 du 29 juillet 2003.
      </p>
      <p>
        Avant même cette transposition, le législateur français avait prévu une contrepartie. La loi sur les
        nouvelles régulations économiques, dite loi NRE, a inscrit dans le code de la consommation la possibilité
        d’afficher « chocolat pur beurre de cacao » ou « chocolat traditionnel ». Selon une réponse du ministère à
        l’Assemblée nationale publiée en 2003, ces mentions peuvent figurer sur l’étiquetage depuis mai 2001.
      </p>
      <p>
        Aujourd’hui, la règle se trouve à l’article R. 412-48 du code de la consommation. La DGCCRF le résume ainsi :
        les chocolats qui ne renferment pas d’autres matières grasses végétales peuvent être vendus sous la
        dénomination « chocolat pur beurre de cacao », « chocolat traditionnel » ou toute dénomination équivalente.
      </p>

      <h2>Quelles autres matières grasses la loi autorise-t-elle dans le chocolat ?</h2>
      <p>
        La liste est fermée. Selon la directive 2000/36/CE, telle que la présente la DGCCRF, seules six graisses
        végétales peuvent compléter le beurre de cacao :
      </p>
      <ul>
        <li>l’illipé ;</li>
        <li>l’huile de palme ;</li>
        <li>le sal ;</li>
        <li>le karité ;</li>
        <li>le kokum gurgi ;</li>
        <li>les noyaux de mangue.</li>
      </ul>
      <p>
        Leur total ne peut pas dépasser 5 % du produit fini. Elles ne permettent pas non plus de descendre sous les
        teneurs minimales en cacao exigées pour chaque dénomination. Un chocolat qui en contient garde donc le droit de
        s’appeler « chocolat ». Nous avons détaillé ces seuils, du noir au blanc, dans{' '}
        <Link href="/blog/difference-chocolat-noir-lait-blanc">notre guide des différences entre chocolat noir, au
        lait et blanc</Link>.
      </p>

      <h2>Comment savoir si un chocolat contient d’autres graisses végétales ?</h2>
      <p>
        L’étiquette le dit, et de façon voyante. Un produit qui contient l’une de ces six graisses doit porter la
        phrase « contient des matières grasses végétales en plus du beurre de cacao ». Selon le communiqué de la Cour
        de justice de l’Union européenne de novembre 2010, cette mention est imprimée en caractères gras. D’après les
        réponses ministérielles à l’Assemblée nationale, elle figure dans le même champ visuel que la liste des
        ingrédients, bien séparée de celle-ci.
      </p>
      <p>Pour vous y retrouver en rayon :</p>
      <ol>
        <li>
          <strong>Mention « pur beurre de cacao » ou « traditionnel »</strong> : aucune autre graisse végétale.
        </li>
        <li>
          <strong>Phrase sur les matières grasses végétales en gras</strong> : jusqu’à 5 % de l’une des six graisses
          autorisées.
        </li>
        <li>
          <strong>Ni l’une ni l’autre</strong> : en principe pas d’autre graisse végétale, puisque la mention serait
          obligatoire. Vérifiez la liste des ingrédients en cas de doute.
        </li>
      </ol>

      <Encadre titre="Et les produits fourrés ?">
        <p>
          La mention porte sur le chocolat lui-même. Pour une bouchée fourrée, un praliné ou une confiserie, la
          composition de l’intérieur se lit dans la liste des ingrédients de l’étiquette, qui reste la seule référence.
        </p>
      </Encadre>

      <h2>Peut-on écrire « chocolat pur » sur l’emballage ?</h2>
      <p>
        Non, du moins pas comme nom de vente. Le 25 novembre 2010, dans l’affaire C-47/09, la Cour de justice de
        l’Union européenne a donné tort à l’Italie, qui permettait d’ajouter « cioccolato puro » (chocolat pur) à la
        dénomination des chocolats sans graisses de substitution.
      </p>
      <p>
        Selon le communiqué de la Cour, les noms de vente du cacao et du chocolat sont entièrement harmonisés en
        Europe : un pays ne peut pas en créer un nouveau. Deux noms pour un même produit risquaient de semer la
        confusion. La Cour admet en revanche qu’un chocolat fait uniquement de beurre de cacao le signale sur son
        étiquette, à condition que l’information reste exacte, neutre et objective, sans tromper l’acheteur.
      </p>

      <h2>« Pur beurre de cacao » est-il un gage de qualité ?</h2>
      <p>
        La mention garantit une recette, pas un goût. Deux chocolats pur beurre de cacao peuvent être très différents
        selon les fèves, leur torréfaction, le pourcentage de cacao et le savoir-faire de celui qui les travaille. Elle
        reste pourtant une information utile : elle vous dit que toute la matière grasse végétale vient de la fève.
      </p>
      <p>
        C’est le choix que nous avons fait pour nos{' '}
        <Link href="/belles-comtoises#coffrets">Belles Comtoises</Link> : des vaches montbéliardes en chocolat pur beurre de cacao,
        fourrées de praliné noisette, moulées et enrobées dans notre atelier de Charquemont, en lait, noir, blanc et
        caramel. Une fois chez vous, quelques gestes simples les gardent en bon état, comme nous l’expliquons dans{' '}
        <Link href="/blog/comment-conserver-le-chocolat">notre article sur la conservation du chocolat</Link>.
      </p>

      <Encadre titre="À retenir" sombre>
        <ul>
          <li>« Pur beurre de cacao » : aucune graisse végétale autre que le beurre de cacao.</li>
          <li>Mention facultative, encadrée par l’article R. 412-48 du code de la consommation, depuis 2001.</li>
          <li>Six graisses de substitution autorisées, 5 % au plus, signalées en gras sur l’emballage.</li>
          <li>La mention ne renseigne ni sur le pourcentage de cacao ni sur le goût.</li>
        </ul>
      </Encadre>
    </>
  )
}
