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
              I don't just hand off wireframes or code. I'm in it from rough sketches to launch day and beyond. This end-to-end involvement is about crafting coherent experiences where each decision builds on the last. My process integrates strategic research, thoughtful project management, and technical execution, finding those unexpected connections between user needs and business goals. The most elegant solutions often emerge from constraints, and the best work happens when we balance bold vision with practical delivery.
            </p>
            <h3 className="text-xl font-bold mt-8 mb-4">LIFE BEYOND THE SCREEN</h3>
            <div className="text-gray-300 mb-6">
              <p>When I'm not designing digital experiences, you'll find me carving down mountains as a newbie snowboarder or carefully identifying fungi on forest hikes. I'm also a visual mixed media artist in collage, and I create immersive sound experiences as a DJ and sound bath facilitator. I believe creativity flows through multiple dimensions, extending well beyond the digital space we often inhabit.</p>
              <div className="my-4"></div>


              <p>This balance of technical work and tactile adventure keeps my perspective fresh and human-centered. My curiosity drives continuous exploration about our place in this world and how we can collectively make meaningful impact. Let's <Link to="#contact" className="text-white underline hover:text-neon transition-colors">connect</Link> and share ideas about tech, design, art, or our latest adventures.</p>
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
                <h3 className="font-display text-lg mb-1">07. TRACK</h3>
                {/* <p className="text-gray-300 text-xs">Analyze metrics, gather feedback, and continuously improve the product</p> */}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
