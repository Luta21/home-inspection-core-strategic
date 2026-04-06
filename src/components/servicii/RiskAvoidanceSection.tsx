"use client"

import { useRef } from 'react'
import { AlertTriangle } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import type { ServicePageData } from '@/lib/services-data'

interface RiskAvoidanceSectionProps {
  service: ServicePageData
}

export function RiskAvoidanceSection({ service }: RiskAvoidanceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.risk-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.risk-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.risk-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.risk-grid', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  if (service.risks.length === 0) return null

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="risk-heading mb-16 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-red-400">
            Riscuri Reale
          </p>
          <h2 className="mx-auto mb-4 max-w-3xl font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Ce Riscuri Eviți cu{' '}
            <span className="text-gold-gradient">{service.title}</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        <div className="risk-grid grid gap-6 sm:grid-cols-2 lg:gap-8">
          {service.risks.map((risk) => (
            <div
              key={risk.title}
              className="risk-card group rounded-xl border border-grey-500/15 bg-gradient-to-b from-black-elevated to-black-soft/80 p-8 transition-all duration-500 hover:border-red-500/25"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/15 bg-red-500/[0.06] transition-all duration-400 group-hover:border-red-500/30 group-hover:bg-red-500/10">
                  <AlertTriangle className="h-5 w-5 text-red-400/80 transition-colors duration-400 group-hover:text-red-400" />
                </div>
                <span className="rounded-lg bg-red-500/10 px-3 py-1.5 font-[var(--font-jetbrains)] text-sm font-bold text-red-400">
                  {risk.cost}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{risk.title}</h3>
              <p className="text-sm leading-relaxed text-grey-300">{risk.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-grey-400">
          Costul unei inspecții profesionale este o fracțiune din costul remedierii problemelor nedetectate.
        </p>
      </div>
    </section>
  )
}
