"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

export function Typewriter({
  text,
  delay = 0,
  className = ""
}: {
  text: string
  delay?: number
  className?: string
}) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
          hidden: {}
        }}
        aria-hidden="true"
        className="inline-flex flex-wrap"
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)" }
            }}
            transition={{ duration: 0.3 }}
            className={char === " " ? "w-[0.25em]" : ""}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </span>
  )
}
