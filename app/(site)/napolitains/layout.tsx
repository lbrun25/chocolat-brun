import type { Metadata } from 'next'

/**
 * Ancienne page d'accueil (v1, napolitains artisanaux — grand public), archivée ici.
 * Volontairement non référencée : aucun lien depuis la landing professionnelle,
 * absente du sitemap et exclue de l'indexation.
 */
export const metadata: Metadata = {
  title: 'Napolitains artisanaux',
  description:
    'Napolitains artisanaux de Cédric Brun, Maître Artisan Chocolatier à Charquemont (Haut-Doubs).',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function NapolitainsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
