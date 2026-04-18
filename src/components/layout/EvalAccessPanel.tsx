"use client"

import { useState } from "react"
import Link from "next/link"
import { X, ChevronRight, User, Shield, Search, ClipboardCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const ROLES = [
  {
    icon: User,
    label: "User",
    tag: "Standard",
    email: "user@test.com",
    password: "Test@1234",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20 hover:bg-emerald-400/15",
    dot: "bg-emerald-400",
    href: "/dashboard",
    description: "Dashboard, scores, checkout",
  },
  {
    icon: Shield,
    label: "Admin",
    tag: "Terminal",
    email: "admin@test.com",
    password: "Admin@1234",
    color: "text-[#06b6d4]",
    bg: "bg-[#06b6d4]/10 border-[#06b6d4]/20 hover:bg-[#06b6d4]/15",
    dot: "bg-[#06b6d4]",
    href: "/admin",
    description: "Draw engine, verifications, reports",
  },
  {
    icon: Search,
    label: "Auditor",
    tag: "Read-only",
    email: "auditor@test.com",
    password: "Audit@1234",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20 hover:bg-amber-400/15",
    dot: "bg-amber-400",
    href: "/auditor",
    description: "Revenue, draws, charity ledger",
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={handleCopy}
      className="ml-1 text-white/30 hover:text-white/70 transition-colors"
      title="Copy"
    >
      {copied ? (
        <ClipboardCheck className="w-3 h-3 text-emerald-400" />
      ) : (
        <ClipboardCheck className="w-3 h-3" />
      )}
    </button>
  )
}

export function EvalAccessPanel() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#06b6d4] text-gray-900 font-bold text-xs shadow-[0_0_24px_rgba(6,182,212,0.4)] hover:bg-[#0891b2] hover:scale-105 active:scale-95 transition-all uppercase tracking-wider"
      >
        <span className="w-2 h-2 rounded-full bg-gray-900 animate-pulse" />
        Evaluator Access
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed bottom-20 right-6 z-50 w-[340px] rounded-2xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <div>
                  <p className="text-sm font-display font-semibold text-white">Evaluator Quick Access</p>
                  <p className="text-[10px] text-white/30 font-medium mt-0.5">
                    Digital Heroes — Ayush Shukla · Intern Assessment
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-white/50" />
                </button>
              </div>

              {/* Roles */}
              <div className="p-4 space-y-3">
                {ROLES.map((role) => (
                  <div key={role.label} className={`rounded-xl border p-3.5 transition-colors ${role.bg}`}>
                    <div className="flex items-start justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center`}>
                          <role.icon className={`w-3.5 h-3.5 ${role.color}`} />
                        </div>
                        <div>
                          <p className={`text-[12px] font-bold ${role.color} leading-none`}>{role.label}</p>
                          <p className="text-[9px] text-white/30 font-medium uppercase tracking-wider mt-0.5">{role.tag}</p>
                        </div>
                      </div>
                      <Link
                        href={role.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-1 text-[10px] font-bold ${role.color} hover:opacity-80 transition-opacity`}
                      >
                        Open <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="space-y-1.5 text-[11px] font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 font-sans text-[10px]">Email</span>
                        <div className="flex items-center">
                          <span className="text-white/70">{role.email}</span>
                          <CopyButton text={role.email} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 font-sans text-[10px]">Password</span>
                        <div className="flex items-center">
                          <span className="text-white/70">{role.password}</span>
                          <CopyButton text={role.password} />
                        </div>
                      </div>
                    </div>
                    <p className="text-[9px] text-white/25 mt-2 font-medium">{role.description}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-white/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                  <span className="text-[10px] text-white/30 font-medium">All Systems Operational</span>
                </div>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="text-[10px] font-bold text-[#06b6d4] hover:underline"
                >
                  Go to Login →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
