'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  stars: number;
  photo?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const DURATION = 700; // ms
  const totalTestimonials = testimonials.length;

  // Easing functions para animaciones suaves
  const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
  const easeInOutQuart = (t: number): number => 
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

  // Auto-rotación con pausa al interactuar
  useEffect(() => {
    if (!autoPlay || isAnimating) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, isAnimating, currentIndex]);

  // Pausar auto-play al pasar el mouse
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleEnter = () => setAutoPlay(false);
    const handleLeave = () => setAutoPlay(true);

    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);

    return () => {
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const goToIndex = useCallback((index: number) => {
    if (isAnimating) return;
    
    const diff = index - currentIndex;
    if (diff === 0) return;
    
    setDirection(diff > 0 ? 1 : -1);
    setIsAnimating(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(0);
    }, DURATION);
  }, [isAnimating, currentIndex]);

  const goNext = useCallback(() => {
    if (isAnimating) return;
    
    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
    
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(0);
    }, DURATION);
  }, [isAnimating, totalTestimonials]);

  const goPrev = useCallback(() => {
    if (isAnimating) return;
    
    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + totalTestimonials) % totalTestimonials);
    
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(0);
    }, DURATION);
  }, [isAnimating, totalTestimonials]);

  const handleNext = goNext;
  const handlePrev = goPrev;

  return (
    <div 
      ref={containerRef}
      className="testimonial-carousel-wrapper"
    >
      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="testimonial-nav-button left"
        aria-label="Previous testimonial"
        disabled={isAnimating}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goNext}
        className="testimonial-nav-button right"
        aria-label="Next testimonial"
        disabled={isAnimating}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="testimonial-carousel-stage">
        {testimonials.map((testimonial, idx) => {
          // Calcular posición relativa considerando loop infinito
          let offset = idx - currentIndex;
          
          // Ajustar para loop infinito
          if (offset > totalTestimonials / 2) offset -= totalTestimonials;
          if (offset < -totalTestimonials / 2) offset += totalTestimonials;
          
          const absOffset = Math.abs(offset);
          
          // Calcular transformaciones 3D smooth con animación de entrada/salida
          const isActive = absOffset < 0.5;
          const isInTransition = direction !== 0 && absOffset <= 1;
          
          // Scale con transición suave
          const baseScale = 1.1 - absOffset * 0.25;
          const scale = Math.max(0.82, baseScale);
          
          // TranslateX con spacing dinámico
          const translateX = offset * 340;
          
          // TranslateZ para profundidad
          const translateZ = -absOffset * 120;
          
          // RotateY para efecto 3D
          const rotateY = offset * 18;
          
          // Opacidad dinámica
          const opacity = isActive ? 1 : Math.max(0.35, 1 - absOffset * 0.35);
          
          // Blur para elementos no activos
          const blur = isActive ? 0 : absOffset * 1.5;
          
          return (
            <div
              key={testimonial.id}
              className="testimonial-carousel-card-wrapper"
              style={{
                opacity,
                transform: `scale(${scale}) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                filter: `blur(${blur}px)`,
                zIndex: Math.round(20 - Math.abs(offset) * 10),
                willChange: 'transform, opacity, filter',
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
                transition: isAnimating 
                  ? `transform ${DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                     opacity ${DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                     filter ${DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
                  : 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                     opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                     filter 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              <TestimonialCard {...testimonial} isCenter={isActive} />
            </div>
          );
        })}
      </div>
      
      {/* Navigation dots */}
      <div className="testimonial-carousel-dots">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToIndex(idx)}
            className={`testimonial-carousel-dot ${
              idx === currentIndex ? 'active' : 'inactive'
            }`}
            aria-label={`Go to testimonial ${idx + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  );
}

interface TestimonialCardProps extends Testimonial {
  isCenter?: boolean;
}

function TestimonialCard({ 
  name, 
  role, 
  company, 
  content,
  stars = 5,
  photo,
  isCenter = false
}: TestimonialCardProps) {
  return (
    <div 
      className={`testimonial-card ${isCenter ? 'center' : 'not-center'}`}
    >
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="testimonial-card-avatar">
          {photo ? (
            <Image
              src={photo}
              alt={name}
              width={48}
              height={48}
              className="testimonial-card-avatar-image"
            />
          ) : (
            <div className="testimonial-card-avatar-placeholder">
              <svg
                className="w-6 h-6 text-neon-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="testimonial-card-content flex-1 min-w-0">
          {/* Stars */}
          <div className="testimonial-card-stars flex mb-2 gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < stars ? 'text-yellow-400' : 'text-gray-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          
          <div className="mb-3">
            <h4 className="testimonial-card-name font-semibold text-white">{name}</h4>
            <p className="testimonial-card-role text-gray-400 text-sm">
              {role} en {company}
            </p>
          </div>
          
          {/* Quote Icon */}
          <svg
            className="testimonial-card-quote-icon w-5 h-5 text-neon-primary/60 mb-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          
          <p className="testimonial-card-text text-gray-300 text-sm leading-relaxed italic">{content}</p>
        </div>
      </div>
    </div>
  );
}
