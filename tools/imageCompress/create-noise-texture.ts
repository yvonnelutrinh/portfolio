/**
 * Creates a simple noise texture image for the website
 */
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define output paths
const outputPath = path.resolve(__dirname, '../../public/images/noise.jpg');

// Create a noise texture
async function createNoiseTexture(): Promise<void> {
  try {
    console.log('Creating noise texture...');
    
    // Create a small noise texture (200x200 pixels)
    const width = 200;
    const height = 200;
    
    // Create raw pixel data with random noise
    const rawData = Buffer.alloc(width * height);
    
    // Fill with random noise (grayscale)
    for (let i = 0; i < rawData.length; i++) {
      // Create subtle noise pattern (values closer to 128 for subtle effect)
      const randomValue = Math.floor(Math.random() * 40) + 108; // Random values between 108-147
      rawData[i] = randomValue;
    }
    
    // Create the image using sharp
    await sharp(rawData, {
      raw: {
        width,
        height,
        channels: 1 // Grayscale
      }
    })
    .jpeg({ 
      quality: 80,
      // grayscale is not a valid option in the TypeScript type definitions
      // but using channels: 1 above already makes it grayscale
    })
    .toFile(outputPath);
    
    console.log(`✓ Noise texture created: ${outputPath}`);
  } catch (error) {
    console.error('Error creating noise texture:', error instanceof Error ? error.message : String(error));
  }
}

// Export the function for external use
export { createNoiseTexture };

// We can't automatically run this in TypeScript modules
// If you need to generate the texture, import and call this function
