import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets:  ['latin'],
  weight:   ['400', '500', '600', '700'],
  variable: '--font-sans',
})

const instrumentSerif = Instrument_Serif({
  subsets:  ['latin'],
  weight:   ['400'],
  style:    ['normal', 'italic'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title:       'Amaïa Mescco – Conceptrice-développeuse logiciel junior',
  description: 'Assistante ingénieur en alternance · Conception, développement, validation d applications · Préparation d un BAC+5 à partir de septembre 2026.',
}

/**
 * Root layout — wraps every page with the global Navbar and Footer.
 * Loads Instrument Sans and Instrument Serif via next/font and injects them as CSS variables.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
