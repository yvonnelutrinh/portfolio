import { motion } from "framer-motion";
import Window from "../Window/Window";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

type ProjectEmbedProps = {
    title: string;
    url: string;
    width?: number;
    height?: number;
    scale?: number;
    slug?: string;
};

export const ProjectEmbed = ({
    title,
    url,
    width = 1280,
    height = 800,
    scale = 0.75,
    slug
}: ProjectEmbedProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [embedScale, setEmbedScale] = useState(scale);
    const containerRef = useRef<HTMLDivElement>(null);

    // check screen size and adjust scaling
    useEffect(() => {
        const checkScreenSize = () => {
            const isSmallScreen = window.innerWidth < 640;
            const isMediumScreen = window.innerWidth >= 640 && window.innerWidth < 1024;
            
            setIsMobile(isSmallScreen);
            setIsTablet(isMediumScreen);
            
            // adjust scale based on screen size
            if (isSmallScreen) {
                setEmbedScale(scale * 0.7); // reduce scale on mobile
            } else if (isMediumScreen) {
                setEmbedScale(scale * 0.85); // slightly reduce scale on tablet
            } else {
                setEmbedScale(scale);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [scale]);

    // calculate dynamic window dimensions based on device
    const getWindowDimensions = () => {
        let maxWidth = '100%';
        let maxHeight = '60vh';
        
        if (isMobile) {
            maxWidth = '90vw';
            maxHeight = '50vh';
        } 
        else if (isTablet) {
            maxWidth = '80vw';
            maxHeight = '60vh';
        } 
        else {
            maxWidth = '70vw';
        }
        
        return {
            maxWidth,
            maxHeight
        };
    };
    
    const windowDimensions = getWindowDimensions();

    return (
        <div className="w-full flex flex-col items-center py-4">
            <div 
                className="w-full px-4 md:px-8 lg:px-12"
                ref={containerRef}
            >
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="mx-auto overflow-visible origin-center"
                    style={{ 
                        maxWidth: windowDimensions.maxWidth
                    }}
                >
                    <Window title={title}>
                        <div className="overflow-auto bg-black flex justify-center" style={{ 
                            maxHeight: `calc(${windowDimensions.maxHeight} - 3rem)`,
                            height: 'auto'
                        }}>
                            <div
                                className="border border-gray-300 max-w-full"
                                style={{
                                    width,
                                    height,
                                    transform: `scale(${embedScale})`,
                                    transformOrigin: "top center",
                                }}
                            >
                                <iframe
                                    src={url}
                                    title={title}
                                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
                                    loading="lazy"
                                    className="w-full h-full border-0 max-w-full"
                                    style={{ backgroundColor: "white" }}
                                />
                            </div>
                        </div>
                    </Window>
                </motion.div>
                
                {/* mobile/tablet process button - visible only on mobile/tablet */}
                {(isMobile || isTablet) && slug && (
                    <div className="flex justify-center mt-8 font-mono text-white">
                        <Link 
                            to={`#process`}
                            className="hover:text-gray-300 transition-colors px-4"
                            aria-label="view process"
                        >
                            ↓ PROCESS
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
