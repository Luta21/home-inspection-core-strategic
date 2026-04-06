"use client"

import { useRef } from 'react'
import { Phone, ArrowRight, MessageCircle } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SITE } from '@/lib/constants'

interface ServiceCTAProps {
  headline: string
}

export function ServiceCTA({ headline }: ServiceCTAProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.service-cta-content > *',
      { y: 50, opacity: 0, filter: 'blur(6px)' },
      {
        y: 0, opacity: 1, filter: 'blur(0px)',
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.service-cta-content', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="grain-overlay relative overflow-hidden bg-black-pure py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8">
        <div className="service-cta-content">
          <div className="mx-auto mb-8 h-[2px] w-16 bg-gold" />

          <h2 className="mb-6 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            {headline}
          </h2>

          <p className="mb-10 text-base text-grey-300">
            Contacteaza-ne pentru o consultatie gratuita. Raspundem in maxim 2 ore.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="btn-shimmer relative inline-flex items-center gap-2 overflow-hidden rounded-md px-8 py-4 text-sm font-bold uppercase tracking-wider text-black-rich transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)]"
              style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C, #B8860B)' }}
            >
              Programeaza Inspectia
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href={`tel:${SITE.phoneFormatted}`}
              className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-8 py-4 text-sm font-medium text-gold transition-all hover:border-gold hover:bg-gold/10"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>

            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-gold/20 px-6 py-4 text-sm font-medium text-gold/80 transition-all hover:border-gold/40 hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
