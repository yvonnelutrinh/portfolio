import { useState } from "react"
import { motion } from "motion/react"
import { Link } from "react-router-dom"

interface NavCardProps {
  title: string
  slug: string
  index: number
}

export default function NavigationCards({ title, slug, index }: NavCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative mb-8 md:mb-16"
    >
      <Link to={`/work/${slug}`}>
        <motion.div
          className="relative z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-cursor-hover
        >
          <motion.h2
            className="font-display text-5xl md:text-8xl tracking-wider"
            animate={{
              skew: isHovered ? [0, -5, 5, 0] : 0,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h2>

          <motion.div
            className="absolute -bottom-2 left-0 h-0.5 bg-white"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900 to-transparent opacity-0"
        animate={{ opacity: isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
