"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { CircleDollarSign, Coins } from "lucide-react"

export function WinningsOverview({ totalWon, paymentStatus }: { totalWon: number; paymentStatus: string; }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="premium-card h-full p-6 flex flex-col justify-between group overflow-hidden bg-gradient-to-b from-[var(--color-accent)]/5 to-transparent border-[var(--color-accent)]/10">
      {/* Background Graphic - Amber Glow */}
      <div className="absolute right-[-20px] top-[-20px] opacity-[0.1] group-hover:opacity-[0.2] group-hover:scale-110 transition-all duration-700 pointer-events-none">
        <CircleDollarSign className="w-48 h-48 text-[var(--color-accent)]" />
      </div>

      <div>
        <div className="flex justify-between items-center mb-6 relative z-10">
          <span className="text-xs font-display font-medium text-[var(--color-accent)] tracking-wide flex items-center gap-2">
            Dividend Yield <Coins className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="relative z-10">
          <div className="text-5xl font-display font-semibold text-white tracking-tight drop-shadow-md">
            ₹{totalWon.toLocaleString()}
          </div>
          <p className="text-[11px] font-medium text-[var(--color-text-muted)] mt-2 uppercase tracking-widest">Total Realized Returns</p>
        </div>
      </div>

      <div className="relative z-10 mt-8 border-t border-white/5 pt-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Settlement Ledger</span>
          <Badge variant="glass" className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20 px-3 py-0.5 font-semibold uppercase tracking-wider text-[10px]">
            {paymentStatus}
          </Badge>
        </div>
      </div>
    </motion.div>
  )
}

