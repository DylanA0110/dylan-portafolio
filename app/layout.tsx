import React from 'react';
import type { Metadata } from 'next';
import { Inter_Tight, Dancing_Script } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter-tight',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dancing-script',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: {
    default: 'Dylan Araica | Portafolio y Blog',
    template: '%s | Dylan Araica',
  },
  description:
    'Desarrollador Frontend y creativo: construyendo experiencias digitales con diseño y detalle.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: 'Dylan Araica | Portafolio y Blog',
    description:
      'Desarrollador Frontend y creativo: construyendo experiencias digitales con diseño y detalle.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dylan Araica | Portafolio y Blog',
    description:
      'Desarrollador Frontend y creativo: construyendo experiencias digitales con diseño y detalle.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${interTight.variable} ${dancingScript.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
