"use client"

import { Hexagon, BarChart3, CreditCard, Heart, LayoutDashboard, LogOut, Settings, Shield, Target, Trophy, Eye } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/dashboard/checkout', icon: CreditCard, label: 'Subscription' },
  { href: '/dashboard#ledger', icon: Target, label: 'Ledger' },
  { href: '/dashboard#allocations', icon: Trophy, label: 'Allocations' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen relative z-10 bg-[var(--color-background)]">
      <aside className="w-72 hidden md:flex flex-col border-r border-[var(--color-border)] bg-[rgba(15,23,42,0.4)] backdrop-blur-2xl">
        <div className="h-[72px] flex items-center px-6 border-b border-[var(--color-border)]">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center">
              <Hexagon className="h-6 w-6 text-[var(--color-primary)] stroke-[1.5] group-hover:rotate-12 transition-transform duration-500 ease-out" />
            </div>
            <span className="font-display font-medium text-lg tracking-tight text-white">Digital Heroes</span>
          </Link>
        </div>

        <div className="mx-4 mt-6 p-4 rounded-xl bg-white/[0.02] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 flex items-center justify-center font-display font-medium text-sm">JD</div>
            <div>
              <p className="font-display font-medium text-white text-sm">John Doe</p>
              <p className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1 mt-1 font-medium"><Shield className="w-3 h-3 text-[var(--color-primary)]" /> Premium Tier</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold px-3 mb-4">Portfolio Management</p>
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href.split('#')[0] && (href.includes('#') ? false : true)
            return (
              <Link key={label} href={href} className={`sidebar-link ${isActive ? 'active' : ''}`}>
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}

          <div className="pt-8">
            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold px-3 mb-4">System</p>
            <Link href="/auditor" className="sidebar-link">
              <Eye className="w-4 h-4" />
              Auditor View
            </Link>
            <Link href="/admin" className="sidebar-link">
              <BarChart3 className="w-4 h-4" />
              Admin Terminal
            </Link>
            <Link href="/dashboard#overview" className="sidebar-link">
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <Link href="/charities" className="sidebar-link">
              <Heart className="w-4 h-4" />
              Impact Partners
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-[var(--color-border)]">
          <Link href="/login" className="sidebar-link hover:!bg-red-500/10 hover:!text-red-400 !text-[var(--color-text-muted)]">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-[72px] border-b border-[var(--color-border)] flex items-center justify-between px-6 md:px-8 bg-[rgba(2,6,23,0.5)] backdrop-blur-xl sticky top-0 z-20">
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_8px_var(--color-primary)]"></span>
              <p className="text-xs text-[var(--color-text-secondary)] font-medium">System Status: <span className="text-[var(--color-primary)]">Optimal</span></p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-display font-medium text-white leading-none">John Doe</p>
              <p className="text-[10px] text-[var(--color-text-muted)] mt-1 tracking-wider uppercase font-medium">Verified Identity</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center font-display text-white text-xs">JD</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto relative">
          <div className="p-6 md:p-8 max-w-7xl mx-auto pb-24">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
