import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CreditCard, ShieldCheck, Truck } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { Reveal } from '@/components/site/Reveal'
import { CONTACT, FRAIS_PORT_HT, FRANCO_HT, GAMMES_PRO, referencesDeGamme, unite, type Gamme } from '@/lib/catalogue'
import { ESPACES } from '@/lib/espaces'

export const metadata: Metadata = {
  title: 'Espace professionnels et restaurateurs',
  description:
    'Petits chocolats emballés individuellement pour accompagner le café de vos clients : poissons, petits beurres, orangettes et grains de café enrobés. Fabrication artisanale à Charquemont (Doubs).',
  alternates: { canonical: '/professionnels' },
}

/** « 4 g · 4 recettes · carton de 200 pièces », calculé depuis le catalogue. */
function resume(gamme: Gamme): string {
  const refs = referencesDeGamme(gamme)
  const r = refs[0]
  const recettes = refs.length > 1 ? ` · ${refs.length} recettes` : ''
  return `${r.poidsG} g${recettes} · carton de ${r.conditionnement} ${unite(r, r.conditionnement)}`
}

const ETAPES = [
  {
    icone: ShieldCheck,
    titre: 'Tarifs réservés aux professionnels',
    texte:
      'Créez votre compte avec le SIRET de votre établissement : une fois vérifié, les prix s’affichent sur chaque gamme et vous commandez en ligne.',
  },
  {
    icone: Truck,
    titre: 'Livraison en France métropolitaine',
    texte: `${FRAIS_PORT_HT} € HT par commande, offerte dès ${FRANCO_HT} € HT de commande.`,
  },
  {
    icone: CreditCard,
    titre: 'Paiement par carte bancaire',
    texte: 'Paiement sécurisé en ligne au moment de la commande.',
  },
]

export default function EspaceProfessionnels() {
  return (
    <div className="landing bg-ivory font-sans text-ink">
      <SiteHeader />

      <main>
        <section className="bg-cream pb-14 pt-28 md:pb-20 md:pt-36">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">
                Espace professionnels et restaurateurs
              </p>
              <h1 className="font-display mt-4 text-[2.4rem] leading-[1.02] tracking-[-0.02em] text-ink sm:text-[3rem] md:text-[3.4rem]">
                Nos petits chocolats pour le café <em className="font-light italic text-cacao">de vos clients</em>
              </h1>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-bark">
                Emballés individuellement et fabriqués dans notre atelier de {CONTACT.ville}, pour les restaurants, hôtels,
                cafés et traiteurs.
              </p>
              <a
                href="#gammes"
                className="group mt-8 inline-flex h-14 items-center gap-2.5 rounded-full bg-ink px-7 text-[15px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao"
              >
                Voir les gammes
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
              </a>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-white">
              <Image
                src="/images/galerie/cafe_chocolat.png"
                alt="Tasse d’expresso sur sa sous-tasse, avec un chocolat dans son sachet individuel"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 448px"
                className="object-contain"
              />
            </div>
          </div>
        </section>

        <section id="gammes" className="scroll-mt-20 bg-ivory py-14 md:py-20" aria-labelledby="titre-gammes">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 id="titre-gammes" className="font-display text-center text-[2rem] leading-tight text-ink md:text-[2.6rem]">
              Nos gammes
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-6">
              {GAMMES_PRO.map((g, i) => (
                <li key={g.href} className="h-full">
                  <Reveal delay={i * 0.06} className="h-full">
                    <Link
                      href={g.href}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper transition-all hover:-translate-y-0.5 hover:border-brass/60"
                    >
                      <span className="relative block aspect-square overflow-hidden">
                        <Image
                          src={g.image}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                          className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                        />
                      </span>
                      <span className="flex flex-1 flex-col px-5 pb-5 text-center">
                        <span className="font-display text-[1.3rem] leading-tight text-ink">{g.labelLong}</span>
                        <span className="mt-1.5 text-[12.5px] text-bark tabular-nums">{resume(g.gamme)}</span>
                        <span className="mt-4 inline-flex items-center justify-center gap-1.5 text-[13px] font-medium text-brass-deep">
                          Voir la gamme
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-ink py-16 text-ivory md:py-20" aria-labelledby="titre-commander">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <h2 id="titre-commander" className="font-display text-center text-[2rem] leading-tight md:text-[2.4rem]">
              Commander
            </h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-3">
              {ETAPES.map(({ icone: Icone, titre, texte }) => (
                <li key={titre} className="text-center">
                  <Icone className="mx-auto h-6 w-6 text-brass-pale" strokeWidth={1.5} aria-hidden />
                  <h3 className="font-display mt-4 text-[1.2rem] leading-snug">{titre}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-[14px] leading-relaxed text-ivory/65 tabular-nums">{texte}</p>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Link
                href="/espace-pro/inscription"
                className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-ivory px-7 text-[15px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-paper"
              >
                Créer mon compte professionnel
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
              </Link>
              <Link
                href="/espace-pro/connexion"
                className="inline-flex h-14 items-center rounded-full border border-ivory/25 px-7 text-[15px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:border-brass"
              >
                J’ai déjà un compte
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-ivory py-12 md:py-14">
          <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
            <p className="text-[14.5px] text-bark">
              Vous cherchez un cadeau gourmand ?{' '}
              <Link href={ESPACES.particuliers.href} className="font-medium text-ink underline decoration-brass underline-offset-4 hover:text-cacao">
                Découvrez l’espace particuliers
              </Link>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
