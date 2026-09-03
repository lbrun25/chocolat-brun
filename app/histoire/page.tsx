'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Gem, HeartHandshake, Sparkles, Sprout } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { Reveal, EASE_OUT } from '@/components/site/Reveal'

const VALEURS = [
  {
    icone: Gem,
    titre: 'Exigence',
    texte: 'Des produits soignés, précis et réalisés avec constance.',
  },
  {
    icone: Sprout,
    titre: 'Authenticité',
    texte: 'Des saveurs franches et une fabrication artisanale fidèle à nos valeurs.',
  },
  {
    icone: Sparkles,
    titre: 'Créativité',
    texte: 'L’envie de créer, d’innover et de surprendre avec gourmandise.',
  },
  {
    icone: HeartHandshake,
    titre: 'Partage',
    texte: 'Le plaisir de faire plaisir est au cœur de notre maison.',
  },
]

const CHAPITRES = [
  {
    titre: 'Cédric & Mélanie',
    image: '/images/comtoises/melanie-cedric-facade.jpg',
    alt: 'Mélanie et Cédric Brun devant la boutique, avec une vache des Belles Comtoises',
    position: 'object-bottom',
    texte: (
      <>
        Cette belle aventure, je la partage avec mon épouse, <strong className="font-medium text-ink">Mélanie</strong>,
        qui travaille à mes côtés au quotidien. Ensemble, nous formons une équipe soudée, animée par les mêmes valeurs :
        le goût du travail bien fait, le respect des produits, la créativité et le plaisir de faire plaisir à nos
        clients.
      </>
    ),
  },
  {
    titre: 'Le choix des matières premières',
    image: '/images/atelier/feves.jpg',
    alt: 'Fèves de cacao dans un bocal en verre, à côté d’une cabosse ouverte',
    position: 'object-center',
    texte: (
      <>
        Nous sélectionnons nos matières premières avec le plus grand soin, privilégiant des ingrédients de qualité afin
        de révéler des saveurs authentiques. Parce que nous sommes convaincus que les plus beaux produits naissent de la
        simplicité, du temps consacré à leur fabrication et du respect des gestes qui font la noblesse de notre métier.
      </>
    ),
  },
]

export default function HistoirePage() {
  const reduce = useReducedMotion()
  /** Apparition de l'ouverture, neutralisée si l'utilisateur limite les animations. */
  const ouverture = (y: number) => (reduce ? false : { opacity: 0, y })

  return (
    <div className="landing bg-ivory font-sans text-ink">
      <SiteHeader />

      <main>
        {/* Ouverture */}
        <section className="grain relative isolate overflow-hidden bg-cream pt-28 md:pt-36">
          <div className="mx-auto max-w-7xl px-5 pb-14 md:px-8 md:pb-20">
            <motion.p
              initial={ouverture(14)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep"
            >
              <span aria-hidden className="hairline w-12" />
              Maison artisanale · Charquemont
            </motion.p>
            <motion.h1
              initial={ouverture(18)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.06 }}
              className="font-display mt-5 text-[2.8rem] leading-[0.95] tracking-[-0.02em] text-ink sm:text-[3.8rem] md:text-[5.2rem]"
            >
              Notre
              <br />
              <em className="font-light italic text-cacao">histoire</em>
            </motion.h1>
            <motion.p
              initial={ouverture(16)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.14 }}
              className="mt-6 max-w-lg text-[17px] leading-relaxed text-bark md:text-[18px]"
            >
              Une passion devenue un métier, une aventure devenue une histoire à deux.
            </motion.p>
            <motion.p
              initial={ouverture(16)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.22 }}
              className="mt-8 inline-block rounded-full border border-ink/15 bg-paper px-5 py-2.5 text-[13.5px] text-bark"
            >
              Depuis 1999 · Plus de 25 ans de savoir-faire
            </motion.p>
          </div>
        </section>

        {/* Bandeau : la matière première */}
        <section className="relative">
          <div className="relative aspect-[16/10] w-full sm:aspect-[2.4/1] lg:aspect-[3.2/1]">
            <Image
              src="/images/atelier/cabosses.jpg"
              alt="Deux cabosses de cacao, dont une ouverte sur ses fèves, posées sur une toile de jute"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* Là où tout a commencé */}
        <section className="bg-ivory py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <Reveal>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">
                  Là où tout a commencé
                </p>
                <h2 className="font-display mt-4 text-[2rem] leading-tight tracking-[-0.015em] text-ink md:text-[2.6rem]">
                  Une passion devenue un métier
                </h2>
                <p className="mt-6 text-[17px] leading-relaxed text-ink/80 md:text-[18px]">
                  La nôtre a commencé en 1999, lorsque j’ai choisi de faire de ma passion un métier.
                </p>
                <p className="mt-4 text-[15.5px] leading-relaxed text-bark">
                  Je m’appelle <strong className="font-medium text-ink">Cédric</strong> et je suis artisan
                  pâtissier-chocolatier depuis 1999 à <strong className="font-medium text-ink">Charquemont</strong>,
                  petit village du Haut-Doubs. Depuis plus de vingt-cinq ans, je consacre chaque jour mon savoir-faire à
                  la création de pâtisseries, chocolats et gourmandises réalisés avec passion, exigence et authenticité.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <figure className="rounded-2xl border border-ink/[0.08] bg-paper p-8 shadow-card md:p-10">
                <div aria-hidden className="hairline w-16" />
                <blockquote className="font-display mt-6 text-[1.5rem] leading-[1.3] text-ink md:text-[1.75rem]">
                  «&nbsp;Le goût du travail bien fait, le respect des produits, la créativité et le plaisir de faire
                  plaisir.&nbsp;»
                </blockquote>
                <figcaption className="mt-6 text-[13px] text-bark">Cédric &amp; Mélanie</figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* Nos valeurs */}
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">Nos valeurs</p>
              <h2 className="font-display mt-4 max-w-2xl text-[2rem] leading-tight tracking-[-0.015em] text-ink md:text-[2.6rem]">
                Un artisanat sincère et exigeant
              </h2>
              <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-bark">
                Chaque création porte la même attention aux détails, aux matières premières et aux gestes qui donnent
                toute sa noblesse au métier.
              </p>
            </Reveal>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-6">
              {VALEURS.map((v, i) => {
                const Icone = v.icone
                return (
                  <li key={v.titre} className="h-full">
                    <Reveal delay={i * 0.07} className="h-full">
                      <div className="flex h-full flex-col rounded-2xl border border-ink/[0.08] bg-paper p-6 md:p-7">
                        <Icone className="h-6 w-6 text-brass-deep" strokeWidth={1.5} aria-hidden />
                        <h3 className="font-display mt-5 text-[1.35rem] leading-tight text-ink">{v.titre}</h3>
                        <p className="mt-2.5 text-[14.5px] leading-relaxed text-bark">{v.texte}</p>
                      </div>
                    </Reveal>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* Maître Artisan Pâtissier */}
        <section className="bg-ink py-16 text-ivory md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <p className="font-display text-[5rem] leading-[0.8] text-brass-pale sm:text-[7rem] md:text-[8.5rem]">
                25<span className="text-brass">+</span>
              </p>
              <p className="mt-6 text-[11px] font-medium uppercase tracking-eyebrow text-ivory/60">
                ans de savoir-faire artisanal
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-pale/80">
                  Une reconnaissance du métier
                </p>
                <h2 className="font-display mt-4 text-[2rem] leading-tight tracking-[-0.015em] text-ivory md:text-[2.6rem]">
                  Maître Artisan Pâtissier
                </h2>
                <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-ivory/75">
                  Au fil des années, mon engagement envers l’excellence artisanale a été récompensé par le titre de{' '}
                  <strong className="font-medium text-ivory">Maître Artisan Pâtissier</strong>, une distinction qui
                  reflète mon expérience, mon expertise et mon attachement au métier.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Une histoire à deux */}
        <section className="bg-ivory py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">Une aventure humaine</p>
              <h2 className="font-display mt-4 text-[2rem] leading-tight tracking-[-0.015em] text-ink md:text-[2.6rem]">
                Une histoire à deux
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-6 md:mt-14 lg:grid-cols-2 lg:gap-8">
              {CHAPITRES.map((c, i) => (
                <Reveal key={c.titre} delay={i * 0.08} className="h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper">
                    <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                      <Image
                        src={c.image}
                        alt={c.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className={`object-cover ${c.position}`}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-7 md:p-9">
                      <h3 className="font-display text-[1.6rem] leading-tight text-ink md:text-[1.8rem]">{c.titre}</h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-bark">{c.texte}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Votre confiance */}
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">Depuis 1999</p>
              <h2 className="font-display mt-4 text-[2rem] leading-tight tracking-[-0.015em] text-ink md:text-[2.6rem]">
                Votre confiance, notre plus belle récompense
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-bark">
                Depuis plus de vingt-cinq ans, votre confiance nous inspire chaque jour à poursuivre cette quête
                d’excellence et à partager avec vous notre passion de l’artisanat.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div aria-hidden className="hairline mx-auto mt-10 w-24" />
              <p className="font-display mt-10 text-[1.5rem] leading-[1.45] text-cacao md:text-[1.75rem]">
                Bienvenue dans notre maison.
                <br />
                Bienvenue dans notre histoire.
              </p>
              <p className="mt-4 text-[13px] text-bark">Cédric &amp; Mélanie · Charquemont · Haut-Doubs</p>
            </Reveal>

            <Reveal delay={0.14}>
              <Link
                href="/"
                className="group mt-12 inline-flex h-14 items-center gap-2.5 rounded-full bg-ink px-7 text-[15px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao"
              >
                Découvrir nos chocolats
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
