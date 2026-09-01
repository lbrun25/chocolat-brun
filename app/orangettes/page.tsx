'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Bean, Candy, ChefHat, Citrus, Coffee, HandHeart, Sparkles } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import TarifsPro from '@/components/site/TarifsPro'
import { Reveal, EASE_OUT } from '@/components/site/Reveal'
import { CONDITIONNEMENT, orangettes } from '@/lib/catalogue'

const ref = orangettes[0]

/** Les quatre garanties du produit, reprises du visuel de la gamme. */
const GARANTIES = [
  { icone: Citrus, texte: 'Écorces d’orange confites de qualité' },
  { icone: Bean, texte: 'Chocolat noir pur beurre de cacao' },
  { icone: ChefHat, texte: 'Fabrication artisanale française' },
  { icone: Candy, texte: 'Emballage individuel hygiénique' },
]

const CHIFFRES = [
  { valeur: `${ref.poidsG} g`, legende: 'par pièce' },
  { valeur: `${CONDITIONNEMENT}`, legende: 'pièces par conditionnement' },
  { valeur: 'Emballées', legende: 'individuellement' },
  { valeur: 'Sans colorant', legende: 'ni conservateur' },
]

const MOMENTS = [
  {
    icone: Coffee,
    titre: 'L’accompagnement idéal',
    texte: 'Parfaites avec le café, pour offrir à vos clients une attention gourmande et mémorable.',
  },
  {
    icone: HandHeart,
    titre: 'Pratique & hygiénique',
    texte: 'Emballées individuellement pour garantir fraîcheur, hygiène et facilité de service.',
  },
  {
    icone: Sparkles,
    titre: 'Savoir-faire artisanal',
    texte: 'Une fabrication artisanale française qui garantit qualité, régularité et passion.',
  },
]

export default function OrangettesPage() {
  const reduce = useReducedMotion()
  /** Apparition du hero, neutralisée si l'utilisateur limite les animations. */
  const ouverture = (y: number) => (reduce ? false : { opacity: 0, y })

  return (
    <div className="landing bg-ivory font-sans text-ink">
      <SiteHeader variant="sombre" />

      <main>
        {/* Hero — chocolat noir */}
        <section className="relative isolate overflow-hidden bg-ink pt-28 text-ivory md:pt-36">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 md:px-8 md:pb-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div>
              <motion.p
                initial={ouverture(14)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="inline-block rounded-full border border-brass/60 px-4 py-1.5 text-[11px] font-medium uppercase tracking-eyebrow text-brass-pale"
              >
                Chocolat noir
              </motion.p>
              <motion.h1
                initial={ouverture(18)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.06 }}
                className="font-display mt-5 text-[2.8rem] leading-[0.95] tracking-[-0.02em] text-ivory sm:text-[3.6rem] md:text-[4.4rem]"
              >
                Orangettes
                <br />
                <em className="font-light italic text-brass">chocolat noir</em>
              </motion.h1>

              <motion.div
                initial={ouverture(16)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.12 }}
              >
                <span aria-hidden className="mt-7 block h-px w-16 bg-brass/50" />
                <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ivory/80 md:text-[17px]">
                  De fines écorces d’orange confites enrobées d’un chocolat noir intense pour une gourmandise raffinée
                  qui accompagne vos cafés.
                </p>
              </motion.div>

              <motion.ul
                initial={ouverture(16)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.2 }}
                className="mt-10 grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4"
              >
                {GARANTIES.map((g) => {
                  const Icone = g.icone
                  return (
                    <li key={g.texte} className="text-center">
                      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-brass/50 text-brass-pale">
                        <Icone className="h-6 w-6" strokeWidth={1.25} aria-hidden />
                      </span>
                      <p className="mt-3 text-[12px] leading-snug text-ivory/70">{g.texte}</p>
                    </li>
                  )
                })}
              </motion.ul>

              <motion.div
                initial={ouverture(16)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.28 }}
                className="mt-10"
              >
                <a
                  href="#tarifs"
                  className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-brass px-7 text-[15px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-brass-pale"
                >
                  Voir les tarifs
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 0.1 }}
              className="relative mx-auto aspect-[3/4] w-full max-w-[26rem] overflow-hidden rounded-[1.75rem] lg:max-w-none"
            >
              <Image
                src="/images/orangettes/orangette-hero.jpg"
                alt="Orangette enrobée de chocolat noir, sous emballage individuel et nue, avec des quartiers d’orange"
                fill
                priority
                sizes="(max-width: 1023px) 92vw, 44vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Le produit */}
        <section className="bg-ivory py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">Le produit</p>
                <h2 className="font-display mt-4 text-[2rem] leading-tight tracking-[-0.015em] text-ink md:text-[2.6rem]">
                  L’alliance parfaite de l’orange et du chocolat
                </h2>
                <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-bark">
                  Nos orangettes sont élaborées avec soin à partir d’écorces d’orange sélectionnées, lentement confites
                  pour révéler toutes leurs saveurs. Elles sont ensuite enrobées d’un chocolat noir de qualité
                  supérieure pour un mariage parfait entre l’intensité du cacao et la fraîcheur fruitée de l’orange.
                </p>

                <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {CHIFFRES.map((c) => (
                    <li key={c.legende} className="rounded-xl border border-ink/[0.07] bg-cream px-4 py-5 text-center">
                      <p className="font-display text-[1.4rem] leading-none text-ink tabular-nums">{c.valeur}</p>
                      <p className="mt-2 text-[12px] leading-snug text-bark">{c.legende}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper">
                <Image
                  src="/images/orangettes/orangette-coupe.jpg"
                  alt="Deux orangettes, dont une coupée laissant voir l’écorce d’orange confite"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Pensées pour vos moments café */}
        <section className="bg-cacao py-16 text-ivory md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
            <Reveal>
              <div>
                <h2 className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-pale/80">
                  Pensées pour sublimer vos moments café
                </h2>
                <ul className="mt-8 space-y-8">
                  {MOMENTS.map((m) => {
                    const Icone = m.icone
                    return (
                      <li key={m.titre} className="flex gap-5">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ivory/10 text-brass-pale">
                          <Icone className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                        </span>
                        <div>
                          <h3 className="font-display text-[1.3rem] leading-tight text-ivory">{m.titre}</h3>
                          <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-ivory/70">{m.texte}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/orangettes/orangette-cafe.jpg"
                  alt="Tasse de café expresso accompagnée d’orangettes en chocolat noir"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <TarifsPro refs={orangettes} />
      </main>

      <SiteFooter />
    </div>
  )
}
