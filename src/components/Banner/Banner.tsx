import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);
  
  // Check localStorage on component mount
  useEffect(() => {
    const bannerDismissed = localStorage.getItem('bannerDismissed');
    if (bannerDismissed === 'true') {
      setIsVisible(false);
    }
  }, []);
  
  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('bannerDismissed', 'true');
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="w-full bg-gray-800 py-2 px-4 text-center">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="w-8"></div> {/* Empty space to balance layout */}
        <p className="text-white font-mono px-4">
          &#9888; please excuse the mess while we renovate &#9888;
        </p>
        <button 
          onClick={handleDismiss}
          className="w-8 text-white hover:text-gray-300 transition-colors" 
          aria-label="Close banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
