import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold gradient-text mb-6">
          Vexum MX
        </h1>
        <p className="text-xl text-secondary mb-8">
          Soluciones Tecnológicas del Futuro
        </p>
        <div className="glass-dark p-8 rounded-2xl max-w-2xl mx-auto">
          <p className="text-lg">
            La estructura del proyecto está lista. Comienza a desarrollar los componentes de la FASE 1.
          </p>
        </div>
      </div>
    </main>
  );
}
