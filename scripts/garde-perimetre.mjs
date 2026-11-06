#!/usr/bin/env node
/**
 * Garde-fou de périmètre de l'agent rédacteur : refuse tout changement hors du blog.
 * À lancer AVANT le commit (fichiers modifiés ou nouveaux) et avant le push (commits en avance sur origin/main).
 * Code de sortie 1 si un fichier sort du périmètre autorisé.
 */
import { execSync } from 'node:child_process'

const AUTORISE = [/^content\/blog\//, /^lib\/blog\.ts$/, /^docs\/seo\//]
const sh = (c) => execSync(c, { encoding: 'utf8' }).split('\n').filter(Boolean)

const fichiers = new Set([
  ...sh('git diff --name-only HEAD'),
  ...sh('git ls-files --others --exclude-standard'),
  ...sh('git diff --name-only origin/main...HEAD'),
])
const hors = [...fichiers].filter((f) => !AUTORISE.some((re) => re.test(f)))
if (hors.length) {
  console.error('✗ fichiers hors du périmètre du blog :')
  for (const f of hors) console.error(`  - ${f}`)
  console.error('Annuler ces changements (git checkout -- <fichier> / supprimer le fichier) avant de continuer.')
  process.exit(1)
}
console.log(`✓ périmètre respecté (${fichiers.size} fichier(s))`)
