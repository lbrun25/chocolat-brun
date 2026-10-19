/** Domaine public du site, pour les URL absolues (données structurées, flux). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cedric-brun.com').replace(/\/$/, '')

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
