import { Suspense } from "react";
import Script from "next/script";
import { Metadata } from 'next';
import CotizacionSolarForm from "@/components/CotizacionSolarForm";

export const metadata: Metadata = {
  title: "Cotización de Kits Solares",
  description: "Solicita hoy tu cotización de paneles solares. Contamos con kits diseñados para tu hogar y negocio con excelentes opciones de financiamiento y retorno de inversión.",
};

export default function CotizacionSolarPage() {
  return (
    <>
      <Script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" strategy="lazyOnload" />
      <section className="py-10 relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('/assets/img/hero/servicios_bg.png')" }}>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none hidden lg:block"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
            
            {/* Lado Izquierdo: Contenido de Texto */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-widest font-display mb-6 leading-tight">
                Empieza a <span className="text-accent">Ahorrar Energía</span>
              </h2>
              <p className="text-gray-300 text-xl font-medium mb-4">
                Solicita tu cotización rellenando el formulario que ves aquí.
              </p>
              <p className="text-gray-400 text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mb-6">
                Nuestros kits de paneles solares están diseñados para reducir tu factura eléctrica al máximo. Da el paso hacia la energía limpia y disfruta de un retorno de inversión garantizado para tu hogar o negocio.
              </p>
              <div className="hidden lg:block w-20 h-1 bg-accent rounded-full"></div>
            </div>

            {/* Lado Derecho: Formulario de Cotización */}
            <Suspense fallback={<div className="lg:w-1/2 w-full text-center text-white">Cargando formulario...</div>}>
              <CotizacionSolarForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
