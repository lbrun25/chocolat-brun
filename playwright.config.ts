import { defineConfig, devices } from '@playwright/test'

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3000'

/**
 * Tests end-to-end.
 *
 * Par défaut ils tournent sur le serveur de dev local, qui pointe sur la base
 * Supabase de production : les comptes créés sont donc réels et sont supprimés
 * en fin de test. Pour viser le site en ligne :
 *   E2E_BASE_URL=https://www.cedric-brun.com npx playwright test
 */
export default defineConfig({
  testDir: './e2e',
  // Sérialisé : les tests partagent un même SIRET, protégé par un index unique.
  workers: 1,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list']],
  timeout: 90_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    locale: 'fr-FR',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
        timeout: 120_000,
      },
})
