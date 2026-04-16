"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Users, DollarSign, CheckCircle, Activity, AlertCircle,
  Clock, ShieldCheck, RefreshCcw, Globe, Terminal, Heart,
  ChevronRight, BarChart3, Plus, Trash2, Edit, ImageIcon, X
} from "lucide-react"

const STATS = [
  { label: "Active Subscribers", value: "1,240", icon: Users, color: "emerald", trend: "+12.4%" },
  { label: "Portfolio Health", value: "98.2%", icon: CheckCircle, color: "emerald", trend: "+1.1%" },
  { label: "Gross Prize Pool", value: "₹10,50,000", icon: DollarSign, color: "amber", trend: "01 May" },
  { label: "Impact Allocation", value: "₹4,00,000", icon: Heart, color: "pink", trend: "Active" },
]

const PRIZE_TIERS = [
  { match: "5-Number Match", label: "Jackpot", pct: 40, color: "#f59e0b", rollover: true },
  { match: "4-Number Match", label: "Class A", pct: 35, color: "#10b981", rollover: false },
  { match: "3-Number Match", label: "Class B", pct: 25, color: "#ec4899", rollover: false },
]

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: "bg-[var(--color-primary)]/10", text: "text-[var(--color-primary)]", border: "border-[var(--color-primary)]/20" },
  amber: { bg: "bg-[var(--color-accent)]/10", text: "text-[var(--color-accent)]", border: "border-[var(--color-accent)]/20" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20" },
}

type VerifyAction = "approved" | "rejected" | "paid" | null

const INITIAL_WINNERS = [
  { id: 1, user: "Sarah Jenkins", drawDate: "01 Apr 2026", matchType: "5-Number Match", tier: "Jackpot", amount: 420000, proofRef: "PROOF-SCR-001" },
  { id: 2, user: "Marcus Wei", drawDate: "01 Apr 2026", matchType: "4-Number Match", tier: "Class A", amount: 368000, proofRef: "PROOF-SCR-002" },
  { id: 3, user: "Priya Patel", drawDate: "01 Apr 2026", matchType: "3-Number Match", tier: "Class B", amount: 262500, proofRef: "PROOF-SCR-003" },
]

const INITIAL_CHARITIES = [
  { id: 1, name: "Global Water Initiative", percent: 34, color: "#10b981", category: "Water & Sanitation" },
  { id: 2, name: "Ocean Cleanup Foundation", percent: 41, color: "#f59e0b", category: "Environment" },
  { id: 3, name: "Education For All", percent: 25, color: "#ec4899", category: "Education" },
]

const TABS = [
  { id: "overview", icon: Activity, label: "System Metrics" },
  { id: "draw", icon: RefreshCcw, label: "Draw Engine" },
  { id: "charity", icon: Globe, label: "Charity Manager" },
  { id: "winners", icon: ShieldCheck, label: "Winner Verification" },
  { id: "analytics", icon: BarChart3, label: "Reports & Analytics" },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [simulating, setSimulating] = useState(false)
  const [drawResults, setDrawResults] = useState<number[]>([])
  const [spinValues, setSpinValues] = useState<number[]>([0, 0, 0, 0, 0])
  const [drawMode, setDrawMode] = useState<"random" | "algorithmic">("random")
  const [jackpotRollover, setJackpotRollover] = useState(false)
  const [published, setPublished] = useState(false)
  const [winnerStatuses, setWinnerStatuses] = useState<Record<number, VerifyAction>>({ 1: null, 2: null, 3: null })
  const [charities, setCharities] = useState(INITIAL_CHARITIES)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newCharity, setNewCharity] = useState({ name: "", category: "" })
  const [showAddForm, setShowAddForm] = useState(false)

  const simulateDraw = () => {
    setSimulating(true)
    setDrawResults([])
    setPublished(false)

    const spinInterval = setInterval(() => {
      setSpinValues(Array(5).fill(0).map(() => Math.floor(Math.random() * 45) + 1))
    }, 50)

    let count = 0
    const sequence = setInterval(() => {
      count++
      setDrawResults(prev => [...prev, Math.floor(Math.random() * 45) + 1])
      if (count >= 5) {
        clearInterval(sequence)
        clearInterval(spinInterval)
        setSimulating(false)
        const hasJackpot = Math.random() > 0.7
        setJackpotRollover(!hasJackpot)
      }
    }, 800)
  }

  const handleVerify = (id: number, action: "approved" | "rejected") => {
    setWinnerStatuses(prev => ({ ...prev, [id]: action }))
  }

  const handleMarkPaid = (id: number) => {
    setWinnerStatuses(prev => ({ ...prev, [id]: "paid" }))
  }

  const removeCharity = (id: number) => setCharities(prev => prev.filter(c => c.id !== id))

  const addCharity = () => {
    if (!newCharity.name.trim()) return
    const colors = ["#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#3b82f6"]
    setCharities(prev => [...prev, {
      id: Date.now(),
      name: newCharity.name,
      category: newCharity.category || "General",
      percent: 0,
      color: colors[prev.length % colors.length],
    }])
    setNewCharity({ name: "", category: "" })
    setShowAddForm(false)
  }

  const pendingCount = Object.values(winnerStatuses).filter(s => s === null).length
  const totalPool = 1050000
  const poolTiers = PRIZE_TIERS.map(t => ({
    ...t,
    amount: Math.round((totalPool * t.pct) / 100),
  }))

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-medium text-white tracking-tight mb-2">Admin Terminal</h1>
          <p className="text-sm text-[var(--color-text-secondary)] font-medium tracking-wide">Full platform control — users, draws, charities, winners, analytics.</p>
        </div>
        <div className="flex gap-1.5 bg-white/[0.02] p-1.5 rounded-xl border border-[var(--color-border)] w-full md:w-auto overflow-x-auto shadow-inner">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[var(--color-surface-elevated)] text-white shadow-[0_2px_10px_rgba(0,0,0,0.3)] border border-white/10"
                  : "text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((s, i) => {
                const c = COLOR_MAP[s.color] || COLOR_MAP.emerald
                return (
                  <motion.div key={s.label} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="premium-card p-6 bg-white/[0.01]">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center border ${c.border}`}>
                        <s.icon className={`w-5 h-5 ${c.text}`} />
                      </div>
                      <Badge variant="glass" className={`bg-white/[0.02] ${c.text} border-white/5 font-semibold text-[10px]`}>{s.trend}</Badge>
                    </div>
                    <p className="text-3xl font-display font-medium text-white tracking-tight">{s.value}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1 font-semibold uppercase tracking-wider">{s.label}</p>
                  </motion.div>
                )
              })}
            </div>
            <div className="premium-card p-8 border-[var(--color-border)] bg-white/[0.01]">
              <div className="flex items-center gap-4 mb-6">
                <Terminal className="w-5 h-5 text-[var(--color-text-secondary)]" />
                <h2 className="font-display font-medium text-white tracking-tight text-xl">System Audit Log</h2>
              </div>
              <div className="space-y-3">
                {[
                  { time: "01:42:04", event: "Subscription Confirmed: Emily R. (₹749/mo, Hobbyist)", icon: Activity, color: "text-[var(--color-primary)]" },
                  { time: "01:38:12", event: "Draw Engine — Pre-analysis simulation executed", icon: ShieldCheck, color: "text-amber-400" },
                  { time: "01:12:45", event: "New User Provisioned: Account #99827", icon: Users, color: "text-blue-400" },
                  { time: "00:54:19", event: "Charity Allocation: Ocean Cleanup Foundation — ₹1,01,000", icon: Globe, color: "text-[var(--color-text-secondary)]" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-white/[0.02] bg-[var(--color-surface)]/50 hover:bg-white/[0.02] transition-colors">
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] w-16">{item.time}</span>
                    <item.icon className={`w-4 h-4 ${item.color} opacity-80`} />
                    <p className="text-xs font-medium text-[var(--color-text-secondary)] tracking-wide">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "draw" && (
          <motion.div key="draw" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div className="premium-card p-6 bg-white/[0.02] border-[var(--color-border)]">
                  <h3 className="font-display font-medium text-white mb-4 text-sm uppercase tracking-widest">Draw Logic Mode</h3>
                  <div className="flex gap-3">
                    {(["random", "algorithmic"] as const).map(mode => (
                      <button
                        key={mode}
                        onClick={() => setDrawMode(mode)}
                        className={`flex-1 py-3 rounded-xl text-xs font-semibold capitalize border transition-all ${
                          drawMode === mode
                            ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/40 text-[var(--color-primary)]"
                            : "bg-white/[0.02] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white"
                        }`}
                      >
                        {mode === "random" ? "🎲 Random Generation" : "⚖️ Algorithmic (Weighted)"}
                      </button>
                    ))}
                  </div>
                  {drawMode === "algorithmic" && (
                    <p className="text-[10px] text-[var(--color-text-muted)] mt-3 font-medium">Weighted by most/least frequent user score submissions.</p>
                  )}
                </div>
                <div className="premium-card p-6 bg-white/[0.02] border-[var(--color-border)]">
                  <h3 className="font-display font-medium text-white mb-5 text-sm uppercase tracking-widest">Prize Pool Tiers — ₹{totalPool.toLocaleString()}</h3>
                  <div className="space-y-4">
                    {poolTiers.map((tier, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1.5">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-white">{tier.match}</span>
                            {tier.rollover && <span className="text-[9px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded">JACKPOT ROLLOVER</span>}
                          </div>
                          <span className="font-display font-semibold text-sm" style={{ color: tier.color }}>₹{tier.amount.toLocaleString()} ({tier.pct}%)</span>
                        </div>
                        <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${tier.pct}%` }} transition={{ delay: i * 0.1, duration: 0.8 }} className="h-full rounded-full" style={{ background: tier.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {jackpotRollover && (
                    <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-semibold">
                      ⚠️ No 5-Number Match winner — Jackpot (₹{poolTiers[0].amount.toLocaleString()}) carried forward to next draw.
                    </div>
                  )}
                </div>
                <div className="premium-card p-6 bg-white/[0.02] border-[var(--color-border)] space-y-3">
                  <Button
                    onClick={simulateDraw}
                    disabled={simulating}
                    className="w-full h-12 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95 group"
                  >
                    {simulating ? (
                      <><span className="animate-spin mr-3"><RefreshCcw className="w-5 h-5" /></span>Simulating Draw...</>
                    ) : (
                      <>Simulate / Pre-Analysis <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </Button>
                  {drawResults.length === 5 && !simulating && (
                    <Button
                      onClick={() => setPublished(true)}
                      disabled={published}
                      className={`w-full h-12 font-semibold text-sm rounded-xl transition-all ${published ? "bg-[var(--color-primary)]/30 text-[var(--color-primary)] cursor-default" : "bg-white text-[#020617] hover:bg-gray-100"}`}
                    >
                      {published ? "✓ Results Published" : "Publish Results"}
                    </Button>
                  )}
                </div>
              </div>

              <div className="premium-card relative overflow-hidden bg-[var(--color-background)] border-[var(--color-border)] flex flex-col items-center justify-center min-h-[400px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />
                <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest font-semibold mb-8 relative z-10">Live Draw Sequence</p>
                <div className="flex gap-4 relative z-10">
                  {[0, 1, 2, 3, 4].map((slotIdx) => {
                    const isSpinning = simulating && drawResults.length <= slotIdx
                    const displayVal = drawResults.length > slotIdx ? drawResults[slotIdx] : spinValues[slotIdx]
                    return (
                      <div key={slotIdx} className={`w-16 h-24 rounded-xl border flex items-center justify-center relative overflow-hidden bg-white/[0.02] shadow-inner ${
                        drawResults.length > slotIdx
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                          : "border-white/10"
                      }`}>
                        {isSpinning && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse" />}
                        <motion.span
                          key={isSpinning ? `spin-${displayVal}` : `final-${displayVal}`}
                          initial={isSpinning ? { y: -20, opacity: 0 } : { y: 20, opacity: 0, scale: 0.5 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          transition={isSpinning ? { duration: 0.1 } : { type: "spring", bounce: 0.5 }}
                          className={`font-display font-medium text-4xl ${drawResults.length > slotIdx ? "text-[var(--color-accent)] drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "text-white/40"}`}
                        >
                          {displayVal === 0 ? "-" : displayVal}
                        </motion.span>
                      </div>
                    )
                  })}
                </div>
                <div className="absolute bottom-8 left-0 w-full text-center">
                  {drawResults.length === 5 && !simulating && (
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest bg-[var(--color-accent)]/10 py-1.5 px-4 rounded-full inline-block border border-[var(--color-accent)]/20">
                      {published ? "✓ Published" : "Simulation Complete — Ready to Publish"}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "winners" && (
          <motion.div key="winners" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <div className="premium-card overflow-hidden bg-white/[0.01]">
              <div className="p-6 md:p-8 border-b border-[var(--color-border)] flex items-center justify-between">
                <div>
                  <h2 className="font-display font-medium text-white tracking-tight text-2xl">Winner Verification & Payout</h2>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 font-medium">Review proof submissions, approve/reject, and mark payouts as completed.</p>
                </div>
                <div className="flex items-center gap-3">
                  {pendingCount > 0 && (
                    <Badge variant="glass" className="bg-amber-500/10 text-amber-500 border-amber-500/20 px-4 py-1.5 font-semibold text-xs rounded-lg shadow-none">
                      {pendingCount} Pending Review
                    </Badge>
                  )}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/[0.02]">
                      {["Beneficiary", "Draw Date", "Match Type", "Prize Tier", "Amount", "Proof Ref", "Status", "Action"].map(h => (
                        <th key={h} className="px-5 py-4 text-left text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider border-b border-[var(--color-border)]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {INITIAL_WINNERS.map(winner => {
                      const status = winnerStatuses[winner.id]
                      return (
                        <tr key={winner.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-surface)]/50 transition-colors">
                          <td className="px-5 py-5 font-semibold text-white">{winner.user}</td>
                          <td className="px-5 py-5 text-xs text-[var(--color-text-muted)] font-medium">{winner.drawDate}</td>
                          <td className="px-5 py-5 text-xs text-[var(--color-text-secondary)] font-medium">{winner.matchType}</td>
                          <td className="px-5 py-5">
                            <span className="text-[10px] font-semibold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded border border-[var(--color-primary)]/20">{winner.tier}</span>
                          </td>
                          <td className="px-5 py-5 font-display font-semibold text-white text-lg">₹{winner.amount.toLocaleString()}</td>
                          <td className="px-5 py-5">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-text-secondary)] bg-white/[0.03] border border-white/10 px-2 py-1 rounded">
                              <ImageIcon className="w-3 h-3 text-blue-400" />
                              {winner.proofRef}
                            </div>
                          </td>
                          <td className="px-5 py-5">
                            {status === null && <span className="text-[10px] font-semibold text-amber-500 flex items-center gap-1.5"><Clock className="w-3 h-3" />Pending</span>}
                            {status === "approved" && <span className="text-[10px] font-semibold text-blue-400 flex items-center gap-1.5"><CheckCircle className="w-3 h-3" />Approved</span>}
                            {status === "rejected" && <span className="text-[10px] font-semibold text-red-400 flex items-center gap-1.5"><AlertCircle className="w-3 h-3" />Rejected</span>}
                            {status === "paid" && <span className="text-[10px] font-semibold text-[var(--color-primary)] flex items-center gap-1.5"><CheckCircle className="w-3 h-3" />Paid ✓</span>}
                          </td>
                          <td className="px-5 py-5">
                            {status === null && (
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => handleVerify(winner.id, "approved")} className="h-8 px-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-[10px] rounded-lg shadow-none">Approve</Button>
                                <Button size="sm" onClick={() => handleVerify(winner.id, "rejected")} className="h-8 px-3 bg-transparent hover:bg-red-500/10 text-red-400 hover:text-red-400 font-semibold text-[10px] rounded-lg border border-red-500/20" variant="ghost">Reject</Button>
                              </div>
                            )}
                            {status === "approved" && (
                              <Button size="sm" onClick={() => handleMarkPaid(winner.id)} className="h-8 px-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-semibold text-[10px] rounded-lg border border-blue-500/20" variant="ghost">
                                Mark Paid
                              </Button>
                            )}
                            {(status === "rejected" || status === "paid") && (
                              <span className="text-[10px] font-medium text-[var(--color-text-muted)] italic">Finalized</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "charity" && (
          <motion.div key="charity" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="font-display font-medium text-white tracking-tight text-2xl mb-1">Charity Manager</h2>
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">Add, edit, and remove verified partner organizations.</p>
              </div>
              <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-white text-[#020617] hover:bg-gray-200 font-semibold text-xs px-6 rounded-xl h-10 transition-all shadow-[0_2px_10px_rgba(255,255,255,0.1)] flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Partner
              </Button>
            </div>

            {showAddForm && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6 bg-white/[0.02] border-[var(--color-primary)]/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-medium text-white text-sm">New Partner Organization</h3>
                  <button onClick={() => setShowAddForm(false)} className="text-[var(--color-text-muted)] hover:text-white"><X className="w-4 h-4" /></button>
                </div>
                <div className="flex gap-4">
                  <Input placeholder="Organization Name" value={newCharity.name} onChange={e => setNewCharity(p => ({ ...p, name: e.target.value }))} className="flex-1 h-10 bg-white/[0.03] border-[var(--color-border-strong)] text-white rounded-xl text-sm" />
                  <Input placeholder="Category (e.g. Environment)" value={newCharity.category} onChange={e => setNewCharity(p => ({ ...p, category: e.target.value }))} className="flex-1 h-10 bg-white/[0.03] border-[var(--color-border-strong)] text-white rounded-xl text-sm" />
                  <Button onClick={addCharity} className="h-10 px-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm rounded-xl">Add</Button>
                </div>
              </motion.div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {charities.map((charity, i) => (
                <motion.div key={charity.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="premium-card p-6 bg-white/[0.01]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.05] border border-white/10">
                      <Globe className="w-5 h-5" style={{ color: charity.color }} />
                    </div>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[var(--color-text-muted)] hover:text-white transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => removeCharity(charity.id)} className="w-8 h-8 rounded-lg bg-red-500/[0.04] border border-red-500/20 flex items-center justify-center text-red-400/60 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-display font-medium text-white text-base mb-1 leading-tight">{charity.name}</h3>
                  <p className="text-[10px] text-[var(--color-text-muted)] font-semibold uppercase tracking-wider mb-4">{charity.category}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider font-semibold">User Adoption</span>
                      <span className="font-display font-medium text-white text-sm">{charity.percent}%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${charity.percent}%` }} transition={{ duration: 1, delay: i * 0.2 }} className="h-full rounded-full" style={{ background: charity.color }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "analytics" && (
          <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
            <h2 className="font-display font-medium text-white tracking-tight text-2xl">Reports & Analytics</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Users", value: "1,240", sub: "+38 this week", color: "text-[var(--color-primary)]" },
                { label: "Total Prize Pool", value: "₹30,40,000", sub: "All-time distributed", color: "text-[var(--color-accent)]" },
                { label: "Charity Contributions", value: "₹11,10,000", sub: "Across 4 partners", color: "text-pink-400" },
                { label: "Draws Executed", value: "3", sub: "Monthly cadence", color: "text-blue-400" },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="premium-card p-6 bg-white/[0.01]">
                  <p className={`text-3xl font-display font-semibold ${s.color} tracking-tight`}>{s.value}</p>
                  <p className="text-xs text-[var(--color-text-muted)] font-semibold uppercase tracking-wider mt-1">{s.label}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-2">{s.sub}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="premium-card p-6 bg-white/[0.01]">
                <h3 className="font-display font-medium text-white mb-5 text-base">Prize Pool by Draw</h3>
                <div className="space-y-4">
                  {[
                    { month: "Feb 2026", pool: 820000, pct: 78 },
                    { month: "Mar 2026", pool: 940000, pct: 90 },
                    { month: "Apr 2026", pool: 1050000, pct: 100 },
                  ].map((row, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-[var(--color-text-secondary)]">{row.month}</span>
                        <span className="font-display font-semibold text-white">₹{row.pool.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${row.pct}%` }} transition={{ delay: i * 0.15, duration: 0.8 }} className="h-full bg-[var(--color-accent)] rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="premium-card p-6 bg-white/[0.01]">
                <h3 className="font-display font-medium text-white mb-5 text-base">Charity Distribution Totals</h3>
                <div className="space-y-4">
                  {[
                    { name: "Ocean Cleanup Foundation", amount: 481000, pct: 43, color: "#f59e0b" },
                    { name: "Global Water Initiative", amount: 352000, pct: 32, color: "#10b981" },
                    { name: "Education For All", amount: 176000, pct: 16, color: "#ec4899" },
                    { name: "Reforestation Trust", amount: 106000, pct: 9, color: "#8b5cf6" },
                  ].map((c, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-[var(--color-text-secondary)]">{c.name}</span>
                        <span className="font-display font-semibold" style={{ color: c.color }}>₹{c.amount.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${c.pct}%` }} transition={{ delay: i * 0.1, duration: 0.8 }} className="h-full rounded-full" style={{ background: c.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="premium-card overflow-hidden bg-white/[0.01]">
              <div className="p-6 border-b border-[var(--color-border)]">
                <h3 className="font-display font-medium text-white text-base">Draw Statistics</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/[0.02]">
                      {["Draw", "Date", "Participants", "Pool", "Jackpot Winner", "Charity Deployed", "Status"].map(h => (
                        <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider border-b border-[var(--color-border)]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "DRW-2026-04", date: "01 Apr 2026", parts: 248, pool: "₹10,50,000", jackpot: "Sarah Jenkins", charity: "₹4,00,000", status: "Settled" },
                      { id: "DRW-2026-03", date: "01 Mar 2026", parts: 221, pool: "₹9,40,000", jackpot: "Tom Ashford", charity: "₹3,45,000", status: "Settled" },
                      { id: "DRW-2026-02", date: "01 Feb 2026", parts: 194, pool: "₹8,20,000", jackpot: "Ayesha Rahman", charity: "₹3,02,000", status: "Settled" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-[var(--color-border)] hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-white font-semibold">{row.id}</td>
                        <td className="px-6 py-4 text-[var(--color-text-secondary)] text-xs font-medium">{row.date}</td>
                        <td className="px-6 py-4 text-[var(--color-text-secondary)]">{row.parts}</td>
                        <td className="px-6 py-4 font-display font-semibold text-[var(--color-accent)]">{row.pool}</td>
                        <td className="px-6 py-4 font-semibold text-white">{row.jackpot}</td>
                        <td className="px-6 py-4 font-display font-semibold text-pink-400">{row.charity}</td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 px-2 py-0.5 rounded">{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
