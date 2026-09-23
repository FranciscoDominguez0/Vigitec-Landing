import Image from 'next/image';

export default function RenovableSolarHero() {
  return (
    <section 
      className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 bg-[#0a0a0a] bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('/assets/img/hero/servicios_bg.png')" }}
    >
      {/* Fondo Decorativo Abstracto */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent rounded-l-[100px] opacity-10 hidden lg:block"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center">
        
        {/* Contenido Izquierdo (Texto y Botones) */}
        <div className="w-full lg:w-1/2 lg:pr-12 text-center lg:text-left mb-16 lg:mb-0">
          <h1 className="text-5xl lg:text-7xl font-extrabold font-display leading-tight mb-6 tracking-tight text-white">
            Energía Limpia, <br/><span className="text-accent relative inline-block">Ahorro Inteligente</span>
            <span className="sr-only"> con Kits de Paneles Solares</span>
          </h1>
          
          <p className="text-gray-400 text-lg lg:text-xl font-light max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
            Sistemas de paneles solares diseñados para tu hogar o negocio. Comienza a ahorrar hoy mismo con nuestros kits listos para instalar.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#kits" className="w-full sm:w-auto bg-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-accentHover transition-all duration-300 flex items-center justify-center shadow-red-glow">
              Ver Kits Solares
            </a>
          </div>
        </div>
        
        {/* Contenido Derecho (Imagen Decorativa) */}
        <div className="w-full lg:w-1/2 relative mt-16 lg:mt-0">
          <div className="relative w-full max-w-xl mx-auto lg:-mr-10">
            
            {/* Cuadros Decorativos (Líneas y acentos) */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-accent rounded-3xl opacity-50 z-0 hidden lg:block"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent rounded-full z-0 opacity-20"></div>

            {/* Imagen Principal de la Casa en Caja */}
            <div className="relative z-10 w-full overflow-hidden rounded-[2rem] shadow-2xl border-4 border-gray-800 bg-gray-900 flex items-center justify-center aspect-square">
               <Image src="/assets/img/hero/hero_house.jpg" alt="Casa con Paneles Solares" fill className="object-cover" />
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}
