import { useEffect, useState } from "react"
import { motion } from "motion/react"
import Navigation from "../../components/Navigation/Navigation"
import TextBanner from '../../components/TextBanner/TextBanner'
import TextDistortion from '../../components/TextDistortion/TextDistortion'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <Navigation />

        <main className="relative">
          {/* hero section */}
          <section className="h-screen flex flex-col justify-center items-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="relative z-10 max-w-5xl mx-auto"
            >
              <TextDistortion text="YVONNE LU TRINH" className="text-center mb-8" tag="h1"/>

              <motion.p
                className="text-xl md:text-2xl text-center max-w-2xl mx-auto typewriter"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, delay: 1 }}
              >
                Creative Developer & Designer
              </motion.p>
            </motion.div>
          </section>

          {/* scrolling text section */}
          <section className="py-16 md:py-32">
            <TextBanner
              text="YVONNE LU TRINH · DEVELOPER · DESIGNER · CREATIVE · YVONNE LU TRINH"
              className="text-4xl md:text-6xl font-display tracking-wider"
              speed={15}
            />
          </section>
        </main>
      </div>
    </>
  )
}