export default function Skills() {
    return (<div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-16">
        <div>
            <div>
                <h2 className="font-display text-2xl mb-4">DEVELOPMENT</h2>
                <ul className="space-y-2 text-gray-400">
                    <li>Full Stack Development</li>
                    <li>Javascript / React / SCSS</li>
                    <li>Node / Express / SQL</li>
                    <li>Jest, ViTest</li>
                    <li>Heroku, Netlify</li>
                </ul>
            </div>

            <h2 className="font-display text-2xl mb-4">DESIGN</h2>
            <ul className="space-y-2 text-gray-400">
                <li>Typography</li>
                <li>Art Direction</li>
                <li>Motion Design</li>
                <li>UI/UX</li>
                <li>Brand Identity</li>
            </ul>
        </div>

        <div>
            <h2 className="font-display text-2xl mb-4">TOOLS</h2>
            <ul className="space-y-2 text-gray-400">
                <li>Figma</li>
                <li>Adobe Creative Suite</li>
                <li>DAWs</li>
            </ul>
        </div>
    </div>)
}