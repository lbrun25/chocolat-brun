#!/usr/bin/env node
/**
 * Lancé par GitHub Actions (.github/workflows/indexnow.yml) quand Vercel a mis un commit en production :
 * envoie à IndexNow les articles du blog ajoutés ou modifiés depuis le déploiement de production précédent.
 *
 * Variables : SHA (commit déployé), DEPLOYMENT_ID, GITHUB_REPOSITORY, GITHUB_TOKEN. DRY_RUN=1 : n'envoie rien.
 * L'agent rédacteur n'a pas accès à api.indexnow.org depuis son environnement : c'est ce script qui s'en charge.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { HOTE, soumettre } from './indexnow.mjs'

const racine = join(dirname(fileURLToPath(import.meta.url)), '..')
const { SHA, DEPLOYMENT_ID, GITHUB_REPOSITORY, GITHUB_TOKEN, DRY_RUN } = process.env
if (!SHA || !GITHUB_REPOSITORY) throw new Error('SHA et GITHUB_REPOSITORY sont requis')

const git = (...args) => execFileSync('git', args, { cwd: racine, encoding: 'utf8' }).trim()
const attendre = (ms) => new Promise((r) => setTimeout(r, ms))
/** API GitHub, avec trois essais (coupures réseau ponctuelles sur les runners). */
async function api(chemin) {
  for (let essai = 1; ; essai++) {
    try {
      const res = await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}${chemin}`, {
        headers: { Accept: 'application/vnd.github+json', ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}) },
      })
      if (!res.ok) throw new Error(`GitHub ${chemin} : HTTP ${res.status}`)
      return await res.json()
    } catch (e) {
      if (essai >= 3) throw e
      await attendre(5_000 * essai)
    }
  }
}

/** Commit du dernier déploiement de production réussi avant celui-ci (sinon le parent du commit). */
async function shaPrecedent() {
  const deploiements = await api('/deployments?environment=Production&per_page=30')
  const actuel = deploiements.find((d) => String(d.id) === String(DEPLOYMENT_ID))
  const avant = deploiements.filter(
    (d) => d.sha !== SHA && (!actuel || d.created_at < actuel.created_at),
  )
  for (const d of avant) {
    const statuts = await api(`/deployments/${d.id}/statuses?per_page=30`)
    if (statuts.some((s) => s.state === 'success')) {
      try {
        git('merge-base', '--is-ancestor', d.sha, SHA)
        return d.sha
      } catch {
        // déploiement d'une autre branche ou historique réécrit : on continue
      }
    }
  }
  return `${SHA}~1`
}

const precedent = await shaPrecedent().catch((e) => {
  console.warn(`Déploiement précédent introuvable (${e.message}) : comparaison avec le commit parent.`)
  return `${SHA}~1`
})
const fichiers = git('diff', '--name-only', '--diff-filter=AM', precedent, SHA, '--', 'content/blog', 'lib/blog.ts')
  .split('\n')
  .filter(Boolean)
const slugsPublies = new Set(
  [...readFileSync(join(racine, 'lib/blog.ts'), 'utf8').matchAll(/^\s*slug: '([a-z0-9-]+)'/gm)].map((m) => m[1]),
)
const slugs = fichiers
  .map((f) => f.match(/^content\/blog\/([a-z0-9-]+)\.tsx$/)?.[1])
  .filter((s) => s && slugsPublies.has(s) && existsSync(join(racine, 'content/blog', `${s}.tsx`)))

console.log(`Déploiement ${SHA.slice(0, 7)}, comparé à ${git("rev-parse", "--short", precedent)} : ${fichiers.length} fichier(s) du blog modifié(s).`)
if (!slugs.length) {
  console.log('Aucun article ajouté ou modifié : rien à envoyer.')
  process.exit(0)
}

const urls = [...slugs.map((s) => `https://${HOTE}/blog/${s}`), `https://${HOTE}/blog`]

// La page doit répondre avant d'être annoncée (le domaine bascule sur le nouveau déploiement en quelques secondes).
for (const url of urls) {
  let code = 0
  for (let i = 0; i < 10 && code !== 200; i++) {
    if (i) await attendre(15_000)
    code = (await fetch(url, { redirect: 'manual' }).catch(() => ({ status: 0 }))).status
  }
  if (code !== 200) throw new Error(`${url} répond ${code} : rien n'est envoyé`)
}

console.log(urls.map((u) => `  ${u}`).join('\n'))
if (DRY_RUN) {
  console.log('DRY_RUN : non envoyé.')
  process.exit(0)
}
const statut = await soumettre(urls)
console.log(`IndexNow : HTTP ${statut}`)
process.exit(statut === 200 || statut === 202 ? 0 : 1)
