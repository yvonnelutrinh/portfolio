import { motion } from "motion/react"
import Navigation from "../../components/Navigation/Navigation"
import ProjectCard from "../../components/ProjectCard/ProjectCard"

const projects = [
  { id: 1, title: "WANDER", slug: "wander" },
  { id: 2, title: "CREATIVEWORLD", slug: "creative-world" },
  { id: 3, title: "SPORIFY", slug: "sporify" },
  { id: 4, title: "HACKATHONS", slug: "hackathons" },
  { id: 5, title: "DEVELOPMENT", slug: "development" },
  { id: 6, title: "PREVIOUS", slug: "previous" },
]

export default function Work() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-16">
        <motion.h1
          className="font-display text-6xl md:text-9xl mb-16 md:mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          WORK
        </motion.h1>

        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} title={project.title} slug={project.slug} index={index} />
          ))}
        </div>
      </main>
    </div>
  )
}