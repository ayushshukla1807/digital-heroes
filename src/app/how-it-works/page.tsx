"use client"

import { Navbar } from '@/components/layout/Navbar'
import { motion } from 'framer-motion'
import { TrendingUp, Trophy, Heart, Activity, ShieldCheck, PieChart, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const STEPS = [
  {
    icon: Activity,
    color: "from-[var(--color-primary)]/20",
    iconColor: "text-[var(--color-primary)]",
    title: "Step 01: Vector Indexing",
    description: "Submit your latest performance scores. The protocol utilizes a rolling 5-score logic buffer, discarding outdated entries to keep your performance index perfectly calibrated to your current form."
  },
  {
    icon: Trophy,
    color: "from-[var(--color-accent)]/20",
    iconColor: "text-[var(--color-accent)]",
    title: "Step 02: Network Sync",
    description: "Once your index buffer reaches maturity (5 scores), you are automatically allocated entries into the monthly Yield Generation Draw. The higher your subscription tier, the higher your entry magnitude."
  },
  {
    icon: PieChart,
    color: "from-pink-500/20",
    iconColor: "text-pink-400",
    title: "Step 03: ESG Deployment",
    description: "While you compete for the central prize pool, a guaranteed percentage of your monthly footprint is automatically distributed across your selected philanthropic partners. Passive impact, activated."
  }
]

export default function HowItWorksPage() {
  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      <Navbar />
      
      <main className="relative z-10 pb-32">
        {/* Header Section */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden flex flex-col items-center text-center border-b border-[var(--color-border)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.05)_0%,transparent_60%)] pointer-events-none" />
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-white/[0.02] mb-8">
               <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
               <span className="text-xs font-semibold text-[var(--color-text-secondary)] tracking-wide uppercase">Core Philosophy</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-medium text-white tracking-tight mb-6">
              The Engine <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--color-text-muted)]">Behind the Impact.</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] font-light leading-relaxed">
              We mathematically bridge the psychological thrill of high-stakes competition with the tangible reality of philanthropic wealth distribution.
            </p>
          </motion.div>
        </section>

        {/* Methodology Pathway */}
        <section className="max-w-5xl mx-auto px-6 py-24">
          <div className="space-y-12 relative">
             {/* Vertical Timeline Line */}
             <div className="hidden md:block absolute left-[3.5rem] top-10 bottom-10 w-px bg-gradient-to-b from-[var(--color-primary)]/50 via-[var(--color-accent)]/50 to-pink-500/50" />

             {STEPS.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex flex-col md:flex-row gap-8 items-start relative z-10"
                >
                  <div className={`shrink-0 w-28 h-28 rounded-2xl bg-gradient-to-br ${step.color} to-transparent border border-white/10 flex items-center justify-center shadow-inner`}>
                    <step.icon className={`w-10 h-10 ${step.iconColor}`} />
                  </div>
                  
                  <div className="premium-card p-10 flex-1 border-[var(--color-border)] bg-white/[0.01]">
                    <h3 className="text-2xl font-display font-medium text-white mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed font-light">{step.description}</p>
                  </div>
                </motion.div>
             ))}
          </div>
        </section>

        {/* Call to Action Data Strip */}
        <section className="max-w-4xl mx-auto px-6 mt-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="premium-card p-12 text-center relative overflow-hidden group border-[var(--color-primary)]/20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1)_0%,transparent_70%)] pointer-events-none group-hover:opacity-100 transition-opacity" />
            
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight mb-4 relative z-10">Ready to initialize your portfolio?</h2>
            <p className="text-[var(--color-text-secondary)] mb-10 max-w-lg mx-auto font-light relative z-10">Stop leaving your data dormant. Convert your performance into a yielding philanthropic asset.</p>
            
            <div className="relative z-10">
              <Link href="/signup">
                <Button className="h-14 px-12 text-sm font-semibold rounded-xl bg-[var(--color-primary)] text-white shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:bg-[var(--color-primary-dark)] transition-all duration-300 hover:scale-105 active:scale-95 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                  Engage Protocol <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
