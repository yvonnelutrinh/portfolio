import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "motion/react"
import Footer from "../Footer/Footer"
import TitleScroll from "../TitleScroll/TitleScroll"
import Header from "../Header/Header"
import { ProjectEmbed } from "../ProjectEmbed/ProjectEmbed"
import ImageCollage from "../ImageCollage/ImageCollage"
import ImageSlider from "../ImageSlider/ImageSlider"
import ProcessSteps from "../ProcessSteps/ProcessSteps"
import PasswordGate from "../PasswordGate/PasswordGate"
import { projectsData, type Project } from "../../data/projects"

// Gates a project's content behind the design-portfolio password when the
// project is marked `protected`; otherwise renders it directly.
function ProtectedSection({ project, children }: { project: Project; children: React.ReactNode }) {
    if (!project.protected) return <>{children}</>
    return <PasswordGate heading={project.title}>{children}</PasswordGate>
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
        <button
            type="button"
            className="w-full"
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            onClick={() => setIsActive((prev) => !prev)}
            aria-pressed={isActive}
            aria-label={isGif ? `Play animation: ${alt}` : `Zoom image: ${alt}`}
        >
            <img
                src={imgSrc}
                alt={alt}
                className={`w-full h-auto object-contain rounded transition-transform duration-300 cursor-pointer ${isActive ? 'scale-110' : ''}`}
                onError={handleImgError}
            />
        </button>
    );
}

function FeatureImage({ src, alt }: { src: string; alt: string }) {
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <div
            className="relative shadow-md transition-shadow duration-300 hover:shadow-xl overflow-visible group w-full"
            style={{ maxHeight: '50vh' }}
        >
            <button
                type="button"
                onClick={() => setIsZoomed((prev) => !prev)}
                aria-pressed={isZoomed}
                aria-label={`Zoom image: ${alt}`}
            >
                <img
                    src={src}
                    alt={alt}
                    className={`max-h-[50vh] w-auto object-contain transition-transform duration-300 group-hover:scale-110 cursor-pointer ${isZoomed ? 'scale-110' : ''}`}
                />
            </button>
        </div>
    );
}

export default function ProjectPage() {
    const params = useParams()
    const slug = params?.id as string
    const [project, setProject] = useState<Project | null>(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (slug && projectsData[slug]) {
            setProject(projectsData[slug])
        }
        else { navigate("/project-not-found") }
    }, [slug, navigate])

    const isDesignProject = project?.tags?.includes("design")

    return (
        <>
            <Header />
            {project && (<div className="min-h-screen bg-black text-white">
                <ProtectedSection project={project}>
                <main id="main-content">
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

                                <dl className="grid grid-cols-2 gap-8 text-sm font-mono">
                                    <div>
                                        <dt className="text-gray-400 mb-1">YEAR</dt>
                                        <dd>{project.year}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-400 mb-1">ROLE</dt>
                                        <dd>{project.role}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-400 mb-1">CLIENT</dt>
                                        <dd>{project.client}</dd>
                                    </div>

                                    {project.tech && (<div>
                                        <dt className="text-gray-400 mb-1">TECH STACK</dt>
                                        <dd>
                                            <div className="grid grid-cols-2 gap-x-4">
                                                {project.tech.map((item: string, key: number) => (<p className=" text-nowrap" key={key} >{item}</p>))
                                                }
                                            </div>
                                        </dd>
                                    </div>)}
                                    {project.tags && (<div>
                                        <dt className="text-gray-400 mb-1">DISCIPLINES</dt>
                                        <dd className="uppercase">{project.tags.join(", ")}</dd>
                                    </div>)}
                                    {project.credit && (<div>
                                        <dt className="text-gray-400 mb-1">CREDIT</dt>
                                        <dd>{project.credit}</dd>
                                    </div>)}
                                </dl>
                            </div>

                            {project.images?.feature && (
                                <div className="flex flex-col items-start justify-start">
                                    {/* feature image */}
                                    <FeatureImage
                                        src={project.images.feature.src}
                                        alt={project.images.feature.alt}
                                    />

                                    {/* Subfeature section - only appears if project has subfeature images */}
                                    {project.images.subfeature && (
                                        <div className="mt-8 w-full">
                                            <div className="border-2 border-gray-800 rounded-md px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-6 md:py-8 lg:py-6 xl:py-8 bg-gray-900/30">
                                                <div className="flex justify-center">
                                                    <div className="flex gap-2 w-full justify-between">
                                                        {project.images.subfeature.map((image, key) => (
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
                                                <p className="text-sm text-gray-400 text-center font-mono mt-2">{project.images.subfeatureCredit}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* full width demo section */}
                    {(project.embed || project.images?.slider) && (
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
                            ) : project.images?.slider ? (
                                <ImageSlider
                                    images={project.images.slider}
                                    slug={slug}
                                />
                            ) : null}
                        </section>
                    )}

                    {/* project process details section */}
                    <section id="process" className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                            <div className="relative w-full h-auto">
                                {project.images?.process ? (
                                    <ImageCollage
                                        images={project.images.process}
                                        maxImages={5}
                                        alignTop={true}
                                    />
                                ) : (
                                    <div className="font-mono text-sm text-gray-400">Process visuals coming soon.</div>
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
                                    <>
                                        <h2 className="font-display text-4xl md:text-6xl mb-8">PROCESS</h2>
                                        <p className="font-mono text-sm text-gray-400">Full case study coming soon.</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* design process phases — design projects only */}
                        {isDesignProject && <ProcessSteps />}
                    </section>
                </main>
                </ProtectedSection>
            </div >)}
            <Footer />
        </>
    )
}
