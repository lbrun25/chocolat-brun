#!/usr/bin/env node
/**
 * Prévient Bing et les moteurs IndexNow (dont dépend la recherche de ChatGPT) qu'une adresse est nouvelle.
 *   node scripts/indexnow.mjs https://www.cedric-brun.com/blog/<slug> [autres adresses]
 * À lancer APRÈS la mise en ligne de la page. Code 200 ou 202 = accepté.
 * Après chaque déploiement, GitHub Actions s'en charge seul (scripts/indexnow-deploiement.mjs).
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const racine = join(dirname(fileURLToPath(import.meta.url)), '..')
export const HOTE = 'www.cedric-brun.com'

/** Envoie les adresses à IndexNow ; renvoie le code HTTP. */
export async function soumettre(urls) {
  const cle = readFileSync(join(racine, 'lib/indexnow.ts'), 'utf8').match(/'([a-f0-9]{32})'/)[1]
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOTE, key: cle, keyLocation: `https://${HOTE}/${cle}.txt`, urlList: urls }),
  })
  return res.status
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const urls = process.argv.slice(2)
  if (!urls.length) {
    console.error('Usage : node scripts/indexnow.mjs <url> [<url>…]')
    process.exit(1)
  }
  const statut = await soumettre(urls)
  console.log(`IndexNow : HTTP ${statut}`)
  process.exit(statut === 200 || statut === 202 ? 0 : 1)
}
