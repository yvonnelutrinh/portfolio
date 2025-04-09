import { motion } from "motion/react"
import Navigation from "../../components/Navigation/Navigation"
import TextDistortion from "../../components/TextDistortion/TextDistortion"

export default function About() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navigation />

            <main className="container mx-auto px-4 pt-32 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                        <TextDistortion text="DESIGNER" className="font-display text-6xl md:text-8xl mb-4" tag="h1" />
                        <TextDistortion text="DEVELOPER" className="font-display text-6xl md:text-8xl mb-4" tag="h1" />
                        <TextDistortion text="CREATOR" className="font-display text-6xl md:text-8xl mb-8" tag="h1" />

                        <div className="h-px w-full bg-white mb-8" />

                        <p className="text-xl mb-4">
                            I'm a multidisciplinary designer and developer focused on creating immersive digital experiences that
                            challenge conventional design.
                        </p>
                        <p className="text-xl">
                            My work explores the intersection of user-centered design and interactive storytelling,
                            creating digital spaces that feel both intuitive and delightful.
                        </p>
                    </motion.div>

                    <motion.div
                        className="h-[70vh] bg-gray-900 flex items-center justify-center"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <p className="font-mono text-sm text-gray-500">self portrait</p>
                    </motion.div>
                </div>

                {/* skills section */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div>
                        <div>
                            <h2 className="font-display text-2xl mb-4">DEVELOPMENT</h2>
                            <ul className="space-y-2 text-gray-400">
                                <li>Full Stack Development</li>
                                <li>Javascript / React / SCSS</li>
                                <li>Node / Express / SQL</li>
                                <li>Jest, ViTest</li>
                                <li>Heroku, Netlify</li>
                            </ul>
                        </div>

                        <h2 className="font-display text-2xl mb-4">DESIGN</h2>
                        <ul className="space-y-2 text-gray-400">
                            <li>Typography</li>
                            <li>Art Direction</li>
                            <li>Motion Design</li>
                            <li>UI/UX</li>
                            <li>Brand Identity</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-display text-2xl mb-4">TOOLS</h2>
                        <ul className="space-y-2 text-gray-400">
                            <li>Figma</li>
                            <li>Adobe Creative Suite</li>
                            <li>DAWs</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    )
}
