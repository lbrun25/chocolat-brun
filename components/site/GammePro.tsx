'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import TarifsPro from '@/components/site/TarifsPro'
import { Reveal, EASE_OUT } from '@/components/site/Reveal'
import { CONDITIONNEMENT, CONTACT, referencesDeGamme, type Gamme } from '@/lib/catalogue'

interface GammeProProps {
  gamme: Gamme
  titre: React.ReactNode
  accroche: string
  /** Photo d'ambiance du hero */
  heroImage: string
  heroAlt: string
  /** true : le visuel du hero est un produit détouré (fond clair), false : photo pleine */
  heroDecoupe?: boolean
  /** Visuel de hero sur mesure (ex. la scène animée des poissons) ; remplace heroImage */
  heroVisual?: React.ReactNode
  /** Photo panoramique affichée pleine largeur sous le hero */
  bandeau?: { image: string; alt: string }
}

export default function GammePro({
  gamme,
  titre,
  accroche,
  heroImage,
  heroAlt,
  heroDecoupe,
  heroVisual,
  bandeau,
}: GammeProProps) {
  const refs = referencesDeGamme(gamme)

  return (
    <div className="landing bg-ivory font-sans text-ink">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-cream pt-28 md:pt-36">
          <div
            className={`mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 md:px-8 md:pb-20 lg:gap-14 ${
              heroVisual ? 'lg:grid-cols-[1fr_1.08fr]' : 'lg:grid-cols-2'
            }`}
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep"
              >
                Réservé aux professionnels
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.06 }}
                className="font-display mt-4 text-[2.6rem] leading-[0.98] tracking-[-0.02em] text-ink sm:text-[3.4rem] md:text-[4rem]"
              >
                {titre}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.12 }}
                className="mt-5 max-w-md text-[16px] leading-relaxed text-bark"
              >
                {accroche}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.18 }}
                className="mt-8"
              >
                <a
                  href="#tarifs"
                  className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[15px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao"
                >
                  Voir les tarifs
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 0.1 }}
              className={
                heroVisual
                  ? 'relative'
                  : `relative aspect-[4/3] overflow-hidden rounded-2xl ${heroDecoupe ? '' : 'bg-ink/5'}`
              }
            >
              {heroVisual ?? (
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={heroDecoupe ? 'object-contain p-6' : 'object-cover'}
                />
              )}
            </motion.div>
          </div>

          <div className="mx-auto max-w-7xl px-5 pb-14 md:px-8 md:pb-20">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-ink/10 pt-6 text-[13px] text-bark">
              <li className="flex items-center gap-2.5">
                <span className="relative block h-8 w-8 shrink-0">
                  <Image
                    src="/images/emballage-individuel.png"
                    alt=""
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </span>
                Emballé un à un
              </li>
              <li className="tabular-nums">{refs[0].poidsG} g la pièce</li>
              <li className="tabular-nums">Carton de {CONDITIONNEMENT} pièces</li>
              <li>Fabriqué à {CONTACT.ville}</li>
            </ul>
          </div>
        </section>

        {bandeau && (
          <section aria-hidden className="relative">
            <div className="relative aspect-[16/9] w-full sm:aspect-[2.6/1] lg:aspect-[3.4/1]">
              <Image
                src={bandeau.image}
                alt={bandeau.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </section>
        )}

        {/* Les recettes, en photos */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {refs.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.06}>
                  <li className="group overflow-hidden rounded-2xl border border-ink/[0.06] bg-paper">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.nom}
                        fill
                        sizes="(max-width: 1024px) 45vw, 22vw"
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="px-4 pb-5 text-center">
                      <h3 className="font-display text-[1.15rem] leading-tight text-ink">{r.court}</h3>
                      <p className="mt-1 text-[12.5px] text-bark">{r.note}</p>
                      <p className="mt-2 text-[12px] font-medium tracking-wide text-brass-deep tabular-nums">
                        {r.poidsG} g
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <TarifsPro refs={refs} />
      </main>

      <SiteFooter />
    </div>
  )
}
