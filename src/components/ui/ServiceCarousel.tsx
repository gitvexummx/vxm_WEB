'use client';

import { motion } from 'framer-motion';

interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
}

interface ServiceCarouselProps {
  services: Service[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ServiceCarousel({ 
  services, 
  autoPlay = true, 
  autoPlayInterval = 3000 
}: ServiceCarouselProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="flex animate-scroll hover:pause">
        {[...services, ...services].map((service, index) => (
          <motion.div
            key={`${service.id}-${index}`}
            className="flex-shrink-0 w-80 mx-4"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 h-full hover:border-cyan-500/50 transition-colors duration-300 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll ${autoPlayInterval * services.length}ms linear infinite;
        }
        
        .hover\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
