import { useState, useRef, useEffect } from "react"
import { motion } from "motion/react"

interface TextDistortionProps {
  text: string
  className?: string
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
}

export default function TextDistortion({ text, className = "", tag = "h1" }: TextDistortionProps) {
  const [isHovered, setIsHovered] = useState(false)
  const letters = Array.from(text)
  const containerRef = useRef<HTMLDivElement>(null)

  const Tag = tag

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovered) return

      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      const letters = containerRef.current.querySelectorAll(".letter")
      letters.forEach((letter, index) => {
        const letterEl = letter as HTMLElement
        const factor = index / letters.length

        letterEl.style.transform = `translate(${(x - 0.5) * 20 * factor}px, ${(y - 0.5) * 20 * factor}px) rotate(${(x - 0.5) * 10}deg)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isHovered])

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        if (containerRef.current) {
          const letters = containerRef.current.querySelectorAll(".letter")
          letters.forEach((letter) => {
            const letterEl = letter as HTMLElement
            letterEl.style.transform = "translate(0, 0) rotate(0deg)"
          })
        }
      }}
      data-cursor-hover
    >
      <motion.div className="flex flex-wrap" variants={container} initial="hidden" animate="visible">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className={`letter inline-block transition-transform duration-300 ${letter === " " ? "w-4" : ""}`}
            style={{ transformOrigin: "center center" }}
          >
            <Tag className="inline-block">{letter === " " ? "\u00A0" : letter}</Tag>
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
