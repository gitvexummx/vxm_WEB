import Link from 'next/link';
import ServiceCard from '@/components/ui/ServiceCard';

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export default async function ServiciosPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL || []}/data/services.json`, {
    cache: 'no-store'
  });
  const data = await res.json();
  const services: Service[] = data.services || [];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-primary to-purple-500 bg-clip-text text-transparent">
              Nuestros Servicios
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Explora nuestra gama completa de soluciones tecnológicas diseñadas para impulsar 
            el crecimiento y la innovación de tu negocio.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))} 
        </div>
      </div>
    </div>
  );
}
