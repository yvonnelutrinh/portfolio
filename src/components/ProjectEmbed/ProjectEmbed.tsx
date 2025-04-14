import { motion } from "framer-motion";
import Window from "../Window/Window";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

type ProjectEmbedProps = {
    title: string;
    url: string;
    width?: number; // kept for backwards compatibility
    height?: number; // kept for backwards compatibility
    scale?: number; // kept for backwards compatibility
    slug?: string;
    fixedDesktopRatio?: boolean; // forces desktop aspect ratio
};

export const ProjectEmbed = ({
    title,
    url,
    slug,
    fixedDesktopRatio = false // default to false for backward compatibility
}: ProjectEmbedProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // handle viewport sizing on mount and resize
    useEffect(() => {
        const updateViewportDimensions = () => {
            const isSmallScreen = window.innerWidth < 640;
            const isMediumScreen = window.innerWidth >= 640 && window.innerWidth < 1024;
            
            setIsMobile(isSmallScreen);
            setIsTablet(isMediumScreen);
            
            if (fixedDesktopRatio) {
                // maintain desktop aspect ratio for certain projects
                const DESKTOP_ASPECT_RATIO = 16/9;
                // todo: fix bizbot iframe mobile responsiveness
                const containerPadding = isSmallScreen ? 16 : isMediumScreen ? 32 : 48;
                const availableWidth = window.innerWidth - (containerPadding * 2);
                const maxWidth = Math.min(availableWidth, 1200); // max reasonable width
                
                const idealHeight = maxWidth / DESKTOP_ASPECT_RATIO;
                
                const viewportHeightLimit = window.innerHeight * 0.7; // use 70% of viewport height max
                const finalHeight = Math.min(idealHeight, viewportHeightLimit);
                const finalWidth = finalHeight * DESKTOP_ASPECT_RATIO;
                
                setViewportWidth(finalWidth);
                setViewportHeight(finalHeight);
            } else {
                // adapt to viewport for responsive projects
                const aspectRatio = window.innerWidth / window.innerHeight;
                
                const containerPadding = isSmallScreen ? 16 : isMediumScreen ? 32 : 48;
                const availableWidth = window.innerWidth - (containerPadding * 2);
                const maxWidth = Math.min(availableWidth, 1200);
                
                const buttonSpace = (isMobile || isTablet) && slug ? 48 : 0;
                
                // parent section is 80vh
                const availableHeight = (window.innerHeight * 0.8) - buttonSpace - containerPadding;
                
                // fit within available space
                let finalWidth = maxWidth;
                let finalHeight = finalWidth / aspectRatio;
                
                // recalculate if height is too big
                if (finalHeight > availableHeight) {
                    finalHeight = availableHeight;
                    finalWidth = finalHeight * aspectRatio;
                }
                
                setViewportWidth(finalWidth);
                setViewportHeight(finalHeight);
            }
        };

        updateViewportDimensions();
        window.addEventListener('resize', updateViewportDimensions);
        return () => window.removeEventListener('resize', updateViewportDimensions);
    }, [slug, fixedDesktopRatio, isMobile, isTablet]);

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
                            maxHeight: fixedDesktopRatio ? '75vh' : '65vh'
                        }}
                    >
                        {viewportWidth > 0 && ( // only render when dimensions are calculated
                            <iframe
                                ref={iframeRef}
                                src={url}
                                title={title}
                                className="w-full h-full border-0"
                                loading="lazy"
                                aria-label={`${title} project embed`}
                            />
                        )}
                    </div>
                </Window>
            </motion.div>

            {(isMobile || isTablet) && slug && (
                <Link 
                    to={`#process`}
                    className="mt-8 font-mono text-white hover:text-gray-300 transition-colors"
                    aria-label="view process"
                >
                    ↓ PROCESS
                </Link>
            )}
        </div>
    );
};
