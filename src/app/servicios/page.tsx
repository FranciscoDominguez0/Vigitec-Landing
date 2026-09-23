import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Servicios | Vigitec Panamá",
  description: "Conoce nuestro portafolio de servicios de seguridad, cámaras, renovable solar, facturación electrónica y desarrollo de software.",
};

export default function Servicios() {
  const servicios = [
    {
      title: "Supervisión 24/7",
      desc: "Monitoreo continuo para locales comerciales y hogares. Nuestro centro de control opera sin interrupciones para garantizar vigilancia en tiempo real.",
      img: "/assets/img/servicios/Security Surveillance.webp",
      contain: false,
      bgWhite: false
    },
    {
      title: "Desarrollo de Software",
      desc: "Creamos soluciones web y aplicaciones a medida para automatizar y optimizar los procesos operativos de tu empresa.",
      img: "/assets/img/servicios/desarrollo.webp",
      contain: false,
      bgWhite: false
    },
    {
      title: "Facturación Electrónica",
      desc: "Sistemas de facturación avalados por la DGI. Asesoría completa e instalación de software para automatizar sus transacciones.",
      img: "/assets/img/servicios/facturacion.webp",
      contain: true,
      bgWhite: true
    },
    {
      title: "Renovable Solar",
      desc: "Soluciones energéticas sostenibles. Instalamos sistemas de energía solar de alta eficiencia para reducir costos operativos y huella de carbono.",
      img: "/assets/img/servicios/paneles solares.webp",
      contain: false,
      bgWhite: false,
      linkText: "Ver",
      linkHref: "/renovable-solar"
    },
    {
      title: "Sistemas de Alarmas",
      desc: "La primera línea de defensa. Sistemas de última generación, sensibles a movimientos e integrados a centros de monitoreo para respuestas inmediatas.",
      img: "/assets/img/servicios/banner-alarmas-paradox.webp",
      contain: true,
      bgWhite: true
    },
    {
      title: "Mantenimiento Preventivo",
      desc: "Servicio especializado de mantenimiento preventivo y correctivo. Aseguramos el funcionamiento ininterrumpido de todos sus sistemas de seguridad y tecnología.",
      img: "/assets/img/servicios/Mantenimiento-preventivo.webp",
      contain: false,
      bgWhite: false
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-[url('/assets/img/hero/servicios_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      {/* Intro */}
      <div className="container mx-auto px-4 max-w-4xl text-center mb-16">
        <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider mb-4">Nuestros Servicios</h1>
        <p className="text-gray-400 text-base leading-relaxed">
          En VIGITEC PANAMA somos su aliado estratégico para garantizar la máxima seguridad y eficiencia. Ofrecemos un portafolio integral de servicios diseñado para superar los estándares de la industria y cubrir las exigencias de cada proyecto.
        </p>
      </div>

      {/* Grid de Tarjetas Premium */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {servicios.map((servicio, idx) => (
            <div key={idx} className="relative w-full h-[320px] rounded-2xl overflow-hidden group shadow-2xl border border-gray-800">
              <Image 
                src={servicio.img} 
                alt={servicio.title} 
                fill
                className={`object-cover ${servicio.contain ? 'object-contain' : 'object-cover'} ${servicio.bgWhite ? 'bg-white p-4' : ''}`} 
              />
              
              <div className="absolute inset-x-0 bottom-0 bg-black/60 transition-all duration-500 transform translate-y-0 md:translate-y-[calc(100%-4rem)] group-hover:translate-y-0 flex flex-col">
                
                <div className="h-16 flex items-center justify-center relative">
                  <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider text-center px-4 z-10">{servicio.title}</h3>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent transform scale-x-100 md:scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                </div>
                
                <div className="px-6 pb-8 pt-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 text-center">
                    {servicio.desc}
                  </p>
                  <div className="text-center">
                    <Link href={servicio.linkHref || "/cotizacion"} className="inline-block bg-accent text-white font-bold py-2 px-8 rounded hover:bg-white hover:text-accent transition-colors uppercase text-sm tracking-wider shadow-lg">
                      {servicio.linkText || "Cotizar"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
