import { motion } from "motion/react"
import Navigation from "../../components/Navigation/Navigation"
import Terminal from "../../components/Terminal/Terminal"

export default function Process() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-16">
        <motion.h1
          className="font-display text-6xl md:text-9xl mb-16 md:mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          PROCESS
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-4xl mb-8">METHODOLOGY</h2>
            <p className="text-xl mb-8">
              My process blends systematic design thinking with intentional development early in the process, creating a framework that
              balances structure and creative freedom.
            </p>
            <p className="text-xl mb-8">
              Each project begins with deep research and conceptual development, establishing a strong foundation before
              moving into visual exploration and functionality.
            </p>
            <p className="text-xl">
              The final execution phase focuses on refining details and ensuring that every element serves both
              aesthetic and functional purposes.
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
