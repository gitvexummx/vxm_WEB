'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import ServiceCarousel from '@/components/ui/ServiceCarousel';
import TestimonialCard from '@/components/ui/TestimonialCard';

// Dynamic import for 3D component with SSR disabled
const GlassIcosahedron = dynamic(() => import('@/components/ui/GlassIcosahedron'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] bg-slate-900/30 rounded-xl flex items-center justify-center border border-cyan-500/20">
      <div className="text-gray-400">Cargando elemento 3D...</div>
    </div>
  ),
});

const services = [
  {
    id: 1,
    name: 'Desarrollo Web',
    slug: 'desarrollo-web',
    description: 'Sitios web modernos y responsivos con las últimas tecnologías.',
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Apps Móviles',
    slug: 'apps-moviles',
    description: 'Aplicaciones nativas e híbridas para iOS y Android.',
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'E-commerce',
    slug: 'e-commerce',
    description: 'Tiendas en línea seguras y escalables para tu negocio.',
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 4,
    name: 'Cloud Solutions',
    slug: 'cloud-solutions',
    description: 'Infraestructura en la nube escalable y segura.',
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    id: 5,
    name: 'IA & Machine Learning',
    slug: 'ia-machine-learning',
    description: 'Soluciones inteligentes basadas en inteligencia artificial.',
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 6,
    name: 'Blockchain',
    slug: 'blockchain',
    description: 'Tecnología blockchain para aplicaciones descentralizadas.',
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 7,
    name: 'Consultoría TI',
    slug: 'consultoria-ti',
    description: 'Asesoramiento experto para optimizar tu infraestructura tecnológica.',
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 8,
    name: 'Ciberseguridad',
    slug: 'ciberseguridad',
    description: 'Protección integral para tus sistemas y datos.',
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    role: 'CEO',
    company: 'TechStart México',
    content: 'Vexum transformó completamente nuestra presencia digital. Su equipo técnico es excepcional y entendieron perfectamente nuestras necesidades.',
  },
  {
    id: 2,
    name: 'Ana Rodríguez',
    role: 'Directora de Marketing',
    company: 'Innovate Corp',
    content: 'La aplicación móvil que desarrollaron superó todas nuestras expectativas. El proceso fue fluido y el resultado final es impresionante.',
  },
  {
    id: 3,
    name: 'Roberto Sánchez',
    role: 'Fundador',
    company: 'E-Shop MX',
    content: 'Gracias a Vexum, nuestras ventas en línea aumentaron un 200%. Su plataforma de e-commerce es robusta y fácil de administrar.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Glass Icosahedron */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Ingeniería Digital
                </span>
                <br />
                <span className="text-white">para Negocios de Éxito</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                La tecnología que tu negocio necesita. Desarrollamos soluciones innovadoras que impulsan tu crecimiento en la era digital.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/contacto"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold text-white hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
                >
                  Comienza tu Proyecto
                </Link>
                <Link
                  href="/servicios"
                  className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg font-semibold text-white hover:bg-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
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
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
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
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Conoce más sobre nosotros
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                      100+
                    </div>
                    <div className="text-gray-400">Proyectos Completados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                      50+
                    </div>
                    <div className="text-gray-400">Clientes Satisfechos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                      5+
                    </div>
                    <div className="text-gray-400">Años de Experiencia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
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
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
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
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
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
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
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
          <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-white">¿Listo para Iniciar tu Proyecto?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Cuéntanos sobre tu idea y te ayudaremos a convertirla en realidad. 
              Nuestro equipo está listo para llevar tu negocio al siguiente nivel.
            </p>
            <Link
              href="/contacto"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold text-white hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
            >
              Contáctanos Hoy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
