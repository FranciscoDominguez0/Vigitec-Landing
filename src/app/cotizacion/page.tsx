"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function Cotizacion() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const captchaRef = useRef<HTMLDivElement>(null);

  const handleScriptLoad = () => {
    if ((window as any).grecaptcha) {
      (window as any).grecaptcha.ready(() => {
        if (captchaRef.current && captchaRef.current.children.length === 0) {
          try {
            (window as any).grecaptcha.render(captchaRef.current, {
              sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeX3GstAAAAAK2cUkoO3gRuQDpIdvrYgj1iVTHs",
              theme: 'dark'
            });
          } catch (err) {
            console.error('Error renderizando reCAPTCHA:', err);
          }
        }
      });
    }
  };

  useEffect(() => {
    // Si regresamos a esta página y el script de reCAPTCHA ya estaba cargado, lo renderizamos manualmente.
    if ((window as any).grecaptcha) {
      handleScriptLoad();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Verificar reCAPTCHA
    const recaptchaResponse = (window as any).grecaptcha?.getResponse();
    if (!recaptchaResponse) {
      setError('Por favor, marque la casilla de "No soy un robot" antes de enviar la cotización.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      Nombre: formData.get('Nombre'),
      Telefono: formData.get('Telefono'),
      Email: formData.get('Email'),
      Servicio: formData.get('Servicio'),
      Detalles: formData.get('Detalles'),
      recaptchaResponse
    };

    try {
      const response = await fetch('/api/enviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
      } else {
        setError(result.message || 'Error al enviar la cotización.');
      }
    } catch (err) {
      setError('Ocurrió un error de red. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
      (window as any).grecaptcha?.reset();
    }
  };

  return (
    <>
      <Script 
        src="https://www.google.com/recaptcha/api.js?render=explicit" 
        strategy="afterInteractive" 
        onLoad={handleScriptLoad}
      />
      <section className="py-10 relative overflow-hidden bg-[url('/assets/img/hero/servicios_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed min-h-[calc(100vh-100px)]">
        {/* Destello rojo decorativo sutil */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none hidden lg:block"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10 py-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
            
            {/* Lado Izquierdo: Contenido de Texto */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-widest font-display mb-6 leading-tight">
                Protegemos <span className="text-accent">lo que más importa</span>
              </h2>
              <p className="text-gray-300 text-xl font-medium mb-4">
                Solicita tu cotización rellenando el formulario que ves aquí.
              </p>
              <p className="text-gray-400 text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mb-6">
                Nuestros servicios de monitoreo le permite vivir más tranquilo su día a día sabiendo que cuidamos de usted y su familia en todo momento. 
              </p>
              <div className="hidden lg:block w-20 h-1 bg-accent rounded-full"></div>
            </div>

            {/* Lado Derecho: Formulario de Cotización */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-[#1A1A1A]/95 backdrop-blur-md p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] rounded-lg border border-gray-700/50 relative">
                
                {/* Alerta de Error */}
                {error && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-accent text-white px-5 py-3 rounded-md shadow-red-glow font-medium text-sm flex items-center z-50 w-11/12 md:w-auto md:max-w-md text-center">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <span>{error}</span>
                  </div>
                )}

                {/* Mensaje de Éxito */}
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6 animate-bounce">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">¡Cotización Enviada!</h3>
                    <p className="text-gray-400 text-lg">Hemos recibido tu solicitud exitosamente. Un especialista de VIGITEC se pondrá en contacto contigo a la brevedad.</p>
                    <button onClick={() => setIsSuccess(false)} className="mt-8 text-accent hover:text-white transition-colors underline">Volver al formulario</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 transition-opacity duration-300">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <input type="text" name="Nombre" className="w-full p-4 bg-[#111111] border border-gray-700 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-inner placeholder-gray-500 font-medium rounded" placeholder="Nombre Completo*" required />
                      </div>
                      <div>
                        <input type="tel" name="Telefono" className="w-full p-4 bg-[#111111] border border-gray-700 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-inner placeholder-gray-500 font-medium rounded" placeholder="Teléfono*" required />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <input type="email" name="Email" className="w-full p-4 bg-[#111111] border border-gray-700 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-inner placeholder-gray-500 font-medium rounded" placeholder="Correo Electrónico*" required />
                      </div>
                      <div>
                        <select name="Servicio" defaultValue="" className="w-full p-4 bg-[#111111] border border-gray-700 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-inner appearance-none cursor-pointer text-gray-400 focus:text-white font-medium rounded" required>
                          <option value="" disabled>Servicio de Interés*</option>
                          <option className="text-white">Sistemas de Alarmas</option>
                          <option className="text-white">Instalación de Cámaras</option>
                          <option className="text-white">Supervisión 24/7</option>
                          <option className="text-white">Facturación Electrónica</option>
                          <option className="text-white">Paneles Solares</option>
                          <option className="text-white">Mantenimiento y Reparaciones</option>
                          <option className="text-white">Otro</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <textarea rows={4} name="Detalles" className="w-full p-4 bg-[#111111] border border-gray-700 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-inner resize-none placeholder-gray-500 font-medium rounded" placeholder="Mensaje...*" required></textarea>
                    </div>
                    
                    {/* reCAPTCHA Oficial de Google (Montado dinámicamente) */}
                    <div className="flex items-center justify-center pt-2 min-h-[78px]">
                      <div ref={captchaRef} suppressHydrationWarning></div>
                    </div>
                    
                    <div className="pt-2">
                      <button disabled={isSubmitting} type="submit" className="w-full px-6 py-4 bg-white text-primary font-bold tracking-wider uppercase hover:bg-accent hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(230,57,70,0.4)] flex items-center justify-center group relative overflow-hidden rounded disabled:opacity-50 disabled:cursor-not-allowed">
                        <span>{isSubmitting ? 'Enviando Seguro...' : 'Solicitar Cotización'}</span>
                        {!isSubmitting ? (
                          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        ) : (
                          <svg className="animate-spin ml-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        )}
                      </button>
                    </div>
                    
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}