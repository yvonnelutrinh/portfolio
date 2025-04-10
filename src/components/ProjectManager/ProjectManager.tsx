import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { HeaderNav } from "../Navigation/Navigation"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import Footer from "../Footer/Footer"
import TitleScroll from "../TitleScroll/TitleScroll"

// project data
const projectsData = {
    "wander": {
        title: "WANDER",
        description:
            "A typographic exploration of brutalist design principles, creating a visual language that's both raw and refined.",
        year: "2023",
        role: "Design, Typography, Motion",
        client: "Self-initiated",
    },
    "creative-world": {
        title: "CREATIVE WORLD",
        description: "An immersive digital experience that brings cinematic depth and movement to interactive design.",
        year: "2022",
        role: "Art Direction, Motion Design",
        client: "Film Festival",
    },
    "biz-bot": {
        title: "BIZBOT",
        description:
            "Experimental typography that pushes the boundaries of legibility while maintaining a strong visual hierarchy.",
        year: "2023",
        role: "Typography, Design",
        client: "Publishing House",
    },
    "poke-valentine": {
        title: "POKÉMON VALENTINE",
        description:
            "A study in using emptiness as a design element, creating tension and focus through strategic use of white space.",
        year: "2022",
        role: "Design, Art Direction",
        client: "Art Gallery",
    },
    "development": {
        title: "RESPONSIVE DEVELOPMENT",
        description:
            "Exploring the intersection of static design and fluid motion, creating a dynamic visual system that responds to user interaction.",
        year: "2023",
        role: "Motion Design, Interaction",
        client: "Tech Startup",
    },
    "ux": {
        title: "SPORIFY/UX",
        description:
            "Exploring the intersection of static design and fluid motion, creating a dynamic visual system that responds to user interaction.",
        year: "2023",
        role: "Motion Design, Interaction",
        client: "Tech Startup",
    },
}

export default function ProjectPage() {
    const params = useParams()
    const slug = params?.id as string
    const [project, setProject] = useState<any>(null)
    let navigate = useNavigate();

    useEffect(() => {
        if (slug && projectsData[slug as keyof typeof projectsData]) {
            setProject(projectsData[slug as keyof typeof projectsData])
        }
        else { navigate("/project-not-found") }
    }, [slug])

    return (
        <>
            {project && (<div className="min-h-screen bg-black text-white">
                <header>
                    <HeaderNav />
                    <Link
                        to="/work"
                        className="fixed top-8 left-8 z-30 flex items-center text-sm font-mono hover:text-gray-400 transition-colors"
                        data-cursor-hover
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        BACK TO WORK
                    </Link>
                </header>
                <main>
                    {/* hero section */}
                    <section className="h-screen flex flex-col justify-center relative overflow-hidden">
                        <TitleScroll >
                            <h1 className="text-center font-display text-8xl md:text-[12rem] whitespace-nowrap">{project.title}</h1>
                        </TitleScroll>

                        <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </section>

                    {/* Project Details */}
                    <section className="container mx-auto px-4 py-16 md:py-32">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div>
                                <p className="text-xl md:text-2xl mb-8">{project.description}</p>

                                <div className="grid grid-cols-2 gap-8 text-sm font-mono">
                                    <div>
                                        <p className="text-gray-500 mb-1">YEAR</p>
                                        <p>{project.year}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-1">ROLE</p>
                                        <p>{project.role}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-1">CLIENT</p>
                                        <p>{project.client}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[50vh] bg-gray-900 flex items-center justify-center">
                                <p className="font-mono text-sm text-gray-500">Project visuals would appear here</p>
                            </div>
                        </div>
                    </section>

                    {/* Full Width Image Section */}
                    <section className="h-[80vh] bg-gray-900 flex items-center justify-center my-16">
                        <p className="font-mono text-sm text-gray-500">Full width project visual would appear here</p>
                    </section>

                    {/* Additional Content */}
                    <section className="container mx-auto px-4 py-16 md:py-32">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="h-[40vh] bg-gray-900 flex items-center justify-center">
                                <p className="font-mono text-sm text-gray-500">Additional project visual</p>
                            </div>

                            <div>
                                <h2 className="font-display text-4xl md:text-6xl mb-8">PROJECT APPROACH</h2>
                                <p className="text-xl mb-8">
                                    The design approach focused on creating tension between brutalist typography and cinematic movement,
                                    establishing a visual language that's both disruptive and refined.
                                </p>
                                <p className="text-xl">
                                    Each element was carefully considered to balance raw expression with intentional design decisions,
                                    creating a system that feels both experimental and purposeful.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </div >)}
            <Footer />
        </>
    )
}
