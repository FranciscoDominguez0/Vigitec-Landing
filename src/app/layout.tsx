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
  metadataBase: new URL("https://vigitecpanama.com/"),
  title: "Vigitec Panamá",
  description: "Vigitec Panamá - Especialistas en sistemas de seguridad. Instalación de cámaras, alarmas, control de acceso y mantenimiento con soporte 24/7.",
  keywords: "sistemas de seguridad panamá, cámaras de seguridad, instalación de cámaras, alarmas panamá, control de acceso, mantenimiento de seguridad",
  authors: [{ name: "Francisco Dominguez" }],
  creator: "Francisco Dominguez",
  publisher: "Francisco Dominguez",
  openGraph: {
    type: "website",
    url: "https://vigitecpanama.com/",
    title: "Vigitec Panamá",
    description: "Vigitec Panamá - Especialistas en sistemas de seguridad. Instalación de cámaras, alarmas, control de acceso y mantenimiento con soporte 24/7.",
    images: ["https://vigitecpanama.com/assets/img/hero/servicios_bg.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vigitec Panamá",
    description: "Vigitec Panamá - Especialistas en sistemas de seguridad. Instalación de cámaras, alarmas, control de acceso y mantenimiento con soporte 24/7.",
    images: ["https://vigitecpanama.com/assets/img/hero/servicios_bg.png"],
  },
  other: {
    "creation-date": "2026-09-20",
    "date": "2026-09-20",
    "revised": "2026-09-20"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link rel="preload" href="/assets/img/hero/servicios_bg.png" as="image" fetchPriority="high" />
      </head>
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