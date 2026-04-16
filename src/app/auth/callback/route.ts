import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  
  // Usiamo NEXT_PUBLIC_APP_URL se definito, altrimenti l'origin della richiesta assicurandoci sia HTTPS
  let baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin
  if (baseUrl.includes('vercel.app')) baseUrl = baseUrl.replace('http://', 'https://')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(`${baseUrl}${next}`)
    }
  }

  // Se c'è un errore o manca il codice, torniamo al login con un parametro di errore
  return NextResponse.redirect(`${baseUrl}/auth/login?error=auth_failed`)
}
