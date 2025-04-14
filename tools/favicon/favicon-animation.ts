/**
 * Favicon Animation Tool
 * 
 * A utility for creating an animated favicon that cycles through
 * different text symbols similar to the navigation menu animation.
 */

/**
 * Configuration options for favicon animation
 */
interface FaviconAnimationConfig {
  /** Time in ms between favicon changes */
  animationSpeed?: number;
  /** Whether to randomize the order of favicons */
  randomizeOrder?: boolean;
  /** Optional array of custom icon paths to use */
  customIcons?: string[] | null;
  /** Whether to adapt to user's color scheme */
  adaptToColorScheme?: boolean;
}

/**
 * Options for creating a custom favicon SVG
 */
interface FaviconSVGOptions {
  /** Color of the text */
  textColor?: string;
  /** Size of the favicon in pixels */
  size?: number;
  /** Font family for the text */
  fontFamily?: string;
  /** Font size for the text */
  fontSize?: number;
}

/**
 * Return value from initFaviconAnimation with control functions
 */
interface FaviconAnimationControls {
  /** Start the animation */
  start: () => () => void;
  /** Stop the animation */
  stop: () => void;
  /** Update the favicon immediately */
  update: () => void;
}

/**
 * Initialize the favicon animation with the provided configuration.
 */
export function initFaviconAnimation(config: FaviconAnimationConfig = {}): FaviconAnimationControls {
  const defaultConfig: FaviconAnimationConfig = {
    animationSpeed: 500,
    randomizeOrder: false,
    customIcons: null,
    adaptToColorScheme: true
  };

  const options: FaviconAnimationConfig = { ...defaultConfig, ...config };

  // Symbols to use for animation (instead of file paths)
  const symbols: string[] = [
    '...', // favicon1
    '?!',  // favicon2
    ':|',  // favicon3
    '[•]', // favicon4
    '[]',  // favicon5
    '+-',  // favicon6
    '|||', // favicon7
    '::',  // favicon8
    '/**', // favicon9
    ':D',  // favicon10
    '-->', // favicon11
    '()'   // favicon12
  ];

  // Function to determine if user is in dark mode
  const isDarkMode = (): boolean => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Function to get the appropriate text color based on color scheme
  const getTextColor = (): string => {
    return options.adaptToColorScheme 
      ? (isDarkMode() ? 'white' : 'black')
      : 'white'; // Default to white if not adapting to color scheme
  };

  // Function to generate favicons with the correct color
  const generateFavicons = (): string[] => {
    const textColor = getTextColor();
    return options.customIcons || symbols.map(symbol => 
      createCustomFaviconSVG(symbol, { textColor })
    );
  };

  // Generate initial favicons
  let favicons: string[] = generateFavicons();
  
  // Track the current favicon index
  let currentFaviconIndex: number = 0;
  
  // Reference to the animation interval
  let animationInterval: number | null = null;
  
  // Function to update the favicon
  const updateFavicon = (): void => {
    if (options.randomizeOrder) {
      currentFaviconIndex = Math.floor(Math.random() * favicons.length);
    } else {
      currentFaviconIndex = (currentFaviconIndex + 1) % favicons.length;
    }
    
    const faviconLinkElements = document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]');
    
    if (faviconLinkElements.length > 0) {
      // Update existing favicon links
      faviconLinkElements.forEach(link => {
        link.href = favicons[currentFaviconIndex];
      });
    } else {
      // Create a new favicon link if none exists
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      link.href = favicons[currentFaviconIndex];
      document.head.appendChild(link);
    }
  };
  
  // Add event listener for color scheme changes
  if (options.adaptToColorScheme && window.matchMedia) {
    const colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Define the handler function
    const handleColorSchemeChange = (): void => {
      // Regenerate favicons with the new color scheme
      favicons = generateFavicons();
      // Update the current favicon immediately
      updateFavicon();
    };
    
    // Add the event listener
    if (colorSchemeMediaQuery.addEventListener) {
      colorSchemeMediaQuery.addEventListener('change', handleColorSchemeChange);
    } else if ('addListener' in colorSchemeMediaQuery) {
      // Fallback for older browsers
      colorSchemeMediaQuery.addListener(handleColorSchemeChange);
    }
  }
  
  // Start the animation
  const startAnimation = (): (() => void) => {
    if (animationInterval) {
      clearInterval(animationInterval);
    }
    
    // Set the initial favicon
    updateFavicon();
    
    // Start the animation interval
    animationInterval = window.setInterval(updateFavicon, options.animationSpeed);
    
    // Return a cleanup function
    return () => {
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    };
  };
  
  // Run the animation when the document is ready
  if (document.readyState === 'complete') {
    startAnimation();
  } else {
    window.addEventListener('load', startAnimation);
  }
  
  // Return control functions for external usage
  return {
    start: startAnimation,
    stop: () => {
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    },
    update: updateFavicon
  };
}

// Export a function to create a custom SVG favicon programmatically
export function createCustomFaviconSVG(symbol: string, options: FaviconSVGOptions = {}): string {
  const defaults: FaviconSVGOptions = {
    textColor: 'white',
    size: 32,
    fontFamily: 'monospace',
    fontSize: 16
  };
  
  const config: FaviconSVGOptions = { ...defaults, ...options };
  
  // Create SVG string with transparent background (removed the rect element)
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${config.size}" height="${config.size}" viewBox="0 0 ${config.size} ${config.size}"><text x="${config.size!/2}" y="${config.size!/2}" font-family="${config.fontFamily}" font-size="${config.fontSize}" fill="${config.textColor}" text-anchor="middle" dominant-baseline="middle">${symbol}</text></svg>`;
  
  // Convert SVG string to data URL
  const encodedSVG = encodeURIComponent(svgString);
  return `data:image/svg+xml;charset=utf-8,${encodedSVG}`;
}
