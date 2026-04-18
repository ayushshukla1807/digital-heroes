import Link from "next/link"
import { Hexagon, Eye, BarChart3, FileText, Globe, LogOut } from "lucide-react"

const NAV_ITEMS = [
  { href: "/auditor", icon: BarChart3, label: "Revenue Overview" },
  { href: "/auditor/draws", icon: FileText, label: "Draw History" },
  { href: "/auditor/charities", icon: Globe, label: "Charity Ledger" },
]

export default function AuditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <aside className="w-72 hidden md:flex flex-col border-r border-[var(--color-border)] bg-[rgba(15,23,42,0.4)] backdrop-blur-2xl">
        <div className="h-[72px] flex items-center px-6 border-b border-[var(--color-border)]">
          <Link href="/" className="flex items-center gap-3 group">
            <Hexagon className="h-6 w-6 text-[var(--color-primary)] stroke-[1.5]" />
            <span className="font-display font-medium text-lg tracking-tight text-white">Digital Heroes</span>
          </Link>
        </div>

        <div className="mx-4 mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Eye className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="font-display font-medium text-white text-sm">Auditor Access</p>
              <p className="text-[10px] text-amber-400/80 uppercase tracking-wider font-semibold mt-0.5">Read-Only · Verified</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold px-3 mb-4">Transparency Portal</p>
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
            <Link key={label} href={href} className="sidebar-link">
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--color-border)]">
          <Link href="/login" className="sidebar-link hover:!bg-red-500/10 hover:!text-red-400 !text-[var(--color-text-muted)]">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-[72px] border-b border-[var(--color-border)] flex items-center justify-between px-8 bg-[rgba(2,6,23,0.5)] backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
            <p className="text-xs text-[var(--color-text-secondary)] font-medium">Read-Only Mode · <span className="text-amber-400">No write access</span></p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-display font-medium text-white leading-none">Auditor</p>
              <p className="text-[10px] text-[var(--color-text-muted)] mt-1 tracking-wider uppercase font-medium">Transparency Review</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Eye className="w-4 h-4 text-amber-400" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8 max-w-7xl mx-auto pb-24">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
