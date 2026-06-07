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
  const [targetIndex, setTargetIndex] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const startIndexRef = useRef<number>(0);
  
  const DURATION = 600; // ms

  const animateTransition = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / DURATION, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic

    const start = startIndexRef.current;
    const end = targetIndex;
    const current = start + (end - start) * eased;

    setCurrentIndex(current);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animateTransition);
    } else {
      setCurrentIndex(targetIndex);
      animationRef.current = null;
      startTimeRef.current = null;
    }
  }, [targetIndex]);

  const goToIndex = useCallback((index: number) => {
    if (animationRef.current !== null) return;
    
    startIndexRef.current = currentIndex;
    setTargetIndex(index);
    startTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animateTransition);
  }, [currentIndex, animateTransition]);

  const goNext = useCallback(() => {
    if (animationRef.current !== null) return;
    
    const nextIndex = (currentIndex + 1) % testimonials.length;
    startIndexRef.current = currentIndex;
    setTargetIndex(nextIndex);
    startTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animateTransition);
  }, [currentIndex, testimonials.length, animateTransition]);

  const goPrev = useCallback(() => {
    if (animationRef.current !== null) return;
    
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    startIndexRef.current = currentIndex;
    setTargetIndex(prevIndex);
    startTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animateTransition);
  }, [currentIndex, testimonials.length, animateTransition]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="testimonial-carousel-wrapper">
      {/* Navigation arrows */}
      <button
        onClick={goPrev}
        className="testimonial-carousel-nav-button left"
        aria-label="Previous testimonial"
        disabled={animationRef.current !== null}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goNext}
        className="testimonial-carousel-nav-button right"
        aria-label="Next testimonial"
        disabled={animationRef.current !== null}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="testimonial-carousel-stage">
        {testimonials.map((testimonial, idx) => {
          // Calcular posición relativa considerando loop infinito
          let offset = idx - Math.round(currentIndex);
          
          // Ajustar para loop infinito
          if (offset > testimonials.length / 2) offset -= testimonials.length;
          if (offset < -testimonials.length / 2) offset += testimonials.length;
          
          const absOffset = Math.abs(offset);
          
          // Calcular transformaciones 3D smooth
          const scale = Math.max(0.85, 1.1 - absOffset * 0.25);
          const translateX = offset * 320;
          const translateZ = -absOffset * 100;
          const rotateY = offset * 15;
          const opacity = Math.max(0.4, 1 - absOffset * 0.3);
          
          return (
            <div
              key={testimonial.id}
              className="testimonial-carousel-card-wrapper"
              style={{
                opacity,
                transform: `scale(${scale}) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                zIndex: 20 - Math.abs(offset),
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
              }}
            >
              <TestimonialCard {...testimonial} isCenter={Math.abs(offset) < 0.5} />
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
              Math.abs(idx - Math.round(currentIndex)) % testimonials.length === 0 ? 'active' : 'inactive'
            }`}
            aria-label={`Go to testimonial ${idx + 1}`}
            disabled={animationRef.current !== null}
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
