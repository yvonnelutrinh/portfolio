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
                                I blend design and code to build experiences that matter. What drives me isn't just making things look good—it's creating digital spaces where storytelling meets functionality. The sweet spot? When users don't even notice the technology because the experience feels so intuitive.
                            </p>
                            <p className="text-xl mb-4">
                                My 7+ years across marketing, communications, and creative technology have taught me something crucial: beautiful design without purpose is just decoration. Working in arts, nonprofits, and government shaped my belief that technology should amplify human potential, not replace it—creating connections that serve real community needs.
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
