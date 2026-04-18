"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, CheckCircle, Clock, FileImage, X, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

type ProofStatus = "idle" | "uploaded" | "pending" | "approved" | "rejected"

export function WinnerProofUpload({ drawDate, prizeAmount }: { drawDate: string; prizeAmount: number }) {
  const [status, setStatus] = useState<ProofStatus>("idle")
  const [fileName, setFileName] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return
    setFileName(file.name)
    setStatus("uploaded")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleSubmit = () => {
    if (status !== "uploaded") return
    setStatus("pending")
  }

  const handleClear = () => {
    setFileName("")
    setStatus("idle")
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="premium-card p-6 bg-white/[0.01] border-[var(--color-accent)]/20">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-[var(--color-accent)]" />
          </div>
          <div>
            <h3 className="font-display font-medium text-white text-base tracking-tight">Winner Verification</h3>
            <p className="text-[10px] text-[var(--color-text-muted)] font-semibold uppercase tracking-wider mt-0.5">Proof of Score Submission</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-display font-semibold text-[var(--color-accent)]">₹{prizeAmount.toLocaleString()}</p>
          <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{drawDate}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === "idle" || status === "uploaded" ? (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                  : status === "uploaded"
                  ? "border-[var(--color-primary)]/40 bg-[var(--color-primary)]/[0.02]"
                  : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
              }`}
            >
              <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }} />
              {status === "uploaded" ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileImage className="w-5 h-5 text-[var(--color-primary)]" />
                    <span className="text-sm font-medium text-white truncate max-w-[180px]">{fileName}</span>
                  </div>
                  <button onClick={e => { e.stopPropagation(); handleClear() }} className="text-[var(--color-text-muted)] hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-[var(--color-text-muted)] mx-auto mb-3" />
                  <p className="text-sm font-medium text-white mb-1">Upload screenshot of your golf scores</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Drag & drop or click to browse · PNG, JPG accepted</p>
                </>
              )}
            </div>
            {status === "uploaded" && (
              <Button onClick={handleSubmit} className="w-full mt-3 h-11 bg-[var(--color-accent)] hover:bg-amber-400 text-gray-900 font-semibold text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(245,158,11,0.2)]">
                Submit for Admin Review
              </Button>
            )}
          </motion.div>
        ) : status === "pending" ? (
          <motion.div key="pending" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center py-4 gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <p className="text-white font-display font-medium">Proof Submitted</p>
            <p className="text-xs text-[var(--color-text-muted)] max-w-xs">Your screenshot has been sent to admin for review. Payment state: <span className="text-amber-400 font-semibold">Pending → Paid</span></p>
          </motion.div>
        ) : status === "approved" ? (
          <motion.div key="approved" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center py-4 gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <p className="text-white font-display font-medium">Approved — Payment Processing</p>
            <p className="text-xs text-[var(--color-text-muted)]">Your payout of <span className="text-[var(--color-primary)] font-semibold">₹{prizeAmount.toLocaleString()}</span> is being processed.</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}
