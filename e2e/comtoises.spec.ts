import { test, expect, type Page } from '@playwright/test'
import type { SupabaseClient } from '@supabase/supabase-js'
import { adminClient, emailTest, supprimerCompteTest } from './helpers/supabase'
import { CIBLE_PROD, payerAvecCarteDeTest, remplirPanierComtoises } from './helpers/parcours'
import { MAX_QUANTITE, coffrets, computeTotalComtoises, formatEUR } from '../lib/belles-comtoises'
import { FREE_SHIPPING_THRESHOLD, calculateShippingCost } from '../lib/shipping'

/**
 * Tunnel grand public « Les Belles Comtoises » :
 * accueil → panier → Stripe → /panier-comtoises/succes.
 */

const COFFRET = coffrets[0]
const total = (quantites: Record<string, number>) =>
  computeTotalComtoises(
    Object.entries(quantites).map(([id, quantite]) => ({ id, quantite })),
    calculateShippingCost,
    FREE_SHIPPING_THRESHOLD
  )

let admin: SupabaseClient
const emailsCommande = new Set<string>()

test.beforeAll(() => {
  admin = adminClient()
})

test.afterAll(async () => {
  for (const email of emailsCommande) {
    await admin.from('orders').delete().eq('email', email)
    await supprimerCompteTest(admin, email)
  }
})

function cgv(page: Page) {
  return page.getByRole('checkbox', { name: /J’ai lu et j’accepte/ })
}

async function remplirContact(page: Page, email: string) {
  await page.locator('#prenom').fill('Lucien')
  await page.locator('#nom').fill('Brun')
  await page.locator('#email').fill(email)
  await page.locator('#telephone').fill('0381440736')
}

test.describe('Les Belles Comtoises', () => {
  test('les coffrets sont présentés avec leur prix sur l’accueil', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('#coffrets')
    await expect(section).toBeVisible()

    for (const c of coffrets) {
      await expect(
        section.getByRole('button', { name: `Ajouter le ${c.nom} au panier` }),
        `${c.nom} manque sur l’accueil`
      ).toBeVisible()
      await expect(section.getByText(formatEUR(c.prixTTC)).first()).toBeVisible()
    }
  })

  test('ajouter un coffret depuis l’accueil alimente le panier', async ({ page }) => {
    await page.goto('/#coffrets')
    await page.getByRole('button', { name: `Ajouter le ${COFFRET.nom} au panier` }).click()

    await page.goto('/panier-comtoises')
    await expect(page.getByText(COFFRET.nom).first()).toBeVisible()

    const attendu = total({ [COFFRET.id]: 1 })
    await expect(page.getByRole('button', { name: new RegExp(`Payer.*${formatEUR(attendu.totalTTC).replace(/\s/g, '.')}`) })).toBeVisible()
  })

  test('un panier vide ne permet pas de payer', async ({ page }) => {
    await page.goto('/panier-comtoises')
    await expect(page.getByText('Votre panier est vide.')).toBeVisible()
    await expect(page.getByRole('button', { name: /Payer/ })).toHaveCount(0)
  })

  test('les quantités sont bornées et les coffrets inconnus ignorés', async ({ page }) => {
    await remplirPanierComtoises(page, { [COFFRET.id]: 999, 'coffret-inexistant': 4 })
    const attendu = total({ [COFFRET.id]: MAX_QUANTITE })
    await expect(page.getByText(formatEUR(attendu.sousTotalTTC)).first()).toBeVisible()
  })

  test('les CGV conditionnent le paiement', async ({ page }) => {
    await remplirPanierComtoises(page, { [COFFRET.id]: 1 })
    const bouton = page.getByRole('button', { name: /Payer/ })
    await expect(bouton).toBeDisabled()
    await cgv(page).check()
    await expect(bouton).toBeEnabled()
  })

  test('l’API refuse un panier vide et le honeypot', async ({ request }) => {
    const base = { prenom: 'Lucien', nom: 'Brun', email: emailTest('comtoises-api'), telephone: '0381440736' }

    const vide = await request.post('/api/boutique/checkout', { data: { ...base, items: [] } })
    expect(vide.status()).toBe(400)

    const spam = await request.post('/api/boutique/checkout', {
      data: { ...base, items: [{ id: COFFRET.id, quantite: 1 }], website: 'http://spam.example' },
    })
    expect(spam.status()).toBe(400)
  })

  test('l’API plafonne les quantités envoyées par le client', async ({ request }) => {
    const res = await request.post('/api/boutique/checkout', {
      data: {
        prenom: 'Lucien',
        nom: 'Brun',
        email: emailTest('comtoises-plafond'),
        telephone: '0381440736',
        // 500 exemplaires demandés : le serveur doit ramener à MAX_QUANTITE.
        items: [{ id: COFFRET.id, quantite: 500 }],
      },
    })
    expect(res.ok(), await res.text()).toBe(true)
    const { url } = await res.json()
    expect(url).toContain('checkout.stripe.com')
  })

  test('paiement complet : commande enregistrée', async ({ page }) => {
    test.skip(CIBLE_PROD, 'la prod utilise des clés Stripe live : aucun paiement n’est joué')
    test.setTimeout(180_000)

    const email = emailTest('comtoises-paiement')
    emailsCommande.add(email)
    const quantites = { [COFFRET.id]: 2 }
    const attendu = total(quantites)

    await remplirPanierComtoises(page, quantites)
    await remplirContact(page, email)
    await cgv(page).check()
    await page.getByRole('button', { name: /Payer/ }).click()

    await payerAvecCarteDeTest(page)

    await page.waitForURL(/\/panier-comtoises\/succes/, { timeout: 120_000 })
    await expect(page.getByRole('heading', { name: /commande|merci/i }).first()).toBeVisible({ timeout: 60_000 })

    const { data: commande } = await admin.from('orders').select('*').eq('email', email).maybeSingle()
    expect(commande, 'aucune commande enregistrée en base').not.toBeNull()
    expect(commande!.status).toBe('paid')
    expect(Number(commande!.total_with_shipping)).toBeCloseTo(attendu.totalTTC, 2)

    const panier = await page.evaluate(() => localStorage.getItem('chocolat-brun-panier-comtoises'))
    expect(panier, 'le panier doit être vidé après paiement').toBe('{}')
  })
})
