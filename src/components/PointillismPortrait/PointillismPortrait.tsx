import { useEffect, useState, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  color: string;
  radius: number;
}

// extended properties needed for animation
interface AnimatedDot extends Dot {
  originalX: number;
  originalY: number;
  currentX: number;
  currentY: number;
  depth: number;
  breathePhase: number;
  breatheSpeed: number;
  breatheAmount: number;
  organicOffsetX: number;
  organicOffsetY: number;
  organicPhase: number;
  organicSpeed: number;
  hovered: boolean;
  hoverOffsetX: number;
  hoverOffsetY: number;
}

export default function PointillismPortrait() {
  const [primaryDots, setPrimaryDots] = useState<AnimatedDot[]>([]);
  const [depthDots, setDepthDots] = useState<AnimatedDot[]>([]);
  const [loading, setLoading] = useState(true);
  const [mouse, setMouse] = useState({ x: -100, y: -100 });
  const [time, setTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const breathingTimeRef = useRef<number>(0);
  const organicMovementRef = useRef<boolean>(false);
  
  // load + initialize dot data
  useEffect(() => {
    setLoading(true);
    
    fetch("data/dot-map.json")
      .then(res => res.json())
      .then((rawDots: Dot[]) => {
        const filteredDots = rawDots.filter(dot => dot.x > 85 && dot.x < 400); // remove rectangle bars on either side
        
        // create animated dots
        const animatedDots = filteredDots.map(dot => ({
          ...dot,
          radius: dot.radius * 0.6, // make dots 60% size of original
          originalX: dot.x,
          originalY: dot.y,
          currentX: dot.x,
          currentY: dot.y,
          depth: 1.0, // primary dots in foreground
          // "breathing" for organic dot movement
          breathePhase: Math.random() * Math.PI * 2,
          breatheSpeed: 0.3 + Math.random() * 0.4,
          breatheAmount: 1.2 + Math.random() * 0.8,
          organicOffsetX: Math.random() * 5 - 2.5,
          organicOffsetY: Math.random() * 5 - 2.5,
          organicPhase: Math.random() * Math.PI * 2,
          organicSpeed: 0.25 + Math.random() * 0.35,
          hovered: false,
          hoverOffsetX: 0,
          hoverOffsetY: 0
        }));
        
        setPrimaryDots(animatedDots);
        
        // create additional depth dots (smaller, background dots)
        const backgroundDots: AnimatedDot[] = [];
        const dotCount = Math.floor(filteredDots.length * 0.7); // 70% as many background dots
        
        for (let i = 0; i < dotCount; i++) {
          // pick a random reference dot from the primary dots
          const referenceDot = filteredDots[Math.floor(Math.random() * filteredDots.length)];
          
          // create a slightly shifted version with diff properties
          const offsetX = (Math.random() - 0.5) * 15;
          const offsetY = (Math.random() - 0.5) * 15;
          const depth = Math.random() * 0.5; // depth between 0-0.5 (background)
          
          // darken color based on depth
          const rgbMatch = referenceDot.color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
          let adjustedColor = referenceDot.color;
          
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);
            
            const darkenFactor = 0.6 + depth * 0.4; // darker for background dots
            const newR = Math.floor(r * darkenFactor);
            const newG = Math.floor(g * darkenFactor);
            const newB = Math.floor(b * darkenFactor);
            
            adjustedColor = `rgb(${newR}, ${newG}, ${newB})`;
          }
          
          backgroundDots.push({
            x: referenceDot.x + offsetX,
            y: referenceDot.y + offsetY,
            color: adjustedColor,
            radius: referenceDot.radius * 0.4 * (0.3 + depth * 0.4), // even smaller radius for background dots
            originalX: referenceDot.x + offsetX,
            originalY: referenceDot.y + offsetY,
            currentX: referenceDot.x + offsetX,
            currentY: referenceDot.y + offsetY,
            depth: depth,
            // background dots breathe at different pace/movement
            breathePhase: Math.random() * Math.PI * 2,
            breatheSpeed: 0.15 + Math.random() * 0.25,
            breatheAmount: 0.6 + Math.random() * 0.6,
            organicOffsetX: Math.random() * 3 - 1.5,
            organicOffsetY: Math.random() * 3 - 1.5,
            organicPhase: Math.random() * Math.PI * 2,
            organicSpeed: 0.15 + Math.random() * 0.25,
            hovered: false,
            hoverOffsetX: 0,
            hoverOffsetY: 0
          });
        }
        
        setDepthDots(backgroundDots);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading dot data:", err);
        setLoading(false);
      });
    
    // set up continuous breathing animation at 60fps
    const breathingInterval = setInterval(() => {
      breathingTimeRef.current += 0.016; // ~60fps time increment
    }, 16);
    
    // set up more frequent organic movement bursts
    const organicMovementInterval = setInterval(() => {
      if (Math.random() > 0.8) { // increased chance (20%) of organic movement every 2.5 seconds
        organicMovementRef.current = true;
      
        setTime(prev => prev + 1);
        
        setTimeout(() => {
          organicMovementRef.current = false;
        }, 2000);
      }
    }, 2500);
    
    return () => {
      clearInterval(breathingInterval);
      clearInterval(organicMovementInterval);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  // set up canvas for smooth rendering, resize handling with high DPI support
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const setupCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = parent.clientWidth;
        const displayHeight = parent.clientHeight;
        
        // set canvas size accounting for high DPI displays
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // scale drawing operations for high DPI
          ctx.scale(dpr, dpr);
        }
      }
    };
    
    setupCanvas();
    
    const handleResize = () => {
      setupCanvas();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // mouse tracking
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMouse({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    const handleMouseLeave = () => {
      setMouse({ x: -100, y: -100 });
    };
    
    window.addEventListener("mousemove", updateMouse);
    if (canvasRef.current) {
      canvasRef.current.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      window.removeEventListener("mousemove", updateMouse);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);
  
  // animation loop
  useEffect(() => {
    // wait for dots to load to start animation
    if (!canvasRef.current || primaryDots.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    
    let lastTime = performance.now();
    // increased mouse influence distance + hover detection area
    const maxDistance = 150;
    const hoverDistance = 10;
    
    // all dots combined for rendering (background then foreground)
    const allDots = [...depthDots, ...primaryDots];
    
    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1); // cap delta time
      lastTime = currentTime;
      
      // get actual canvas drawing dimensions (account for DPI)
      const displayWidth = canvas.width / (window.devicePixelRatio || 1);
      const displayHeight = canvas.height / (window.devicePixelRatio || 1);
      
      // clear canvas with alpha for potential background
      ctx.clearRect(0, 0, displayWidth, displayHeight);
      
      // local breathing time that's continuously incremented
      const breathingTime = breathingTimeRef.current;
      const isOrganic = organicMovementRef.current;
      
      // update and render all dots
      for (let i = 0; i < allDots.length; i++) {
        const dot = allDots[i];
        
        // calculate continuous breathing motion (continuous)
        const breathePhase = dot.breathePhase + breathingTime * dot.breatheSpeed;
        const breatheX = Math.sin(breathePhase) * dot.breatheAmount;
        const breatheY = Math.cos(breathePhase * 1.3) * dot.breatheAmount;
        
        // calculate mouse proximity effect
        const dx = mouse.x - dot.originalX;
        const dy = mouse.y - dot.originalY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - distance / maxDistance);
        
        // check for hover
        const isHovered = distance < dot.radius + hoverDistance;
        
        // calculate repulsion based on depth (deeper dots react less)
        const repulsionStrength = 35 * proximity * dot.depth;
        const angle = Math.atan2(dy, dx);
        const repelX = -Math.cos(angle) * repulsionStrength;
        const repelY = -Math.sin(angle) * repulsionStrength;
        
        // calculate organic motion (occasional bursts)
        let organicX = 0;
        let organicY = 0;
        if (isOrganic) {
          const phase = dot.organicPhase + time * 0.1 * dot.organicSpeed;
          organicX = Math.sin(phase) * dot.organicOffsetX * 1.5;
          organicY = Math.cos(phase * 1.3) * dot.organicOffsetY * 1.5;
        }
        
        // calculate hover effect
        let hoverX = 0;
        let hoverY = 0;
        if (isHovered) {
          if (!dot.hoverOffsetX && !dot.hoverOffsetY) {
            // generate new random hover offset when first hovered
            hoverX = (Math.random() * 10 - 5) * dot.depth;
            hoverY = (Math.random() * 10 - 5) * dot.depth;
            dot.hoverOffsetX = hoverX;
            dot.hoverOffsetY = hoverY;
          } else {
            hoverX = dot.hoverOffsetX;
            hoverY = dot.hoverOffsetY;
          }
        } else {
          // reset hover offsets when not hovered
          dot.hoverOffsetX = 0;
          dot.hoverOffsetY = 0;
        }
        
        // target position combining all motion types
        const targetX = dot.originalX + breatheX + organicX + repelX + hoverX;
        const targetY = dot.originalY + breatheY + organicY + repelY + hoverY;
        
        // apply spring physics (deeper dots move slower)
        const spring = isHovered ? 4 * dot.depth : 6 * dot.depth;
        const dxCurrent = targetX - dot.currentX;
        const dyCurrent = targetY - dot.currentY;
        
        // update current position with spring physics
        dot.currentX += dxCurrent * deltaTime * spring;
        dot.currentY += dyCurrent * deltaTime * spring;
        
        // render the dot with slight opacity based on depth
        ctx.globalAlpha = 0.7 + dot.depth * 0.3;
        ctx.beginPath();
        ctx.fillStyle = dot.color;
        
        // size based on depth and hover
        const sizeMultiplier = dot.depth * (isHovered ? 1.3 : 1); // more size increase on hover
        ctx.arc(
          dot.currentX, 
          dot.currentY, 
          dot.radius * sizeMultiplier, 
          0, 
          Math.PI * 2
        );
        ctx.fill();
      }
      
      // reset alpha
      ctx.globalAlpha = 1;
      
      // continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [primaryDots, depthDots, mouse, time]);
  
  return (
    <div className="relative w-full max-w-lg h-[512px] bg-black overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Loading portrait...
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  );
}