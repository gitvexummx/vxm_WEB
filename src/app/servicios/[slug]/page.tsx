import Link from 'next/link';
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

export default async function ServicioDetallePage({ params }: PageProps) {
  const { slug } = await params;
  
  const service = servicesData.services.find((s: Service) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Servicio no encontrado</h1>
          <Link href="/servicios" className="text-cyan-400 hover:text-cyan-300">
            Volver a servicios
          </Link>
        </div>
      </div>
    );
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

        {/* Sub-services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {service.subservices.map((subService: SubService, index: number) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-colors duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-400 font-bold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">{subService.title}</h3>
                  
                  {/* Párrafo 1 */}
                  <p className="text-gray-400 text-sm mb-3">
                    {subService.paragraph1}
                  </p>
                  
                  {/* Listado de características */}
                  <ul className="mb-3 space-y-1">
                    {subService.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="text-gray-300 text-sm flex items-start">
                        <span className="text-cyan-400 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Párrafo 2 */}
                  <p className="text-gray-400 text-sm">
                    {subService.paragraph2}
                  </p>
                </div>
              </div>
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
