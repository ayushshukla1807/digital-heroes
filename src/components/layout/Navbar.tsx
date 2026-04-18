"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="sticky top-[32px] z-40 w-full border-b border-[var(--color-border)] bg-[rgba(10,10,15,0.85)] backdrop-blur-2xl">
      <div className="container mx-auto flex h-[68px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          {/* DH Brand Mark — cyan hex matching digitalheroes.co.in */}
          <div className="relative flex items-center justify-center w-9 h-9">
            <svg viewBox="0 0 36 36" fill="none" className="w-9 h-9 group-hover:scale-110 transition-transform duration-300">
              <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" stroke="#06b6d4" strokeWidth="1.5" fill="rgba(6,182,212,0.08)" />
              <polygon points="18,8 28,13 28,23 18,28 8,23 8,13" stroke="#06b6d4" strokeWidth="0.75" fill="rgba(6,182,212,0.05)" />
              <circle cx="18" cy="18" r="3" fill="#06b6d4" />
            </svg>
            <div className="absolute inset-0 bg-[#06b6d4]/20 blur-lg rounded-full group-hover:bg-[#06b6d4]/40 transition-colors duration-500" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-semibold text-[17px] tracking-tight text-white">Digital Heroes</span>
            <span className="text-[9px] font-medium text-[#06b6d4] tracking-[0.2em] uppercase">Golf · Draws · Impact</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/charities" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">
            Impact Partners
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="/auditor" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">
            Transparency
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:inline-flex font-medium text-sm text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="font-semibold text-sm bg-[#06b6d4] hover:bg-[#0891b2] text-gray-900 shadow-[0_0_24px_rgba(6,182,212,0.25)] rounded-xl transition-all hover:scale-105 active:scale-95 px-5">
              Launch Your Game →
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
