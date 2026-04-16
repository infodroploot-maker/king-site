import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start mb-3">
              <Image 
                src="/logo.png" 
                alt="Autofficina King" 
                width={140} 
                height={140} 
                className="w-28 h-28 object-contain drop-shadow-[0_0_10px_rgba(251,146,60,0.3)]"
              />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Riparazioni multimarca. Professionalità, trasparenza e qualità dal 2005.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Orari</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>Lun — Ven: 8:30 – 18:30</li>
              <li>Sabato: 8:30 – 12:30</li>
              <li>Domenica: Chiuso</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Contatti</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <a href="tel:+390000000000" className="hover:text-white transition">000 000 0000</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:info@autofficinaking.com" className="hover:text-white transition">info@autofficinaking.com</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Via Roma 1, 00100 Città</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <span>© {new Date().getFullYear()} Autofficina King. Tutti i diritti riservati.</span>
          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="/termini" className="hover:text-white transition">Termini e Condizioni</Link>
            <Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
