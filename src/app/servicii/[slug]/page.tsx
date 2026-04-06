// src/app/servicii/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICE_PAGES, SERVICE_SLUGS } from '@/lib/services-data'
import { SITE } from '@/lib/constants'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/effects/SmoothScroll'
import { CTABanner } from '@/components/ui/CTABanner'
import { ServiceHero } from '@/components/servicii/ServiceHero'
import { ConcernSection } from '@/components/servicii/ConcernSection'
import { SolutionSection } from '@/components/servicii/SolutionSection'
import { MethodologyStepper } from '@/components/servicii/MethodologyStepper'
import { EquipmentSection } from '@/components/servicii/EquipmentSection'
import { DeliverablesSection } from '@/components/servicii/DeliverablesSection'
import { RelatedServices } from '@/components/servicii/RelatedServices'
import { ServiceFAQ } from '@/components/servicii/ServiceFAQ'
import { ServiceCTA } from '@/components/servicii/ServiceCTA'

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICE_PAGES[slug]
  if (!service) return {}

  const url = `${SITE.url}/servicii/${service.slug}`

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.metaKeywords,
    openGraph: {
      title: `${service.metaTitle} | ${SITE.name}`,
      description: service.metaDescription,
      url,
      siteName: SITE.name,
      locale: 'ro_RO',
      type: 'website',
      images: [{ url: '/og/og-image.jpg', width: 1200, height: 630, alt: service.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.metaTitle} | ${SITE.name}`,
      description: service.metaDescription,
      images: ['/og/og-image.jpg'],
    },
    alternates: { canonical: url },
  }
}

function ServiceJsonLd({ service }: { service: (typeof SERVICE_PAGES)[string] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'București' },
      { '@type': 'AdministrativeArea', name: 'Ilfov' },
    ],
    url: `${SITE.url}/servicii/${service.slug}`,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = SERVICE_PAGES[slug]
  if (!service) notFound()

  return (
    <SmoothScrollProvider>
      <Header />
      <ServiceJsonLd service={service} />

      <main id="main-content">
        <ServiceHero service={service} />
        <ConcernSection service={service} />
        <SolutionSection service={service} />
        <MethodologyStepper service={service} />
        <EquipmentSection service={service} />
        <DeliverablesSection service={service} />

        <CTABanner headline={service.ctaHeadline} subtext={service.ctaSubtext} />

        <RelatedServices currentSlug={service.slug} />
        <ServiceFAQ service={service} />
        <ServiceCTA headline={service.closingHeadline} />
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
