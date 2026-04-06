// src/components/servicii/SolutionSection.tsx
"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { getIcon } from '@/lib/icons'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { IMAGES } from '@/lib/images'
import type { ServicePageData } from '@/lib/services-data'

interface SolutionSectionProps {
  service: ServicePageData
}

export function SolutionSection({ service }: SolutionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.solution-heading > *',
      { y: 50, opacity: 0, filter: 'blur(6px)' },
      {
        y: 0, opacity: 1, filter: 'blur(0px)',
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.solution-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.solution-image',
      { y: 60, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: ANIM.duration.luxe,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.solution-image', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.solution-card',
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.solution-grid', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="solution-heading mb-16 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Solutia Noastra
          </p>
          <h2 className="mx-auto mb-4 max-w-2xl font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            {service.title}
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Service image */}
        <div className="solution-image relative mb-16 h-64 overflow-hidden rounded-2xl shadow-xl shadow-black/40 lg:h-80">
          <Image
            src={IMAGES.services[service.slug]?.solution || IMAGES.hero}
            alt={service.title}
            fill
            quality={75}
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-soft via-transparent to-black-soft/30" />
        </div>

        {/* Benefits grid */}
        <div className="solution-grid grid gap-6 sm:grid-cols-2 lg:gap-8">
          {service.benefits.map((benefit) => {
            const Icon = getIcon(benefit.icon)
            return (
              <div
                key={benefit.title}
                className="solution-card group rounded-xl bg-gradient-to-b from-black-elevated to-black-soft/80 p-8 shadow-lg shadow-black/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/[0.06] transition-all duration-400 group-hover:bg-gold/10">
                  <Icon className="h-5 w-5 text-gold/80 transition-colors duration-400 group-hover:text-gold" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-grey-300">{benefit.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
