import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/get-base-url'
import { articles } from '@/lib/blog'
import { LISTE_ESPACES } from '@/lib/espaces'

/**
 * Sitemap : l'accueil, puis chaque espace (particuliers, professionnels) et ses produits.
 *
 * `lastModified` seulement là où la date est vraie (articles du blog) : Google ignore les dates d'un sitemap
 * qui les met toutes au jour du build, y compris celles des nouveaux articles.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = await getBaseUrl()
  const derniereDate = (a: (typeof articles)[number]) => a.dateMiseAJour ?? a.datePublication
  const majBlog = articles.map(derniereDate).sort().at(-1)

  return [
    { url: baseUrl, changeFrequency: 'monthly', priority: 1 },
    ...LISTE_ESPACES.flatMap((espace) => [
      { url: `${baseUrl}${espace.href}`, changeFrequency: 'monthly' as const, priority: 0.9 },
      ...espace.produits.map((p) => ({
        url: `${baseUrl}${p.href}`,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      })),
    ]),
    {
      url: `${baseUrl}/blog`,
      ...(majBlog ? { lastModified: new Date(majBlog) } : {}),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...articles.map((a) => ({
      url: `${baseUrl}/blog/${a.slug}`,
      lastModified: new Date(derniereDate(a)),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: [`${baseUrl}${a.image.src}`],
    })),
    { url: `${baseUrl}/histoire`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/galerie`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/mentions-legales`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cgu`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/politique-confidentialite`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
