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
            "Wander is a wellness app designed to combat digital fatigue and unlock imagination through sound and a series of exercises.",
        year: "2025",
        role: "UX/UI Design, Audio, Animation, Development",
        client: "BrainStation | Capstone",
        details: {subheader: "process", process: "talk about the wander process", impact: "talk about the impact of wander"},
        url: "https://yvonnelutrinh.github.io/wander/",
        tech: ["React", "Javascript", "SCSS", "Node", "Express", "SQL", "Gemini API", "Motion", "Tone", "Howler", "Chroma", "Color", "Random-words", "Mobx", "Figma"]
    },
    "creative-world": {
        title: "CREATIVE WORLD",
        description: "A responsive e-commerce website for Corex Creative's brand expansion project, revealing a less commonly seen side of the brand. Managed entire project lifecycle from user research to Figma prototyping and final implementation in Webflow.",
        year: "2024",
        role: "UX/UI Design, No-Code Development",
        client: "Corex Creative",
        tech: ["Figma", "Webflow", "HTML", "CSS"],
        details: {subheader: "process", process: "talk about the process", impact: "talk about the impact"}
    },
    "biz-bot": {
        title: "BIZBOT",
        description:
            "BizBot.AI provides AI adoption recommendations tailored to small business needs, leveraging Gemini to help businesses automate tasks, optimize operations, and make smarter decisions. Built during a 24-hour hackathon by Yvonne Lu Trinh, Ademidé Akinsefunmi, Alexandria Nancoo-Balkaran, Brigid Corey, Toshi Biswas, Quynh Do, and Vivian Cao",
        year: "2025",
        role: "Development, Design",
        client: "Microsoft | BrainStation",
        url: "https://yvonnelutrinh.github.io/microsoft-hackathon-bizbot/",
        tech: ["React", "Javascript", "Gemini API", "Figma"],
        details: {subheader: "process", process: "talk about the process", impact: "talk about the impact"}
    },
    "poke-valentine": {
        title: "POKÉMON VALENTINE",
        description:
            "A simple web app that generates custom downloadable Pokémon Valentine's cards. Built during a 24-hour hackathon by Jiin Park, Zuya Abro, and Yvonne Lu Trinh",
        year: "2025",
        role: "Development, Responsive Styling",
        client: "BrainStation",
        tech: ["Javascript", "HTML", "SCSS", "PokéAPI", "html2canvas"],
        url: "https://yvonnelutrinh.github.io/pokemon-valentine/",
        details: {subheader: "process", process: "talk about the process", impact: "talk about the impact"}
    },
    "development": {
        title: "RESPONSIVE DEVELOPMENT",
        description:
            "Responsive websites developed from provided designer style guides and mockups.",
        year: "2025",
        role: "Development",
        client: "BrainStation | Projects",
        tech: ["React", "Javascript", "SCSS", "Node", "Express", "SQL"],
        details: {subheader: "process", process: "talk about the process", impact: "talk about the impact"}
    },
    "ux": {
        title: "SPORIFY/UX",
        description:
            "Sporify is an all-in-one learning platform designed to guide users through the art and science of safe mushroom foraging. Sporify addresses real user needs, transforming user research derived pain points into comprehensive functionality within intuitive user experience.",
        year: "2024",
        role: "UI/UX Design, Prototyping",
        client: "OCAD | Projects",
        tech: ["Figma", "Adobe", "Canva", "Photoshop"],
        details: {subheader: "process", process: "talk about the process", impact: "talk about the impact"}
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
                                        <h2 className="text-gray-500 mb-1">YEAR</h2>
                                        <p>{project.year}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-gray-500 mb-1">ROLE</h2>
                                        <p>{project.role}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-gray-500 mb-1">CLIENT</h2>
                                        <p>{project.client}</p>
                                    </div>

                                    {project.tech && (<div>
                                        <h2 className="text-gray-500 mb-1">TECH STACK</h2>
                                        <div className="grid grid-cols-2 gap-x-4">
                                            {project.tech.map((item: string) => (<p className=" text-nowrap">{item}</p>))
                                            }
                                        </div>
                                    </div>)}
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
                                <h2 className="font-display text-4xl md:text-6xl mb-8">{project.details.subheader}</h2>
                                <p className="text-xl mb-8">
                                    {project.details.process}
                                </p>
                                <p className="text-xl">
                                    {project.details.impact}
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
