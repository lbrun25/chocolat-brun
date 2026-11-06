import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/get-base-url'

/**
 * Robots d'indexation des assistants IA (recherche et réponses) : explicitement autorisés pour que
 * ChatGPT, Claude, Perplexity, Gemini ou Apple puissent citer le site. Chaque groupe répète les
 * exclusions, car un robot nommé ignore le groupe « * ».
 */
const ROBOTS_IA = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
]
const EXCLUS = ['/pro', '/compte', '/api/']

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = await getBaseUrl()

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: EXCLUS },
      { userAgent: ROBOTS_IA, allow: '/', disallow: EXCLUS },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
