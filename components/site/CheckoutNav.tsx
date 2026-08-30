import Image from 'next/image'
import Link from 'next/link'
import { Lock, Phone } from 'lucide-react'
import { CONTACT } from '@/lib/catalogue'

/** Barre de navigation allégée des pages de commande (pas de menu, pour ne pas distraire du paiement). */
export default function CheckoutNav() {
  return (
    <header className="border-b border-ink/10 bg-ivory/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Retour à l’accueil">
          <span className="relative block h-9 w-14 shrink-0 md:h-10 md:w-16">
            <Image src="/images/logo.png" alt="" fill sizes="64px" className="object-contain" priority />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.35rem] tracking-[-0.01em] text-ink md:text-2xl">Cédric Brun</span>
            <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-eyebrow text-bark sm:block">
              Maître Artisan · depuis 1999
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 text-[12px] text-bark sm:inline-flex">
            <Lock className="h-3.5 w-3.5 text-brass-deep" strokeWidth={1.75} aria-hidden />
            Paiement sécurisé
          </span>
          <a
            href={CONTACT.telFixeHref}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-ink/15 px-4 text-[13px] font-medium text-ink transition-colors hover:border-ink/40"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
            <span className="tabular-nums">{CONTACT.telFixe}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
