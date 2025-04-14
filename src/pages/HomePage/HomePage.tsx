import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { HeaderNav, HomePageNav } from "../../components/Navigation/Navigation"
import TextDistortion from '../../components/TextDistortion/TextDistortion'
import Footer from "../../components/Footer/Footer"
import ScrollToAnchor from "../../components/ScrollToAnchor/ScrollToAnchor"
import Banner from "../../components/Banner/Banner"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <ScrollToAnchor />
      <HeaderNav />
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <main className="relative">
          {/* hero section */}
          <section className="h-screen flex flex-col justify-center items-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="relative z-10 max-w-5xl mx-auto"
            >
              <TextDistortion text="YVONNE LU TRINH" className="text-center mb-8" tag="h1" />

              <motion.p
                className="text-xl md:text-2xl text-center max-w-2xl mx-auto typewriter"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, delay: 1 }}
              >
                Creative Developer & Designer
              </motion.p>
              <HomePageNav />
              <div className="mt-4 md:mt-6 lg:mt-8">
                <Banner />
              </div>
            </motion.div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  )
}