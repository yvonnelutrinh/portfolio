import { useState } from "react"
import { motion } from "motion/react"
import ProjectCard from "../../components/ProjectCard/ProjectCard"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import type { ProjectTag } from "../../data/projects"

const projects: { id: number; title: string; slug: string; tags: ProjectTag[] }[] = [
  { id: 1, title: "AI SAFETY DATA VIS", slug: "ai-safety-data-vis", tags: ["design", "development"] },
  { id: 2, title: "TNO ELEARNING MODULE", slug: "tno-elearning", tags: ["design"] },
  { id: 3, title: "TECHNICALITIES", slug: "technicalities", tags: ["design"] },
  { id: 4, title: "WANDER", slug: "wander", tags: ["design", "development"] },
  { id: 5, title: "LILGUY", slug: "lilguy", tags: ["design", "development"] },
  { id: 6, title: "CREATIVE WORLD", slug: "creative-world", tags: ["design", "development"] },
  { id: 7, title: "POKÉMON VALENTINE", slug: "pokemon-valentine", tags: ["development"] },
  { id: 8, title: "BIZBOT", slug: "bizbot", tags: ["design", "development"] },
  { id: 9, title: "RESPONSIVE DEVELOPMENT", slug: "development", tags: ["development"] },
]

const filters = [
  { value: "all", label: "ALL" },
  { value: "design", label: "DESIGN" },
  { value: "development", label: "DEVELOPMENT" },
] as const

type Filter = (typeof filters)[number]["value"]

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all")

  const visibleProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter))

  return (
    <>
    <Header />
      <div className="min-h-screen bg-black text-white">
        <main id="main-content" className="container mx-auto px-4 pt-32 pb-16">
          <motion.h1
            className="font-display text-[min(15vw,8rem)] mb-8 md:mb-16 lg:mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            WORK
          </motion.h1>

          {/* tag filters */}
          <motion.div
            role="group"
            aria-label="Filter projects by discipline"
            className="flex flex-wrap gap-3 mb-12 md:mb-16 font-mono text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={activeFilter === filter.value}
                data-cursor-hover
                className={`border px-4 py-2 min-h-[44px] tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                  activeFilter === filter.value
                    ? "border-white bg-white text-black"
                    : "border-gray-500 text-gray-300 hover:border-white hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* live region announces filter results to screen readers */}
          <p className="sr-only" aria-live="polite">
            {visibleProjects.length} project{visibleProjects.length === 1 ? "" : "s"} shown
          </p>

          <div className="grid grid-cols-1 gap-4 font-mono">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                slug={project.slug}
                tags={project.tags}
                index={index}
              />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
