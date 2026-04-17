"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Target, TrendingUp, Plus, Calendar, Activity, AlertTriangle, Trash2 } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts"

type Score = { id: number; date: string; score: number }

export function PerformanceTracker({ initialScores, onScoresChange }: { initialScores: Score[]; onScoresChange?: (count: number) => void }) {
  const [scores, setScores] = useState<Score[]>([...initialScores].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
  const [newScore, setNewScore] = useState("")
  const [newDate, setNewDate] = useState("")
  const [error, setError] = useState("")

  const handleAddScore = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!newScore || !newDate) {
      setError("Both a date and a score are required.")
      return
    }

    const scoreNum = parseInt(newScore)
    if (isNaN(scoreNum) || scoreNum < 1 || scoreNum > 45) {
      setError("Score must be between 1 and 45 (Stableford format).")
      return
    }

    const isDuplicate = scores.some(s => s.date === newDate)
    if (isDuplicate) {
      setError("A score for this date already exists. Edit or delete the existing entry.")
      return
    }

    const newEntry: Score = { id: Date.now(), date: newDate, score: scoreNum }
    const updated = [newEntry, ...scores]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)

    setScores(updated)
    if (onScoresChange) onScoresChange(updated.length)
    setNewScore("")
    setNewDate("")
  }

  const handleDelete = (id: number) => {
    const updated = scores.filter(s => s.id !== id)
    setScores(updated)
    if (onScoresChange) onScoresChange(updated.length)
  }

  const chartData = [...scores].reverse().map((s, i) => ({ name: `Entry ${i + 1}`, value: s.score, date: s.date }))
  const avgScore = scores.length > 0 ? (scores.reduce((sum, s) => sum + s.score, 0) / scores.length).toFixed(1) : "0.0"

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="premium-card flex flex-col h-full group p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-display font-medium text-white flex items-center gap-2 tracking-tight">
            <Target className="w-5 h-5 text-[var(--color-primary)]" /> Stableford Score Tracker
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-1 font-medium tracking-wide">Rolling 5-Score Buffer · Stableford Format · Range: 1–45</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-display font-bold text-white tracking-tight">{avgScore} <span className="text-sm text-[var(--color-text-muted)] font-medium">Avg</span></p>
          <p className="text-[10px] text-[var(--color-text-muted)] mt-1">{scores.length}/5 entries</p>
        </div>
      </div>

      <div className="h-[100px] w-full mb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent rounded-xl border border-white/5 pointer-events-none" />
        {scores.length > 1 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip contentStyle={{ backgroundColor: "rgba(15,23,42,0.9)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px", color: "#fff" }} itemStyle={{ color: "var(--color-primary)" }} />
              <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-[var(--color-text-muted)] text-xs font-medium">
            <Activity className="w-4 h-4 mr-2" /> Add at least 2 scores to visualise trend
          </div>
        )}
      </div>

      <form onSubmit={handleAddScore} className="flex gap-2 mb-3 p-2 rounded-xl bg-[var(--color-surface)] border border-white/5 shadow-inner">
        <div className="flex-1 relative">
          <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full pl-9 bg-transparent border-none font-medium text-xs text-white h-10 shadow-none focus-visible:ring-0" max={new Date().toISOString().split("T")[0]} />
        </div>
        <div className="w-px bg-white/10 my-2" />
        <div className="w-24 relative">
          <TrendingUp className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <Input type="number" placeholder="Score (1-45)" min="1" max="45" value={newScore} onChange={e => setNewScore(e.target.value)} className="w-full pl-8 bg-transparent border-none font-display font-medium text-sm text-[var(--color-primary)] h-10 shadow-none focus-visible:ring-0 placeholder:text-gray-600" />
        </div>
        <Button type="submit" size="icon" className="shrink-0 h-10 w-10 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-[0_4px_14px_rgba(16,185,129,0.3)]">
          <Plus className="w-5 h-5" />
        </Button>
      </form>

      {error && (
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 px-3 py-2 mb-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <p className="text-[11px] text-red-400 font-medium">{error}</p>
        </motion.div>
      )}

      <div className="flex gap-2 justify-between mt-2">
        {[0, 1, 2, 3, 4].map((idx) => {
          const s = scores[idx]
          return (
            <div key={idx} className="flex-1">
              <AnimatePresence mode="popLayout">
                {s ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    key={s.id}
                    className="bg-gradient-to-b from-white/[0.06] to-transparent border border-white/10 rounded-xl p-2 flex flex-col items-center justify-center h-20 relative overflow-hidden group/card"
                  >
                    {idx === 0 && <div className="absolute top-0 left-0 w-full h-0.5 bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />}
                    <span className="font-display font-semibold text-lg text-white mb-0.5 group-hover/card:scale-110 transition-transform cursor-default">{s.score}</span>
                    <span className="text-[9px] text-[var(--color-text-muted)] font-medium truncate w-full text-center">{new Date(s.date + "T12:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
                    <button onClick={() => handleDelete(s.id)} className="absolute top-1.5 right-1.5 w-4 h-4 opacity-0 group-hover/card:opacity-100 transition-opacity text-red-400/70 hover:text-red-400">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key={`empty-${idx}`} className="border border-dashed border-white/10 rounded-xl p-2 flex items-center justify-center h-20 bg-white/[0.01]">
                    <div className="w-2 h-2 rounded-full bg-white/5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
// Score buffer capped at 5 per PRD §05
