import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function Process() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto pt-32 pb-16">
        <motion.h2
          className="font-display text-3xl lg:text-6xl mb-8 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          MY PROCESS & PHILOSOPHY
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-gray-300 mb-6">
              I don't drop off wireframes and disappear. I'm there from the first sketch to launch day and beyond. Why? Because the best digital experiences aren't assembled like furniture—they're crafted through hundreds of interconnected decisions. 
              
              My approach weaves together research, strategy, and execution to find those unexpected connections between what users need and what businesses aim for. The constraints of a project? That's where the most interesting solutions happen. Give me a seemingly impossible timeline or technical limitation, and watch what unfolds.
            </p>
            <h3 className="text-xl font-bold mt-8 mb-4">LIFE BEYOND THE SCREEN</h3>
            <div className="text-gray-300 mb-6">
              When I'm not pushing pixels, I'm carving down mountains as a newbie snowboarder or getting lost (intentionally) while identifying fungi on forest hikes. This balance keeps me human. Tech work can trap us in abstractions—sometimes you need to feel actual snow under your board to remember what we're building for.

              I create mixed media collage art and craft immersive sound experiences as both a DJ and sound bath facilitator. Creativity doesn't respect the boundaries we put around it, does it? These seemingly disconnected practices inform each other in surprising ways. Let's <Link to="#contact" className="text-white underline hover:text-neon transition-colors">connect</Link> and swap stories about design philosophy, that weird bug you can't solve, or our latest adventures.
            </div>
          </div>

          <div className="flex items-center">
            <div className="space-y-3 w-full">
              <motion.div 
                className="border border-blue-400/40 p-4 hover:border-blue-400/70 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h3 className="font-display text-lg mb-1">01. RESEARCH</h3>
                {/* <p className="text-gray-300 text-xs">Deep dive into user needs, technical constraints, and competitor analysis</p> */}
              </motion.div>
              
              <motion.div 
                className="border border-blue-400/40 p-4 hover:border-blue-400/70 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h3 className="font-display text-lg mb-1">02. STRATEGY</h3>
                {/* <p className="text-gray-300 text-xs">Define goals, audience, and project scope to guide the creative process</p> */}
              </motion.div>
              
              <motion.div 
                className="border border-blue-400/40 p-4 hover:border-blue-400/70 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h3 className="font-display text-lg mb-1">03. CONCEPT</h3>
                {/* <p className="text-gray-300 text-xs">Develop core ideas through wireframes and establish visual direction</p> */}
              </motion.div>
              
              <motion.div 
                className="border border-blue-400/40 p-4 hover:border-blue-400/70 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h3 className="font-display text-lg mb-1">04. EXECUTE</h3>
                {/* <p className="text-gray-300 text-xs">Craft intuitive interactions and deliver pixel-perfect implementation</p> */}
              </motion.div>
              
              <motion.div 
                className="border border-blue-400/40 p-4 hover:border-blue-400/70 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <h3 className="font-display text-lg mb-1">05. TEST</h3>
                {/* <p className="text-gray-300 text-xs">Validate with users, ensure accessibility and optimize performance</p> */}
              </motion.div>
              
              <motion.div 
                className="border border-blue-400/40 p-4 hover:border-blue-400/70 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <h3 className="font-display text-lg mb-1">06. DEPLOY</h3>
                {/* <p className="text-gray-300 text-xs">Launch with confidence through carefully orchestrated implementation</p> */}
              </motion.div>
              
              <motion.div 
                className="border border-blue-400/40 p-4 hover:border-blue-400/70 transition-colors"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <h3 className="font-display text-lg mb-1">07. ITERATE</h3>
                {/* <p className="text-gray-300 text-xs">Analyze metrics, gather feedback, and continuously improve the product</p> */}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
