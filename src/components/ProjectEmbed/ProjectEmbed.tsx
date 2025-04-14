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
    theme?: "dark" | "light" | "default"; // controls iframe theme
    customWidth?: number; // specific width override for projects like Pokemon Valentine
};

export const ProjectEmbed = ({
    title,
    url,
    slug,
    fixedDesktopRatio = false, // default to false for backward compatibility
    theme = "default", // default theme
    customWidth
}: ProjectEmbedProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    
    // Check if this is Pokemon Valentine project
    const isPokemonValentine = title.includes("Pokemon Valentine");

    // handle viewport sizing on mount and resize
    useEffect(() => {
        const updateViewportDimensions = () => {
            const isSmallScreen = window.innerWidth < 640;
            const isMediumScreen = window.innerWidth >= 640 && window.innerWidth < 1024;
            
            setIsMobile(isSmallScreen);
            setIsTablet(isMediumScreen);
            
            // Calculate proper container padding based on screen size
            const containerPadding = isSmallScreen ? 32 : isMediumScreen ? 48 : 64;
            
            // Special handling for Pokemon Valentine project on tablet and desktop
            if (isPokemonValentine && !isSmallScreen) {
                // For tablet and desktop, use fixed dimensions appropriate for Pokemon Valentine
                const availableWidth = window.innerWidth - containerPadding;
                
                // Use a standard desktop-friendly size that fits the Pokemon Valentine project well
                const desiredWidth = isMediumScreen ? 540 : 680; // Smaller on tablet, larger on desktop
                const finalWidth = Math.min(desiredWidth, availableWidth);
                const finalHeight = finalWidth * 0.8; // 5:4 aspect ratio works well for this project
                
                setViewportWidth(finalWidth);
                setViewportHeight(finalHeight);
                return;
            }
            
            // If a custom width is provided, use it ONLY ON MOBILE (but still respect available space)
            if (customWidth && isSmallScreen) {
                const availableWidth = window.innerWidth - containerPadding;
                
                // Use the custom width, but don't exceed available space
                const finalWidth = Math.min(customWidth, availableWidth);
                
                // Use tablet-like aspect ratio for height calculation (more rectangular)
                const finalHeight = finalWidth * 0.75; // 4:3 aspect ratio
                
                setViewportWidth(finalWidth);
                setViewportHeight(finalHeight);
                return;
            }
            
            // For all screens, use appropriate aspect ratios
            if (isSmallScreen) {
                // For mobile screens, use tablet-like proportions for all embeds
                const availableWidth = window.innerWidth - containerPadding;
                
                // Use consistent tablet-like aspect ratio for mobile
                const tabletAspectRatio = 0.75; // 4:3 ratio
                
                const finalWidth = availableWidth;
                const finalHeight = finalWidth * tabletAspectRatio;
                
                setViewportWidth(finalWidth);
                setViewportHeight(finalHeight);
                return;
            }
            
            // For tablet and desktop (original logic with minor improvements)
            if (fixedDesktopRatio) {
                // maintain desktop aspect ratio for certain projects
                const DESKTOP_ASPECT_RATIO = 16/9;
                const availableWidth = window.innerWidth - containerPadding;
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
                
                const availableWidth = window.innerWidth - containerPadding;
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
    }, [slug, fixedDesktopRatio, isMobile, isTablet, title, customWidth, isPokemonValentine]);

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
                        className={`flex justify-center overflow-hidden ${theme === "light" ? "bg-white" : "bg-black"}`}
                        style={{ 
                            height: isMobile ? `${viewportHeight}px` : `${viewportHeight}px`,
                            maxHeight: isMobile ? '65vh' : (fixedDesktopRatio ? '75vh' : '65vh'),
                            width: '100%',  // Use full width of Window
                            maxWidth: '100%'
                        }}
                    >
                        {viewportWidth > 0 && ( // only render when dimensions are calculated
                            <iframe
                                ref={iframeRef}
                                src={`${url}${theme !== "default" ? `?theme=${theme}` : ""}`}
                                title={title}
                                className="border-0"
                                loading="lazy"
                                aria-label={`${title} project embed`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    maxWidth: '100%',
                                    overflowX: 'hidden',
                                    border: 'none'
                                }}
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
