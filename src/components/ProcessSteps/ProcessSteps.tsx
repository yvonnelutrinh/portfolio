import { motion } from "motion/react"

// design process phases, mirrored from the About page's Process section
const defaultSteps = [
    "RESEARCH",
    "STRATEGY",
    "CONCEPT",
    "EXECUTE",
    "TEST",
    "DEPLOY",
    "TRACK",
]

interface ProcessStepsProps {
    steps?: string[]
}

export default function ProcessSteps({ steps = defaultSteps }: ProcessStepsProps) {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-12 list-none">
            {steps.map((step, index) => (
                <motion.li
                    key={step}
                    className="border border-blue-400/40 p-4 hover:border-blue-400/70 transition-colors"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                >
                    <h3 className="font-display text-lg mb-1">
                        {String(index + 1).padStart(2, "0")}. {step}
                    </h3>
                </motion.li>
            ))}
        </ul>
    )
}
