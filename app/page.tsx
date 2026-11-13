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

/** Les quatre recettes, photos détourées (public/images/accueil). L'ordre donne le chevauchement. */
const VACHES = [
  { src: '/images/accueil/vache-noir.webp', w: 640, h: 534, classe: 'w-[28%] translate-y-[4%]' },
  { src: '/images/accueil/vache-lait.webp', w: 640, h: 523, classe: 'z-10 -ml-[6%] w-[33%]' },
  { src: '/images/accueil/vache-blanc.webp', w: 640, h: 543, classe: '-ml-[6%] w-[27%] translate-y-[6%]' },
  { src: '/images/accueil/vache-caramel.webp', w: 640, h: 540, classe: '-ml-[7%] w-[24%] translate-y-[10%]' },
]

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
      <SiteHeader />

      <main>
        <section className="bg-cream pt-28 md:pt-36">
          <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
            <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">{CONTACT.marque}, Maître Artisan Pâtissier Chocolatier</p>
            <h1 className="font-display mt-4 text-[2.5rem] leading-[1.02] tracking-[-0.02em] text-ink sm:text-[3.2rem] md:text-[4rem]">
              Le chocolat, <em className="font-light italic text-cacao">une passion depuis 1999</em>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-bark md:text-[17px]">
              Mélanie et Cédric Brun fabriquent leurs chocolats à {CONTACT.ville}, dans le Haut-Doubs : pour les gourmands
              comme pour les professionnels de la restauration.
            </p>
          </div>
          {/* Les cabosses sont posées à cheval sur la limite entre le hero et la suite de la page */}
          <div className="relative mt-8 md:mt-10">
            <div className="absolute inset-x-0 bottom-0 h-[42%] bg-ivory" aria-hidden />
            <div className="relative mx-auto max-w-[46rem] px-6">
              <div
                className="absolute inset-x-[8%] bottom-[2%] h-[14%] rounded-[50%] bg-ink/30 blur-xl"
                aria-hidden
              />
              <Image
                src="/images/accueil/cabosses.webp"
                alt="Trois cabosses de cacao : une rouge, une verte et une jaune"
                width={1400}
                height={425}
                priority
                sizes="(max-width: 768px) 92vw, 690px"
                className="relative h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="univers" className="bg-ivory pb-16 pt-12 md:pb-24 md:pt-16">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 id="univers" className="font-display text-center text-[1.9rem] leading-tight text-ink md:text-[2.6rem]">
              Deux univers chocolatés
            </h2>

            <div className="mt-9 grid gap-6 md:mt-12 lg:grid-cols-2 lg:gap-8">
              <article className="group relative flex flex-col overflow-hidden rounded-[28px] bg-sable transition-shadow duration-300 hover:shadow-lift">
                <div className="flex h-48 items-end justify-center px-[5%] pt-8 sm:h-60 md:h-72 md:pt-10" aria-hidden>
                  {VACHES.map((v) => (
                    <Image
                      key={v.src}
                      src={v.src}
                      alt=""
                      width={v.w}
                      height={v.h}
                      sizes="(max-width: 1024px) 30vw, 200px"
                      className={`h-auto drop-shadow-[0_14px_14px_rgba(59,30,18,0.28)] ${v.classe}`}
                    />
                  ))}
                </div>
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
                <div className="flex h-48 items-end justify-center px-[5%] pt-8 sm:h-60 md:h-72 md:pt-10" aria-hidden>
                  <Image
                    src="/images/accueil/cafe.webp"
                    alt=""
                    width={900}
                    height={700}
                    sizes="(max-width: 1024px) 60vw, 330px"
                    className="h-full w-auto object-contain"
                  />
                </div>
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
