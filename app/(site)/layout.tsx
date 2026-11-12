import localFont from 'next/font/local'
import Header from '@/components/Header'
import MadeInFranceSection from '@/components/MadeInFranceSection'
import Footer from '@/components/Footer'

// Polices de l’identité « historique » (logo script + petites capitales), utilisées uniquement ici.
// Hébergées dans app/fonts (voir app/layout.tsx) : aucun téléchargement chez Google Fonts au build.
const dancingScript = localFont({
  src: '../fonts/dancing-script-latin-wght-normal.woff2',
  weight: '400 700',
  style: 'normal',
  variable: '--font-dancing-script',
  display: 'swap',
})
const greatVibes = localFont({
  src: '../fonts/great-vibes-latin-400-normal.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-great-vibes',
  display: 'swap',
})
const cinzel = localFont({
  src: '../fonts/cinzel-latin-wght-normal.woff2',
  weight: '400 900',
  style: 'normal',
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
