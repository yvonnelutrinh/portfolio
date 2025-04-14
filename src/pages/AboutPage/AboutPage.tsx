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
                                Yvonne is a multidisciplinary designer, developer, and project strategist focused on creating immersive digital experiences that challenge conventional design. Their work explores the intersection of user-centered design and interactive storytelling, creating functional and engaging spaces that feel both intuitive and delightful.
                            </p>
                            <p className="text-xl">
                                With over seven years of experience in marketing, web communications, and multidisciplinary arts, Yvonne seamlessly integrates their artistic skills into business value. Rooted in a profound sense of engagement within the arts, nonprofits, and municipal government, they seek to continuously improve their craft to better serve their communities.
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
