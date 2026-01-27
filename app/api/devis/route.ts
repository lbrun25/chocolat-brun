import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Pour l'instant, on affiche simplement les données dans la console
    console.log('=== NOUVELLE DEMANDE DE DEVIS ===')
    console.log('Nom:', body.nom)
    console.log('Email:', body.email)
    console.log('Téléphone:', body.telephone)
    console.log('Goûts souhaités:', body.gouts)
    console.log('Quantité:', body.quantite)
    console.log('Message:', body.message)
    console.log('Date:', new Date().toISOString())
    console.log('================================')

    // Ici, vous pourrez ajouter plus tard :
    // - Envoi d'email (avec Resend, SendGrid, etc.)
    // - Sauvegarde en base de données
    // - Notification Slack/Discord
    // etc.

    return NextResponse.json(
      { success: true, message: 'Demande de devis reçue avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur lors du traitement de la demande de devis:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors du traitement de la demande' },
      { status: 500 }
    )
  }
}







