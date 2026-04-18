"use client"

import { useEffect, useState } from "react"

export const Meteors = ({ number = 20 }: { number?: number }) => {
  const [meteors, setMeteors] = useState<
    { id: number; top: number; left: number; delay: number; duration: number }[]
  >([])

  useEffect(() => {
    const newMeteors = new Array(number).fill(true).map((_, i) => ({
      id: i,
      top: -50,
      left: Math.floor(Math.random() * (window.innerWidth + 500)) - 500,
      delay: Math.random() * 5 + 0.5,
      duration: Math.random() * 8 + 2,
    }))
    setMeteors(newMeteors)
  }, [number])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
          style={{
            top: m.top,
            left: m.left,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
            animationName: "meteor",
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
      <style>{`
        @keyframes meteor {
          0% { transform: rotate(215deg) translateX(0); opacity: 1; }
          70% { opacity: 1; }
          100% {
            transform: rotate(215deg) translateX(-1000px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
