import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const serviceData: Record<string, { name: string; description: string; subServices: string[] }> = {
  'desarrollo-web': {
    name: 'Desarrollo Web',
    description: 'Creamos sitios web modernos, rápidos y responsivos que se adaptan a cualquier dispositivo. Utilizamos las tecnologías más recientes para garantizar el mejor rendimiento.',
    subServices: ['Servicio 1', 'Servicio 2', 'Servicio 3', 'Servicio 4'],
  },
  'apps-moviles': {
    name: 'Apps Móviles',
    description: 'Desarrollamos aplicaciones móviles nativas e híbridas que ofrecen una experiencia de usuario excepcional en iOS y Android.',
    subServices: ['Servicio 1', 'Servicio 2', 'Servicio 3', 'Servicio 4'],
  },
  'e-commerce': {
    name: 'E-commerce',
    description: 'Construimos tiendas en línea seguras y escalables con todas las funcionalidades que necesitas para vender exitosamente.',
    subServices: ['Servicio 1', 'Servicio 2', 'Servicio 3', 'Servicio 4'],
  },
  'cloud-solutions': {
    name: 'Cloud Solutions',
    description: 'Implementamos y gestionamos infraestructura en la nube para maximizar la eficiencia y reducir costos operativos.',
    subServices: ['Servicio 1', 'Servicio 2', 'Servicio 3', 'Servicio 4'],
  },
  'ia-machine-learning': {
    name: 'IA & Machine Learning',
    description: 'Desarrollamos soluciones de inteligencia artificial que automatizan procesos y generan insights valiosos para tu negocio.',
    subServices: ['Servicio 1', 'Servicio 2', 'Servicio 3', 'Servicio 4'],
  },
  'blockchain': {
    name: 'Blockchain',
    description: 'Implementamos tecnología blockchain para crear aplicaciones descentralizadas seguras y transparentes.',
    subServices: ['Servicio 1', 'Servicio 2', 'Servicio 3', 'Servicio 4'],
  },
  'consultoria-ti': {
    name: 'Consultoría TI',
    description: 'Ofrecemos asesoramiento experto para optimizar tu infraestructura tecnológica y alinearla con tus objetivos de negocio.',
    subServices: ['Servicio 1', 'Servicio 2', 'Servicio 3', 'Servicio 4'],
  },
  'ciberseguridad': {
    name: 'Ciberseguridad',
    description: 'Protegemos tus sistemas y datos con las mejores prácticas y tecnologías de seguridad informática.',
    subServices: ['Servicio 1', 'Servicio 2', 'Servicio 3', 'Servicio 4'],
  },
};

export default async function ServicioDetallePage({ params }: PageProps) {
  const { slug } = await params;
  const service = serviceData[slug];

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
          {service.subServices.map((subService, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-colors duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-400 font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{subService}</h3>
                  <p className="text-gray-400 text-sm">
                    Descripción detallada del servicio {index + 1}. Información específica sobre las características y beneficios de este sub-servicio.
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
