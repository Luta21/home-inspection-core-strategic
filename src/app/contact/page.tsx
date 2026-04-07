import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/effects/SmoothScroll'
import { ContactHero } from '@/components/contact/ContactHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { ContactMap } from '@/components/contact/ContactMap'
import { ContactFAQ } from '@/components/contact/ContactFAQ'

export const metadata: Metadata = {
  title: 'Contact — Programează Inspecția | Core Strategic Consulting',
  description: `Contactează Core Strategic Consulting pentru o inspecție tehnică imobiliară în București și Ilfov. Sună: ${SITE.phone} sau trimite un mesaj pe WhatsApp. Răspundem în maxim 2 ore.`,
  keywords: [
    'contact inspectie tehnica imobiliara',
    'programare inspectie apartament bucuresti',
    'telefon inspector tehnic imobil',
  ],
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: 'Contact — Programează Inspecția | Core Strategic Consulting',
    description: `Sună ${SITE.phone} sau trimite un mesaj pe WhatsApp pentru o inspecție tehnică imobiliară în București și Ilfov.`,
    url: `${SITE.url}/contact`,
    images: [{ url: '/og/og-image.jpg', width: 1200, height: 630, alt: 'Core Strategic Consulting — Contact' }],
  },
}

function ContactJsonLd() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE.url}/contact` },
    ],
  }

  const contactPage = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Core Strategic Consulting',
    description: `Contactează-ne pentru o inspecție tehnică imobiliară în București și Ilfov. Telefon: ${SITE.phone}`,
    url: `${SITE.url}/contact`,
    mainEntity: { '@id': `${SITE.url}/#organization` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPage) }} />
    </>
  )
}

export default function ContactPage() {
  return (
    <SmoothScrollProvider>
      <Header />
      <ContactJsonLd />

      <main id="main-content">
        <ContactHero />
        <ContactForm />
        <ContactInfo />
        <ContactMap />
        <ContactFAQ />
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
