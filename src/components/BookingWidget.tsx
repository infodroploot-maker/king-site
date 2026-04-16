'use client'

import { useState, useEffect, useRef } from 'react'
import { SERVICE_LABELS, type ServiceType } from '@/lib/types'

type Step = 1 | 2 | 3
type FormState = 'idle' | 'loading' | 'success'

interface BookingWidgetProps {
  preselectedService?: ServiceType | null
}

export default function BookingWidget({ preselectedService }: BookingWidgetProps) {
  const [step, setStep] = useState<Step>(1)
  const [formState, setFormState] = useState<FormState>('idle')
  const widgetRef = useRef<HTMLDivElement>(null)

  // Dati step 1
  const [servizio, setServizio] = useState<ServiceType | ''>('')
  const [marca, setMarca] = useState('')
  const [modello, setModello] = useState('')
  const [anno, setAnno] = useState('')
  const [targa, setTarga] = useState('')

  // Dati step 2
  const [nome, setNome] = useState('')
  const [cognome, setCognome] = useState('')
  const [telefono, setTelefono] = useState('')

  // Errori
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  // Pre-selezione servizio da click esterno
  useEffect(() => {
    if (preselectedService) {
      setServizio(preselectedService)
      setStep(1)
      widgetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [preselectedService])

  function validateStep1() {
    const e: Record<string, boolean> = {}
    if (!servizio) e.servizio = true
    if (!marca.trim()) e.marca = true
    if (!modello.trim()) e.modello = true
    if (!anno.trim()) e.anno = true
    if (!targa.trim()) e.targa = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep2() {
    const e: Record<string, boolean> = {}
    if (!nome.trim()) e.nome = true
    if (!cognome.trim()) e.cognome = true
    if (!telefono.trim()) e.telefono = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function goToStep2() {
    if (validateStep1()) { setErrors({}); setStep(2) }
  }

  async function submitBooking() {
    if (!validateStep2()) return
    setFormState('loading')

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cognome, telefono, servizio, marca, modello, anno, targa: targa.toUpperCase() }),
      })
      if (!res.ok) throw new Error()
      const result = await res.json()
      if (result.data?.id) {
        localStorage.setItem('pending_booking_id', result.data.id)
        if (result.data.link_token) {
          localStorage.setItem('pending_booking_token', result.data.link_token)
        }
      }
      setStep(3)
      setFormState('success')
    } catch {
      setFormState('idle')
      alert('Errore durante l\'invio. Riprova tra qualche secondo.')
    }
  }

  const stepIndicator = (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
            step >= s ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-white/[0.06] text-gray-500'
          }`}>
            {step > s ? '✓' : s}
          </div>
          {s < 3 && <div className={`w-8 h-0.5 transition-all duration-500 ${step > s ? 'bg-primary-500' : 'bg-white/[0.08]'}`} />}
        </div>
      ))}
    </div>
  )

  return (
    <div ref={widgetRef} id="prenota" className="w-full max-w-lg mx-auto">
      <div className="bg-gray-950/70 backdrop-blur-md border border-white/[0.12] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-black/80">
        {stepIndicator}

        {/* STEP 1: Servizio + Veicolo */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold text-white text-center mb-2">Cosa ti serve?</h3>

            <div>
              <label className="label-glass">Servizio richiesto</label>
              <select
                value={servizio}
                onChange={(e) => setServizio(e.target.value as ServiceType)}
                className={`select-glass ${errors.servizio ? 'border-red-500/50' : ''}`}
              >
                <option value="">Seleziona un servizio...</option>
                {Object.entries(SERVICE_LABELS).map(([val, lab]) => (
                  <option key={val} value={val}>{lab}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-glass">Marca</label>
                <input value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="es: Fiat"
                  className={`input-glass ${errors.marca ? 'border-red-500/50' : ''}`} />
              </div>
              <div>
                <label className="label-glass">Modello</label>
                <input value={modello} onChange={(e) => setModello(e.target.value)} placeholder="es: Punto"
                  className={`input-glass ${errors.modello ? 'border-red-500/50' : ''}`} />
              </div>
              <div>
                <label className="label-glass">Anno</label>
                <input value={anno} onChange={(e) => setAnno(e.target.value)} placeholder="es: 2019" maxLength={4}
                  className={`input-glass ${errors.anno ? 'border-red-500/50' : ''}`} />
              </div>
              <div>
                <label className="label-glass">Targa</label>
                <input value={targa} onChange={(e) => setTarga(e.target.value)} placeholder="es: AB123CD"
                  maxLength={10} style={{ textTransform: 'uppercase' }}
                  className={`input-glass ${errors.targa ? 'border-red-500/50' : ''}`} />
              </div>
            </div>

            <button onClick={goToStep2} className="btn-primary w-full mt-2">
              Continua →
            </button>
          </div>
        )}

        {/* STEP 2: Dati personali */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold text-white text-center mb-2">I tuoi dati</h3>

            <div>
              <label className="label-glass">Nome</label>
              <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Mario"
                className={`input-glass ${errors.nome ? 'border-red-500/50' : ''}`} />
            </div>
            <div>
              <label className="label-glass">Cognome</label>
              <input value={cognome} onChange={(e) => setCognome(e.target.value)} placeholder="Rossi"
                className={`input-glass ${errors.cognome ? 'border-red-500/50' : ''}`} />
            </div>
            <div>
              <label className="label-glass">Telefono</label>
              <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="333 1234567" type="tel"
                className={`input-glass ${errors.telefono ? 'border-red-500/50' : ''}`} />
            </div>

            <div className="flex gap-3 mt-2">
              <button onClick={() => { setStep(1); setErrors({}) }} className="btn-ghost flex-1">
                ← Indietro
              </button>
              <button onClick={submitBooking} disabled={formState === 'loading'} className="btn-primary flex-1">
                {formState === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Invio...
                  </span>
                ) : 'Invia Richiesta'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Conferma + Registrazione opzionale */}
        {step === 3 && (
          <div className="text-center space-y-5 animate-fade-in py-4">
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">Richiesta Inviata!</h3>
              <p className="text-gray-400 text-sm">
                Grazie per la richiesta. Verrai ricontattato al più presto per confermare la prenotazione.
              </p>
            </div>

            <div className="glass p-4 text-left">
              <p className="text-sm text-gray-300 mb-3 font-medium">
                Vuoi seguire lo stato della tua auto in tempo reale?
              </p>
              <a href="/auth/login" className="btn-primary w-full block text-center text-sm py-3">
                Registrati con Google
              </a>
            </div>

            <button
              onClick={() => { setStep(1); setFormState('idle'); setServizio(''); setMarca(''); setModello(''); setAnno(''); setTarga(''); setNome(''); setCognome(''); setTelefono('') }}
              className="text-sm text-gray-500 hover:text-gray-300 transition"
            >
              Invia un&apos;altra richiesta
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
