import { test, expect, type Page } from '@playwright/test'
import type { SupabaseClient } from '@supabase/supabase-js'
import {
  adminClient,
  colonnesProManquantes,
  confirmerEmail,
  creerCompteSansProfil,
  creerProfilTest,
  emailTest,
  supprimerCompteTest,
} from './helpers/supabase'

/**
 * Chaîne complète de l'inscription professionnelle :
 * formulaire → vérification SIRET (INSEE) → création du compte Supabase →
 * enregistrement du profil pro → connexion → affichage des tarifs.
 */

const SIRET = process.env.E2E_SIRET || '94768105200025'
const MOT_DE_PASSE = 'MotDePasseE2E!2026'
const TYPE_ETABLISSEMENT = 'Restaurant'

let admin: SupabaseClient
const comptesCrees = new Set<string>()

test.beforeAll(() => {
  admin = adminClient()
})

test.afterAll(async () => {
  for (const email of comptesCrees) {
    await supprimerCompteTest(admin, email)
  }
})

/**
 * Détache le SIRET de tout profil de test : il est protégé par un index unique,
 * un reste de test précédent ferait échouer l'inscription. Ne touche jamais à un
 * profil réel.
 */
async function libererSiret(): Promise<void> {
  await admin.from('profiles').delete().eq('siret', SIRET).like('email', '%+e2e-%')
}

/**
 * Message d'erreur du formulaire. `getByRole('alert')` seul attraperait aussi
 * `#__next-route-announcer__`, que Next.js ajoute à chaque page.
 */
function alerteFormulaire(page: Page) {
  return page.locator('form p[role="alert"]')
}

/** Remplit et soumet le formulaire d'inscription. */
async function remplirInscription(
  page: Page,
  champs: { siret: string; email: string; motDePasse?: string }
) {
  await page.goto('/espace-pro/inscription')
  await expect(page.getByRole('heading', { name: 'Créer mon compte' })).toBeVisible()

  await page.getByLabel(/Numéro SIRET/).fill(champs.siret)
  await page.getByLabel(/Type d’établissement/).selectOption(TYPE_ETABLISSEMENT)
  await page.getByLabel('Prénom').fill('Lucien')
  await page.getByLabel('Nom', { exact: true }).fill('Brun')
  await page.getByLabel(/^Email/).fill(champs.email)
  await page.getByLabel('Téléphone').fill('0381440736')
  await page.getByLabel(/Mot de passe/).fill(champs.motDePasse ?? MOT_DE_PASSE)

  await page.getByRole('button', { name: 'Créer mon compte' }).click()
}

test.describe('Inscription professionnelle', () => {
  test('le schéma de la base porte les colonnes pro', async () => {
    const manquantes = await colonnesProManquantes(admin)
    expect(
      manquantes,
      `Colonnes absentes de public.profiles : ${manquantes.join(', ')}.\n` +
        'Appliquer supabase/migrations/20260828000000_add_siret_to_profiles.sql ' +
        '(Dashboard Supabase → SQL Editor).'
    ).toEqual([])
  })

  test('un SIRET inexistant est refusé sans créer de compte', async ({ page }) => {
    const email = emailTest('siret-ko')
    await remplirInscription(page, { siret: '00000000000000', email })

    const alerte = alerteFormulaire(page)
    await expect(alerte).toBeVisible()
    await expect(alerte).toContainText(/SIRET/i)
    await expect(page.getByRole('heading', { name: 'Compte créé' })).toHaveCount(0)

    const { data } = await admin.from('profiles').select('id').eq('email', email)
    expect(data ?? []).toHaveLength(0)
  })

  test('un mot de passe trop court est refusé', async ({ page }) => {
    const email = emailTest('mdp-court')
    await page.goto('/espace-pro/inscription')
    await page.getByLabel(/Numéro SIRET/).fill(SIRET)
    await page.getByLabel(/^Email/).fill(email)
    await page.getByLabel(/Mot de passe/).fill('court')
    await page.getByRole('button', { name: 'Créer mon compte' }).click()

    // Le champ porte minLength=8 : la validation navigateur bloque l'envoi.
    await expect(page.getByLabel(/Mot de passe/)).toHaveJSProperty('validity.tooShort', true)
    await expect(page.getByRole('heading', { name: 'Compte créé' })).toHaveCount(0)
  })

  test('inscription complète : compte, profil pro et accès aux tarifs', async ({ page }) => {
    const email = emailTest()
    comptesCrees.add(email)
    await libererSiret()

    const erreursConsole: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') erreursConsole.push(msg.text())
    })

    await remplirInscription(page, { siret: SIRET, email })

    // 1. L'écran de confirmation s'affiche — pas de message d'erreur.
    await expect(
      alerteFormulaire(page),
      'Le formulaire a renvoyé une erreur au lieu de créer le compte'
    ).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Compte créé' })).toBeVisible()
    // La raison sociale renvoyée par l'INSEE est reprise dans la confirmation.
    await expect(
      page.locator('main').getByText(/est enregistré\.[\s\S]*Confirmez votre adresse email/i)
    ).toBeVisible()

    // 2. Le profil est bien enregistré avec les données pro.
    const { data: profil, error } = await admin
      .from('profiles')
      .select('*')
      .eq('email', email)
      .maybeSingle()

    expect(error, error?.message).toBeNull()
    expect(profil, 'Aucun profil enregistré pour le compte créé').not.toBeNull()
    expect(profil!.siret).toBe(SIRET)
    expect(profil!.siret_verified_at).toBeTruthy()
    expect(profil!.raison_sociale).toBeTruthy()
    expect(profil!.type_etablissement).toBe(TYPE_ETABLISSEMENT)
    expect(profil!.is_guest).toBe(false)
    expect(profil!.user_id).toBeTruthy()
    expect(profil!.first_name).toBe('Lucien')
    expect(profil!.phone).toBe('0381440736')

    // 3. Connexion : la confirmation d'email se fait ici côté admin, faute de
    //    boîte mail accessible depuis le test.
    await confirmerEmail(admin, email)

    await page.goto('/espace-pro/connexion')
    await page.getByLabel(/^Email/).fill(email)
    await page.getByLabel(/Mot de passe/).fill(MOT_DE_PASSE)
    await page.getByRole('button', { name: /Se connecter/ }).click()

    // 4. Les tarifs professionnels s'affichent.
    await page.waitForURL(/\/poissons/, { timeout: 30_000 })
    const tarifs = page.locator('#tarifs')
    await expect(tarifs.getByRole('heading', { name: 'Tarifs professionnels' })).toBeVisible()
    await expect(tarifs.getByText(/€/).first()).toBeVisible()
    await expect(
      tarifs.getByRole('link', { name: /Créer mon compte|Se connecter/ }),
      'Les tarifs sont encore masqués : le profil pro n’est pas reconnu'
    ).toHaveCount(0)

    expect(erreursConsole.filter((e) => !/favicon|Download the React/i.test(e))).toEqual([])
  })

  /**
   * Régression : tant que les colonnes SIRET manquaient, l'API créait le compte
   * Auth puis échouait sur le profil, laissant un compte orphelin. Réessayer
   * depuis une de ces adresses doit rattacher le profil au compte existant.
   */
  test('une inscription reprend un compte Auth resté sans profil', async ({ page }) => {
    const email = emailTest('orphelin')
    comptesCrees.add(email)
    await libererSiret()

    // Compte Auth sans profil, créé côté admin pour ne pas déclencher le
    // rate limit d'envoi d'email qui bloquerait le vrai parcours ensuite.
    const orphelin = await creerCompteSansProfil(admin, email, MOT_DE_PASSE)

    await remplirInscription(page, { siret: SIRET, email })

    await expect(alerteFormulaire(page)).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Compte créé' })).toBeVisible()

    const { data: profil } = await admin
      .from('profiles')
      .select('user_id, siret, siret_verified_at')
      .eq('email', email)
      .maybeSingle()

    expect(profil, 'Le profil n’a pas été créé pour le compte orphelin').not.toBeNull()
    expect(profil!.siret).toBe(SIRET)
    expect(profil!.siret_verified_at).toBeTruthy()
    expect(profil!.user_id, 'Le profil pointe sur un autre compte que l’existant').toBe(orphelin)
  })

  test('un second compte avec le même email est refusé', async ({ page }) => {
    const email = emailTest('doublon')
    comptesCrees.add(email)
    await libererSiret()
    // Profil sans SIRET : c'est bien le contrôle sur l'email qui doit se déclencher.
    await creerProfilTest(admin, { email })

    await remplirInscription(page, { siret: SIRET, email })

    const alerte = alerteFormulaire(page)
    await expect(alerte).toBeVisible()
    await expect(alerte).toContainText(/existe déjà/i)
  })

  /**
   * Un index unique protège le SIRET en base. Sans contrôle en amont, l'insertion
   * échouait après la création du compte Auth : message incompréhensible et
   * compte orphelin.
   */
  test('un SIRET déjà rattaché à un compte est refusé avant toute création', async ({ page }) => {
    const emailOccupant = emailTest('occupant')
    const email = emailTest('siret-pris')
    comptesCrees.add(emailOccupant)
    comptesCrees.add(email)

    await libererSiret()
    await creerProfilTest(admin, { email: emailOccupant, siret: SIRET })

    await remplirInscription(page, { siret: SIRET, email })

    const alerte = alerteFormulaire(page)
    await expect(alerte).toBeVisible()
    await expect(alerte).toContainText(/déjà rattaché à un compte/i)
    await expect(page.getByRole('heading', { name: 'Compte créé' })).toHaveCount(0)

    // Aucun compte Auth ne doit avoir été créé au passage.
    const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 })
    expect(
      data?.users.some((u) => u.email?.toLowerCase() === email),
      'Un compte Auth orphelin a été créé malgré le refus'
    ).toBe(false)
  })
})
