'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { JSX } from 'react';

interface ServiceCard {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

interface ServiceCarouselProps {
  services: ServiceCard[];
}

function getIcon(iconName: string) {
  const icons: Record<string, JSX.Element> = {
    brain: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    cog: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    code: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    chart: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    globe: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    palette: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    share: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    support: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  };
  
  return icons[iconName] || icons.code;
}

export default function ServiceCarousel({ services }: ServiceCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const cardWidth = 320; // w-80
  const gap = 16; // gap-4
  const totalCards = services.length;
  const slideSize = cardWidth + gap;

  // Easing function para animaciones suaves
  const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
  const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

  // Auto-scroll infinito con pausa al interactuar
  useEffect(() => {
    if (!autoPlay || isDragging) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
    }, 3500);

    return () => clearInterval(interval);
  }, [totalCards, autoPlay, isDragging]);

  // Pausar auto-play al pasar el mouse
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleEnter = () => setAutoPlay(false);
    const handleLeave = () => {
      setAutoPlay(true);
      setDragOffset(0);
    };

    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);

    return () => {
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // Función para animar el desplazamiento
  const animateToPosition = useCallback((targetIndex: number, duration = 400) => {
    const startIndex = currentIndex;
    const startTime = performance.now();
    const startOffset = dragOffset;
    const targetOffset = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentIndex(targetIndex);
        setDragOffset(0);
        setVelocity(0);
      }
    };

    requestAnimationFrame(animate);
  }, [currentIndex, dragOffset]);

  // Snap to nearest card después del drag
  const snapToNearest = useCallback(() => {
    const totalDrag = dragOffset;
    const threshold = slideSize * 0.2;

    // Determinar dirección basada en el offset y velocidad
    let newIndex = currentIndex;
    
    if (Math.abs(totalDrag) > threshold || Math.abs(velocity) > 5) {
      if (totalDrag > 0 || velocity > 0) {
        newIndex = (currentIndex - 1 + totalCards) % totalCards;
      } else if (totalDrag < 0 || velocity < 0) {
        newIndex = (currentIndex + 1) % totalCards;
      }
    }

    animateToPosition(newIndex);
  }, [dragOffset, currentIndex, totalCards, velocity, slideSize, animateToPosition]);

  // Handlers para drag nativo
  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setLastX(clientX);
    setVelocity(0);
    setAutoPlay(false);
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return;

    const delta = clientX - lastX;
    const newOffset = dragOffset + delta;

    // Limitar el arrastre para evitar scroll infinito
    const maxDrag = slideSize * 1.5;
    const clampedOffset = Math.max(-maxDrag, Math.min(maxDrag, newOffset));
    
    setDragOffset(clampedOffset);
    setVelocity(delta);
    setLastX(clientX);
  }, [isDragging, dragOffset, lastX, slideSize]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    snapToNearest();
  }, [isDragging, snapToNearest]);

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  }, [handleDragMove]);

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleDragEnd();
    }
  }, [isDragging, handleDragEnd]);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Navegación con botones
  const handleNext = useCallback(() => {
    if (isDragging) return;
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  }, [isDragging, totalCards]);

  const handlePrev = useCallback(() => {
    if (isDragging) return;
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [isDragging, totalCards]);

  // Calcular el desplazamiento del track
  const getTrackOffset = () => {
    const baseOffset = -currentIndex * slideSize;
    const dragEffect = isDragging ? dragOffset : 0;
    return baseOffset + dragEffect;
  };

  // Crear array extendido para loop infinito visual
  const extendedServices = [...services, ...services, ...services];
  const displayStartIndex = currentIndex;

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden py-12 select-none"
    >
      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        disabled={isDragging}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-medium border border-neon-primary/30 flex items-center justify-center text-white hover:bg-neon-primary/20 hover:border-neon-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous services"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        disabled={isDragging}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-medium border border-neon-primary/30 flex items-center justify-center text-white hover:bg-neon-primary/20 hover:border-neon-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next services"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Draggable Track */}
      <div
        ref={trackRef}
        className="flex gap-4 cursor-grab active:cursor-grabbing"
        style={{
          transform: `translateX(${getTrackOffset()}px)`,
          transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {extendedServices.map((service, idx) => {
          return (
            <div
              key={`${service.id}-${idx}`}
              className="w-80 flex-shrink-0"
              style={{
                visibility: idx >= displayStartIndex && idx < displayStartIndex + 4 ? 'visible' : 'hidden',
              }}
            >
              <a href={`/servicios/${service.slug}`} className="block group">
                <div className="glass-medium border border-neon-primary/20 rounded-xl p-6 h-full hover:border-neon-primary/50 transition-all duration-300 group cursor-pointer hover:transform hover:scale-[1.03]">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">{service.description}</p>
                  <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-300">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
      
      {/* Overlay gradient for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}
