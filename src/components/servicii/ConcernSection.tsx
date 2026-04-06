"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { IMAGES } from '@/lib/images'
import type { ServicePageData } from '@/lib/services-data'

interface ConcernSectionProps {
  service: ServicePageData
}

export function ConcernSection({ service }: ConcernSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.concern-text > *',
      { y: 40, opacity: 0, filter: 'blur(6px)' },
      {
        y: 0, opacity: 1, filter: 'blur(0px)',
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.concern-text', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.concern-stats > *',
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.relaxed,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.concern-stats', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.concern-image',
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: ANIM.duration.luxe,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.concern-image', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Text — 3 columns */}
          <div className="concern-text lg:col-span-3">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              De Ce Conteaza
            </p>
            <h2 className="mb-8 font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              {service.concernHeading}
            </h2>
            {service.concernBody.map((paragraph, i) => (
              <p key={i} className="mb-4 text-base leading-relaxed text-grey-300 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Image + Stats — 2 columns */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            {/* Service image */}
            <div className="concern-image relative h-56 overflow-hidden rounded-xl shadow-lg shadow-black/30 lg:h-64">
              <Image
                src={IMAGES.services[service.slug]?.concern || IMAGES.hero}
                alt={service.title}
                fill
                quality={75}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-rich/60 to-transparent" />
            </div>

            {/* Stats */}
            <div className="concern-stats flex flex-col gap-6">
              {service.concernStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-black-elevated p-6 shadow-md shadow-black/25 transition-all hover:shadow-lg hover:shadow-black/35"
                >
                  <span className="block font-[var(--font-jetbrains)] text-3xl font-bold text-gold">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-sm text-grey-300">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
