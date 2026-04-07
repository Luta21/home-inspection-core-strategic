import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { Header } from '@/components/layout/Header'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustStrip } from '@/components/home/TrustStrip'
import { ProblemSection } from '@/components/home/ProblemSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { ProcessSection } from '@/components/home/ProcessSection'
import { AboutSection } from '@/components/home/AboutSection'
import { WhyUsSection } from '@/components/home/WhyUsSection'
import { ReportSection } from '@/components/home/ReportSection'
import { PricingSection } from '@/components/home/PricingSection'
import { PortfolioSection } from '@/components/home/PortfolioSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { FAQSection } from '@/components/home/FAQSection'
import { CTASection } from '@/components/home/CTASection'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/effects/SmoothScroll'
import { CTABanner } from '@/components/ui/CTABanner'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Inspecție Tehnică Imobiliară București & Ilfov | Core Strategic Consulting',
  description: `Inspecție tehnică imobiliară profesională — verificare apartament și casă înainte de cumpărare. Scanare termografică Flir E60, verificare structurală, detectare umiditate, verificare instalații. 1000+ proprietăți inspectate, raport detaliat în 48h. Sună: ${SITE.phone}`,
  alternates: { canonical: SITE.url },
  openGraph: {
    title: 'Inspecție Tehnică Imobiliară București | Core Strategic Consulting',
    description: 'Verificare apartament înainte de cumpărare cu echipamente profesionale Flir. 1000+ proprietăți inspectate în București și Ilfov. Raport detaliat în 48h.',
    url: SITE.url,
    images: [{ url: '/og/og-image.jpg', width: 1200, height: 630, alt: 'Core Strategic Consulting — Inspecție Tehnică Imobiliară' }],
  },
}

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <Header />

      {/* Hero is fixed — sits behind everything */}
      <HeroSection />

      {/* Spacer so content starts after hero viewport */}
      <div className="h-screen" aria-hidden="true" />

      {/* Main content scrolls OVER the hero */}
      <main id="main-content" className="relative z-10">
        <TrustStrip />
        <ProblemSection />

        <CTABanner
          headline="Nu risca — verifică înainte să cumperi."
          subtext="Programează o inspecție tehnică și primește raportul în 48h."
        />

        <ServicesSection />
        <TestimonialsSection />
        <ProcessSection />
        <AboutSection />

        <CTABanner
          variant="dark"
          headline="Consultanță gratuită pentru proprietatea ta."
          subtext="Sună acum sau completează formularul — răspundem în maxim 2 ore."
        />

        <WhyUsSection />
        <ReportSection />
        <PricingSection />

        <CTABanner
          headline="Protejează-ți investiția cu o inspecție profesională."
          subtext="Alege pachetul potrivit și programează inspecția astăzi."
        />

        <PortfolioSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </SmoothScrollProvider>
  )
}
