'use client';

import { useEffect, useRef, useState, useCallback, JSX } from 'react';
import gsap from 'gsap';

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

interface ServiceCarouselProps {
  services: Service[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ServiceCarousel({ 
  services, 
  autoPlay = true, 
  autoPlayInterval = 3000 
}: ServiceCarouselProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const gsapContextRef = useRef<gsap.Context | null>(null);
  const isTransitioningRef = useRef<boolean>(false);
  
  // Duplicate services for infinite loop effect
  const displayServices = [...services, ...services];
  const singleSetWidthPercent = 100 / services.length;
  
  // GSAP animation for smooth 60fps infinite scroll with teleportation
  useEffect(() => {
    if (!autoPlay || isHovering || isDragging || !trackRef.current) return;
    
    const track = trackRef.current;
    const cardWidth = track.querySelector('.service-carousel-card')?.getBoundingClientRect().width || 320;
    const gap = 16; // mx-4 = 1rem gap on each side
    const totalCardWidth = cardWidth + gap;
    const setWidthPx = services.length * totalCardWidth;
    
    gsapContextRef.current = gsap.context(() => {
      let currentX = 0;
      let lastPosition = 0;
      
      const animate = () => {
        if (isTransitioningRef.current) {
          requestAnimationFrame(animate);
          return;
        }
        
        currentX -= (totalCardWidth / autoPlayInterval) * 16.67; // pixels per frame at ~60fps
        
        // Check if we need to teleport
        if (currentX <= -setWidthPx) {
          isTransitioningRef.current = true;
          gsap.set(track, { x: currentX + setWidthPx });
          currentX += setWidthPx;
          isTransitioningRef.current = false;
        } else if (currentX > 0) {
          isTransitioningRef.current = true;
          gsap.set(track, { x: currentX - setWidthPx });
          currentX -= setWidthPx;
          isTransitioningRef.current = false;
        }
        
        gsap.set(track, { x: currentX, force3D: true });
        lastPosition = currentX;
        
        if (!isHovering && !isDragging) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }, carouselRef);
    
    return () => {
      if (gsapContextRef.current) {
        gsapContextRef.current.revert();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoPlay, isHovering, isDragging, services.length, autoPlayInterval]);
  
  // Drag functionality
  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    lastXRef.current = clientX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    
    if (gsapContextRef.current) {
      gsapContextRef.current.revert();
    }
    
    if (trackRef.current) {
      currentXRef.current = gsap.getProperty(trackRef.current, 'x') as number;
    }
  }, []);
  
  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging || !trackRef.current) return;
    
    const deltaX = clientX - startXRef.current;
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTimeRef.current;
    
    if (deltaTime > 0) {
      velocityRef.current = (clientX - lastXRef.current) / deltaTime;
    }
    
    lastXRef.current = clientX;
    lastTimeRef.current = currentTime;
    
    const newX = currentXRef.current + deltaX;
    gsap.set(trackRef.current, { x: newX, force3D: true });
  }, [isDragging]);
  
  const handleDragEnd = useCallback(() => {
    if (!isDragging || !trackRef.current) return;
    
    setIsDragging(false);
    
    const velocity = velocityRef.current;
    const currentX = gsap.getProperty(trackRef.current, 'x') as number;
    const track = trackRef.current;
    const cardWidth = track.querySelector('.service-carousel-card')?.getBoundingClientRect().width || 320;
    const gap = 16;
    const totalCardWidth = cardWidth + gap;
    const setWidthPx = services.length * totalCardWidth;
    
    // Normalize position to be within [-setWidthPx, 0] range
    let normalizedX = currentX % (-setWidthPx);
    if (normalizedX > 0) normalizedX += -setWidthPx;
    
    gsap.set(track, { x: normalizedX });
    
    // Apply momentum based on drag velocity
    if (Math.abs(velocity) > 0.1) {
      const momentumDuration = Math.min(Math.abs(velocity) * 0.5, 2);
      const targetX = normalizedX + (velocity * 100);
      
      gsap.to(track, {
        x: targetX,
        duration: momentumDuration,
        ease: 'power2.out',
        force3D: true,
        onComplete: () => {
          // Restart autoplay after momentum ends
        }
      });
    }
  }, [isDragging, services.length]);
  
  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };
  
  const handleMouseUp = () => {
    handleDragEnd();
  };
  
  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };
  
  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleDragStart(e.touches[0].clientX);
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleDragMove(e.touches[0].clientX);
    }
  };
  
  const handleTouchEnd = () => {
    handleDragEnd();
  };

  return (
    <div 
      ref={carouselRef}
      className="relative overflow-hidden py-8 md:py-12 service-carousel-container select-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        handleMouseLeave();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          userSelect: 'none'
        }}
      >
        {displayServices.map((service, index) => (
          <div
            key={`${service.id}-${index}`}
            className="flex-shrink-0 w-[280px] sm:w-80 mx-3 md:mx-4 max-w-[calc(100vw-2rem)] sm:max-w-[320px]"
            style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
          >
            <a href={`/servicios/${service.slug}`} className="block">
              <div className="glass-medium border border-neon-primary/20 rounded-xl p-5 md:p-6 h-auto min-h-[260px] md:min-h-[280px] hover:border-neon-primary/50 transition-colors duration-300 group service-carousel-card">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-neon-primary/20 to-neon-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-neon-primary/30 group-hover:to-neon-secondary/30 transition-colors duration-300">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-3">{service.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
      
      {/* Gradient overlays for fade effect */}
      <div className="absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-dark-900 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-dark-900 to-transparent pointer-events-none z-10" />
    </div>
  );
}

function getIcon(iconName: string) {
  const icons: Record<string, JSX.Element> = {
    brain: (
      <svg className="w-6 h-6 text-neon-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    cog: (
      <svg className="w-6 h-6 text-neon-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    code: (
      <svg className="w-6 h-6 text-neon-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    chart: (
      <svg className="w-6 h-6 text-neon-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    globe: (
      <svg className="w-6 h-6 text-neon-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    palette: (
      <svg className="w-6 h-6 text-neon-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    share: (
      <svg className="w-6 h-6 text-neon-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    support: (
      <svg className="w-6 h-6 text-neon-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  };
  
  return icons[iconName] || icons.code;
}
