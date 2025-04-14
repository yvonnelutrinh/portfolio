import React, { useState, useEffect, useRef } from 'react';
import Window from '../Window/Window';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ImageSliderProps {
    projectTitle: string;
    images?: { src: string; alt: string }[];
    slug?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ projectTitle, images, slug }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [imageDetails, setImageDetails] = useState({ width: 0, height: 0, aspectRatio: 16/9 });
    const [isTransitioning, setIsTransitioning] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    // use images prop if available, otherwise use default images
    const sliderImages = images || [
        { src: '/bandsite.png', alt: 'BandSite application' },
        { src: '/instock-1.png', alt: 'InStock application - view 1' },
        { src: '/instock-2.png', alt: 'InStock application - view 2' },
        { src: '/instock-3.png', alt: 'InStock application - view 3' },
        { src: '/snaps-1.png', alt: 'Snaps application - view 1' },
        { src: '/snaps-2.png', alt: 'Snaps application - view 2' },
        { src: '/snaps-3.png', alt: 'Snaps application - view 3' }
    ];

    // check screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 640);
            setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // preload images and determine dimensions
    useEffect(() => {
        const preloadImages = () => {
            sliderImages.forEach((image, index) => {
                const img = new Image();
                img.src = image.src;
                
                img.onload = () => {
                    if (index === currentIndex) {
                        updateImageDetails(img.width, img.height);
                    }
                };
            });
        };
        
        preloadImages();
    }, [sliderImages]);

    // update image details when current index changes
    useEffect(() => {
        const updateCurrentImage = () => {
            const img = new Image();
            img.src = sliderImages[currentIndex].src;
            
            img.onload = () => {
                updateImageDetails(img.width, img.height);
            };
        };
        
        updateCurrentImage();
    }, [currentIndex, sliderImages]);

    // update image dimensions
    const updateImageDetails = (width: number, height: number) => {
        setImageDetails({
            width,
            height,
            aspectRatio: width / height
        });
    };

    // auto-advance slides (extended time interval)
    useEffect(() => {
        const timer = setTimeout(() => {
            handleNext();
        }, 15000); // extended to 15 seconds
        
        return () => clearTimeout(timer);
    }, [currentIndex]);

    // handle navigation with transition lock
    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
        
        // Release transition lock after animation completes
        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    };

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setDirection(1);
        setCurrentIndex((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
        
        // Release transition lock after animation completes
        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    };

    // touch event handlers for mobile swiping
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (isTransitioning) return;
        
        if (touchStart - touchEnd > 50) {
            // swipe left, go next
            handleNext();
        }

        if (touchStart - touchEnd < -50) {
            // swipe right, go prev
            handlePrev();
        }
    };

    // animation variants for slide transitions
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 1,
            zIndex: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            zIndex: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 1,
            zIndex: 0
        })
    };

    // calculate dynamic window dimensions based on device proportions
    const getWindowDimensions = () => {
        // Default aspect ratios for different device types
        const mobileAspectRatio = 9/16; // portrait orientation
        
        let windowWidth = 'auto';
        let windowHeight = 'auto';
        let maxWidth = '100%';
        let maxHeight = '60vh';
        
        // For mobile screens
        if (isMobile) {
            maxWidth = '90vw';
            maxHeight = '50vh';
            
            // If image is very tall, constrain height
            if (imageDetails.aspectRatio < 1) {
                windowHeight = `min(${maxHeight}, ${90 * mobileAspectRatio}vw)`;
            }
        } 
        // For tablet screens
        else if (isTablet) {
            maxWidth = '80vw';
            maxHeight = '60vh';
            
            // Scale down image if it's mobile-width (narrow)
            if (imageDetails.aspectRatio < 0.8) {
                maxWidth = '60vw';
            }
        } 
        // For desktop screens
        else {
            // Scale based on aspect ratio
            if (imageDetails.aspectRatio < 1) {
                // Portrait or mobile-width image gets scaled down
                maxWidth = '40vw';
            } else if (imageDetails.aspectRatio > 1.5) {
                // Widescreen images
                maxWidth = '70vw';
            } else {
                // Normal desktop proportions
                maxWidth = '60vw';
            }
        }
        
        return {
            maxWidth,
            maxHeight,
            width: windowWidth,
            height: windowHeight
        };
    };
    
    const windowDimensions = getWindowDimensions();

    return (
        <div className="w-full flex flex-col items-center justify-center py-4">
            <div 
                className="relative w-full px-4 md:px-8 lg:px-12"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                ref={containerRef}
            >
                {/* desktop navigation buttons - visible only on desktop */}
                {!isMobile && !isTablet && (
                    <>
                        <motion.div 
                            className="absolute top-1/2 z-10 transform -translate-y-1/2"
                            style={{ left: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <button
                                className="text-white font-mono hover:text-gray-300 transition-colors px-4"
                                onClick={handlePrev}
                                aria-label="previous sample"
                                disabled={isTransitioning}
                            >
                                ← PREV
                            </button>
                        </motion.div>

                        <motion.div 
                            className="absolute top-1/2 z-10 transform -translate-y-1/2"
                            style={{ right: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <button
                                className="text-white font-mono hover:text-gray-300 transition-colors px-4"
                                onClick={handleNext}
                                aria-label="next sample"
                                disabled={isTransitioning}
                            >
                                NEXT →
                            </button>
                        </motion.div>
                    </>
                )}

                {/* image with window */}
                <div 
                    className="mx-auto transition-all duration-300 overflow-visible"
                    style={{ 
                        maxWidth: windowDimensions.maxWidth,
                        width: windowDimensions.width,
                        height: windowDimensions.height
                    }}
                >
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="origin-center overflow-visible"
                    >
                        <Window title={`${projectTitle} | SAMPLE ${currentIndex + 1}/${sliderImages.length}`}>
                            <div className="overflow-y-auto bg-black" style={{ 
                                    maxHeight: `calc(${windowDimensions.maxHeight} - 3rem)`, 
                                    height: 'auto' 
                                }}>
                                <AnimatePresence custom={direction} initial={false} mode="wait">
                                    <motion.div 
                                        key={currentIndex}
                                        className="relative bg-black w-full h-full"
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 300, damping: 30 }
                                        }}
                                        style={{
                                            position: 'relative',
                                            top: 0,
                                            left: 0
                                        }}
                                    >
                                        <img 
                                            ref={imageRef}
                                            src={sliderImages[currentIndex].src} 
                                            alt={sliderImages[currentIndex].alt}
                                            className="w-full h-auto object-contain" 
                                            loading="lazy"
                                            onLoad={(e) => {
                                                const img = e.target as HTMLImageElement;
                                                updateImageDetails(img.naturalWidth, img.naturalHeight);
                                            }}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </Window>
                    </motion.div>
                </div>

                {/* mobile/tablet navigation and process buttons - visible only on mobile/tablet */}
                {(isMobile || isTablet) && (
                    <div className="flex justify-center gap-8 md:gap-12 mt-8 font-mono text-white">
                        <button
                            className="hover:text-gray-300 transition-colors px-2"
                            onClick={handlePrev}
                            aria-label="previous sample"
                            disabled={isTransitioning}
                        >
                            ← PREV
                        </button>
                        {slug && (
                            <Link 
                                to={`#process`}
                                className="hover:text-gray-300 transition-colors px-2"
                                aria-label="view process"
                            >
                                ↓ PROCESS
                            </Link>
                        )}
                        <button
                            className="hover:text-gray-300 transition-colors px-2"
                            onClick={handleNext}
                            aria-label="next sample"
                            disabled={isTransitioning}
                        >
                            NEXT →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageSlider;
