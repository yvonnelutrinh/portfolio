import { useRef, useEffect } from "react"

interface TextBannerProps {
  text: string
  className?: string
  speed?: number
  repeat?: number
}

export default function TextBanner({ text, className = "", speed = 20, repeat = 4 }: TextBannerProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!marqueeRef.current || !contentRef.current) return

    const marqueeWidth = marqueeRef.current.offsetWidth
    const contentWidth = contentRef.current.offsetWidth

    // animate if content is wider than container
    if (contentWidth > marqueeWidth) {
      contentRef.current.style.animationDuration = `${contentWidth / speed}s`
    } else {
      contentRef.current.style.animation = "none"
      contentRef.current.style.marginLeft = "auto"
      contentRef.current.style.marginRight = "auto"
    }
  }, [speed, text])

  const repeatedText = Array(repeat).fill(text).join(" // ")

  return (
    <div ref={marqueeRef} className={`marquee overflow-hidden ${className}`}>
      {/* read the text once to screen readers; the moving repeats are decorative */}
      <span className="sr-only">{text}</span>
      <div ref={contentRef} className="marquee-content inline-block" aria-hidden="true" data-cursor-hover>
        {repeatedText}
      </div>
    </div>
  )
}
