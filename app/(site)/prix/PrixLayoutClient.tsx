'use client'

import { ProGate } from '@/components/ProGate'

export function PrixLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProGate>{children}</ProGate>
}
