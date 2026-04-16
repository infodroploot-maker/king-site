export default function QualityBanner() {
  const badges = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Garanzia su ogni lavoro',
      desc: 'Tutti i nostri interventi sono coperti da garanzia. Lavoriamo solo con ricambi di qualità certificata.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Tempi rapidi e certi',
      desc: 'Rispettiamo le scadenze. Ti comunichiamo i tempi e li manteniamo, perché il tuo tempo vale.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Preventivi trasparenti',
      desc: 'Nessun costo nascosto. Ricevi il preventivo prima dell\'intervento e decidi tu se procedere.',
    },
  ]

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-strong p-1 rounded-3xl">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
            {badges.map((b, i) => (
              <div key={i} className="p-8 text-center group">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 group-hover:bg-primary-500/20 transition-colors duration-300">
                  {b.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
