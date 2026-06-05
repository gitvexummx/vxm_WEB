import Link from 'next/link';

export default function ExitoPage() {
  return (
    <div className="min-h-screen py-20 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center border-2 border-cyan-500/50">
          <svg
            className="w-12 h-12 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    ¡Gracias!
          </span>
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Hemos recibido tu mensaje correctamente. Nuestro equipo se pondrá en contacto contigo 
          en las próximas 24-48 horas hábiles.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold text-white hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
          >
            Volver al Inicio
          </Link>
          <Link
            href="/servicios"
            className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg font-semibold text-white hover:bg-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
          >
            Explorar Servicios
          </Link>
        </div>
      </div>
    </div>
  );
}
