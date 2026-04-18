"use client"

import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Trophy, TrendingUp, Users, ShieldCheck, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const FEATURES = [
  {
    icon: Trophy,
    color: "from-[var(--color-accent)]/20 to-transparent",
    iconColor: "text-[var(--color-accent)]",
    border: "border-[var(--color-accent)]/20",
    title: "Premium Prize Pools",
    description: "Every verified 5-score submission enters the monthly draw. High-stakes rewards tied directly to your performance.",
  },
  {
    icon: TrendingUp,
    color: "from-[var(--color-primary)]/20 to-transparent",
    iconColor: "text-[var(--color-primary)]",
    border: "border-[var(--color-primary)]/20",
    title: "Performance Analytics",
    description: "Institutional-grade tracking for your handicap. Our rolling 5-score logic ensures your index is always current.",
  },
  {
    icon: Heart,
    color: "from-white/10 to-transparent",
    iconColor: "text-white",
    border: "border-white/10",
    title: "Automated Impact",
    description: "Direct a percentage of your subscription to verified partners. Build your philanthropic legacy passively.",
  },
]

const STATS = [
  { label: "Active Members", value: "1,200+", icon: Users },
  { label: "Total Distributed", value: "₹38L+", icon: Trophy },
  { label: "Impact Deployed", value: "₹10L+", icon: Heart },
  { label: "Draws Finalized", value: "18", icon: ShieldCheck },
]

export default function Home() {
  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      <Navbar />
      <main className="relative z-10">
        <section className="relative px-6 pt-24 pb-32 overflow-hidden min-h-[90vh] flex flex-col justify-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-0 top-0 w-[50%] h-full bg-[radial-gradient(circle_at_20%_30%,var(--color-accent)_0%,transparent_50%)] opacity-[0.03]" />
            <div className="absolute right-0 top-0 w-[50%] h-full bg-[radial-gradient(circle_at_80%_60%,var(--color-primary)_0%,transparent_50%)] opacity-[0.05]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
              <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-white/[0.02] mb-8">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                  <span className="text-xs font-medium text-[var(--color-text-secondary)] tracking-wide uppercase">The Digital Hero Program</span>
                </div>
                <h1 className="heading-hero text-6xl md:text-8xl mb-6">
                  Play for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#fcd34d]">The Win.</span>
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-md font-light leading-relaxed">
                  Log your scores. Compete in high-stakes monthly draws. Experience the definitive performance engine for modern golfers.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="lg:text-right border-l lg:border-l-0 lg:border-r border-[var(--color-border)] pl-8 lg:pl-0 lg:pr-8">
                <h1 className="heading-hero text-6xl md:text-8xl mb-6">
                  Play for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-[var(--color-primary)] to-[#34d399]">Impact.</span>
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-md font-light leading-relaxed lg:ml-auto">
                  Automatically route a portion of your subscription to verified ESG portfolios. Your game funds real-world change.
                </p>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }} className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button className="h-14 px-10 text-sm font-semibold rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 hover:scale-105 active:scale-95 group">
                  Initialize Portfolio <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" className="h-14 px-10 text-sm font-medium rounded-xl border-[var(--color-border-strong)] bg-white/[0.02] text-white hover:bg-white/[0.06] transition-all duration-300">
                  View Methodology
                </Button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-24 pt-10 border-t border-[var(--color-border)] grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <stat.icon className={`w-4 h-4 ${i % 2 === 0 ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary)]'}`} />
                    <span className="text-2xl md:text-3xl font-display font-medium text-white">{stat.value}</span>
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-medium">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 relative px-6 bg-white/[0.01] border-y border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <p className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">Core Infrastructure</p>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight">Institutional grade mechanics.</h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`premium-card p-10 ${f.border} group relative`}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.color} border ${f.border} flex items-center justify-center mb-8 relative z-10 transition-transform duration-500 group-hover:scale-110`}>
                    <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-display font-medium text-white mb-3 tracking-tight">{f.title}</h3>
                  <p className="text-[var(--color-text-secondary)] text-sm font-light leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center premium-card p-16 md:p-24 border-[var(--color-primary)]/20 relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.1)_0%,transparent_60%)] pointer-events-none" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-8 glow-emerald">
                <Heart className="w-7 h-7 text-[var(--color-primary)] fill-[var(--color-primary)]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight mb-6">Redefine your legacy.</h2>
              <p className="text-[var(--color-text-secondary)] text-lg mb-10 max-w-md mx-auto font-light">₹749/month. Cancel anytime. The platform that rewards performance while funding global change.</p>
              <Link href="/signup">
                <Button className="h-14 px-12 text-sm font-semibold rounded-xl bg-white text-[#020617] hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Create Your Account <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
