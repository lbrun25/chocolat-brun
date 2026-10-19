import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Petits beurres en chocolat pour le café',
  description:
    'Petits beurres moulés en chocolat de 6 g, emballés individuellement : lait, noir, noir café et blanc. Fabrication artisanale à Charquemont, cartons de 200 pièces pour les professionnels.',
  alternates: { canonical: '/petits-beurres' },
}

export default function PetitsBeurresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
