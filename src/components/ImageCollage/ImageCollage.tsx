import React, { useMemo, useState, useEffect } from 'react';

interface ImageData {
  src: string;
  alt: string;
}

interface ImageCollageProps {
  images: ImageData | ImageData[];
  maxImages?: number;
  alignTop?: boolean; // New prop to control vertical alignment
}

const ImageCollage: React.FC<ImageCollageProps> = ({ 
  images, 
  maxImages = 5,
  alignTop = false 
}) => {
  // track currently hovered image index
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // add a key to force recalculation on component mount
  const [refreshKey, setRefreshKey] = useState(Date.now());
  
  // force refresh on mount
  useEffect(() => {
    setRefreshKey(Date.now());
  }, []);
  
  // handle case when images is a single object (not an array)
  const imageArray = Array.isArray(images) ? images : [images];
  
  // limit # images to maxImages
  const limitedImages = imageArray.slice(0, maxImages);

  // For a single image, use a centered approach
  if (limitedImages.length === 1) {
    return (
      <div 
        className={`relative w-full ${alignTop ? 'h-auto' : 'h-[400px] md:h-[500px]'}`} 
        style={{ 
          minHeight: '350px',
          maxHeight: alignTop ? '500px' : 'auto',
        }}
      >
        <div
          className="absolute shadow-md transition-all duration-300 hover:shadow-xl overflow-hidden"
          style={{
            left: '0%',
            top: '0%',
            width: '100%',
            height: 'auto',
            border: '2px solid #111'
          }}
        >
          <img
            src={limitedImages[0].src}
            alt={limitedImages[0].alt}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    );
  }
  
  // For multiple images, create a collage with slightly overlapping images
  const createCollagePositions = () => {
    const positions: Array<{
      left: string;
      top: string;
      width: string;
      zIndex: number;
    }> = [];
    
    const totalImages = limitedImages.length;
    
    // Position calculation based on number of images
    if (totalImages === 2) {
      // First image: Top-left (flush with top)
      positions.push({
        left: '0%',
        top: '0%',
        width: '75%',
        zIndex: 2
      });
      
      // Second image: Bottom-right with slight overlap
      positions.push({
        left: '40%',
        top: '30%',
        width: '60%',
        zIndex: 1
      });
    }
    else if (totalImages === 3) {
      // First image: Top-left (flush with top)
      positions.push({
        left: '0%',
        top: '0%',
        width: '60%',
        zIndex: 3
      });
      
      // Second image: Top-right with slight overlap
      positions.push({
        left: '45%',
        top: '10%',
        width: '55%',
        zIndex: 2
      });
      
      // Third image: Bottom with slight overlap
      positions.push({
        left: '20%',
        top: '45%',
        width: '60%',
        zIndex: 1
      });
    }
    else if (totalImages >= 4) {
      // First image: Top-left (flush with top)
      positions.push({
        left: '0%',
        top: '0%',
        width: '50%',
        zIndex: 4
      });
      
      // Second image: Top-right with slight overlap
      positions.push({
        left: '45%',
        top: '5%',
        width: '55%',
        zIndex: 3
      });
      
      // Third image: Bottom-left with slight overlap
      positions.push({
        left: '10%',
        top: '42%',
        width: '45%',
        zIndex: 2
      });
      
      // Fourth image: Bottom-right with slight overlap
      positions.push({
        left: '50%',
        top: '45%',
        width: '50%',
        zIndex: 1
      });
      
      // Fifth image (if present)
      if (totalImages >= 5) {
        positions.push({
          left: '30%',
          top: '25%',
          width: '40%',
          zIndex: 5
        });
      }
    }
    
    return positions;
  };

  const positions = useMemo(() => createCollagePositions(), [limitedImages.length, refreshKey]);
  
  // get z-index for an image - highest for hovered image
  const getZIndex = (index: number): number => {
    // If this is the hovered image, give it the highest z-index
    if (hoveredIndex === index) {
      return 100;
    }
    
    // Otherwise use the position's z-index
    return positions[index].zIndex;
  };

  return (
    <div 
      className={`relative w-full ${alignTop ? 'h-auto' : 'h-[400px] md:h-[500px]'}`} 
      style={{ 
        minHeight: '350px',
        maxHeight: alignTop ? '500px' : 'auto'
      }}
    >
      {limitedImages.map((image, index) => (
        <div
          key={`${refreshKey}-${index}`}
          className="absolute shadow-md transition-all duration-300 hover:shadow-xl overflow-hidden"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            left: positions[index].left,
            top: positions[index].top,
            width: positions[index].width,
            zIndex: getZIndex(index),
            border: '2px solid #111'
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCollage;
