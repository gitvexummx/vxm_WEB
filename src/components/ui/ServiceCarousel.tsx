'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';

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
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const CARD_WIDTH = 352; // w-80 (320px) + mx-4 (32px total margins)
  const DUPLICATE_COUNT = 2; // Dos copias para continuidad perpetua
  
  // Motion values for drag
  const x = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  
  // Calculate total width of one complete set
  const singleSetWidth = services.length * CARD_WIDTH;
  
  // Auto-play functionality with smooth continuous motion - sin alternate, solo loop continuo
  useEffect(() => {
    if (!autoPlay || isHovering) return;
    
    const controls = animate(x, -singleSetWidth, {
      duration: autoPlayInterval * services.length / 1000,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });
    
    return () => controls.stop();
  }, [autoPlay, isHovering, services.length, singleSetWidth, autoPlayInterval, x]);
  
  // Reset position INSTANTLY when reaching the end (for seamless loop with 0s delay)
  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      if (latest <= -singleSetWidth) {
        // Instant reset to 0 with no transition - salto imperceptible por los clones
        x.jump(0);
      } else if (latest > 0) {
        // Instant reset to -singleSetWidth
        x.jump(-singleSetWidth);
      }
    });
    
    return () => unsubscribe();
  }, [x, singleSetWidth]);
  
  // Handle drag end - snap to nearest card
  const handleDragEnd = useCallback(() => {
    const currentX = x.get();
    const snappedPosition = Math.round(currentX / CARD_WIDTH) * CARD_WIDTH;
    
    // Keep within bounds
    const clampedPosition = Math.min(0, Math.max(-singleSetWidth, snappedPosition));
    x.set(clampedPosition);
  }, [x, singleSetWidth]);
  
  // Create duplicated array for infinite scroll (2 copies for seamless perpetuity)
  const displayServices = Array(DUPLICATE_COUNT).fill(services).flat();

  return (
    <div 
      className="relative overflow-hidden py-12 service-carousel-container"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        ref={carouselRef}
        className="flex cursor-grab active:cursor-grabbing"
        style={{ x: xSpring }}
        drag="x"
        dragConstraints={{ left: -singleSetWidth, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 0.98 }}
      >
        {displayServices.map((service, index) => (
          <motion.div
            key={`${service.id}-${index}`}
            className="flex-shrink-0 w-80 mx-4"
            initial={false}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <a href={`/servicios/${service.slug}`} className="block">
              <div className="glass-medium border border-neon-primary/20 rounded-xl p-6 h-[280px] hover:border-neon-primary/50 transition-colors duration-300 group cursor-pointer relative service-carousel-card">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-primary/20 to-neon-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-neon-primary/30 group-hover:to-neon-secondary/30 transition-colors duration-300">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-3">{service.description}</p>
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Gradient overlays for fade effect */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-dark-900 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-dark-900 to-transparent pointer-events-none z-10" />
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
