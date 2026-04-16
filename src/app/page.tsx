'use client'

import { useState } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import BookingWidget from '@/components/BookingWidget'
import ServicesGrid from '@/components/ServicesGrid'
import AboutSection from '@/components/AboutSection'
import QualityBanner from '@/components/QualityBanner'
import ReviewsSection from '@/components/ReviewsSection'
import Footer from '@/components/Footer'
import { type ServiceType } from '@/lib/types'

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null)

  function handleSelectService(service: ServiceType) {
    setSelectedService(service)
    // Forza re-render del widget con il nuovo servizio dopo un tick
    setTimeout(() => {
      document.getElementById('prenota')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  return (
    <>
      <Header />

      {/* Sfondo globale in altissima qualità con Next/Image. Fixed copre tutto il sito */}
      <div className="fixed inset-0 -z-50 bg-gray-950 overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Hero Background"
          fill
          unoptimized
          quality={100}
          priority
          className="object-cover object-center"
        />
      </div>

      {/* ═══ HERO CON PARALLAX ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Sottilissimo overlay SOLO nel hero per leggibilità minima (senza rovinare qualità) */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Sfumatura di connessione con le sezioni successive (rimessa come richiesto) */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-950/75 to-transparent pointer-events-none" />


        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-20 md:pt-24 pb-8 md:pb-12">
          <div className="grid lg:grid-cols-2 gap-4 md:gap-8 items-center">
            {/* Widget Prenotazione */}
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <BookingWidget preselectedService={selectedService} />
            </div>

            {/* Testo Hero */}
            <div className="text-center lg:text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 glass px-4 py-1.5 mb-6 text-[10px] md:text-xs">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-300 font-medium">Riparazioni Multimarca</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-4">
                La tua auto{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-400">
                  merita il meglio
                </span>
              </h1>

              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-6">
                Prenota il tuo appuntamento in pochi secondi. Cambio gomme, carrozzeria,
                elettrauto e molto altro.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Preventivi trasparenti
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Tracking in tempo reale
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-float">
          <span className="text-[10px] text-gray-600 uppercase tracking-widest">Scorri</span>
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Sfondo bluastro semi-opaco solo per le sezioni per far intravedere l'immagine sotto, come da tua richiesta */}
      <div className="bg-gray-950/95 transition-colors w-full min-h-screen overflow-x-hidden">
        {/* ═══ SERVIZI ═══ */}
        <ServicesGrid onSelectService={handleSelectService} />

      {/* ═══ BANNER QUALITÀ ═══ */}
      <QualityBanner />

      {/* ═══ CHI SIAMO ═══ */}
      <AboutSection />

      {/* ═══ RECENSIONI ═══ */}
      <ReviewsSection />

        {/* ═══ FOOTER ═══ */}
        <Footer />
      </div>
    </>
  )
}
