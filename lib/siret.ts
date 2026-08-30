/**
 * Vérification d'un SIRET auprès du répertoire Sirene (INSEE).
 *
 * Cette logique est appelée DIRECTEMENT côté serveur (jamais via une requête HTTP
 * vers notre propre API) : construire une URL interne à partir des en-têtes de la
 * requête entrante permettrait à un appelant de détourner la vérification en
 * pointant `x-forwarded-host` vers un serveur qui répond toujours « valide ».
 */

const INSEE_SIRET_URL = 'https://api.insee.fr/api-sirene/3.11/siret'

export interface SiretResult {
  valid: boolean
  siret?: string
  raisonSociale?: string
  error?: string
  /** Vrai si l'échec vient de notre configuration, pas de la saisie de l'utilisateur */
  configManquante?: boolean
}

export function normalizeSiret(siret: string): string {
  return siret.replace(/\D/g, '')
}

export function isValidSiretFormat(siret: string): boolean {
  return /^\d{14}$/.test(siret)
}

export async function verifierSiret(siretRaw: string): Promise<SiretResult> {
  const siret = normalizeSiret(typeof siretRaw === 'string' ? siretRaw : '')

  if (!siret) return { valid: false, error: 'SIRET requis' }
  if (!isValidSiretFormat(siret)) {
    return { valid: false, error: 'Le SIRET doit comporter exactement 14 chiffres' }
  }

  const token = process.env.INSEE_SIRENE_API_TOKEN
  if (!token) {
    console.warn('INSEE_SIRENE_API_TOKEN non défini : validation SIRET désactivée.')
    return {
      valid: false,
      configManquante: true,
      error: 'Validation SIRET non configurée. Contactez l’administrateur.',
    }
  }

  try {
    const res = await fetch(`${INSEE_SIRET_URL}/${siret}`, {
      method: 'GET',
      headers: { Accept: 'application/json', 'X-INSEE-Api-Key-Integration': token },
      next: { revalidate: 0 },
    })

    if (res.status === 404) {
      return { valid: false, error: 'SIRET introuvable ou établissement fermé' }
    }

    if (!res.ok) {
      console.error('INSEE Sirene API error:', res.status, await res.text())
      return {
        valid: false,
        error:
          res.status === 429
            ? 'Trop de requêtes. Réessayez dans une minute.'
            : 'Impossible de vérifier le SIRET pour le moment.',
      }
    }

    const data = (await res.json()) as {
      etablissement?: {
        uniteLegale?: {
          denominationUniteLegale?: string
          nomUniteLegale?: string
          prenom1UniteLegale?: string
        }
      }
    }

    const ul = data?.etablissement?.uniteLegale
    const raisonSociale =
      ul?.denominationUniteLegale ??
      [ul?.nomUniteLegale, ul?.prenom1UniteLegale].filter(Boolean).join(' ') ??
      ''

    return { valid: true, siret, raisonSociale: raisonSociale.trim() || 'Entreprise' }
  } catch (error) {
    console.error('Erreur validation SIRET:', error)
    return { valid: false, error: 'Erreur lors de la vérification du SIRET' }
  }
}
