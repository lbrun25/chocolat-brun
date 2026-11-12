import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { Reveal } from '@/components/site/Reveal'
import { coffrets, formatEUR } from '@/lib/belles-comtoises'
import { CONTACT } from '@/lib/catalogue'
import { ESPACES } from '@/lib/espaces'
import { FLAT_SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping'

export const metadata: Metadata = {
  title: 'Espace particuliers',
  description:
    'Les créations chocolatées de Mélanie et Cédric Brun pour les particuliers : Les Belles Comtoises, vaches montbéliardes en chocolat praliné noisette, en coffrets livrés partout en France.',
  alternates: { canonical: '/particuliers' },
}

const pieces = coffrets.map((c) => c.pieces)
const prix = coffrets.map((c) => c.prixTTC)

export default function EspaceParticuliers() {
  return (
    <div className="landing bg-ivory font-sans text-ink">
      <SiteHeader />

      <main>
        <section className="bg-cream pb-14 pt-28 md:pb-20 md:pt-36">
          <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
            <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">Espace particuliers</p>
            <h1 className="font-display mt-4 text-[2.4rem] leading-[1.02] tracking-[-0.02em] text-ink sm:text-[3rem] md:text-[3.4rem]">
              Nos créations <em className="font-light italic text-cacao">chocolatées</em>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-bark">
              Imaginées et fabriquées avec passion dans notre atelier de {CONTACT.ville}, dans le Haut-Doubs.
            </p>
          </div>
        </section>

        <section className="bg-ivory py-14 md:py-20" aria-labelledby="belles-comtoises">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Link href="/belles-comtoises" className="group relative block aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[4/3]">
                <Image
                  src="/images/comtoises/coffret-20-ouvert.jpg"
                  alt="Boîte de 20 Belles Comtoises ouverte dans l’herbe : vaches au lait, caramel, blanches et noires"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="belles-comtoises" className="font-display text-[2rem] leading-tight text-ink md:text-[2.6rem]">
                Les Belles Comtoises
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed text-bark">
                Les petites vaches montbéliardes en chocolat pur beurre de cacao praliné noisette. Quatre recettes : chocolat
                au lait, noir, blanc et caramel.
              </p>
              <ul className="mt-6 space-y-1.5 text-[13.5px] text-bark tabular-nums">
                <li>
                  Coffrets de {Math.min(...pieces)} à {Math.max(...pieces)} vaches, de {formatEUR(Math.min(...prix))} à{' '}
                  {formatEUR(Math.max(...prix))} TTC
                </li>
                <li>
                  Livraison {FLAT_SHIPPING_COST} € en France métropolitaine, offerte dès {FREE_SHIPPING_THRESHOLD} € d’achat
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/belles-comtoises#coffrets"
                  className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-ink px-7 text-[15px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao"
                >
                  Voir les coffrets
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
                </Link>
                <Link
                  href="/belles-comtoises"
                  className="inline-flex h-14 items-center rounded-full border border-ink/15 px-7 text-[15px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-brass"
                >
                  Les quatre recettes
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-ink/[0.06] bg-ivory py-12 md:py-14">
          <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
            <p className="text-[14.5px] text-bark">
              Vous êtes restaurateur, hôtelier ou commerçant ?{' '}
              <Link href={ESPACES.professionnels.href} className="font-medium text-ink underline decoration-brass underline-offset-4 hover:text-cacao">
                Découvrez l’espace professionnels
              </Link>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
