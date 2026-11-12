import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { ArrowRight } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { ESPACES } from '@/lib/espaces'

// Titre, description et Open Graph : valeurs par défaut du layout racine (la maison).
export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/**
 * Les deux portes de l'accueil, visuels de Mélanie (novembre 2026). Le texte est
 * dessiné dans l'image : il est repris tel quel dans l'`alt`, qui donne son nom au lien.
 */
const PORTES = [
  {
    espace: ESPACES.particuliers,
    image: '/images/accueil/espace-particuliers.webp',
    alt: 'Espace particuliers : découvrez nos créations chocolatées artisanales, imaginées et fabriquées avec passion. Je découvre',
  },
  {
    espace: ESPACES.professionnels,
    image: '/images/accueil/espace-professionnels.webp',
    alt: 'Espace professionnels et restaurateurs : nos petits chocolats pour accompagner le café de vos clients. En savoir plus',
  },
]

export default function Accueil() {
  return (
    <div className="landing accueil min-h-screen bg-[#25150f] font-sans text-ivory">
      <SiteHeader variant="sombre" />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-20 md:px-8 md:pb-20 md:pt-24">
        <section aria-label="Cédric Brun, le chocolat une passion depuis 1999">
          <Image
            src="/images/accueil/banniere-cedric-brun.webp"
            alt="Cédric Brun, le chocolat, une passion depuis 1999. Maître Artisan Pâtissier-Chocolatier, fabrication artisanale franc-comtoise. Trois cabosses de cacao rouge, verte et jaune."
            width={1672}
            height={941}
            priority
            sizes="(max-width: 1152px) 100vw, 1088px"
            className="h-auto w-full rounded-lg md:rounded-xl"
          />
        </section>

        <section className="px-3 pb-8 pt-10 text-center md:pb-10 md:pt-12">
          <h1 className="font-display text-[1.75rem] leading-tight md:text-[2.5rem]">
            Découvrez nos deux univers chocolatés
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#e6cbaa]">
            Des créations artisanales pour les gourmands et les professionnels de la restauration.
          </p>
        </section>

        <section aria-label="Choisissez votre espace" className="grid gap-8 md:grid-cols-2 md:gap-6">
          {PORTES.map(({ espace, image, alt }) => (
            <div key={espace.id}>
              <Link
                href={espace.href}
                className="block overflow-hidden rounded-[13px] shadow-[0_8px_26px_rgba(0,0,0,0.4)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.65)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <Image src={image} alt={alt} width={1754} height={896} sizes="(max-width: 768px) 100vw, 544px" className="h-auto w-full" />
              </Link>
              <p className="mt-3 text-center text-[13px] leading-relaxed text-ivory/60">
                {espace.produits.map((p, i) => (
                  <Fragment key={p.href}>
                    {i > 0 && <span aria-hidden> · </span>}
                    <Link href={p.href} className="underline-offset-4 hover:text-ivory hover:underline">
                      {p.label}
                    </Link>
                  </Fragment>
                ))}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-14 border-t border-[#73513b] px-3 pt-10 text-center md:mt-16">
          <h2 className="font-display text-[1.6rem] leading-tight md:text-[1.75rem]">
            Un savoir-faire artisanal depuis 1999
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-[#e7d3be]">
            À Charquemont, dans le Haut-Doubs, Mélanie et Cédric Brun partagent leur passion du chocolat et le plaisir des
            belles créations artisanales.
          </p>
          <Link
            href="/histoire"
            className="group mt-6 inline-flex h-12 items-center gap-2.5 rounded-full border border-ivory/25 px-6 text-[14px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:border-brass"
          >
            Notre histoire
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
