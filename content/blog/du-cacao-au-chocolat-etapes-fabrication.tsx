import Link from 'next/link'
import { Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'

export const faq: QuestionFaq[] = [
  {
    question: 'Combien de temps dure la fermentation des fèves de cacao ?',
    reponse:
      'Quelques jours. L’Organisation internationale du cacao (ICCO) indique environ cinq jours pour les fèves de type Forastero et deux à trois jours pour les Criollo. Les durées réelles varient selon la variété, le climat et la méthode : en tas sous des feuilles de bananier ou en caisses de bois.',
  },
  {
    question: 'Quelle est la différence entre pâte de cacao, beurre de cacao et poudre de cacao ?',
    reponse:
      'La pâte (ou liqueur) de cacao est la fève torréfiée, décortiquée et broyée finement. Pressée, elle se sépare en deux : une matière grasse, le beurre de cacao, et un tourteau sec que l’on broie ensuite pour obtenir la poudre de cacao.',
  },
  {
    question: 'À quoi sert le tempérage du chocolat ?',
    reponse:
      'À faire cristalliser le beurre de cacao sous sa forme stable. Il peut prendre six formes cristallines, et seule la forme dite V donne un chocolat brillant, à la cassure nette, qui fond en bouche et se démoule facilement. Un chocolat mal tempéré est terne, mou ou friable.',
  },
  {
    question: 'Un chocolatier fabrique-t-il lui-même son chocolat à partir des fèves ?',
    reponse:
      'Pas forcément. Certains travaillent la fève de bout en bout ; beaucoup d’artisans partent d’un chocolat déjà fabriqué, dit de couverture, et interviennent sur les dernières étapes : tempérage, moulage, enrobage, garnitures. C’est le cas des pièces façonnées dans notre atelier de Charquemont.',
  },
]

export default function DuCacaoAuChocolatEtapesFabrication() {
  return (
    <>
      <p className="lead">
        Le chocolat se fabrique en deux temps et souvent sur deux continents. À la plantation, les cabosses sont
        récoltées, puis leurs fèves sont fermentées et séchées. À l’usine ou à l’atelier, ces fèves sont torréfiées,
        décortiquées, broyées en pâte de cacao, mélangées au sucre, affinées, conchées, tempérées et enfin moulées.
        Voici chaque étape, ce qu’elle change au goût, et où intervient un artisan chocolatier.
      </p>

      <Encadre titre="Les étapes en bref">
        <ol>
          <li>Récolte et écabossage (plantation)</li>
          <li>Fermentation (plantation)</li>
          <li>Séchage (plantation)</li>
          <li>Nettoyage, torréfaction et vannage (transformateur)</li>
          <li>Broyage en pâte de cacao, éventuellement pressage (transformateur)</li>
          <li>Mélange et affinage (fabricant de chocolat)</li>
          <li>Conchage (fabricant de chocolat)</li>
          <li>Tempérage, puis moulage ou enrobage (fabricant ou artisan chocolatier)</li>
        </ol>
      </Encadre>

      <h2>Comment récolte-t-on les fèves de cacao ?</h2>
      <p>
        Le cacaoyer porte ses fruits, les cabosses, directement sur le tronc et les grosses branches. Selon
        l’Organisation internationale du cacao (ICCO), la récolte s’étale sur plusieurs mois, avec une grande et une
        petite saison selon les pays.
      </p>
      <p>
        Une fois cueillies, les cabosses sont ouvertes dans la semaine ou les dix jours qui suivent. L’ICCO recommande
        un gourdin de bois, qui fend la cabosse en deux d’un coup au milieu ; la machette, très répandue, risque
        d’entailler les fèves. On en retire les fèves, enrobées d’une pulpe blanche et sucrée.
      </p>

      <h2>Pourquoi fait-on fermenter les fèves de cacao ?</h2>
      <p>
        Une fève fraîche n’a pas le goût du chocolat. La fermentation est la première des deux étapes où se forment ses
        arômes ; la seconde, la torréfaction, a lieu plus tard chez le transformateur.
      </p>
      <p>
        Les fèves et leur pulpe sont mises en tas ou en caisses : des micro-organismes dégradent la pulpe et la masse
        chauffe. L’ICCO décrit deux grandes méthodes :
      </p>
      <ul>
        <li>
          <strong>Les tas</strong>, couverts de feuilles de bananier, plutôt chez les petits producteurs ;
        </li>
        <li>
          <strong>Les caisses de bois</strong>, percées de fentes pour que la pulpe s’écoule, plutôt dans les grandes
          exploitations.
        </li>
      </ul>
      <p>
        Les fèves sont brassées en cours de route pour que la fermentation soit homogène. Elle dure environ cinq jours
        pour les fèves Forastero et deux à trois jours pour les Criollo, toujours selon l’ICCO.
      </p>

      <h2>Comment sèche-t-on le cacao, et pourquoi lentement ?</h2>
      <p>
        Après fermentation, les fèves contiennent encore beaucoup d’eau. Le séchage, souvent au soleil, fait passer leur
        humidité d’environ 60 % à environ 7,5 %, ce qui permet de les stocker et de les transporter sans qu’elles
        s’abîment.
      </p>
      <p>
        L’ICCO insiste sur l’équilibre : un séchage trop rapide laisse des fèves acides et amères, un séchage trop lent
        les expose aux moisissures. Ce sont ces fèves fermentées et séchées qui partent vers les usines de
        transformation.
      </p>

      <h2>Que se passe-t-il pendant la torréfaction et le vannage ?</h2>
      <p>
        Chez le transformateur, les fèves sont nettoyées, torréfiées, puis décortiquées. La torréfaction développe la
        seconde vague d’arômes. Le vannage sépare ensuite la coque, légère, des éclats
        d’amande torréfiée, que les chocolatiers appellent le grué.
      </p>
      <p>
        Le temps et la température de torréfaction varient selon les fèves et le goût recherché : c’est l’un des
        réglages qui distinguent un chocolat d’un autre à partir des mêmes fèves.
      </p>

      <h2>Comment obtient-on la pâte, le beurre et la poudre de cacao ?</h2>
      <p>
        Le grué est broyé finement. Le broyage libère la matière grasse de la fève et transforme ces éclats en une
        pâte liquide et brune : la pâte de cacao, ou liqueur de cacao. Elle ne contient rien d’autre que la fève.
      </p>
      <p>
        Une partie de cette pâte est pressée. L’ICCO décrit des presses hydrauliques qui montent jusqu’à 550 bars ; il en
        sort deux produits :
      </p>
      <ul>
        <li>
          <strong>Le beurre de cacao</strong>, la matière grasse de la fève, que l’ICCO présente comme le plus coûteux des
          grands ingrédients d’une recette de chocolat ;
        </li>
        <li>
          <strong>Le tourteau</strong>, une galette sèche, refroidie puis broyée en poudre de cacao.
        </li>
      </ul>
      <p>
        Une étude de faisabilité publiée par l’ICCO pour le Ghana donne un ordre de grandeur : une tonne de pâte de cacao
        fournit environ 55 % de beurre et 45 % de tourteau.
      </p>

      <h2>Comment la pâte de cacao devient-elle du chocolat ?</h2>
      <p>
        Le fabricant mélange, selon sa recette, de la pâte de cacao, du sucre, du beurre de cacao en plus, et du lait en
        poudre pour un chocolat au lait. C’est à ce stade que se décident les grandes familles : noir, au lait ou blanc,
        ce dernier sans pâte de cacao mais avec du beurre de cacao. Nous détaillons leurs compositions légales dans{' '}
        <Link href="/blog/difference-chocolat-noir-lait-blanc">notre article sur les chocolats noir, lait et blanc</Link>.
      </p>
      <p>
        Le mélange est ensuite affiné : on réduit la taille de ses particules jusqu’à ce que la langue ne sente plus de
        grain. Sans cette étape, le chocolat serait sableux.
      </p>

      <h2>Qu’est-ce que le conchage ?</h2>
      <p>
        Le conchage brasse longuement la masse chaude de chocolat. Il agit surtout sur la saveur, et l’ICCO le décrit
        comme une étape complexe que les chercheurs étudient encore pour comprendre tout ce qui s’y transforme. En fin de
        conchage, le fabricant ajuste la fluidité du chocolat avec du beurre de cacao et des émulsifiants, et peut y
        ajouter des arômes.
      </p>
      <p>
        Le beurre de cacao ajouté est à distinguer des autres graisses végétales, autorisées en petite quantité mais
        signalées sur l’étiquette : c’est tout le sens de la mention{' '}
        <Link href="/blog/pur-beurre-de-cacao-signification">« pur beurre de cacao »</Link>.
      </p>

      <h2>Pourquoi tempère-t-on le chocolat ?</h2>
      <p>
        Le chocolat fondu ne peut pas être simplement versé dans un moule et refroidi. Son beurre de cacao peut
        cristalliser sous six formes différentes, et une seule, la forme V, donne la texture attendue. Une étude publiée
        dans la revue Nature Communications en 2021 le rappelle : c’est elle qui apporte le
        brillant, la cassure nette, une fonte régulière en bouche et une meilleure résistance au blanchiment.
      </p>
      <p>
        Le tempérage est donc un refroidissement contrôlé : le chocolat passe par des températures précises, pendant des
        durées précises, pour que ce soient les bons cristaux qui se forment. Mal tempéré, il sort terne, mou ou
        friable, et blanchit vite. Nos conseils pour éviter qu’il ne blanchisse chez vous sont dans{' '}
        <Link href="/blog/comment-conserver-le-chocolat">notre guide de conservation</Link>.
      </p>

      <Figure
        src="/images/galerie/poissons-moule-coulage.jpg"
        alt="Moules transparents posés sur une grille, où figent des rangées de petits poissons en chocolat noir fraîchement coulés"
        width={4284}
        height={5712}
        ajustement="contain"
        legende="À l’atelier de Charquemont : des petits poissons en chocolat noir figent dans leurs moules après le coulage."
      />

      <h2>Moulage et enrobage : où intervient l’artisan chocolatier ?</h2>
      <p>
        Une fois tempéré, le chocolat prend sa forme finale. Deux gestes dominent :
      </p>
      <ul>
        <li>
          <strong>Le moulage</strong> : le chocolat est coulé dans un moule, laissé à figer, puis démoulé. C’est ainsi que
          naissent nos <Link href="/poissons">petits poissons en chocolat</Link> et les coques de nos{' '}
          <Link href="/belles-comtoises">Belles Comtoises</Link>, vaches montbéliardes garnies de praliné noisette.
        </li>
        <li>
          <strong>L’enrobage</strong> : un intérieur (écorce d’orange, grain de café) passe sous un rideau de
          chocolat qui le recouvre entièrement, comme pour nos <Link href="/orangettes">orangettes</Link>.
        </li>
      </ul>
      <p>
        À l’atelier de Charquemont, dans le Haut-Doubs, nous réalisons ces dernières étapes : moulage, enrobage et
        emballage. Les étapes de la plantation et de la transformation de la fève, elles, se déroulent en amont, souvent
        à des milliers de kilomètres.
      </p>

      <Encadre titre="À retenir" sombre>
        <ul>
          <li>Les arômes du chocolat naissent deux fois : à la fermentation, puis à la torréfaction.</li>
          <li>La pâte de cacao, c’est la fève broyée ; pressée, elle donne le beurre et la poudre de cacao.</li>
          <li>Affinage et conchage font la finesse et la saveur ; le tempérage fait le brillant et la cassure.</li>
          <li>L’artisan chocolatier intervient le plus souvent à la fin : tempérage, moulage, enrobage.</li>
        </ul>
      </Encadre>
    </>
  )
}
