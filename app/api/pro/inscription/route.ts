import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { verifierSiret } from '@/lib/siret'

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

    // 1. Vérification du SIRET auprès de l'INSEE, appelée directement.
    //    Surtout pas via une requête HTTP vers notre propre API : l'URL serait
    //    construite depuis `x-forwarded-host`, que l'appelant contrôle — il
    //    pourrait la pointer vers un serveur répondant toujours « valide ».
    const siretResult = await verifierSiret(siret)
    if (!siretResult.valid) {
      return NextResponse.json(
        { error: siretResult.error || 'SIRET introuvable au répertoire Sirene.' },
        { status: siretResult.configManquante ? 503 : 400 }
      )
    }
    const raisonSociale: string = siretResult.raisonSociale || ''

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

    // 3. Le SIRET est-il déjà rattaché à un autre compte ? Un index unique le
    //    garantit en base ; le vérifier ici évite de créer un compte Auth qui
    //    resterait orphelin, et de renvoyer un message incompréhensible.
    const { data: siretDejaPris } = await supabase
      .from('profiles')
      .select('email')
      .eq('siret', siret)
      .maybeSingle()

    if (siretDejaPris) {
      return NextResponse.json(
        {
          error:
            'Ce SIRET est déjà rattaché à un compte. Connectez-vous avec l’adresse utilisée à l’inscription, ' +
            'ou appelez-nous au 03 81 44 07 36.',
        },
        { status: 409 }
      )
    }

    // 4. Création du compte
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: prenom, last_name: nom } },
    })
    if (error) {
      // Les erreurs d'infrastructure (base injoignable) ne doivent pas remonter
      // telles quelles à l'écran : « fetch failed » n'aide personne.
      console.error('Inscription pro — signUp:', error.message)
      const reseau = /fetch failed|network|ENOTFOUND|ECONN/i.test(error.message)
      return NextResponse.json(
        {
          error: reseau
            ? 'Le service de création de compte est momentanément indisponible. Réessayez plus tard ou appelez-nous au 03 81 44 07 36.'
            : error.message,
        },
        { status: reseau ? 503 : 400 }
      )
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

      const { error: profileError } = existingGuest
        ? await supabase
            .from('profiles')
            .update({ ...profilePayload, user_id: data.user.id })
            .eq('id', existingGuest.id)
        : await supabase.from('profiles').insert({ ...profilePayload, user_id: data.user.id })

      if (profileError) {
        // La colonne manquante (PGRST204 / 42703) signale une migration non
        // appliquée : le message doit être explicite dans les logs, sans quoi
        // l'incident ressemble à une panne générique côté client.
        console.error('Création profil pro:', profileError.code, profileError.message)
        const schemaIncomplet = profileError.code === 'PGRST204' || profileError.code === '42703'
        return NextResponse.json(
          {
            error: schemaIncomplet
              ? 'La création de comptes professionnels est momentanément indisponible. Appelez-nous au 03 81 44 07 36.'
              : 'Votre compte a bien été créé, mais son profil professionnel n’a pas pu être enregistré. ' +
                'Appelez-nous au 03 81 44 07 36 pour l’activer.',
          },
          { status: schemaIncomplet ? 503 : 500 }
        )
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
    return NextResponse.json(
      { error: 'Une erreur technique est survenue. Réessayez ou contactez-nous au 03 81 44 07 36.' },
      { status: 500 }
    )
  }
}
