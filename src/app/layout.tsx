import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Digital Heroes — Play. Track. Impact.',
  description: 'A platform combining golf performance tracking and monthly charity prize draws.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="antialiased min-h-screen flex flex-col bg-background text-text">
        {children}
        <Toaster />
      </body>
    </html>
  )
}

