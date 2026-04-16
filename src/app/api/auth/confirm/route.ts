import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
export async function GET(request: NextRequest) {
  try {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'
    
    if (!code) throw new Error('Codice di autenticazione mancante da Google')

    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) throw error

    // Se arriviamo qui, l'autenticazione è riuscita!
    return NextResponse.redirect(new URL(next, origin))

  } catch (err: any) {
    // Invece di un redirect fallimentare, mostriamo l'errore "nudo" per capire cosa succede
    return new Response(`ERRORE AUTH: ${err.message || 'Errore sconosciuto'}`, { status: 200 })
  }
}
