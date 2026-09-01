import Image from 'next/image'
import Link from 'next/link'
import { CONTACT, GAMMES_PRO } from '@/lib/catalogue'

const GAMMES = [
  { href: '/', label: 'Les Belles Comtoises' },
  ...GAMMES_PRO.map((g) => ({ href: g.href, label: g.labelLong })),
]

const LEGAL = [
  { href: '/histoire', label: 'Notre histoire' },
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/cgu', label: 'CGU / CGV' },
  { href: '/politique-confidentialite', label: 'Politique de confidentialité' },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-brass/20 bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative block h-11 w-16">
                <Image src="/images/logo.png" alt="" fill sizes="64px" className="object-contain opacity-90" />
              </span>
              <div className="leading-none">
                <p className="font-display text-xl">{CONTACT.marque}</p>
                <p className="mt-1.5 text-[9.5px] font-medium uppercase tracking-eyebrow text-brass-pale/80">
                  {CONTACT.signature}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-pale/80">Nos gammes</p>
            <ul className="mt-4 space-y-2 text-[14.5px] text-ivory/75">
              {GAMMES.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="hover:text-ivory">
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-pale/80">Nous contacter</p>
            <address className="mt-4 space-y-2 text-[14.5px] not-italic leading-relaxed text-ivory/75">
              <p>
                {CONTACT.adresse}
                <br />
                {CONTACT.codePostal} {CONTACT.ville}
              </p>
              <p>
                <a href={CONTACT.telFixeHref} className="tabular-nums hover:text-ivory">
                  {CONTACT.telFixe}
                </a>
              </p>
              <p>
                <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-ivory">
                  {CONTACT.email}
                </a>
              </p>
            </address>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-pale/80">Informations</p>
            <ul className="mt-4 space-y-2 text-[14.5px] text-ivory/75">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/espace-pro/connexion" className="hover:text-ivory">
                  Espace professionnel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-10 opacity-60" />
        <p className="mt-6 text-[12px] text-ivory/50">
          © {new Date().getFullYear()} {CONTACT.raisonSociale} — Fabriqué artisanalement à {CONTACT.ville} (Doubs).
        </p>
      </div>
    </footer>
  )
}
