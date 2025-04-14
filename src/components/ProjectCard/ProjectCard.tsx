import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

interface NavCardProps {
  title: string
  slug: string
  index: number
}

export default function NavigationCards({ title, slug, index }: NavCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Handle animation sequence for touch devices
  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // For touch devices, prevent navigation until animation completes
    if (('ontouchstart' in window || navigator.maxTouchPoints > 0) && !isHovered) {
      e.preventDefault();
      setIsNavigating(true);
      
      // Set a timeout to navigate after animation completes
      setTimeout(() => {
        window.location.href = `/work/${slug}`;
      }, 600); // Slightly longer than animation duration
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative mb-4 md:mb-8"
    >
      <Link 
        to={`/work/${slug}`}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
      >
        <motion.div
          className="relative z-10 py-2 px-1" // Increased padding for better touch target
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-cursor-hover
        >
          <motion.h2
            className="text-md tracking-wider"
            animate={{ x: (isHovered || isTouched || isNavigating) ? 10 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>

          <div className="relative">
            <motion.div
              className="absolute -bottom-2 left-0 h-0.25 bg-white"
              initial={{ width: 0 }}
              animate={{ width: (isHovered || isTouched || isNavigating) ? "100%" : 0 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Arrow at the end of the line */}
            <motion.div
              className="absolute -bottom-2 right-[-8px] text-white"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: (isHovered || isTouched || isNavigating) ? 1 : 0,
                x: (isHovered || isTouched || isNavigating) ? 0 : -10 
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ fontSize: "14px", lineHeight: 1 }}
            >
              →
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
