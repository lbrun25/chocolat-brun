import { NextRequest, NextResponse } from 'next/server'
import { sendDemandeCommandeEmail } from '@/lib/demande-commande-email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const nom = typeof body.nom === 'string' ? body.nom.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const telephone = typeof body.telephone === 'string' ? body.telephone.trim() : ''
    const gouts = Array.isArray(body.gouts) ? body.gouts.filter((g: unknown) => typeof g === 'string') : []
    const quantite = typeof body.quantite === 'string' ? body.quantite.trim() : String(body.quantite ?? '')
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!nom || !email || !telephone) {
      return NextResponse.json(
        { success: false, message: 'Nom, email et téléphone sont requis.' },
        { status: 400 }
      )
    }

    const { ok, error } = await sendDemandeCommandeEmail({
      nom,
      email,
      telephone,
      gouts,
      quantite,
      message,
    })

    if (!ok) {
      return NextResponse.json(
        { success: false, message: error || 'Erreur lors de l\'envoi de la demande.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Demande de commande envoyée avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur lors du traitement de la demande de commande:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors du traitement de la demande' },
      { status: 500 }
    )
  }
}







