#!/usr/bin/env node
/**
 * Stats de la période : Google Analytics 4 et, si l'accès est donné, Google Search Console.
 *
 *   node scripts/stats-semaine.mjs        # 7 derniers jours, comparés aux 7 précédents
 *   node scripts/stats-semaine.mjs 28     # 28 derniers jours
 *
 * Lecture seule, par le compte de service lecture-stats@chocolat-brun-stats.iam.gserviceaccount.com
 * (projet Google Cloud de Lucien, ajouté en Lecteur dans GA et en accès restreint dans Search Console).
 * Clé hors dépôt : GA_KEY_FILE, par défaut ~/.config/chocolat-brun/ga.json. Ne jamais la committer.
 * Propriété GA : GA_PROPERTY (numéro), sinon la première visible par le compte de service.
 *
 * GA ne compte que les visiteurs qui ont accepté la mesure d'audience (bandeau cookies) :
 * les chiffres sont des minimums.
 */
import { readFileSync } from 'node:fs'
import { createSign } from 'node:crypto'
import { homedir } from 'node:os'
import { join } from 'node:path'

const JOURS = Number(process.argv[2] ?? 7)
const cle = JSON.parse(readFileSync(process.env.GA_KEY_FILE ?? join(homedir(), '.config/chocolat-brun/ga.json'), 'utf8'))

// --- Jeton OAuth du compte de service (JWT signé, sans dépendance) ---
const b64 = (o) => Buffer.from(typeof o === 'string' ? o : JSON.stringify(o)).toString('base64url')
async function jeton(scope) {
  const t = Math.floor(Date.now() / 1000)
  const entete = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: cle.client_email,
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    iat: t,
    exp: t + 3600,
  })}`
  const signature = createSign('RSA-SHA256').update(entete).sign(cle.private_key, 'base64url')
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${entete}.${signature}` }),
  })
  const j = await r.json()
  if (!j.access_token) throw new Error(`jeton refusé : ${JSON.stringify(j)}`)
  return j.access_token
}

async function appel(url, token, corps) {
  const r = await fetch(url, {
    method: corps ? 'POST' : 'GET',
    headers: { authorization: `Bearer ${token}`, ...(corps && { 'content-type': 'application/json' }) },
    body: corps && JSON.stringify(corps),
  })
  const j = await r.json()
  if (!r.ok) throw new Error(`${r.status} ${j.error?.message ?? JSON.stringify(j)}`)
  return j
}

const nb = (v) => Math.round(Number(v)).toLocaleString('fr-FR')
const evol = (a, b) => (Number(b) ? ` (${Number(a) >= Number(b) ? '+' : ''}${Math.round(((a - b) / b) * 100)} % vs période précédente : ${nb(b)})` : ` (période précédente : ${nb(b)})`)
const titre = (t) => console.log(`\n## ${t}`)
const ligne = (cols) => console.log('  ' + cols.join('  ·  '))

// --- Google Analytics 4 ---
async function analytics() {
  const token = await jeton('https://www.googleapis.com/auth/analytics.readonly')
  let propriete = process.env.GA_PROPERTY && `properties/${process.env.GA_PROPERTY}`
  if (!propriete) {
    const { accountSummaries = [] } = await appel('https://analyticsadmin.googleapis.com/v1beta/accountSummaries', token)
    const props = accountSummaries.flatMap((a) => a.propertySummaries ?? [])
    if (!props.length) {
      console.log(`\nGA : aucune propriété visible. Ajouter ${cle.client_email} en Lecteur (Administration → Gestion des accès à la propriété).`)
      return
    }
    for (const p of props) console.log(`Propriété GA visible : ${p.displayName} (${p.property.split('/')[1]})`)
    propriete = props[0].property
  }
  const actuelle = { startDate: `${JOURS - 1}daysAgo`, endDate: 'today' }
  const precedente = { startDate: `${2 * JOURS - 1}daysAgo`, endDate: `${JOURS}daysAgo` }
  const rapport = (corps) =>
    appel(`https://analyticsdata.googleapis.com/v1beta/${propriete}:runReport`, token, { dateRanges: [actuelle], ...corps })
  const lignes = (r) => (r.rows ?? []).map((x) => [...(x.dimensionValues ?? []).map((d) => d.value), ...x.metricValues.map((m) => m.value)])

  const metriques = ['activeUsers', 'newUsers', 'sessions', 'screenPageViews', 'engagementRate', 'averageSessionDuration']
  const tot = await rapport({ dateRanges: [actuelle, precedente], metrics: metriques.map((name) => ({ name })) })
  const val = (plage) => tot.rows?.find((r) => r.dimensionValues?.[0]?.value === plage)?.metricValues.map((m) => m.value) ?? metriques.map(() => 0)
  const [a, b] = [val('date_range_0'), val('date_range_1')]
  titre(`Analytics — ${JOURS} derniers jours (aujourd'hui inclus)`)
  console.log(`  Visiteurs : ${nb(a[0])}${evol(a[0], b[0])}`)
  console.log(`  Nouveaux visiteurs : ${nb(a[1])}${evol(a[1], b[1])}`)
  console.log(`  Visites : ${nb(a[2])}${evol(a[2], b[2])}`)
  console.log(`  Pages vues : ${nb(a[3])}${evol(a[3], b[3])}`)
  console.log(`  Visites engagées : ${Math.round(a[4] * 100)} % · durée moyenne : ${Math.round(a[5])} s`)

  titre('Par jour (visiteurs · visites · pages vues)')
  const jours = lignes(await rapport({ dimensions: [{ name: 'date' }], metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }], orderBys: [{ dimension: { dimensionName: 'date' } }] }))
  for (const [d, ...m] of jours) ligne([`${d.slice(6)}/${d.slice(4, 6)}`, ...m.map(nb)])

  titre('Canaux (visites · visiteurs)')
  for (const [c, ...m] of lignes(await rapport({ dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }, { name: 'activeUsers' }] }))) ligne([c, ...m.map(nb)])

  titre('Sources (visites)')
  for (const [s, v] of lignes(await rapport({ dimensions: [{ name: 'sessionSourceMedium' }], metrics: [{ name: 'sessions' }], limit: 12 }))) ligne([s, nb(v)])

  titre("Pages d'entrée (visites)")
  for (const [p, v] of lignes(await rapport({ dimensions: [{ name: 'landingPage' }], metrics: [{ name: 'sessions' }], limit: 15 }))) ligne([p, nb(v)])

  titre('Pages les plus vues (vues · visiteurs)')
  for (const [p, ...m] of lignes(await rapport({ dimensions: [{ name: 'pagePath' }], metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }], limit: 20 }))) ligne([p, ...m.map(nb)])

  titre('Parcours d’achat (événements)')
  const ev = Object.fromEntries(lignes(await rapport({ dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }] })))
  for (const e of ['add_to_cart', 'begin_checkout', 'purchase', 'sign_up']) ligne([e, nb(ev[e] ?? 0)])

  titre('Villes (visiteurs)')
  for (const [p, v, n] of lignes(await rapport({ dimensions: [{ name: 'country' }, { name: 'city' }], metrics: [{ name: 'activeUsers' }], limit: 12 }))) ligne([`${v} (${p})`, nb(n)])

  titre('Appareils (visiteurs)')
  for (const [d, v] of lignes(await rapport({ dimensions: [{ name: 'deviceCategory' }], metrics: [{ name: 'activeUsers' }] }))) ligne([d, nb(v)])
}

// --- Google Search Console (facultatif) ---
async function searchConsole() {
  const token = await jeton('https://www.googleapis.com/auth/webmasters.readonly')
  const { siteEntry = [] } = await appel('https://www.googleapis.com/webmasters/v3/sites', token)
  if (!siteEntry.length) {
    console.log(`\nSearch Console : pas d'accès. Ajouter ${cle.client_email} (Paramètres → Utilisateurs et autorisations, accès restreint).`)
    return
  }
  const site = siteEntry.find((s) => /cedric-brun/.test(s.siteUrl))?.siteUrl ?? siteEntry[0].siteUrl
  const jour = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10)
  // Données consolidées avec ~2 jours de retard
  const plage = { startDate: jour(JOURS + 1), endDate: jour(2) }
  const avant = { startDate: jour(2 * JOURS + 1), endDate: jour(JOURS + 2) }
  const requete = (corps) => appel(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`, token, corps)
  const [t, tp] = await Promise.all([requete(plage), requete(avant)])
  const [x, y] = [t.rows?.[0] ?? {}, tp.rows?.[0] ?? {}]
  titre(`Recherche Google — ${site} du ${plage.startDate} au ${plage.endDate}`)
  console.log(`  Clics : ${nb(x.clicks ?? 0)}${evol(x.clicks ?? 0, y.clicks ?? 0)}`)
  console.log(`  Impressions : ${nb(x.impressions ?? 0)}${evol(x.impressions ?? 0, y.impressions ?? 0)}`)
  console.log(`  Position moyenne : ${(x.position ?? 0).toFixed(1)} (avant : ${(y.position ?? 0).toFixed(1)})`)
  titre('Recherches (clics · impressions · position)')
  for (const r of (await requete({ ...plage, dimensions: ['query'], rowLimit: 25 })).rows ?? []) ligne([r.keys[0], nb(r.clicks), nb(r.impressions), r.position.toFixed(1)])
  titre('Pages dans Google (clics · impressions · position)')
  for (const r of (await requete({ ...plage, dimensions: ['page'], rowLimit: 20 })).rows ?? []) ligne([r.keys[0].replace(/^https?:\/\/[^/]+/, ''), nb(r.clicks), nb(r.impressions), r.position.toFixed(1)])
}

for (const [nom, f] of [['Analytics', analytics], ['Search Console', searchConsole]]) {
  try {
    await f()
  } catch (e) {
    console.log(`\n${nom} : ${e.message}`)
  }
}
