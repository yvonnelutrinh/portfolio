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

// Configuration
const config = {
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
function debug(message, object = null) {
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
function ensureDirectories() {
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
async function findPngFiles() {
  debug(`Looking for PNG files in: ${config.sourceDir}`);
  
  // Use fs.readdir recursively instead of glob
  const result = [];
  
  // Helper function to recursively scan directories
  async function scanDirectory(dir) {
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
 * @returns {Promise<object|null>} Path to the created JPEG file
 */
async function compressImage(filePath) {
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
    console.error(`✗ Error processing ${filePath}:`, error);
    return null;
  }
}

/**
 * Update references to PNG files in codebase to use JPG
 * @param {Array} processedFiles Array of processed file paths
 */
async function updateFileReferences(processedFiles) {
  console.log('\nUpdating references in codebase...');
  
  // Create a map of original filenames to new JPG paths
  const replacementMap = {};
  
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
  const filesToSearch = [];
  
  for (const dir of config.searchDirs) {
    for (const ext of config.fileTypesToSearch) {
      try {
        const globPattern = `${dir}/**/*${ext}`;
        debug(`Searching for files matching pattern: ${globPattern}`);
        
        const matches = await new Promise((resolve, reject) => {
          glob(globPattern, (err, files) => {
            if (err) {
              debug(`Error finding files:`, err);
              reject(err);
            } else {
              debug(`Found ${files.length} files with extension ${ext}`);
              resolve(files);
            }
          });
        });
        
        filesToSearch.push(...matches);
      } catch (error) {
        console.error(`Error finding files with extension ${ext}:`, error);
      }
    }
  }
  
  debug(`Files to search for references: ${filesToSearch.length} files`);
  
  // Count successful replacements
  let totalReplacements = 0;
  
  // Process each file
  for (const filePath of filesToSearch) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let newContent = content;
      let fileModified = false;
      
      // Check for each PNG reference
      for (const [pngName, jpgPath] of Object.entries(replacementMap)) {
        // Handle various ways the PNG might be referenced
        const patterns = [
          new RegExp(`["']([./]*)${pngName}["']`, 'g'), // "filename.png" or './filename.png'
          new RegExp(`["']([./]*)public/${pngName}["']`, 'g'), // "public/filename.png"
          new RegExp(`["'](/|/public/)${pngName}["']`, 'g'), // "/filename.png" or "/public/filename.png"
        ];
        
        for (const pattern of patterns) {
          const matches = newContent.match(pattern);
          if (matches) {
            debug(`Found matches in ${filePath} for ${pngName}:`, matches);
            newContent = newContent.replace(pattern, `"${jpgPath}"`);
            fileModified = true;
            totalReplacements += matches.length;
          }
        }
      }
      
      // Save the modified file
      if (fileModified) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✓ Updated references in: ${filePath}`);
      }
    } catch (error) {
      console.error(`✗ Error updating references in ${filePath}:`, error);
    }
  }
  
  console.log(`\nCompleted ${totalReplacements} reference updates in ${filesToSearch.length} files.`);
}

/**
 * Clean up original PNG files from public directory
 * @param {Array} processedFiles Array of processed file objects
 */
async function cleanupOriginalFiles(processedFiles) {
  console.log('\nCleaning up original PNG files...');
  
  for (const file of processedFiles) {
    if (!file) continue;
    
    try {
      if (fs.existsSync(file.original)) {
        fs.unlinkSync(file.original);
        console.log(`✓ Removed original: ${file.original}`);
      } else {
        console.warn(`! Original file not found: ${file.original}`);
      }
    } catch (error) {
      console.error(`✗ Error removing ${file.original}:`, error);
    }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Image Compression Tool');
  console.log('=====================');
  console.log(`Source directory: ${config.sourceDir}`);
  console.log(`PNG destination: ${config.pngDestDir}`);
  console.log(`JPG destination: ${config.jpgDestDir}`);
  console.log(`JPEG quality: ${config.quality}`);
  console.log('=====================\n');
  
  try {
    // Ensure directories exist
    ensureDirectories();
    
    // Find all PNG files
    const pngFiles = await findPngFiles();
    console.log(`Found ${pngFiles.length} PNG files to process.\n`);
    
    if (pngFiles.length === 0) {
      console.log('No PNG files found in the source directory. Exiting.');
      return;
    }
    
    // Process each PNG file
    const processPromises = pngFiles.map(file => compressImage(file));
    const processedFiles = await Promise.all(processPromises);
    
    // Update references if enabled
    if (config.updateReferences) {
      await updateFileReferences(processedFiles);
    }
    
    // Clean up original files
    await cleanupOriginalFiles(processedFiles);
    
    console.log('\nProcess completed successfully!');
    console.log(`✓ ${processedFiles.filter(Boolean).length} images processed and optimized.`);
    
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

// Execute main function
main().catch(error => {
  console.error('Unhandled exception:', error);
});
