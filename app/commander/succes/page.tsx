'use client'

import Link from 'next/link'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { AlertCircle, Check, Loader2, Mail, Phone } from 'lucide-react'
import CheckoutNav from '@/components/site/CheckoutNav'
import SiteFooter from '@/components/site/SiteFooter'
import { useProCart } from '@/contexts/ProCartContext'
import { CONTACT } from '@/lib/catalogue'

type State = 'loading' | 'success' | 'error'

function Content() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clear } = useProCart()
  const [state, setState] = useState<State>('loading')
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
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'La commande n’a pas pu être enregistrée.')
        }
        return data
      })
      .then((data) => {
        setOrderNumber(data.orderNumber ?? null)
        clear()
        setState('success')
      })
      .catch((err) => {
        console.error('Sync commande pro:', err)
        // Le paiement est encaissé : on rassure malgré l'échec d'enregistrement
        clear()
        setState('error')
      })
  }, [sessionId, clear])

  if (state === 'loading') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
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

      <h1 className="font-display mt-7 text-[2.1rem] leading-tight tracking-[-0.015em] text-ink md:text-[2.8rem]">
        {state === 'success' ? 'Merci, votre commande est enregistrée.' : 'Paiement reçu'}
      </h1>

      {state === 'success' ? (
        <>
          {orderNumber && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-paper px-4 py-2 text-[13px] text-ink">
              Référence <span className="font-medium tabular-nums">{orderNumber}</span>
            </p>
          )}
          <p className="mx-auto mt-6 max-w-lg text-pretty text-[15.5px] leading-relaxed text-bark">
            Vous allez recevoir un email de confirmation récapitulant votre commande. Nous préparons vos cartons dans
            notre atelier de Charquemont et revenons vers vous pour la date de livraison.
          </p>
        </>
      ) : (
        <p className="mx-auto mt-6 max-w-lg text-pretty text-[15.5px] leading-relaxed text-bark">
          Votre paiement a bien été pris en compte, mais nous n’avons pas pu afficher le récapitulatif. Aucune action
          de votre part n’est nécessaire : contactez-nous si vous n’avez rien reçu d’ici quelques minutes.
        </p>
      )}

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href={CONTACT.telFixeHref}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 px-6 text-sm font-medium text-ink transition-colors hover:border-ink/40"
        >
          <Phone className="h-4 w-4 text-brass-deep" strokeWidth={1.75} aria-hidden />
          <span className="tabular-nums">{CONTACT.telFixe}</span>
        </a>
        <a
          href={`mailto:${CONTACT.email}`}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 px-6 text-sm font-medium text-ink transition-colors hover:border-ink/40"
        >
          <Mail className="h-4 w-4 text-brass-deep" strokeWidth={1.75} aria-hidden />
          Nous écrire
        </a>
      </div>

      <Link
        href="/"
        className="mt-10 inline-block text-[13px] font-medium text-brass-deep underline-offset-4 hover:underline"
      >
        Retour à l’accueil
      </Link>
    </div>
  )
}

export default function SuccesPage() {
  return (
    <>
      <CheckoutNav />
      <main>
        <Suspense
          fallback={
            <div className="flex min-h-[60vh] items-center justify-center">
              <Loader2 className="h-7 w-7 animate-spin text-brass-deep" aria-hidden />
            </div>
          }
        >
          <Content />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
