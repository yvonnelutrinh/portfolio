import React from "react"
import { useState } from "react"
import { motion } from "motion/react"
import { HeaderNav } from "../../components/Navigation/Navigation"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState<"slow" | "medium" | "fast">("medium")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Determine typing speed
    const now = Date.now()
    if (!lastTypedRef.current) {
      lastTypedRef.current = now
      return
    }

    const timeDiff = now - lastTypedRef.current
    lastTypedRef.current = now

    if (timeDiff < 100) {
      setTypingSpeed("fast")
    } else if (timeDiff < 300) {
      setTypingSpeed("medium")
    } else {
      setTypingSpeed("slow")
    }
  }

  const lastTypedRef = React.useRef<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <HeaderNav />

      <main className="container mx-auto px-4 pt-32 pb-16">
        <motion.h1
          className="font-display text-6xl md:text-9xl mb-16 md:mb-32 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          CONTACT
        </motion.h1>

        <div className="max-w-2xl mx-auto">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="font-display text-4xl mb-4">MESSAGE RECEIVED</h2>
              <p className="text-xl">Thank you for reaching out. I'll get back to you soon.</p>

              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-8 bg-white text-black hover:bg-gray-200"
                data-cursor-hover
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-sm font-mono mb-2">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full bg-transparent border-b border-white p-2 focus:outline-none font-mono
                    ${
                      typingSpeed === "slow"
                        ? "transition-all duration-500"
                        : typingSpeed === "medium"
                          ? "transition-all duration-300"
                          : "transition-all duration-100"
                    }`}
                  data-cursor-hover
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-mono mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full bg-transparent border-b border-white p-2 focus:outline-none font-mono
                    ${
                      typingSpeed === "slow"
                        ? "transition-all duration-500"
                        : typingSpeed === "medium"
                          ? "transition-all duration-300"
                          : "transition-all duration-100"
                    }`}
                  data-cursor-hover
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-mono mb-2">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full bg-transparent border-b border-white p-2 focus:outline-none font-mono
                    ${
                      typingSpeed === "slow"
                        ? "transition-all duration-500"
                        : typingSpeed === "medium"
                          ? "transition-all duration-300"
                          : "transition-all duration-100"
                    }`}
                  data-cursor-hover
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-8 relative overflow-hidden group ${
                    isSubmitting ? "bg-gray-800" : "bg-white text-black hover:bg-gray-200"
                  }`}
                  data-cursor-hover
                >
                  <span
                    className={`inline-block transition-transform duration-300 ${
                      isSubmitting ? "animate-pulse" : "group-hover:scale-110"
                    }`}
                  >
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                  </span>

                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-1 bg-black"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isSubmitting ? 1 : 0 }}
                    transition={{ duration: 2 }}
                  />
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}