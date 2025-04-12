import TextBanner from "../TextBanner/TextBanner";

export default function Footer() {
    return (
        <footer className="bg-black text-white py-16 md:py-32">
            <TextBanner
                text="SOFTWARE ENGINEERING · UI/UX DESIGN · PROJECT STRATEGY"
                className="text-4xl md:text-6xl font-display tracking-wider"
                speed={15} />
            
            {/* contact section */}
            <div id="contact" className="px-8 mt-24 grid grid-cols-1 md:flex md:justify-between gap-8 transition-all duration-1000 delay-600 translate-y-0 opacity-100">
                <div>
                    <h3 className="text-xl mb-4">
                        EMAIL
                    </h3>
                    <p>
                        yvonnelutrinh[at]gmail.com
                    </p>
                </div>

                <div>
                    <h3 className="text-xl mb-4">
                        LOCATION
                    </h3>
                    <p>
                        Toronto, Canada
                    </p>
                </div>

                <div>
                    <h3 className="text-xl mb-4">
                        SOCIAL
                    </h3>
                    <div className="space-y-2">
                        <a href="https://www.linkedin.com/in/yvonnelutrinh/"  className="block hover:text-gray-400 transition-colors duration-300 text-white" target="_blank" rel="noopener noreferrer">
                            LinkedIn ↗ 
                        </a>
                        <a href="http://github.com/yvonnelutrinh/" className="block hover:text-gray-400 transition-colors duration-300 text-white" target="_blank" rel="noopener noreferrer">
                            GitHub ↗ 
                        </a>
                    </div>
                </div>
            </div>
        </footer >
    )
}