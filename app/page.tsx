'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Plus, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { Reveal, EASE_OUT } from '@/components/site/Reveal'
import { useComtoisesCart } from '@/contexts/ComtoisesCartContext'
import {
  ALLERGENES,
  COMPOSITION,
  CONSERVATION,
  PRIX_PROVISOIRES,
  coffrets,
  formatEUR,
  recettes,
} from '@/lib/belles-comtoises'
import { CONTACT, GAMMES_PRO } from '@/lib/catalogue'
import { FLAT_SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping'

function CoffretCard({ id }: { id: string }) {
  const { ajouter, quantites } = useComtoisesCart()
  const coffret = coffrets.find((c) => c.id === id)!
  const [added, setAdded] = useState(false)
  const dansPanier = quantites[id] ?? 0

  const onAdd = () => {
    ajouter(id, 1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream lg:aspect-square">
        <Image
          src={coffret.image}
          alt={coffret.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[1.3rem] leading-tight text-ink">{coffret.nom}</h3>
          <p className="font-display shrink-0 text-[1.35rem] leading-none text-ink tabular-nums">
            {formatEUR(coffret.prixTTC)}
          </p>
        </div>
        <p className="mt-1 text-[12.5px] text-bark">
          {coffret.detail} · {coffret.pieces} vaches · {coffret.poidsG} g net
        </p>
        <button
          type="button"
          onClick={onAdd}
          aria-label={`Ajouter le ${coffret.nom} au panier`}
          className="mt-auto inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink text-[13.5px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao"
        >
          {added ? (
            <>
              <Check className="h-4 w-4 text-brass-pale" strokeWidth={2.5} aria-hidden />
              Ajouté
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" strokeWidth={2} aria-hidden />
              Ajouter
            </>
          )}
        </button>
        <p className="mt-2 h-4 text-center text-[12px] text-brass-deep tabular-nums" aria-live="polite">
          {dansPanier > 0 ? `${dansPanier} dans le panier` : ''}
        </p>
      </div>
    </div>
  )
}

export default function BellesComtoisesPage() {
  const { isEmpty } = useComtoisesCart()

  return (
    <div className="landing bg-ivory font-sans text-ink">
      <SiteHeader />

      <main>
        {/* Hero — logo de la maison */}
        <section className="relative isolate flex min-h-[88vh] flex-col items-center justify-center overflow-hidden bg-ivory px-5 py-20 text-center md:px-8">
          <h1 className="sr-only">Les Belles Comtoises</h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep"
          >
            Chocolats artisanaux francs-comtois
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.08 }}
            className="relative mt-6 aspect-[3/2] w-[300px] overflow-hidden rounded-3xl shadow-xl shadow-ink/10 sm:w-[420px] md:w-[480px]"
          >
            <Image
              src="/images/comtoises/logo-belles-comtoises.png"
              alt="Les Belles Comtoises — marque déposée, elles sont inimitables et inoubliables"
              fill
              priority
              sizes="(max-width: 640px) 300px, (max-width: 768px) 420px, 480px"
              className="object-cover"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.16 }}
            className="mt-6 max-w-md text-[16px] leading-relaxed text-bark md:text-[17px]"
          >
            Les petites vaches montbéliardes en chocolat, praliné noisette, de Mélanie &amp; Cédric Brun.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.24 }}
            className="mt-8"
          >
            <a
              href="#coffrets"
              className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-ink px-7 text-[15px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao"
            >
              Voir les coffrets
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
            </a>
          </motion.div>
        </section>

        {/* Les quatre recettes — visuel avant tout */}
        <section className="bg-ivory py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
              <h2 className="font-display text-center text-[2rem] leading-tight text-ink md:text-[2.6rem]">
                Quatre recettes
              </h2>
            </Reveal>
            <ul className="mt-10 grid grid-cols-2 gap-4 md:mt-14 lg:grid-cols-4 lg:gap-6">
              {recettes.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.06}>
                  <li className="group overflow-hidden rounded-2xl border border-ink/[0.06] bg-paper">
                    <div className="relative aspect-square overflow-hidden bg-white">
                      <Image
                        src={r.image}
                        alt={`Vache en ${r.nom.toLowerCase()}`}
                        fill
                        sizes="(max-width: 1024px) 45vw, 22vw"
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="px-4 py-4 text-center">
                      <h3 className="font-display text-[1.15rem] leading-tight text-ink">{r.nom}</h3>
                      <p className="mt-1 text-[12.5px] text-bark">{r.note}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Coffrets */}
        <section id="coffrets" className="scroll-mt-20 bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
              <h2 className="font-display text-center text-[2rem] leading-tight text-ink md:text-[2.6rem]">
                Les coffrets
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-[13.5px] leading-relaxed text-bark">
                Prix TTC · Livraison {FLAT_SHIPPING_COST} € en France métropolitaine, offerte dès{' '}
                {FREE_SHIPPING_THRESHOLD} € d’achat.
              </p>
            </Reveal>

            {PRIX_PROVISOIRES && (
              <Reveal delay={0.04}>
                <p className="mx-auto mt-5 max-w-lg rounded-xl border border-brass/50 bg-brass/10 px-4 py-3 text-center text-[13px] text-ink">
                  Tarifs provisoires en attente de la grille définitive.
                </p>
              </Reveal>
            )}

            <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-6">
              {coffrets.map((c, i) => (
                <Reveal key={c.id} delay={i * 0.08} className="h-full">
                  <CoffretCard id={c.id} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <div className="mt-10 rounded-2xl border border-ink/[0.08] bg-paper p-5 md:p-6">
                <h3 className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">
                  Composition et allergènes
                </h3>
                <dl className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-bark">
                  <div>
                    <dt className="inline font-medium text-ink">Composition — </dt>
                    <dd className="inline">{COMPOSITION}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-ink">Allergènes — </dt>
                    <dd className="inline">{ALLERGENES}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-ink">Conservation — </dt>
                    <dd className="inline">{CONSERVATION}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            {!isEmpty && (
              <Reveal delay={0.16}>
                <div className="mt-10 text-center">
                  <Link
                    href="/panier-comtoises"
                    className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-ink px-8 text-[15px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao"
                  >
                    <ShoppingBag className="h-4 w-4 text-brass-pale" strokeWidth={1.75} aria-hidden />
                    Voir mon panier
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
                  </Link>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* Une phrase, une photo */}
        <section className="bg-ink py-16 text-ivory md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/comtoises/coffret-20-detail.jpg"
                  alt="Grand coffret de Belles Comtoises posé dans l’herbe"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-display text-[1.7rem] leading-snug text-ivory md:text-[2.2rem]">
                Cette spécialité chocolatière représente la reine des plaines franc-comtoises, la Montbéliarde !
              </p>
              <p className="mt-6 text-[15px] leading-relaxed text-ivory/65">
                Moulées et emballées dans notre atelier de {CONTACT.ville}, dans le Haut-Doubs.
              </p>
              <p className="mt-8 text-[12px] uppercase tracking-eyebrow text-brass-pale/70">
                Mélanie &amp; Cédric Brun
              </p>
            </Reveal>
          </div>
        </section>

        {/* Passerelle vers les gammes pros */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <Reveal>
              <p className="text-center text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">
                Vous êtes professionnel ?
              </p>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {GAMMES_PRO.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className="group flex items-center gap-5 rounded-2xl border border-ink/[0.08] bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-brass/60"
                  >
                    <span className="relative block h-16 w-24 shrink-0">
                      <Image src={g.image} alt="" fill sizes="96px" className="object-contain" />
                    </span>
                    <span className="flex-1 font-display text-[1.25rem] text-ink">{g.labelLong}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-brass-deep transition-transform group-hover:translate-x-1"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Les artisans */}
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/comtoises/melanie-cedric.jpg"
                  alt="Mélanie et Cédric Brun dans un pré avec leurs coffrets Les Belles Comtoises"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-[1.7rem] leading-snug text-ink md:text-[2.2rem]">
                Mélanie &amp; Cédric Brun
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-bark">
                Artisans chocolatiers à {CONTACT.ville}, dans le Haut-Doubs.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Marque déposée */}
        <section className="bg-ink py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
            <Reveal>
              <div className="relative mx-auto h-[180px] w-[180px] overflow-hidden">
                <Image
                  src="/images/comtoises/logo-belles-comtoises-simple.png"
                  alt="Logo Les Belles Comtoises"
                  fill
                  sizes="180px"
                  className="object-contain"
                />
              </div>
              <p className="mt-6 text-[12.5px] leading-relaxed text-ivory/55">
                Les Belles Comtoises est une marque déposée par la Fédération des Belles Comtoises de
                Franche-Comté.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
