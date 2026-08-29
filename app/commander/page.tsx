'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, Check, CreditCard, Loader2, Lock, Minus, Plus, Truck } from 'lucide-react'
import CheckoutNav from '@/components/site/CheckoutNav'
import SiteFooter from '@/components/site/SiteFooter'
import { useProCart } from '@/contexts/ProCartContext'
import {
  CONDITIONNEMENT,
  FRANCO_HT,
  TVA_RATE,
  TYPES_ETABLISSEMENT,
  formatEUR,
  formatKg,
  prixCartonHT,
} from '@/lib/catalogue'

const PAYS = [
  { code: 'FR', label: 'France' },
  { code: 'BE', label: 'Belgique' },
  { code: 'CH', label: 'Suisse' },
  { code: 'LU', label: 'Luxembourg' },
]

interface FormState {
  etablissement: string
  typeEtablissement: string
  siret: string
  prenom: string
  nom: string
  email: string
  telephone: string
  adresse: string
  codePostal: string
  ville: string
  pays: string
  notes: string
  facturationDifferente: boolean
  facturation: {
    etablissement: string
    email: string
    telephone: string
    adresse: string
    codePostal: string
    ville: string
    pays: string
  }
  website: string
}

const EMPTY: FormState = {
  etablissement: '',
  typeEtablissement: '',
  siret: '',
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  adresse: '',
  codePostal: '',
  ville: '',
  pays: 'FR',
  notes: '',
  facturationDifferente: false,
  facturation: {
    etablissement: '',
    email: '',
    telephone: '',
    adresse: '',
    codePostal: '',
    ville: '',
    pays: 'FR',
  },
  website: '',
}

export default function CommanderPage() {
  const { cartons, setCartons, estimate, isEmpty, hydrated } = useProCart()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))
  const setFact = (key: keyof FormState['facturation'], value: string) =>
    setForm((f) => ({ ...f, facturation: { ...f.facturation, [key]: value } }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (submitting || isEmpty) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/pro/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          notes: [form.typeEtablissement ? `Type : ${form.typeEtablissement}` : '', form.notes]
            .filter(Boolean)
            .join(' — '),
          items: Object.entries(cartons).map(([id, n]) => ({ id, cartons: n })),
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'La commande n’a pas pu être ouverte.')
      }
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setSubmitting(false)
    }
  }

  return (
    <>
      <CheckoutNav />

      <main className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-16">
        <Link
          href="/poissons#tarifs"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-bark transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          Modifier ma sélection
        </Link>

        <h1 className="font-display mt-6 text-[2.1rem] leading-tight tracking-[-0.015em] text-ink md:text-[2.8rem]">
          Finaliser la commande
        </h1>

        {!hydrated ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-bark" aria-label="Chargement du panier" />
          </div>
        ) : isEmpty ? (
          <div className="mt-10 rounded-2xl border border-dashed border-ink/20 bg-paper px-6 py-14 text-center">
            <p className="font-display text-[1.5rem] text-ink">Votre panier est vide.</p>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-bark">
              Composez votre sélection par cartons de {CONDITIONNEMENT} pièces, puis revenez ici pour régler.
            </p>
            <Link
              href="/poissons#tarifs"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-ink px-7 text-sm font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao"
            >
              Voir les tarifs professionnels
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Formulaire */}
            <form onSubmit={onSubmit} className="space-y-8 lg:col-span-7">
              <section className="rounded-2xl border border-ink/[0.08] bg-paper p-5 md:p-6">
                <h2 className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">
                  Votre établissement
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="etablissement" className="mb-1.5 block text-[13px] font-medium text-ink">
                      Nom de l’établissement <span className="text-brass-deep">*</span>
                    </label>
                    <input
                      id="etablissement"
                      required
                      autoComplete="organization"
                      value={form.etablissement}
                      onChange={(e) => set('etablissement', e.target.value)}
                      className="field"
                      placeholder="Restaurant du Lac"
                    />
                  </div>
                  <div>
                    <label htmlFor="typeEtablissement" className="mb-1.5 block text-[13px] font-medium text-ink">
                      Type d’établissement
                    </label>
                    <select
                      id="typeEtablissement"
                      value={form.typeEtablissement}
                      onChange={(e) => set('typeEtablissement', e.target.value)}
                      className="field"
                    >
                      <option value="">Sélectionner…</option>
                      {TYPES_ETABLISSEMENT.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="siret" className="mb-1.5 block text-[13px] font-medium text-ink">
                      SIRET <span className="font-normal text-bark">(facultatif)</span>
                    </label>
                    <input
                      id="siret"
                      inputMode="numeric"
                      value={form.siret}
                      onChange={(e) => set('siret', e.target.value.replace(/[^\d\s]/g, '').slice(0, 17))}
                      className="field tabular-nums"
                      placeholder="123 456 789 00012"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-ink/[0.08] bg-paper p-5 md:p-6">
                <h2 className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">Contact</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
                      placeholder="vous@etablissement.fr"
                    />
                  </div>
                  <div>
                    <label htmlFor="telephone" className="mb-1.5 block text-[13px] font-medium text-ink">
                      Téléphone <span className="text-brass-deep">*</span>
                    </label>
                    <input
                      id="telephone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={form.telephone}
                      onChange={(e) => set('telephone', e.target.value)}
                      className="field"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-ink/[0.08] bg-paper p-5 md:p-6">
                <h2 className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">
                  Adresse de livraison
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="adresse" className="mb-1.5 block text-[13px] font-medium text-ink">
                      Adresse <span className="text-brass-deep">*</span>
                    </label>
                    <input
                      id="adresse"
                      required
                      autoComplete="street-address"
                      value={form.adresse}
                      onChange={(e) => set('adresse', e.target.value)}
                      className="field"
                      placeholder="12 rue de la Gare"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="codePostal" className="mb-1.5 block text-[13px] font-medium text-ink">
                      Code postal <span className="text-brass-deep">*</span>
                    </label>
                    <input
                      id="codePostal"
                      required
                      autoComplete="postal-code"
                      value={form.codePostal}
                      onChange={(e) => set('codePostal', e.target.value)}
                      className="field tabular-nums"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="ville" className="mb-1.5 block text-[13px] font-medium text-ink">
                      Ville <span className="text-brass-deep">*</span>
                    </label>
                    <input
                      id="ville"
                      required
                      autoComplete="address-level2"
                      value={form.ville}
                      onChange={(e) => set('ville', e.target.value)}
                      className="field"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="pays" className="mb-1.5 block text-[13px] font-medium text-ink">
                      Pays
                    </label>
                    <select id="pays" value={form.pays} onChange={(e) => set('pays', e.target.value)} className="field">
                      {PAYS.map((p) => (
                        <option key={p.code} value={p.code}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="notes" className="mb-1.5 block text-[13px] font-medium text-ink">
                      Instructions de livraison <span className="font-normal text-bark">(facultatif)</span>
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => set('notes', e.target.value)}
                      className="field resize-y"
                      placeholder="Horaires de réception, étage, code d’accès, date souhaitée…"
                    />
                  </div>
                </div>

                <label className="mt-5 flex cursor-pointer items-start gap-3 text-[14px] text-ink">
                  <input
                    type="checkbox"
                    checked={form.facturationDifferente}
                    onChange={(e) => set('facturationDifferente', e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-ink/30 text-ink focus:ring-brass"
                  />
                  L’adresse de facturation est différente
                </label>

                <AnimatePresence initial={false}>
                  {form.facturationDifferente && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 grid gap-4 border-t border-ink/10 pt-5 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                          <label htmlFor="fEtab" className="mb-1.5 block text-[13px] font-medium text-ink">
                            Raison sociale
                          </label>
                          <input
                            id="fEtab"
                            value={form.facturation.etablissement}
                            onChange={(e) => setFact('etablissement', e.target.value)}
                            className="field"
                          />
                        </div>
                        <div className="sm:col-span-6">
                          <label htmlFor="fAdresse" className="mb-1.5 block text-[13px] font-medium text-ink">
                            Adresse
                          </label>
                          <input
                            id="fAdresse"
                            value={form.facturation.adresse}
                            onChange={(e) => setFact('adresse', e.target.value)}
                            className="field"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="fCP" className="mb-1.5 block text-[13px] font-medium text-ink">
                            Code postal
                          </label>
                          <input
                            id="fCP"
                            value={form.facturation.codePostal}
                            onChange={(e) => setFact('codePostal', e.target.value)}
                            className="field tabular-nums"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="fVille" className="mb-1.5 block text-[13px] font-medium text-ink">
                            Ville
                          </label>
                          <input
                            id="fVille"
                            value={form.facturation.ville}
                            onChange={(e) => setFact('ville', e.target.value)}
                            className="field"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="fPays" className="mb-1.5 block text-[13px] font-medium text-ink">
                            Pays
                          </label>
                          <select
                            id="fPays"
                            value={form.facturation.pays}
                            onChange={(e) => setFact('pays', e.target.value)}
                            className="field"
                          >
                            {PAYS.map((p) => (
                              <option key={p.code} value={p.code}>
                                {p.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="sm:col-span-3">
                          <label htmlFor="fEmail" className="mb-1.5 block text-[13px] font-medium text-ink">
                            Email de facturation
                          </label>
                          <input
                            id="fEmail"
                            type="email"
                            value={form.facturation.email}
                            onChange={(e) => setFact('email', e.target.value)}
                            className="field"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label htmlFor="fTel" className="mb-1.5 block text-[13px] font-medium text-ink">
                            Téléphone
                          </label>
                          <input
                            id="fTel"
                            type="tel"
                            value={form.facturation.telephone}
                            onChange={(e) => setFact('telephone', e.target.value)}
                            className="field"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>

              {/* Honeypot */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                <label htmlFor="website">Site web</label>
                <input
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => set('website', e.target.value)}
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-800"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-[15px] font-medium tracking-wide text-ivory shadow-[0_10px_30px_-12px_rgba(27,16,11,0.6)] transition-all hover:-translate-y-0.5 hover:bg-cacao disabled:cursor-wait disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Ouverture du paiement…
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    Payer {formatEUR(estimate.totalTTC)} TTC
                  </>
                )}
              </button>

              <p className="flex items-center justify-center gap-2 text-[12px] text-bark">
                <Lock className="h-3.5 w-3.5 text-brass-deep" strokeWidth={1.75} aria-hidden />
                Paiement par carte bancaire, sécurisé par Stripe. Aucune donnée bancaire ne transite par notre site.
              </p>
            </form>

            {/* Récapitulatif */}
            <aside className="lg:col-span-5">
              <div className="sticky top-8 overflow-hidden rounded-2xl border border-ink/10 bg-ink text-ivory shadow-lift">
                <div className="border-b border-ivory/10 px-6 py-5">
                  <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-pale/80">
                    Votre commande
                  </p>
                  <p className="font-display mt-2 text-[2rem] leading-none tabular-nums">
                    {formatEUR(estimate.totalTTC)}
                  </p>
                  <p className="mt-1 text-[12.5px] text-ivory/55 tabular-nums">
                    dont {formatEUR(estimate.tva)} de TVA · {formatEUR(estimate.totalHT)} HT
                  </p>
                </div>

                <ul className="divide-y divide-ivory/10 px-6">
                  {estimate.lines.map((l) => (
                    <li key={l.ref.id} className="flex items-start justify-between gap-4 py-4">
                      <div className="min-w-0">
                        <p className="text-[14px] leading-snug">{l.ref.nom}</p>
                        <p className="mt-0.5 text-[12px] text-ivory/55 tabular-nums">
                          {l.cartons} × carton de {l.ref.conditionnement} · {l.pieces.toLocaleString('fr-FR')} pièces
                        </p>
                        <div className="mt-2 inline-flex h-8 items-center rounded-full border border-ivory/20">
                          <button
                            type="button"
                            onClick={() => setCartons(l.ref.id, l.cartons - 1)}
                            className="flex h-full w-8 items-center justify-center rounded-l-full text-ivory/70 transition-colors hover:bg-ivory/10 hover:text-ivory"
                            aria-label={`Retirer un carton de ${l.ref.nom}`}
                          >
                            <Minus className="h-3 w-3" strokeWidth={2} />
                          </button>
                          <span className="w-8 text-center text-[13px] tabular-nums">{l.cartons}</span>
                          <button
                            type="button"
                            onClick={() => setCartons(l.ref.id, l.cartons + 1)}
                            className="flex h-full w-8 items-center justify-center rounded-r-full text-ivory/70 transition-colors hover:bg-ivory/10 hover:text-ivory"
                            aria-label={`Ajouter un carton de ${l.ref.nom}`}
                          >
                            <Plus className="h-3 w-3" strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                      <p className="shrink-0 text-[14px] tabular-nums">{formatEUR(l.totalHT)}</p>
                    </li>
                  ))}
                </ul>

                <dl className="space-y-2.5 border-t border-ivory/10 px-6 py-5 text-[14px]">
                  <div className="flex justify-between">
                    <dt className="text-ivory/60">Sous-total HT</dt>
                    <dd className="tabular-nums">{formatEUR(estimate.sousTotalHT)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="flex items-center gap-2 text-ivory/60">
                      <Truck className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                      Port
                    </dt>
                    <dd className="tabular-nums">
                      {estimate.franco ? (
                        <span className="inline-flex items-center gap-1.5 text-brass-pale">
                          <Check className="h-4 w-4" strokeWidth={2} aria-hidden />
                          Offert
                        </span>
                      ) : (
                        formatEUR(estimate.port)
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ivory/60">TVA {(TVA_RATE * 100).toLocaleString('fr-FR')} %</dt>
                    <dd className="tabular-nums">{formatEUR(estimate.tva)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-ivory/10 pt-2.5 text-[15px] font-medium">
                    <dt>Total TTC</dt>
                    <dd className="tabular-nums">{formatEUR(estimate.totalTTC)}</dd>
                  </div>
                  <div className="flex justify-between text-[12.5px] text-ivory/50">
                    <dt>Poids total</dt>
                    <dd className="tabular-nums">{formatKg(estimate.poidsG)}</dd>
                  </div>
                </dl>

                {!estimate.franco && (
                  <p className="border-t border-ivory/10 px-6 py-4 text-[12.5px] text-ivory/60">
                    Plus que {formatEUR(estimate.resteAvantFranco)} HT pour bénéficier du franco de port
                    (dès {FRANCO_HT} € HT).
                  </p>
                )}
              </div>
            </aside>
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  )
}
