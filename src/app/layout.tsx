import type { Metadata } from 'next';
import { Cormorant_Garamond, Syne, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://elysien-sanctuary.ch'),
  title: 'ÉLYSIEN — Sacred Thermal Baths & Longevity Retreat | Swiss Alps',
  description:
    'An architecture of stillness, subterranean mineral springs, and cellular longevity nestled in the Engadin Valley. Experience award-winning geothermal wellness.',
  keywords: [
    'luxury wellness spa',
    'thermal baths',
    'cellular longevity retreat',
    'Swiss Alps spa',
    'architectural wellness sanctuary',
    'Élysien',
  ],
  authors: [{ name: 'Élysien Sanctuary Atelier' }],
  openGraph: {
    title: 'ÉLYSIEN — Sacred Thermal Baths & Longevity Retreat',
    description:
      'The architecture of stillness, subterranean mineral springs, and cellular longevity nestled in the Engadin Valley.',
    type: 'website',
    images: [
      {
        url: '/images/hero_thermal_bath.jpg',
        width: 1920,
        height: 1080,
        alt: 'Élysien Sanctuary Thermal Bath at Dusk',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${syne.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

