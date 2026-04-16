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
  const { data: { user } } = await supabase.auth.getUser()
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin

  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/auth/login', baseUrl))
  }
  
  if (request.nextUrl.pathname.startsWith('/auth/login') && user) {
    return NextResponse.redirect(new URL('/dashboard', baseUrl))
  }
  return supabaseResponse
}
