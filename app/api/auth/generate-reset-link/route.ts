import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getBaseUrlFromRequest } from '@/lib/get-base-url'

if (!supabaseAdmin) {
  console.warn(
    'SUPABASE_SERVICE_ROLE_KEY manquant — la route /api/auth/generate-reset-link ne fonctionnera pas. ' +
    'Ajoutez-la dans .env.local pour le mode développement.'
  )
}

/**
 * Génère un lien de réinitialisation de mot de passe et le renvoie pour affichage sur la page.
 * Quand SUPABASE_SERVICE_ROLE_KEY est configurée, le lien est retourné et affiché comme bouton
 * cliquable, ce qui évite les problèmes de lien non cliquable dans l'email (spam, template, etc.).
 */
export async function POST(request: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY non configurée. Ajoutez-la dans .env.local.' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }

    const baseUrl =
      typeof request.nextUrl.origin === 'string' && request.nextUrl.origin
        ? request.nextUrl.origin
        : getBaseUrlFromRequest(request)
    const redirectTo = `${baseUrl}/compte/reinitialiser-mot-de-passe`

    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: email.trim(),
      options: { redirectTo },
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    const link = data?.properties?.action_link
    if (!link) {
      return NextResponse.json(
        { error: 'Impossible de générer le lien' },
        { status: 500 }
      )
    }

    return NextResponse.json({ link })
  } catch (err) {
    console.error('[generate-reset-link]', err)
    return NextResponse.json(
      { error: 'Erreur lors de la génération du lien' },
      { status: 500 }
    )
  }
}
