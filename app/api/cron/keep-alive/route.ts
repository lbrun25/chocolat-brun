import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

/**
 * Appelé chaque jour par Vercel Cron (voir vercel.json).
 * Le plan gratuit Supabase met le projet en pause après ~7 jours sans requête
 * détectée : une vraie requête base de données quotidienne suffit à l'éviter
 * (un simple ping HTTP sur /auth/v1/health ne suffit pas toujours).
 */
export async function GET() {
  const { error } = await supabase.from('profiles').select('id').limit(1)

  if (error) {
    console.error('Cron keep-alive Supabase:', error.message)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() })
}
