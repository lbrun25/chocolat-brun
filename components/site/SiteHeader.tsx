'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShoppingBag, User, X } from 'lucide-react'
import { CONTACT, formatEUR } from '@/lib/catalogue'
import { useProCart } from '@/contexts/ProCartContext'
import { useComtoisesCart } from '@/contexts/ComtoisesCartContext'

const NAV = [
  { href: '/', label: 'Les Belles Comtoises' },
  { href: '/poissons', label: 'Les poissons' },
  { href: '/petits-beurres', label: 'Les petits beurres' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pro = useProCart()
  const comtoises = useComtoisesCart()

  const isPro = pathname.startsWith('/poissons') || pathname.startsWith('/petits-beurres')
  const cart = isPro
    ? { count: pro.totalCartons, total: pro.estimate.totalTTC, href: '/commander', show: pro.hydrated && !pro.isEmpty }
    : {
        count: comtoises.articles,
        total: comtoises.total.totalTTC,
        href: '/panier-comtoises',
        show: comtoises.hydrated && !comtoises.isEmpty,
      }

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
              <span className="font-display whitespace-nowrap text-[1.3rem] tracking-[-0.01em] text-ink md:text-[1.5rem]">
                {CONTACT.marque}
              </span>
              <span className="mt-1 hidden whitespace-nowrap text-[9.5px] font-medium uppercase tracking-eyebrow text-bark sm:block">
                {CONTACT.signature}
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative block whitespace-nowrap px-3.5 py-2 text-[13px] font-medium transition-colors ${
                      active ? 'text-ink' : 'text-bark hover:text-ink'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-brass transition-transform duration-300 ${
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
              aria-label="Espace professionnel"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            </Link>

            {cart.show && (
              <Link
                href={cart.href}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-brass bg-brass/10 pl-3.5 pr-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-brass/25"
              >
                <ShoppingBag className="h-4 w-4 text-brass-deep" strokeWidth={1.75} aria-hidden />
                <span className="hidden tabular-nums sm:inline">{formatEUR(cart.total)}</span>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1.5 text-[10.5px] font-semibold text-ivory tabular-nums">
                  {cart.count}
                </span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
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
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-display text-xl text-ink">{CONTACT.marque}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-ink/5"
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.05, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-[1.9rem] leading-tight text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="px-6 pb-10">
              <Link
                href="/espace-pro/connexion"
                onClick={() => setOpen(false)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-ink/15 text-sm font-medium text-ink"
              >
                <User className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                Espace professionnel
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
