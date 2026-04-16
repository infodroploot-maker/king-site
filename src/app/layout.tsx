import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Autofficina King | Riparazioni Multimarca',
  description: 'Prenota il tuo appuntamento in officina: cambio gomme, carrozzeria, elettrauto, tagliando e molto altro.',
  keywords: 'autofficina, meccanico, cambio gomme, carrozzeria, elettrauto, revisione, tagliando',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
