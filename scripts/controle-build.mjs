#!/usr/bin/env node
/**
 * Build complet du site avec des variables d'environnement factices (aucun secret : le cloud n'en a pas),
 * puis vérification que la page HTML de CHAQUE article de lib/blog.ts a bien été générée.
 * C'est la preuve qu'un article ne cassera pas le déploiement, sans dépendre du réseau.
 *   node scripts/controle-build.mjs      (≈ 1 à 2 minutes)
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const racine = join(dirname(fileURLToPath(import.meta.url)), '..')
const factices = {
  NEXT_PUBLIC_SUPABASE_URL: 'https://placeholder.supabase.co',
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: 'placeholder',
  SUPABASE_SERVICE_ROLE_KEY: 'placeholder',
  STRIPE_SECRET_KEY: 'sk_test_placeholder',
  STRIPE_WEBHOOK_SECRET: 'whsec_placeholder',
  RESEND_API_KEY: 're_placeholder',
  NEXT_PUBLIC_SITE_URL: 'https://www.cedric-brun.com',
}
const r = spawnSync('node_modules/.bin/next', ['build'], {
  cwd: racine,
  env: { ...process.env, ...factices },
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
})
if (r.status !== 0) {
  console.error((r.stdout + r.stderr).split('\n').slice(-40).join('\n'))
  console.error('\n✗ le build échoue : ne rien publier')
  process.exit(1)
}
const slugs = [...readFileSync(join(racine, 'lib/blog.ts'), 'utf8').matchAll(/^\s*slug:\s*'([a-z0-9-]+)'/gm)].map((m) => m[1])
const manquants = slugs.filter((s) => !existsSync(join(racine, '.next/server/app/blog', `${s}.html`)))
if (manquants.length) {
  console.error(`✗ pages d'articles non générées : ${manquants.join(', ')}`)
  process.exit(1)
}
console.log(`✓ build réussi, ${slugs.length} pages d'articles générées`)
