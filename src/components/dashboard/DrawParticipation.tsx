"use client"

import { motion } from "framer-motion"
import { Play, TrendingUp } from "lucide-react"

export function DrawParticipation({ drawsEntered, upcomingDraw, scoresLength }: { drawsEntered: number; upcomingDraw: string; scoresLength: number; }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="premium-card h-full p-6 flex flex-col justify-between group bg-white/[0.01]">
      <div>
        <div className="flex justify-between items-center mb-6 relative z-10">
          <span className="text-xs font-display font-medium text-[var(--color-text-secondary)] tracking-wide flex items-center gap-2">
            Protocol Status <TrendingUp className="w-3 h-3 text-white/50" />
          </span>
        </div>
        <div className="relative z-10">
          <div className="text-3xl font-display font-medium text-white tracking-tight">{drawsEntered} Entries</div>
          <p className="text-[11px] font-medium text-[var(--color-text-secondary)] mt-3 flex items-center tracking-wider">
            <Play className="w-3.5 h-3.5 mr-2 opacity-70 text-[var(--color-text-muted)]" /> Next Target: {new Date(upcomingDraw).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-8">
        {scoresLength >= 5 ? (
          <div className="p-3 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 flex flex-col gap-1 shadow-inner">
             <span className="text-[10px] font-display font-semibold text-[var(--color-primary)] uppercase tracking-wider">Index Complete • Yield Ready</span>
             <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden mt-2">
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="h-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]" />
             </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
             <div className="flex justify-between items-end">
                <span className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Index Threshold</span>
                <span className="text-xs font-display font-semibold text-white">{scoresLength}/5</span>
             </div>
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(scoresLength / 5) * 100}%` }} className="h-full bg-[var(--color-primary)] opacity-50" />
             </div>
             <p className="text-[10px] font-medium text-[var(--color-text-muted)] tracking-wide text-center mt-1">
                Awaiting {5 - scoresLength} entries for yield activation.
             </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
