import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "motion/react"
import Footer from "../Footer/Footer"
import TitleScroll from "../TitleScroll/TitleScroll"
import Header from "../Header/Header"
import { ProjectEmbed } from "../ProjectEmbed/ProjectEmbed"
import ImageCollage from "../ImageCollage/ImageCollage"
import ImageSlider from "../ImageSlider/ImageSlider"

// project data
const projectsData = {
    "wander": {
        title: "WANDER",
        description:
            "Wander is a playful wellness app designed to combat digital fatigue and unlock imagination through immersive soundscapes and guided exercises.",
        year: "2025",
        role: "UX/UI Design, Sound Design, Animation Design, Full-Stack Development",
        client: "BrainStation | Capstone",
        details: { subheader: "PROCESS", process: "Blended strategic research with hands-on development, building interactive prototypes that showcased animation concepts. Implemented new technologies while crafting a SQL database architecture that elegantly handles user identification and preferences.", impact: "Created a digital sanctuary that fights creative block through a generative sound bath, fluid animations, and a thoughtful cognitive exercise. The Gemini API integration offers personalized insights based on user reflections, making each experience uniquely rewarding." },
        embed: {
            url: "https://yvonnelutrinh.github.io/wander/",
            width: 1024,
            height: 768,
            scale: 1,
            theme: "dark"
        },
        tech: ["React", "Javascript", "SCSS", "Node", "Express", "SQL", "Gemini API", "Motion", "Tone", "Howler", "Chroma", "Color", "Random-words", "Mobx", "Figma"],
        images: {
            feature: { src: "/wander-breathe.png", alt: "Wander app's breathe page with wave animations, narration text, and volume controls." },
            process: [{ src: "/wander-process.png", alt: "Wander process" }, { src: "/wander-process-2.png", alt: "Wander process" }, { src: "/wander-process-3.png", alt: "Wander process" }, { src: "/wander-process-4.png", alt: "Wander process" }]
        }
    },
    "creative-world": {
        title: "CREATIVE WORLD",
        description: "Creative World is a responsive e-commerce website for Corex Creative's brand expansion project, revealing a less commonly seen side of the brand.",
        year: "2024",
        role: "UX/UI Design, Webflow Development",
        client: "Corex Creative",
        tech: ["Figma", "Webflow", "HTML", "CSS"],
        embed: {
            url: "https://yvonnelutrinh.github.io/creative-world",
            width: 1024,
            height: 768,
            scale: 1,
            theme: "default"
        },
        details: { subheader: "PROCESS", process: "Guided this project from initial research through final implementation, crafting detailed Figma prototypes before building in Webflow. Partnered closely with the client to refine their brand identity throughout the process.", impact: "Struck the perfect balance between clean negative space and vibrant visuals to showcase the brand's unique offerings. The result feels both sophisticated and approachable—connecting deeply with the target audience while fostering community." },
        images: {
            feature: { src: "/creative-world-feature.png", alt: "Creative world website's product page with product details and images." },
            process: [{ src: "/creative-world-process.png", alt: "Creative World process" }, { src: "/creative-world-process-2.png", alt: "Creative World process" }]
        }
    },
    "bizbot": {
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
            fixedDesktopRatio: true,
            theme: "default",
            customWidth: 1080 // Slightly wider to accommodate content
        },
        tech: ["React", "Javascript", "Gemini API", "Figma"],
        credit: "Built during a 24-hour hackathon by Yvonne Lu Trinh, Ademidé Akinsefunmi, Alexandria Nancoo-Balkaran, Brigid Corey, Toshi Biswas, Quynh Do, and Vivian Cao.",
        details: { subheader: "PROCESS", process: "Orchestrated team collaboration through FigJam, allowing our development team to work seamlessly. Built initial form functionality with LLM integration to validate our approach, then refined prompts and response formatting to maximize the Gemini API's potential.", impact: "Delivered a functional prototype that impressed Microsoft judges with its practical AI implementation. Our solution offers small businesses clear, actionable AI adoption strategies tailored to their specific needs." },
        images: {
            feature: { src: "/bizbot-feature.png", alt: "BizBot app homepage to generate custom AI adoption recommendations for small businesses." },
            process: [{ src: "/bizbot-process.png", alt: "BizBot process" }, { src: "/bizbot-process-2.png", alt: "BizBot process" }, { src: "/bizbot-process-3.png", alt: "BizBot process" }, { src: "/bizbot-process-4.png", alt: "BizBot process" }, { src: "/bizbot-process-5.png", alt: "BizBot process" }, { src: "/bizbot-process-6.png", alt: "BizBot process" }]
        }
    },
    "pokemon-valentine": {
        title: "POKÉMON VALENTINE",
        description:
            "Pokemon Valentine is a simple responsive web app that generates custom downloadable Valentine's cards.",
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
            theme: "light",
            customWidth: 380 // Custom width to match the app's actual size without scrolling
        },
        details: { subheader: "PROCESS", process: "Visualized concepts in Excalidraw before implementing parallel workflows to maximize our 24-hour timeframe. Made smart scope decisions that kept us focused on delivering core functionality.", impact: "Shipped a delightful app that lets users create and share personalized Pokémon Valentine's cards—proving that even quick-turn projects can deliver meaningful user experiences." },
        images: {
            feature: { src: "/pokemon-valentine-feature.png", alt: "Pokemon Valentine app homepage to generate custom Valentine's cards." },
            process: [{ src: "/pokemon-valentine-process.png", alt: "Pokemon Valentine process" }, { src: "/pokemon-valentine-process-2.png", alt: "Pokemon Valentine process" }, { src: "/pokemon-valentine-process-3.png", alt: "Pokemon Valentine process" }]
        }
    },
    "development": {
        title: "RESPONSIVE DEVELOPMENT",
        description:
            "Responsive websites developed to mirror designer-provided style guides and mockups.",
        year: "2025",
        role: "Development",
        client: "BrainStation | Projects",
        tech: ["React", "Javascript", "SCSS", "Node", "Express", "SQL"],
        details: { subheader: "PROCESS", process: "Approached each project through focused one-week sprints, using site-maps to plan efficient workflows. Embraced mobile-first design and BEM methodology to create clean, maintainable, DRY code.", impact: "Delivered responsive, accessible applications with seamless API integration, secure database implementation, and robust error handling—translating designer mockups into real-world solutions." },
        images: {
            feature: { src: "/snaps-feature.png", alt: "Feature responsive development image." },
            slider: [{ src: "/snaps-1.png", alt: "Snaps web application." }, { src: "/snaps-2.png", alt: "Snaps web application." }, { src: "/snaps-3.png", alt: "Snaps web application." }, { src: "/instock-1.png", alt: "InStock web application." }, { src: "/instock-2.png", alt: "InStock web application." }, { src: "/instock-3.png", alt: "InStock web application." }],
            process: [{ src: "/pokemon-valentine-process.png", alt: "Pokemon Valentine process" }, { src: "/pokemon-valentine-process-2.png", alt: "Pokemon Valentine process" }, { src: "/pokemon-valentine-process-3.png", alt: "Pokemon Valentine process" }]
        }
    },
    // "ux-ui": {
    //     title: "UX/UI DESIGN",
    //     description:
    //         "Sporify is an all-in-one learning platform designed to guide users through the art and science of safe mushroom foraging.",
    //     year: "2024",
    //     role: "UI/UX Design, Prototyping",
    //     client: "OCAD | Projects",
    //     tech: ["Figma", "Canva"],
    //     details: { subheader: "process", process: "Created a research plan including competitive analysis, user interviews, and user personas. How might we? Began design process by strategically creating a user flow and information architecture. Quickly generated ideas using crazy 8s -> drafted wireframes. Lo-fi mockups, hi-fi mockups and clickable prototypes with a style guide/UI toolkit in Figma. Finalized development-ready prototype after usability testing.", impact: "Sporify addresses real user needs, transforming user research derived pain points into comprehensive functionality within intuitive user experience." }
    // },
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
                            <h1 className="text-center font-display text-[min(14vw,12rem)] whitespace-normal word-break-normal break-normal hyphens-none leading-[0.9] px-4 py-8 w-full">{project.title}</h1>
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
                                        <h2 className="text-gray-500 mb-1 width-[200%]">credit</h2>
                                        <p>{project.credit}</p>
                                    </div>)}
                                </div>
                            </div>

                            <div className="h-auto flex items-start justify-center md:justify-end">
                                <div 
                                    className="relative border-2 border-gray-800 shadow-md transition-shadow duration-300 hover:shadow-xl overflow-visible group" 
                                    style={{ maxHeight: '50vh' }}
                                >
                                    <img 
                                        src={project.images.feature.src} 
                                        alt={project.images.feature.alt} 
                                        className="max-h-[50vh] w-auto object-contain transition-transform duration-300 group-hover:scale-110 cursor-pointer" 
                                        onClick={(e) => {
                                            // toggle a class to keep the image zoomed until clicked again
                                            const target = e.currentTarget;
                                            if (target.classList.contains('scale-110')) {
                                                target.classList.remove('scale-110');
                                            } else {
                                                target.classList.add('scale-110');
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* full width demo section */}
                    <section className="h-[80vh] bg-gray-900 flex flex-col items-center justify-center my-8 md:my-16">
                        {project.embed ? (
                            <ProjectEmbed
                                title={project.title}
                                url={project.embed.url}
                                width={project.embed.width}
                                height={project.embed.height}
                                scale={project.embed.scale}
                                fixedDesktopRatio={project.embed.fixedDesktopRatio}
                                theme={project.embed.theme}
                                slug={slug}
                                customWidth={project.embed.customWidth}
                            />
                        ) : (
                            <div className="w-full max-w-5xl">
                                <ImageSlider 
                                    images={project.images?.slider}
                                    slug={slug}
                                />
                            </div>
                        )}
                    </section>

                    {/* project process details section */}
                    <section id="process" className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                            <div className="relative w-full h-auto">
                                {project.images && project.images.process ? (
                                    <ImageCollage 
                                        images={project.images.process} 
                                        maxImages={5}
                                        alignTop={true}
                                    />
                                ) : (
                                    <div className="font-mono text-sm text-gray-500">process visuals would appear here</div>
                                )}
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
