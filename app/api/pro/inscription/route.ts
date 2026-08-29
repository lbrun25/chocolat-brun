import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getBaseUrlFromRequest } from '@/lib/get-base-url'

export const dynamic = 'force-dynamic'

function str(v: unknown, max = 200): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
}

/**
 * Création d'un compte professionnel.
 * Le SIRET est vérifié auprès du répertoire Sirene (INSEE) avant la création du compte :
 * seul un établissement existant et actif ouvre l'accès aux tarifs professionnels.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Honeypot anti-spam
    if (str(body.website)) {
      return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
    }

    const email = str(body.email, 200).toLowerCase()
    const password = typeof body.password === 'string' ? body.password : ''
    const siret = str(body.siret, 20).replace(/\D/g, '')
    const prenom = str(body.prenom, 80)
    const nom = str(body.nom, 80)
    const telephone = str(body.telephone, 40)
    const typeEtablissement = str(body.typeEtablissement, 80)

    if (!email || !password || !siret) {
      return NextResponse.json(
        { error: 'Email, mot de passe et SIRET sont requis.' },
        { status: 400 }
      )
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 8 caractères.' },
        { status: 400 }
      )
    }
    if (!/^\d{14}$/.test(siret)) {
      return NextResponse.json(
        { error: 'Le SIRET doit comporter exactement 14 chiffres.' },
        { status: 400 }
      )
    }

    // 1. Vérification du SIRET auprès de l'INSEE (réutilise la route existante)
    const baseUrl = getBaseUrlFromRequest(request)
    const siretRes = await fetch(`${baseUrl}/api/siret/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siret }),
    })
    const siretData = await siretRes.json()
    if (!siretRes.ok || !siretData.valid) {
      return NextResponse.json(
        { error: siretData.error || 'SIRET introuvable au répertoire Sirene.' },
        { status: siretRes.status === 503 ? 503 : 400 }
      )
    }
    const raisonSociale: string = siretData.raisonSociale || ''

    // 2. Un compte existe-t-il déjà ?
    const { data: existingAccount } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .eq('is_guest', false)
      .maybeSingle()

    if (existingAccount) {
      return NextResponse.json(
        { error: 'Un compte existe déjà avec cet email. Connectez-vous pour voir les tarifs.' },
        { status: 409 }
      )
    }

    // 3. Création du compte
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: prenom, last_name: nom } },
    })
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    const profilePayload = {
      email,
      first_name: prenom || null,
      last_name: nom || null,
      phone: telephone || null,
      company: raisonSociale || null,
      siret,
      raison_sociale: raisonSociale || null,
      type_etablissement: typeEtablissement || null,
      siret_verified_at: new Date().toISOString(),
      is_guest: false,
      updated_at: new Date().toISOString(),
    }

    if (data.user) {
      // Reprendre un éventuel profil invité créé lors d'une commande précédente
      const { data: existingGuest } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .eq('is_guest', true)
        .maybeSingle()

      if (existingGuest) {
        await supabase
          .from('profiles')
          .update({ ...profilePayload, user_id: data.user.id })
          .eq('id', existingGuest.id)
      } else {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({ ...profilePayload, user_id: data.user.id })
        if (insertError) {
          console.error('Création profil pro:', insertError)
          return NextResponse.json(
            { error: 'Compte créé, mais le profil n’a pas pu être enregistré. Contactez-nous.' },
            { status: 500 }
          )
        }
      }
    }

    return NextResponse.json({
      success: true,
      raisonSociale,
      requiresEmailConfirmation: !data.session,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Une erreur est survenue'
    console.error('Inscription pro:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
