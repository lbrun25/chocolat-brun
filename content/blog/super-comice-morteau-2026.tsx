import Link from 'next/link'
import { Cta, Encadre, Exergue, Figure, Galerie } from '@/components/blog/ArticleBlocks'

const DOSSIER = '/images/blog/super-comice-morteau-2026'

export default function SuperComiceMorteau2026() {
  return (
    <>
      <p className="lead">
        Nous avons le plaisir de vous annoncer que <strong>Mélanie et Cédric Brun seront présents au Super Comice du
        patrimoine de Morteau, le samedi 24 octobre 2026</strong>, pour vous faire découvrir leurs spécialités chocolatées
        artisanales.
      </p>
      <p>
        Cet événement incontournable de notre région est une magnifique occasion de célébrer notre terroir, nos traditions
        et le savoir-faire de nos artisans.
      </p>

      <Figure
        src={`${DOSSIER}/coffret-belles-comtoises-30.jpg`}
        alt="Boîte de trente Belles Comtoises posée sur l’herbe : vaches en chocolat au lait, caramel, blanc et noir"
        width={1086}
        height={1448}
        ajustement="contain"
        legende="La boîte de 30 Belles Comtoises, en quatre recettes"
      />

      <h2>Les Belles Comtoises à l’honneur</h2>
      <p>
        À cette occasion, nous aurons le plaisir de vous présenter <Link href="/">Les Belles Comtoises</Link>, nos
        petites vaches montbéliardes en chocolat pur beurre de cacao, garnies d’un délicieux praliné noisette.
      </p>
      <p>
        Fabriquées artisanalement dans notre atelier de Charquemont, elles rendent hommage à notre belle Franche-Comté et
        à son emblématique <Link href="/blog/vache-montbeliarde-franche-comte">vache montbéliarde</Link>, star de tous
        les comices du Haut-Doubs.
      </p>
      <p>
        Vous pourrez retrouver nos différents coffrets, à offrir ou à savourer, pour le plaisir des petits et des grands.
      </p>

      <Galerie
        images={[
          {
            src: `${DOSSIER}/coffret-belles-comtoises-ouvert.jpg`,
            alt: 'Coffret ouvert de petites vaches en chocolat artisanales, rangées par recette',
            width: 1086,
            height: 1448,
            legende: 'Nos petites vaches en chocolat',
          },
          {
            src: `${DOSSIER}/emballage-belles-comtoises.jpg`,
            alt: 'Réglette Les Belles Comtoises au décor tacheté, nouée de raphia avec son étiquette',
            width: 1086,
            height: 1448,
            legende: 'Un emballage aux couleurs de notre terroir',
          },
        ]}
      />

      <Exergue>Les Belles Comtoises : elles sont inimitables et inoubliables !</Exergue>

      <h2>Au programme du Super Comice</h2>
      <p>
        Organisé dans les rues de Morteau, le Super Comice du patrimoine du Val de Morteau réunit éleveurs, producteurs et
        passionnés autour de quatre grands pôles :
      </p>
      <ul>
        <li>
          <strong>Concours et restauration</strong> au champ de foire ;
        </li>
        <li>
          <strong>Exposition de chevaux et de vaches</strong>, rue de la Gare ;
        </li>
        <li>
          <strong>Pôle fromagers et marché de producteurs</strong>, Grande Rue ;
        </li>
        <li>
          <strong>Exposition de vieux tracteurs</strong>, rue de l’Helvétie.
        </li>
      </ul>
      <p>
        Une journée idéale pour admirer les plus belles montbéliardes du Haut-Doubs… puis croquer leur version en
        chocolat !
      </p>

      <h2>Un savoir-faire artisanal depuis 1999</h2>
      <p>Artisans passionnés, nous mettons tout notre cœur dans la fabrication de nos chocolats.</p>
      <p>
        Notre engagement : sélectionner de belles matières premières, privilégier la qualité et proposer des créations qui
        reflètent notre passion pour le chocolat et notre attachement à la Franche-Comté. Découvrez{' '}
        <Link href="/histoire">notre histoire</Link> et <Link href="/galerie">notre atelier en images</Link>.
      </p>
      <p>
        <strong>Cédric Brun – Maître Artisan Pâtissier Chocolatier</strong>
      </p>

      <Encadre titre="Venez nous rencontrer" sombre>
        <p>
          Nous serons ravis de vous accueillir sur notre stand, d’échanger avec vous et de vous faire découvrir nos
          gourmandises. Que vous soyez déjà clients ou simplement curieux de découvrir notre univers chocolaté, nous vous
          attendons avec grand plaisir !
        </p>
        <ul>
          <li>
            <strong>Où :</strong> Super Comice du patrimoine, Morteau – Doubs (25)
          </li>
          <li>
            <strong>Quand :</strong> samedi 24 octobre 2026
          </li>
        </ul>
        <div className="pt-3">
          <Cta href="/#coffrets" clair>
            Découvrir Les Belles Comtoises
          </Cta>
        </div>
      </Encadre>

      <p>
        Vous ne pouvez pas vous déplacer ? Nos coffrets sont aussi{' '}
        <Link href="/#coffrets">disponibles en ligne</Link>, livrés partout en France métropolitaine.
      </p>
      <p>
        <strong>À très bientôt au Super Comice !</strong>
        <br />
        Mélanie et Cédric Brun – Charquemont
      </p>
    </>
  )
}
