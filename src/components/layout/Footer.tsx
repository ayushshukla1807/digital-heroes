"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Trophy, Heart, Globe, ShieldCheck, Zap, Database, CreditCard, Code2 } from "lucide-react"

function Countdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })
  
  useEffect(() => {
    const target = new Date("2026-05-01T00:00:00+05:30")
    const tick = () => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")
  
  return (
    <div className="flex items-center gap-1 font-mono text-sm font-bold text-white tabular-nums">
      <span className="bg-white/10 rounded px-2 py-1">{pad(time.d)}<span className="text-[9px] text-white/50 ml-0.5 font-sans font-medium">D</span></span>
      <span className="text-white/30">:</span>
      <span className="bg-white/10 rounded px-2 py-1">{pad(time.h)}<span className="text-[9px] text-white/50 ml-0.5 font-sans font-medium">H</span></span>
      <span className="text-white/30">:</span>
      <span className="bg-white/10 rounded px-2 py-1">{pad(time.m)}<span className="text-[9px] text-white/50 ml-0.5 font-sans font-medium">M</span></span>
      <span className="text-white/30">:</span>
      <span className="bg-[#06b6d4]/20 border border-[#06b6d4]/30 rounded px-2 py-1 text-[#06b6d4]">{pad(time.s)}<span className="text-[9px] text-[#06b6d4]/60 ml-0.5 font-sans font-medium">S</span></span>
    </div>
  )
}

const STATUS = [
  { icon: CreditCard, label: "PayPal Sandbox", status: "Operational", color: "text-emerald-400", dot: "bg-emerald-400" },
  { icon: Database, label: "Supabase DB", status: "Operational", color: "text-emerald-400", dot: "bg-emerald-400" },
  { icon: Zap, label: "Draw Engine", status: "Armed", color: "text-amber-400", dot: "bg-amber-400" },
  { icon: ShieldCheck, label: "Auth Layer", status: "Secured", color: "text-[#06b6d4]", dot: "bg-[#06b6d4]" },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#0a0a0f] mt-auto">
      {/* Mission Control Bar */}
      <div className="border-b border-white/[0.04] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Countdown */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
              <span className="text-[10px] font-bold text-[#06b6d4] uppercase tracking-widest">Next Draw Countdown</span>
            </div>
            <Countdown />
            <span className="hidden sm:block text-[10px] text-white/30 font-medium">01 May 2026 · ₹10,50,000 Pool</span>
          </div>

          {/* System Status */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {STATUS.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${i < 2 ? "animate-pulse" : ""}`} />
                <span className="text-[10px] text-white/40 font-medium">{s.label}</span>
                <span className={`text-[10px] font-bold ${s.color}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8">
                <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" stroke="#06b6d4" strokeWidth="1.5" fill="rgba(6,182,212,0.08)" />
                <circle cx="18" cy="18" r="3" fill="#06b6d4" />
              </svg>
              <div>
                <p className="font-display font-semibold text-white text-[15px] leading-none">Digital Heroes</p>
                <p className="text-[9px] text-[#06b6d4] tracking-[0.2em] uppercase mt-0.5">Golf · Draws · Impact</p>
              </div>
            </div>
            <p className="text-xs text-white/40 font-light leading-relaxed">Play. Score. Win. Give. The platform engineered to launch your game into orbit.</p>
          </div>

          {/* Platform */}
          <div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Platform</p>
            <ul className="space-y-2.5">
              {[["Dashboard", "/dashboard"], ["Subscription", "/dashboard/checkout"], ["Charities", "/charities"], ["How It Works", "/how-it-works"]].map(([l, h]) => (
                <li key={l}><Link href={h} className="text-xs text-white/50 hover:text-white transition-colors font-medium">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Admin */}
          <div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Operations</p>
            <ul className="space-y-2.5">
              {[["Admin Terminal", "/admin"], ["Auditor Portal", "/auditor"], ["Draw History", "/auditor/draws"], ["Charity Ledger", "/auditor/charities"]].map(([l, h]) => (
                <li key={l}><Link href={h} className="text-xs text-white/50 hover:text-white transition-colors font-medium">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Built By */}
          <div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Assignment</p>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-white/30 font-medium uppercase tracking-wider">Built by</p>
                <p className="text-sm font-display font-semibold text-white mt-0.5">Ayush Shukla</p>
                <p className="text-[10px] text-[#06b6d4] font-medium">Full Stack Intern Candidate</p>
              </div>
              <div>
                <p className="text-[10px] text-white/30 font-medium uppercase tracking-wider">Stack</p>
                <p className="text-[11px] text-white/50 mt-0.5 leading-relaxed">Next.js 14 · Supabase · PayPal REST · Framer Motion</p>
              </div>
              <div>
                <p className="text-[10px] text-white/30 font-medium uppercase tracking-wider">Submitted</p>
                <p className="text-[11px] text-white/50 mt-0.5">18 April 2026 · 9:00 AM IST</p>
              </div>
              <a href="https://github.com/ayushshukla1807/digital-heroes" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-1 text-[11px] text-white/40 hover:text-white transition-colors font-medium">
                <Code2 className="w-3.5 h-3.5" /> View Source Code
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-white/20 font-medium">© 2026 Digital Heroes Club</span>
            <span className="text-white/10">·</span>
            <span className="text-[11px] text-white/20">Full Stack Intern Assessment — PRD v2.1</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">All Systems Operational</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-white/20 font-medium">
              <ShieldCheck className="w-3 h-3" /> SSL Secured
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
