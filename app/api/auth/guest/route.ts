import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

/**
 * Crée ou récupère un profil invité basé sur l'email
 * Utilisé lors du checkout en mode invité
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName, phone, company } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }

    // Vérifier si un profil existe déjà avec cet email
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()

    if (existingProfile) {
      // Mettre à jour les informations si nécessaire
      if (firstName || lastName || phone || company) {
        await supabase
          .from('profiles')
          .update({
            first_name: firstName || existingProfile.first_name,
            last_name: lastName || existingProfile.last_name,
            phone: phone || existingProfile.phone,
            company: company || existingProfile.company,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingProfile.id)
      }

      return NextResponse.json({
        success: true,
        profile: existingProfile,
        isNew: false,
      })
    }

    // Créer un nouveau profil invité (sans user_id)
    const { data: newProfile, error } = await supabase
      .from('profiles')
      .insert({
        email,
        first_name: firstName,
        last_name: lastName,
        phone,
        company,
        is_guest: true,
        user_id: null, // Les invités n'ont pas de user_id
      })
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la création du profil invité:', error)
      return NextResponse.json(
        { error: error.message || 'Erreur lors de la création du profil' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      profile: newProfile,
      isNew: true,
    })
  } catch (error: any) {
    console.error('Erreur lors de la création du profil invité:', error)
    return NextResponse.json(
      { error: error.message || 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
