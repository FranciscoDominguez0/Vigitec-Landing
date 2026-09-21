import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vigitec Panamá - Sistemas de Seguridad Premium",
  description: "Vigitec Panamá - Especialistas en sistemas de seguridad premium. Instalación de cámaras, alarmas, control de acceso y mantenimiento con soporte 24/7.",
  keywords: "sistemas de seguridad panamá, cámaras de seguridad, instalación de cámaras, alarmas panamá, control de acceso, mantenimiento de seguridad",
  openGraph: {
    type: "website",
    url: "https://vigitecpanama.com/",
    title: "Vigitec Panamá - Sistemas de Seguridad Premium",
    description: "Vigitec Panamá - Especialistas en sistemas de seguridad premium. Instalación de cámaras, alarmas, control de acceso y mantenimiento con soporte 24/7.",
    images: ["https://vigitecpanama.com/assets/img/hero/servicios_bg.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vigitec Panamá - Sistemas de Seguridad Premium",
    description: "Vigitec Panamá - Especialistas en sistemas de seguridad premium. Instalación de cámaras, alarmas, control de acceso y mantenimiento con soporte 24/7.",
    images: ["https://vigitecpanama.com/assets/img/hero/servicios_bg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
