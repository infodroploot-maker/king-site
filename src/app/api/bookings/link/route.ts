import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createAuthClient } from '@/lib/supabase/server'

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const authClient = await createAuthClient()
    const { data: { user } } = await authClient.auth.getUser()
    if (!user) return NextResponse.json({ success: false }, { status: 401 })

    const { booking_id, link_token } = await request.json()
    if (!booking_id || !link_token) return NextResponse.json({ success: false }, { status: 400 })

    // Collega la prenotazione all'utente (solo se non ha già un user_id E se il PIN coincide)
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .update({ user_id: user.id })
      .eq('id', booking_id)
      .eq('link_token', link_token)
      .is('user_id', null)
      .select()
      .single()

    if (error) return NextResponse.json({ success: false }, { status: 500 })
    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
