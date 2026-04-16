import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function CookiesPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto glass p-8 md:p-12 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white mb-6">Cookie Policy</h1>
          <div className="prose prose-invert prose-amber max-w-none">
            <p className="text-gray-400">Ultimo aggiornamento: Aprile 2026</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Cosa sono i cookie?</h2>
            <p className="text-gray-400">
              I cookie sono piccoli file di testo che i siti visitati inviano al tuo dispositivo, dove vengono memorizzati per poi essere ritrasmessi agli stessi siti alla visita successiva.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Quali cookie utilizziamo</h2>
            <p className="text-gray-400">
              <strong>Cookie Tecnici:</strong> Essenziali per il corretto funzionamento del sito e per l'autenticazione all'Area Clienti.
            </p>
            <p className="text-gray-400 mt-2">
              <strong>Cookie Analitici:</strong> Utilizzati in forma anonima per comprendere come gli utenti navigano il nostro sito e migliorarne le prestazioni.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Gestione dei cookie</h2>
            <p className="text-gray-400">
              Puoi gestire le tue preferenze sui cookie direttamente dalle impostazioni del tuo browser. La disabilitazione dei cookie tecnici potrebbe compromettere alcune funzionalità del sito come l'accesso all'area protetta.
            </p>

            <div className="mt-12 pt-8 border-t border-white/10">
              <Link href="/" className="text-primary-400 hover:text-primary-300 font-medium">
                &larr; Torna alla Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
