import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notre histoire – Chocolat BRUN',
  description: 'Une histoire de famille et de passion. Depuis 1999, la pâtisserie fait partie de notre quotidien à Charquemont. Cédric et Mélanie BRUN, un couple de pâtissiers.',
}

export default function HistoireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
