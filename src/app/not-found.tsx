import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center">
        <div className="text-center animate-fade-in-up max-w-md">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
             <span className="text-4xl font-black text-red-500 text-shadow-glow">404</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Mmh... Sembra che ti sia perso</h1>
          <p className="text-gray-400 mb-8">
            La pagina che stai cercando non esiste o è stata rimossa dall'officina.
          </p>
          <Link href="/" className="btn-primary inline-flex">
            Torna alla Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
