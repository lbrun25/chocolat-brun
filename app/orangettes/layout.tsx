import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Orangettes chocolat noir',
  description:
    'Orangettes enrobées de chocolat noir, 5 g, emballées individuellement. Fabrication artisanale française à Charquemont. Cartons de 200 pièces, tarifs professionnels.',
}

export default function OrangettesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
