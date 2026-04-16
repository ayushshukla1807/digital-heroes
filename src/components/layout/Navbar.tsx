"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Hexagon } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[rgba(2,6,23,0.8)] backdrop-blur-2xl">
      <div className="container mx-auto flex h-[72px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            <Hexagon className="h-8 w-8 text-[var(--color-primary)] stroke-[1.5] group-hover:rotate-12 transition-transform duration-500 ease-out" />
            <div className="absolute inset-0 bg-[var(--color-primary)]/20 blur-md rounded-full group-hover:bg-[var(--color-primary)]/40 transition-colors duration-500"></div>
          </div>
          <span className="font-display font-medium text-xl tracking-tight text-white">🏌️ Digital Heroes</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/charities" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">
            Impact Partners
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">
            Methodology
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:inline-flex font-medium text-sm text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button className="font-semibold text-sm bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white shadow-[0_0_24px_rgba(16,185,129,0.2)] rounded-xl transition-all hover:scale-105 active:scale-95">
              Initialize Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}



