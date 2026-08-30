import type { Metadata } from 'next'

/** Page héritée : conservée pour les clients existants, retirée de l'indexation. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
