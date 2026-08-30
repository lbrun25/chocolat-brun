'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { AlertCircle, ArrowLeft, CreditCard, Loader2, Lock, Minus, Plus, Trash2, Truck } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { useComtoisesCart } from '@/contexts/ComtoisesCartContext'
import { PRIX_PROVISOIRES, formatEUR } from '@/lib/belles-comtoises'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping'

export default function PanierComtoisesPage() {
  const { quantites, setQuantite, total, isEmpty, hydrated } = useComtoisesCart()
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', telephone: '', notes: '', website: '' })
  const [cgvAcceptees, setCgvAcceptees] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (submitting || isEmpty || !cgvAcceptees) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/boutique/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: Object.entries(quantites).map(([id, quantite]) => ({ id, quantite })),
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Le paiement n’a pas pu être ouvert.')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setSubmitting(false)
    }
  }

  return (
    <div className="landing bg-ivory font-sans text-ink">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-5 pb-20 pt-28 md:px-8 md:pt-36">
        <Link
          href="/#coffrets"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-bark transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          Continuer mes achats
        </Link>

        <h1 className="font-display mt-6 text-[2.2rem] leading-tight tracking-[-0.015em] text-ink md:text-[2.8rem]">
          Mon panier
        </h1>

        {!hydrated ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-bark" aria-label="Chargement du panier" />
          </div>
        ) : isEmpty ? (
          <div className="mt-10 rounded-2xl border border-dashed border-ink/20 bg-paper px-6 py-14 text-center">
            <p className="font-display text-[1.5rem] text-ink">Votre panier est vide.</p>
            <Link
              href="/#coffrets"
              className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-ink px-7 text-sm font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao"
            >
              Voir les coffrets
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <ul className="divide-y divide-ink/[0.07] overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper">
                {total.lignes.map((l) => (
                  <li key={l.coffret.id} className="flex items-center gap-4 p-4 md:p-5">
                    <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream">
                      <Image src={l.coffret.image} alt="" fill sizes="80px" className="object-cover" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-medium leading-snug text-ink">{l.coffret.nom}</p>
                      <p className="mt-0.5 text-[12.5px] text-bark tabular-nums">
                        {formatEUR(l.coffret.prixTTC)} l’unité
                      </p>
                      <div className="mt-2.5 inline-flex h-9 items-center rounded-full border border-ink/15">
                        <button
                          type="button"
                          onClick={() => setQuantite(l.coffret.id, l.quantite - 1)}
                          className="flex h-full w-9 items-center justify-center rounded-l-full text-ink transition-colors hover:bg-ink/5"
                          aria-label={`Retirer un ${l.coffret.nom}`}
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                        <span className="w-9 text-center text-[14px] tabular-nums">{l.quantite}</span>
                        <button
                          type="button"
                          onClick={() => setQuantite(l.coffret.id, l.quantite + 1)}
                          className="flex h-full w-9 items-center justify-center rounded-r-full text-ink transition-colors hover:bg-ink/5"
                          aria-label={`Ajouter un ${l.coffret.nom}`}
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-[15px] font-medium text-ink tabular-nums">{formatEUR(l.totalTTC)}</p>
                      <button
                        type="button"
                        onClick={() => setQuantite(l.coffret.id, 0)}
                        className="text-bark/60 transition-colors hover:text-ink"
                        aria-label={`Retirer ${l.coffret.nom} du panier`}
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-ink/[0.08] bg-paper p-5 md:p-6">
                <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">Vos coordonnées</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="prenom" className="mb-1.5 block text-[13px] font-medium text-ink">
                      Prénom
                    </label>
                    <input
                      id="prenom"
                      autoComplete="given-name"
                      value={form.prenom}
                      onChange={(e) => set('prenom', e.target.value)}
                      className="field"
                    />
                  </div>
                  <div>
                    <label htmlFor="nom" className="mb-1.5 block text-[13px] font-medium text-ink">
                      Nom <span className="text-brass-deep">*</span>
                    </label>
                    <input
                      id="nom"
                      required
                      autoComplete="family-name"
                      value={form.nom}
                      onChange={(e) => set('nom', e.target.value)}
                      className="field"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-ink">
                      Email <span className="text-brass-deep">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      className="field"
                    />
                  </div>
                  <div>
                    <label htmlFor="telephone" className="mb-1.5 block text-[13px] font-medium text-ink">
                      Téléphone
                    </label>
                    <input
                      id="telephone"
                      type="tel"
                      autoComplete="tel"
                      value={form.telephone}
                      onChange={(e) => set('telephone', e.target.value)}
                      className="field"
                    />
                  </div>
                </div>

                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                  <label htmlFor="website">Site web</label>
                  <input id="website" tabIndex={-1} value={form.website} onChange={(e) => set('website', e.target.value)} />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-800"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                    {error}
                  </p>
                )}

                <label className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-relaxed text-ink">
                  <input
                    type="checkbox"
                    required
                    checked={cgvAcceptees}
                    onChange={(e) => setCgvAcceptees(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink/30 text-ink focus:ring-brass"
                  />
                  <span>
                    J’ai lu et j’accepte les{' '}
                    <Link href="/cgu" className="font-medium underline underline-offset-2 hover:text-brass-deep">
                      conditions générales de vente
                    </Link>
                    , ainsi que la composition et les allergènes indiqués.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submitting || !cgvAcceptees}
                  className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[15px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Ouverture du paiement…
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                      Payer {formatEUR(total.totalTTC)}
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-2 text-center text-[12px] text-bark">
                  <Lock className="h-3.5 w-3.5 text-brass-deep" strokeWidth={1.75} aria-hidden />
                  Paiement par carte, sécurisé par Stripe. L’adresse de livraison est demandée à l’étape suivante.
                </p>
              </form>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-28 rounded-2xl border border-ink/10 bg-ink px-6 py-6 text-ivory">
                <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-pale/80">Récapitulatif</p>
                <dl className="mt-4 space-y-2.5 text-[14px]">
                  <div className="flex justify-between">
                    <dt className="text-ivory/60">Sous-total</dt>
                    <dd className="tabular-nums">{formatEUR(total.sousTotalTTC)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="flex items-center gap-2 text-ivory/60">
                      <Truck className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                      Livraison
                    </dt>
                    <dd className="tabular-nums">
                      {total.livraisonOfferte ? (
                        <span className="text-brass-pale">Offerte</span>
                      ) : (
                        formatEUR(total.port)
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-ivory/10 pt-2.5 text-[16px] font-medium">
                    <dt>Total</dt>
                    <dd className="tabular-nums">{formatEUR(total.totalTTC)}</dd>
                  </div>
                </dl>
                {!total.livraisonOfferte && (
                  <p className="mt-4 text-[12.5px] text-ivory/60">
                    Livraison offerte dès {formatEUR(FREE_SHIPPING_THRESHOLD)} d’achat — plus que{' '}
                    {formatEUR(total.resteAvantFranco)}.
                  </p>
                )}
                {PRIX_PROVISOIRES && (
                  <p className="mt-4 rounded-lg border border-brass/40 bg-brass/10 px-3 py-2 text-[12px] text-brass-pale">
                    Tarifs provisoires, en attente de la grille définitive.
                  </p>
                )}
              </div>
            </aside>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
