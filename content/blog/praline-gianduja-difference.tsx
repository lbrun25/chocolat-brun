import Link from 'next/link'
import { Encadre, Figure } from '@/components/blog/ArticleBlocks'
import type { QuestionFaq } from '@/content/blog/types'

export const faq: QuestionFaq[] = [
  {
    question: 'Le gianduja contient-il du praliné ?',
    reponse:
      'Pas d’après sa définition légale. La directive européenne 2000/36/CE décrit le chocolat au gianduja comme un chocolat auquel on ajoute des noisettes finement broyées : il n’y est pas question de praliné. Un fabricant peut associer les deux dans une même confiserie, mais la liste des ingrédients le dira alors.',
  },
  {
    question: 'Combien de noisettes faut-il dans un chocolat au gianduja ?',
    reponse:
      'Selon la directive 2000/36/CE, de 20 à 40 g de noisettes finement broyées pour 100 g de produit dans le chocolat au gianduja, et de 15 à 40 g dans le chocolat au lait gianduja.',
  },
  {
    question: 'Un praliné peut-il être fait avec d’autres fruits que l’amande ou la noisette ?',
    reponse:
      'Oui. Le code d’usages du praliné publié par le Syndicat du chocolat demande alors que le nom du fruit à coque accompagne la dénomination, par exemple « praliné pistache ».',
  },
  {
    question: 'Que veut dire « praliné à l’ancienne » ?',
    reponse:
      'Selon le code d’usages de la profession, révisé en 2020, cette mention, comme « praliné traditionnel », est réservée à un praliné sans ingrédient facultatif ni arôme, obtenu à partir de fruits à coque entiers torréfiés et de sucre cuit.',
  },
]

export default function PralineGiandujaDifference() {
  return (
    <>
      <p className="lead">
        Le praliné et le gianduja sont deux pâtes de fruits à coque, mais ils ne se fabriquent pas avec les mêmes
        ingrédients. Le praliné associe des amandes ou des noisettes à du sucre, sans chocolat. Le gianduja est un
        chocolat dans lequel on a broyé finement des noisettes. Le premier relève d’un code professionnel, le second
        d’une définition légale européenne.
      </p>

      <h2>Qu’est-ce que le praliné ?</h2>
      <p>
        Le praliné est un produit de confiserie, le plus souvent utilisé comme fourrage. C’est ainsi que le décrit le{' '}
        <strong>code d’usages « Praliné »</strong> du Syndicat du chocolat (Alliance 7), dans sa version révisée en
        octobre 2020. Ce texte n’est pas une loi : c’est la règle que la profession s’est donnée pour nommer les
        produits de façon loyale.
      </p>
      <p>Ce code retient trois points :</p>
      <ul>
        <li>
          <strong>des fruits à coque et du sucre</strong>, intimement mélangés puis broyés : des amandes douces ou des
          noisettes, décortiquées et éventuellement torréfiées ;
        </li>
        <li>
          <strong>au moins 50 % de fruits à coque</strong> : un praliné ne peut pas descendre sous ce seuil ;
        </li>
        <li>
          <strong>le nom du fruit</strong> quand ce n’est ni l’amande ni la noisette, par exemple « praliné
          pistache ».
        </li>
      </ul>
      <p>
        Le chocolat ne fait pas partie de la définition. Un praliné, c’est le goût du fruit et du sucre, rien
        d’autre. Les arômes y sont encadrés : seuls des arômes naturels qui n’imitent pas la saveur
        du praliné ou des fruits à coque sont admis.
      </p>

      <h2>Qu’est-ce que le gianduja ?</h2>
      <p>
        Le gianduja, lui, est d’abord un chocolat. La directive européenne 2000/36/CE du 23 juin 2000, reprise en
        France par le décret n° 2003-702 du 29 juillet 2003, définit deux produits :
      </p>
      <ul>
        <li>
          <strong>le chocolat au gianduja</strong> : il part d’un chocolat contenant au moins 32 % de matière sèche
          totale de cacao, dont 8 % de cacao sec dégraissé, et contient de 20 à 40 g de noisettes finement broyées
          pour 100 g ;
        </li>
        <li>
          <strong>le chocolat au lait gianduja</strong> : il part d’un chocolat au lait contenant au moins 10 % de
          matière sèche de lait, et contient de 15 à 40 g de noisettes finement broyées pour 100 g.
        </li>
      </ul>
      <p>
        Le ministère de l’Économie le résume ainsi dans sa fiche sur les dénominations du chocolat : le gianduja est
        fait de chocolat et de noisettes finement broyées, et peut contenir du lait. Contrairement au praliné, la
        loi ne parle ici que de noisettes.
      </p>

      <h2>Praliné ou gianduja : quelles différences, point par point ?</h2>
      <ul>
        <li>
          <strong>Le chocolat</strong> : absent de la définition du praliné, il est la base du gianduja.
        </li>
        <li>
          <strong>Les fruits</strong> : amandes, noisettes ou autres fruits à coque nommés pour le praliné ;
          noisettes seulement pour le gianduja légal.
        </li>
        <li>
          <strong>La proportion</strong> : au moins 50 % de fruits à coque dans un praliné ; de 15 ou 20 à 40 g de
          noisettes pour 100 g dans un gianduja.
        </li>
        <li>
          <strong>Le texte de référence</strong> : un code d’usages de la profession pour le praliné ; une directive
          européenne, donc une obligation légale, pour le gianduja.
        </li>
        <li>
          <strong>Le goût</strong> : le praliné met en avant le fruit et le sucre ; le gianduja mêle la
          noisette au cacao, puisqu’il contient du chocolat.
        </li>
      </ul>

      <Encadre titre="Pourquoi on les confond">
        <p>
          Les deux sont des pâtes lisses et brunes, souvent à la noisette, et on les trouve au cœur des mêmes
          bonbons de chocolat. Un praliné enrobé de chocolat ressemble beaucoup à un gianduja une fois en bouche.
          La différence se lit dans la recette : dans un bonbon praliné, le chocolat est l’enveloppe ; dans le
          gianduja, il est mélangé aux noisettes.
        </p>
      </Encadre>

      <h2>Comment les reconnaître sur l’étiquette ?</h2>
      <ol>
        <li>
          <strong>La dénomination.</strong> « Chocolat au gianduja » ou « chocolat au lait gianduja » ne s’emploient
          que si les seuils de la directive sont respectés. « Praliné » suivi d’un nom de fruit indique un praliné
          d’un autre fruit à coque que l’amande ou la noisette.
        </li>
        <li>
          <strong>Le pourcentage de praliné.</strong> Le code d’usages prévoit qu’il figure dans l’étiquetage, par
          exemple dans la liste des ingrédients, calculé sur la base de sa définition.
        </li>
        <li>
          <strong>Les mentions « à l’ancienne » ou « traditionnel ».</strong> Elles signalent un praliné sans
          ingrédient facultatif ni arôme, fait de fruits à coque entiers torréfiés et de sucre cuit.
        </li>
        <li>
          <strong>La liste des ingrédients</strong>, pour tout le reste : c’est elle qui dit exactement ce que
          contient un produit, et c’est à elle qu’il faut toujours se reporter.
        </li>
      </ol>
      <p>
        L’enrobage obéit aux règles générales du chocolat. Un chocolat qui annonce « pur beurre de cacao » ne contient
        aucune autre matière grasse végétale : nous expliquons cette mention dans{' '}
        <Link href="/blog/pur-beurre-de-cacao-signification">notre article sur le pur beurre de cacao</Link>, et les
        seuils des chocolats noir, au lait et blanc dans{' '}
        <Link href="/blog/difference-chocolat-noir-lait-blanc">notre guide des différences entre les trois
        chocolats</Link>.
      </p>

      <Figure
        src="/images/galerie/vaches-coques-chocolat-detail.jpg"
        alt="Gros plan sur des moules en plastique vert où sèchent des coques de chocolat au lait en forme de vache, encore creuses"
        width={1200}
        height={1600}
        ajustement="contain"
        legende="Coques de vaches en chocolat au lait dans leurs moules, à l’atelier de Charquemont."
      />

      <h2>Praliné ou gianduja : lequel choisir ?</h2>
      <p>
        Aucun n’est supérieur à l’autre : ce sont deux façons de travailler le fruit à coque. Ceux qui aiment le
        goût franc de la noisette et du sucre se tourneront vers le praliné. Ceux qui préfèrent une
        bouchée où le cacao et la noisette se fondent l’un dans l’autre choisiront le gianduja.
      </p>
      <p>
        Chez nous, c’est le praliné noisette qui a été retenu pour les{' '}
        <Link href="/#coffrets">Belles Comtoises</Link>, nos vaches montbéliardes en chocolat pur beurre de cacao,
        moulées et enrobées dans notre atelier de Charquemont. Elles existent en quatre recettes, lait, noir, blanc et
        caramel, et la composition de chacune figure sur son étiquette.
      </p>

      <Encadre titre="À retenir" sombre>
        <ul>
          <li>Praliné : fruits à coque et sucre broyés, au moins 50 % de fruits à coque, sans chocolat.</li>
          <li>Gianduja : chocolat et noisettes finement broyées, de 20 à 40 g pour 100 g (15 à 40 g au lait).</li>
          <li>Le praliné relève d’un code d’usages de la profession ; le gianduja, de la directive 2000/36/CE.</li>
          <li>Sur l’emballage : dénomination, pourcentage de praliné et liste des ingrédients.</li>
        </ul>
      </Encadre>
    </>
  )
}
