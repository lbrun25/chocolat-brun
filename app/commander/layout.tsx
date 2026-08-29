import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commander',
  description:
    'Finalisez votre commande de poissons en chocolat artisanaux : cartons de 200 pièces, prix HT, paiement sécurisé par carte bancaire.',
  robots: { index: false, follow: true },
}

export default function CommanderLayout({ children }: { children: React.ReactNode }) {
  return <div className="landing bg-ivory font-sans text-ink">{children}</div>
}
