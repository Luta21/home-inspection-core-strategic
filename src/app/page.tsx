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
import { MobileStickyBar } from '@/components/ui/MobileStickyBar'

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
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <MobileStickyBar />
    </SmoothScrollProvider>
  )
}
