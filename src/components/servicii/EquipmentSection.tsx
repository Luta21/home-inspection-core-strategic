// src/components/servicii/EquipmentSection.tsx
"use client"

import { useRef } from 'react'
import { getIcon } from '@/lib/icons'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import type { ServicePageData } from '@/lib/services-data'

interface EquipmentSectionProps {
  service: ServicePageData
}

export function EquipmentSection({ service }: EquipmentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.equipment-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.equipment-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.equipment-card',
      { x: 60, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.relaxed,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.equipment-scroll', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="equipment-heading mb-12">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Echipamente Profesionale
          </p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Tehnologie de <span className="text-gold-gradient">Ultima Generatie</span>
          </h2>
          <div className="mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Horizontal scroll container */}
        <div className="equipment-scroll -mx-5 flex gap-6 overflow-x-auto px-5 pb-4 snap-x snap-mandatory scrollbar-hide lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0">
          {service.equipment.map((tool) => {
            const Icon = getIcon(tool.icon)
            return (
              <div
                key={tool.name}
                className="equipment-card min-w-[280px] shrink-0 snap-start rounded-2xl border border-grey-500/15 bg-gradient-to-b from-black-elevated to-black-soft/80 p-8 transition-all duration-500 hover:border-gold/25 lg:min-w-0"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-gold/15 bg-gold/[0.06]">
                  <Icon className="h-6 w-6 text-gold/80" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-white">{tool.name}</h3>
                <p className="mb-3 text-sm font-medium text-gold">{tool.type}</p>
                <p className="text-sm leading-relaxed text-grey-300">{tool.specs}</p>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}
