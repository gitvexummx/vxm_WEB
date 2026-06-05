import Link from 'next/link';
import ServiceCard from '@/components/ui/ServiceCard';
// Importación directa del JSON para Server Components - Sin fetch, más rápido y confiable
import servicesData from '../../../public/data/services.json';

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export default async function ServiciosPage() {
  // Los datos ya están disponibles en tiempo de build/render
  const services: Service[] = servicesData.services || [];
  
  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-primary to-neon-secondary bg-clip-text text-transparent">
              Nuestros Servicios
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explora nuestra gama completa de soluciones tecnológicas diseñadas para impulsar 
            el crecimiento y la innovación de tu negocio.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.id} href={`/servicios/${service.slug}`} className="block h-full">
              <ServiceCard {...service} />
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-neon-primary/10 via-neon-secondary/10 to-neon-primary/10 backdrop-blur-sm border border-neon-primary/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad con nuestras soluciones especializadas.
          </p>
          <Link
            href="/contacto"
            className="inline-block px-8 py-4 bg-gradient-to-r from-neon-primary to-neon-secondary rounded-lg font-semibold text-white hover:from-neon-primary/90 hover:to-neon-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-neon-primary/25"
          >
            Contáctanos Hoy
          </Link>
        </div>
      </section>
    </div>
  );
}
