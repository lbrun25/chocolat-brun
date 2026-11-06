#!/usr/bin/env node
/**
 * Prévient Bing et les moteurs IndexNow (dont dépend la recherche de ChatGPT) qu'une adresse est nouvelle.
 *   node scripts/indexnow.mjs https://www.cedric-brun.com/blog/<slug> [autres adresses]
 * À lancer APRÈS la mise en ligne de la page. Code 200 ou 202 = accepté.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const racine = join(dirname(fileURLToPath(import.meta.url)), '..')
const cle = readFileSync(join(racine, 'lib/indexnow.ts'), 'utf8').match(/'([a-f0-9]{32})'/)[1]
const urls = process.argv.slice(2)
if (!urls.length) {
  console.error('Usage : node scripts/indexnow.mjs <url> [<url>…]')
  process.exit(1)
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'www.cedric-brun.com', key: cle, keyLocation: `https://www.cedric-brun.com/${cle}.txt`, urlList: urls }),
})
console.log(`IndexNow : HTTP ${res.status}`)
process.exit(res.status === 200 || res.status === 202 ? 0 : 1)
