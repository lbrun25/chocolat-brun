import { Exergue, Figure } from '@/components/blog/ArticleBlocks'
import { VideoArticle } from '@/components/blog/VideoArticle'
import Link from 'next/link'
import { CONTACT } from '@/lib/catalogue'

/** Texte de la maison (25/11/2026), publié tel quel ; photos et vidéo de l’atelier ajoutées à la demande de Lucien (mêmes fichiers que la galerie). */
export default function DattesChocolateesNoel2026() {
  return (
    <>
      <h2>Une irrésistible gourmandise pour les fêtes</h2>
      <p>
        Pour les fêtes de fin d’année, découvrez nos délicieuses <strong>dattes chocolatées</strong>, déclinées en deux
        recettes.
      </p>

      <h2>Dattes enrobées de chocolat noir</h2>
      <p>Toute la douceur naturelle de la datte associée à l’intensité du chocolat noir.</p>
      <Figure
        src="/images/galerie/dattes-enrobeuse-chocolat-noir.jpg"
        alt="Dattes sur le tapis de l’enrobeuse, sous le voile de chocolat noir"
        width={1200}
        height={1600}
        ajustement="contain"
        legende="Les dattes passent sous le voile de chocolat de l’enrobeuse"
      />

      <h2>Dattes chocolatées façon Dubaï</h2>
      <p>
        Des dattes fondantes au cœur croustillant de praliné pistache et de kadaïf grillé, le tout délicatement enrobé de
        chocolat noir.
      </p>
      <p>Une rencontre entre fondant, croquant et gourmandise qui ravira vos papilles !</p>
      <Figure
        src="/images/galerie/dattes-dubai-pistache-kadaif-avant-enrobage.jpg"
        alt="Dattes ouvertes et garnies de praliné pistache et de kadaïf, posées sur du papier sulfurisé avant l’enrobage"
        width={1200}
        height={1600}
        ajustement="contain"
        legende="Les dattes garnies de praliné pistache et de kadaïf, avant l’enrobage"
      />
      <Figure
        src="/images/galerie/dattes-dubai-enrobees-kadaif.jpg"
        alt="Dattes façon Dubaï enrobées de chocolat noir, parsemées d’éclats de kadaïf grillé, alignées sur du papier sulfurisé"
        width={1200}
        height={1600}
        ajustement="contain"
        legende="Les dattes façon Dubaï, enrobées de chocolat noir et parsemées de kadaïf"
      />
      <VideoArticle
        src="/videos/galerie/dattes-dubai-enrobeuse.mp4"
        poster="/images/blog/dattes-chocolatees-noel-2026/enrobeuse-poster.jpg"
        width={576}
        height={1024}
        description="Des dattes garnies de praliné pistache avancent sur la grille de l’enrobeuse et reçoivent leur voile de chocolat noir"
        legende="L’enrobage des dattes façon Dubaï dans notre atelier de Charquemont"
      />

      <h2>À offrir ou à déguster</h2>
      <p>À offrir ou à déguster pour le simple plaisir des fêtes.</p>
      <p>
        <strong>Nouveauté Noël 2026</strong>, nos dattes chocolatées sont vendues{' '}
        <strong>uniquement en magasin</strong>, dans notre boutique à Charquemont, {CONTACT.adresse},{' '}
        {CONTACT.codePostal} {CONTACT.ville}.
      </p>

      <h2>Découvrez nos autres produits vendus en ligne</h2>
      <p>
        Vous ne pouvez pas passer à la boutique ? Retrouvez en ligne{' '}
        <Link href="/belles-comtoises#coffrets">Les Belles Comtoises</Link>, nos petites vaches montbéliardes en chocolat
        praliné noisette, en coffrets livrés partout en France métropolitaine.
      </p>
      <p>
        <strong>Cédric Brun – Maître Artisan Pâtissier-Chocolatier</strong>
        <br />
        <em>Fabrication artisanale franc-comtoise – Charquemont</em>
      </p>

      <Exergue>« Le petit chocolat, le grand plaisir. »</Exergue>
    </>
  )
}
