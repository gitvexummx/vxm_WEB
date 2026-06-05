import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Fuentes open source - Google Fonts
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vexum MX - Ingeniería Digital para Negocios de Éxito",
  description: "La tecnología que tu negocio necesita. Desarrollamos soluciones inteligentes para negocios en crecimiento que buscan liderar e innovar.",
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Vexum MX",
    title: "Vexum MX - Ingeniería Digital para Negocios de Éxito",
    description: "La tecnología que tu negocio necesita. Desarrollamos soluciones inteligentes para negocios en crecimiento.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vexum MX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vexum MX - Ingeniería Digital para Negocios de Éxito",
    description: "La tecnología que tu negocio necesita.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: ["desarrollo web", "software", "IA", "automatización", "México", "tecnología"],
  authors: [{ name: "Vexum MX" }],
  creator: "Vexum MX",
  publisher: "Vexum MX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vexum.mx"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-dark-900 text-white antialiased min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow pt-[72px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
