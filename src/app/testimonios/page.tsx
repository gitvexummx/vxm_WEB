import TestimonialCard from '@/components/ui/TestimonialCard';

const testimonials = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    role: 'CEO',
    company: 'TechStart México',
    content: 'Vexum transformó completamente nuestra presencia digital. Su equipo técnico es excepcional y entendieron perfectamente nuestras necesidades. El resultado superó todas nuestras expectativas.',
  },
  {
    id: 2,
    name: 'Ana Rodríguez',
    role: 'Directora de Marketing',
    company: 'Innovate Corp',
    content: 'La aplicación móvil que desarrollaron superó todas nuestras expectativas. El proceso fue fluido y el resultado final es impresionante. Definitivamente los recomiendo.',
  },
  {
    id: 3,
    name: 'Roberto Sánchez',
    role: 'Fundador',
    company: 'E-Shop MX',
    content: 'Gracias a Vexum, nuestras ventas en línea aumentaron un 200%. Su plataforma de e-commerce es robusta y fácil de administrar. El soporte post-lanzamiento ha sido excelente.',
  },
  {
    id: 4,
    name: 'María González',
    role: 'CTO',
    company: 'FinTech Solutions',
    content: 'La implementación de blockchain que realizaron nos permitió lanzar nuestro producto meses antes de lo planeado. Su experiencia técnica es incomparable.',
  },
  {
    id: 5,
    name: 'Luis Hernández',
    role: 'Director de Operaciones',
    company: 'Logística Pro',
    content: 'El sistema de gestión en la nube que desarrollaron optimizó nuestros procesos en un 60%. Vexum realmente entiende las necesidades del negocio.',
  },
];

export default function TestimoniosPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Testimonios de Clientes
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Descubre lo que dicen las empresas que confiaron en nosotros para transformar 
            sus ideas en realidad digital.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}
