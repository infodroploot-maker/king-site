import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function TerminiPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto glass p-8 md:p-12 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-white mb-6">Termini e Condizioni</h1>
          <div className="prose prose-invert prose-amber max-w-none">
            <p className="text-gray-400">Ultimo aggiornamento: Aprile 2026</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Prenotazioni Online</h2>
            <p className="text-gray-400">
              Il sistema di prenotazione online di Autofficina King permette di richiedere un appuntamento e ricevere un preventivo indicativo. La prenotazione si ritiene confermata solo a seguito di accettazione da parte della nostra officina, visionabile dalla propria Area Clienti.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Preventivi e Costi</h2>
            <p className="text-gray-400">
              I prezzi mostrati sul sito online hanno valenza puramente indicativa e possono subire variazioni dopo la visione fisica del mezzo da parte di un nostro tecnico. Qualsiasi costo eccedente il preventivo iniziale sarà sempre comunicato prima di effettuare il lavoro.
            </p>

            <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Ritiro Veicoli</h2>
            <p className="text-gray-400">
              Il cliente si impegna a ritirare il veicolo non appena riceverà la notifica via email o via Area Clienti che attesta il completamento dei lavori (Stato: "Pronto al Ritiro").
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
