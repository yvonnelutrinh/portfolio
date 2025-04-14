/**
 * Type definitions for favicon-animation.js
 */

export interface FaviconAnimationConfig {
  /**
   * Time in ms between favicon changes
   * @default 500
   */
  animationSpeed?: number;
  
  /**
   * Whether to randomize the order of favicons
   * @default false
   */
  randomizeOrder?: boolean;
  
  /**
   * Optional array of custom icon paths to use
   * @default null
   */
  customIcons?: string[] | null;
}

export interface FaviconAnimationControls {
  /**
   * Start the favicon animation
   */
  start: () => void;
  
  /**
   * Stop the favicon animation
   */
  stop: () => void;
  
  /**
   * Force update to the next favicon
   */
  update: () => void;
}

/**
 * Initialize the favicon animation with the provided configuration.
 * 
 * @param config - Configuration options
 * @returns Control functions for the animation
 */
export function initFaviconAnimation(config?: FaviconAnimationConfig): FaviconAnimationControls;

/**
 * Create a custom SVG favicon programmatically
 * 
 * @param symbol - The text symbol to use in the favicon
 * @param options - Customization options
 * @returns Data URL of the SVG
 */
export function createCustomFaviconSVG(
  symbol: string, 
  options?: {
    textColor?: string;
    size?: number;
    fontFamily?: string;
    fontSize?: number;
  }
): string;
