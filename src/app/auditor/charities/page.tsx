"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock, Globe, Heart } from "lucide-react"
import { MOCK_CHARITY_LEDGER, MOCK_CHARITIES } from "@/lib/mock-data"

export default function AuditorCharitiesPage() {
  const totalDeployed = MOCK_CHARITY_LEDGER
    .filter(r => r.status === "transferred")
    .reduce((s, r) => s + r.amount, 0)

  const totalPending = MOCK_CHARITY_LEDGER
    .filter(r => r.status === "pending")
    .reduce((s, r) => s + r.amount, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-medium text-white tracking-tight">Charity Ledger</h1>
        <p className="text-sm text-[var(--color-text-secondary)] font-light mt-1">Complete trace of all ESG fund flows from subscriber allocations to verified organizations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Deployed", value: `₹${totalDeployed.toLocaleString()}`, color: "text-[var(--color-primary)]", bg: "bg-[var(--color-primary)]/10", border: "border-[var(--color-primary)]/20", icon: CheckCircle },
          { label: "Pending Transfer", value: `₹${totalPending.toLocaleString()}`, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: Clock },
          { label: "Partner Organizations", value: String(MOCK_CHARITIES.length), color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", icon: Heart },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="premium-card p-6 bg-white/[0.01] flex items-center gap-5">
            <div className={`w-12 h-12 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center shrink-0`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className={`text-2xl font-display font-semibold ${s.color}`}>{s.value}</p>
              <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold mt-0.5">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_CHARITIES.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.07 }} className="premium-card p-5 bg-white/[0.01]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/10">
                <Globe className="w-4 h-4" style={{ color: c.color }} />
              </div>
              <p className="text-xs font-semibold text-white leading-tight">{c.name}</p>
            </div>
            <p className="text-xl font-display font-semibold" style={{ color: c.color }}>{c.impact}</p>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-1 font-medium">{c.members.toLocaleString()} active donors</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="premium-card overflow-hidden bg-white/[0.01]">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h2 className="font-display font-medium text-white text-xl tracking-tight">Allocation Ledger</h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-1 font-medium">All rows represent individual monthly transfer batches.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.02]">
                {["Period", "Organization", "Subscribers", "Amount", "Status"].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider border-b border-[var(--color-border)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_CHARITY_LEDGER.map((row, i) => (
                <tr key={i} className="border-b border-[var(--color-border)] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-semibold text-white">{row.month}</td>
                  <td className="px-6 py-4 text-[var(--color-text-secondary)] font-medium">{row.charity}</td>
                  <td className="px-6 py-4 text-[var(--color-text-secondary)]">{row.subscribers.toLocaleString()}</td>
                  <td className="px-6 py-4 font-display font-semibold text-pink-400">₹{row.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {row.status === "transferred" ? (
                      <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--color-primary)]">
                        <CheckCircle className="w-3.5 h-3.5" /> Transferred
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[10px] font-semibold text-amber-400">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
