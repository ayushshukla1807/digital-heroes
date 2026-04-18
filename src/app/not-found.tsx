"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Hexagon, ArrowLeft, Orbit } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Orbits */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[400px] h-[400px] rounded-full border border-[#06b6d4]/30 animate-[spin_10s_linear_infinite]" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-amber-500/20 animate-[spin_15s_linear_infinite_reverse]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="mb-6 relative flex items-center justify-center">
          <Hexagon className="w-20 h-20 text-[#06b6d4] stroke-[1]" />
          <Orbit className="absolute w-8 h-8 text-amber-500 animate-pulse" />
        </div>

        <h1 className="text-[120px] leading-none font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-display font-semibold text-white mb-3">
          Lost in Orbit
        </h2>
        
        <p className="text-[var(--color-text-secondary)] max-w-md mx-auto mb-8 font-light">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in this sector.
        </p>

        <div className="flex items-center gap-4">
          <Link href="/">
            <Button className="h-12 px-6 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/10 text-white font-medium transition-all">
              <ArrowLeft className="w-4 h-4 mr-2" /> Return to Base
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="h-12 px-6 rounded-xl bg-[#06b6d4] hover:bg-[#0891b2] text-gray-900 font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
              Launch Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
