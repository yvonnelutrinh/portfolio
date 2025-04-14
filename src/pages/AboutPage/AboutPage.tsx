import { motion } from "motion/react"
import Skills from "../../components/Skills/Skills"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import PointillismPortrait from "../../components/PointillismPortrait/PointillismPortrait"

export default function About() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-black text-white">
                <main className="container mx-auto px-4 pt-32 pb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center font-display text-6xl lg:text-8xl">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                            <motion.h1
                                className="mb-4"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                END-TO-END PROJECT BUILDER
                            </motion.h1>

                            <div className="h-px w-full bg-white mb-8" />

                            <p className="text-xl mb-4">
                                I'm a multidisciplinary designer-developer crafting immersive digital experiences where innovation meets intuitive functionality. My work lives at the intersection of thoughtful design and interactive storytelling—creating digital spaces that engage and perform.
                            </p>
                            <p className="text-xl">
                                With 7+ years spanning marketing, digital communications, and creative tech, I transform artistic vision into measurable business impact. My background in arts, nonprofit, and municipal sectors shapes my human-centered approach to technology—one that elevates user experience while serving broader community needs.
                            </p>
                        </motion.div>

                        {/* self portrait placeholder*/}
                        <motion.div
                            className="flex items-center justify-center"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="relative border-2 border-gray-800 shadow-md transition-shadow duration-300 hover:shadow-xl overflow-hidden flex items-center justify-center bg-gray-900">
                                <PointillismPortrait />
                            </div>
                        </motion.div>
                    </div>

                    <Skills />
                </main>
                <Footer />
            </div>
        </>
    )
}
