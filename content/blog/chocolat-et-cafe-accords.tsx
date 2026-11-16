import Link from 'next/link'
import { Encadre } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'

export const faq: QuestionFaq[] = [
  {
    question: 'Faut-il boire le café avant ou après avoir goûté le chocolat ?',
    reponse:
      'Le plus simple est de commencer par une gorgée de café, de laisser fondre le chocolat sur la langue, puis de reprendre une gorgée. Le café chaud fait fondre le chocolat plus vite et mêle les deux arômes en bouche. Croquer le chocolat et l’avaler aussitôt laisse surtout le goût du sucre.',
  },
  {
    question: 'Quel chocolat choisir pour accompagner un expresso ?',
    reponse:
      'Un chocolat noir, de préférence. Un expresso est court, concentré et amer : un chocolat au lait très sucré paraît fade à côté, alors qu’un noir de puissance comparable lui répond. Un noir autour de 60 à 70 % de cacao est un point de départ courant, à ajuster selon votre goût.',
  },
  {
    question: 'Peut-on associer le chocolat blanc et le café ?',
    reponse:
      'Oui, par contraste. Le chocolat blanc ne contient pas de pâte de cacao, seulement du beurre de cacao, du sucre et du lait : sa douceur adoucit un café noir très corsé, un peu comme un sucre que l’on croquerait à côté de la tasse.',
  },
  {
    question: 'Pourquoi certains cafés ont-ils un goût de chocolat ?',
    reponse:
      'Parce que café et cacao développent à la torréfaction des molécules aromatiques de la même famille, notamment les pyrazines, issues de la réaction de Maillard. La roue des arômes du café de la Specialty Coffee Association réserve d’ailleurs une famille entière aux notes de fruits à coque et de cacao.',
  },
]

export default function ChocolatEtCafeAccords() {
  return (
    <>
      <p className="lead">
        Pour accorder café et chocolat, la règle la plus sûre est d’accorder les intensités : un chocolat noir avec un
        expresso ou un café corsé, un chocolat au lait avec un café filtre plus doux ou un café au lait, un chocolat
        blanc pour adoucir par contraste un café très amer. Ces deux produits se marient bien parce qu’ils partagent
        des arômes nés de la torréfaction. Voici comment choisir, et comment les déguster ensemble.
      </p>

      <Encadre titre="Les accords en bref">
        <ul>
          <li>
            <strong>Expresso, ristretto, café serré</strong> : chocolat noir.
          </li>
          <li>
            <strong>Café filtre, café doux ou fruité</strong> : chocolat au lait ou noir peu amer.
          </li>
          <li>
            <strong>Cappuccino, café au lait</strong> : chocolat au lait, ou noir pour retrouver de l’amertume.
          </li>
          <li>
            <strong>Café noir très torréfié</strong> : chocolat blanc ou au lait, par contraste.
          </li>
          <li>
            <strong>Pour aller plus loin</strong> : un chocolat qui contient déjà du café, ou un grain de café enrobé.
          </li>
        </ul>
      </Encadre>

      <h2>Pourquoi le café et le chocolat s’accordent-ils si bien ?</h2>
      <p>
        Le café et le cacao sont deux graines que l’on torréfie. Pendant la torréfaction, les sucres et les acides
        aminés qu’elles contiennent réagissent entre eux : c’est la réaction de Maillard, la même qui dore la croûte du
        pain. Elle produit, dans les deux cas, des molécules aromatiques appelées <strong>pyrazines</strong>.
      </p>
      <ul>
        <li>
          Côté cacao, une revue scientifique publiée en 2019 dans la revue Molecules (« The Chemistry behind Chocolate
          Production ») présente les pyrazines comme formées pour l’essentiel pendant la torréfaction, par réaction de
          Maillard et dégradation de Strecker.
        </li>
        <li>
          Côté café, les études publiées sur la torréfaction décrivent la méthylpyrazine, l’une des plus abondantes,
          avec des notes de noisette, de grillé et de chocolat.
        </li>
      </ul>
      <p>
        Autrement dit, une partie de ce que l’on appelle « goût de chocolat » se retrouve aussi dans la tasse. La roue
        des arômes du café, publiée en 1995 par la Specialty Coffee Association et révisée en 2016 avec World Coffee
        Research, consacre d’ailleurs l’une de ses grandes familles aux notes de fruits à coque et de cacao. Quand les
        deux se rencontrent en bouche, ces arômes communs se prolongent au lieu de se contrarier.
      </p>
      <p>
        Pour voir à quel moment de la fabrication naissent ces arômes côté cacao, de la fermentation à la torréfaction,
        lisez notre article sur{' '}
        <Link href="/blog/du-cacao-au-chocolat-etapes-fabrication">les étapes de fabrication du chocolat</Link>.
      </p>

      <h2>Quel chocolat servir avec un expresso ?</h2>
      <p>
        Un chocolat noir. L’expresso est une boisson courte, concentrée, à l’amertume marquée. Face à lui, un chocolat
        très sucré disparaît : on ne sent plus que le sucre, puis le café reprend toute la place. Un chocolat noir, au
        contraire, a assez de corps pour tenir tête à la tasse.
      </p>
      <p>
        Inutile pour autant de viser le pourcentage le plus élevé. Deux amertumes très fortes s’additionnent et la
        dégustation devient rêche. Un noir aux alentours de 60 à 70 % de cacao est un point de départ courant : assez
        intense pour l’expresso, encore assez rond pour rester agréable. Ensuite, c’est affaire de goût.
      </p>
      <p>
        C’est pour cela qu’un chocolat noir, ou un noir au café, accompagne si naturellement la soucoupe d’un
        expresso. Les restaurateurs qui se demandent quel format servir trouveront nos repères dans{' '}
        <Link href="/blog/chocolat-cafe-restaurant-hotel">notre guide du chocolat servi avec le café</Link>.
      </p>

      <h2>Quel chocolat avec un café filtre ou un café doux ?</h2>
      <p>
        Un café filtre, une cafetière à piston ou une méthode douce donnent une boisson plus longue, plus légère, où
        l’on perçoit davantage les notes fruitées ou florales du grain. Un chocolat noir très puissant les écraserait.
      </p>
      <p>
        Ici, un <strong>chocolat au lait</strong> ou un <strong>noir peu amer</strong> fonctionne mieux. Leur douceur
        laisse s’exprimer le café, et leurs notes lactées ou caramélisées répondent aux arômes de fruits secs que l’on
        trouve dans beaucoup de cafés filtres. Si vous ne connaissez pas bien la différence de composition entre ces
        chocolats, notre article{' '}
        <Link href="/blog/difference-chocolat-noir-lait-blanc">chocolat noir, au lait ou blanc</Link> la détaille.
      </p>

      <h2>Et avec un cappuccino ou un café au lait ?</h2>
      <p>
        Le lait adoucit déjà le café. Deux choix se présentent :
      </p>
      <ul>
        <li>
          <strong>Prolonger la douceur</strong> avec un chocolat au lait : l’accord est rond, très gourmand.
        </li>
        <li>
          <strong>Rétablir l’équilibre</strong> avec un chocolat noir : il rend au café l’amertume que le lait a
          gommée.
        </li>
      </ul>
      <p>
        Les deux se défendent : le premier prolonge le moment gourmand, le second ramène le café au premier plan.
      </p>

      <h2>Peut-on associer chocolat blanc et café ?</h2>
      <p>
        Oui, à condition de jouer le contraste. Le chocolat blanc ne contient pas de pâte de cacao : il est fait de
        beurre de cacao, de sucre et de lait. Seul face à un expresso, il manque de répondant aromatique. En revanche,
        avec un café noir très torréfié, presque brûlé, sa douceur fait l’effet d’un sucre croqué à côté de la tasse :
        elle arrondit l’amertume sans couvrir le café.
      </p>

      <h2>Arabica, robusta, torréfaction : qu’est-ce qui change l’accord ?</h2>
      <p>
        Le genre botanique du café compte plus d’une centaine d’espèces, mais deux assurent l’essentiel de la
        production mondiale : Coffea arabica, l’arabica, et Coffea canephora, le robusta. Le robusta
        est plus riche en caféine que l’arabica, comme le rappellent la Commission américaine du commerce
        international et les études publiées sur les deux espèces.
      </p>
      <p>
        Pour l’accord avec le chocolat, le <strong>degré de torréfaction</strong> pèse toutefois davantage que
        l’espèce. Les études sur la torréfaction du café montrent qu’une torréfaction plus longue augmente la plupart
        des pyrazines, celles qui portent les notes grillées. Une torréfaction foncée appelle donc un chocolat noir ou,
        par contraste, un chocolat blanc ; une torréfaction claire, plus acidulée, se marie mieux avec un chocolat au
        lait ou un noir doux. La même logique vaut côté cacao : plus il est torréfié, plus ses notes grillées
        ressortent.
      </p>

      <h2>Comment déguster café et chocolat ensemble ?</h2>
      <ol>
        <li>Goûtez d’abord une gorgée de café seul, pour en avoir le goût en tête.</li>
        <li>Posez un morceau de chocolat sur la langue et laissez-le fondre, sans le croquer tout de suite.</li>
        <li>Reprenez une gorgée de café pendant que le chocolat fond : la chaleur mêle les deux arômes.</li>
        <li>Terminez par une dernière gorgée seule, pour sentir ce qui reste en bouche.</li>
      </ol>
      <p>
        Servez le chocolat à température ambiante : sorti du réfrigérateur, il fond mal et ses arômes restent
        enfermés. Et préférez une petite bouchée : quelques grammes suffisent pour une tasse.
      </p>

      <h2>Quand le café est dans le chocolat</h2>
      <p>
        L’accord peut aussi se faire avant la tasse, dans le chocolat lui-même. À l’atelier de Charquemont, deux de nos
        gammes destinées aux professionnels existent en <strong>chocolat noir au café</strong> : les{' '}
        <Link href="/poissons">petits poissons</Link> et les <Link href="/petits-beurres">petits beurres</Link>, qui
        associent cacao et café torréfié. Nous proposons aussi des{' '}
        <Link href="/grains-de-cafe">grains de café enrobés de chocolat noir</Link>, emballés par sachets de trois
        grains, à poser sur la sous-tasse d’un expresso : le café croque sous le chocolat, et la boisson prolonge
        l’accord.
      </p>

      <Encadre titre="À retenir" sombre>
        <ul>
          <li>Café et cacao partagent des arômes nés de la torréfaction, dont les pyrazines.</li>
          <li>On accorde les intensités : noir avec l’expresso, lait avec le café doux ou le café au lait.</li>
          <li>Le chocolat blanc s’associe par contraste, à un café noir très torréfié.</li>
          <li>La torréfaction du café compte plus que l’espèce pour choisir son chocolat.</li>
          <li>Laissez fondre le chocolat entre deux gorgées plutôt que de le croquer.</li>
        </ul>
      </Encadre>
    </>
  )
}
