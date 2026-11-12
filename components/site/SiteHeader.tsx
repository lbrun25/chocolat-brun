'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, ShoppingBag, User, X } from 'lucide-react'
import { CONTACT, formatEUR } from '@/lib/catalogue'
import { ESPACES, LISTE_ESPACES, espaceDe } from '@/lib/espaces'
import { useProCart } from '@/contexts/ProCartContext'
import { useComtoisesCart } from '@/contexts/ComtoisesCartContext'

/** Pages communes aux deux espaces, toujours présentes dans le menu. */
const LIENS_COMMUNS = [
  { href: '/histoire', label: 'Notre histoire' },
  { href: '/blog', label: 'Blog' },
]

function estActif(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`)
}

interface SiteHeaderProps {
  /**
   * « sombre » : en haut de page, sur un hero foncé, le texte de l'en-tête passe
   * en ivoire. Dès que l'utilisateur défile, l'en-tête reprend son fond clair et
   * ses couleurs habituelles dans les deux cas.
   */
  variant?: 'clair' | 'sombre'
}

/**
 * Menu « Produits » (grand écran) : tous les produits, rangés par espace. Il
 * s'ouvre au survol de la souris ou au clic (clavier, écran tactile).
 */
function MenuProduits({ pathname, surFondSombre }: { pathname: string; surFondSombre: boolean }) {
  const [ouvert, setOuvert] = useState(false)
  const ref = useRef<HTMLLIElement>(null)
  const actif = LISTE_ESPACES.some((e) => e.produits.some((p) => estActif(pathname, p.href)))

  useEffect(() => setOuvert(false), [pathname])

  useEffect(() => {
    if (!ouvert) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOuvert(false)
    }
    const onClic = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOuvert(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClic)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClic)
    }
  }, [ouvert])

  return (
    <li
      ref={ref}
      className="relative"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOuvert(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOuvert(false)}
    >
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        aria-expanded={ouvert}
        aria-controls="menu-produits"
        className={`relative flex items-center gap-1 whitespace-nowrap px-2.5 py-2 text-[13px] font-medium transition-colors xl:px-3.5 ${
          actif || ouvert
            ? surFondSombre
              ? 'text-ivory'
              : 'text-ink'
            : surFondSombre
              ? 'text-ivory/70 hover:text-ivory'
              : 'text-bark hover:text-ink'
        }`}
      >
        Produits
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${ouvert ? 'rotate-180' : ''}`}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {ouvert && (
          <motion.div
            id="menu-produits"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full pt-3"
          >
            <div className="grid w-[36rem] grid-cols-2 gap-6 rounded-2xl border border-ink/10 bg-paper p-6 shadow-xl shadow-ink/10">
              {LISTE_ESPACES.map((espace) => (
                <div key={espace.id}>
                  <Link
                    href={espace.href}
                    className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep hover:text-ink"
                  >
                    {espace.titre}
                  </Link>
                  <ul className="mt-3 space-y-1">
                    {espace.produits.map((p) => (
                      <li key={p.href}>
                        <Link
                          href={p.href}
                          className={`flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-ivory ${
                            estActif(pathname, p.href) ? 'bg-ivory' : ''
                          }`}
                        >
                          <span className="relative block h-10 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
                            <Image src={p.image} alt="" fill sizes="48px" className="object-contain p-1" />
                          </span>
                          <span className="text-[14px] text-ink">{p.labelLong}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function SiteHeader({ variant = 'clair' }: SiteHeaderProps = {}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pro = useProCart()
  const comtoises = useComtoisesCart()

  const espaceId = espaceDe(pathname)
  // Dans un espace : ses produits. Ailleurs (accueil, histoire, blog…) : les deux espaces.
  const liensEspace = espaceId
    ? ESPACES[espaceId].produits.map((p) => ({ href: p.href, label: p.label }))
    : LISTE_ESPACES.map((e) => ({ href: e.href, label: e.label }))
  const nav = [...liensEspace, ...LIENS_COMMUNS]
  // Menu mobile : l'espace en cours d'abord.
  const espacesMobile = espaceId === 'professionnels' ? [...LISTE_ESPACES].reverse() : LISTE_ESPACES

  const panierPro = {
    count: pro.totalCartons,
    total: pro.estimate.totalTTC,
    href: '/commander',
    show: pro.hydrated && !pro.isEmpty,
  }
  const panierComtoises = {
    count: comtoises.articles,
    total: comtoises.total.totalTTC,
    href: '/panier-comtoises',
    show: comtoises.hydrated && !comtoises.isEmpty,
  }
  // Pages communes : le panier qui contient quelque chose, celui des particuliers en priorité.
  const cart =
    espaceId === 'professionnels'
      ? panierPro
      : espaceId === 'particuliers' || panierComtoises.show
        ? panierComtoises
        : panierPro

  const surFondSombre = variant === 'sombre' && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-ink/10 bg-ivory/90 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8"
          aria-label="Navigation principale"
        >
          <Link href="/" className="flex items-center gap-3" aria-label={`${CONTACT.marque} — accueil`}>
            <span className="relative block h-9 w-14 shrink-0 md:h-10 md:w-16">
              <Image src="/images/logo.png" alt="" fill sizes="64px" className="object-contain" priority />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className={`font-display whitespace-nowrap text-[1.3rem] tracking-[-0.01em] md:text-[1.5rem] ${
                  surFondSombre ? 'text-ivory' : 'text-ink'
                }`}
              >
                {CONTACT.marque}
              </span>
              <span className={`mt-1 hidden whitespace-nowrap text-[9.5px] font-medium uppercase tracking-eyebrow xl:block ${
                  surFondSombre ? 'text-ivory/60' : 'text-bark'
                }`}>
                {CONTACT.signature}
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            <MenuProduits pathname={pathname} surFondSombre={surFondSombre} />
            {nav.map((item) => {
              const active = estActif(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative block whitespace-nowrap px-2.5 py-2 text-[13px] xl:px-3.5 font-medium transition-colors ${
                      active
                        ? surFondSombre
                          ? 'text-ivory'
                          : 'text-ink'
                        : surFondSombre
                          ? 'text-ivory/70 hover:text-ivory'
                          : 'text-bark hover:text-ink'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-2.5 -bottom-0.5 xl:inset-x-3.5 h-px origin-left bg-brass transition-transform duration-300 ${
                        active ? 'scale-x-100' : 'scale-x-0'
                      }`}
                      aria-hidden
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/espace-pro/connexion"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                surFondSombre ? 'text-ivory hover:bg-ivory/10' : 'text-ink hover:bg-ink/5'
              }`}
              aria-label="Compte professionnel"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            </Link>

            {cart.show && (
              <Link
                href={cart.href}
                className={`inline-flex h-10 items-center gap-2 rounded-full border border-brass pl-3.5 pr-2.5 text-[13px] font-medium transition-colors ${
                  surFondSombre
                    ? 'bg-brass/25 text-ivory hover:bg-brass/40'
                    : 'bg-brass/10 text-ink hover:bg-brass/25'
                }`}
              >
                <ShoppingBag
                  className={`h-4 w-4 ${surFondSombre ? 'text-brass-pale' : 'text-brass-deep'}`}
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="hidden tabular-nums xl:inline">{formatEUR(cart.total)}</span>
                <span
                  className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10.5px] font-semibold tabular-nums ${
                    surFondSombre ? 'bg-ivory text-ink' : 'bg-ink text-ivory'
                  }`}
                >
                  {cart.count}
                </span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => setOpen(true)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden ${
                surFondSombre ? 'text-ivory hover:bg-ivory/10' : 'text-ink hover:bg-ink/5'
              }`}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ivory lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <Link href="/" onClick={() => setOpen(false)} className="font-display text-xl text-ink">
                {CONTACT.marque}
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-ink/5"
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-6">
              <div className="flex min-h-full flex-col justify-center gap-8 py-6">
                {espacesMobile.map((espace, i) => (
                  <motion.section
                    key={espace.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.05, duration: 0.35 }}
                  >
                    <Link
                      href={espace.href}
                      onClick={() => setOpen(false)}
                      className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep"
                    >
                      {espace.titre}
                    </Link>
                    <ul className="mt-2">
                      {espace.produits.map((p) => (
                        <li key={p.href}>
                          <Link
                            href={p.href}
                            onClick={() => setOpen(false)}
                            className="block py-1.5 font-display text-[1.6rem] leading-tight text-ink"
                          >
                            {p.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                ))}
                <ul className="border-t border-ink/10 pt-6">
                  {LIENS_COMMUNS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block py-1.5 font-display text-[1.35rem] leading-tight text-bark"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="px-6 pb-10">
              <Link
                href="/espace-pro/connexion"
                onClick={() => setOpen(false)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-ink/15 text-sm font-medium text-ink"
              >
                <User className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                Compte professionnel
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
