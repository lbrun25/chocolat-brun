import { NextRequest, NextResponse } from 'next/server'
import { sendDemandeCommandeEmail, type ObjetDemandeEmail } from '@/lib/demande-commande-email'

const OBJETS: ObjetDemandeEmail[] = ['echantillon', 'devis', 'commande']

function str(v: unknown, max = 500): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const nom = str(body.nom, 120)
    const email = str(body.email, 200)
    const telephone = str(body.telephone, 40)
    const quantite = typeof body.quantite === 'string' ? body.quantite.trim().slice(0, 120) : String(body.quantite ?? '').slice(0, 120)
    const message = str(body.message, 4000)
    const etablissement = str(body.etablissement, 160)
    const typeEtablissement = str(body.typeEtablissement, 80)
    const objetRaw = str(body.objet, 20)
    const objet = OBJETS.includes(objetRaw as ObjetDemandeEmail) ? (objetRaw as ObjetDemandeEmail) : undefined

    // « references » (landing) ou « gouts » (ancien formulaire /pro)
    const rawList: unknown = Array.isArray(body.references) ? body.references : body.gouts
    const gouts: string[] = Array.isArray(rawList)
      ? rawList.filter((g: unknown): g is string => typeof g === 'string').map((g) => g.trim().slice(0, 80)).slice(0, 20)
      : []

    // Honeypot anti-spam : champ caché qui doit rester vide
    if (str(body.website)) {
      return NextResponse.json({ success: true, message: 'OK' }, { status: 200 })
    }

    if (!nom || !email || !telephone) {
      return NextResponse.json(
        { success: false, message: 'Nom, email et téléphone sont requis.' },
        { status: 400 }
      )
    }
    if (!isEmail(email)) {
      return NextResponse.json({ success: false, message: 'Adresse email invalide.' }, { status: 400 })
    }

    const { ok, error } = await sendDemandeCommandeEmail({
      nom,
      email,
      telephone,
      gouts,
      quantite,
      message,
      objet,
      etablissement: etablissement || undefined,
      typeEtablissement: typeEtablissement || undefined,
    })

    if (!ok) {
      return NextResponse.json(
        { success: false, message: error || 'Erreur lors de l’envoi de la demande.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'Demande envoyée avec succès' }, { status: 200 })
  } catch (error) {
    console.error('Erreur lors du traitement de la demande:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors du traitement de la demande' },
      { status: 500 }
    )
  }
}
