import { motion } from "motion/react"
import ProjectCard from "../../components/ProjectCard/ProjectCard"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"

const projects = [
  { id: 1, title: "WANDER", slug: "wander" },
  { id: 2, title: "CREATIVE WORLD", slug: "creative-world" },
  { id: 3, title: "BIZBOT", slug: "bizbot" },
  { id: 4, title: "POKÉMON VALENTINE", slug: "pokemon-valentine" },
  { id: 5, title: "RESPONSIVE DEVELOPMENT", slug: "development" },
  { id: 6, title: "SPORIFY/UX", slug: "ux" },
]

export default function Work() {
  return (
    <>
    <Header />
      <div className="min-h-screen bg-black text-white">
        <main className="container mx-auto px-4 pt-32 pb-16">
          <motion.h1
            className="font-display text-[min(15vw,8rem)] mb-16 md:mb-32 lg:mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            WORK
          </motion.h1>

          <div className="grid grid-cols-1 gap-4 font-mono">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} title={project.title} slug={project.slug} index={index} />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}