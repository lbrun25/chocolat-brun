import { test, expect } from '@playwright/test'
import type { SupabaseClient } from '@supabase/supabase-js'
import {
  adminClient,
  confirmerEmail,
  creerCompteSansProfil,
  emailTest,
  lienDeConfirmation,
  supprimerCompteTest,
} from './helpers/supabase'

/**
 * Connexion et confirmation d'email.
 *
 * Le lien de confirmation ramène toujours sur `site_url` (https://cedric-brun.com),
 * qui redirige en 307 vers `www`. Ce test n'a donc de sens que contre la prod :
 * en local le navigateur quitterait `localhost` dès l'ouverture du lien.
 */

const MOT_DE_PASSE = 'MotDePasseE2E!2026'
const cibleProd = (process.env.E2E_BASE_URL || '').includes('cedric-brun.com')

let admin: SupabaseClient
const comptesCrees = new Set<string>()

test.beforeAll(() => {
  admin = adminClient()
})

test.afterAll(async () => {
  for (const email of comptesCrees) await supprimerCompteTest(admin, email)
})

test.describe('Connexion', () => {
  test('le lien de confirmation ouvre une session sur le site', async ({ page }) => {
    test.skip(!cibleProd, 'le lien pointe sur site_url : à jouer avec E2E_BASE_URL=https://www.cedric-brun.com')

    const email = emailTest('confirm')
    comptesCrees.add(email)
    await creerCompteSansProfil(admin, email, MOT_DE_PASSE)

    const lien = await lienDeConfirmation(admin, email, MOT_DE_PASSE)
    await page.goto(lien)

    // L'apex redirige en 307 vers www ; le fragment #access_token survit au saut.
    await expect(page).toHaveURL(/www\.cedric-brun\.com\/#access_token=/)

    // supabase-js consomme le fragment de façon asynchrone : attendre le jeton
    // en localStorage, sans quoi la navigation suivante coupe le traitement.
    await expect
      .poll(() => page.evaluate(() => Object.keys(localStorage).some((k) => k.endsWith('-auth-token'))), {
        timeout: 20_000,
        message: 'Le jeton de session n’a jamais été enregistré',
      })
      .toBe(true)

    // Le bouton de déconnexion n'est rendu que lorsque `user` est présent.
    await page.goto('/espace-pro/connexion')
    await expect(
      page.getByRole('button', { name: /Se déconnecter/i }),
      'La session n’a pas été ouverte par le lien de confirmation'
    ).toBeVisible()
    await expect(page.getByLabel(/Mot de passe/)).toHaveCount(0)

    const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 })
    const compte = data?.users.find((u) => u.email?.toLowerCase() === email)
    expect(compte?.email_confirmed_at, 'Le lien n’a pas confirmé l’adresse email').toBeTruthy()
  })

  test('connexion avec mot de passe, puis déconnexion', async ({ page }) => {
    const email = emailTest('login')
    comptesCrees.add(email)
    await creerCompteSansProfil(admin, email, MOT_DE_PASSE)
    await confirmerEmail(admin, email)

    // Un compte sans profil est un cas normal : il ne doit rien écrire en
    // console (régression : `loadProfile` utilisait `single()`, qui remonte
    // PGRST116 « 0 rows » comme une erreur).
    const erreurs: string[] = []
    page.on('console', (m) => {
      if (m.type() === 'error') erreurs.push(m.text())
    })

    await page.goto('/espace-pro/connexion')
    await page.getByLabel(/^Email/).fill(email)
    await page.getByLabel(/Mot de passe/).fill(MOT_DE_PASSE)
    await page.getByRole('button', { name: /Se connecter/ }).click()

    await page.waitForURL(/\/poissons/, { timeout: 30_000 })

    // Un compte sans SIRET n'a pas accès aux tarifs.
    await page.goto('/espace-pro/connexion')
    await expect(page.getByText(/ne comporte pas de SIRET vérifié/i)).toBeVisible()

    // La connexion crée le profil manquant (cf. AuthContext.signIn).
    const { data: profil } = await admin
      .from('profiles')
      .select('email, is_guest')
      .eq('email', email)
      .maybeSingle()
    expect(profil, 'La connexion n’a pas créé le profil manquant').not.toBeNull()
    expect(profil!.is_guest).toBe(false)

    expect(
      erreurs.filter((e) => /Error loading profile|PGRST116/i.test(e)),
      'un compte sans profil ne doit pas produire d’erreur en console'
    ).toEqual([])

    await page.getByRole('button', { name: /Se déconnecter/i }).click()
    await expect(page.getByRole('button', { name: /^Se connecter$/ })).toBeVisible()
  })

  test('un mot de passe erroné est refusé', async ({ page }) => {
    const email = emailTest('mauvais-mdp')
    comptesCrees.add(email)
    await creerCompteSansProfil(admin, email, MOT_DE_PASSE)
    await confirmerEmail(admin, email)

    await page.goto('/espace-pro/connexion')
    await page.getByLabel(/^Email/).fill(email)
    await page.getByLabel(/Mot de passe/).fill('MauvaisMotDePasse!1')
    await page.getByRole('button', { name: /Se connecter/ }).click()

    await expect(page.locator('form p[role="alert"]')).toBeVisible()
    await expect(page).toHaveURL(/\/espace-pro\/connexion/)
  })

  test('un compte non confirmé ne peut pas se connecter', async ({ page }) => {
    const email = emailTest('non-confirme')
    comptesCrees.add(email)
    await creerCompteSansProfil(admin, email, MOT_DE_PASSE)

    await page.goto('/espace-pro/connexion')
    await page.getByLabel(/^Email/).fill(email)
    await page.getByLabel(/Mot de passe/).fill(MOT_DE_PASSE)
    await page.getByRole('button', { name: /Se connecter/ }).click()

    await expect(page.locator('form p[role="alert"]')).toBeVisible()
    await expect(page).toHaveURL(/\/espace-pro\/connexion/)
  })
})
