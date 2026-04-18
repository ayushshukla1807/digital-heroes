"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Shield, Sparkles } from "lucide-react"
import Link from "next/link"

export function SubscriptionStatus({ plan, renewalDate }: { plan: string; renewalDate: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="premium-card h-full p-6 flex flex-col justify-between group bg-white/[0.01]">
      {/* Emerald Edge Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.15)_0%,transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div>
        <div className="flex justify-between items-center mb-6 relative z-10">
          <span className="text-xs font-display font-medium text-[var(--color-text-secondary)] tracking-wide flex items-center gap-2">
            Status <Sparkles className="w-3 h-3 text-[var(--color-primary)]" />
          </span>
          <Badge variant="glass" className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20 px-3 py-1 font-semibold uppercase tracking-wider text-[10px]">
            <CheckCircle className="w-3 h-3 mr-1.5" /> Active
          </Badge>
        </div>
        <div className="relative z-10">
           <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[var(--color-primary)] opacity-80" />
            <div className="text-3xl font-display font-medium text-white capitalize tracking-tight">{plan} Plan</div>
          </div>
          <p className="text-[11px] font-medium text-[var(--color-text-secondary)] mt-3 flex items-center uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 mr-2 opacity-70 text-[var(--color-primary)]" /> Rollover Date: {new Date(renewalDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-8">
        <Button variant="outline" className="w-full bg-transparent border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5 transition-all duration-300 font-semibold uppercase tracking-wider text-[10px] h-11 rounded-xl" asChild>
          <Link href="/dashboard/checkout">Manage Tier</Link>
        </Button>
      </div>
    </motion.div>
  )
}
