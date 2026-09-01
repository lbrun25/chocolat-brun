import { MetadataRoute } from 'next'
import { GAMMES_PRO } from '@/lib/catalogue'
import { getBaseUrl } from '@/lib/get-base-url'

/**
 * Sitemap orienté « site professionnel » : la landing page est la page principale.
 * Les pages boutique particuliers (produits, panier, prix…) ne sont volontairement plus listées.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = await getBaseUrl()
  const now = new Date()

  return [
    { url: baseUrl, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...GAMMES_PRO.map((g) => ({
      url: `${baseUrl}${g.href}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    { url: `${baseUrl}/histoire`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/galerie`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cgu`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/politique-confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
