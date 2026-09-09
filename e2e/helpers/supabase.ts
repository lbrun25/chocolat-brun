import fs from 'node:fs'
import path from 'node:path'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Charge `.env.local` sans dépendance supplémentaire (Playwright ne le fait pas
 * comme Next.js). Les valeurs contenant des espaces ou des chevrons — EMAIL_FROM
 * par exemple — sont prises telles quelles.
 */
function loadEnvLocal(): void {
  const file = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(file)) return
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    if (process.env[key] !== undefined) continue
    process.env[key] = trimmed.slice(eq + 1).trim()
  }
}
loadEnvLocal()

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

/** Client administrateur : contourne la RLS, sert aux vérifications et au ménage. */
export function adminClient(): SupabaseClient {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont requis dans .env.local pour les tests E2E.'
    )
  }
  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/** Colonnes ajoutées par `supabase/migrations/20260828000000_add_siret_to_profiles.sql`. */
export const COLONNES_PRO = ['siret', 'raison_sociale', 'type_etablissement', 'siret_verified_at'] as const

/** Retourne la liste des colonnes pro absentes de `public.profiles`. */
export async function colonnesProManquantes(admin: SupabaseClient): Promise<string[]> {
  const manquantes: string[] = []
  for (const col of COLONNES_PRO) {
    const { error } = await admin.from('profiles').select(col).limit(1)
    // 42703 = undefined_column, PGRST204 = colonne absente du cache de schéma
    if (error && (error.code === '42703' || error.code === 'PGRST204')) manquantes.push(col)
  }
  return manquantes
}

/**
 * Supprime le compte de test et son profil. Ne touche qu'aux adresses générées
 * par les tests (`+e2e-` dans l'alias), jamais à un compte réel.
 */
export async function supprimerCompteTest(admin: SupabaseClient, email: string): Promise<void> {
  if (!email.includes('+e2e-')) throw new Error(`Refus de supprimer un email non-test : ${email}`)

  await admin.from('profiles').delete().eq('email', email)

  const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 })
  const user = data?.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
  if (user) await admin.auth.admin.deleteUser(user.id)
}

/**
 * Crée un compte Auth non confirmé et sans profil — l'état exact dans lequel le
 * bug des colonnes SIRET manquantes laissait les inscriptions. Passe par l'API
 * admin plutôt que par `signUp` : aucun email n'est envoyé, donc le rate limit
 * d'envoi ne bloque pas le parcours testé juste après. Retourne l'id du compte.
 */
export async function creerCompteSansProfil(
  admin: SupabaseClient,
  email: string,
  password: string
): Promise<string> {
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: false,
  })
  if (error || !data.user) throw new Error(`Création du compte orphelin impossible : ${error?.message}`)

  // Un trigger pourrait avoir créé un profil : on le retire pour reproduire l'état visé.
  await admin.from('profiles').delete().eq('user_id', data.user.id)
  return data.user.id
}

/**
 * Crée un compte de test complet (compte Auth + profil), pour placer la base
 * dans un état donné sans rejouer tout le parcours d'inscription. La contrainte
 * `profiles_user_id_check` impose un `user_id` réel sur un profil non-invité,
 * d'où la création du compte Auth en amont.
 */
export async function creerProfilTest(
  admin: SupabaseClient,
  profil: { email: string; siret?: string }
): Promise<void> {
  if (!profil.email.includes('+e2e-')) throw new Error(`Email non-test : ${profil.email}`)

  const userId = await creerCompteSansProfil(admin, profil.email, 'ProfilTestE2E!2026')
  const { error } = await admin.from('profiles').insert({
    user_id: userId,
    email: profil.email,
    is_guest: false,
    ...(profil.siret ? { siret: profil.siret, siret_verified_at: new Date().toISOString() } : {}),
  })
  if (error) throw new Error(`Insertion du profil de test impossible : ${error.message}`)
}

/** Marque l'email comme confirmé, pour pouvoir enchaîner sur la connexion. */
export async function confirmerEmail(admin: SupabaseClient, email: string): Promise<void> {
  const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 })
  const user = data?.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
  if (!user) throw new Error(`Utilisateur introuvable : ${email}`)
  const { error } = await admin.auth.admin.updateUserById(user.id, { email_confirm: true })
  if (error) throw new Error(`Confirmation email impossible : ${error.message}`)
}

/**
 * Compte professionnel prêt à l'emploi : compte Auth confirmé + profil au SIRET
 * vérifié. Court-circuite le formulaire d'inscription et l'appel INSEE, ce qui
 * permet d'utiliser un SIRET fictif — donc un compte par test, sans se heurter
 * à l'index unique sur `profiles.siret`.
 */
export async function creerComptePro(
  admin: SupabaseClient,
  email: string,
  password: string,
  options: { siret?: string; raisonSociale?: string } = {}
): Promise<string> {
  if (!email.includes('+e2e-')) throw new Error(`Email non-test : ${email}`)
  const siret = options.siret ?? String(Date.now()).padStart(14, '0').slice(-14)

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })
  if (error || !data.user) throw new Error(`Création du compte pro impossible : ${error?.message}`)

  await admin.from('profiles').delete().eq('user_id', data.user.id)
  const { error: profileError } = await admin.from('profiles').insert({
    user_id: data.user.id,
    email,
    first_name: 'Lucien',
    last_name: 'Brun',
    is_guest: false,
    siret,
    raison_sociale: options.raisonSociale ?? 'ETABLISSEMENT DE TEST',
    type_etablissement: 'Restaurant',
    siret_verified_at: new Date().toISOString(),
  })
  if (profileError) throw new Error(`Profil pro de test impossible : ${profileError.message}`)
  return data.user.id
}

/**
 * Lien de confirmation d'inscription, tel qu'il figure dans l'email envoyé par
 * Supabase — permet de tester le parcours réel sans accès à la boîte mail.
 */
export async function lienDeConfirmation(
  admin: SupabaseClient,
  email: string,
  password: string
): Promise<string> {
  const { data, error } = await admin.auth.admin.generateLink({ type: 'signup', email, password })
  const lien = data?.properties?.action_link
  if (error || !lien) throw new Error(`Lien de confirmation indisponible : ${error?.message}`)
  return lien
}

/** Alias jetable basé sur l'adresse du propriétaire (sous-adressage Gmail). */
export function emailTest(suffixe = ''): string {
  const jeton = `${Date.now().toString(36)}${suffixe ? `-${suffixe}` : ''}`
  return `lucien.brun.pro+e2e-${jeton}@gmail.com`
}
