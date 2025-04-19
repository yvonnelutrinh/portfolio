import Terminal from "../Terminal/Terminal";
import { motion } from "motion/react";

export default function Skills() {
    return (
        <>
        <div className="mt-32">
            <motion.h2
                className="font-display text-3xl lg:text-6xl mb-16 md:mb-32"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                HOW I BUILD
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                {/* Process Terminal Column - Top left position */}
                <div>
                    <Terminal />
                </div>

                {/* Software Engineering - Top right */}
                <div className="font-mono">
                    <h2 className="text-white mb-1">SOFTWARE ENGINEERING</h2>
                    <ul className="text-gray-400">
                        <li>Full Stack Development</li>
                        <li>Responsive Front-End Development</li>
                        <li>Back-End Development</li>
                        <li>JavaScript | TypeScript</li>
                        <li>React | NextJS</li>
                        <li>HTML | CSS | SCSS | Tailwind</li>
                        <li>Node | Express | SQL</li>
                        <li>Jest, ViTest</li>
                        <li>Heroku, Netlify</li>
                        <li>WordPress CMS</li>
                    </ul>
                </div>

                {/* Multimedia Design - Bottom left */}
                <div className="font-mono">
                    <h2 className="text-white mb-1">MULTIMEDIA DESIGN</h2>
                    <ul className="text-gray-400">
                        <li>User Interface (UI) Design</li>
                        <li>User Experience (UX) Design</li>
                        <li>Brand Identity</li>
                        <li>Motion Design</li>
                        <li>Sound Design</li>
                        <li>Figma</li>
                        <li>Webflow</li>
                        <li>Adobe Creative Suite</li>
                        <li>Canva</li>
                    </ul>
                </div>

                {/* Project Management - Bottom right */}
                <div className="font-mono">
                    <h2 className="text-white mb-1">PROJECT MANAGEMENT</h2>
                    <ul className="text-gray-400">
                        <li>Agile</li>
                        <li>Scrum</li>
                        <li>Waterfall</li>
                        <li>Kanban</li>
                        <li>Learning: Shape Up</li>
                        <li>Jira</li>
                        <li>Asana</li>
                        <li>Trello</li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
}