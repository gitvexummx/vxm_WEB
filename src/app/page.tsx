'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ServiceCarousel from '@/components/ui/ServiceCarousel';
import TestimonialCard from '@/components/ui/TestimonialCard';

// Dynamic import for 3D component with SSR disabled - performance optimized
const GlassIcosahedron = dynamic(() => import('@/components/ui/GlassIcosahedron'), {
  ssr: false,
});

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  stars: number;
  photo?: string;
}

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Load services from JSON
    fetch('/data/services.json')
      .then((res) => res.json())
      .then((data) => setServices(data.services));
    
    // Load testimonials from JSON (crearemos este archivo)
    fetch('/data/testimonials.json')
      .then((res) => res.json())
      .then((data) => setTestimonials(data.testimonials));
  }, []);

  if (services.length === 0 || testimonials.length === 0) {
    return null;
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section with Glass Icosahedron */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects - Performance optimized with will-change */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-primary/10 via-purple-500/10 to-neon-secondary/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-primary/20 rounded-full blur-3xl animate-pulse will-change-transform" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-secondary/20 rounded-full blur-3xl animate-pulse delay-1000 will-change-transform" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-neon-primary via-purple-500 to-neon-secondary bg-clip-text text-transparent">
                  Ingeniería Digital
                </span>
                <br />
                <span className="text-white">para Negocios de Éxito</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto md:mx-0">
                La tecnología que tu negocio necesita. Desarrollamos soluciones innovadoras que impulsan tu crecimiento en la era digital.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/contacto"
                  className="btn-neon-filled"
                >
                  Comienza tu Proyecto
                </Link>
                <Link
                  href="/servicios"
                  className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-neon-primary/30 rounded-lg font-semibold text-white hover:bg-slate-700/50 hover:border-neon-primary/50 transition-all duration-300"
                >
                  Conoce Nuestros Servicios
                </Link>
              </div>
            </div>

            {/* Right Column - Glass Icosahedron 3D */}
            <div className="relative h-[400px] md:h-[500px]">
              <GlassIcosahedron />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-neon-primary to-purple-500 bg-clip-text text-transparent">
                  Sobre Vexum
                </span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Somos una empresa mexicana especializada en desarrollo de software de vanguardia. 
                Nuestro equipo combina creatividad, experiencia técnica y pasión por la innovación 
                para crear soluciones digitales que marcan la diferencia.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Desde startups hasta empresas consolidadas, hemos ayudado a cientos de clientes 
                a transformar sus ideas en productos digitales exitosos.
              </p>
              <Link
                href="/acerca"
                className="inline-flex items-center text-neon-primary hover:text-neon-primary/80 font-semibold transition-colors"
              >
                Conoce más sobre nosotros
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-primary/20 to-neon-secondary/20 rounded-2xl blur-2xl" />
              <div className="relative glass-medium border border-neon-primary/20 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-neon-primary to-purple-500 bg-clip-text text-transparent mb-2">
                      100+
                    </div>
                    <div className="text-gray-400">Proyectos Completados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-neon-primary to-purple-500 bg-clip-text text-transparent mb-2">
                      50+
                    </div>
                    <div className="text-gray-400">Clientes Satisfechos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-neon-primary to-purple-500 bg-clip-text text-transparent mb-2">
                      5+
                    </div>
                    <div className="text-gray-400">Años de Experiencia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-neon-primary to-purple-500 bg-clip-text text-transparent mb-2">
                      24/7
                    </div>
                    <div className="text-gray-400">Soporte Técnico</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-primary to-purple-500 bg-clip-text text-transparent">
                Nuestros Servicios
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Soluciones integrales para cada necesidad digital de tu empresa
            </p>
          </div>
          <ServiceCarousel services={services} />
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-primary to-purple-500 bg-clip-text text-transparent">
                Lo Que Dicen Nuestros Clientes
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Historias de éxito de empresas que confiaron en nosotros
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/testimonios"
              className="inline-flex items-center text-neon-primary hover:text-neon-primary/80 font-semibold transition-colors"
            >
              Ver todos los testimonios
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-medium border border-neon-primary/20 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-white">¿Listo para Iniciar tu Proyecto?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Cuéntanos sobre tu idea y te ayudaremos a convertirla en realidad. 
              Nuestro equipo está listo para llevar tu negocio al siguiente nivel.
            </p>
            <Link
              href="/contacto"
              className="btn-neon-filled"
            >
              Contáctanos Hoy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
