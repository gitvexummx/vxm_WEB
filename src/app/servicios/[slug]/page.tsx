import Link from 'next/link';
import { notFound } from 'next/navigation';
import servicesData from '../../../data/services.json';
import Accordion from './Accordion';

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

export default async function ServicioDetallePage({ params }: PageProps) {
  const resolvedParams = await params;
  
  const service = servicesData.services.find((s: Service) => s.slug === resolvedParams.slug);
  
  if (!service) {
    notFound();
  }

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
        <Accordion subservices={service.subservices} />

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
