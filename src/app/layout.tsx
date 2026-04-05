import type { Metadata } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import { SITE } from '@/lib/constants'
import { ScrollProgress } from '@/components/effects/ScrollProgress'
import { WhatsAppFAB } from '@/components/ui/WhatsAppFAB'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Core Strategic Consulting | Inspecție Tehnică Imobiliară București',
    template: '%s | Core Strategic Consulting',
  },
  description: `Inspecție tehnică imobiliară profesională în București și Ilfov. 15+ ani experiență, 1000+ proprietăți inspectate. Verificare structurală, termografie, detectare umiditate. Sună: ${SITE.phone}`,
  keywords: [
    'inspectie tehnica imobiliara',
    'verificare apartament',
    'inspector tehnic imobil bucuresti',
    'scanare termografica',
    'verificare structurala',
    'home inspection bucuresti',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    title: 'Core Strategic Consulting | Inspecție Tehnică Imobiliară București',
    description: `Inspecție tehnică imobiliară profesională în București și Ilfov. 15+ ani experiență, 1000+ proprietăți inspectate.`,
    url: SITE.url,
    siteName: SITE.name,
    locale: 'ro_RO',
    type: 'website',
    images: [{ url: '/og/og-image.jpg', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Core Strategic Consulting | Inspecție Tehnică Imobiliară',
    description: `Inspecție tehnică imobiliară profesională în București și Ilfov.`,
    images: ['/og/og-image.jpg'],
  },
  alternates: { canonical: SITE.url },
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
}

function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HomeAndConstructionBusiness',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        description: 'Inspecție tehnică imobiliară profesională în București și Ilfov. Verificare structurală, scanare termografică, detectare umiditate, verificare instalații.',
        url: SITE.url,
        telephone: SITE.phoneFormatted,
        email: SITE.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'București',
          addressRegion: 'București',
          addressCountry: 'RO',
        },
        areaServed: [
          { '@type': 'City', name: 'București' },
          { '@type': 'AdministrativeArea', name: 'Ilfov' },
        ],
        priceRange: '€€',
        currenciesAccepted: 'RON, EUR',
        paymentAccepted: 'Cash, Card',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicii Inspecție Tehnică',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Inspecție Tehnică Imobiliară', description: 'Evaluare completă a proprietății' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Scanare Termografică', description: 'Detectare punți termice cu Flir E60' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Verificare Structurală', description: 'Verificare armături și concordanță proiect-execuție' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Verificare Instalații', description: 'Audit complet instalații electrice, sanitare, termice' } },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { '@id': `${SITE.url}/#organization` },
        inLanguage: 'ro-RO',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ro"
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen bg-black-rich text-grey-200">
        <JsonLd />
        <ScrollProgress />
        {children}
        <WhatsAppFAB />
      </body>
    </html>
  )
}
