"use client"

import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/button'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Typewriter } from '@/components/ui/Typewriter'
import { Marquee } from '@/components/ui/Marquee'
import { Meteors } from '@/components/ui/Meteors'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { ArrowRight, Heart, Trophy, TrendingUp, Users, ShieldCheck, ChevronRight, Zap, Globe, Lock, Star } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0
    const step = end / 60
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setVal(end); clearInterval(timer) }
      else setVal(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [end])
  return <>{val.toLocaleString()}{suffix}</>
}

const FEATURES = [
  {
    icon: Trophy,
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-400",
    tag: "Draw Engine",
    title: "Premium Prize Pools",
    description: "Every verified 5-score submission enters the monthly draw. Algorithm-powered or randomised — high-stakes rewards tied directly to your performance.",
    metric: "₹10.5L", metricLabel: "April Pool"
  },
  {
    icon: TrendingUp,
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
    tag: "Stableford Tracking",
    title: "Precision Analytics",
    description: "Rolling 5-score buffer. One entry per date. Validated 1–45 Stableford range. Your index is always accurate and competition-grade.",
    metric: "5", metricLabel: "Score Buffer"
  },
  {
    icon: Heart,
    gradient: "from-pink-500/20 via-pink-500/5 to-transparent",
    iconBg: "bg-pink-500/10 border-pink-500/20",
    iconColor: "text-pink-400",
    tag: "ESG Giving",
    title: "Automated Impact",
    description: "Route 10%–100% of your subscription to verified charities. Four active partners, transparent fund tracking, live allocation slider.",
    metric: "₹11.9L", metricLabel: "Deployed"
  },
]

const HOW_IT_WORKS = [
  { step: "01", icon: Lock, label: "Subscribe", text: "Choose Hobbyist (₹749/mo) or Digital Hero (₹1,999/mo). PayPal secure billing." },
  { step: "02", icon: TrendingUp, label: "Track Scores", text: "Log your Stableford scores daily. System maintains your rolling 5-score index." },
  { step: "03", icon: Zap, label: "Enter Draw", text: "Each month, eligible players enter the automated prize draw engine automatically." },
  { step: "04", icon: Heart, label: "Fund Impact", text: "Your contribution % flows to your chosen charity partner. Transparent ledger." },
]

const STATS = [
  { label: "Active Members", value: 1200, suffix: "+", icon: Users, color: "text-amber-400" },
  { label: "Total Distributed", value: 38, suffix: "L+", prefix: "₹", icon: Trophy, color: "text-emerald-400" },
  { label: "Impact Deployed", value: 10, suffix: "L+", prefix: "₹", icon: Heart, color: "text-pink-400" },
  { label: "Draws Completed", value: 18, suffix: "", icon: ShieldCheck, color: "text-blue-400" },
]

const TICKER_ITEMS = [
  "✦ April Draw Pool: ₹10,50,000",
  "✦ Sarah Jenkins — Class A Winner ₹4,20,000",
  "✦ Ocean Cleanup Foundation — ₹11.9L deployed",
  "✦ Next Draw: 01 May 2026",
  "✦ 1,287 Active Subscribers",
  "✦ Education For All — ₹5.1L deployed",
  "✦ Draw Mode: Algorithmic",
]

export default function Home() {
  return (
    <div className="bg-[var(--color-background)] min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Live Ticker */}
      <div className="fixed top-0 left-0 right-0 z-50 h-8 bg-[var(--color-accent)]/90 backdrop-blur-sm flex items-center overflow-hidden">
        <div className="flex whitespace-nowrap animate-[ticker_40s_linear_infinite]">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-gray-900 text-[11px] font-semibold px-8">{item}</span>
          ))}
        </div>
      </div>

      <main className="relative z-10 pt-8">
        {/* Hero */}
        <section className="relative px-6 pt-28 pb-32 overflow-hidden min-h-[95vh] flex flex-col justify-center">
          {/* Grid background */}
          <div className="absolute inset-0 pointer-events-none">
            <Meteors number={20} />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
            <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-[180px] opacity-[0.04]" />
            <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[180px] opacity-[0.06]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#06b6d4]/30 bg-[#06b6d4]/5">
                <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse" />
                <span className="text-xs font-semibold text-[#06b6d4] tracking-widest uppercase">April Draw Live — ₹10,50,000 Pool</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="text-center mb-8">
              <h1 className="font-display font-semibold tracking-tight leading-[0.9]">
                <span className="block text-[clamp(52px,9vw,110px)] text-white"><Typewriter text="Launching" delay={0.2} /></span>
                <span className="block text-[clamp(52px,9vw,110px)] text-[#06b6d4]"><Typewriter text="Your Game." delay={0.5} /></span>
                <span className="block text-[clamp(52px,9vw,110px)] text-amber-500"><Typewriter text="Into Orbit." delay={0.8} /></span>
              </h1>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center text-xl text-[var(--color-text-secondary)] font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              The golf platform engineered to launch your scores into prize orbit — and your subscription into charitable impact. Every single month.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link href="/signup">
                <MagneticButton className="h-14 px-12 text-base font-semibold rounded-xl bg-[#06b6d4] hover:bg-[#0891b2] text-gray-900 shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-300 group inline-flex items-center justify-center">
                  Launch Your Game <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" className="h-14 px-10 text-sm font-medium rounded-xl border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.07] transition-all duration-300">
                  See How It Works
                </Button>
              </Link>
            </motion.div>

            {/* Impact Partners Marquee */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="mt-12 mb-20 border-y border-white/5 bg-[#06b6d4]/[0.02] py-8 relative">
              <div className="text-center mb-6">
                <p className="text-[10px] font-semibold text-[#06b6d4] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                  <Heart className="w-3 h-3" /> Certified Impact Partners
                </p>
              </div>
              <Marquee speed={30}>
                {[
                  { n: "Global Water Initiative", c: "#10b981" },
                  { n: "Ocean Cleanup Foundation", c: "#0ea5e9" },
                  { n: "Education For All", c: "#f59e0b" },
                  { n: "Reforestation Trust", c: "#22c55e" },
                  { n: "Medical Relief Int.", c: "#ec4899" },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: p.c }} />
                    <span className="text-sm font-medium text-[var(--color-text-secondary)]">{p.n}</span>
                  </div>
                ))}
              </Marquee>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#06b6d4]/10 rounded-2xl overflow-hidden border border-[#06b6d4]/10">
              {STATS.map((stat, i) => (
                <div key={i} className="bg-[var(--color-background)] px-6 py-8 text-center group hover:bg-white/[0.02] transition-colors">
                  <stat.icon className={`w-5 h-5 mx-auto mb-3 ${stat.color}`} />
                  <p className={`text-3xl font-display font-semibold mb-1 ${stat.color}`}>
                    {stat.prefix || ""}<CountUp end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 border-t border-[var(--color-border)] bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">Simple by Design</p>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight">How it works.</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-4 relative">
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              {HOW_IT_WORKS.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="relative">
                  <div className="premium-card p-6 text-center group hover:border-[var(--color-primary)]/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <span className="text-[10px] font-bold text-[var(--color-primary)] tracking-widest uppercase block mb-2">{item.step}</span>
                    <h3 className="font-display font-medium text-white text-base mb-2">{item.label}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)] font-light leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 px-6 border-t border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-3">Core Infrastructure</p>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight">Institutional grade mechanics.</h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.1, duration: 0.6 }} className={`premium-card p-10 group relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className={`w-14 h-14 rounded-xl ${f.iconBg} border flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                        <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${f.iconColor} bg-white/[0.03] border border-white/10 px-2.5 py-1 rounded-lg`}>{f.tag}</span>
                    </div>
                    <h3 className="text-xl font-display font-medium text-white mb-3 tracking-tight">{f.title}</h3>
                    <p className="text-[var(--color-text-secondary)] text-sm font-light leading-relaxed mb-8">{f.description}</p>
                    <div className="pt-5 border-t border-white/[0.05] flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-display font-semibold text-white">{f.metric}</p>
                        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold mt-0.5">{f.metricLabel}</p>
                      </div>
                      <Star className={`w-4 h-4 ${f.iconColor} opacity-40`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lucknow Local Pride */}
        <section className="py-14 px-6 border-t border-[var(--color-border)]">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-2xl border border-amber-500/15 bg-gradient-to-r from-amber-500/[0.04] via-transparent to-[#06b6d4]/[0.04] px-8 py-6 md:px-12 md:py-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(245,158,11,0.06),transparent_50%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_50%,rgba(6,182,212,0.06),transparent_50%)] pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="flex-shrink-0 text-center">
                  <div className="text-5xl mb-2">🏙️</div>
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Local Pride</p>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-white mb-2">
                    Built in <span className="text-amber-400">Lucknow</span> · For a{" "}
                    <span className="text-[#06b6d4]">Lucknow-born</span> company.
                  </h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed max-w-xl">
                    Digital Heroes was founded in Lucknow, Uttar Pradesh in 2017. This platform was engineered by a candidate from the same city — a shared heritage of ambition, precision, and impact.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="px-4 py-2 rounded-xl border border-amber-500/20 bg-amber-500/5">
                    <p className="text-[11px] font-bold text-amber-400 uppercase tracking-widest text-center">📍 Lucknow, UP</p>
                    <p className="text-[10px] text-white/30 text-center mt-0.5">26.8467° N, 80.9462° E</p>
                  </div>
                  <p className="text-[9px] text-white/20 font-medium uppercase tracking-wider">Headquarters · Home City</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Charity of the Month Spotlight */}
        <section className="py-20 px-6 border-t border-[var(--color-border)] bg-white/[0.01]">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card p-10 md:p-14 border-pink-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(236,72,153,0.08),transparent_60%)] pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                    <Globe className="w-9 h-9 text-pink-400" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest block mb-2">🌟 Charity of the Month — April 2026</span>
                  <h3 className="text-2xl font-display font-medium text-white mb-2">Ocean Cleanup Foundation</h3>
                  <p className="text-[var(--color-text-secondary)] text-sm font-light leading-relaxed max-w-lg">Engineering scalable systems to extract plastic from the world's oceans. This month's top-allocated partner with ₹11,92,000 deployed from member contributions.</p>
                  <div className="flex items-center gap-6 mt-4 justify-center md:justify-start">
                    <div><p className="text-xl font-display font-semibold text-pink-400">₹11.9L</p><p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Deployed</p></div>
                    <div><p className="text-xl font-display font-semibold text-white">481</p><p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Members</p></div>
                    <div><p className="text-xl font-display font-semibold text-white">Global</p><p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Reach</p></div>
                  </div>
                </div>
                <Link href="/charities">
                  <Button className="shrink-0 h-12 px-8 bg-pink-500/10 border border-pink-500/20 text-pink-400 hover:bg-pink-500/20 rounded-xl font-semibold text-sm transition-all">
                    All Partners <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center premium-card p-16 md:p-24 border-[var(--color-primary)]/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.12)_0%,transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-8">
                <Heart className="w-7 h-7 text-[var(--color-primary)] fill-[var(--color-primary)]" />
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-medium text-white tracking-tight mb-6">Redefine your legacy.</h2>
              <p className="text-[var(--color-text-secondary)] text-lg mb-10 max-w-md mx-auto font-light">₹749/month. No lock-in. Cancel anytime. The platform that rewards performance while funding global change.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button className="h-14 px-12 text-base font-semibold rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-emerald-400 text-gray-900 hover:opacity-90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                    Create Your Account <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/auditor">
                  <Button variant="outline" className="h-14 px-8 text-sm font-medium rounded-xl border-white/10 bg-white/[0.02] text-white hover:bg-white/[0.06]">
                    View Transparency Portal
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
