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


        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-28 md:pt-48 pb-20 md:pb-32 text-center">
          <div className="flex flex-col items-center">
            
            {/* 1. H1 (Monumentale) */}
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-4 md:mb-12 animate-fade-in-up">
              La tua auto{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-400">
                merita il meglio
              </span>
            </h1>

            {/* 2. Badge (Ora tra H1 e Widget) */}
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 mb-6 text-[10px] md:text-xs animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-300 font-medium">Riparazioni Multimarca</span>
            </div>

            {/* 3. Widget Prenotazione */}
            <div className="w-full max-w-lg mb-10 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <BookingWidget preselectedService={selectedService} />
            </div>

            {/* 4. H2 / Descrizione */}
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mb-12 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              Prenota il tuo appuntamento in pochi secondi. Cambio gomme, carrozzeria,
              elettrauto e molto altro.
            </p>

            {/* 5. Icons/Benefits */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
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

        {/* Scroll indicator - Centrato perfettamente */}
        <div className="absolute bottom-8 inset-x-0 mx-auto w-fit hidden md:flex flex-col items-center gap-2 animate-float">
          <span className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold">Scorri</span>
          <svg className="w-5 h-5 text-gray-600/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
