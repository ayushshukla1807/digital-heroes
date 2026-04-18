import { Activity, ShieldHalf, Users, PlaySquare, Heart, Trophy, LogOut, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--color-border)] bg-[rgba(10,15,26,0.9)] flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-[var(--color-border)] gap-2">
          <ShieldHalf className="text-pink-500 h-6 w-6" />
          <span className="font-bold text-lg tracking-tight">Admin Portal</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* Main navigation is handled within the page for the prototype, but these mock routing for UI completeness */}
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium">
            <BarChart3 className="h-4 w-4" />
            Overview
          </Link>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors cursor-pointer">
            <PlaySquare className="h-4 w-4" />
            Draw Engine
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors cursor-pointer">
            <Users className="h-4 w-4" />
            Users
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors cursor-pointer">
            <Heart className="h-4 w-4" />
            Charities
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors cursor-pointer">
            <Trophy className="h-4 w-4" />
            Winners
          </div>
        </nav>
        
        <div className="p-4 border-t border-[var(--color-border)]">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors mb-2">
            <Activity className="h-4 w-4" />
            Public Site
          </Link>
          <Link href="/login" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-red-500/10 hover:text-red-500 transition-colors">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[rgba(255,255,255,0.01)]">
        <div className="md:hidden h-16 border-b border-[var(--color-border)] flex items-center px-4 bg-[rgba(10,15,26,0.9)] gap-2">
          <ShieldHalf className="text-pink-500 h-6 w-6" />
          <span className="font-bold text-lg tracking-tight">Admin Portal</span>
        </div>
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
