#!/usr/bin/env node
/**
 * Contrôle du blog : garde-fou de l'agent rédacteur SEO (docs/seo/charte-redacteur.md).
 * Sans relecture humaine avant publication, ce script est la dernière barrière.
 *
 *   node scripts/verifier-blog.mjs          # tous les articles
 *
 * Code de sortie 1 si une règle bloquante est enfreinte.
 * Règles « globales » : tous les articles. Règles « éditoriales » (longueur, liens,
 * interdits de contenu) : articles publiés à partir de DEPUIS (ceux écrits par l'agent).
 */
import { readFileSync, existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const ts = require(join(RACINE, 'node_modules/typescript'))

/** Les articles antérieurs ont été écrits à la main : on ne leur applique que les règles globales. */
const DEPUIS = '2026-11-06'

// --- Chargement des métadonnées (lib/blog.ts, transpilé à la volée) ---
const source = readFileSync(join(RACINE, 'lib/blog.ts'), 'utf8')
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: 'ES2020' } })
const module_ = { exports: {} }
vm.runInNewContext(outputText, {
  module: module_,
  exports: module_.exports,
  require: (id) => {
    if (id === '@/lib/site-url') return { absoluteUrl: (p) => p }
    throw new Error(`import inattendu dans lib/blog.ts : ${id}`)
  },
  Intl,
  Date,
})
const articles = module_.exports.articles
const index = readFileSync(join(RACINE, 'content/blog/index.ts'), 'utf8')
const slugsEnregistres = new Set([...index.matchAll(/^\s*'([a-z0-9-]+)':\s*\{/gm)].map((m) => m[1]))

const erreurs = []
const echec = (slug, msg) => erreurs.push(`${slug} : ${msg}`)

const slugs = articles.map((a) => a.slug)
const existants = new Set(slugs)
for (const s of slugs) if (slugs.indexOf(s) !== slugs.lastIndexOf(s)) echec(s, 'slug en double')
const titresSeo = articles.map((a) => a.titreSeo)
for (const a of articles) if (titresSeo.indexOf(a.titreSeo) !== titresSeo.lastIndexOf(a.titreSeo)) echec(a.slug, 'titreSeo en double')
for (const s of slugsEnregistres) if (!existants.has(s)) echec(s, 'enregistré dans content/blog/index.ts mais absent de lib/blog.ts')

/** Texte lisible d'un corps d'article .tsx : sans imports, balises ni expressions JSX. */
function texteDe(code) {
  return code
    .replace(/^import .*$/gm, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^{}]*\}/g, ' ')
    .replace(/export default function[^{]*\{/, ' ')
    .replace(/return \(|^\s*\)\s*$|^\s*\}\s*$/gm, ' ')
}
const mots = (t) => (t.match(/[\p{L}\p{N}’'-]+/gu) ?? []).length

const INTERDITS = [
  [/\d[\d\s.,]*\s?(€|euros?)/i, 'montant en euros : aucun prix dans les articles'],
  [/\b(allerg|gluten|lactose|sans lait)/i, 'allergènes : sujet interdit à l’agent (voir la charte, §3)'],
  [/\b(antioxydant|bon pour la santé|bienfaits?|vertus?|thérapeutique|minceur|régime|cholestérol)/i, 'allégation de santé'],
  [/lesbellescomtoises\.com/i, 'ce domaine n’est pas le site de la maison'],
  [/dégressi/i, 'pas de tarifs dégressifs'],
  [/\b(le|la|les) meilleur/i, 'superlatif non démontrable'],
  [/\b(tablettes?|carrés? de chocolat)\b/i, 'gamme tablettes arrêtée'],
  [/\b(nos clients (disent|adorent)|témoignage|ils nous font confiance)/i, 'témoignage inventé'],
]

for (const a of articles) {
  const s = a.slug
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)) echec(s, 'slug : minuscules, chiffres et tirets seulement')
  if (!slugsEnregistres.has(s)) echec(s, 'corps non enregistré dans content/blog/index.ts')
  const fichier = join(RACINE, 'content/blog', `${s}.tsx`)
  if (!existsSync(fichier)) {
    echec(s, `fichier content/blog/${s}.tsx introuvable`)
    continue
  }
  if (!existsSync(join(RACINE, 'public', a.image.src))) echec(s, `image introuvable : public${a.image.src}`)
  if (!a.image.alt || a.image.alt.length < 15) echec(s, 'image.alt trop court')
  for (const l of a.liens ?? []) if (!existants.has(l)) echec(s, `liens : « ${l} » n’existe pas`)

  const code = readFileSync(fichier, 'utf8')
  const blogLinks = [...code.matchAll(/href=["']\/blog\/([a-z0-9-]+)["']/g)].map((m) => m[1])
  for (const l of blogLinks) if (!existants.has(l)) echec(s, `lien interne cassé : /blog/${l}`)

  if (a.datePublication < DEPUIS) continue

  // --- Règles éditoriales (articles de l'agent) ---
  if (s.length > 60) echec(s, `slug de ${s.length} caractères (60 max)`)
  if (a.titreSeo.length < 35 || a.titreSeo.length > 60) echec(s, `titreSeo de ${a.titreSeo.length} caractères (35 à 60)`)
  if (a.titre.length > 110) echec(s, `titre de ${a.titre.length} caractères (110 max)`)
  if (a.description.length < 110 || a.description.length > 160) echec(s, `description de ${a.description.length} caractères (110 à 160)`)
  if (a.extrait.length > 320) echec(s, `extrait de ${a.extrait.length} caractères (320 max)`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.datePublication)) echec(s, 'datePublication : AAAA-MM-JJ')
  if ((a.motsCles ?? []).length < 3) echec(s, 'motsCles : 3 au moins')
  if ((a.liens ?? []).length < 2) echec(s, 'liens : 2 articles liés au moins')

  const texte = texteDe(code)
  const n = mots(texte)
  if (n < 700 || n > 1800) echec(s, `${n} mots (700 à 1 800 attendus)`)
  if (new Set(blogLinks).size < 2) echec(s, 'moins de 2 liens internes vers d’autres articles (href="/blog/…")')
  if (!/<h2[ >]/.test(code)) echec(s, 'aucun <h2>')
  if (!/export const faq/.test(code) || (code.match(/question:/g) ?? []).length < 3) echec(s, 'FAQ de 3 questions au moins (export const faq)')
  if (/<h1[ >]/.test(code)) echec(s, '<h1> interdit dans le corps : le titre est affiché par la page')
  if (/[Dd]ernière mise à jour/.test(code)) echec(s, 'date écrite en dur dans le texte')
  if (/\b[a-zéèêàù]+'[a-zéèêàù]+/i.test(texte.replace(/className=.*?(?=\s|$)/g, ''))) echec(s, 'apostrophe droite (\') dans le texte : utiliser ’')

  for (const [re, raison] of INTERDITS) {
    const m = (texte + ' ' + a.titre + ' ' + a.description + ' ' + a.extrait).match(re)
    if (m) echec(s, `« ${m[0].trim()} » — ${raison}`)
  }
}

// --- Plafond de publication : jamais plus d'un article par jour (contenu en masse) ---
const parJour = {}
for (const a of articles) if (a.datePublication >= DEPUIS) parJour[a.datePublication] = (parJour[a.datePublication] ?? 0) + 1
for (const [jour, n] of Object.entries(parJour)) if (n > 1) echec(jour, `${n} articles publiés le même jour (1 maximum)`)

// --- Quasi-doublons : mêmes suites de 6 mots entre deux articles ---
function empreinte(slug) {
  const f = join(RACINE, 'content/blog', `${slug}.tsx`)
  if (!existsSync(f)) return new Set()
  const m = (texteDe(readFileSync(f, 'utf8')).toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [])
  const g = new Set()
  for (let i = 0; i + 6 <= m.length; i++) g.add(m.slice(i, i + 6).join(' '))
  return g
}
const nouveaux = articles.filter((a) => a.datePublication >= DEPUIS)
if (nouveaux.length) {
  const emp = Object.fromEntries(articles.map((a) => [a.slug, empreinte(a.slug)]))
  for (const n of nouveaux) {
    for (const a of articles) {
      if (a.slug === n.slug || (a.datePublication >= DEPUIS && a.slug < n.slug)) continue
      const [x, y] = [emp[n.slug], emp[a.slug]]
      if (!x.size || !y.size) continue
      let commun = 0
      for (const g of x) if (y.has(g)) commun++
      const part = commun / Math.min(x.size, y.size)
      if (part > 0.12) echec(n.slug, `${Math.round(part * 100)} % de passages communs avec « ${a.slug} » (12 % max) : quasi-doublon`)
    }
  }
}

console.log(`${articles.length} articles contrôlés (règles éditoriales à partir du ${DEPUIS}).`)
if (erreurs.length) {
  console.error(`\n${erreurs.length} problème(s) :`)
  for (const e of erreurs) console.error(`  ✗ ${e}`)
  process.exit(1)
}
console.log('✓ blog conforme')
