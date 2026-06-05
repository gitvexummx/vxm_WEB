'use client';

import Link from 'next/link';

interface ServiceCardProps {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServiceCard({ 
  id, 
  name, 
  slug, 
  description,
  icon 
}: ServiceCardProps) {
  return (
    <Link href={`/servicios/${slug}`}>
      <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 h-full hover:border-cyan-500/50 transition-all duration-300 group cursor-pointer hover:transform hover:scale-105">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-400 text-sm line-clamp-3">{description}</p>
      </div>
    </Link>
  );
}
