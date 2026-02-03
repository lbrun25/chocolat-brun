import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }

      // Vérifier si le profil existe, sinon le créer ou convertir un invité
      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single()

        if (!profile) {
          // Vérifier si un profil invité existe avec cet email
          const { data: guestProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', email)
            .eq('is_guest', true)
            .single()

          if (guestProfile) {
            // Convertir le profil invité en compte standard
            await supabase
              .from('profiles')
              .update({
                user_id: data.user.id,
                is_guest: false,
                updated_at: new Date().toISOString(),
              })
              .eq('id', guestProfile.id)

            // Mettre à jour les commandes pour pointer vers le nouveau profil
            await supabase
              .from('orders')
              .update({ user_id: guestProfile.id })
              .eq('email', email)
              .is('user_id', null)
          } else {
            // Créer un nouveau profil
            await supabase.from('profiles').insert({
              user_id: data.user.id,
              email: data.user.email!,
              is_guest: false,
            })
          }
        }
      }

    return NextResponse.json({
      success: true,
      user: data.user,
      session: data.session,
    })
  } catch (error: any) {
    console.error('Erreur lors de la connexion:', error)
    return NextResponse.json(
      { error: error.message || 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
