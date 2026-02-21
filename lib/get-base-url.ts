import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'

/**
 * Récupère l'URL de base du site à partir de la requête (headers).
 * Utiliser dans les API routes — évite tout fallback sur localhost.
 * En production, les headers x-forwarded-host et x-forwarded-proto contiennent le bon domaine.
 */
export function getBaseUrlFromRequest(request: NextRequest): string {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host')
  const proto = request.headers.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https')

  if (host) {
    return `${proto}://${host}`
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (siteUrl) {
    return siteUrl
  }

  throw new Error(
    'Impossible de déterminer l\'URL du site. Définissez NEXT_PUBLIC_SITE_URL dans les variables d\'environnement de production.'
  )
}

/**
 * Récupère l'URL de base pour les Server Components (sitemap, robots, layout).
 * Utilise headers() quand disponible, sinon NEXT_PUBLIC_SITE_URL. Jamais de fallback localhost.
 */
export async function getBaseUrl(): Promise<string> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (siteUrl) return siteUrl

  try {
    const headersList = await headers()
    const host = headersList.get('x-forwarded-host') || headersList.get('host')
    const proto = headersList.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https')
    if (host) return `${proto}://${host}`
  } catch {
    // headers() peut échouer hors contexte requête (build statique)
  }

  throw new Error(
    'NEXT_PUBLIC_SITE_URL doit être défini. En production, ajoutez cette variable dans votre hébergeur (Vercel, Railway, etc.).'
  )
}
