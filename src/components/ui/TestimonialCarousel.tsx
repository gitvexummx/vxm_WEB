'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Auto-advance every 5 seconds (step movement, not smooth)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      
      // Reset transition flag after animation completes
      setTimeout(() => setIsTransitioning(false), 500);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Get visible testimonials (center + 2 on each side for overlap effect)
  const getVisibleTestimonials = () => {
    const total = testimonials.length;
    const result: { testimonial: Testimonial; position: number; opacity: number; scale: number }[] = [];
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + total) % total;
      const position = i;
      
      // Center card is largest, others are normal size
      const scale = position === 0 ? 1.1 : 0.85;
      const opacity = position === 0 ? 1 : 0.6;
      
      result.push({
        testimonial: testimonials[index],
        position,
        opacity,
        scale,
      });
    }
    
    return result;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div className="relative w-full overflow-hidden py-8" ref={carouselRef}>
      <div className="relative h-[400px] flex items-center justify-center">
        {visibleTestimonials.map(({ testimonial, position, opacity, scale }, idx) => {
          // Calculate z-index: center is highest, then decreases outward
          const zIndex = position === 0 ? 20 : Math.abs(position) === 1 ? 15 : 10;
          
          // Calculate horizontal offset with overlap
          const xOffset = position * 280; // pixels offset for overlap effect
          
          return (
            <div
              key={`${testimonial.id}-${idx}`}
              className={`absolute transition-all duration-500 ease-in-out ${
                isTransitioning ? 'scale-95 opacity-0' : ''
              }`}
              style={{
                transform: `translateX(${xOffset}px) scale(${scale})`,
                opacity: isTransitioning ? 0 : opacity,
                zIndex,
                left: '50%',
                marginLeft: '-160px', // half of card width (320px / 2)
              }}
            >
              <TestimonialCard {...testimonial} isCenter={position === 0} />
            </div>
          );
        })}
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(idx);
              setTimeout(() => setIsTransitioning(false), 500);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'bg-neon-primary w-8' 
                : 'bg-gray-600 hover:bg-gray-400'
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
      className={`glass-heavy border rounded-xl p-6 transition-all duration-300 ${
        isCenter 
          ? 'border-neon-primary/50 shadow-neon-primary' 
          : 'border-neon-primary/20'
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
