import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

interface TitleScrollProps {
  children: React.ReactNode
  direction?: "left" | "right"
  speed?: number
  className?: string
}

export default function TitleScroll({ children, direction = "left", speed = 0.5, className = "" }: TitleScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], direction === "left" ? [0, -100 * speed] : [-100 * speed, 0])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ x }} data-cursor-hover>
        {children}
      </motion.div>
    </div>
  )
}