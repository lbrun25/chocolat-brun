'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Bean, Candy, Coffee } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import TarifsPro from '@/components/site/TarifsPro'
import { Reveal, EASE_OUT } from '@/components/site/Reveal'
import { grainsCafe, unite } from '@/lib/catalogue'

const ref = grainsCafe[0]

/** Les trois atouts du produit, repris de la fiche fournie par la maison. */
const ATOUTS = [
  { icone: Bean, texte: '3 grains par sachet' },
  { icone: Candy, texte: 'Emballage individuel' },
  { icone: Coffee, texte: 'Pour vos expressos' },
]

const CHIFFRES = [
  { valeur: '3', legende: 'grains par sachet' },
  { valeur: `${ref.poidsG} g`, legende: 'poids net par sachet' },
  { valeur: `${ref.conditionnement}`, legende: `${unite(ref, ref.conditionnement)} par conditionnement` },
  { valeur: 'Emballés', legende: 'individuellement' },
]

export default function GrainsDeCafePage() {
  const reduce = useReducedMotion()
  /** Apparition du hero, neutralisée si l'utilisateur limite les animations. */
  const ouverture = (y: number) => (reduce ? false : { opacity: 0, y })

  return (
    <div className="landing bg-ivory font-sans text-ink">
      <SiteHeader variant="sombre" />

      <main>
        {/* Hero — chocolat noir */}
        <section className="relative isolate overflow-hidden bg-ink pt-28 text-ivory md:pt-36">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 md:px-8 md:pb-20 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
            <div>
              <motion.p
                initial={ouverture(14)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="inline-block rounded-full border border-brass/60 px-4 py-1.5 text-[11px] font-medium uppercase tracking-eyebrow text-brass-pale"
              >
                La pause café des professionnels
              </motion.p>
              <motion.h1
                initial={ouverture(18)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.06 }}
                className="font-display mt-5 text-[2.8rem] leading-[0.95] tracking-[-0.02em] text-ivory sm:text-[3.6rem] md:text-[4.4rem]"
              >
                Grains de café
                <br />
                <em className="font-light italic text-brass">enrobés de chocolat noir</em>
              </motion.h1>

              <motion.div
                initial={ouverture(16)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.12 }}
              >
                <span aria-hidden className="mt-7 block h-px w-16 bg-brass/50" />
                <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ivory/80 md:text-[17px]">
                  Trois grains de café dans un sachet individuel, à déposer sur la sous-tasse de vos expressos.
                </p>
              </motion.div>

              <motion.ul
                initial={ouverture(16)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.2 }}
                className="mt-10 grid max-w-md grid-cols-3 gap-x-5"
              >
                {ATOUTS.map((a) => {
                  const Icone = a.icone
                  return (
                    <li key={a.texte} className="text-center">
                      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-brass/50 text-brass-pale">
                        <Icone className="h-6 w-6" strokeWidth={1.25} aria-hidden />
                      </span>
                      <p className="mt-3 text-[12px] leading-snug text-ivory/70">{a.texte}</p>
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
              className="relative aspect-[3/2] w-full overflow-hidden rounded-[1.75rem]"
            >
              {/* Visuel 2:1 recadré en 3:2 : on garde la tasse et le sachet, on sacrifie les grains du bord droit. */}
              <Image
                src="/images/grains-de-cafe/cafe-et-sachet.webp"
                alt="Un sachet de trois grains de café enrobés de chocolat noir posé sur la sous-tasse d’un espresso"
                fill
                priority
                sizes="(max-width: 1023px) 92vw, 50vw"
                className="object-cover object-[35%_50%]"
              />
            </motion.div>
          </div>
        </section>

        {/* Le produit */}
        <section className="bg-ivory py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">Un sachet, trois grains</p>
                <h2 className="font-display mt-4 text-[2rem] leading-tight tracking-[-0.015em] text-ink md:text-[2.6rem]">
                  Votre accompagnement café
                </h2>
                <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-bark">
                  Chaque sachet transparent contient trois grains de café enrobés de chocolat noir brillant, prêts à
                  être servis avec l’expresso.
                </p>

                <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {CHIFFRES.map((c) => (
                    <li key={c.legende} className="rounded-xl border border-ink/[0.07] bg-cream px-4 py-5 text-center">
                      <p className="font-display text-[1.4rem] leading-none text-ink tabular-nums">{c.valeur}</p>
                      <p className="mt-2 text-[12px] leading-snug text-bark">{c.legende}</p>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 max-w-xl text-[12.5px] leading-relaxed text-bark/80">
                  <strong className="font-medium text-ink">Composition :</strong> sucre, grains de café, fèves de cacao
                  (55 % de cacao), beurre de cacao, émulsifiant : lécithine de tournesol, extrait de vanille. Présence
                  possible de fruits à coque.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative mx-auto aspect-square w-full max-w-[32rem] overflow-hidden rounded-2xl bg-paper">
                <Image
                  src={ref.image}
                  alt="Gros plan du sachet transparent contenant trois grains de café enrobés de chocolat noir brillant"
                  fill
                  sizes="(max-width: 1024px) 92vw, 512px"
                  className="object-contain p-8 md:p-10"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <TarifsPro refs={grainsCafe} />
      </main>

      <SiteFooter />
    </div>
  )
}
