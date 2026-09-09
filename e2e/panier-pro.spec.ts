import { test, expect } from '@playwright/test'
import type { SupabaseClient } from '@supabase/supabase-js'
import { adminClient, creerComptePro, emailTest, supprimerCompteTest } from './helpers/supabase'
import { connecter, MOT_DE_PASSE_TEST, remplirPanierPro } from './helpers/parcours'
import {
  FRAIS_PORT_HT,
  FRANCO_HT,
  GAMMES_PRO,
  computeEstimate,
  formatEUR,
  referencesDeGamme,
} from '../lib/catalogue'

/**
 * Grille tarifaire et panier professionnel.
 * Les montants attendus sont recalculés avec `computeEstimate`, la même fonction
 * que le serveur : un changement de tarif au catalogue ne casse pas les tests,
 * mais une divergence entre affichage et calcul est détectée.
 */

let admin: SupabaseClient
const comptes = new Set<string>()

async function compteProConnecte(page: Parameters<typeof connecter>[0]) {
  const email = emailTest('panier')
  comptes.add(email)
  await creerComptePro(admin, email, MOT_DE_PASSE_TEST)
  await connecter(page, email)
  return email
}

test.beforeAll(() => {
  admin = adminClient()
})

test.afterAll(async () => {
  for (const email of comptes) await supprimerCompteTest(admin, email)
})

test.describe('Tarifs et panier professionnels', () => {
  test('les tarifs sont masqués tant que le compte n’est pas professionnel', async ({ page }) => {
    await page.goto('/poissons#tarifs')
    const tarifs = page.locator('#tarifs')
    await expect(tarifs.getByRole('heading', { name: 'Tarifs professionnels' })).toBeVisible()
    await expect(
      tarifs.getByRole('link', { name: /Créer mon compte|Se connecter/ }).first(),
      'Un visiteur non connecté ne doit pas voir les prix'
    ).toBeVisible()
  })

  test('les trois gammes affichent leurs références et prix au compte pro', async ({ page }) => {
    await compteProConnecte(page)

    for (const gamme of GAMMES_PRO) {
      await page.goto(`${gamme.href}#tarifs`)
      const tarifs = page.locator('#tarifs')
      const refs = referencesDeGamme(gamme.gamme)
      expect(refs.length, `aucune référence au catalogue pour ${gamme.gamme}`).toBeGreaterThan(0)

      for (const ref of refs) {
        await expect(
          tarifs.getByLabel(`Nombre de cartons de ${ref.nom}`, { exact: true }),
          `${ref.nom} manque sur ${gamme.href}`
        ).toBeVisible()
      }
      await expect(tarifs.getByText(/€/).first()).toBeVisible()
    }
  })

  test('le total suit le catalogue et les frais de port s’appliquent sous le franco', async ({ page }) => {
    await compteProConnecte(page)

    // Un seul carton : on reste sous le franco de port.
    const ref = referencesDeGamme('poisson')[0]
    await remplirPanierPro(page, { [ref.id]: 1 })

    const attendu = computeEstimate([{ id: ref.id, cartons: 1 }])
    expect(attendu.sousTotalHT, 'ce test suppose un panier sous le franco').toBeLessThan(FRANCO_HT)
    expect(attendu.port).toBe(FRAIS_PORT_HT)

    const recap = page.locator('#tarifs')
    await expect(recap.getByText('Votre commande')).toBeVisible()
    await expect(recap.getByText(formatEUR(attendu.totalTTC), { exact: false }).first()).toBeVisible()
    await expect(recap.getByText(formatEUR(attendu.totalHT), { exact: false }).first()).toBeVisible()
  })

  test('le franco de port annule les frais au-delà du seuil', async ({ page }) => {
    await compteProConnecte(page)

    const ref = referencesDeGamme('poisson')[0]
    // Assez de cartons pour dépasser le franco.
    const parCarton = computeEstimate([{ id: ref.id, cartons: 1 }]).sousTotalHT
    const cartons = Math.ceil(FRANCO_HT / parCarton) + 1
    await remplirPanierPro(page, { [ref.id]: cartons })

    const attendu = computeEstimate([{ id: ref.id, cartons }])
    expect(attendu.franco, 'le panier devrait être franco de port').toBe(true)
    expect(attendu.port).toBe(0)

    await expect(page.locator('#tarifs').getByText(formatEUR(attendu.totalTTC), { exact: false }).first()).toBeVisible()
  })

  test('le panier survit à un rechargement et se vide sur commande', async ({ page }) => {
    await compteProConnecte(page)
    const ref = referencesDeGamme('poisson')[0]

    await page.goto('/poissons#tarifs')
    const champ = page.getByLabel(`Nombre de cartons de ${ref.nom}`, { exact: true })
    await page.getByRole('button', { name: `Ajouter un carton de ${ref.nom}` }).click()
    await page.getByRole('button', { name: `Ajouter un carton de ${ref.nom}` }).click()
    await expect(champ).toHaveValue('2')

    await page.reload()
    await expect(page.getByLabel(`Nombre de cartons de ${ref.nom}`, { exact: true })).toHaveValue('2')

    // Le retrait ramène bien à zéro et fait disparaître le récapitulatif.
    await page.getByRole('button', { name: `Retirer un carton de ${ref.nom}` }).click()
    await page.getByRole('button', { name: `Retirer un carton de ${ref.nom}` }).click()
    await expect(page.getByLabel(`Nombre de cartons de ${ref.nom}`, { exact: true })).toHaveValue('0')
    await expect(page.locator('#tarifs').getByText('Votre commande')).toHaveCount(0)
  })

  test('les quantités aberrantes sont bornées', async ({ page }) => {
    await compteProConnecte(page)
    const ref = referencesDeGamme('poisson')[0]

    // 99 est le plafond (MAX_CARTONS) appliqué par le contexte panier.
    await remplirPanierPro(page, { [ref.id]: 5000 })
    await expect(page.getByLabel(`Nombre de cartons de ${ref.nom}`, { exact: true })).toHaveValue('99')

    // Une référence inconnue est ignorée à la relecture du panier.
    await remplirPanierPro(page, { 'reference-inexistante': 3, [ref.id]: 1 })
    await expect(page.getByLabel(`Nombre de cartons de ${ref.nom}`, { exact: true })).toHaveValue('1')
    const attendu = computeEstimate([{ id: ref.id, cartons: 1 }])
    await expect(page.locator('#tarifs').getByText(formatEUR(attendu.totalTTC), { exact: false }).first()).toBeVisible()
  })
})
