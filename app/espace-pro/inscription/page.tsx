'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { AlertCircle, ArrowRight, Check, Loader2, Lock } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { useAuth } from '@/contexts/AuthContext'
import { TYPES_ETABLISSEMENT } from '@/lib/catalogue'

export default function InscriptionProPage() {
  const router = useRouter()
  const { signIn, refreshProfile } = useAuth()
  const [form, setForm] = useState({
    siret: '',
    typeEtablissement: '',
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    password: '',
    website: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [raisonSociale, setRaisonSociale] = useState<string | null>(null)

  const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setError(null)
    try {
      const res = await fetch('/api/pro/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, siret: form.siret.replace(/\D/g, '') }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'La création du compte a échoué.')

      setRaisonSociale(data.raisonSociale ?? null)

      if (!data.requiresEmailConfirmation) {
        // Connexion immédiate : les tarifs sont accessibles tout de suite
        await signIn(form.email, form.password)
        await refreshProfile()
        router.push('/poissons#tarifs')
        return
      }
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setStatus('idle')
    }
  }

  return (
    <div className="landing bg-ivory font-sans text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-xl px-5 pb-20 pt-28 md:px-8 md:pt-36">
        {status === 'done' ? (
          <div className="rounded-2xl border border-ink/10 bg-paper px-6 py-12 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink text-brass-pale">
              <Check className="h-6 w-6" strokeWidth={2} aria-hidden />
            </span>
            <h1 className="font-display mt-6 text-[1.8rem] leading-tight text-ink">Compte créé</h1>
            <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-bark">
              {raisonSociale ? `${raisonSociale} est enregistré. ` : ''}
              Confirmez votre adresse email grâce au lien que nous venons de vous envoyer, puis connectez-vous pour
              accéder aux tarifs.
            </p>
            <Link
              href="/espace-pro/connexion"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-[14px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao"
            >
              Se connecter
            </Link>
          </div>
        ) : (
          <>
            <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">Espace professionnel</p>
            <h1 className="font-display mt-4 text-[2.2rem] leading-tight tracking-[-0.015em] text-ink md:text-[2.6rem]">
              Créer mon compte
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-bark">
              Votre SIRET est vérifié auprès du répertoire officiel (INSEE). Une fois le compte créé, vous accédez à
              la liste des prix et vous pouvez commander en ligne.
            </p>

            <form onSubmit={onSubmit} className="mt-9 space-y-5">
              <div>
                <label htmlFor="siret" className="mb-1.5 block text-[13px] font-medium text-ink">
                  Numéro SIRET <span className="text-brass-deep">*</span>
                </label>
                <input
                  id="siret"
                  required
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="123 456 789 00012"
                  value={form.siret}
                  onChange={(e) => set('siret', e.target.value.replace(/[^\d\s]/g, '').slice(0, 17))}
                  className="field tracking-wider tabular-nums"
                />
                <p className="mt-1.5 text-[12px] text-bark">14 chiffres, vérifiés auprès de l’INSEE.</p>
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
                    Nom
                  </label>
                  <input
                    id="nom"
                    autoComplete="family-name"
                    value={form.nom}
                    onChange={(e) => set('nom', e.target.value)}
                    className="field"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
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

              <div>
                <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-ink">
                  Mot de passe <span className="text-brass-deep">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => set('password', e.target.value)}
                  className="field"
                />
                <p className="mt-1.5 text-[12px] text-bark">8 caractères minimum.</p>
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

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[15px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao disabled:cursor-wait disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Vérification du SIRET…
                  </>
                ) : (
                  <>
                    Créer mon compte
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
                  </>
                )}
              </button>

              <p className="flex items-center justify-center gap-2 text-center text-[12.5px] text-bark">
                <Lock className="h-3.5 w-3.5 text-brass-deep" strokeWidth={1.75} aria-hidden />
                Déjà un compte ?{' '}
                <Link href="/espace-pro/connexion" className="font-medium text-ink underline-offset-4 hover:underline">
                  Se connecter
                </Link>
              </p>
            </form>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
