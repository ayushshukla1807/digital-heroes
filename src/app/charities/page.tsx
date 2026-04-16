"use client"

import { Navbar } from "@/components/layout/Navbar"
import { motion } from "framer-motion"
import { Check, Globe, Heart, Search, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MOCK_CHARITIES } from "@/lib/mock-data"
import { useState, useMemo } from "react"

const CATEGORIES = ["All", "Water & Sanitation", "Environment", "Education", "Climate & Ecology"]

export default function CharitiesPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = useMemo(() => {
    return MOCK_CHARITIES.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase())
      const matchCategory = activeCategory === "All" || c.category === activeCategory
      return matchSearch && matchCategory
    })
  }, [search, activeCategory])

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      <Navbar />
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-white/[0.02] mb-6">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-xs font-semibold text-[var(--color-text-secondary)] tracking-wide uppercase">Verified Partners</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-medium text-white tracking-tight mb-4">Impact Partners</h1>
          <p className="text-lg text-[var(--color-text-secondary)] font-light max-w-xl mx-auto">
            Every subscription allocation flows directly to these verified organizations. Transparent, traceable, and verified.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <Input
              type="text"
              placeholder="Search charities by name, description or cause..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 h-12 bg-white/[0.03] border-[var(--color-border)] text-white rounded-xl text-sm placeholder:text-[var(--color-text-muted)] focus-visible:ring-[var(--color-primary)]/30"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30 text-[var(--color-primary)]"
                    : "bg-white/[0.02] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white hover:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Globe className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4" />
            <p className="text-white font-display font-medium text-xl mb-2">No charities found</p>
            <p className="text-[var(--color-text-secondary)] text-sm">Try adjusting your search or filter.</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((charity, i) => (
              <motion.div
                key={charity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`premium-card p-8 cursor-pointer transition-all duration-300 group ${
                  selected === charity.id ? "border-[var(--color-primary)] bg-[var(--color-primary)]/[0.02]" : "border-[var(--color-border)] hover:border-white/20"
                }`}
                onClick={() => setSelected(selected === charity.id ? null : charity.id)}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/[0.04] border border-white/10">
                    <Globe className="w-6 h-6" style={{ color: charity.color }} />
                  </div>
                  <div className="flex items-center gap-2">
                    {selected === charity.id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </motion.div>
                    )}
                    <span className="text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-lg">{charity.category}</span>
                  </div>
                </div>
                <h3 className="text-xl font-display font-medium text-white mb-2 tracking-tight">{charity.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] font-light leading-relaxed mb-6">{charity.description}</p>
                <div className="flex items-center justify-between pt-5 border-t border-[var(--color-border)]">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">Members</p>
                      <p className="text-sm font-display font-semibold text-white flex items-center gap-1.5 mt-0.5">
                        <Users className="w-3.5 h-3.5 text-[var(--color-primary)]" /> {charity.members.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">Deployed</p>
                      <p className="text-sm font-display font-semibold mt-0.5" style={{ color: charity.color }}>{charity.impact}</p>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-[var(--color-text-secondary)] flex items-center gap-1">
                    <Globe className="w-3 h-3" /> {charity.country}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selected && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="premium-card px-8 py-4 flex items-center gap-6 border-[var(--color-primary)]/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-sm font-medium text-white">{MOCK_CHARITIES.find(c => c.id === selected)?.name} selected</span>
              </div>
              <Button className="h-9 px-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-xs rounded-lg" onClick={() => window.location.href = "/signup"}>
                Create Account
              </Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
