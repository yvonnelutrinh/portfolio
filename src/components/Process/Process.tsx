import { motion } from "motion/react"
import Terminal from "../Terminal/Terminal"

export default function Process() {
  return (
    <div className="min-h-screen bg-black text-white">

      <main className="container mx-auto pt-32 pb-16">
        <motion.h2
          className="font-display text-3xl lg:text-6xl mb-16 md:mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          PROCESS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-xl">
              I don't just hand off wireframes or code. I'm in it from rough sketches to launch day and beyond. This end-to-end involvement is about crafting coherent experiences where each decision builds on the last. The most elegant solutions often emerge from constraints, and the best work happens when we balance bold vision with practical delivery.
            </p>
          </div>

          <div>
            <Terminal />
          </div>
        </div>

        {/* process boxes */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-gray-900 p-8 h-[300px] flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-display text-2xl mb-4">01. RESEARCH</h3>
            <p className="text-gray-400 mb-4">Deep dive into context, references, and constraints</p>
            <div className="mt-auto">
              <div className="h-1 bg-white w-full" />
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-900 p-8 h-[300px] flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl mb-4">02. CONCEPT</h3>
            <p className="text-gray-400 mb-4">Develop core ideas and establish visual direction</p>
            <div className="mt-auto">
              <div className="h-1 bg-white w-full" />
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-900 p-8 h-[300px] flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-display text-2xl mb-4">03. EXECUTION</h3>
            <p className="text-gray-400 mb-4">Refine details and deliver final implementation</p>
            <div className="mt-auto">
              <div className="h-1 bg-white w-full" />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
