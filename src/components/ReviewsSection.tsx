'use client'

import { useState } from 'react'

const reviews = [
  {
    name: 'Marco B.',
    avatar: 'MB',
    rating: 5,
    date: '2 settimane fa',
    text: 'Professionalità al top! Mi hanno cambiato le gomme in meno di un\'ora e il prezzo era esattamente quello concordato. Consiglio vivamente.',
    service: 'Cambio Gomme',
  },
  {
    name: 'Laura T.',
    avatar: 'LT',
    rating: 5,
    date: '1 mese fa',
    text: 'Ho portato la macchina per un problema elettrico che nessuno riusciva a risolvere. Qui l\'hanno diagnosticato subito. Ottimo servizio, personale cortese e super competente.',
    service: 'Elettrauto',
  },
  {
    name: 'Giuseppe R.',
    avatar: 'GR',
    rating: 5,
    date: '1 mese fa',
    text: 'Sono cliente da 3 anni e non li cambierei per nulla al mondo. Tagliando fatto con ricambi originali, tutto trasparente. Prezzi onesti e lavoro impeccabile.',
    service: 'Tagliando',
  },
  {
    name: 'Francesca D.',
    avatar: 'FD',
    rating: 4,
    date: '2 mesi fa',
    text: 'Carrozzeria perfetta, la macchina è tornata come nuova dopo un incidente. L\'unica nota: i tempi di consegna sono stati un po\' più lunghi del previsto, ma il risultato è eccellente.',
    service: 'Carrozzeria',
  },
  {
    name: 'Antonio P.',
    avatar: 'AP',
    rating: 5,
    date: '3 mesi fa',
    text: 'Revisione fatta in giornata, mi hanno anche segnalato un problema ai freni che non sapevo. Grazie alla loro onestà ho evitato un guasto serio. TOP!',
    service: 'Revisione',
  },
  {
    name: 'Valentina C.',
    avatar: 'VC',
    rating: 5,
    date: '3 mesi fa',
    text: 'Diagnosi rapidissima sulla centralina, hanno trovato subito il problema che in un altro meccanico non riuscivano a individuare da settimane. Precisi, puntuali e con prezzi giusti. Ormai porto qui tutta la famiglia.',
    service: 'Diagnosi Elettronica',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-4 h-4 ${i <= count ? 'text-amber-400' : 'text-gray-700'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section className="relative py-10 md:py-24 px-4">
      <div className="absolute top-1/2 left-0 w-[500px] h-[400px] bg-amber-500/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-primary-400 tracking-[0.2em] uppercase mb-3">Recensioni</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            I nostri clienti{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-primary-400">
              parlano
            </span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            {/* Google icon */}
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex items-center gap-2">
              <Stars count={5} />
              <span className="text-white font-bold">4.9</span>
              <span className="text-gray-500 text-sm">(47 recensioni)</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`glass p-5 transition-all duration-500 hover:bg-white/[0.08] animate-fade-in-up`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-amber-500 flex items-center justify-center text-white text-sm font-bold">
                  {r.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="text-[10px] text-gray-500">{r.date}</p>
                </div>
                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>

              <Stars count={r.rating} />

              <p className={`text-sm text-gray-400 leading-relaxed mt-3 ${expanded === i ? '' : 'line-clamp-3'}`}>
                {r.text}
              </p>
              {r.text.length > 120 && (
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="text-xs text-primary-400 mt-1 hover:underline"
                >
                  {expanded === i ? 'Meno' : 'Leggi tutto'}
                </button>
              )}

              <div className="mt-3">
                <span className="text-[10px] bg-white/[0.06] text-gray-400 px-2 py-0.5 rounded-full">{r.service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
