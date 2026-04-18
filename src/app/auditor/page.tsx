"use client"

import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Users, Heart, Trophy, Eye } from "lucide-react"
import { MOCK_REVENUE_SUMMARY } from "@/lib/mock-data"
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts"

const SUMMARY_STATS = [
  { label: "Gross Revenue (All Time)", value: "₹30,40,000", icon: BarChart3, color: "text-[var(--color-primary)]", bg: "bg-[var(--color-primary)]/10", border: "border-[var(--color-primary)]/20" },
  { label: "Prize Pool Distributed", value: "₹15,75,000", icon: Trophy, color: "text-[var(--color-accent)]", bg: "bg-[var(--color-accent)]/10", border: "border-[var(--color-accent)]/20" },
  { label: "Charity Funds Deployed", value: "₹11,10,000", icon: Heart, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  { label: "Total Subscribers", value: "1,240", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
]

export default function AuditorOverviewPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-widest">Transparency Portal</span>
          </div>
          <h1 className="text-3xl font-display font-medium text-white tracking-tight">Revenue Overview</h1>
          <p className="text-sm text-[var(--color-text-secondary)] font-light mt-1">Full read-only view of platform financials. No PII exposed.</p>
        </div>
        <div className="text-xs font-medium text-[var(--color-text-muted)] bg-white/[0.02] border border-[var(--color-border)] rounded-lg px-4 py-2">
          Data as of <span className="text-white font-semibold">17 Apr 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`premium-card p-6 bg-white/[0.01] border-[var(--color-border)]`}
          >
            <div className={`w-10 h-10 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center mb-5`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-display font-semibold text-white tracking-tight">{s.value}</p>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-1.5 font-semibold uppercase tracking-wider leading-tight">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="premium-card p-8 bg-white/[0.01]"
      >
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-5 h-5 text-[var(--color-text-secondary)]" />
          <h2 className="font-display font-medium text-white text-xl tracking-tight">Monthly Financial Breakdown</h2>
        </div>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_REVENUE_SUMMARY} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCharity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPrize" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/100000).toFixed(1)}L`} />
              <Tooltip
                contentStyle={{ backgroundColor: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#fff" }}
                formatter={(value, name) => [`₹${Number(value).toLocaleString()}`, String(name).charAt(0).toUpperCase() + String(name).slice(1)]}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: "16px", fontSize: "12px", color: "#64748b" }} />
              <Area type="monotone" dataKey="gross" name="Gross" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorGross)" />
              <Area type="monotone" dataKey="charity" name="Charity" stroke="#ec4899" strokeWidth={2} fillOpacity={1} fill="url(#colorCharity)" />
              <Area type="monotone" dataKey="prizePool" name="PrizePool" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorPrize)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="premium-card overflow-hidden bg-white/[0.01]"
      >
        <div className="p-6 border-b border-[var(--color-border)]">
          <h2 className="font-display font-medium text-white text-xl tracking-tight">Monthly Revenue Table</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.02]">
                {["Period", "Gross Revenue", "Prize Pool", "Charity Deployed", "Platform"].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider border-b border-[var(--color-border)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_REVENUE_SUMMARY.map((row, i) => (
                <tr key={i} className="border-b border-[var(--color-border)] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-semibold text-white">{row.month}</td>
                  <td className="px-6 py-4 font-display font-medium text-[var(--color-primary)]">₹{row.gross.toLocaleString()}</td>
                  <td className="px-6 py-4 font-display font-medium text-[var(--color-accent)]">₹{row.prizePool.toLocaleString()}</td>
                  <td className="px-6 py-4 font-display font-medium text-pink-400">₹{row.charity.toLocaleString()}</td>
                  <td className="px-6 py-4 text-[var(--color-text-secondary)] font-medium">₹{row.platform.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
