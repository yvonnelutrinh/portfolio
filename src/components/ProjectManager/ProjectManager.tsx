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
        role: "Front-end Development, UX/UI Design",
        client: "BrainStation | Capstone",
        details: { subheader: "PROCESS", process: "Wander emerged from a simple question: how might we combat digital fatigue without abandoning technology altogether? I approached this project by blending strategic research with hands-on prototyping, building interactive models that demonstrated animation concepts before a single line of production code was written. This allowed me to test ideas quickly while crafting a SQL database architecture that elegantly handles user identification and preferences.", impact: "What makes Wander special is how it creates a digital sanctuary that fights creative block through thoughtfully designed elements—a generative sound bath, fluid animations, and cognitive exercises that actually help. The Gemini API integration analyzes user reflections to offer personalized insights, making each experience uniquely meaningful." },
        embed: {
            url: "https://yvonnelutrinh.github.io/wander/",
            width: 1024,
            height: 768,
            scale: 1,
            theme: "dark"
        },
        tech: ["React", "Javascript", "SCSS", "Node", "Express", "SQL", "Gemini API", "Motion", "Tone", "Howler", "Chroma", "Color", "Random-words", "Mobx", "Figma", "ElevenLabs"],
        images: {
            feature: { src: "images/wander-breathe.jpg", alt: "Wander app's breathe page with wave animations, narration text, and volume controls" },
            process: [{ src: "images/wander-process.jpg", alt: "Wander process" }, { src: "images/wander-process-2.jpg", alt: "Wander process" }, { src: "images/wander-process-3.jpg", alt: "Wander process" }, { src: "images/wander-process-4.jpg", alt: "Wander process" }]
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
        details: { subheader: "PROCESS", process: "Creative World reveals a less commonly seen side of Corex Creative, expanding their brand into e-commerce with a responsive website that balances sophistication with accessibility. I guided this project from research through implementation, starting with detailed Figma prototypes before translating them into Webflow. Working in close partnership with the client throughout the process allowed us to refine their brand identity in real-time, creating something that truly represented their vision.", impact: "The design challenge was finding the sweet spot between clean negative space and vibrant product presentation. The result strikes this balance perfectly—a site that feels both elegant and approachable, connecting with the target audience while fostering community around the brand." },
        images: {
            feature: { src: "images/creative-world-feature.jpg", alt: "Creative world website's product page with product details and images." },
            process: [{ src: "images/creative-world-process.jpg", alt: "Creative World process" }, { src: "images/creative-world-process-2.jpg", alt: "Creative World process" }]
        }
    },
    "lilguy": {
        title: "LILGUY",
        description:
            "LilGuy is your browser productivity companion, gamifying goal-setting with an adorable virtual pet that reacts to your productivity habits in real time. This Next.js app + Chrome extension transforms mundane desktop productivity tracking into a delightful experience reminiscent of the 2000s.",
        year: "2025",
        role: "Front-end Development, UX/UI Design, Project Manager",
        client: "NextJS | Hackathon",
        // embed: {
        //     url: "https://lilguy.vercel.app/",
        //     width: 1024,
        //     height: 768,
        //     scale: 1,
        //     // theme: "default"
        // },
        tech: ["Next.js", "TypeScript", "TailwindCSS", "OpenAI API", "Convex", "Clerk", "Figma", "Vercel", "Chrome Extension API"],
        credit: "Built for the global NextJS hackathon by Yvonne Lu Trinh, Ademidé Akinsefunmi, Lisa Olsen, and Filip Fabiszak.",
        details: { subheader: "PROCESS", process: "LilGuy transforms mundane productivity tracking into something you'll actually want to use. As project manager, I coordinated our team's workflow through the entire development cycle, ensuring seamless communication between design and development. I led the UI/UX design and front-end development from low-fidelity wireframes through to final implementation, focusing on creating an interface that felt both nostalgic and functional.", impact: "The technical architecture combines several modern tools—using the Chrome Extension API to track web sessions while leveraging OpenAI API's zero-shot classification to categorize sites by productivity. We chose Convex for database management and Clerk for authentication, creating a streamlined experience that helps users stay on track while remaining simple and intuitive." },
        images: {
            feature: { src: "images/lilguy-feature.jpg", alt: "LilGuy homepage displaying LilGuy and productivity metrics" },
            slider: [
                { src: "images/lilguy-feature.jpg", alt: "LilGuy dashboard displaying productivity metrics" },
                { src: "images/lilguy-widget.jpg", alt: "LilGuy browser widget" },
                { src: "images/lilguy-websites.jpg", alt: "LilGuy website productivity tracking" },
                { src: "images/lilguy-goals.jpg", alt: "LilGuy goals dashboard" }
            ],
            subfeature: [
                { src: "images/lilguy-angel-happy.gif", alt: "Happy angel LilGuy character animation" },
                { src: "images/lilguy-devil-angry.gif", alt: "Angry devil LilGuy character animation" },
                { src: "images/lilguy-walk-green.gif", alt: "Walking LilGuy character animation" }
            ],
            subfeatureCredit: "LilGuy character design and animation by Lisa Olsen",
            process: [{ src: "images/lilguy-lofi.jpg", alt: "LilGuy functional low fidelity prototype" }, { src: "images/lilguy-mockups.jpg", alt: "LilGuy low fidelity mockups" }, { src: "images/lilguy-timeline.jpg", alt: "LilGuy timeline" }, { src: "images/lilguy-user-flow.jpg", alt: "LilGuy early user flow" }, { src: "images/lilguy-ui-process.jpg", alt: "LilGuy UI implementation work in progress" }, { src: "images/lilguy-kanban.jpg", alt: "Kanban board for quick hackathon project ticket tracking." }]
        }
    },
    "pokemon-valentine": {
        title: "POKÉMON VALENTINE",
        description:
            "Pokemon Valentine is a simple responsive web app that generates custom downloadable Valentine's cards.",
        year: "2025",
        role: "Development, Responsive Styling",
        client: "BrainStation | Hackathon",
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
        details: { subheader: "PROCESS", process: "Sometimes the best projects come from tight constraints. Our Pokemon Valentine generator was built during a 24-hour hackathon, proving that meaningful user experiences don't always require months of development. We started by quickly sketching concepts in Excalidraw before implementing parallel workflows to maximize our limited timeframe.", impact: "The key was making smart scope decisions—focusing exclusively on core functionality that delivered immediate value rather than getting lost in nice-to-have features. The result is a simple but delightful app that lets users create and share personalized Pokémon Valentine's cards, combining nostalgia with practical functionality." },
        images: {
            feature: { src: "images/pokemon-valentine-feature.jpg", alt: "Pokemon Valentine app homepage to generate custom Valentine's cards" },
            process: [{ src: "images/pokemon-valentine-process.jpg", alt: "Pokemon Valentine process" }, { src: "images/pokemon-valentine-process-2.jpg", alt: "Pokemon Valentine process" }, { src: "images/pokemon-valentine-process-3.jpg", alt: "Pokemon Valentine process" }]
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
        tech: ["React", "Javascript", "SCSS", "Gemini API", "Figma"],
        credit: "Built during a 24-hour hackathon by Yvonne Lu Trinh, Ademidé Akinsefunmi, Alexandria Nancoo-Balkaran, Brigid Corey, Toshi Biswas, Quynh Do, and Vivian Cao.",
        details: { subheader: "PROCESS", process: "Small businesses often struggle to navigate AI adoption—they know they should be using these tools, but aren't sure where to start. BizBot solves this by providing tailored recommendations that actually make sense for their specific needs. Our team collaborated through FigJam to coordinate efforts during this 24-hour challenge. I built initial form functionality with LLM integration to validate my concept quickly for the team, then collaborated to refine our prompts and response formatting to get the most value from the Gemini API.", impact: "What impressed the Microsoft judges was our practical implementation—instead of abstract AI concepts, we delivered actionable strategies tailored to specific business contexts. BizBot translates complex AI possibilities into clear recommendations that small business owners can immediately understand and implement." },
        images: {
            feature: { src: "images/bizbot-feature.jpg", alt: "BizBot app homepage to generate custom AI adoption recommendations for small businesses" },
            process: [{ src: "images/bizbot-process.jpg", alt: "BizBot process" }, { src: "images/bizbot-process-2.jpg", alt: "BizBot process" }, { src: "images/bizbot-process-3.jpg", alt: "BizBot process" }, { src: "images/bizbot-process-4.jpg", alt: "BizBot process" }, { src: "images/bizbot-process-5.jpg", alt: "BizBot process" }, { src: "images/bizbot-process-6.jpg", alt: "BizBot process" }]
        }
    },
    "development": {
        title: "RESPONSIVE DEVELOPMENT",
        description: "Bringing designer-provided style guides and mockups to life, I craft responsive web applications that delight users and stay true to the original vision.",
        year: "2025",
        role: "Development",
        client: "BrainStation | Projects",
        tech: ["React", "Javascript", "SCSS", "Node", "Express", "SQL"],
        details: { subheader: "PROCESS", process: "Building from designer mockups requires both technical precision and creative problem-solving. I approached each project through focused one-week sprints, using site-maps to plan efficient development paths before writing a single line of code. By embracing mobile-first design principles and BEM methodology, I created clean, maintainable code structures that adapt seamlessly across devices.", impact: "For group projects, I led information architecture planning to support efficient workflows across development teams. The results speak for themselves—responsive, accessible applications with seamless API integration, secure database implementation, and thoughtful error handling that anticipates real user behavior." },
        images: {
            feature: { src: "images/snaps-feature.jpg", alt: "Feature responsive development image." },
            slider: [{ src: "images/snaps-1.jpg", alt: "Snaps web application." }, { src: "images/snaps-2.jpg", alt: "Snaps web application" }, { src: "images/snaps-3.jpg", alt: "Snaps web application" }, { src: "images/instock-1.jpg", alt: "InStock web application." }, { src: "images/instock-2.jpg", alt: "InStock web application" }, { src: "images/instock-3.jpg", alt: "InStock web application" }, { src: "images/bandsite.jpg", alt: "BandSite web application" }],
            process: [{ src: "images/group-project-process.jpg", alt: "Group project, InStock process" }, { src: "images/group-project-process-2.jpg", alt: "Group project, InStock process" }, { src: "images/pair-programming-process.jpg", alt: "Pair programming process" }, { src: "images/pair-programming-process-2.jpg", alt: "Pair programming process" }]
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

function SubfeatureImage({ src, alt }: { src: string; alt: string }) {
    const isGif = src.endsWith('.gif');
    const staticSrc = isGif ? src.replace('.gif', '.png') : src;
    const [isActive, setIsActive] = useState(false);
    const [imgSrc, setImgSrc] = useState(isGif ? staticSrc : src);

    useEffect(() => {
        if (isActive && isGif) {
            setImgSrc(src); // show GIF
        } else if (isGif) {
            setImgSrc(staticSrc); // show PNG
        } else {
            setImgSrc(src);
        }
    }, [isActive, isGif, src, staticSrc]);

    // If PNG doesn't exist, fallback to GIF
    const handleImgError = () => {
        if (isGif && imgSrc !== src) {
            setImgSrc(src);
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={`w-full h-auto object-contain rounded transition-transform duration-300 cursor-pointer ${isActive ? 'scale-110' : ''}`}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            onClick={() => setIsActive((prev) => !prev)}
            onError={handleImgError}
        />
    );
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
                                        <h2 className="text-gray-500 mb-1 width-[200%]">CREDIT</h2>
                                        <p>{project.credit}</p>
                                    </div>)}
                                </div>
                            </div>

                            <div className="flex flex-col items-start justify-start">
                                {/* feature image */}
                                <div
                                    className="relative shadow-md transition-shadow duration-300 hover:shadow-xl overflow-visible group w-full"
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

                                {/* Subfeature section - only appears if project has subfeature images */}
                                {project.images.subfeature && (
                                    <div className="mt-8 w-full">
                                        <div className="border-2 border-gray-800 rounded-md px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-6 md:py-8 lg:py-6 xl:py-8 bg-gray-900/30">
                                            <div className="flex justify-center">
                                                <div className="flex gap-2 w-full justify-between">
                                                    {project.images.subfeature.map((image: any, key: number) => (
                                                        <div key={key} className="flex-1 group">
                                                            <SubfeatureImage
                                                                src={image.src}
                                                                alt={image.alt}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {project.images.subfeatureCredit && (
                                            <p className="text-sm text-gray-500 text-center font-mono mt-2">{project.images.subfeatureCredit}</p>
                                        )}
                                    </div>
                                )}
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
                        ) : project.images.slider ? (
                            <ImageSlider
                                images={project.images.slider}
                                slug={slug}
                            />
                        ) : null}
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
                                {project.details ? (
                                    <>
                                        <h2 className="font-display text-4xl md:text-6xl mb-8">{project.details.subheader}</h2>
                                        <p className="text-gray-300 mb-8">
                                            {project.details.process}
                                        </p>
                                        <p className="text-gray-300">
                                            {project.details.impact}
                                        </p>
                                    </>
                                ) : (
                                    <div className="font-mono text-sm text-gray-500">Project details coming soon.</div>
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            </div >)}
            <Footer />
        </>
    )
}
