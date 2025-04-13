import React, { useMemo, useState, useEffect } from 'react';

interface ImageData {
  src: string;
  alt: string;
}

interface ImageCollageProps {
  images: ImageData | ImageData[];
  maxImages?: number;
}

const ImageCollage: React.FC<ImageCollageProps> = ({ images, maxImages = 5 }) => {
  // track currently hovered image index
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Add a key to force recalculation on component mount
  const [refreshKey, setRefreshKey] = useState(Date.now());
  
  // Force refresh on mount
  useEffect(() => {
    setRefreshKey(Date.now());
  }, []);
  
  // handle case when images is a single object (not an array)
  const imageArray = Array.isArray(images) ? images : [images];
  
  // limit # images to maxImages
  const limitedImages = imageArray.slice(0, maxImages);
  
  // calculate positions to avoid excessive overlap
  const imagePositions = useMemo(() => {
    const positions: Array<{ left: string; top: string; zIndex: number }> = [];
    const usedPositions: Array<{ x: number; y: number }> = [];
    
    const isPositionTooClose = (x: number, y: number): boolean => {
      // minimum distance between image centers (as percentage)
      const minDistance = 25;
      
      return usedPositions.some(pos => {
        const distance = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
        return distance < minDistance;
      });
    };
    
    limitedImages.forEach((_, index) => {
      // base positions are shifted more to the left
      // limit right side to avoid overflow issues
      const totalPositions = limitedImages.length;
      let baseX: number, baseY: number;
      let attempts = 0;
      
      // try to find a position that's not too close to others
      do {
        // distribute horizontally with emphasis on left side
        baseX = 5 + (index * 60) / (totalPositions > 1 ? totalPositions : 1);
        
        // Center images vertically within the container
        baseY = index % 2 === 0 ? 
          10 + (Math.random() * 12) :  // Top row: 10-22%
          30 + (Math.random() * 12);   // Bottom row: 30-42%
        
        // add slight randomness
        const randomX = Math.random() * 10 - 5; // -5 to 5
        const randomY = Math.random() * 10 - 5; // -5 to 5
        
        baseX += randomX;
        baseY += randomY;
        
        // ensure positions stay within bounds
        baseX = Math.max(5, Math.min(60, baseX));
        baseY = Math.max(5, Math.min(50, baseY)); // Reduced max to keep images centered
        
        attempts++;
      } while (isPositionTooClose(baseX, baseY) && attempts < 10);
      
      // store the used position
      usedPositions.push({ x: baseX, y: baseY });
      
      positions.push({
        left: `${baseX}%`,
        top: `${baseY}%`,
        zIndex: index + 1, // default z-index based on array position
      });
    });
    
    return positions;
  }, [limitedImages.length, refreshKey]); // Add refreshKey as dependency to recalculate on mount
  
  // get z-index for an image - highest for hovered image
  const getZIndex = (index: number): number => {
    // base z-index is the position in the array + 1
    const baseZIndex = index + 1;
    
    // if this is the hovered image, give it the highest z-index (100 + total images)
    if (hoveredIndex === index) {
      return 100 + limitedImages.length;
    }
    
    // otherwise return the default z-index
    return baseZIndex;
  };

  return (
    <div className="relative w-full h-full">
      {limitedImages.map((image, index) => (
        <div
          key={`${refreshKey}-${index}`} // Use refreshKey in key to ensure full re-render
          className="absolute shadow-md transition-all duration-300 hover:shadow-xl"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            left: imagePositions[index].left,
            top: imagePositions[index].top,
            zIndex: getZIndex(index),
            width: `${Math.max(25, 55 - limitedImages.length * 5)}%`, // Make images slightly smaller
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCollage;
