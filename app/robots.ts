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
// Attention : une règle est un préfixe (« /pro » bloquerait aussi « /professionnels »).
// /compte n'est volontairement PAS bloqué : ses pages portent « noindex » (app/(site)/compte/layout.tsx) et
// Google ne peut le lire que s'il a le droit d'explorer la page. Bloqué dans robots.txt, il restait indexé
// sans contenu (Search Console : « Indexée malgré le blocage par le fichier robots.txt »).
const EXCLUS = ['/api/']

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
