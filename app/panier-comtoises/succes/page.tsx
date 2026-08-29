'use client'

import Link from 'next/link'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { AlertCircle, Check, Loader2 } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { useComtoisesCart } from '@/contexts/ComtoisesCartContext'
import { CONTACT } from '@/lib/catalogue'

function Content() {
  const sessionId = useSearchParams().get('session_id')
  const { vider } = useComtoisesCart()
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading')
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    if (!sessionId) {
      setState('error')
      return
    }
    fetch('/api/sync-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok || !data.success) throw new Error(data.error || 'Commande non enregistrée')
        return data
      })
      .then((data) => {
        setOrderNumber(data.orderNumber ?? null)
        vider()
        setState('success')
      })
      .catch((err) => {
        console.error('Sync commande comtoises:', err)
        vider()
        setState('error')
      })
  }, [sessionId, vider])

  if (state === 'loading') {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-5 text-center">
        <Loader2 className="h-7 w-7 animate-spin text-brass-deep" aria-hidden />
        <p className="mt-5 text-[15px] text-bark">Finalisation de votre commande…</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 text-center md:py-24">
      <motion.span
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${
          state === 'success' ? 'bg-ink text-brass-pale' : 'bg-brass/20 text-brass-deep'
        }`}
      >
        {state === 'success' ? (
          <Check className="h-7 w-7" strokeWidth={2} aria-hidden />
        ) : (
          <AlertCircle className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        )}
      </motion.span>

      <h1 className="font-display mt-7 text-[2.1rem] leading-tight tracking-[-0.015em] text-ink md:text-[2.6rem]">
        {state === 'success' ? 'Merci pour votre commande !' : 'Paiement reçu'}
      </h1>

      {orderNumber && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-paper px-4 py-2 text-[13px] text-ink">
          Référence <span className="font-medium tabular-nums">{orderNumber}</span>
        </p>
      )}

      <p className="mx-auto mt-6 max-w-lg text-pretty text-[15.5px] leading-relaxed text-bark">
        {state === 'success'
          ? 'Vous allez recevoir un email de confirmation. Nous préparons vos Belles Comtoises dans notre atelier de Charquemont.'
          : 'Votre paiement a bien été pris en compte. Contactez-nous si vous ne recevez rien d’ici quelques minutes.'}
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-[14px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao"
        >
          Retour à l’accueil
        </Link>
        <a
          href={`mailto:${CONTACT.email}`}
          className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-6 text-[14px] font-medium text-ink transition-colors hover:border-ink/40"
        >
          Nous écrire
        </a>
      </div>
    </div>
  )
}

export default function SuccesComtoisesPage() {
  return (
    <div className="landing bg-ivory font-sans text-ink">
      <SiteHeader />
      <main className="pt-16 md:pt-20">
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center">
              <Loader2 className="h-7 w-7 animate-spin text-brass-deep" aria-hidden />
            </div>
          }
        >
          <Content />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
