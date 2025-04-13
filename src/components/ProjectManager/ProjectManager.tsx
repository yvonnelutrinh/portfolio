import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import Footer from "../Footer/Footer"
import TitleScroll from "../TitleScroll/TitleScroll"
import Header from "../Header/Header"
import { ProjectEmbed } from "../ProjectEmbed/ProjectEmbed"

// project data
const projectsData = {
    "wander": {
        title: "WANDER",
        description:
            "Wander is a wellness app designed to combat digital fatigue and unlock imagination through immersive sound and guided exercises.",
        year: "2025",
        role: "UX/UI Design, Audio, Animation, Development",
        client: "BrainStation | Capstone",
        details: { subheader: "process", process: "Extensive research process, collecting design references throughout the process. Proposal with data, libraries, and basic interactive prototype to demonstrate animation. Learned numerous new technologies and architected integrations to create a smooth, unified user experience. Back-end server uses SQL database to handle anonymized user ids, storing user customization preferences for theme and colour palettes.", impact: "Wander offers users a chance to reset, restore, and reimagine through generative sound, calming animations, and a word comparison exercise. Utilizing Gemini API, the user receives a custom proverb to their submitted insights." },
        embed: {
            url: "https://yvonnelutrinh.github.io/wander/",
            width: 1024,
            height: 768,
            scale: 1,
        },
        tech: ["React", "Javascript", "SCSS", "Node", "Express", "SQL", "Gemini API", "Motion", "Tone", "Howler", "Chroma", "Color", "Random-words", "Mobx", "Figma"],
        images: {
            feature: {src: "/wander-breathe.png", alt:"Wander app's breathe page with wave animations, narration text, and volume controls."},
            process: { src:"/wander-process.png", alt:"Wander Process"}
        }
    },
    "creative-world": {
        title: "CREATIVE WORLD",
        description: "A responsive e-commerce website for Corex Creative's brand expansion project, revealing a less commonly seen side of the brand.",
        year: "2024",
        role: "UX/UI Design, No-Code Development",
        client: "Corex Creative",
        tech: ["Figma", "Webflow", "HTML", "CSS"],
        embed: {
            url: "https://yvonnelutrinh.github.io/creative-world",
            width: 1024,
            height: 768,
            scale: 1,
        },
        details: { subheader: "process", process: "Managed entire project lifecycle from user research to Figma prototyping and final implementation in Webflow. Supported client through design process and developing Creative World's brand identity.", impact: "The clean, modern design balances negative space with bright visuals to showcase the brand's bold offerings. The final result is sleek yet community-grounded, tailored to the preferences of the brand's target audience." }
    },
    "biz-bot": {
        title: "BIZBOT",
        description:
            "BizBot provides AI adoption recommendations tailored to small business needs, leveraging Gemini to help businesses automate tasks, optimize operations, and make smarter decisions.",
        year: "2025",
        role: "Development, Design",
        client: "Microsoft | BrainStation",
        embed: {
            url: "https://yvonnelutrinh.github.io/microsoft-hackathon-bizbot/",
            width: 1024,
            height: 768,
            scale: 1,
        },
        tech: ["React", "Javascript", "Gemini API", "Figma"],
        credit: "Built during a 24-hour hackathon by Yvonne Lu Trinh, Ademidé Akinsefunmi, Alexandria Nancoo-Balkaran, Brigid Corey, Toshi Biswas, Quynh Do, and Vivian Cao.",
        details: { subheader: "process", process: "Set up FigJam board to manage the brainstorming and collaboration process between seven developers. Pitched the final idea for BizBot, and developed initial form functionality with LLM response to demonstrate feasibility to team. Collaborated with another developer to refine prompting and report format through specific formatting injected in Gemini response. Created wireframes and mockups for team to parallelize tasks, flushing out functionality and basic design.", impact: "Presented consistent working demo to panel of Microsoft judges, successfully responding to technical inquiries." }
    },
    "poke-valentine": {
        title: "POKÉMON VALENTINE",
        description:
            "A simple responsive web app that generates custom downloadable Pokémon Valentine's cards.",
        year: "2025",
        role: "Development, Responsive Styling",
        client: "BrainStation",
        tech: ["Javascript", "HTML", "SCSS", "PokéAPI", "html2canvas"],
        credit: "Built during a 24-hour hackathon by Jiin Park, Zuya Abro, and Yvonne Lu Trinh.",
        embed: {
            url: "https://yvonnelutrinh.github.io/pokemon-valentine/",
            width: 1024,
            height: 600,
            scale: 1,
        },
        details: { subheader: "process", process: "Brainstorming in Excalidraw, then each developer worked in parallel to design and implement functionality, managing scope effectively to ship in under 24 hours.", impact: "Delivered project on time, providing users with Valentines cards to share with loved ones on February 14." }
    },
    "development": {
        title: "RESPONSIVE DEVELOPMENT",
        description:
            "Responsive websites developed to mirror designer-provided style guides and mockups.",
        year: "2025",
        role: "Development",
        client: "BrainStation | Projects",
        tech: ["React", "Javascript", "SCSS", "Node", "Express", "SQL"],
        details: { subheader: "process", process: "Developed in 1-week sprints, drawing out site-map diagrams to prepare development processes. Utilized mobile-first design, BEM methodology to prioritize DRY, performant code.", impact: "Responsive, accessible web applications with functional API calls, back-end server implementation, and comprehensive error handling." }
    },
    "ux": {
        title: "SPORIFY/UX",
        description:
            "Sporify is an all-in-one learning platform designed to guide users through the art and science of safe mushroom foraging.",
        year: "2024",
        role: "UI/UX Design, Prototyping",
        client: "OCAD | Projects",
        tech: ["Figma", "Canva"],
        details: { subheader: "process", process: "Created a research plan including competitive analysis, user interviews, and user personas. How might we? Began design process by strategically creating a user flow and information architecture. Quickly generated ideas using crazy 8s -> drafted wireframes. Lo-fi mockups, hi-fi mockups and clickable prototypes with a style guide/UI toolkit in Figma. Finalized development-ready prototype after usability testing.", impact: "Sporify addresses real user needs, transforming user research derived pain points into comprehensive functionality within intuitive user experience." }
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
            <Header />
            {project && (<div className="min-h-screen bg-black text-white">
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

                    {/* project details */}
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

                                    <div>
                                        <h2 className="text-gray-500 mb-1">TECH STACK</h2>
                                        <div className="grid grid-cols-2 gap-x-4">
                                            {project.tech.map((item: string, key: number) => (<p className=" text-nowrap" key={key} >{item}</p>))
                                            }
                                        </div>
                                    </div>
                                    {project.credit && (<div>
                                        <h2 className="text-gray-500 mb-1 width-[200%]">CREDIT</h2>
                                        <p>{project.credit}</p>
                                    </div>)}
                                </div>
                            </div>

                            <div className="h-[50vh] flex items-center justify-center">
                                <img src={project.images.feature.src} alt={project.images.feature.alt} />
                            </div>
                        </div>
                    </section>

                    {/* full width image section */}
                    <section className="h-[80vh] bg-gray-900 flex items-center justify-center my-16">
                        {project.embed ? (
                            <ProjectEmbed
                                title={project.title}
                                url={project.embed.url}
                                width={project.embed.width}
                                height={project.embed.height}
                                scale={project.embed.scale} />)
                            : (<p className="font-mono text-sm text-gray-500">Full width project visual would appear here</p>)}
                    </section>

                    {/* project process details section */}
                    <section className="container mx-auto px-4 py-16 md:py-32">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div className="h-[40vh] flex items-center justify-center">
                                <img src={project.images.process.src} alt={project.images.process.alt} />
                                {/* <p className="font-mono text-sm text-gray-500">Additional project visual</p> */}
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
