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
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dylan-araica.vercel.app',
  ),
  title: {
    default: 'Dylan Araica | Portafolio y Blog',
    template: '%s | Dylan Araica',
  },
  description:
    'Desarrollador Frontend y creativo: construyendo experiencias digitales con diseño y detalle.',
  keywords: [
    'Dylan Araica',
    'Dylan Araica Nicaragua',
    'Portafolio Dylan Araica',
    'Desarrollador Frontend',
    'Next.js',
    'React',
    'TypeScript',
    'Universidad Nacional de Ingeniería',
    'UNI Nicaragua',
    'Managua',
  ],
  authors: [{ name: 'Dylan Araica' }],
  creator: 'Dylan Araica',
  publisher: 'Dylan Araica',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/images/image.jpg', type: 'image/jpeg' }],
    apple: [{ url: '/images/image.jpg', type: 'image/jpeg' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: '_XWv5hHveQE9Z31bsISFFWEt9Y3X0kAS2ApgkA6r0aM',
  },
  openGraph: {
    type: 'website',
    title: 'Dylan Araica | Portafolio y Blog',
    description:
      'Desarrollador Frontend y creativo: construyendo experiencias digitales con diseño y detalle.',
    url: '/',
    siteName: 'Dylan Araica',
    locale: 'es_ES',
    images: [
      {
        url: '/images/image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dylan Araica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dylan Araica | Portafolio y Blog',
    description:
      'Desarrollador Frontend y creativo: construyendo experiencias digitales con diseño y detalle.',
    images: ['/images/image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dylan-araica.vercel.app';

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dylan Araica',
    url: siteUrl,
    image: `${siteUrl}/images/Perfil.jpg`,
    jobTitle: 'Frontend Developer',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NI',
      addressLocality: 'Managua',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidad Nacional de Ingeniería',
    },
    sameAs: [
      'https://github.com/DylanA0110',
      'https://www.linkedin.com/in/dylan-araica-664354274',
      'https://www.tiktok.com/@dylanaraica6',
    ],
  };

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${interTight.variable} ${dancingScript.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // JSON-LD for SEO (Person)
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
