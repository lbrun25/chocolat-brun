import { test, expect, type Page } from '@playwright/test'
import type { SupabaseClient } from '@supabase/supabase-js'
import { adminClient, emailTest, supprimerCompteTest } from './helpers/supabase'
import { CIBLE_PROD, payerAvecCarteDeTest, remplirPanierPro } from './helpers/parcours'
import { computeEstimate, formatEUR, referencesDeGamme } from '../lib/catalogue'

/**
 * Tunnel de commande professionnel : /commander → Stripe → /commander/succes.
 *
 * Le paiement n'est joué qu'en mode test (serveur local). Contre la prod, qui
 * tourne avec des clés Stripe live, on s'arrête à l'ouverture de la session.
 */

const REF = referencesDeGamme('poisson')[0]
const PANIER = { [REF.id]: 2 }
const ATTENDU = computeEstimate([{ id: REF.id, cartons: 2 }])

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

/** Case d'acceptation des CGV — la page en compte une seconde, pour la facturation. */
function cgv(page: Page) {
  return page.getByRole('checkbox', { name: /J’ai lu et j’accepte/ })
}

/**
 * Renseigne les coordonnées de livraison.
 * Ciblage par identifiant : les libellés portent l'astérisque des champs requis
 * (« Nom * »), ce qui rend la correspondance par texte inutilement fragile.
 */
async function remplirCoordonnees(page: Page, email: string) {
  await page.locator('#etablissement').fill('Restaurant de Test')
  await page.locator('#typeEtablissement').selectOption('Restaurant')
  await page.locator('#siret').fill('94768105200025')
  await page.locator('#prenom').fill('Lucien')
  await page.locator('#nom').fill('Brun')
  await page.locator('#email').fill(email)
  await page.locator('#telephone').fill('0381440736')
  await page.locator('#adresse').fill('2 rue du Chalet')
  await page.locator('#codePostal').fill('25140')
  await page.locator('#ville').fill('Charquemont')
}

test.describe('Commande professionnelle', () => {
  test('un panier vide ne permet pas de commander', async ({ page }) => {
    await page.goto('/commander')
    await expect(page.getByText('Votre panier est vide.')).toBeVisible()
    await expect(page.getByRole('button', { name: /Payer/ })).toHaveCount(0)
  })

  test('le montant affiché correspond au calcul du catalogue', async ({ page }) => {
    await remplirPanierPro(page, PANIER, '/commander')
    await expect(
      page.getByRole('button', { name: new RegExp(`Payer.*${ATTENDU.totalTTC.toFixed(2).replace('.', ',')}`) })
    ).toBeVisible()
    await expect(page.getByText(formatEUR(ATTENDU.totalTTC)).first()).toBeVisible()
  })

  test('les CGV doivent être acceptées pour payer', async ({ page }) => {
    await remplirPanierPro(page, PANIER, '/commander')
    const bouton = page.getByRole('button', { name: /Payer/ })
    await expect(bouton, 'le bouton doit rester désactivé sans acceptation des CGV').toBeDisabled()

    await cgv(page).check()
    await expect(bouton).toBeEnabled()
  })

  test('les coordonnées de livraison sont obligatoires', async ({ page }) => {
    await remplirPanierPro(page, PANIER, '/commander')
    await cgv(page).check()
    await page.getByRole('button', { name: /Payer/ }).click()

    // La validation navigateur bloque l'envoi : on reste sur la page.
    await expect(page).toHaveURL(/\/commander$/)
    await expect(page.locator('#etablissement')).toHaveJSProperty('validity.valueMissing', true)
  })

  test('l’API recalcule les prix et ignore ceux envoyés par le client', async ({ request }) => {
    const email = emailTest('api-prix')
    const res = await request.post('/api/pro/checkout', {
      data: {
        items: [{ id: REF.id, cartons: 2, prixPieceHT: 0.01, totalHT: 1 }],
        etablissement: 'Restaurant de Test',
        nom: 'Brun',
        prenom: 'Lucien',
        email,
        telephone: '0381440736',
        adresse: '2 rue du Chalet',
        codePostal: '25140',
        ville: 'Charquemont',
        pays: 'FR',
      },
    })
    expect(res.ok(), await res.text()).toBe(true)
    const { url, sessionId } = await res.json()
    expect(url).toContain('checkout.stripe.com')
    expect(sessionId).toMatch(/^cs_/)
  })

  test('le panier vide et le honeypot sont rejetés par l’API', async ({ request }) => {
    const base = {
      etablissement: 'Restaurant de Test',
      nom: 'Brun',
      email: emailTest('api-refus'),
      telephone: '0381440736',
      adresse: '2 rue du Chalet',
      codePostal: '25140',
      ville: 'Charquemont',
    }

    const vide = await request.post('/api/pro/checkout', { data: { ...base, items: [] } })
    expect(vide.status()).toBe(400)
    expect((await vide.json()).error).toMatch(/panier est vide/i)

    const spam = await request.post('/api/pro/checkout', {
      data: { ...base, items: [{ id: REF.id, cartons: 1 }], website: 'http://spam.example' },
    })
    expect(spam.status()).toBe(400)

    const incomplet = await request.post('/api/pro/checkout', {
      data: { items: [{ id: REF.id, cartons: 1 }], email: 'pas-un-email' },
    })
    expect(incomplet.status()).toBe(400)
  })

  test('la commande ouvre une session Stripe au bon montant', async ({ page }) => {
    const email = emailTest('stripe')
    emailsCommande.add(email)

    await remplirPanierPro(page, PANIER, '/commander')
    await remplirCoordonnees(page, email)
    await cgv(page).check()
    await page.getByRole('button', { name: /Payer/ }).click()

    await page.waitForURL(/checkout\.stripe\.com/, { timeout: 60_000 })
    // Stripe affiche le montant total à payer, TVA et port compris.
    await expect(
      page.getByText(ATTENDU.totalTTC.toFixed(2).replace('.', ','), { exact: false }).first()
    ).toBeVisible()
  })

  test('paiement complet : commande enregistrée et numéro affiché', async ({ page }) => {
    test.skip(CIBLE_PROD, 'la prod utilise des clés Stripe live : aucun paiement n’est joué')
    test.setTimeout(180_000)

    const email = emailTest('paiement')
    emailsCommande.add(email)

    await remplirPanierPro(page, PANIER, '/commander')
    await remplirCoordonnees(page, email)
    await cgv(page).check()
    await page.getByRole('button', { name: /Payer/ }).click()

    await payerAvecCarteDeTest(page)

    await page.waitForURL(/\/commander\/succes/, { timeout: 120_000 })
    await expect(page.getByRole('heading', { name: /votre commande est enregistrée/i })).toBeVisible({
      timeout: 60_000,
    })

    // La commande est bien en base, au bon montant, et le panier est vidé.
    const { data: commande } = await admin
      .from('orders')
      .select('*')
      .eq('email', email)
      .maybeSingle()

    expect(commande, 'aucune commande enregistrée en base').not.toBeNull()
    // `total_with_shipping` est le montant réellement débité (marchandises + port + TVA).
    expect(Number(commande!.total_with_shipping)).toBeCloseTo(ATTENDU.totalTTC, 2)
    expect(Number(commande!.shipping_cost)).toBeGreaterThan(0)
    expect(commande!.status).toBe('paid')
    expect(commande!.shipping_city).toBe('Charquemont')
    expect(commande!.shipping_postal_code).toBe('25140')
    expect(commande!.customer_company).toBe('Restaurant de Test')
    expect(commande!.delivery_notes, 'le SIRET doit être joint aux notes').toContain('94768105200025')
    expect(commande!.stripe_session_id).toMatch(/^cs_/)

    await expect(page.getByText(String(commande!.order_number))).toBeVisible()

    const panier = await page.evaluate(() => localStorage.getItem('chocolat-brun-panier-pro'))
    expect(panier, 'le panier doit être vidé après paiement').toBe('{}')
  })
})
