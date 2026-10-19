import type { Metadata } from 'next'
import LandingBellesComtoises from './LandingBellesComtoises'

// Titre, description et Open Graph : valeurs par défaut du layout racine.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return <LandingBellesComtoises />
}
