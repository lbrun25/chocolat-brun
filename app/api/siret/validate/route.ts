import { NextRequest, NextResponse } from 'next/server'

const SIRET_LENGTH = 14
const INSEE_SIRET_URL = 'https://api.insee.fr/entreprises/sirene/V3.11/siret'

function normalizeSiret(siret: string): string {
  return siret.replace(/\s/g, '')
}

function isValidSiretFormat(siret: string): boolean {
  return /^\d{14}$/.test(siret)
}

/**
 * Valide un SIRET via l'API Sirene INSEE (API publique, clé gratuite sur api.insee.fr).
 * Retourne les infos de l'établissement si valide.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const siretRaw = typeof body.siret === 'string' ? body.siret.trim() : ''
    const siret = normalizeSiret(siretRaw)

    if (!siret) {
      return NextResponse.json(
        { valid: false, error: 'SIRET requis' },
        { status: 400 }
      )
    }

    if (!isValidSiretFormat(siret)) {
      return NextResponse.json(
        { valid: false, error: 'Le SIRET doit comporter exactement 14 chiffres' },
        { status: 400 }
      )
    }

    const token = process.env.INSEE_SIRENE_API_TOKEN
    if (!token) {
      console.warn('INSEE_SIRENE_API_TOKEN non défini : validation SIRET désactivée.')
      return NextResponse.json(
        {
          valid: false,
          error: 'Validation SIRET non configurée. Contactez l’administrateur.',
        },
        { status: 503 }
      )
    }

    const res = await fetch(`${INSEE_SIRET_URL}/${siret}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    })

    if (res.status === 404) {
      return NextResponse.json(
        { valid: false, error: 'SIRET introuvable ou établissement fermé' },
        { status: 200 }
      )
    }

    if (!res.ok) {
      const text = await res.text()
      console.error('INSEE Sirene API error:', res.status, text)
      return NextResponse.json(
        {
          valid: false,
          error:
            res.status === 429
              ? 'Trop de requêtes. Réessayez dans une minute.'
              : 'Impossible de vérifier le SIRET pour le moment.',
        },
        { status: 200 }
      )
    }

    const data = (await res.json()) as {
      etablissement?: {
        uniteLegale?: { denominationUniteLegale?: string; nom?: string; prenom1?: string }
        adresseEtablissement?: { numeroVoie?: string; libelleVoie?: string; codePostal?: string; libelleCommune?: string }
      }
    }

    const etab = data?.etablissement
    const uniteLegale = etab?.uniteLegale
    const raisonSociale =
      uniteLegale?.denominationUniteLegale ??
      [uniteLegale?.nom, uniteLegale?.prenom1].filter(Boolean).join(' ') ??
      ''

    return NextResponse.json({
      valid: true,
      siret,
      raisonSociale: raisonSociale.trim() || 'Entreprise',
    })
  } catch (error) {
    console.error('Erreur validation SIRET:', error)
    return NextResponse.json(
      { valid: false, error: 'Erreur lors de la vérification du SIRET' },
      { status: 500 }
    )
  }
}
