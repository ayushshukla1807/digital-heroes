"use client"

import { Activity, ShieldHalf, Users, PlaySquare, Heart, Trophy, LogOut, BarChart3, Globe, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function AdminSidebar() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'overview'

  const NAV_ITEMS = [
    { id: 'overview', label: 'Overview', icon: BarChart3, href: '/admin?tab=overview' },
    { id: 'draw', label: 'Draw Engine', icon: PlaySquare, href: '/admin?tab=draw' },
    { id: 'charity', label: 'Charities', icon: Heart, href: '/admin?tab=charity' },
    { id: 'winners', label: 'Winners', icon: Trophy, href: '/admin?tab=winners' },
    { id: 'analytics', label: 'Analytics', icon: Activity, href: '/admin?tab=analytics' },
  ]

  return (
    <aside className="w-64 border-r border-[var(--color-border)] bg-[rgba(10,15,26,0.9)] flex flex-col hidden md:flex sticky top-0 h-screen">
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-border)] gap-2">
        <ShieldHalf className="text-pink-500 h-6 w-6" />
        <span className="font-bold text-lg tracking-tight">Admin Portal</span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest font-bold px-3 mb-4">Command Center</p>
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id
          return (
            <Link 
              key={item.id} 
              href={item.href} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                isActive 
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-[inset_0_0_12px_rgba(16,185,129,0.05)] border border-[var(--color-primary)]/10" 
                  : "text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              <item.icon className={`h-4 w-4 ${isActive ? "text-[var(--color-primary)]" : "text-inherit"}`} />
              {item.label}
            </Link>
          )
        })}
      </nav>
      
      <div className="p-4 border-t border-[var(--color-border)]">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors mb-2">
          <Globe className="h-4 w-4" />
          Public Site
        </Link>
        <Link href="/login" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-red-500/10 hover:text-red-500 transition-colors">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Link>
      </div>
    </aside>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Suspense fallback={<div className="w-64 border-r border-[var(--color-border)] bg-[rgba(10,15,26,0.9)]" />}>
        <AdminSidebar />
      </Suspense>

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

