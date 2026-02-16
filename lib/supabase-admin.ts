import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

/**
 * Client Supabase Admin — à utiliser uniquement côté serveur (API routes, etc.).
 * Utilise la clé service_role pour des opérations privilégiées (ex: generateLink).
 * Retourne null si la clé n'est pas configurée (ex: en production sans besoin d'admin).
 */
function createAdminClient(): SupabaseClient | null {
  if (!supabaseUrl || !serviceRoleKey) return null
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export const supabaseAdmin = createAdminClient()
