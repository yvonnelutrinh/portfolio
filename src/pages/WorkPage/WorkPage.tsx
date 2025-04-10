import { motion } from "motion/react"
import { HeaderNav } from "../../components/Navigation/Navigation"
import NavigationCards from "../../components/ProjectCard/ProjectCard"
import Footer from "../../components/Footer/Footer"

const projects = [
  { id: 1, title: "WANDER", slug: "wander" },
  { id: 2, title: "CREATIVE WORLD", slug: "creative-world" },
  { id: 3, title: "BIZBOT", slug: "biz-bot" },
  { id: 4, title: "POKÉMON VALENTINE", slug: "poke-valentine" },
  { id: 5, title: "RESPONSIVE DEVELOPMENT", slug: "development" },
  { id: 6, title: "SPORIFY/UX", slug: "ux" },
]

export default function Work() {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <HeaderNav />

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
              <NavigationCards key={project.id} title={project.title} slug={project.slug} index={index} />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}