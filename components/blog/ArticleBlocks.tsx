import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

/** Briques de mise en page réutilisées dans le corps des articles (content/blog). */

interface FigureProps {
  src: string
  alt: string
  width: number
  height: number
  legende?: ReactNode
  /** « contain » pour les photos verticales qu'on ne veut pas recadrer */
  ajustement?: 'cover' | 'contain'
}

export function Figure({ src, alt, width, height, legende, ajustement = 'cover' }: FigureProps) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-2xl border border-ink/[0.06] bg-cream">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 720px"
          className={`h-auto w-full ${ajustement === 'contain' ? 'max-h-[640px] object-contain' : 'object-cover'}`}
        />
      </div>
      {legende && <figcaption className="mt-3 text-center text-[13px] text-bark">{legende}</figcaption>}
    </figure>
  )
}

interface GalerieProps {
  images: Array<{ src: string; alt: string; width: number; height: number; legende?: string }>
}

export function Galerie({ images }: GalerieProps) {
  return (
    <div className="my-10 grid gap-5 sm:grid-cols-2">
      {images.map((img) => (
        <figure key={img.src} className="overflow-hidden rounded-2xl border border-ink/[0.06] bg-paper">
          <div className="relative aspect-[3/4] bg-cream">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, 360px"
              className="object-cover"
            />
          </div>
          {img.legende && (
            <figcaption className="px-4 py-3 text-[13px] font-medium text-cacao">{img.legende}</figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

/** Citation mise en avant */
export function Exergue({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-brass pl-6 font-display text-[1.5rem] italic leading-snug text-cacao md:text-[1.75rem]">
      {children}
    </blockquote>
  )
}

/** Encadré d'information (à retenir, infos pratiques…) */
export function Encadre({ titre, children, sombre = false }: { titre: string; children: ReactNode; sombre?: boolean }) {
  return (
    <aside
      className={`my-10 rounded-2xl p-6 md:p-8 ${
        sombre ? 'bg-ink text-ivory' : 'border border-ink/[0.08] bg-paper text-bark'
      }`}
    >
      <p
        className={`text-[11px] font-medium uppercase tracking-eyebrow ${sombre ? 'text-brass-pale' : 'text-brass-deep'}`}
      >
        {titre}
      </p>
      <div className={`mt-4 space-y-3 text-[15.5px] leading-relaxed [&_li]:mt-1.5 [&_strong]:font-medium [&_ul]:list-disc [&_ul]:pl-5 ${
          sombre ? 'text-ivory/80 [&_strong]:text-ivory' : '[&_strong]:text-ink'
        }`}>{children}</div>
    </aside>
  )
}

/** Bouton d'appel à l'action vers une page du site */
export function Cta({ href, children, clair = false }: { href: string; children: ReactNode; clair?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-[14.5px] font-medium transition-all hover:-translate-y-0.5 ${
        clair ? 'bg-brass-pale text-ink hover:bg-ivory' : 'bg-ink text-ivory hover:bg-cacao'
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
    </Link>
  )
}
