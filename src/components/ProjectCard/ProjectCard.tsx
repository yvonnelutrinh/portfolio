import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

interface ProjectCardProps {
  title: string
  slug: string
  index: number
}

export default function ProjectCard({ title, slug, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // animation sequence for touch devices
  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // prevent navigation until animation completes on touch
    if (('ontouchstart' in window || navigator.maxTouchPoints > 0) && !isHovered) {
      e.preventDefault();
      setIsNavigating(true);
      
      // navigate after animation finishes
      setTimeout(() => {
        window.location.href = `/work/${slug}`;
      }, 600); // matches animation duration
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
          className="relative z-10 py-2 px-1" // larger touch target
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-cursor-hover
        >
          <motion.h2
            className="text-xl md:text-2xl tracking-wider whitespace-nowrap overflow-hidden text-ellipsis max-w-100vw"
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
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
