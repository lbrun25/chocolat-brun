/** Domaine public du site, pour les URL absolues (données structurées, flux). */
/**
 * Le domaine nu (cedric-brun.com) redirige vers www : on ne publie jamais l'adresse qui redirige
 * (canoniques, sitemap, données structurées), même si la variable d'environnement l'indique.
 */
export function versDomaineCanonique(url: string): string {
  return url.replace(/\/$/, '').replace('://cedric-brun.com', '://www.cedric-brun.com')
}

export const SITE_URL = versDomaineCanonique(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cedric-brun.com')

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
