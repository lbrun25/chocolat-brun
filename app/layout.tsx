import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'
import { getBaseUrl } from '@/lib/get-base-url'
import CookieBanner from '@/components/CookieBanner'
import ScrollToTop from '@/components/ScrollToTop'
import SupabaseKeepAlive from '@/components/SupabaseKeepAlive'
import AuthErrorRedirect from '@/components/AuthErrorRedirect'
import { CartProvider } from '@/contexts/CartContext'
import { ProCartProvider } from '@/contexts/ProCartContext'
import { ComtoisesCartProvider } from '@/contexts/ComtoisesCartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProSiretProvider } from '@/contexts/ProSiretContext'
import { CONTACT, orangettes, petitsBeurres, poissons } from '@/lib/catalogue'
import { coffrets } from '@/lib/belles-comtoises'

// Polices globales (landing + toutes les pages). Les polices « historiques » (Great Vibes, Cinzel,
// Dancing Script) ne sont chargées que par le layout app/(site) pour alléger la landing.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT'],
  variable: '--font-fraunces',
  display: 'swap',
})

const SITE_TITLE = 'Les Belles Comtoises – Cédric Brun, Maître Artisan Chocolatier'
const SITE_DESCRIPTION =
  'Les Belles Comtoises : les petites vaches montbéliardes en chocolat praliné noisette de Mélanie et Cédric Brun, Maître Artisan Chocolatier à Charquemont (Doubs). Gammes professionnelles : petits poissons, petits beurres en chocolat et orangettes.'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrl()
  return {
    metadataBase: new URL(baseUrl),
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      ],
      apple: '/apple-touch-icon.png',
    },
    title: {
      default: SITE_TITLE,
      template: '%s – Cédric Brun',
    },
    description: SITE_DESCRIPTION,
    keywords: [
      'Les Belles Comtoises',
      'vache en chocolat',
      'poisson en chocolat',
      'petit beurre chocolat',
      'chocolat professionnel',
      'chocolat restaurant',
      'chocolat hôtel',
      'chocolat emballé individuellement',
      'chocolat café',
      'artisan chocolatier Doubs',
      'Charquemont',
      'Cédric Brun',
    ],
    authors: [{ name: 'Cédric Brun' }],
    openGraph: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      type: 'website',
      locale: 'fr_FR',
      siteName: 'Cédric Brun – Maître Artisan Chocolatier',
      images: [
        {
          url: '/images/og-comtoises.jpg',
          width: 1200,
          height: 630,
          alt: 'Les Belles Comtoises – vaches en chocolat de Mélanie et Cédric Brun',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: ['/images/og-comtoises.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const prixPro = [...poissons, ...petitsBeurres, ...orangettes].map((r) => r.prixPieceHT)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: `${CONTACT.marque} – ${CONTACT.signature}`,
      description:
        'Maître Artisan Chocolatier depuis 1999 à Charquemont (Haut-Doubs). Les Belles Comtoises pour les particuliers ; petits poissons, petits beurres en chocolat et orangettes pour les professionnels.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT.adresse,
        addressLocality: CONTACT.ville,
        postalCode: CONTACT.codePostal,
        addressCountry: 'FR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 47.2144, longitude: 6.8203 },
      telephone: '+33381440736',
      email: CONTACT.email,
      priceRange: '€€',
      areaServed: { '@type': 'Country', name: 'France' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Les Belles Comtoises – vaches en chocolat praliné noisette',
      description:
        'Petites vaches montbéliardes en chocolat, pur beurre de cacao praliné noisette, présentées en coffret de 6, 12, 24 ou 30. Fabriquées artisanalement à Charquemont (Doubs).',
      brand: { '@type': 'Brand', name: 'Les Belles Comtoises' },
      image: [...coffrets.map((c) => c.image), '/images/comtoises/vache-lait.jpg'],
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'EUR',
        lowPrice: Math.min(...coffrets.map((c) => c.prixTTC)).toFixed(2),
        highPrice: Math.max(...coffrets.map((c) => c.prixTTC)).toFixed(2),
        offerCount: coffrets.length,
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Petits chocolats pour professionnels – poissons, petits beurres et orangettes',
      description:
        'Poissons en chocolat de 4 g, petits beurres en chocolat de 6 g et orangettes enrobées de chocolat noir de 5 g, emballés individuellement, vendus par cartons de 200 pièces aux professionnels.',
      brand: { '@type': 'Brand', name: CONTACT.marque },
      image: [...poissons, ...petitsBeurres, ...orangettes].map((r) => r.image),
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'EUR',
        lowPrice: Math.min(...prixPro).toFixed(2),
        highPrice: Math.max(...prixPro).toFixed(2),
        offerCount: prixPro.length,
        availability: 'https://schema.org/InStock',
        eligibleCustomerType: 'https://schema.org/Business',
      },
    },
  ]

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.variable} ${fraunces.variable} font-sans`}>
        <AuthProvider>
          <ProSiretProvider>
            <CartProvider>
              <ProCartProvider>
                <ComtoisesCartProvider>
                  <ScrollToTop />
                  <SupabaseKeepAlive />
                  <AuthErrorRedirect />
                  {children}
                  <CookieBanner />
                </ComtoisesCartProvider>
              </ProCartProvider>
            </CartProvider>
          </ProSiretProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
