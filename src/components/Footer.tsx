import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary pt-20 pb-10 border-t border-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12 mb-8">
          
          {/* Logo y Descripción */}
          <div className="md:col-span-1">
            <p className="text-gray-400 text-sm leading-relaxed">
              Especialistas en sistemas de seguridad, mantenimiento y protección para tu hogar o negocio con la más alta tecnología.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="text-white font-bold font-display mb-6 text-sm tracking-wider uppercase">Explorar</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-accent transition-colors">Inicio</Link></li>
              <li><Link href="/quienes-somos" className="hover:text-accent transition-colors">Quiénes somos</Link></li>
              <li><Link href="/servicios" className="hover:text-accent transition-colors">Servicios</Link></li>
            </ul>
          </div>
          
          {/* Ayuda */}
          <div>
            <h4 className="text-white font-bold font-display mb-6 text-sm tracking-wider uppercase">Ayuda</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/contacto" className="hover:text-accent transition-colors">Contacto</Link></li>
              <li><Link href="/cotizacion" className="hover:text-accent transition-colors">Solicitar Cotización</Link></li>
              <li><a href="https://eshop.premium-soft.com/VIGITECSECURITY" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Tienda Online</a></li>
            </ul>
          </div>

          {/* Información de Contacto */}
          <div>
            <h4 className="text-white font-bold font-display mb-6 text-sm tracking-wider uppercase">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-accent mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                +507 6933-0534
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-accent mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                info@vigitecpanama.com
              </li>
              <li className="flex items-start">
                <a href="https://www.instagram.com/vigitecpanama/" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-white transition-colors group">
                  <svg className="w-5 h-5 text-accent mr-3 mt-0.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Borde superior decorativo */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary mb-8"></div>
        
        {/* Bottom Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} VIGITEC PANAMA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
