'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, type FormEvent } from 'react'
import { AlertCircle, ArrowRight, Loader2, LogOut } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { useAuth } from '@/contexts/AuthContext'
import { useProAccess } from '@/hooks/useProAccess'
import { GAMMES_PRO } from '@/lib/catalogue'

export default function ConnexionProPage() {
  const router = useRouter()
  const { signIn, signOut, user, refreshProfile } = useAuth()
  const { hasAccess, raisonSociale, needsSiret, loading } = useProAccess()
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (hasAccess) refreshProfile()
    // Rafraîchit le profil une fois la session résolue, pour disposer du SIRET
  }, [hasAccess, refreshProfile])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)
    const { error: signInError } = await signIn(form.email, form.password)
    if (signInError) {
      setError(signInError.message || 'Email ou mot de passe incorrect.')
      setSubmitting(false)
      return
    }
    await refreshProfile()
    router.push('/poissons#tarifs')
  }

  return (
    <div className="landing bg-ivory font-sans text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-md px-5 pb-20 pt-28 md:px-8 md:pt-36">
        {loading ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-bark" aria-label="Chargement" />
          </div>
        ) : user ? (
          <div className="rounded-2xl border border-ink/10 bg-paper px-6 py-10 text-center">
            <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">Espace professionnel</p>
            <h1 className="font-display mt-4 text-[1.8rem] leading-tight text-ink">
              {raisonSociale || 'Vous êtes connecté'}
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-[14.5px] leading-relaxed text-bark">
              {hasAccess
                ? 'Votre compte donne accès aux tarifs professionnels.'
                : needsSiret
                  ? 'Votre compte ne comporte pas de SIRET vérifié. Créez un compte professionnel pour accéder aux tarifs.'
                  : 'Votre compte est actif.'}
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {hasAccess ? (
                <>
                  {GAMMES_PRO.map((g, i) => (
                    <Link
                      key={g.href}
                      href={`${g.href}#tarifs`}
                      className={
                        i === 0
                          ? 'inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-[14px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao'
                          : 'inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-6 text-[14px] font-medium text-ink transition-colors hover:border-ink/40'
                      }
                    >
                      Tarifs — {g.labelLong.replace('Les ', '')}
                    </Link>
                  ))}
                </>
              ) : (
                <Link
                  href="/espace-pro/inscription"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-[14px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao"
                >
                  Créer un compte professionnel
                </Link>
              )}
              <button
                type="button"
                onClick={() => signOut()}
                className="inline-flex h-11 items-center justify-center gap-2 text-[13px] text-bark transition-colors hover:text-ink"
              >
                <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                Se déconnecter
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">Espace professionnel</p>
            <h1 className="font-display mt-4 text-[2.2rem] leading-tight tracking-[-0.015em] text-ink">
              Se connecter
            </h1>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-ink">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-ink">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="field"
                />
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
                disabled={submitting}
                className="group inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[15px] font-medium text-ivory transition-all hover:-translate-y-0.5 hover:bg-cacao disabled:cursor-wait disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Connexion…
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
                  </>
                )}
              </button>

              <p className="text-center text-[13px] text-bark">
                Pas encore de compte ?{' '}
                <Link href="/espace-pro/inscription" className="font-medium text-ink underline-offset-4 hover:underline">
                  Créer un compte professionnel
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
