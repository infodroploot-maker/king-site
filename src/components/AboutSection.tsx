import Image from 'next/image'

export default function AboutSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-primary-500/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative group">
            <div className="relative h-[420px] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&q=80"
                alt="Il team di Autofficina King al lavoro"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
            </div>
          </div>

          {/* Testo */}
          <div>
            <p className="text-xs font-bold text-primary-400 tracking-[0.2em] uppercase mb-3">Chi Siamo</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-6">
              La passione per le auto è nel{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-400">
                nostro DNA
              </span>
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Da oltre 20 anni, <strong className="text-white">Autofficina King</strong> è il punto di riferimento
                per la manutenzione e riparazione di auto multimarca. Il nostro team di tecnici qualificati
                unisce esperienza artigianale e tecnologia diagnostica d&apos;avanguardia.
              </p>
              <p>
                Crediamo nella <strong className="text-white">trasparenza totale</strong>: ogni intervento viene
                documentato e comunicato al cliente in tempo reale. Nessuna sorpresa, nessun costo nascosto.
                Solo lavoro fatto bene.
              </p>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="glass p-4 text-center">
                <p className="text-2xl font-black text-white">500+</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Clienti Soddisfatti</p>
              </div>
              <div className="glass p-4 text-center">
                <p className="text-2xl font-black text-white">20+</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Anni di Esperienza</p>
              </div>
              <div className="glass p-4 text-center">
                <p className="text-2xl font-black text-white">4.9</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Rating Google</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
