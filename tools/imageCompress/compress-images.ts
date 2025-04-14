/**
 * Image Compression Tool
 * 
 * This script:
 * 1. Compresses PNG files to web-optimized JPGs
 * 2. Moves original PNGs to src/assets/images
 * 3. Saves compressed JPGs to public/images
 * 4. Optionally updates references in code files
 * 
 * Dependencies: sharp
 * Install: npm install sharp
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration type definition
interface CompressConfig {
  sourceDir: string;
  pngDestDir: string;
  jpgDestDir: string;
  quality: number;
  searchDirs: string[];
  updateReferences: boolean;
  fileTypesToSearch: string[];
}

// Processed file information
interface ProcessedFile {
  original: string;
  png: string;
  jpg: string;
  relativePath: string;
}

// Configuration
const config: CompressConfig = {
  sourceDir: path.resolve(__dirname, '../../public'),
  pngDestDir: path.resolve(__dirname, '../../src/assets/images'),
  jpgDestDir: path.resolve(__dirname, '../../public/images'),
  quality: 80, // JPEG quality (0-100)
  searchDirs: [
    path.resolve(__dirname, '../../src'),
  ],
  updateReferences: true,
  fileTypesToSearch: ['.js', '.jsx', '.ts', '.tsx', '.css', '.json', '.html']
};

// Debug mode
const DEBUG = true;

/**
 * Debug logging helper
 */
function debug(message: string, object: any = null): void {
  if (DEBUG) {
    if (object) {
      console.log(`[DEBUG] ${message}`, object);
    } else {
      console.log(`[DEBUG] ${message}`);
    }
  }
}

/**
 * Ensures all destination directories exist
 */
function ensureDirectories(): void {
  if (!fs.existsSync(config.pngDestDir)) {
    fs.mkdirSync(config.pngDestDir, { recursive: true });
    console.log(`Created directory: ${config.pngDestDir}`);
  }
  
  if (!fs.existsSync(config.jpgDestDir)) {
    fs.mkdirSync(config.jpgDestDir, { recursive: true });
    console.log(`Created directory: ${config.jpgDestDir}`);
  }
}

/**
 * Finds all PNG files in the source directory using fs instead of glob
 * @returns {Promise<string[]>} Array of PNG file paths
 */
async function findPngFiles(): Promise<string[]> {
  debug(`Looking for PNG files in: ${config.sourceDir}`);
  
  // Use fs.readdir recursively instead of glob
  const result: string[] = [];
  
  // Helper function to recursively scan directories
  async function scanDirectory(dir: string): Promise<void> {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await scanDirectory(fullPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
        result.push(fullPath);
      }
    }
  }
  
  try {
    await scanDirectory(config.sourceDir);
    debug(`Found ${result.length} PNG files:`);
    if (DEBUG && result.length > 0) {
      result.forEach(file => debug(`- ${file}`));
    }
    return result;
  } catch (error) {
    debug(`Exception during file search:`, error);
    console.error('Error scanning directories:', error);
    return [];
  }
}

/**
 * Compresses a PNG file to JPEG and moves the original to assets
 * @param {string} filePath Path to the PNG file
 * @returns {Promise<ProcessedFile|null>} Path to the created JPEG file
 */
async function compressImage(filePath: string): Promise<ProcessedFile | null> {
  const filename = path.basename(filePath, '.png');
  const relativeDir = path.dirname(filePath).replace(config.sourceDir, '');
  
  debug(`Processing file: ${filePath}`);
  debug(`Filename: ${filename}, RelativeDir: ${relativeDir}`);
  
  // Ensure subdirectories exist
  const pngSubDir = path.join(config.pngDestDir, relativeDir);
  const jpgSubDir = path.join(config.jpgDestDir, relativeDir);
  
  debug(`PNG output directory: ${pngSubDir}`);
  debug(`JPG output directory: ${jpgSubDir}`);
  
  if (!fs.existsSync(pngSubDir)) {
    fs.mkdirSync(pngSubDir, { recursive: true });
  }
  
  if (!fs.existsSync(jpgSubDir)) {
    fs.mkdirSync(jpgSubDir, { recursive: true });
  }
  
  // Define output paths
  const pngOutputPath = path.join(pngSubDir, path.basename(filePath));
  const jpgOutputPath = path.join(jpgSubDir, `${filename}.jpg`);
  
  debug(`PNG output path: ${pngOutputPath}`);
  debug(`JPG output path: ${jpgOutputPath}`);
  
  // Process the image
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`Source file does not exist: ${filePath}`);
    }
    
    // Compress to JPEG
    await sharp(filePath)
      .jpeg({ quality: config.quality, mozjpeg: true })
      .toFile(jpgOutputPath);
    
    // Move original PNG
    fs.copyFileSync(filePath, pngOutputPath);
    
    console.log(`✓ Processed: ${path.basename(filePath)}`);
    console.log(`  - Original PNG moved to: ${pngOutputPath}`);
    console.log(`  - Compressed JPG saved to: ${jpgOutputPath}`);
    
    return {
      original: filePath,
      png: pngOutputPath,
      jpg: jpgOutputPath,
      relativePath: path.join(relativeDir, filename).replace(/\\/g, '/'),
    };
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error instanceof Error ? error.message : String(error));
    return null;
  }
}

/**
 * Update references to PNG files in codebase to use JPG
 * @param {Array<ProcessedFile|null>} processedFiles Array of processed file paths
 */
async function updateFileReferences(processedFiles: (ProcessedFile | null)[]): Promise<void> {
  console.log('\nUpdating references in codebase...');
  
  // Create a map of original filenames to new JPG paths
  const replacementMap: Record<string, string> = {};
  
  processedFiles.forEach(file => {
    if (!file) return;
    
    // Create mapping from "filename.png" to "/images/path/to/filename.jpg"
    const pngFilename = path.basename(file.original);
    
    // Fix: Ensure there's a slash between '/images' and the path
    let relativePath = file.relativePath;
    if (relativePath.startsWith('/')) {
      relativePath = relativePath.substring(1);
    }
    
    const relativeJpgPath = `/images/${relativePath}.jpg`;
    
    replacementMap[pngFilename] = relativeJpgPath;
  });
  
  debug(`Replacement map:`, replacementMap);
  
  // Find files to search through
  const filesToSearch: string[] = [];
  
  for (const searchDir of config.searchDirs) {
    for (const fileType of config.fileTypesToSearch) {
      const pattern = `${searchDir}/**/*${fileType}`;
      debug(`Searching for ${pattern}`);
      
      try {
        const matches = await glob(pattern);
        filesToSearch.push(...matches);
      } catch (error) {
        console.error(`Error finding ${fileType} files in ${searchDir}:`, error);
      }
    }
  }
  
  debug(`Found ${filesToSearch.length} files to check for references`);
  
  // Counter for stats
  let filesUpdated = 0;
  let referencesReplaced = 0;
  
  // Process each file
  for (const file of filesToSearch) {
    let fileContent = fs.readFileSync(file, 'utf8');
    let fileUpdated = false;
    
    // Check for each PNG filename in the file content
    for (const [pngFilename, jpgPath] of Object.entries(replacementMap)) {
      const regex = new RegExp(pngFilename, 'g');
      const initialLength = fileContent.length;
      
      // Replace only the filename in places where it looks like a reference
      fileContent = fileContent.replace(regex, (match: string, offset: number, string: string) => {
        // Simple heuristic to prevent replacing text that happens to match the filename
        // Check that the match appears to be part of a path or URL
        const before = string.slice(Math.max(0, offset - 20), offset);
        const isLikelyReference = 
          before.includes('/') || 
          before.includes('url(') || 
          before.includes('src=') || 
          before.includes('href=');
        
        if (isLikelyReference) {
          referencesReplaced++;
          return path.basename(jpgPath);
        }
        
        return match; // Keep the original if not a likely reference
      });
      
      if (fileContent.length !== initialLength) {
        fileUpdated = true;
      }
    }
    
    // Write the updated content back if changes were made
    if (fileUpdated) {
      fs.writeFileSync(file, fileContent, 'utf8');
      console.log(`✓ Updated references in: ${file}`);
      filesUpdated++;
    }
  }
  
  console.log(`\nReference update complete:`);
  console.log(`- ${filesUpdated} files updated`);
  console.log(`- ${referencesReplaced} references replaced`);
}

/**
 * Clean up original PNG files from public directory
 * @param {Array<ProcessedFile|null>} processedFiles Array of processed file objects
 */
async function cleanupOriginalFiles(processedFiles: (ProcessedFile | null)[]): Promise<void> {
  console.log('\nCleaning up original PNG files...');
  
  let count = 0;
  
  processedFiles.forEach(file => {
    if (!file) return;
    
    try {
      if (fs.existsSync(file.original)) {
        fs.unlinkSync(file.original);
        count++;
        debug(`Removed original: ${file.original}`);
      }
    } catch (error) {
      console.error(`Error removing ${file.original}:`, error instanceof Error ? error.message : String(error));
    }
  });
  
  console.log(`✓ Removed ${count} original PNG files from public directory`);
}

/**
 * Main function to run the compression workflow
 */
async function main(): Promise<void> {
  console.log('=== Image Compression Tool ===\n');
  
  // Step 1: Ensure directories exist
  console.log('Step 1: Checking directories');
  ensureDirectories();
  
  // Step 2: Find PNG files
  console.log('\nStep 2: Finding PNG files');
  const pngFiles = await findPngFiles();
  
  if (pngFiles.length === 0) {
    console.log('No PNG files found. Exiting.');
    return;
  }
  
  console.log(`Found ${pngFiles.length} PNG files to process.`);
  
  // Step 3: Process each file
  console.log('\nStep 3: Processing images');
  const processedFiles: (ProcessedFile | null)[] = [];
  
  for (const filePath of pngFiles) {
    const result = await compressImage(filePath);
    processedFiles.push(result);
  }
  
  const successfulFiles = processedFiles.filter(file => file !== null);
  console.log(`\nProcessed ${successfulFiles.length} of ${pngFiles.length} files successfully.`);
  
  // Step 4: Update references in codebase
  if (config.updateReferences && successfulFiles.length > 0) {
    console.log('\nStep 4: Updating references in codebase');
    await updateFileReferences(processedFiles);
  }
  
  // Step 5: Clean up original files
  console.log('\nStep 5: Cleaning up original files');
  await cleanupOriginalFiles(processedFiles);
  
  console.log('\n=== Compression complete ===');
}

// Execute main function
main().catch(error => {
  console.error('Unhandled exception:', error instanceof Error ? error.message : String(error));
});
