import type { Metadata } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import { SITE, FAQ_ITEMS } from '@/lib/constants'
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
    default: 'Inspecție Tehnică Imobiliară București | Core Strategic Consulting',
    template: '%s | Core Strategic Consulting',
  },
  description: `Inspecție tehnică imobiliară profesională în București și Ilfov. Verificare apartament înainte de cumpărare cu echipamente Flir. 15+ ani experiență, 1000+ proprietăți inspectate. Scanare termografică, verificare structurală, detectare umiditate. Raport detaliat în 48h. Sună: ${SITE.phone}`,
  keywords: [
    'inspectie tehnica imobiliara',
    'inspectie tehnica imobiliara bucuresti',
    'verificare apartament inainte de cumparare',
    'inspector tehnic imobil',
    'scanare termografica bucuresti',
    'verificare structurala apartament',
    'home inspection bucuresti',
    'inspectie casa inainte de achizitie',
    'verificare instalatii apartament',
    'detectare umiditate pereti',
    'expertiza tehnica imobil',
    'raport inspectie imobiliara',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    title: 'Inspecție Tehnică Imobiliară București | Core Strategic Consulting',
    description: `Verificare apartament înainte de cumpărare. Scanare termografică, verificare structurală, detectare umiditate. 1000+ proprietăți inspectate în București și Ilfov.`,
    url: SITE.url,
    siteName: SITE.name,
    locale: 'ro_RO',
    type: 'website',
    images: [{ url: '/og/og-image.jpg', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inspecție Tehnică Imobiliară București | Core Strategic Consulting',
    description: `Verificare apartament înainte de cumpărare. Scanare termografică, verificare structurală, detectare umiditate. 1000+ proprietăți inspectate.`,
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
        '@type': ['ProfessionalService', 'HomeAndConstructionBusiness'],
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        alternateName: 'Core Strategic',
        description: 'Inspecție tehnică imobiliară profesională în București și Ilfov. Verificare structurală, scanare termografică, detectare umiditate, verificare instalații. Peste 1000 de proprietăți inspectate, 15+ ani experiență.',
        url: SITE.url,
        telephone: SITE.phoneFormatted,
        email: SITE.email,
        logo: `${SITE.url}/images/logo.png`,
        image: `${SITE.url}/og/og-image.jpg`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'București',
          addressRegion: 'București',
          postalCode: '010101',
          addressCountry: 'RO',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 44.4268,
          longitude: 26.1025,
        },
        areaServed: [
          { '@type': 'City', name: 'București' },
          { '@type': 'AdministrativeArea', name: 'Ilfov' },
        ],
        priceRange: '€€',
        currenciesAccepted: 'RON, EUR',
        paymentAccepted: 'Cash, Card, Transfer Bancar',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
        sameAs: [
          'https://www.facebook.com/corestrategicconsulting',
        ],
        knowsAbout: [
          'Inspecție tehnică imobiliară',
          'Scanare termografică',
          'Verificare structurală',
          'Determinare umiditate',
          'Expertize tehnice',
          'Home inspection',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicii Inspecție Tehnică Imobiliară',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Verificare Documentație Tehnică', description: 'Verificăm cartea tehnică a construcției, corelăm proiectul tehnic cu execuția reală', url: `${SITE.url}/servicii/verificare-documentatie-tehnica` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Verificare Elemente Structuri', description: 'Verificăm armăturile, identificăm defecte de betonare, testare grad beton cu sclerometru', url: `${SITE.url}/servicii/verificare-elemente-structuri` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Scanare Termografică Profesională', description: 'Detectare punți termice, defecte de izolație și infiltrații ascunse cu camera Flir E60', url: `${SITE.url}/servicii/scanare-termografica` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Verificare Instalații Complete', description: 'Audit complet al instalațiilor electrice, sanitare, de încălzire și climatizare', url: `${SITE.url}/servicii/verificare-instalatii` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Determinare Umiditate Structuri', description: 'Măsurare precisă a umidității cu higrometrul profesional Flir MR160', url: `${SITE.url}/servicii/determinare-umiditate` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Expertize Tehnice de Specialitate', description: 'Expertize tehnice pentru mansardare, supraetajare, extindere, consolidare', url: `${SITE.url}/servicii/expertize-tehnice` } },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: 'Inspecție tehnică imobiliară profesională în București și Ilfov',
        publisher: { '@id': `${SITE.url}/#organization` },
        inLanguage: 'ro-RO',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE.url}/servicii/{search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE.url}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
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
