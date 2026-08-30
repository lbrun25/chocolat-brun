import type { Metadata } from 'next'

/** Boutique historique (napolitains) : conservée, mais retirée de l'indexation. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ProduitsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
