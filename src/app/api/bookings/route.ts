import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const required = ['nome', 'cognome', 'telefono', 'servizio', 'marca', 'modello', 'anno', 'targa']
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === '') {
        return NextResponse.json({ success: false, error: { message: `Il campo "${field}" è obbligatorio` } }, { status: 400 })
      }
    }

    const targaClean = body.targa.trim().toUpperCase()
    // Validazione targa base (solo caratteri alfanumerici)
    if (!/^[A-Z0-9]+$/.test(targaClean)) {
      return NextResponse.json({ success: false, error: { message: 'La targa può contenere solo lettere e numeri' } }, { status: 400 })
    }

    const telefonoClean = body.telefono.trim().replace(/\s+/g, '')
    // Validazione telefono (almeno 8 cifre, opzionalmente con + all'inizio)
    if (!/^\+?[0-9]{8,15}$/.test(telefonoClean)) {
      return NextResponse.json({ success: false, error: { message: 'Formato telefono non valido' } }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert({
        nome: body.nome.trim(), cognome: body.cognome.trim(), telefono: telefonoClean,
        servizio: body.servizio, marca: body.marca.trim(), modello: body.modello.trim(),
        anno: body.anno.trim(), targa: targaClean, status: 'nuova_richiesta',
      })
      .select().single()

    if (error) {
      console.error('DB Error:', error)
      return NextResponse.json({ success: false, error: { message: 'Errore nel salvataggio' } }, { status: 500 })
    }

    // Email notifica al meccanico
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'Autofficina King <onboarding@resend.dev>',
          to: process.env.ADMIN_EMAIL || 'info.droploot@gmail.com',
          subject: `🔧 Nuova richiesta: ${body.nome} ${body.cognome} — ${body.servizio.replace(/_/g, ' ')}`,
          html: `<div style="font-family:sans-serif;max-width:500px;margin:0 auto"><h2 style="color:#C2410C">Nuova Richiesta</h2><table style="width:100%;border-collapse:collapse"><tr><td style="padding:8px 0;color:#666">Cliente</td><td style="font-weight:600">${body.nome} ${body.cognome}</td></tr><tr><td style="padding:8px 0;color:#666">Telefono</td><td style="font-weight:600">${body.telefono}</td></tr><tr><td style="padding:8px 0;color:#666">Servizio</td><td style="font-weight:600">${body.servizio.replace(/_/g, ' ')}</td></tr><tr><td style="padding:8px 0;color:#666">Veicolo</td><td style="font-weight:600">${body.marca} ${body.modello} (${body.anno})</td></tr><tr><td style="padding:8px 0;color:#666">Targa</td><td style="font-weight:600">${body.targa.toUpperCase()}</td></tr></table></div>`,
        })
      } catch (e) { console.error('Email error:', e) }
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: { message: 'Errore interno' } }, { status: 500 })
  }
}
