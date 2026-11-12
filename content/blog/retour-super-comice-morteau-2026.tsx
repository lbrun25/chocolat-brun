import Link from 'next/link'
import { Cta, Encadre, Exergue, Figure } from '@/components/blog/ArticleBlocks'

/** Texte et photos fournis par la maison (Mélanie et Cédric Brun), le 6 novembre 2026. */

const DOSSIER = '/images/blog/retour-super-comice-morteau-2026'

export default function RetourSuperComiceMorteau2026() {
  return (
    <>
      <p className="lead">
        Le <strong>samedi 24 octobre 2026</strong>, nous avons eu le plaisir de participer au{' '}
        <strong>Super Comice du Val de Morteau</strong>, à l’occasion du marché des producteurs locaux.
      </p>
      <p>
        Pour cette fête du patrimoine franc-comtois, nous avions préparé un stand aux couleurs des{' '}
        <strong>
          <Link href="/belles-comtoises">Belles Comtoises</Link>
        </strong>
        , nos vaches montbéliardes en chocolat, clin d’œil gourmand à notre région et à ses traditions.
      </p>

      <h2>Le terroir franc-comtois à croquer</h2>
      <p>
        Sur notre stand, les visiteurs pouvaient découvrir nos coffrets de vaches chocolatées, nos petites cagettes
        gourmandes, ainsi que <strong>Maggy la guimauve</strong> et d’autres créations artisanales.
      </p>
      <p>
        Une belle occasion de partager notre attachement au Haut-Doubs et notre passion du chocolat, que nous cultivons à
        Charquemont depuis 1999.
      </p>

      <Figure
        src={`${DOSSIER}/stand-exterieur.jpg`}
        alt="Vue extérieure du stand Les Belles Comtoises au marché des producteurs"
        width={1536}
        height={1152}
        legende="Notre espace au marché des producteurs locaux."
      />

      <Exergue>De la tradition comtoise à la gourmandise, il n’y a qu’un chocolat !</Exergue>

      <h2>Une fête de rencontres et de traditions</h2>
      <p>
        Malgré un ciel gris et la pluie, le comice a rassemblé éleveurs,{' '}
        <Link href="/blog/vache-montbeliarde-franche-comte">vaches montbéliardes</Link> et visiteurs autour d’un
        patrimoine vivant. Une ambiance qui rappelle combien ces rendez-vous comptent pour notre territoire.
      </p>

      <Figure
        src={`${DOSSIER}/comice-vaches.jpg`}
        alt="Vaches montbéliardes et visiteurs sous les parapluies lors du Super Comice"
        width={1536}
        height={1152}
        legende="Les montbéliardes à l’honneur lors du Super Comice."
      />

      <Encadre titre="Merci à vous !" sombre>
        <p className="font-display text-[1.45rem] leading-snug text-ivory">Merci pour vos visites et vos échanges</p>
        <p>
          Un grand merci à toutes celles et ceux qui sont venus à notre rencontre, découvrir nos chocolats et partager
          quelques mots avec nous. Ces moments de convivialité donnent tout leur sens à notre métier d’artisan.
        </p>
        <p>
          <strong>Mélanie et Cédric Brun</strong>
          <br />
          Maître Artisan Pâtissier-Chocolatier · Charquemont
        </p>
        <div className="pt-3">
          <Cta href="/" clair>
            Découvrir notre chocolaterie
          </Cta>
        </div>
      </Encadre>
    </>
  )
}
