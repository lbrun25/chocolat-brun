import { Exergue } from '@/components/blog/ArticleBlocks'
import { VideoArticle } from '@/components/blog/VideoArticle'

const DOSSIER = '/images/blog/orangettes-chocolat-noir'

/** Texte de Mélanie (19/11/2026), publié tel quel (son sous-titre est l’extrait, affiché sous le titre) ; vidéo de l'atelier ajoutée à la demande de Lucien. */
export default function OrangettesChocolatNoir() {
  return (
    <>
      <h2>Une alliance de saveurs irrésistible</h2>
      <p>Il est des gourmandises qui traversent les saisons sans jamais perdre leur charme…</p>
      <p>
        Les orangettes au chocolat noir font partie de ces petits plaisirs incontournables, où la douceur fruitée de
        l’orange rencontre l’intensité du chocolat noir.
      </p>
      <p>
        Un mariage subtil entre les notes acidulées de l’orange confite et les arômes généreux du chocolat, pour une
        dégustation tout en finesse.
      </p>

      <h2>Une gourmandise qui invite au partage</h2>
      <p>
        Chez Cédric Brun, Maître Artisan Pâtissier-Chocolatier depuis 1999, nous aimons mettre à l’honneur ces plaisirs
        chocolatés qui accompagnent les instants de convivialité.
      </p>
      <p>
        À déguster avec un café ou un thé à partager en famille ou à offrir à ses proches, les orangettes au chocolat noir
        trouvent naturellement leur place parmi les douceurs des fêtes de fin d’année.
      </p>

      <h2>Un écrin gourmand pour Noël</h2>
      <p>Pour les fêtes, nos orangettes se parent de leurs plus beaux habits.</p>
      <p>
        Présentées dans de jolies boîtes transparentes, agrémentées de rubans et de décorations aux couleurs de Noël,
        elles deviennent une délicate attention à glisser sous le sapin ou à déposer sur une table de fête.
      </p>
      <p>Une idée de cadeau à la fois simple, raffinée et intensément chocolatée.</p>

      <h2>Le plaisir du chocolat, la passion de l’artisanat</h2>
      <VideoArticle
        src={`${DOSSIER}/enrobage-orangettes.mp4`}
        poster={`${DOSSIER}/enrobage-orangettes-poster.jpg`}
        width={720}
        height={1280}
        description="Des bâtonnets d’orange confite avancent sur la grille de l’enrobeuse et ressortent nappés de chocolat"
        legende="L’enrobage des orangettes dans notre atelier de Charquemont"
      />
      <p>
        <strong>Cédric Brun – Maître Artisan Pâtissier-Chocolatier</strong>
        <br />
        <em>Fabrication artisanale franc-comtoise – Charquemont</em>
      </p>

      <Exergue>« Le petit chocolat, le grand plaisir. »</Exergue>
    </>
  )
}
