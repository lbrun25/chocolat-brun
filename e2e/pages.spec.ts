import { test, expect } from '@playwright/test'
import { products } from '../lib/products'
import { GAMMES_PRO } from '../lib/catalogue'

/**
 * Contrôle transverse de toutes les pages publiques : statut HTTP, titre, un
 * seul `h1`, absence d'erreur console et de ressource cassée (images comprises).
 */

const PAGES_PUBLIQUES = [
  '/',
  '/histoire',
  '/galerie',
  ...GAMMES_PRO.map((g) => g.href),
  '/napolitains',
  '/produits',
  `/produits/${products[0].slug}`,
  '/prix',
  '/pro',
  '/panier',
  '/panier-comtoises',
  '/commander',
  '/espace-pro/connexion',
  '/espace-pro/inscription',
  '/cgu',
  '/livraison',
  '/mentions-legales',
  '/politique-confidentialite',
]

/** Bruits connus, sans rapport avec la santé de la page. */
const BRUIT = /favicon|Download the React DevTools|Failed to load resource: the server responded with a status of 40[13]/i

test.describe('Pages publiques', () => {
  for (const chemin of PAGES_PUBLIQUES) {
    test(`${chemin} répond correctement`, async ({ page }) => {
      const erreurs: string[] = []
      const ressourcesKO: string[] = []

      page.on('console', (m) => {
        if (m.type() === 'error' && !BRUIT.test(m.text())) erreurs.push(m.text())
      })
      page.on('pageerror', (e) => erreurs.push(`pageerror: ${e.message}`))
      page.on('response', (r) => {
        if (r.status() >= 400 && new URL(r.url()).origin === new URL(page.url() || r.url()).origin) {
          ressourcesKO.push(`${r.status()} ${r.url()}`)
        }
      })

      const reponse = await page.goto(chemin, { waitUntil: 'networkidle' })
      expect(reponse?.status(), `${chemin} ne répond pas 200`).toBe(200)

      await expect(page.locator('h1'), `${chemin} devrait avoir un seul h1`).toHaveCount(1)
      await expect(page).toHaveTitle(/.+/)

      expect(erreurs, `erreurs console sur ${chemin}`).toEqual([])
      expect(ressourcesKO, `ressources en échec sur ${chemin}`).toEqual([])
    })
  }

  test('les images de la page d’accueil se chargent toutes', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    const cassees = await page.evaluate(() =>
      [...document.querySelectorAll('img')]
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src)
    )
    expect(cassees, 'images cassées sur l’accueil').toEqual([])
  })

  test('robots.txt et sitemap.xml sont servis', async ({ request }) => {
    const robots = await request.get('/robots.txt')
    expect(robots.status()).toBe(200)
    expect(await robots.text()).toMatch(/sitemap/i)

    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.status()).toBe(200)
    const xml = await sitemap.text()
    expect(xml).toContain('<urlset')
    for (const gamme of GAMMES_PRO) expect(xml, `${gamme.href} absent du sitemap`).toContain(gamme.href)
  })

  test('une page inexistante renvoie 404', async ({ page }) => {
    const reponse = await page.goto('/page-qui-nexiste-pas-du-tout')
    expect(reponse?.status()).toBe(404)
  })

  test('le formulaire de devis refuse les envois invalides', async ({ request }) => {
    // Seuls les refus sont testés : un envoi valide expédie un vrai email au client.
    const vide = await request.post('/api/devis', { data: {} })
    expect(vide.status()).toBe(400)
    expect((await vide.json()).message).toMatch(/requis/i)

    const emailInvalide = await request.post('/api/devis', {
      data: { nom: 'Test', email: 'pas-un-email', telephone: '0381440736' },
    })
    expect(emailInvalide.status()).toBe(400)

    // Honeypot : la route répond 200 sans rien envoyer, pour ne pas renseigner
    // le spammeur sur la détection. Le succès annoncé ne vaut donc pas envoi.
    const spam = await request.post('/api/devis', {
      data: {
        nom: 'Test',
        email: 'test@example.com',
        telephone: '0381440736',
        website: 'http://spam.example',
      },
    })
    expect(spam.status()).toBe(200)
    expect((await spam.json()).message).toBe('OK')
  })
})
