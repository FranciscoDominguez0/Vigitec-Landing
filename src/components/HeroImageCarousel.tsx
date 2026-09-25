"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SkeletonImage from '@/components/SkeletonImage';

export default function HeroImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (currentIndex === 0) {
      // Imagen normal: dura 3 segundos
      timeoutId = setTimeout(() => setCurrentIndex(1), 3000);
    } else {
      // Anuncio (prioridad): dura 8 segundos
      timeoutId = setTimeout(() => setCurrentIndex(0), 8000);
    }
    
    return () => clearTimeout(timeoutId);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Cuadro Decorativo Superior */}
      <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-accent rounded-3xl opacity-50"></div>
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary rounded-full z-0"></div>

      {/* Contenedor de las Imágenes */}
      <div className="relative z-10 w-full aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tr-none shadow-2xl border-4 border-secondary bg-[#111111]">
        {/* Imagen 1: Técnico */}
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentIndex === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <SkeletonImage src="/assets/img/hero/tecnico_instalador_v2.webp" alt="Técnico Instalando Sistema de Seguridad" fill sizes="(max-width: 1024px) 100vw, 50vw" priority className="object-cover" />
        </div>
        
        {/* Imagen 2: Solar (Clicable) */}
        <Link href="/renovable-solar" className={`absolute inset-0 transition-opacity duration-700 ease-in-out block ${currentIndex === 1 ? 'opacity-100 z-10 cursor-pointer' : 'opacity-0 z-0 pointer-events-none'}`}>
          <SkeletonImage src="/assets/img/hero/flayer_panel_solar.png" alt="Instalación de Paneles Solares" fill sizes="(max-width: 1024px) 100vw, 50vw" priority className="object-contain" />
        </Link>
      </div>

      {/* Contenedor de las Etiquetas */}
      <div className="absolute bottom-4 left-4 sm:bottom-10 sm:-left-8 lg:-left-20 z-20 h-[72px] w-56">
        {/* Badge 1: Soporte */}
        <div 
          className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
            currentIndex === 0 ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 -z-10 pointer-events-none'
          }`}
        >
          <div className="bg-white p-4 rounded-2xl shadow-premium flex items-center space-x-4 h-full cursor-default">
            <div className="bg-green-100 p-3 rounded-full text-green-600 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">Soporte 24/7</p>
              <p className="text-xs text-gray-500">Garantizado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
