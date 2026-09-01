import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notre histoire',
  description:
    'Cédric Brun, artisan pâtissier-chocolatier à Charquemont depuis 1999, et son épouse Mélanie : plus de vingt-cinq ans de savoir-faire artisanal dans le Haut-Doubs.',
}

export default function HistoireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
