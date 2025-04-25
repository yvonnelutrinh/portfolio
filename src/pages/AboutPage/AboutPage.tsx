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
                                I build at the intersection of design and code. Why? Because that's where digital experiences transform from functional to meaningful. It's not just about clean lines or clever animations—it's about creating spaces where stories unfold naturally and technology serves a clear purpose. Ever used something that just "clicked" from the first moment? That's what I'm after.
                            </p>
                            <p className="text-xl mb-4">
                                Seven years across marketing, creative tech, and communications taught me this: purpose trumps pretty every time. My work in arts organizations, nonprofits, and government shaped how I approach every project. Tech should amplify what makes us human, not replace it. Can code build community? Absolutely—when it connects to genuine needs and creates space for real interaction.
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
