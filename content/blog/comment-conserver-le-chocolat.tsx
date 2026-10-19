import Link from 'next/link'
import { Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'

export const faq: QuestionFaq[] = [
  {
    question: 'Faut-il mettre le chocolat au réfrigérateur ?',
    reponse:
      'Non, sauf forte chaleur. Le réfrigérateur est trop froid et trop humide : le chocolat y prend les odeurs et blanchit à la sortie. Si vous n’avez pas le choix, placez-le dans une boîte hermétique et sortez-le une heure avant de le déguster, sans ouvrir la boîte.',
  },
  {
    question: 'Peut-on manger un chocolat qui a blanchi ?',
    reponse:
      'Oui. Le voile blanc vient du beurre de cacao ou du sucre remontés en surface après un écart de température ou d’humidité. Le chocolat perd un peu de son aspect et de son fondant, mais il reste parfaitement consommable.',
  },
  {
    question: 'Quelle est la température idéale pour conserver le chocolat ?',
    reponse:
      'Entre 15 et 18 °C, dans un endroit sec, à l’abri de la lumière et des odeurs. Un placard ou un cellier frais, loin du four et des fenêtres, convient très bien.',
  },
  {
    question: 'Combien de temps se conservent des chocolats pralinés ?',
    reponse:
      'Moins longtemps qu’une tablette de chocolat noir, car les noisettes du praliné finissent par rancir. Fiez-vous à la date indiquée sur l’emballage et dégustez-les de préférence dans les semaines qui suivent l’achat.',
  },
]

export default function CommentConserverLeChocolat() {
  return (
    <>
      <p className="lead">
        Le chocolat est un produit vivant et sensible : il craint la chaleur, l’humidité, la lumière et les odeurs. Bien
        conservé, il garde son brillant, son craquant et tous ses arômes. Voici nos conseils d’artisans chocolatiers pour
        en profiter jusqu’au dernier carré.
      </p>

      <h2>La bonne température : entre 15 et 18 °C</h2>
      <p>
        C’est la règle d’or. Le beurre de cacao commence à ramollir dès 25 °C et fond autour de 34 °C, la température de
        la bouche, ce qui fait tout le plaisir de la dégustation. Entre <strong>15 et 18 °C</strong>, le chocolat reste
        stable : ni trop dur, ni trop mou.
      </p>
      <p>
        Plus encore que la chaleur, ce sont les <strong>variations de température</strong> qui l’abîment. Un placard
        frais et régulier vaut mieux qu’une pièce qui passe de 15 °C la nuit à 26 °C l’après-midi.
      </p>

      <h2>Au sec, à l’abri de la lumière et des odeurs</h2>
      <ul>
        <li>
          <strong>L’humidité</strong> fait remonter le sucre en surface : le chocolat se couvre d’un voile blanc et
          poudreux.
        </li>
        <li>
          <strong>La lumière</strong>, surtout celle du soleil, réchauffe le chocolat et altère ses arômes.
        </li>
        <li>
          <strong>Les odeurs</strong> sont l’ennemi discret : le beurre de cacao les absorbe très facilement. Évitez de
          ranger vos chocolats près des épices, du café moulu ou des fromages.
        </li>
      </ul>
      <p>
        Le plus simple : gardez vos chocolats dans leur emballage d’origine, ou dans une boîte hermétique, au fond d’un
        placard ou d’un cellier frais.
      </p>

      <h2>Et le réfrigérateur ?</h2>
      <p>
        On le déconseille. Trop froid et trop humide, il fige les arômes et fait blanchir le chocolat à la sortie, à cause
        de la condensation. Seule exception : les fortes chaleurs, quand la pièce dépasse durablement 25 °C.
      </p>
      <Encadre titre="En cas de canicule">
        <ul>
          <li>Placez vos chocolats dans une boîte hermétique, puis dans le bac à légumes, la zone la moins froide.</li>
          <li>Sortez la boîte une heure avant la dégustation, sans l’ouvrir, pour éviter la condensation.</li>
          <li>Dégustez à température ambiante : c’est là que les arômes s’expriment le mieux.</li>
        </ul>
      </Encadre>

      <h2>Pourquoi mon chocolat a-t-il blanchi ?</h2>
      <p>Ce voile blanchâtre a deux origines possibles, toutes deux sans danger :</p>
      <ul>
        <li>
          <strong>Le blanchiment gras</strong> : après un coup de chaud, une partie du beurre de cacao fond, remonte en
          surface puis cristallise de façon désordonnée. Le chocolat paraît grisé et terne.
        </li>
        <li>
          <strong>Le blanchiment sucrier</strong> : l’humidité dissout le sucre en surface, qui recristallise en séchant
          en une fine poudre blanche.
        </li>
      </ul>
      <p>
        Un chocolat blanchi se mange sans problème : il a simplement perdu un peu de son brillant et de son fondant.
        Il reste parfait pour la pâtisserie ou un chocolat chaud.
      </p>

      <Figure
        src="/images/galerie/vaches-comtoises-demoulage.jpg"
        alt="Vaches Belles Comtoises en chocolat au lait, démoulage en cours à l’atelier"
        width={2937}
        height={3552}
        ajustement="contain"
        legende="Au démoulage, un chocolat bien tempéré est brillant et se détache net du moule."
      />

      <h2>Combien de temps se conserve le chocolat ?</h2>
      <p>Tout dépend de sa composition :</p>
      <ul>
        <li>
          <strong>Le chocolat noir</strong> est le plus résistant : bien stocké, il se garde plusieurs mois.
        </li>
        <li>
          <strong>Les chocolats au lait et blanc</strong>, plus riches en matières grasses laitières, se conservent un
          peu moins longtemps.
        </li>
        <li>
          <strong>Les pralinés</strong>, comme nos <Link href="/">Belles Comtoises</Link>, contiennent des noisettes qui
          finissent par rancir : mieux vaut les déguster dans les semaines qui suivent l’achat.
        </li>
      </ul>
      <p>
        Dans tous les cas, fiez-vous à la date indiquée sur l’emballage. Une fois une boîte entamée, refermez-la bien
        pour protéger les chocolats de l’air et des odeurs.
      </p>

      <h2>Le cas des chocolats emballés individuellement</h2>
      <p>
        Un emballage individuel protège chaque pièce de l’air, de l’humidité et des manipulations. C’est pour cela que nos
        petits chocolats destinés aux professionnels, comme les <Link href="/poissons">poissons</Link>, les{' '}
        <Link href="/petits-beurres">petits beurres</Link> ou les <Link href="/orangettes">orangettes</Link>, sont tous
        emballés un par un : ils restent impeccables jusqu’à la tasse de café. Nous en parlons plus en détail dans{' '}
        <Link href="/blog/chocolat-cafe-restaurant-hotel">notre guide pour les restaurants et hôtels</Link>.
      </p>

      <Encadre titre="À retenir" sombre>
        <ul>
          <li>Entre 15 et 18 °C, sans variations brusques.</li>
          <li>Au sec, à l’abri de la lumière et des odeurs.</li>
          <li>Pas de réfrigérateur, sauf canicule, et toujours en boîte hermétique.</li>
          <li>Un chocolat blanchi reste bon à manger.</li>
        </ul>
      </Encadre>
    </>
  )
}
