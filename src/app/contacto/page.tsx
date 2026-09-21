import Link from 'next/link';

export default function Contacto() {
  return (
    <section className="py-12 relative overflow-hidden bg-[url('/assets/img/hero/servicios_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      {/* Destello rojo decorativo sutil */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none hidden lg:block"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-widest font-display mb-4 leading-tight">CONTÁCTANOS</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-medium">
            Nuestro equipo de expertos está dispuesto a brindarle la mejor asesoría técnica y comercial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#1A1A1A]/95 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-gray-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          
          {/* Detalles de Contacto */}
          <div className="space-y-8 flex flex-col justify-center">
            
            <div className="flex items-start space-x-4">
              <div className="text-accent mt-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-1">Teléfono</h4>
                <p className="text-gray-400">+507 6933-0534</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-accent mt-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-1">Correo Electrónico</h4>
                <p className="text-gray-400">info@vigitecpanama.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-accent mt-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-1">Horario</h4>
                <p className="text-gray-400">Lunes - Viernes<br />8:00 a.m. a 4:00 p.m.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-accent mt-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-1">Ubicación</h4>
                <p className="text-gray-400">CALLE LOS PINOS<br />Aguadulce, Panamá</p>
              </div>
            </div>

          </div>

          {/* Mapa de Google Profesional */}
          <div className="w-full aspect-square md:aspect-[4/3] rounded-xl overflow-hidden border border-gray-700 shadow-inner relative bg-[#111111] group">
            
            {/* Animación de Carga (Skeleton) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1A1A1A] animate-pulse z-0">
              <svg className="w-10 h-10 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span className="text-gray-600 text-xs font-semibold uppercase tracking-widest">Cargando Mapa...</span>
            </div>

            <iframe 
              title="Ubicación Vigitec"
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              loading="lazy"
              src="https://maps.google.com/maps?q=Vigitec%20Panama,%20Aguadulce&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full absolute inset-0 z-10 transition-all duration-700 ease-in-out"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}