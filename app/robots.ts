import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/get-base-url'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = await getBaseUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Boutique héritée (napolitains) : conservée pour les clients existants,
      // mais elle ne doit ni concurrencer ni contredire les trois pages actuelles.
      disallow: ['/produits', '/panier', '/checkout', '/prix', '/pro', '/compte', '/napolitains', '/commande'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}







