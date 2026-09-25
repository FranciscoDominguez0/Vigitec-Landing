"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    src: "/assets/img/hero/tecnico_instalador_v2.webp",
    alt: "Técnico Instalando Sistema de Seguridad",
    duration: 3000, 
    isLink: false,
    className: "object-cover",
  },
  {
    id: 2,
    src: "/assets/img/hero/flayer_panel_solar.png",
    alt: "Promoción Paneles Solares",
    duration: 7000, 
    isLink: true,
    href: "/renovable-solar",
    className: "object-contain bg-black", 
  }
];

export default function HeroImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const currentSlideDuration = slides[currentIndex].duration;
    
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, currentSlideDuration);

    return () => clearTimeout(timer);
  }, [currentIndex, isHovered]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Cuadro Decorativo Superior */}
      <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-accent rounded-3xl opacity-50"></div>
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary rounded-full z-0"></div>
      
      <div 
        className="relative z-10 w-full aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tr-none shadow-2xl border-4 border-secondary"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          
          return (
            <div 
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              {slide.isLink ? (
                <Link href={slide.href!} className="absolute inset-0 z-10 cursor-pointer block">
                  <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" priority={index === 0} className={slide.className} />
                </Link>
              ) : (
                <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" priority={index === 0} className={slide.className} />
              )}
            </div>
          );
        })}

        {/* Indicadores (Dots) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-accent w-6' : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Etiqueta Flotante de Soporte 24/7 - SOLO VISIBLE EN EL PRIMER SLIDE */}
      <div className={`absolute bottom-4 left-4 sm:bottom-10 sm:-left-8 lg:-left-20 bg-white p-4 rounded-2xl shadow-premium z-20 flex items-center space-x-4 transition-opacity duration-500 ${currentIndex === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-green-100 p-3 rounded-full text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">Soporte 24/7</p>
          <p className="text-xs text-gray-500">Garantizado</p>
        </div>
      </div>
    </div>
  );
}
