import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { coffrets, formatEUR } from '@/lib/belles-comtoises'
import { CONTACT } from '@/lib/catalogue'
import { ESPACES, type Espace } from '@/lib/espaces'

// Titre, description et Open Graph : valeurs par défaut du layout racine (la maison).
export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const pieces = coffrets.map((c) => c.pieces)
const prixMin = Math.min(...coffrets.map((c) => c.prixTTC))

/**
 * Photo en tête de porte, bord à bord. Les deux photos sont en 3:2 : elles s'affichent entières
 * et les deux cartes gardent la même hauteur d'image côte à côte. Les coins du haut sont
 * arrondis par la carte (overflow-hidden).
 */
function PhotoPorte({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[3/2] w-full">
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
    </div>
  )
}

/** Liens directs vers les produits d'un espace, sous le bouton principal de sa porte. */
function LiensProduits({ espace }: { espace: Espace }) {
  return (
    <ul className="relative z-10 mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink/10 pt-5 text-[13.5px]">
      {espace.produits.map((p) => (
        <li key={p.href}>
          <Link href={p.href} className="text-bark underline decoration-brass/50 underline-offset-4 hover:text-ink hover:decoration-brass">
            {p.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Bouton principal d'une porte : son lien couvre toute la carte (les liens produits restent au-dessus). */
function BoutonPorte({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-7 inline-flex h-14 items-center gap-2.5 rounded-full bg-ink px-7 text-[15px] font-medium text-ivory transition-colors after:absolute after:inset-0 after:rounded-[inherit] group-hover:bg-cacao"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" strokeWidth={1.75} aria-hidden />
    </Link>
  )
}

export default function Accueil() {
  return (
    <div className="landing bg-ivory font-sans text-ink">
      <SiteHeader variant="sombre" />

      <main>
        {/*
          Hero plein écran, texte posé sur la photo de Mélanie et Cédric. La photo est en portrait :
          sur mobile et tablette elle couvre tout l'écran ; sur grand écran elle occupe la droite,
          fondue dans une version floutée d'elle-même qui remplit le reste de l'écran sous le texte.
        */}
        <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-ivory lg:items-center">
          {/* Fond flou précalculé (bande gauche de la photo étirée puis floutée) : pas de filtre CSS à dessiner */}
          <div className="absolute inset-0 -z-30 hidden lg:block" aria-hidden>
            <Image src="/images/accueil/hero-fond-flou.webp" alt="" fill unoptimized className="object-cover" />
          </div>
          <div className="absolute inset-0 -z-20 lg:left-auto lg:w-[58%] lg:[mask-image:linear-gradient(to_right,transparent,black_24%)]">
            <Image
              src="/images/comtoises/melanie-cedric.jpg"
              alt="Mélanie et Cédric Brun dans un pré du Haut-Doubs, des coffrets de Belles Comtoises à la main, devant des vaches montbéliardes"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-[50%_8%] lg:object-top"
            />
          </div>
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-ink/60 to-ink/10 lg:bg-gradient-to-r lg:from-ink/85 lg:via-ink/55 lg:to-transparent"
            aria-hidden
          />
          {/* Assombrit le haut pour garder le menu lisible sur le ciel */}
          <div className="absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-ink/55 to-transparent" aria-hidden />
          <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-32 md:px-8 md:pb-20 lg:py-32">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-pale">
                {CONTACT.marque}, Maître Artisan Pâtissier Chocolatier
              </p>
              <h1 className="font-display mt-4 text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-ivory sm:text-[3.4rem] md:text-[4.4rem] lg:text-[4rem] xl:text-[4.6rem]">
                Le chocolat, <em className="font-light italic text-brass-pale">une passion depuis 1999</em>
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ivory/85 md:text-[18px]">
                Mélanie et Cédric Brun fabriquent leurs chocolats à {CONTACT.ville}, dans le Haut-Doubs : pour les
                gourmands comme pour les professionnels de la restauration.
              </p>
              <Link
                href="#univers"
                className="group mt-8 inline-flex h-14 items-center gap-2.5 rounded-full bg-ivory px-7 text-[15px] font-medium text-ink transition-colors hover:bg-brass-pale"
              >
                Découvrir nos chocolats
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" strokeWidth={1.75} aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="univers" className="bg-ivory pb-16 pt-12 md:pb-24 md:pt-16">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 id="univers" className="font-display scroll-mt-28 text-center text-[1.9rem] leading-tight text-ink md:text-[2.6rem]">
              Deux univers chocolatés
            </h2>

            <div className="mt-9 grid gap-6 md:mt-12 lg:grid-cols-2 lg:gap-8">
              <article className="group relative flex flex-col overflow-hidden rounded-[28px] bg-sable transition-shadow duration-300 hover:shadow-lift">
                <PhotoPorte
                  src="/images/accueil/belles-comtoises-paille.webp"
                  alt="Quatre Belles Comtoises en chocolat blanc, caramel, au lait et noir, posées sur de la paille dorée"
                />
                <div className="flex flex-1 flex-col p-7 pt-9 md:p-10 md:pt-10">
                  <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">Pour les gourmands</p>
                  <h3 className="font-display mt-3 text-[2rem] leading-[1.05] text-ink md:text-[2.5rem]">
                    {ESPACES.particuliers.titre}
                  </h3>
                  <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-bark">
                    Les Belles Comtoises, nos petites vaches montbéliardes en chocolat praliné noisette. Au lait, noir,
                    blanc ou caramel, en coffrets de {Math.min(...pieces)} à {Math.max(...pieces)} vaches.
                  </p>
                  <p className="mt-3 text-[13.5px] text-bark tabular-nums">
                    Coffrets à partir de {formatEUR(prixMin)}, livrés en France métropolitaine.
                  </p>
                  <div className="mt-auto">
                    <BoutonPorte href={ESPACES.particuliers.href}>Je découvre</BoutonPorte>
                    <LiensProduits espace={ESPACES.particuliers} />
                  </div>
                </div>
              </article>

              <article className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-ink/[0.07] transition-shadow duration-300 hover:shadow-lift">
                <PhotoPorte
                  src="/images/accueil/tasse-cafe-chocolat.webp"
                  alt="Tasse d'expresso sur sa soucoupe, accompagnée d'un petit chocolat emballé individuellement et de grains de café"
                />
                <div className="flex flex-1 flex-col p-7 pt-9 md:p-10 md:pt-10">
                  <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">
                    Restaurants, hôtels, cafés, traiteurs
                  </p>
                  <h3 className="font-display mt-3 text-[2rem] leading-[1.05] text-ink md:text-[2.5rem]">
                    {ESPACES.professionnels.titre}
                  </h3>
                  <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-bark">
                    Nos petits chocolats pour accompagner le café de vos clients, emballés individuellement et vendus
                    par carton.
                  </p>
                  <p className="mt-3 text-[13.5px] text-bark">Tarifs et commande en ligne avec un compte professionnel.</p>
                  <div className="mt-auto">
                    <BoutonPorte href={ESPACES.professionnels.href}>Voir les gammes</BoutonPorte>
                    <LiensProduits espace={ESPACES.professionnels} />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section aria-labelledby="maison" className="bg-cream py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[28px] lg:max-w-none">
              <Image
                src="/images/comtoises/melanie-cedric.jpg"
                alt="Mélanie et Cédric Brun dans un pré du Haut-Doubs, des coffrets de Belles Comtoises à la main, devant des vaches montbéliardes"
                fill
                sizes="(max-width: 1024px) 384px, 440px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <h2 id="maison" className="font-display text-[2rem] leading-[1.05] text-ink md:text-[2.8rem]">
                Un savoir-faire artisanal, <em className="font-light italic text-cacao">en famille</em>
              </h2>
              <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-bark">
                À {CONTACT.ville}, Mélanie et Cédric Brun partagent leur passion du chocolat et le plaisir des belles
                créations artisanales. Tout est fabriqué dans leur atelier.
              </p>
              <Link
                href="/histoire"
                className="group mt-8 inline-flex h-14 items-center gap-2.5 rounded-full border border-ink/20 px-7 text-[15px] font-medium text-ink transition-colors hover:border-brass hover:bg-ivory"
              >
                Notre histoire
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" strokeWidth={1.75} aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
