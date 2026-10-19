import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Poissons en chocolat pour le café',
  description:
    'Petits poissons en chocolat de 4 g, emballés individuellement : lait, noir, noir café et blanc. Fabrication artisanale à Charquemont, cartons de 200 pièces pour les professionnels.',
  alternates: { canonical: '/poissons' },
}

export default function PoissonsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
