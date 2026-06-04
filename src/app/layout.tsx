import type { Metadata } from 'next';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Vexum MX - Soluciones Tecnológicas del Futuro',
    template: '%s | Vexum MX',
  },
  description: 'Transformamos ideas en realidad con tecnología de punta. Desarrollo web, aplicaciones móviles, inteligencia artificial y soluciones digitales innovadoras.',
  keywords: [
    'desarrollo web',
    'aplicaciones móviles',
    'inteligencia artificial',
    'tecnología',
    'innovación',
    'México',
    'soluciones digitales',
    'software',
    '3D',
    'experiencias inmersivas',
  ],
  authors: [{ name: 'Vexum MX' }],
  creator: 'Vexum MX',
  publisher: 'Vexum MX',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: ['en_US'],
    url: 'https://vexum.mx',
    siteName: 'Vexum MX',
    title: 'Vexum MX - Soluciones Tecnológicas del Futuro',
    description: 'Transformamos ideas en realidad con tecnología de punta.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vexum MX - Soluciones Tecnológicas del Futuro',
    description: 'Transformamos ideas en realidad con tecnología de punta.',
    creator: '@vexummx',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: '#0a0a0f',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-dot-pattern">
        {children}
      </body>
    </html>
  );
}
