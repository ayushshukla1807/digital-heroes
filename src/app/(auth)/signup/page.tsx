"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check, Hexagon, Loader2, Lock, Mail, User } from "lucide-react"
import Link from "next/link"

const CHARITIES = [
  { id: "1", name: "Global Water Initiative", color: "#10b981" },
  { id: "2", name: "Ocean Cleanup Foundation", color: "#f59e0b" },
  { id: "3", name: "Education For All", color: "#ec4899" },
  { id: "4", name: "Reforestation Trust", color: "#8b5cf6" },
]

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", charity_id: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      window.location.href = "/dashboard/checkout"
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 py-12 relative overflow-hidden bg-[var(--color-background)]">
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md relative z-10">
        <Link href="/" className="flex items-center gap-3 mb-10 justify-center">
          <Hexagon className="h-7 w-7 text-[var(--color-primary)] stroke-[1.5]" />
          <span className="font-display font-medium text-xl tracking-tight text-white">Digital Heroes</span>
        </Link>

        <div className="premium-card p-8 border-[var(--color-border)]">
          <div className="mb-8">
            <h1 className="text-2xl font-display font-medium text-white tracking-tight mb-1">Initialize Portfolio</h1>
            <p className="text-sm text-[var(--color-text-secondary)] font-light">Create your account and start competing.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <Input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="pl-11 h-12 bg-white/[0.03] border-[var(--color-border-strong)] text-white placeholder:text-[var(--color-text-muted)] rounded-xl focus-visible:border-[var(--color-primary)]/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <Input type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required className="pl-11 h-12 bg-white/[0.03] border-[var(--color-border-strong)] text-white placeholder:text-[var(--color-text-muted)] rounded-xl focus-visible:border-[var(--color-primary)]/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <Input type="password" name="password" placeholder="Min. 8 characters" value={formData.password} onChange={handleChange} required minLength={8} className="pl-11 h-12 bg-white/[0.03] border-[var(--color-border-strong)] text-white placeholder:text-[var(--color-text-muted)] rounded-xl focus-visible:border-[var(--color-primary)]/50" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Choose Your Impact Partner</label>
              <p className="text-[10px] text-[var(--color-text-muted)] font-medium">Min. 10% of your subscription is routed here automatically.</p>
              <div className="grid grid-cols-2 gap-2">
                {CHARITIES.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, charity_id: c.id }))}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                      formData.charity_id === c.id
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                        : "border-[var(--color-border)] bg-white/[0.01] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                      {formData.charity_id === c.id && <Check className="w-3 h-3 text-[var(--color-primary)]" />}
                    </div>
                    <p className="text-[11px] font-semibold text-white leading-tight">{c.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !formData.charity_id}
              className="w-full h-12 mt-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating Account...</>
              ) : (
                <>Continue to Subscription <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)] font-light">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--color-primary)] font-semibold hover:underline underline-offset-2">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
