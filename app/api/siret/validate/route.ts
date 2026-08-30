import { NextRequest, NextResponse } from 'next/server'
import { verifierSiret } from '@/lib/siret'

export const dynamic = 'force-dynamic'

/**
 * Valide un SIRET via l'API Sirene INSEE (clé gratuite sur api.insee.fr).
 * La logique vit dans lib/siret.ts pour être appelable directement côté serveur.
 */
export async function POST(request: NextRequest) {
  let body: { siret?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ valid: false, error: 'Requête invalide' }, { status: 400 })
  }

  const result = await verifierSiret(typeof body.siret === 'string' ? body.siret : '')

  if (result.configManquante) {
    return NextResponse.json({ valid: false, error: result.error }, { status: 503 })
  }
  if (!result.valid && result.error?.includes('14 chiffres')) {
    return NextResponse.json({ valid: false, error: result.error }, { status: 400 })
  }
  if (!result.valid && result.error === 'SIRET requis') {
    return NextResponse.json({ valid: false, error: result.error }, { status: 400 })
  }

  return NextResponse.json(result, { status: 200 })
}
