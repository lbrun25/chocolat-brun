import { Metadata } from 'next'
import { ReactNode } from 'react'
import { PrixLayoutClient } from './PrixLayoutClient'

export const metadata: Metadata = {
  title: 'Prix & Conditionnements – Napolitains Cédric BRUN',
  description: 'Découvrez nos tarifs et conditionnements pour les napolitains artisanaux. Conditionnements de 100 ou 150 pièces. Prix HT, TVA 5,5%.',
}

export default function PrixLayout({
  children,
}: {
  children: ReactNode
}) {
  return <PrixLayoutClient>{children}</PrixLayoutClient>
}

