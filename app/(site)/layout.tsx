import { Dancing_Script, Great_Vibes, Cinzel } from 'next/font/google'
import Header from '@/components/Header'
import MadeInFranceSection from '@/components/MadeInFranceSection'
import Footer from '@/components/Footer'

// Polices de l’identité « historique » (logo script + petites capitales), utilisées uniquement ici.
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing-script',
  display: 'swap',
})
const greatVibes = Great_Vibes({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  variable: '--font-great-vibes',
  display: 'swap',
})
const cinzel = Cinzel({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

/**
 * Layout des pages « historiques » (galerie, histoire, mentions légales, boutique…).
 * La landing page (app/page.tsx) possède sa propre navigation et son propre pied de page.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${dancingScript.variable} ${greatVibes.variable} ${cinzel.variable}`}>
      <Header />
      <main>{children}</main>
      <MadeInFranceSection />
      <Footer />
    </div>
  )
}
