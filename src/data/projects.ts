export type ProjectTag = "design" | "development"

export interface ProjectImage {
    src: string
    alt: string
}

export interface ProjectEmbedConfig {
    url: string
    width: number
    height: number
    scale: number
    theme?: "default" | "dark" | "light"
    fixedDesktopRatio?: boolean
    customWidth?: number
}

export interface Project {
    title: string
    description: string
    year: string
    role: string
    client: string
    tags: ProjectTag[]
    tech?: string[]
    credit?: string
    placeholder?: boolean
    embed?: ProjectEmbedConfig
    details?: { subheader: string; process: string; impact: string }
    images?: {
        feature?: ProjectImage
        slider?: ProjectImage[]
        subfeature?: ProjectImage[]
        subfeatureCredit?: string
        process?: ProjectImage[]
    }
}

export const projectsData: Record<string, Project> = {
    "ai-safety-data-vis": {
        title: "AI SAFETY DATA VIS",
        description:
            "An AI governance dashboard that visualizes frontier AI capability trends alongside safety signals—lab safety scores, reported AI incidents, and safety funding—to make the gap between capabilities and oversight legible at a glance.",
        year: "2026",
        role: "Data Visualization Design, Front-end Development",
        client: "Independent | AI Governance Research",
        tags: ["design", "development"],
        tech: ["React", "JavaScript", "Plotly.js", "PapaParse", "Lodash", "Vite", "CSS"],
        details: {
            subheader: "PROCESS",
            process:
                "How do you communicate the pace of AI progress against the pace of AI safety work? I started with the data: capability benchmarks from Epoch AI, METR's task time horizons, the Future of Life Institute's lab safety index, reported AI incidents, and safety funding figures. Each dataset arrived in a different shape, so I built a CSV parsing pipeline with PapaParse and designed a small token system—color, type, and spacing primitives—so every chart, filter, and data table draws from one consistent visual language.",
            impact:
                "The result is a dashboard that pairs dual-timeline capability charts with organizational safety scores and overlays model releases against reported incidents. Interactive filters let viewers isolate labs or time ranges, while accessible fallbacks—skip links, semantic structure, and data tables mirroring each chart—keep the findings available to everyone, not just mouse users. The visualizations turn abstract governance debates into something you can actually see.",
        },
        images: {
            feature: { src: "images/ai-safety-feature.jpg", alt: "AI Governance Dashboard showing frontier AI capability scores over time by lab, with filter buttons for each organization" },
            process: [
                { src: "images/ai-safety-process.jpg", alt: "Organisational safety over time chart plotting FLI Safety Index grades for each AI lab across audit editions" },
                { src: "images/ai-safety-process-2.jpg", alt: "Frontier model releases by organization, a stacked bar chart from 2012 to 2025" },
                { src: "images/ai-safety-process-3.jpg", alt: "Annual reported AI incidents line chart with a marker at the ChatGPT launch" },
            ],
        },
    },
    "tno-elearning": {
        title: "TNO ELEARNING MODULE",
        description:
            "An interactive eLearning module designed for TNO, translating complex material into an approachable, self-paced learning experience.",
        year: "2026",
        role: "Learning Experience Design, UX/UI Design",
        client: "TNO",
        tags: ["design"],
        placeholder: true,
    },
    "technicalities": {
        title: "TECHNICALITIES",
        description:
            "Technicalities explores the craft behind technical communication—translating dense subject matter into clear, human-centered design.",
        year: "2026",
        role: "UX/UI Design",
        client: "Independent",
        tags: ["design"],
        placeholder: true,
    },
    "wander": {
        title: "WANDER",
        description:
            "Wander is a playful wellness app designed to combat digital fatigue and unlock imagination through immersive soundscapes and guided exercises.",
        year: "2025",
        role: "Front-end Development, UX/UI Design",
        client: "BrainStation | Capstone",
        tags: ["design", "development"],
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
            process: [{ src: "images/wander-process.jpg", alt: "Wander design process artifact" }, { src: "images/wander-process-2.jpg", alt: "Wander design process artifact" }, { src: "images/wander-process-3.jpg", alt: "Wander design process artifact" }, { src: "images/wander-process-4.jpg", alt: "Wander design process artifact" }]
        }
    },
    "creative-world": {
        title: "CREATIVE WORLD",
        description: "Creative World is a responsive e-commerce website for Corex Creative's brand expansion project, revealing a less commonly seen side of the brand.",
        year: "2024",
        role: "UX/UI Design, Webflow Development",
        client: "Corex Creative",
        tags: ["design", "development"],
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
            process: [{ src: "images/creative-world-process.jpg", alt: "Creative World design process artifact" }, { src: "images/creative-world-process-2.jpg", alt: "Creative World design process artifact" }]
        }
    },
    "lilguy": {
        title: "LILGUY",
        description:
            "LilGuy is your browser productivity companion, gamifying goal-setting with an adorable virtual pet that reacts to your productivity habits in real time. This Next.js app + Chrome extension transforms mundane desktop productivity tracking into a delightful experience reminiscent of the 2000s.",
        year: "2025",
        role: "Front-end Development, UX/UI Design, Project Manager",
        client: "NextJS | Hackathon",
        tags: ["design", "development"],
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
        tags: ["development"],
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
            process: [{ src: "images/pokemon-valentine-process.jpg", alt: "Pokemon Valentine design process artifact" }, { src: "images/pokemon-valentine-process-2.jpg", alt: "Pokemon Valentine design process artifact" }, { src: "images/pokemon-valentine-process-3.jpg", alt: "Pokemon Valentine design process artifact" }]
        }
    },
    "bizbot": {
        title: "BIZBOT",
        description:
            "BizBot provides AI adoption recommendations tailored to small business needs, leveraging Gemini to help businesses automate tasks, optimize operations, and make smarter decisions.",
        year: "2025",
        role: "Development, Design",
        client: "Microsoft | BrainStation",
        tags: ["design", "development"],
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
            process: [{ src: "images/bizbot-process.jpg", alt: "BizBot design process artifact" }, { src: "images/bizbot-process-2.jpg", alt: "BizBot design process artifact" }, { src: "images/bizbot-process-3.jpg", alt: "BizBot design process artifact" }, { src: "images/bizbot-process-4.jpg", alt: "BizBot design process artifact" }, { src: "images/bizbot-process-5.jpg", alt: "BizBot design process artifact" }, { src: "images/bizbot-process-6.jpg", alt: "BizBot design process artifact" }]
        }
    },
    "development": {
        title: "RESPONSIVE DEVELOPMENT",
        description: "Bringing designer-provided style guides and mockups to life, I craft responsive web applications that delight users and stay true to the original vision.",
        year: "2025",
        role: "Development",
        client: "BrainStation | Projects",
        tags: ["development"],
        tech: ["React", "Javascript", "SCSS", "Node", "Express", "SQL"],
        details: { subheader: "PROCESS", process: "Building from designer mockups requires both technical precision and creative problem-solving. I approached each project through focused one-week sprints, using site-maps to plan efficient development paths before writing a single line of code. By embracing mobile-first design principles and BEM methodology, I created clean, maintainable code structures that adapt seamlessly across devices.", impact: "For group projects, I led information architecture planning to support efficient workflows across development teams. The results speak for themselves—responsive, accessible applications with seamless API integration, secure database implementation, and thoughtful error handling that anticipates real user behavior." },
        images: {
            feature: { src: "images/snaps-feature.jpg", alt: "Feature responsive development image." },
            slider: [{ src: "images/snaps-1.jpg", alt: "Snaps web application." }, { src: "images/snaps-2.jpg", alt: "Snaps web application" }, { src: "images/snaps-3.jpg", alt: "Snaps web application" }, { src: "images/instock-1.jpg", alt: "InStock web application." }, { src: "images/instock-2.jpg", alt: "InStock web application" }, { src: "images/instock-3.jpg", alt: "InStock web application" }, { src: "images/bandsite.jpg", alt: "BandSite web application" }],
            process: [{ src: "images/group-project-process.jpg", alt: "Group project, InStock process" }, { src: "images/group-project-process-2.jpg", alt: "Group project, InStock process" }, { src: "images/pair-programming-process.jpg", alt: "Pair programming process" }, { src: "images/pair-programming-process-2.jpg", alt: "Pair programming process" }]
        }
    },
}
