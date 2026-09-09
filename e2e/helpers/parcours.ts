import { expect, type Page } from '@playwright/test'

/** Vrai quand la suite vise le site en ligne (Stripe y est en mode live). */
export const CIBLE_PROD = (process.env.E2E_BASE_URL || '').includes('cedric-brun.com')

export const MOT_DE_PASSE_TEST = 'MotDePasseE2E!2026'

/** Connexion par le formulaire de l'espace professionnel. */
export async function connecter(page: Page, email: string, motDePasse = MOT_DE_PASSE_TEST) {
  await page.goto('/espace-pro/connexion')
  await page.getByLabel(/^Email/).fill(email)
  await page.getByLabel(/Mot de passe/).fill(motDePasse)
  await page.getByRole('button', { name: /Se connecter/ }).click()
  await page.waitForURL(/\/poissons/, { timeout: 30_000 })
}

/**
 * Sème un panier avant que le moindre script de la page ne tourne.
 *
 * Écrire dans localStorage après `goto` ne marche pas : au montage, le contexte
 * panier relit le stockage puis y réécrit son état — il effacerait la valeur
 * semée. `addInitScript` s'exécute avant, et le drapeau en sessionStorage évite
 * de re-semer à chaque navigation suivante du même onglet.
 */
let compteurSemis = 0

async function semerPanier(page: Page, cle: string, valeur: unknown, url: string) {
  // Marqueur unique par appel : un même test peut ainsi re-semer un autre panier,
  // chaque script d'init ne s'appliquant qu'une fois.
  const marqueur = `e2e-seed-${cle}-${++compteurSemis}`
  await page.addInitScript(
    ([k, v, m]) => {
      if (!sessionStorage.getItem(m as string)) {
        localStorage.setItem(k as string, v as string)
        sessionStorage.setItem(m as string, '1')
      }
    },
    [cle, JSON.stringify(valeur), marqueur] as const
  )
  await page.goto(url)
}

/** Panier professionnel (cartons par référence). */
export async function remplirPanierPro(page: Page, cartons: Record<string, number>, url = '/poissons') {
  await semerPanier(page, 'chocolat-brun-panier-pro', cartons, url)
}

/** Panier Les Belles Comtoises (quantité par coffret). */
export async function remplirPanierComtoises(
  page: Page,
  quantites: Record<string, number>,
  url = '/panier-comtoises'
) {
  await semerPanier(page, 'chocolat-brun-panier-comtoises', quantites, url)
}

/** Vide les trois paniers, pour repartir d'un état connu. */
export async function viderPaniers(page: Page) {
  await page.evaluate(() => {
    localStorage.removeItem('chocolat-brun-panier-pro')
    localStorage.removeItem('chocolat-brun-cart')
    localStorage.removeItem('chocolat-brun-panier-comtoises')
  })
}

/**
 * Paie une session Stripe Checkout avec la carte de test 4242.
 * À n'appeler qu'en mode test — jamais contre la prod, qui est en clés live.
 *
 * Le tunnel Belles Comtoises fait collecter l'adresse de livraison par Stripe
 * (`shipping_address_collection`), contrairement au tunnel pro où elle est déjà
 * saisie sur le site. Les champs correspondants ne sont donc remplis que s'ils
 * sont présents.
 */
export async function payerAvecCarteDeTest(page: Page) {
  if (CIBLE_PROD) throw new Error('Refus de payer : la prod utilise des clés Stripe live.')
  await expect(page).toHaveURL(/checkout\.stripe\.com/, { timeout: 30_000 })

  await page.getByPlaceholder('1234 1234 1234 1234').fill('4242424242424242')
  await page.getByPlaceholder('MM / AA').fill('12 / 34')
  await page.getByPlaceholder('CVC').fill('123')

  // Ciblage par attribut `name`, stable chez Stripe, là où les placeholders sont
  // traduits (« Ligne d’adresse n°1 ») et changent.
  // Le tunnel pro demande le titulaire de la carte, celui des Comtoises le nom
  // de livraison : on renseigne celui qui est présent.
  for (const champ of ['billingName', 'shippingName']) {
    const input = page.locator(`input[name="${champ}"]`)
    if (await input.count()) await input.fill('Lucien Brun')
  }

  // L'adresse passe d'abord par une autocomplétion : on bascule en saisie manuelle.
  const saisieManuelle = page.getByText(/Saisir l['’]adresse manuellement/i)
  if (await saisieManuelle.count()) await saisieManuelle.first().click()

  const ligne1 = page.locator('input[name="shippingAddressLine1"]')
  if (await ligne1.count()) {
    await ligne1.fill('2 rue du Chalet')
    await page.locator('input[name="shippingPostalCode"]').fill('25140')
    await page.locator('input[name="shippingLocality"]').fill('Charquemont')
  }

  await page.getByTestId('hosted-payment-submit-button').click()
}
