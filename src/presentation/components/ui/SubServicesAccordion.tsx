'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubService {
  title: string;
  paragraph1: string;
  features: string[];
  paragraph2: string;
}

interface SubServicesAccordionProps {
  subservices: SubService[];
}

export default function SubServicesAccordion({ subservices }: SubServicesAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {subservices.map((subService, index) => (
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
                      {subService.features.map((feature, featureIndex) => (
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
  );
}
