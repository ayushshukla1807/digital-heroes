import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { SiteFooter } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Digital Heroes | Play. Track. Impact.',
  description: 'Launch your golf game into orbit. Score tracking, monthly prize draws, and automated charity impact — built on the Digital Heroes platform.',
  keywords: 'golf score tracking, prize draw, charity, subscription, Stableford, Digital Heroes',
  authors: [{ name: 'Ayush Shukla' }],
  openGraph: {
    title: 'Digital Heroes — Launching Your Game Into Orbit',
    description: 'Monthly prize draws, Stableford score tracking, PayPal subscriptions — now with automated charity impact.',
    url: 'https://digital-heroes-topaz.vercel.app',
    siteName: 'Digital Heroes',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="antialiased min-h-screen flex flex-col bg-background text-text">
        <div className="flex-1">
          {children}
        </div>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  )
}
