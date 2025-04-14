import React, { useMemo, useState, useEffect } from 'react';

interface ImageData {
  src: string;
  alt: string;
}

interface ImageCollageProps {
  images: ImageData | ImageData[];
  maxImages?: number;
  alignTop?: boolean; // controls vertical alignment
}

const ImageCollage: React.FC<ImageCollageProps> = ({ 
  images, 
  maxImages = 5,
  alignTop = false 
}) => {
  // tracks which image is being hovered
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // forces recalculation on mount
  const [refreshKey, setRefreshKey] = useState(Date.now());
  
  useEffect(() => {
    setRefreshKey(Date.now());
  }, []);
  
  // handle single image vs array
  const imageArray = useMemo(() => {
    return Array.isArray(images) ? images : [images];
  }, [images]);
  
  // cap the number of images shown
  const limitedImages = useMemo(() => {
    return imageArray.slice(0, maxImages);
  }, [imageArray, maxImages]);

  // single image layout
  if (limitedImages.length === 1) {
    return (
      <div 
        className={`relative w-full ${alignTop ? 'h-auto' : 'h-auto md:h-[500px]'}`} 
        style={{ 
          minHeight: alignTop ? 'auto' : '250px',
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
  
  // multi-image collage layout
  const createCollagePositions = () => {
    const positions: Array<{
      left: string;
      top: string;
      width: string;
      zIndex: number;
    }> = [];
    
    const totalImages = limitedImages.length;
    console.log("creating collage positions for", totalImages, "images");
    
    // position images based on count
    if (totalImages === 2) {
      // top-left
      positions.push({
        left: '0%',
        top: '0%',
        width: '75%',
        zIndex: 2
      });
      
      // bottom-right overlap
      positions.push({
        left: '40%',
        top: '30%',
        width: '60%',
        zIndex: 1
      });
    }
    else if (totalImages === 3) {
      // top-left
      positions.push({
        left: '0%',
        top: '0%',
        width: '60%',
        zIndex: 3
      });
      
      // top-right overlap
      positions.push({
        left: '45%',
        top: '10%',
        width: '55%',
        zIndex: 2
      });
      
      // bottom overlap
      positions.push({
        left: '20%',
        top: '45%',
        width: '60%',
        zIndex: 1
      });
    }
    else if (totalImages >= 4) {
      // top-left
      positions.push({
        left: '0%',
        top: '0%',
        width: '50%',
        zIndex: 4
      });
      
      // top-right overlap
      positions.push({
        left: '45%',
        top: '5%',
        width: '55%',
        zIndex: 3
      });
      
      // bottom-left overlap
      positions.push({
        left: '10%',
        top: '42%',
        width: '45%',
        zIndex: 2
      });
      
      // bottom-right overlap
      positions.push({
        left: '50%',
        top: '45%',
        width: '50%',
        zIndex: 1
      });
      
      // fifth image (center)
      if (totalImages >= 5) {
        positions.push({
          left: '30%',
          top: '25%',
          width: '40%',
          zIndex: 5
        });
      }
    }
    
    // fallback for any additional images
    while (positions.length < limitedImages.length) {
      const index = positions.length;
      positions.push({
        left: `${(index % 2) * 45}%`,
        top: `${Math.floor(index / 2) * 40}%`,
        width: '50%',
        zIndex: totalImages - index
      });
    }
    
    return positions;
  };

  const positions = useMemo(() => createCollagePositions(), [limitedImages.length, refreshKey]);
  
  // puts hovered image on top
  const getZIndex = (index: number): number => {
    if (hoveredIndex === index) {
      return 100;
    }
    
    if (!positions[index]) {
      return 1;
    }
    
    return positions[index].zIndex;
  };

  return (
    <div 
      className={`relative w-full ${alignTop ? 'h-auto' : 'h-[400px] md:h-[500px]'}`} 
      style={{ 
        minHeight: limitedImages.length > 1 ? '500px' : '350px',
        maxHeight: alignTop ? '800px' : 'auto'
      }}
    >
      {limitedImages.map((image, index) => {
        if (!positions[index]) return null;
        
        return (
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
        );
      })}
    </div>
  );
};

export default ImageCollage;