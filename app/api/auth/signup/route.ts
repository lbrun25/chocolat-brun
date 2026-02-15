import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      )
    }

    // Vérifier si un profil invité existe déjà avec cet email
    const { data: existingGuest } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .eq('is_guest', true)
      .maybeSingle()

    // Vérifier si un compte (non-invité) existe déjà avec cet email
    const { data: existingAccount } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .eq('is_guest', false)
      .maybeSingle()

    if (existingAccount) {
      return NextResponse.json(
        { error: 'Un compte existe déjà avec cet email. Connectez-vous pour accéder à votre compte.' },
        { status: 409 }
      )
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    if (data.user) {
      if (existingGuest) {
        // Convertir le profil invité en compte standard
        await supabase
          .from('profiles')
          .update({
            user_id: data.user.id,
            is_guest: false,
            first_name: firstName || existingGuest.first_name,
            last_name: lastName || existingGuest.last_name,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingGuest.id)

        // Mettre à jour les commandes pour pointer vers le nouveau profil
        await supabase
          .from('orders')
          .update({ user_id: existingGuest.id })
          .eq('email', email)
          .is('user_id', null)
      } else {
        // Créer un nouveau profil
        const { error: insertError } = await supabase.from('profiles').insert({
          user_id: data.user.id,
          email: data.user.email!,
          first_name: firstName,
          last_name: lastName,
          is_guest: false,
        })

        if (insertError) {
          const isConflict =
            (insertError as { code?: string }).code === '23505' ||
            (insertError.message || '').toLowerCase().includes('duplicate') ||
            (insertError.message || '').toLowerCase().includes('conflict')
          if (isConflict) {
            return NextResponse.json(
              { error: 'Un compte existe déjà avec cet email. Connectez-vous pour accéder à votre compte.' },
              { status: 409 }
            )
          }
          throw insertError
        }
      }
    }

    return NextResponse.json({
      success: true,
      user: data.user,
      session: data.session,
    })
  } catch (error: any) {
    console.error('Erreur lors de l\'inscription:', error)
    return NextResponse.json(
      { error: error.message || 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
