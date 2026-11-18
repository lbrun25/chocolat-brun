import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { coffrets, formatEUR, recettes } from '@/lib/belles-comtoises'
import { GAMMES_PRO } from '@/lib/catalogue'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping'
import type { ProduitVitrine } from '@/lib/blog'

/**
 * Vitrine de fin d'article : chaque article du blog mène à un produit qu'on peut acheter.
 * Prix et formats viennent du catalogue, jamais du texte de l'article (charte du rédacteur, §2.6).
 */

/** « a, b, c ou d » */
const enumerer = (mots: ReadonlyArray<string | number>) => `${mots.slice(0, -1).join(', ')} ou ${mots.at(-1)}`

const prixMin = Math.min(...coffrets.map((c) => c.prixTTC))
const formats = enumerer(coffrets.map((c) => c.pieces))
const parfums = enumerer(recettes.map((r) => r.nom.replace(/^Chocolat /, '')))


function Bouton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group/bouton mt-6 inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-6 text-[14.5px] font-medium text-ivory transition-colors hover:bg-cacao"
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform group-hover/bouton:translate-x-1 motion-reduce:transition-none"
        strokeWidth={1.75}
        aria-hidden
      />
    </Link>
  )
}

function BellesComtoises() {
  return (
    <aside
      aria-labelledby="vitrine-titre"
      className="grid overflow-hidden rounded-[28px] bg-sable sm:grid-cols-[0.9fr_1fr]"
    >
      <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[340px]">
        <Image
          src="/images/comtoises/coffret-20-ouvert-3.jpg"
          alt="Coffret de 20 Belles Comtoises ouvert dans l’herbe : vaches au lait, caramel, blanches et noires"
          fill
          sizes="(max-width: 640px) 100vw, 420px"
          className="object-cover object-[50%_62%]"
        />
      </div>
      <div className="p-7 md:p-9">
        <p id="vitrine-titre" className="font-display text-[1.75rem] leading-[1.05] text-ink md:text-[2rem]">
          Les Belles Comtoises
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-bark">
          Nos petites vaches montbéliardes en chocolat pur beurre de cacao, fourrées au praliné noisette et
          fabriquées dans notre atelier de Charquemont. Chocolat {parfums}, en coffrets de {formats}.
        </p>
        <p className="mt-3 text-[13.5px] tabular-nums text-bark">
          À partir de {formatEUR(prixMin)}. Livraison en France métropolitaine, offerte dès{' '}
          {formatEUR(FREE_SHIPPING_THRESHOLD)} d’achat.
        </p>
        <Bouton href="/belles-comtoises#coffrets">Choisir un coffret</Bouton>
      </div>
    </aside>
  )
}

function GammesPro() {
  return (
    <aside
      aria-labelledby="vitrine-titre"
      className="grid overflow-hidden rounded-[28px] bg-white ring-1 ring-ink/[0.07] sm:grid-cols-[0.9fr_1fr]"
    >
      <div className="flex items-center justify-center bg-cream px-8 pt-8 sm:pb-8" aria-hidden>
        <Image
          src="/images/accueil/cafe.webp"
          alt=""
          width={900}
          height={700}
          sizes="(max-width: 640px) 70vw, 300px"
          className="h-auto w-full max-w-[300px]"
        />
      </div>
      <div className="p-7 md:p-9">
        <p id="vitrine-titre" className="font-display text-[1.75rem] leading-[1.05] text-ink md:text-[2rem]">
          Le chocolat qui accompagne le café de vos clients
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-bark">
          Pour les cafés, restaurants, hôtels et traiteurs : nos petits chocolats fabriqués à Charquemont, emballés
          individuellement et vendus par carton. Tarifs et commande en ligne avec un compte professionnel.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px]">
          {GAMMES_PRO.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className="text-bark underline decoration-brass/50 underline-offset-4 hover:text-ink hover:decoration-brass"
              >
                {g.label}
              </Link>
            </li>
          ))}
        </ul>
        <Bouton href="/professionnels">Voir les gammes</Bouton>
      </div>
    </aside>
  )
}

export default function VitrineProduit({ produit }: { produit: ProduitVitrine }) {
  return (
    <div className="mx-auto mt-16 max-w-[880px] px-5 md:px-8">
      {produit === 'gammes-pro' ? <GammesPro /> : <BellesComtoises />}
    </div>
  )
}
