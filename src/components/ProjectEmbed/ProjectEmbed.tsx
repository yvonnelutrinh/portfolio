import { motion } from "framer-motion";
import Window from "../Window/Window";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

type ProjectEmbedProps = {
    title: string;
    url: string;
    width?: number; // Kept for backwards compatibility
    height?: number; // Kept for backwards compatibility
    scale?: number; // Kept for backwards compatibility
    slug?: string;
};

export const ProjectEmbed = ({
    title,
    url,
    slug
}: ProjectEmbedProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Update viewport dimensions on mount and window resize
    useEffect(() => {
        const updateViewportDimensions = () => {
            const isSmallScreen = window.innerWidth < 640;
            const isMediumScreen = window.innerWidth >= 640 && window.innerWidth < 1024;
            
            setIsMobile(isSmallScreen);
            setIsTablet(isMediumScreen);
            
            // Calculate viewport aspect ratio
            const windowAspectRatio = window.innerWidth / window.innerHeight;
            
            // Calculate available width (with padding)
            const containerPadding = isSmallScreen ? 16 : isMediumScreen ? 32 : 48;
            const availableWidth = window.innerWidth - (containerPadding * 2);
            const maxWidth = Math.min(availableWidth, 1200); // Reasonable max width
            
            // Button space if needed
            const buttonSpace = (isMobile || isTablet) && slug ? 48 : 0;
            
            // Calculate height based on aspect ratio
            // Parent section is 80vh
            const availableHeight = (window.innerHeight * 0.8) - buttonSpace - containerPadding;
            
            // Choose dimensions that fit within available space while maintaining aspect ratio
            let finalWidth = maxWidth;
            let finalHeight = finalWidth / windowAspectRatio;
            
            // If height exceeds available space, recalculate based on height
            if (finalHeight > availableHeight) {
                finalHeight = availableHeight;
                finalWidth = finalHeight * windowAspectRatio;
            }
            
            setViewportWidth(finalWidth);
            setViewportHeight(finalHeight);
        };

        updateViewportDimensions();
        window.addEventListener('resize', updateViewportDimensions);
        return () => window.removeEventListener('resize', updateViewportDimensions);
    }, [slug]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <motion.div
                whileHover={{ scale: 1.01 }}
                className="overflow-visible mx-auto"
                style={{
                    width: `${viewportWidth}px`,
                    maxWidth: '100%'
                }}
            >
                <Window title={title}>
                    <div 
                        className="bg-black flex justify-center overflow-auto"
                        style={{ 
                            height: `${viewportHeight}px`,
                            maxHeight: '65vh'
                        }}
                    >
                        {viewportWidth > 0 && ( // Only render when dimensions are calculated
                            <iframe
                                ref={iframeRef}
                                src={url}
                                title={title}
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
                                loading="lazy"
                                className="w-full h-full"
                                style={{ 
                                    width: '100%',
                                    height: '100%',
                                    border: 0,
                                    backgroundColor: "white"
                                }}
                            />
                        )}
                    </div>
                </Window>
            </motion.div>
            
            {/* mobile/tablet process button - visible only on mobile/tablet */}
            {(isMobile || isTablet) && slug && (
                <div className="flex justify-center mt-4 font-mono text-white">
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
    );
};
