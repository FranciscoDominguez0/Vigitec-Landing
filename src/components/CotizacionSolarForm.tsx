"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

export default function CotizacionSolarForm() {
  const searchParams = useSearchParams();
  const kitQuery = searchParams.get("kit") || "";
  
  const kit_opciones: Record<string, string> = {
    'Kit-4.96kWp': 'Kit 1 (4.96 kWp)',
    'Kit-7.44kWp': 'Kit 2 (7.44 kWp)',
    'Kit-9.92kWp': 'Kit 3 (9.92 kWp)',
    'Kit-12.40kWp': 'Kit 4 (12.40 kWp)',
    'Kit-14.88kWp': 'Kit 5 (14.88 kWp)'
  };
  
  const opcion_preseleccionada = kit_opciones[kitQuery] || "";

  const [formData, setFormData] = useState({
    Nombre: "",
    Cédula: "",
    Teléfono: "",
    Dirección: "",
    Servicio: opcion_preseleccionada,
    Anos: ""
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const recaptchaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderCaptcha = () => {
      const grecaptcha = window.grecaptcha;
      if (grecaptcha && grecaptcha.render && recaptchaRef.current && !recaptchaRef.current.hasChildNodes()) {
        try {
          grecaptcha.render(recaptchaRef.current, {
            sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
            theme: 'dark'
          });
        } catch {
          // Ignorar si ya se renderizó
        }
      }
    };

    // Callback global llamado por el script de Google al cargar
    window.onloadCallback = renderCaptcha;

    // Ejecutar inmediatamente por si el script ya estaba cargado previamente
    renderCaptcha();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const grecaptcha = window.grecaptcha;
    let recaptchaResponse = "";
    
    if (grecaptcha) {
      recaptchaResponse = grecaptcha.getResponse();
      if (recaptchaResponse.length === 0) {
        setErrorMessage('Por favor, marque la casilla de "No soy un robot" antes de enviar la cotización.');
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
        return;
      }
    }

    setStatus("loading");

    try {
      const response = await fetch('/api/enviar-solar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, 'g-recaptcha-response': recaptchaResponse })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus("success");
        setFormData({
          Nombre: "", Cédula: "", Teléfono: "", Dirección: "", Servicio: "", Anos: ""
        });
        if (grecaptcha) grecaptcha.reset();
        
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setErrorMessage(data.message || 'Error de seguridad. Por favor intente nuevamente.');
        setStatus("error");
        if (grecaptcha) grecaptcha.reset();
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ha ocurrido un problema al enviar la cotización. Verifique su conexión o intente más tarde.');
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="lg:w-1/2 w-full">
      <div className="bg-[#1A1A1A]/95 backdrop-blur-md p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] rounded-lg border border-gray-700/50 relative">
        
        {/* Alerta de Error */}
        <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-accent text-white px-5 py-3 rounded-md shadow-red-glow font-medium text-sm flex items-center z-50 transition-all duration-300 w-11/12 md:w-auto md:max-w-md text-center ${status === "error" ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-[-10px]"}`}>
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <span>{errorMessage}</span>
        </div>

        {/* Alerta de Éxito */}
        <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#111111] border border-accent text-white px-6 py-4 rounded-lg shadow-red-glow font-medium text-sm flex items-center z-50 transition-all duration-300 w-11/12 md:w-auto md:max-w-md text-center ${status === "success" ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-[-10px]"}`}>
          <div className="bg-accent/20 p-2 rounded-full mr-3">
            <svg className="w-5 h-5 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <div className="text-left">
            <span className="text-[15px] font-semibold tracking-wide">¡Cotización enviada exitosamente!</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 transition-opacity duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <input type="text" value={formData.Nombre} onChange={e => setFormData({...formData, Nombre: e.target.value})} className="w-full p-4 bg-[#111111] border border-gray-700 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-inner placeholder-gray-500 font-medium rounded" placeholder="Nombre Completo*" required />
            </div>
            <div>
              <input type="text" value={formData.Cédula} onChange={e => setFormData({...formData, Cédula: e.target.value})} className="w-full p-4 bg-[#111111] border border-gray-700 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-inner placeholder-gray-500 font-medium rounded" placeholder="Cédula*" required />
            </div>
          </div>
          
          <div className="w-full">
            <input type="tel" value={formData.Teléfono} onChange={e => setFormData({...formData, Teléfono: e.target.value})} className="w-full p-4 bg-[#111111] border border-gray-700 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-inner placeholder-gray-500 font-medium rounded" placeholder="Teléfono*" required />
          </div>

          <div>
            <input type="text" value={formData.Dirección} onChange={e => setFormData({...formData, Dirección: e.target.value})} className="w-full p-4 bg-[#111111] border border-gray-700 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-inner placeholder-gray-500 font-medium rounded" placeholder="Dirección Exacta*" required />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <select value={formData.Servicio} onChange={e => setFormData({...formData, Servicio: e.target.value})} className={`w-full p-4 bg-[#111111] border border-gray-700 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-inner appearance-none cursor-pointer font-medium rounded ${formData.Servicio ? 'text-white' : 'text-gray-500'}`} required>
                <option value="" disabled>Kit Elegido*</option>
                <option value="Kit 1 (4.96 kWp)" className="text-white">Kit 1 (4.96 kWp)</option>
                <option value="Kit 2 (7.44 kWp)" className="text-white">Kit 2 (7.44 kWp)</option>
                <option value="Kit 3 (9.92 kWp)" className="text-white">Kit 3 (9.92 kWp)</option>
                <option value="Kit 4 (12.40 kWp)" className="text-white">Kit 4 (12.40 kWp)</option>
                <option value="Kit 5 (14.88 kWp)" className="text-white">Kit 5 (14.88 kWp)</option>
              </select>
            </div>
            <div>
              <select value={formData.Anos} onChange={e => setFormData({...formData, Anos: e.target.value})} className="w-full p-4 bg-[#111111] border border-gray-700 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-inner placeholder-gray-500 font-medium rounded appearance-none" required>
                <option value="" disabled>Años a Financiar*</option>
                <option value="1">1 Año</option>
                <option value="2">2 Años</option>
              </select>
            </div>
          </div>
          
          {/* reCAPTCHA Oficial de Google (Renderizado Explícito) */}
          <div className="flex items-center justify-center pt-2">
            <div ref={recaptchaRef} suppressHydrationWarning></div>
          </div>

          <div className="pt-2">
            <button disabled={status === "loading"} type="submit" className="w-full px-6 py-4 bg-white text-primary font-bold tracking-wider uppercase hover:bg-accent hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(230,57,70,0.4)] flex items-center justify-center group relative overflow-hidden rounded disabled:opacity-70">
              <span>{status === "loading" ? "Enviando Seguro..." : "Solicitar Cotización"}</span>
              {status !== "loading" && (
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              )}
              {status === "loading" && (
                <svg className="animate-spin ml-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              )}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
