'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  // Scroll Lock: impedisce lo scroll del body quando il menu è aperto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-gray-950 border-b border-white/5 py-2 md:py-3 shadow-xl'
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center relative">
        
        {/* Placeholder sinistro per centrare il logo su mobile con flex-between */}
        <div className="w-8 md:hidden"></div>
 
        {/* Logo - Centrato su Mobile, a Sinistra su Desktop */}
        <Link href="/" className="flex items-center justify-center md:justify-start transition-all duration-300 transform scale-100 lg:origin-left">
          <Image 
            src="/logo.png" 
            alt="Autofficina King" 
            width={160} 
            height={160} 
            className={`object-contain drop-shadow-[0_0_15px_rgba(251,146,60,0.3)] transition-all duration-300 ${
              scrolled ? 'w-12 h-12 md:w-28 md:h-28' : 'w-16 h-16 md:w-36 md:h-36'
            }`}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#servizi" className="text-gray-400 hover:text-white transition-colors duration-300">Servizi</a>
          <a href="#prenota" className="text-gray-400 hover:text-white transition-colors duration-300">Prenota</a>
          <Link href={user ? "/dashboard" : "/auth/login"} className="btn-primary text-sm px-5 py-2.5">
            {user ? "Mia Dashboard" : "Area Clienti"}
          </Link>
        </nav>

        {/* Mobile: Hamburger Button */}
        <button 
          className="md:hidden text-white w-8 h-8 flex items-center justify-end"
          onClick={() => setMenuOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-gray-950 flex flex-col pt-6 px-4 animate-fade-in">
          <div className="flex justify-between items-center mb-12">
            <div className="w-8"></div>
            <Image 
              src="/logo.png" 
              alt="Autofficina King" 
              width={80} 
              height={80} 
              className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(251,146,60,0.3)]"
            />
            <button className="text-white w-8 h-8 flex items-center justify-end" onClick={() => setMenuOpen(false)}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex flex-col items-center gap-8 text-lg font-medium text-white">
            <a href="#servizi" onClick={() => setMenuOpen(false)} className="hover:text-primary-400 transition">Servizi</a>
            <a href="#prenota" onClick={() => setMenuOpen(false)} className="hover:text-primary-400 transition">Prenota</a>
            <Link href={user ? "/dashboard" : "/auth/login"} onClick={() => setMenuOpen(false)} className="btn-primary w-full text-center mt-4">
              {user ? "Mia Dashboard" : "Area Clienti"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
