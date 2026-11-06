import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grains de café enrobés de chocolat noir',
  description:
    'Trois grains de café enrobés de chocolat noir en sachet individuel de 2 g, pour accompagner les expressos. Cartons de 500 sachets, tarifs réservés aux professionnels.',
  alternates: { canonical: '/grains-de-cafe' },
}

export default function GrainsDeCafeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
