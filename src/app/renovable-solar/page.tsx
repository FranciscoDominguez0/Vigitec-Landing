import { Metadata } from 'next';
import KitsSection from "@/components/KitsSection";

export const metadata: Metadata = {
  title: "Renovable Solar | Vigitec Panamá",
  description: "Ahorra en tu factura de luz con nuestros kits de paneles solares listos para instalar. Energía limpia y ahorro inteligente para Panamá.",
};

export default function RenovableSolarPage() {
  return (
    <main>
      <KitsSection />
    </main>
  );
}
