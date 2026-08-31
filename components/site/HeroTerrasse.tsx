'use client'

import Image from 'next/image'

/**
 * Hero animé de la page « poissons ».
 *
 * Le décor est une image fixe ; les poissons sont les vraies photos produit,
 * animées en CSS au-dessus. Un calque découpé dans la même image (`.tasse-devant`)
 * passe devant eux : en franchissant la surface du café, ils disparaissent
 * dedans. Toute la chorégraphie vit dans `app/globals.css`
 * (section « Hero terrasse »), où sont notées les coordonnées de la tasse.
 */

const DECOR = '/images/poissons/terrasse-cafe.jpg'
const DECOR_SIZES = '(max-width: 1023px) 92vw, 46vw'

const POISSONS = [
  { classe: 'poisson--blanc', src: '/images/poissons/poisson-blanc.png' },
  { classe: 'poisson--noir', src: '/images/poissons/poisson-noir.png' },
  { classe: 'poisson--cafe', src: '/images/poissons/poisson-noir-cafe.png' },
  { classe: 'poisson--lait', src: '/images/poissons/poisson-lait.png' },
]

const VAPEURS = [
  { left: '44%', top: '58%', animationDelay: '0s' },
  { left: '48.5%', top: '56.5%', animationDelay: '-2.4s' },
  { left: '52%', top: '58.5%', animationDelay: '-4.8s' },
]

export default function HeroTerrasse() {
  return (
    <div className="scene-terrasse relative mx-auto aspect-square w-full max-w-[34rem] overflow-hidden rounded-[1.75rem] bg-lac-soft shadow-lift ring-1 ring-ink/10 lg:max-w-none">
      <Image
        src={DECOR}
        alt="Terrasse en bord de mer : une tasse de café et des poissons en chocolat Cédric Brun"
        fill
        priority
        sizes={DECOR_SIZES}
        className="object-cover"
      />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        {POISSONS.map((p) => (
          <div key={p.classe} className={`poisson ${p.classe}`}>
            <div className="corps">
              <Image
                src={p.src}
                alt=""
                fill
                sizes="(max-width: 1023px) 26vw, 12vw"
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mêmes pixels que le décor : invisible, mais masque les poissons immergés. */}
      <div aria-hidden className="tasse-devant pointer-events-none">
        <Image src={DECOR} alt="" fill sizes={DECOR_SIZES} className="object-cover" />
      </div>

      <div aria-hidden className="surface-cafe pointer-events-none">
        <span className="onde onde--lait" />
        <span className="onde onde--lait-2" />
        <span className="onde onde--cafe" />
        <span className="onde onde--cafe-2" />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        {VAPEURS.map((v) => (
          <span key={v.left} className="vapeur" style={v} />
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-inset ring-white/20"
      />

      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink/45 px-3.5 py-1.5 text-[10.5px] font-medium uppercase tracking-eyebrow text-ivory backdrop-blur-sm md:bottom-5 md:left-5">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brass-pale" />
        L’instant café
      </span>
    </div>
  )
}
