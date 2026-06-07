import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  tags: string[];
}

interface ServiceCarouselProps {
  services: ServiceCard[];
}

export function ServiceCarousel({ services }: ServiceCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setYRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Drag values
  const dragX = useMotionValue(0);
  const [dragOffset, setDragOffset] = useState(0);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef<number | null>(null);
  const isManualDrag = useRef(false);

  // Constants for infinite logic
  const cardWidth = 320; // w-80 + gap approx
  const gap = 16; // gap-4
  const totalCards = services.length;
  const setWidth = totalCards * (cardWidth + gap);
  const midpoint = setWidth / 2;

  // Create Set Y (the clone set that teleports)
  const SetY = () => (
    <div 
      ref={setYRef}
      className="absolute top-0 left-0 flex gap-4 h-full pointer-events-none"
      style={{ 
        willChange: 'transform',
        transform: 'translateX(-100%)' // Initial position: Left side
      }}
    >
      {services.map((service) => (
        <div
          key={`set-y-${service.id}`}
          className="w-80 flex-shrink-0"
          style={{ pointerEvents: 'none' }}
        >
          <a href={service.link} className="block group" style={{ pointerEvents: 'auto' }}>
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors duration-300 overflow-hidden">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-300">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </a>
        </div>
      ))}
    </div>
  );

  // Update Set Y position based on Set X scroll position
  const updateSetYPosition = useCallback(() => {
    if (!trackRef.current || !setYRef.current) return;
    
    const track = trackRef.current;
    const setY = setYRef.current;
    
    // Get current translation of Set X (Track)
    const style = window.getComputedStyle(track);
    const matrix = new WebKitCSSMatrix(style.transform);
    const currentX = Math.abs(matrix.m41 % setWidth); // Normalize to 0-setWidth
    
    // Logic: 
    // If currentX < midpoint (Left half of Set X visible) -> Set Y should be on LEFT (-100%)
    // If currentX >= midpoint (Right half of Set X visible) -> Set Y should be on RIGHT (100%)
    // Wait, user said: "si en pantalla está la mitad izquierda del set X de cards, el set Y estará a su izquierda"
    // This means Set Y is filling the gap on the left.
    // Actually, for infinite illusion:
    // When scrolling Left (negative X):
    //   If we see Right half of Set X, we need Set Y on the Right to fill upcoming space? No.
    //   Let's stick to the prompt: "mitad izquierda del set X ... set Y a su izquierda"
    
    let targetTranslate = '-100%';
    
    // Determine which half is primarily in view relative to the container center
    // Since the track moves negative (left), currentX represents how much we've scrolled.
    // 0 to midpoint: Left half of Set X is passing through.
    // midpoint to setWidth: Right half of Set X is passing through.
    
    if (currentX < midpoint) {
      // Left half of Set X is in focus -> Set Y goes to Left
      targetTranslate = '-100%';
    } else {
      // Right half of Set X is in focus -> Set Y goes to Right
      targetTranslate = '100%';
    }

    // Apply instantly without transition to avoid visual jump
    setY.style.transition = 'none';
    setY.style.transform = `translateX(${targetTranslate})`;
  }, [setWidth, midpoint]);

  // Animation Loop for smooth 60fps drag and momentum
  const animate = useCallback(() => {
    if (!trackRef.current) return;

    if (isManualDrag.current) {
      // While dragging manually, update position directly from dragX
      const newX = dragX.get() + dragOffset;
      gsap.set(trackRef.current, { x: newX });
      velocity.current = (newX - lastX.current);
      lastX.current = newX;
      updateSetYPosition();
      rafId.current = requestAnimationFrame(animate);
    } else if (!isPaused && !animationRef.current) {
      // Auto-play logic handled by GSAP tween, but we need to update SetY continuously
      updateSetYPosition();
      rafId.current = requestAnimationFrame(animate);
    } else if (isPaused) {
       // Even when paused, we might need to update SetY if user drags while paused? 
       // Assuming pause freezes everything including drag for simplicity, or drag overrides pause.
       // If drag overrides pause, isManualDrag would be true.
       updateSetYPosition();
       rafId.current = requestAnimationFrame(animate);
    }
  }, [dragX, dragOffset, isPaused, updateSetYPosition]);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const container = containerRef.current;
    const track = trackRef.current;
    const totalWidth = setWidth * 2; // Set X + Set Y (conceptually)

    // Initial GSAP Animation for Auto-play
    const runAnimation = () => {
      if (isPaused || isDragging) return;

      // Kill existing animation
      if (animationRef.current) animationRef.current.kill();

      // Animate Set X from 0 to -setWidth (one full set length)
      animationRef.current = gsap.to(track, {
        x: `-=${setWidth}`, // Move left by one set width
        duration: 40, // Speed
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: (x: string) => {
            // Wrap logic inside GSAP modifier to reset seamlessly
            const numericX = parseFloat(x);
            if (Math.abs(numericX) >= setWidth) {
              return '0px'; // Reset to 0 instantly when one set length is covered
            }
            return x;
          }
        },
        onUpdate: () => {
          updateSetYPosition();
        }
      });
    };

    // Start auto animation
    runAnimation();

    // Start RAF loop for SetY updates and Drag physics
    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) animationRef.current.kill();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isPaused, isDragging, setWidth, animate, updateSetYPosition]);

  // Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    isManualDrag.current = true;
    lastX.current = dragX.get() + dragOffset;
    velocity.current = 0;
    
    // Pause auto-animation while dragging
    if (animationRef.current) {
      animationRef.current.pause();
    }
    
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    // dragX is updated by framer-motion automatically via prop, 
    // but we need to combine it with offset if we want complex behavior.
    // Simpler approach: Use framer-motion drag props and sync GSAP position in animate loop.
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    isManualDrag.current = false;
    
    // Calculate final offset to maintain position after drag
    const finalDragX = dragX.get();
    setDragOffset(prev => prev + finalDragX);
    dragX.set(0); // Reset motion value
    
    // Momentum: If velocity is high, continue sliding
    if (Math.abs(velocity.current) > 0.5) {
      gsap.to(trackRef.current, {
        x: `+=${velocity.current * 50}`, // Throw effect
        duration: 1,
        ease: 'power3.out',
        onComplete: () => {
           // Resume auto animation after throw
           setDragOffset(prev => {
             // Calculate new normalized offset to keep continuity
             // This is tricky with GSAP reset logic. 
             // Simplified: Just resume normal animation from current visual spot
             // The GSAP modifier handles the wrap, so we just need to ensure 
             // the DOM element is where GSAP thinks it is.
             return 0; // Reset offset logic for simplicity in this specific GSAP setup
           });
           if(containerRef.current) {
              // Force restart animation logic to sync state
              const event = new Event('restart-carousel');
              window.dispatchEvent(event);
           }
        }
      });
    } else {
      // Resume auto animation immediately if no throw
      if (animationRef.current) {
        animationRef.current.resume();
      }
    }
    
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  // Listen for restart event after momentum
  useEffect(() => {
    const handleRestart = () => {
       if (!isPaused && !isDragging && trackRef.current) {
         if (animationRef.current) animationRef.current.kill();
         // Re-trigger the main effect logic by toggling a state or calling runAnimation
         // For simplicity, we rely on the dependency array of the main useEffect 
         // but since we can't toggle deps easily, we manually recreate the tween:
         const track = trackRef.current;
         animationRef.current = gsap.to(track, {
            x: `-=${setWidth}`,
            duration: 40,
            ease: 'none',
            repeat: -1,
            modifiers: {
              x: (x: string) => {
                const numericX = parseFloat(x);
                if (Math.abs(numericX) >= setWidth) return '0px';
                return x;
              }
            },
            onUpdate: updateSetYPosition
         });
       }
    };
    window.addEventListener('restart-carousel', handleRestart);
    return () => window.removeEventListener('restart-carousel', handleRestart);
  }, [isPaused, isDragging, setWidth, updateSetYPosition]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden py-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Draggable Track containing Set X */}
      <motion.div
        ref={trackRef}
        className="flex gap-4 will-change-transform"
        drag="x"
        dragMomentum={false} // We handle momentum manually for 60fps control
        x={dragX}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          width: 'max-content'
        }}
      >
        {/* SET X: The main animated set */}
        {services.map((service) => (
          <div
            key={`set-x-${service.id}`}
            className="w-80 flex-shrink-0"
            style={{ 
              pointerEvents: isDragging ? 'none' : 'auto',
              userSelect: isDragging ? 'none' : 'auto'
            }}
          >
            <a href={service.link} className="block group" style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors duration-300 overflow-hidden">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-300">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>
        ))}
      </motion.div>

      {/* SET Y: The teleporting clone set (Absolute Positioned) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <SetY />
      </div>
      
      {/* Overlay gradient for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}
