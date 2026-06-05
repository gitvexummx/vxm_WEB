'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre_empresa: '',
    correo: '',
    telefono: '',
    giro: '',
    presupuesto: '',
    ubicacion: '',
    alcaldia_municipio: '',
    descripcion_problema: '',
    acepta_tyc: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre_empresa.trim()) {
      newErrors.nombre_empresa = 'El nombre de la empresa es requerido';
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'Ingresa un correo válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    if (!formData.giro.trim()) {
      newErrors.giro = 'El giro de la empresa es requerido';
    }

    if (!formData.presupuesto.trim()) {
      newErrors.presupuesto = 'El presupuesto es requerido';
    }

    if (!formData.ubicacion) {
      newErrors.ubicacion = 'Selecciona una ubicación';
    }

    if (!formData.alcaldia_municipio.trim()) {
      newErrors.alcaldia_municipio = 'Este campo es requerido';
    }

    if (!formData.descripcion_problema.trim()) {
      newErrors.descripcion_problema = 'La descripción del problema es requerida';
    }

    if (!formData.acepta_tyc) {
      newErrors.acepta_tyc = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulación de envío - aquí iría la llamada a Supabase
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Para producción: llamar al usecase que envía a Supabase
      console.log('Formulario enviado:', formData);
      
      setSubmitStatus('success');
      setFormData({
        nombre_empresa: '',
        correo: '',
        telefono: '',
        giro: '',
        presupuesto: '',
        ubicacion: '',
        alcaldia_municipio: '',
        descripcion_problema: '',
        acepta_tyc: false,
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Contáctanos
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            La tecnología que tu negocio necesita está a un clic de distancia
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="card-neon p-8 md:p-12">
          {submitStatus === 'success' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">¡Mensaje Enviado!</h2>
              <p className="text-gray-300 mb-8">
                Gracias por contactarnos. Nos pondremos en contacto contigo pronto.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold text-white hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
              >
                Volver al Inicio
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre de la Empresa */}
              <div>
                <label htmlFor="nombre_empresa" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre de la Empresa *
                </label>
                <input
                  type="text"
                  id="nombre_empresa"
                  name="nombre_empresa"
                  value={formData.nombre_empresa}
                  onChange={handleChange}
                  className={`input-neon ${errors.nombre_empresa ? 'border-red-500' : ''}`}
                  placeholder="Tu empresa"
                />
                {errors.nombre_empresa && (
                  <p className="mt-1 text-sm text-red-400">{errors.nombre_empresa}</p>
                )}
              </div>

              {/* Correo y Teléfono */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-300 mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className={`input-neon ${errors.correo ? 'border-red-500' : ''}`}
                    placeholder="tu@empresa.com"
                  />
                  {errors.correo && (
                    <p className="mt-1 text-sm text-red-400">{errors.correo}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-300 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={`input-neon ${errors.telefono ? 'border-red-500' : ''}`}
                    placeholder="55 1234 5678"
                  />
                  {errors.telefono && (
                    <p className="mt-1 text-sm text-red-400">{errors.telefono}</p>
                  )}
                </div>
              </div>

              {/* Giro y Presupuesto */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="giro" className="block text-sm font-medium text-gray-300 mb-2">
                    Giro de la Empresa *
                  </label>
                  <input
                    type="text"
                    id="giro"
                    name="giro"
                    value={formData.giro}
                    onChange={handleChange}
                    className={`input-neon ${errors.giro ? 'border-red-500' : ''}`}
                    placeholder="Ej: Tecnología, Servicios, Comercio..."
                  />
                  {errors.giro && (
                    <p className="mt-1 text-sm text-red-400">{errors.giro}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="presupuesto" className="block text-sm font-medium text-gray-300 mb-2">
                    Presupuesto Estimado *
                  </label>
                  <select
                    id="presupuesto"
                    name="presupuesto"
                    value={formData.presupuesto}
                    onChange={handleChange}
                    className={`input-neon ${errors.presupuesto ? 'border-red-500' : ''}`}
                  >
                    <option value="">Selecciona un rango</option>
                    <option value="menos_50k">Menos de $50,000 MXN</option>
                    <option value="50k_100k">$50,000 - $100,000 MXN</option>
                    <option value="100k_250k">$100,000 - $250,000 MXN</option>
                    <option value="250k_500k">$250,000 - $500,000 MXN</option>
                    <option value="mas_500k">Más de $500,000 MXN</option>
                  </select>
                  {errors.presupuesto && (
                    <p className="mt-1 text-sm text-red-400">{errors.presupuesto}</p>
                  )}
                </div>
              </div>

              {/* Ubicación */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-300 mb-2">
                    Ubicación *
                  </label>
                  <select
                    id="ubicacion"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleChange}
                    className={`input-neon ${errors.ubicacion ? 'border-red-500' : ''}`}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="CDMX">Ciudad de México</option>
                    <option value="EDOMEX">Estado de México</option>
                  </select>
                  {errors.ubicacion && (
                    <p className="mt-1 text-sm text-red-400">{errors.ubicacion}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="alcaldia_municipio" className="block text-sm font-medium text-gray-300 mb-2">
                    {formData.ubicacion === 'CDMX' ? 'Alcaldía *' : 'Municipio *'}
                  </label>
                  <input
                    type="text"
                    id="alcaldia_municipio"
                    name="alcaldia_municipio"
                    value={formData.alcaldia_municipio}
                    onChange={handleChange}
                    className={`input-neon ${errors.alcaldia_municipio ? 'border-red-500' : ''}`}
                    placeholder={formData.ubicacion === 'CDMX' ? 'Ej: Cuauhtémoc' : 'Ej: Naucalpan'}
                  />
                  {errors.alcaldia_municipio && (
                    <p className="mt-1 text-sm text-red-400">{errors.alcaldia_municipio}</p>
                  )}
                </div>
              </div>

              {/* Descripción del Problema */}
              <div>
                <label htmlFor="descripcion_problema" className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción del Proyecto o Problema *
                </label>
                <textarea
                  id="descripcion_problema"
                  name="descripcion_problema"
                  value={formData.descripcion_problema}
                  onChange={handleChange}
                  rows={5}
                  className={`input-neon ${errors.descripcion_problema ? 'border-red-500' : ''}`}
                  placeholder="Cuéntanos sobre tu proyecto, necesidades o el problema que quieres resolver..."
                />
                {errors.descripcion_problema && (
                  <p className="mt-1 text-sm text-red-400">{errors.descripcion_problema}</p>
                )}
              </div>

              {/* Términos y Condiciones */}
              <div>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acepta_tyc"
                    checked={formData.acepta_tyc}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-gray-400">
                    Acepto los{' '}
                    <Link href="/terminos" className="text-cyan-400 hover:text-cyan-300 underline">
                      términos y condiciones
                    </Link>{' '}
                    y la{' '}
                    <Link href="/privacidad" className="text-cyan-400 hover:text-cyan-300 underline">
                      política de privacidad
                    </Link>
                    *
                  </span>
                </label>
                {errors.acepta_tyc && (
                  <p className="mt-1 text-sm text-red-400">{errors.acepta_tyc}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold text-white hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">
                    Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo.
                  </p>
                </div>
              )}
            </form>
          )}
        </div>
      </section>

      {/* Contact Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-neon text-center">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
            <p className="text-gray-400">contacto@vexum.mx</p>
          </div>

          <div className="card-neon text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Teléfono</h3>
            <p className="text-gray-400">55 1234 5678</p>
          </div>

          <div className="card-neon text-center">
            <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Ubicación</h3>
            <p className="text-gray-400">Ciudad de México, México</p>
          </div>
        </div>
      </section>
    </div>
  );
}
