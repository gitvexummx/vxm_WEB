'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);

  // Smooth auto-advance every 5 seconds with CSS-based interpolation
  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          setCurrentIndex((idx) => (idx + 1) % testimonials.length);
          return 0;
        }
        return newProgress;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [testimonials.length, isHovering]);

  // Handle manual navigation
  const goToIndex = useCallback((index: number) => {
    setProgress(0);
    setCurrentIndex(index);
  }, []);

  const goNext = useCallback(() => {
    setProgress(0);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 10);
  }, [testimonials.length]);

  const goPrev = useCallback(() => {
    setProgress(0);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, 10);
  }, [testimonials.length]);

  // Calculate interpolation factor (0 to 1) for smooth transitions
  const t = progress / 100;

  // Visible cards with smooth interpolation
  const getVisibleCards = () => {
    const result: { testimonial: Testimonial; position: number; opacity: number; scale: number; xOffset: number }[] = [];
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      
      // Smooth position with interpolation
      const basePosition = i - t;
      const distanceFromCenter = Math.abs(basePosition);
      
      // Smooth scale and opacity based on distance from center
      const scale = Math.max(0.85, 1.1 - distanceFromCenter * 0.25);
      const opacity = Math.max(0.3, 1 - distanceFromCenter * 0.4);
      
      // Smooth horizontal offset
      const xOffset = basePosition * 300;
      
      result.push({
        testimonial: testimonials[index],
        position: i,
        opacity,
        scale,
        xOffset,
      });
    }
    
    return result;
  };

  const visibleCards = getVisibleCards();

  return (
    <div 
      className="relative w-full overflow-hidden py-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Navigation arrows */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-800/80 border border-neon-primary/30 text-neon-primary hover:bg-neon-primary/20 transition-all duration-300"
        aria-label="Previous testimonial"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-800/80 border border-neon-primary/30 text-neon-primary hover:bg-neon-primary/20 transition-all duration-300"
        aria-label="Next testimonial"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="relative h-[420px] flex items-center justify-center">
        {visibleCards.map(({ testimonial, position, opacity, scale, xOffset }, idx) => {
          // Calculate z-index: center is highest, then decreases outward
          const zIndex = 20 - Math.abs(position);
          
          return (
            <div
              key={`${testimonial.id}-${idx}`}
              className="absolute transition-all duration-75 ease-linear"
              style={{
                transform: `translateX(${xOffset}px) scale(${scale})`,
                opacity,
                zIndex,
                left: '50%',
                marginLeft: '-160px', // half of card width (320px / 2)
              }}
            >
              <TestimonialCard {...testimonial} isCenter={Math.abs(xOffset / 300) < 0.5} />
            </div>
          );
        })}
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToIndex(idx)}
            className={`rounded-full transition-all duration-500 ${
              idx === currentIndex 
                ? 'bg-neon-primary w-10 h-3' 
                : 'bg-gray-600 w-3 h-3 hover:bg-gray-400'
            }`}
            aria-label={`Go to testimonial ${idx + 1}`}
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
      className={`border rounded-xl p-6 transition-all duration-300 ${
        isCenter 
          ? 'border-neon-primary/50 shadow-neon-primary bg-slate-800/80' 
          : 'border-neon-primary/20 bg-slate-900/80'
      }`}
      style={{
        width: '320px',
        minHeight: '280px',
        boxShadow: isCenter ? '0 0 30px rgba(217, 70, 239, 0.3)' : undefined,
      }}
    >
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {photo ? (
            <Image
              src={photo}
              alt={name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border-2 border-neon-primary/30"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-primary/20 to-neon-secondary/20 flex items-center justify-center border-2 border-neon-primary/30">
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
        <div className="flex-1">
          {/* Stars */}
          <div className="flex mb-2">
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
            <h4 className="text-white font-semibold">{name}</h4>
            <p className="text-gray-400 text-sm">
              {role} en {company}
            </p>
          </div>
          
          {/* Quote Icon */}
          <svg
            className="w-6 h-6 text-neon-primary/50 mb-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          
          <p className="text-gray-300 leading-relaxed text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
}
