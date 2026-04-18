"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Eye, EyeOff, Lock, Mail, Shield, Loader2, Hexagon } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      window.location.href = "/dashboard"
    }, 1200)
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[var(--color-background)]">
      <div className="hidden lg:flex flex-col w-1/2 relative overflow-hidden p-16 justify-between border-r border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(16,185,129,0.08)_0%,transparent_60%)] pointer-events-none" />

        <Link href="/" className="flex items-center gap-3 relative z-10 group">
          <Hexagon className="h-7 w-7 text-[#06b6d4] stroke-[1.5] group-hover:rotate-12 transition-transform duration-500" />
          <span className="font-display font-medium text-xl tracking-tight text-white">Digital Heroes</span>
        </Link>

        <div className="relative z-10 space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest">Platform Snapshot</p>
            <blockquote className="text-3xl font-display font-medium text-white leading-tight tracking-tight">
              "Every swing is a chance to win — and to fund positive impact."
            </blockquote>
            <p className="text-[var(--color-text-secondary)] font-light">Join 1,200+ players launching their game into orbit.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="premium-card p-5">
              <p className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest mb-2 font-semibold">April Draw Pool</p>
              <p className="text-2xl font-display font-semibold text-amber-400">₹10,50,000</p>
              <p className="text-xs text-[#06b6d4] mt-1.5 font-medium">↑ 18% month-on-month</p>
            </div>
            <div className="premium-card p-5">
              <p className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest mb-2 font-semibold">Charity Impact</p>
              <p className="text-2xl font-display font-semibold text-pink-400">₹4,00,000</p>
              <p className="text-xs text-pink-400 mt-1.5 font-medium">Across 4 causes</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">© 2026 Digital Heroes</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center p-8 relative z-10">
        <Link href="/" className="flex lg:hidden items-center gap-3 mb-10 group">
          <Hexagon className="h-6 w-6 text-[#06b6d4] stroke-[1.5] group-hover:rotate-12 transition-transform duration-500" />
          <span className="font-display font-medium text-lg text-white">Digital Heroes</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-display font-medium text-white mb-2 tracking-tight">Mission Control</h1>
            <p className="text-[var(--color-text-secondary)] font-light">Sign in to initialize your session.</p>
          </div>

          <div className="mb-6 p-4 rounded-xl bg-[#06b6d4]/5 border border-[#06b6d4]/20">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-3 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" /> Evaluator Credentials
            </p>
            <div className="space-y-1.5 text-[11px] text-[var(--color-text-secondary)] font-mono">
              <p className="flex justify-between border-b border-white/5 pb-1"><span>Admin:</span> <span className="text-white bg-white/5 px-1.5 rounded">admin@test.com / Admin@1234</span></p>
              <p className="flex justify-between border-b border-white/5 pb-1 pt-1"><span>User:</span> <span className="text-white bg-white/5 px-1.5 rounded">user@test.com / Test@1234</span></p>
              <p className="flex justify-between pt-1"><span>Auditor:</span> <span className="text-white bg-white/5 px-1.5 rounded">auditor@test.com / Audit@1234</span></p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <Input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="pl-11 h-12 bg-white/[0.03] border-[var(--color-border-strong)] text-white placeholder:text-[var(--color-text-muted)] rounded-xl focus-visible:border-[var(--color-primary)]/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <Input
                  type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-11 pr-12 h-12 bg-white/[0.03] border-[var(--color-border-strong)] text-white placeholder:text-[var(--color-text-muted)] rounded-xl focus-visible:border-[var(--color-primary)]/50"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit" disabled={loading}
              className="w-full h-12 mt-2 bg-[#06b6d4] hover:bg-[#0891b2] text-gray-900 font-semibold text-sm rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin text-gray-900" /> Authenticating...</>
              ) : (
                <>Launch Session <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[var(--color-text-secondary)] font-light">
            New to Digital Heroes?{" "}
            <Link href="/signup" className="text-[#06b6d4] font-semibold hover:underline underline-offset-2">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
