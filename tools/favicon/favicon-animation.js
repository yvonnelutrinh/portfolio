/**
 * Favicon Animation Tool
 * 
 * A utility for creating an animated favicon that cycles through
 * different text symbols similar to the navigation menu animation.
 */

/**
 * Initialize the favicon animation with the provided configuration.
 * 
 * @param {Object} config - Configuration options
 * @param {number} [config.animationSpeed=500] - Time in ms between favicon changes
 * @param {boolean} [config.randomizeOrder=false] - Whether to randomize the order of favicons
 * @param {string[]} [config.customIcons] - Optional array of custom icon paths to use
 * @param {boolean} [config.adaptToColorScheme=true] - Whether to adapt to user's color scheme
 */
export function initFaviconAnimation(config = {}) {
  const defaultConfig = {
    animationSpeed: 500,
    randomizeOrder: false,
    customIcons: null,
    adaptToColorScheme: true
  };

  const options = { ...defaultConfig, ...config };

  // Symbols to use for animation (instead of file paths)
  const symbols = [
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
  const isDarkMode = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Function to get the appropriate text color based on color scheme
  const getTextColor = () => {
    return options.adaptToColorScheme 
      ? (isDarkMode() ? 'white' : 'black')
      : 'white'; // Default to white if not adapting to color scheme
  };

  // Function to generate favicons with the correct color
  const generateFavicons = () => {
    const textColor = getTextColor();
    return options.customIcons || symbols.map(symbol => 
      createCustomFaviconSVG(symbol, { textColor })
    );
  };

  // Generate initial favicons
  let favicons = generateFavicons();
  
  // Track the current favicon index
  let currentFaviconIndex = 0;
  
  // Reference to the animation interval
  let animationInterval = null;
  
  // Function to update the favicon
  const updateFavicon = () => {
    if (options.randomizeOrder) {
      currentFaviconIndex = Math.floor(Math.random() * favicons.length);
    } else {
      currentFaviconIndex = (currentFaviconIndex + 1) % favicons.length;
    }
    
    const faviconLinkElements = document.querySelectorAll('link[rel="icon"]');
    
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
    const handleColorSchemeChange = () => {
      // Regenerate favicons with the new color scheme
      favicons = generateFavicons();
      // Update the current favicon immediately
      updateFavicon();
    };
    
    // Add the event listener
    if (colorSchemeMediaQuery.addEventListener) {
      colorSchemeMediaQuery.addEventListener('change', handleColorSchemeChange);
    } else if (colorSchemeMediaQuery.addListener) {
      // Fallback for older browsers
      colorSchemeMediaQuery.addListener(handleColorSchemeChange);
    }
  }
  
  // Start the animation
  const startAnimation = () => {
    if (animationInterval) {
      clearInterval(animationInterval);
    }
    
    // Set the initial favicon
    updateFavicon();
    
    // Start the animation interval
    animationInterval = setInterval(updateFavicon, options.animationSpeed);
    
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
export function createCustomFaviconSVG(symbol, options = {}) {
  const defaults = {
    textColor: 'white',
    size: 32,
    fontFamily: 'monospace',
    fontSize: 16
  };
  
  const config = { ...defaults, ...options };
  
  // Create SVG string with transparent background (removed the rect element)
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${config.size}" height="${config.size}" viewBox="0 0 ${config.size} ${config.size}"><text x="${config.size/2}" y="${config.size/2}" font-family="${config.fontFamily}" font-size="${config.fontSize}" fill="${config.textColor}" text-anchor="middle" dominant-baseline="middle">${symbol}</text></svg>`;
  
  // Convert SVG string to data URL
  const encodedSVG = encodeURIComponent(svgString);
  return `data:image/svg+xml;charset=utf-8,${encodedSVG}`;
}
