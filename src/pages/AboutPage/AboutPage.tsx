import { motion } from "motion/react"
import Skills from "../../components/Skills/Skills"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import PointillismPortrait from "../../components/PointillismPortrait/PointillismPortrait"
import Process from "../../components/Process/Process"

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
                                I connect design and code to create experiences that actually matter. Ever noticed how the best digital products feel almost invisible? That's what I'm after—the sweet spot where you're so engaged with what you're doing that the technology fades into the background.
                            </p>
                            <p className="text-xl mb-4">
                                After 7+ years working across marketing, communications, and creative tech, I've learned that pretty interfaces without purpose are just digital decoration. My time in arts, nonprofits, and government shaped a core belief: technology should amplify human potential, not replace it. What's the point of innovation if it doesn't create meaningful connections or solve real problems?
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
                    <Process />
                </main>
                <Footer />
            </div>
        </>
    )
}
