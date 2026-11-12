import localFont from 'next/font/local'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import MadeInFranceSection from '@/components/MadeInFranceSection'

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
 * Layout des pages « historiques » (mentions légales, CGU, livraison, compte…) : elles gardent
 * leur mise en page d'origine, mais l'en-tête et le pied de page sont ceux du reste du site
 * (menu par espace et menu « Produits »).
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${dancingScript.variable} ${greatVibes.variable} ${cinzel.variable}`}>
      <SiteHeader />
      <main>{children}</main>
      <MadeInFranceSection />
      <SiteFooter />
    </div>
  )
}
