import type { Metadata } from 'next'
import { Inter, Dancing_Script, Great_Vibes, Cinzel } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })
const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing-script',
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Napolitains  – Artisan Chocolatier à Charquemont',
  description: 'Fabrication artisanale de napolitains en chocolat dans le Doubs. Chocolat noir, lait, blanc, dulcey, café. Conditionnements professionnels 100 ou 150 pièces.',
  keywords: 'napolitains, chocolat, artisan, Charquemont, Doubs, chocolatier, pâtissier',
  authors: [{ name: 'Cédric BRUN' }],
  openGraph: {
    title: 'Napolitains Cédric BRUN – Artisan Chocolatier à Charquemont',
    description: 'Fabrication artisanale de napolitains en chocolat dans le Doubs. Chocolat noir, lait, blanc, dulcey, café.',
    type: 'website',
    locale: 'fr_FR',
    
    images: [
      {
        url: '/images/napolitain-placeholder.svg',
        width: 1200,
        height: 630,
        alt: 'Napolitains artisanaux Cédric BRUN',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Napolitains Cédric BRUN – Artisan Chocolatier à Charquemont',
    description: 'Fabrication artisanale de napolitains en chocolat dans le Doubs.',
    images: ['/images/napolitain-placeholder.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Cédric BRUN',
              description: 'Maître Artisan Pâtissier Chocolatier spécialisé dans la fabrication artisanale de napolitains',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '2 rue du Chalet',
                addressLocality: 'Charquemont',
                postalCode: '25140',
                addressCountry: 'FR',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 47.2144,
                longitude: 6.8203,
              },
              telephone: '+33381440736',
              email: 'patisseriebrun-25@orange.fr',
              priceRange: '€€',
              servesCuisine: 'Chocolaterie artisanale',
              areaServed: {
                '@type': 'Country',
                name: 'France',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${dancingScript.variable} ${greatVibes.variable} ${cinzel.variable}`}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  )
}

