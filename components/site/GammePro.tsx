'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Lock, Minus, Plus, ShoppingBag, Truck } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { Reveal, EASE_OUT } from '@/components/site/Reveal'
import { MAX_CARTONS, useProCart } from '@/contexts/ProCartContext'
import { useProAccess } from '@/hooks/useProAccess'
import {
  CONDITIONNEMENT,
  CONTACT,
  FRAIS_PORT_HT,
  FRANCO_HT,
  formatEUR,
  prixCartonHT,
  referencesDeGamme,
  type Gamme,
} from '@/lib/catalogue'

interface GammeProProps {
  gamme: Gamme
  titre: React.ReactNode
  accroche: string
  /** Photo d'ambiance du hero */
  heroImage: string
  heroAlt: string
  /** true : le visuel du hero est un produit détouré (fond clair), false : photo pleine */
  heroDecoupe?: boolean
  /** Photo panoramique affichée pleine largeur sous le hero */
  bandeau?: { image: string; alt: string }
}

function LigneTarif({ id }: { id: string }) {
  const { cartons, setCartons } = useProCart()
  const ref = referencesDeGamme('poisson')
    .concat(referencesDeGamme('petit-beurre'))
    .find((r) => r.id === id)!
  const v = cartons[id] ?? 0

  return (
    <li
      className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-4 transition-colors md:px-5 ${
        v > 0 ? 'bg-ivory' : ''
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <span className="relative hidden h-11 w-16 shrink-0 sm:block">
          <Image src={ref.image} alt="" fill sizes="64px" className="object-contain" />
        </span>
        <div className="min-w-0">
          <p className={`text-[14.5px] leading-snug ${v > 0 ? 'font-medium text-ink' : 'text-ink'}`}>{ref.court}</p>
          <p className="mt-0.5 text-[12.5px] text-bark tabular-nums">
            {ref.poidsG} g · {formatEUR(ref.prixPieceHT)} HT / pièce · {formatEUR(ref.prixKgHT)} HT / kg
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`hidden w-28 text-right text-[14px] tabular-nums sm:block ${v > 0 ? 'text-ink' : 'text-bark/60'}`}>
          {formatEUR(prixCartonHT(ref))}
          <span className="ml-1 text-[11.5px] text-bark">/ carton</span>
        </span>
        <div className="inline-flex h-10 items-center rounded-full border border-ink/15 bg-paper">
          <button
            type="button"
            onClick={() => setCartons(id, v - 1)}
            disabled={v === 0}
            className="flex h-full w-10 items-center justify-center rounded-l-full text-ink transition-colors hover:bg-ink/5 disabled:opacity-30"
            aria-label={`Retirer un carton de ${ref.nom}`}
          >
            <Minus className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={MAX_CARTONS}
            value={v}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10)
              setCartons(id, Number.isFinite(n) ? n : 0)
            }}
            aria-label={`Nombre de cartons de ${ref.nom}`}
            className="h-full w-11 border-x border-ink/10 bg-transparent text-center text-[14px] font-medium text-ink tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => setCartons(id, v + 1)}
            className="flex h-full w-10 items-center justify-center rounded-r-full text-ink transition-colors hover:bg-ink/5"
            aria-label={`Ajouter un carton de ${ref.nom}`}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </li>
  )
}

export default function GammePro({
  gamme,
  titre,
  accroche,
  heroImage,
  heroAlt,
  heroDecoupe,
  bandeau,
}: GammeProProps) {
  const refs = referencesDeGamme(gamme)
  const { hasAccess, loading } = useProAccess()
  const { estimate, isEmpty } = useProCart()

  return (
    <div className="landing bg-ivory font-sans text-ink">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-cream pt-28 md:pt-36">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 md:px-8 md:pb-20 lg:grid-cols-2 lg:gap-14">
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
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${heroDecoupe ? '' : 'bg-ink/5'}`}
            >
              <Image
                src={heroImage}
                alt={heroAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={heroDecoupe ? 'object-contain p-6' : 'object-cover'}
              />

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

        {/* Tarifs — réservés aux comptes professionnels */}
        <section id="tarifs" className="scroll-mt-20 bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <Reveal>
              <h2 className="font-display text-center text-[2rem] leading-tight text-ink md:text-[2.6rem]">
                Tarifs professionnels
              </h2>
              <p className="mt-4 text-center text-[14.5px] text-bark">
                Vendus par cartons de {CONDITIONNEMENT} pièces. Prix hors taxes.
              </p>
            </Reveal>

            {loading ? (
              <div className="mt-10 h-40 animate-pulse rounded-2xl border border-ink/[0.08] bg-paper" />
            ) : hasAccess ? (
              <>
                <Reveal delay={0.06}>
                  <div className="mt-10 overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper/70">
                    <ul className="divide-y divide-ink/[0.07]">
                      {refs.map((r) => (
                        <LigneTarif key={r.id} id={r.id} />
                      ))}
                    </ul>
                  </div>
                </Reveal>

                {!isEmpty && (
                  <Reveal delay={0.1}>
                    <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-ink/10 bg-ink px-6 py-5 text-ivory sm:flex-row sm:justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-eyebrow text-brass-pale/80">Votre commande</p>
                        <p className="font-display mt-1 text-[1.7rem] leading-none tabular-nums">
                          {formatEUR(estimate.totalTTC)}
                          <span className="ml-2 text-[13px] font-sans text-ivory/60">TTC</span>
                        </p>
                        <p className="mt-1 text-[12.5px] text-ivory/55 tabular-nums">
                          {formatEUR(estimate.totalHT)} HT · {estimate.cartons} carton
                          {estimate.cartons > 1 ? 's' : ''}
                        </p>
                      </div>
                      <Link
                        href="/commander"
                        className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-brass px-6 text-[14px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-brass-pale"
                      >
                        <ShoppingBag className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                        Commander et payer
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
                      </Link>
                    </div>
                  </Reveal>
                )}
              </>
            ) : (
              <Reveal delay={0.06}>
                <div className="mt-10 rounded-2xl border border-ink/10 bg-paper px-6 py-10 text-center md:px-10">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ivory text-brass-deep ring-1 ring-brass/30">
                    <Lock className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="font-display mt-6 text-[1.5rem] leading-tight text-ink">
                    Nos tarifs sont réservés aux professionnels
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-bark">
                    Créez votre compte avec le SIRET de votre établissement pour accéder à la liste des prix et
                    commander en ligne.
                  </p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                      href="/espace-pro/inscription"
                      className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-[14px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao"
                    >
                      Créer mon compte professionnel
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
                    </Link>
                    <Link
                      href="/espace-pro/connexion"
                      className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-6 text-[14px] font-medium text-ink transition-colors hover:border-ink/40"
                    >
                      J’ai déjà un compte
                    </Link>
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.12}>
              <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-bark">
                <span className="inline-flex items-center gap-2">
                  <Truck className="h-4 w-4 text-brass-deep" strokeWidth={1.5} aria-hidden />
                  Livraison {FRAIS_PORT_HT} € HT par commande
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-brass-deep" strokeWidth={2} aria-hidden />
                  Franco de port dès {FRANCO_HT} € HT
                </span>
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
