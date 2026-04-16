'use client'

import Image from 'next/image'
import { SERVICE_LABELS, SERVICE_IMAGES, type ServiceType } from '@/lib/types'

interface ServicesGridProps {
  onSelectService: (service: ServiceType) => void
}

const serviceDescriptions: Record<ServiceType, string> = {
  cambio_gomme: 'Pneumatici estivi, invernali e 4 stagioni con equilibratura.',
  carrozzeria: 'Riparazione ammaccature, graffi e verniciatura completa.',
  elettrauto: 'Impianti elettrici, batteria, alternatore e centraline.',
  meccanica_generale: 'Freni, frizione, sospensioni e distribuzione.',
  tagliando: 'Tagliando completo con ricambi originali garantiti.',
  revisione: 'Revisione ministeriale obbligatoria e controlli.',
  diagnosi: 'Lettura centralina, cancellazione errori e verifica.',
  altro: 'Richiedi un servizio personalizzato per la tua auto.',
}

export default function ServicesGrid({ onSelectService }: ServicesGridProps) {
  const services = Object.entries(SERVICE_LABELS) as [ServiceType, string][]

  return (
    <section id="servizi" className="relative py-24 px-4">
      {/* Glow decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/[0.04] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-primary-400 tracking-[0.2em] uppercase mb-3">I Nostri Servizi</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Tutto per la tua <span className="text-primary-400">auto</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Clicca su un servizio per prenotare direttamente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(([key, label], i) => (
            <button
              key={key}
              onClick={() => onSelectService(key)}
              className="group glass overflow-hidden text-left transition-all duration-500 hover:border-primary-500/30 hover:bg-white/[0.08] animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Immagine */}
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={SERVICE_IMAGES[key]}
                  alt={label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent" />
              </div>

              {/* Contenuto */}
              <div className="p-4">
                <h3 className="font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">
                  {label}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {serviceDescriptions[key]}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-primary-500 font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Prenota ora
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
