import Link from "next/link";
import Image from "next/image";

interface KitCardProps {
  titulo: string;
  potencia: string;
  ahorro: string;
  precio: string;
  paneles: number;
  microinversores: number;
  imagenSrc: string;
  kitQuery: string;
  reverse?: boolean;
}

export default function KitCard({
  titulo,
  potencia,
  ahorro,
  precio,
  paneles,
  microinversores,
  imagenSrc,
  kitQuery,
  reverse = false
}: KitCardProps) {
  return (
    <div className={`bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden hover:border-accent transition-colors duration-500 group flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} h-full items-stretch`}>
      <div className="w-full md:w-2/5 relative min-h-[300px]">
        <Image src={imagenSrc} alt={`${titulo} (${potencia})`} fill className="object-cover" />
      </div>
      <div className="p-8 flex flex-col w-full md:w-3/5">
        <div className={`mb-6 ${reverse ? 'mt-4 md:mt-0' : ''}`}>
          <h3 className="text-2xl font-bold text-white font-display mb-2">{titulo} <span className="text-xl font-medium text-gray-500 ml-2">{potencia}</span></h3>
          <p className="text-accent font-semibold text-lg">{ahorro}</p>
        </div>
        <p className="text-gray-400 mb-6 text-sm">El sistema es &quot;todo incluido&quot; y conectado a la red. Precio desde <strong>${precio}</strong>.</p>
        <ul className="text-gray-400 font-light space-y-3 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <li className="flex items-center"><svg className="w-5 h-5 text-accent mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> {paneles} Paneles solares</li>
          <li className="flex items-center"><svg className="w-5 h-5 text-accent mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> {microinversores} Microinversores</li>
          <li className="flex items-center"><svg className="w-5 h-5 text-accent mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Estructura de montaje</li>
          <li className="flex items-center"><svg className="w-5 h-5 text-accent mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Medidor y equipos eléctricos</li>
        </ul>
        <Link href={`/cotizacion-solar?kit=${kitQuery}`} className="mt-auto w-full md:w-auto self-start text-center bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-lg">
          Cotizar este Kit
        </Link>
      </div>
    </div>
  );
}
