"use client"

import { useRef } from 'react'
import { User } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import type { ServicePageData } from '@/lib/services-data'

interface WhoNeedsThisSectionProps {
  service: ServicePageData
}

export function WhoNeedsThisSection({ service }: WhoNeedsThisSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.who-heading > *',
      { y: 50, opacity: 0, filter: 'blur(6px)' },
      {
        y: 0, opacity: 1, filter: 'blur(0px)',
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.who-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.who-card',
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.who-grid', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  if (service.whoNeedsThis.length === 0) return null

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-14 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="who-heading mb-10 text-center sm:mb-12 lg:mb-16">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Este Pentru Tine?
          </p>
          <h2 className="mx-auto mb-4 max-w-3xl font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Cine Are Nevoie de{' '}
            <span className="text-gold-gradient">{service.title}</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        <div className="who-grid grid gap-6 sm:grid-cols-2 lg:gap-8">
          {service.whoNeedsThis.map((item) => (
            <div
              key={item.persona}
              className="who-card group rounded-xl bg-gradient-to-b from-black-elevated to-black-soft/80 p-6 md:p-7 lg:p-8 shadow-lg shadow-black/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/[0.06] transition-all duration-400 group-hover:bg-gold/10">
                <User className="h-5 w-5 text-gold/80 transition-colors duration-400 group-hover:text-gold" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{item.persona}</h3>
              <p className="text-sm leading-relaxed text-grey-300">{item.scenario}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
