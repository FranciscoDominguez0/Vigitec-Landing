import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Quiénes Somos | Vigitec Panamá",
  description: "Conoce a VIGITEC PANAMA, expertos en sistemas de seguridad con un equipo altamente cualificado y comprometido con la eficiencia.",
};

export default function QuienesSomos() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image src="/assets/img/hero/servicios_bg.png" alt="Vigitec Background" fill priority className="object-cover" />
      </div>
      
      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center flex flex-col items-center">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-white uppercase tracking-widest font-display mb-8 drop-shadow-lg">
          ¿Quiénes somos?
        </h1>
        
        <div className="space-y-6 mb-12 text-white text-base lg:text-lg leading-relaxed font-light drop-shadow-md">
          <p>
            <strong className="font-bold text-white">VIGITEC PANAMA</strong> es una empresa de servicios de sistemas de seguridad altamente reconocida por nuestro compromiso con la rapidez, la eficiencia y la honestidad en todo lo que hacemos. Contamos con un equipo altamente cualificado y experto en todo tipo de trabajos de seguridad, y nos esforzamos por administrar todos nuestros proyectos de manera eficiente y efectiva para asegurarnos de que nuestros clientes queden completamente satisfechos.
          </p>
          <p>
            Durante todo el proceso, mantenemos canales abiertos de comunicación para asegurarnos de que nuestros clientes estén informados y al tanto de cómo avanza su proyecto.
          </p>
        </div>
        
        <Link href="/contacto" className="inline-flex items-center bg-accent text-white px-10 py-4 rounded-full font-semibold hover:bg-accentHover transition-colors shadow-red-glow hover:-translate-y-1 transform duration-300">
          Contactar Ahora
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </Link>
      </div>
    </section>
  );
}
