import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cotización | Vigitec Panamá",
  description: "Solicita tu cotización de sistemas de seguridad, alarmas, cámaras, y paneles solares.",
};

export default function CotizacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
