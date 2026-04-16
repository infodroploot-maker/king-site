import { createClient } from '@/lib/supabase/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import BookingLinker from '@/components/BookingLinker'
import { SERVICE_LABELS, STATUS_CONFIG, type Booking, type BookingStatus } from '@/lib/types'
import { signOutAction } from '@/lib/actions/auth'

function StatusBadge({ status }: { status: BookingStatus }) {
  const c = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${c.bg} ${c.color}`}>
      {c.label}
    </span>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Usa service_role per bypassare RLS
  const admin = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  const { data: bookings } = await admin
    .from('bookings').select('*').eq('user_id', user.id)
    .neq('status', 'consegnato').order('created_at', { ascending: false })

  const active = (bookings || []) as Booking[]

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Collega prenotazione pendente */}
      <BookingLinker />

      {/* Header con navigazione verso il sito */}
      <header className="glass border-0 border-b border-white/[0.06] rounded-none px-4 py-3">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/logo.png" 
                alt="Autofficina King" 
                width={56} 
                height={56} 
                className="w-12 h-12 object-contain"
              />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-white">La Mia Area</h1>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-gray-400 hover:text-white transition hidden sm:block">Sito</Link>
            <Link href="/#servizi" className="text-xs text-gray-400 hover:text-white transition hidden sm:block">Servizi</Link>
            <Link href="/#prenota" className="text-xs text-primary-400 hover:text-primary-300 transition hidden sm:block">Prenota</Link>
            <form action={signOutAction}>
              <button className="text-sm text-gray-500 hover:text-red-400 transition">Esci</button>
            </form>
          </div>
        </div>
      </header>

      {/* Barra mobile */}
      <div className="sm:hidden flex justify-center gap-6 py-2 border-b border-white/[0.04] bg-gray-950/80">
        <Link href="/" className="text-xs text-gray-400 hover:text-white transition">Home</Link>
        <Link href="/#servizi" className="text-xs text-gray-400 hover:text-white transition">Servizi</Link>
        <Link href="/#prenota" className="text-xs text-primary-400 hover:text-primary-300 transition">Prenota</Link>
      </div>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {active.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Nessuna prenotazione attiva</h2>
            <p className="text-gray-500 mb-6">Hai bisogno di assistenza per la tua auto?</p>
            <Link href="/#prenota" className="btn-primary inline-block">Prenota un Servizio</Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Prenotazioni Attive ({active.length})
            </p>
            {active.map((b) => (
              <div key={b.id} className="glass-strong p-5 animate-fade-in-up">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-white">{b.marca} {b.modello}</h3>
                    <p className="text-sm text-gray-500">Targa: {b.targa} · {b.anno}</p>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Servizio</span>
                    <span className="text-white font-medium">{SERVICE_LABELS[b.servizio]}</span>
                  </div>
                  {b.data_appuntamento && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Appuntamento</span>
                      <span className="text-white font-medium">
                        {new Date(b.data_appuntamento).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}
                        {' ore '}
                        {String(new Date(b.data_appuntamento).getHours()).padStart(2, '0')}:{String(new Date(b.data_appuntamento).getMinutes()).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                  {b.preventivo_euro && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Preventivo</span>
                      <span className="text-primary-400 font-semibold">{b.preventivo_euro.toFixed(2)} EUR</span>
                    </div>
                  )}
                </div>
                {b.note_meccanico && (
                  <div className="mt-4 glass p-3 border-amber-500/20">
                    <p className="text-xs font-semibold text-amber-400 mb-1">Nota del meccanico</p>
                    <p className="text-sm text-gray-300">{b.note_meccanico}</p>
                  </div>
                )}

                {/* Contatti Officina */}
                <details className="mt-4 group">
                  <summary className="flex items-center gap-2 cursor-pointer text-xs text-primary-400 font-medium hover:text-primary-300 transition select-none">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contatta l&apos;officina
                  </summary>
                  <div className="mt-3 glass p-4 animate-fade-in space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Telefono:</span>
                      <a href="tel:+390000000000" className="text-primary-400 font-medium hover:underline">000 000 0000</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Email:</span>
                      <a href="mailto:info@autofficinaking.com" className="text-primary-400 font-medium hover:underline">info@autofficinaking.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Indirizzo:</span>
                      <span className="text-gray-300">Via Roma 1, 00100 Città</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Orari:</span>
                      <span className="text-gray-300">Lun-Ven 8:30–18:30 · Sab 8:30–12:30</span>
                    </div>
                  </div>
                </details>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
