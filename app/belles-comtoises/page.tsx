import type { Metadata } from 'next'
import LandingBellesComtoises from './LandingBellesComtoises'

const TITRE = 'Les Belles Comtoises, vaches en chocolat praliné'
const DESCRIPTION =
  'Les Belles Comtoises : les petites vaches montbéliardes en chocolat pur beurre de cacao praliné noisette de Mélanie et Cédric Brun, à Charquemont (Doubs). Coffrets de 6 à 30, livrés en France.'

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/belles-comtoises' },
  openGraph: {
    title: `${TITRE} – Cédric Brun`,
    description: DESCRIPTION,
    type: 'website',
    locale: 'fr_FR',
    url: '/belles-comtoises',
    images: [
      {
        url: '/images/og-comtoises.jpg',
        width: 1200,
        height: 630,
        alt: 'Les Belles Comtoises – vaches en chocolat de Mélanie et Cédric Brun',
      },
    ],
  },
}

export default function BellesComtoisesPage() {
  return <LandingBellesComtoises />
}
