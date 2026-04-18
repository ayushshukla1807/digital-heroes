"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Landmark, TrendingUp, HandCoins } from "lucide-react"
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts"

export function CharityImpact({ charityName, initialPercent }: { charityName: string; initialPercent: number; }) {
  const [percent, setPercent] = useState(initialPercent)

  const chartData = [0, 1, 2, 3, 4, 5].map((month) => ({
    month: `M${month}`,
    projected: 749 * (percent / 100) * month * 1.05,
  }))

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="premium-card flex flex-col h-full group p-6 overflow-hidden">
      <div className="flex justify-between items-start mb-6 border-b border-[var(--color-border)] pb-6 relative z-10">
        <div>
          <h2 className="text-xl font-display font-medium text-white tracking-tight flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" /> Philanthropy Portfolio
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-1 font-medium tracking-wide">Direct Allocation Management</p>
        </div>
        <div className="bg-white/[0.02] border border-[var(--color-border)] rounded-lg p-2 px-3 text-center">
          <p className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider font-semibold">Current Yield Target</p>
          <p className="text-xl font-display font-semibold text-[var(--color-primary)]">₹{(749 * (percent / 100)).toFixed(2)}<span className="text-[10px] text-[var(--color-text-muted)] font-sans">/mo</span></p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between relative z-10 space-y-8">
        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-inner flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold mb-0.5">Active Beneficiary</p>
              <h3 className="text-sm font-display font-semibold text-white truncate">{charityName}</h3>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-xs font-semibold text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5">Change</Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end mb-2">
            <label className="text-xs font-medium text-white/80">Allocation Frequency</label>
            <span className="text-2xl font-display font-semibold text-white">{percent}%</span>
          </div>
          <div className="relative pb-6">
            <input
              type="range" min="10" max="100" step="5" value={percent} onChange={(e) => setPercent(parseInt(e.target.value))}
              className="w-full h-2 bg-[var(--color-surface-elevated)] rounded-full appearance-none cursor-pointer accent-[var(--color-primary)] outline-none shadow-inner z-10 relative"
            />
            <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] mt-3 font-medium px-1">
              <span>10% (Min)</span>
              <span>100% (Max)</span>
            </div>
          </div>

          <div className="h-[80px] w-full relative pt-2 border-t border-[var(--color-border)] mt-4">
            <div className="absolute top-4 left-0 flex items-center gap-1.5 z-10 bg-[var(--color-background)]/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-semibold text-pink-500 border border-pink-500/20">
              <TrendingUp className="w-3 h-3" /> Projected Impact
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 15, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#ec4899' }}
                  formatter={(value: any) => [`₹${Number(value).toFixed(2)}`, 'Projected Yield']}
                  labelFormatter={(label) => `Month ${label}`}
                />
                <Area type="monotone" dataKey="projected" stroke="#ec4899" strokeWidth={2} fillOpacity={1} fill="url(#colorImpact)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Button className="w-full h-12 bg-white hover:bg-gray-200 text-[#020617] font-semibold text-sm rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group hover:scale-105 active:scale-95">
          <HandCoins className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" /> Confirm Allocation Matrix
        </Button>
      </div>
    </motion.div>
  )
}
