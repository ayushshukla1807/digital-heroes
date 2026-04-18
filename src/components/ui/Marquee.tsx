"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

export function Marquee({
  children,
  speed = 40,
  direction = "left"
}: {
  children: ReactNode[]
  speed?: number
  direction?: "left" | "right"
}) {
  return (
    <div className="relative w-full overflow-hidden flex whitespace-nowrap mask-edges">
      {/* 
        mask-edges requires globals.css standard tailwind mask extension, 
        or we can just define linear gradient inline here for ease and strict safety.
      */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[var(--color-background)] via-transparent to-[var(--color-background)] w-full block" />
      
      <motion.div
        className="flex shrink-0 items-center gap-12 px-6"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      >
        {/* We double the children array so it can loop perfectly */}
        {children.map((child, i) => <div key={`orig-${i}`} className="shrink-0">{child}</div>)}
        {children.map((child, i) => <div key={`dup-${i}`} className="shrink-0">{child}</div>)}
      </motion.div>
    </div>
  )
}
