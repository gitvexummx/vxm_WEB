'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import servicesData from '../../../../public/data/services.json';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface SubService {
  title: string;
  paragraph1: string;
  features: string[];
  paragraph2: string;
}

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  subservices: SubService[];
}

export default function ServicioDetallePage({ params }: PageProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Cargar datos en el cliente
  useEffect(() => {
    async function loadParams() {
      const resolvedParams = await params;
      
      const foundService = servicesData.services.find((s: Service) => s.slug === resolvedParams.slug);
      setService(foundService || null);
      setLoaded(true);
    }
    loadParams();
  }, [params]);

  if (!loaded) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-cyan-400">Cargando...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Servicio no encontrado</h1>
          <Link href="/servicios" className="text-cyan-400 hover:text-cyan-300">
            Volver a servicios
          </Link>
        </div>
      </div>
    );
  }

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <Link href="/servicios" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Volver a servicios
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {service.name}
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            {service.description}
          </p>
        </div>

        {/* Sub-services Accordion */}
        <div className="space-y-4">
          {service.subservices.map((subService: SubService, index: number) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/40 transition-colors duration-300"
            >
              {/* Header - Siempre visible */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-700/30 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">{subService.title}</h3>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-purple-400"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>

              {/* Contenido desplegable */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-purple-500/10">
                      {/* Párrafo 1 */}
                      <p className="text-gray-300 text-base md:text-lg mb-4 leading-relaxed">
                        {subService.paragraph1}
                      </p>

                      {/* Listado de características */}
                      <div className="mb-4">
                        <h4 className="text-purple-400 font-semibold mb-3 text-base md:text-lg">Características principales:</h4>
                        <ul className="space-y-2">
                          {subService.features.map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="text-gray-300 text-sm md:text-base flex items-start">
                              <span className="text-pink-400 mr-3 mt-1">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Párrafo 2 */}
                      <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                        {subService.paragraph2}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">
              ¿Interesado en {service.name}?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Contáctanos hoy mismo para discutir cómo podemos ayudarte a implementar esta solución en tu negocio.
            </p>
            <Link
              href="/contacto"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold text-white hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
            >
              Solicitar Cotización
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
