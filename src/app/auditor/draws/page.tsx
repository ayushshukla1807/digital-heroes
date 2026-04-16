"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, CheckCircle, Clock, FileText, Trophy, Users } from "lucide-react"
import { MOCK_DRAW_HISTORY } from "@/lib/mock-data"

export default function AuditorDrawsPage() {
  const [expanded, setExpanded] = useState<string | null>("DRW-2026-04")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-medium text-white tracking-tight">Draw History</h1>
        <p className="text-sm text-[var(--color-text-secondary)] font-light mt-1">Full immutable log of all prize pool distributions and winner settlements.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Draws Executed", value: String(MOCK_DRAW_HISTORY.length), icon: FileText },
          { label: "Total Winners Paid", value: "9", icon: Trophy },
          { label: "Peak Participants", value: "248", icon: Users },
        ].map((s, i) => (
          <div key={i} className="premium-card p-5 bg-white/[0.01] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
              <s.icon className="w-5 h-5 text-[var(--color-text-secondary)]" />
            </div>
            <div>
              <p className="text-2xl font-display font-semibold text-white">{s.value}</p>
              <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {MOCK_DRAW_HISTORY.map((draw, i) => (
          <motion.div
            key={draw.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="premium-card overflow-hidden bg-white/[0.01]"
          >
            <button
              onClick={() => setExpanded(expanded === draw.id ? null : draw.id)}
              className="w-full p-6 flex items-center justify-between text-left group hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-6">
                <div className="text-center min-w-[72px]">
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">Draw ID</p>
                  <p className="font-mono text-xs font-semibold text-white mt-1">{draw.id}</p>
                </div>
                <div className="w-px h-10 bg-[var(--color-border)]" />
                <div>
                  <p className="font-display font-medium text-white">{new Date(draw.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{draw.participants} participants · {draw.winners.length} winners</p>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <div>
                    <p className="text-[10px] text-[var(--color-text-muted)] font-semibold uppercase tracking-wider">Pool</p>
                    <p className="font-display font-semibold text-[var(--color-accent)] text-sm">₹{draw.totalPool.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--color-text-muted)] font-semibold uppercase tracking-wider">Charity</p>
                    <p className="font-display font-semibold text-pink-400 text-sm">₹{draw.charityAllocation.toLocaleString()}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                    {draw.status}
                  </span>
                </div>
              </div>
              {expanded === draw.id ? (
                <ChevronUp className="w-5 h-5 text-[var(--color-text-muted)] shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)] shrink-0" />
              )}
            </button>

            <AnimatePresence>
              {expanded === draw.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[var(--color-border)]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-white/[0.02]">
                          {["Rank", "Beneficiary", "Tier", "Yield", "Status", "Tx Reference"].map(h => (
                            <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {draw.winners.map(w => (
                          <tr key={w.rank} className="border-t border-[var(--color-border)] hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4">
                              <span className="w-6 h-6 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-bold text-[var(--color-text-secondary)] flex items-center justify-center">
                                {w.rank}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-semibold text-white">{w.name}</td>
                            <td className="px-6 py-4">
                              <span className="text-[10px] font-semibold text-[var(--color-primary)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 px-2 py-0.5 rounded">{w.tier}</span>
                            </td>
                            <td className="px-6 py-4 font-display font-semibold text-white">₹{w.amount.toLocaleString()}</td>
                            <td className="px-6 py-4">
                              {w.status === "paid" ? (
                                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--color-primary)]">
                                  <CheckCircle className="w-3.5 h-3.5" /> Settled
                                </span>
                              ) : (
                                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-amber-400">
                                  <Clock className="w-3.5 h-3.5" /> Pending
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 font-mono text-xs text-[var(--color-text-muted)]">{w.txRef}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}







// Draw history — read-only audit trail
