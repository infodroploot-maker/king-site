// FORCE_DEPLOY_VERIFICATION_V2
import { createServerClient } from '@supabase/ssr' // Vercel Fix


import { NextResponse, type NextRequest } from 'next/server'
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll() { return request.cookies.getAll() },
      setAll(cookiesToSet: any[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
      },
    },
  })
  // Ricarichiamo l'utente per assicurarci di avere lo stato più fresco
  const { data: { user } } = await supabase.auth.getUser()

  // PROTEZIONE ANTI-LOOP: 
  // Se siamo nel callback, non interferiamo con i redirect (lasciamo fare all'API route)
  if (request.nextUrl.pathname.startsWith('/auth/callback')) {
    return supabaseResponse
  }

  // Se siamo in dashboard e NON c'è l'utente, mandiamo al login
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('reason', 'no_session')
    return NextResponse.redirect(url)
  }
  
  // Se siamo in login e C'È l'utente, mandiamo in dashboard
  if (request.nextUrl.pathname.startsWith('/auth/login') && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }
  return supabaseResponse
}
