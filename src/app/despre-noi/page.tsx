import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/effects/SmoothScroll'
import { CTABanner } from '@/components/ui/CTABanner'
import { DespreHero } from '@/components/despre-noi/DespreHero'
import { DespreStory } from '@/components/despre-noi/DespreStory'
import { DespreValues } from '@/components/despre-noi/DespreValues'
import { DespreEquipment } from '@/components/despre-noi/DespreEquipment'
import { DespreStats } from '@/components/despre-noi/DespreStats'

export const metadata: Metadata = {
  title: 'Despre Noi — Cine Suntem | Core Strategic Consulting',
  description: 'Echipa Core Strategic Consulting — 15+ ani experiență în inspecție tehnică imobiliară. Echipamente profesionale Flir, metodologie riguroasă, peste 1000 proprietăți inspectate în București și Ilfov.',
  keywords: [
    'inspectie tehnica imobiliara bucuresti',
    'echipa inspectie imobiliara',
    'core strategic consulting despre noi',
    'inspector tehnic imobil experienta',
  ],
  alternates: { canonical: `${SITE.url}/despre-noi` },
  openGraph: {
    title: 'Despre Noi — Cine Suntem | Core Strategic Consulting',
    description: 'Echipa Core Strategic Consulting — 15+ ani experiență, 1000+ proprietăți inspectate, echipamente profesionale Flir.',
    url: `${SITE.url}/despre-noi`,
    images: [{ url: '/og/og-image.jpg', width: 1200, height: 630, alt: 'Core Strategic Consulting — Despre Noi' }],
  },
}

function DespreNoiJsonLd() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Despre Noi', item: `${SITE.url}/despre-noi` },
    ],
  }

  const aboutPage = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Despre Core Strategic Consulting',
    description: 'Echipa Core Strategic Consulting — 15+ ani experiență în inspecție tehnică imobiliară profesională în București și Ilfov.',
    url: `${SITE.url}/despre-noi`,
    mainEntity: { '@id': `${SITE.url}/#organization` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPage) }} />
    </>
  )
}

export default function DespreNoiPage() {
  return (
    <SmoothScrollProvider>
      <Header />
      <DespreNoiJsonLd />

      <main id="main-content">
        <DespreHero />
        <DespreStory />
        <DespreValues />
        <DespreEquipment />
        <DespreStats />
        <CTABanner
          headline="Pregătit Să Îți Protejezi Investiția?"
          subtext="Programează o inspecție tehnică și primește raportul detaliat în 48h."
        />
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
