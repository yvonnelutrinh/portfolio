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
    "ITERATE",
]

interface ProcessStepsProps {
    steps?: string[]
}

export default function ProcessSteps({ steps = defaultSteps }: ProcessStepsProps) {
    const midpoint = Math.ceil(steps.length / 2)

    return (
        // one ordered list, visually split into two flowing columns:
        // 01–04 on the left, 05–08 continuing on the right
        <ol className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-4 md:grid-flow-col md:gap-x-16 list-none">
            {steps.map((step, index) => (
                <motion.li
                    key={step}
                    className={`border p-4 transition-colors hover:border-blue-400/80 ${
                        index === midpoint ? "mt-6 md:mt-0" : ""
                    }`}
                    // border brightens step by step for a sense of forward flow
                    style={{ borderColor: `rgba(96, 165, 250, ${0.25 + index * 0.06})` }}
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
        </ol>
    )
}
