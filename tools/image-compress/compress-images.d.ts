/**
 * Type definitions for compress-images.js
 */

/**
 * Configuration for the image compression tool
 */
interface CompressionConfig {
  /**
   * Source directory containing PNG files
   */
  sourceDir: string;
  
  /**
   * Destination directory for original PNG files
   */
  pngDestDir: string;
  
  /**
   * Destination directory for compressed JPG files
   */
  jpgDestDir: string;
  
  /**
   * JPEG quality (0-100)
   */
  quality: number;
  
  /**
   * Directories to search for PNG references
   */
  searchDirs: string[];
  
  /**
   * Whether to update PNG references in files
   */
  updateReferences: boolean;
  
  /**
   * File types to search for PNG references
   */
  fileTypesToSearch: string[];
}

/**
 * Information about a processed image file
 */
interface ProcessedFile {
  /**
   * Path to the original PNG file
   */
  original: string;
  
  /**
   * Path to the moved PNG file
   */
  png: string;
  
  /**
   * Path to the compressed JPG file
   */
  jpg: string;
  
  /**
   * Relative path to the file (without extension)
   */
  relativePath: string;
}

/**
 * Ensures all destination directories exist
 */
declare function ensureDirectories(): void;

/**
 * Finds all PNG files in the source directory
 * @returns Array of PNG file paths
 */
declare function findPngFiles(): Promise<string[]>;

/**
 * Compresses a PNG file to JPEG and moves the original to assets
 * @param filePath Path to the PNG file
 * @returns Path to the created JPEG file
 */
declare function compressImage(filePath: string): Promise<ProcessedFile | null>;

/**
 * Update references to PNG files in codebase to use JPG
 * @param processedFiles Array of processed file paths
 */
declare function updateFileReferences(processedFiles: (ProcessedFile | null)[]): Promise<void>;

/**
 * Clean up original PNG files from public directory
 * @param processedFiles Array of processed file objects
 */
declare function cleanupOriginalFiles(processedFiles: (ProcessedFile | null)[]): Promise<void>;

/**
 * Main function
 */
declare function main(): Promise<void>;
