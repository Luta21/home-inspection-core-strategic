// src/components/servicii/EquipmentSection.tsx
"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { getIcon } from '@/lib/icons'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { IMAGES } from '@/lib/images'
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
      { y: 50, opacity: 0, filter: 'blur(6px)' },
      {
        y: 0, opacity: 1, filter: 'blur(0px)',
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.equipment-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.equipment-card',
      { x: 40, opacity: 0, scale: 0.95 },
      {
        x: 0, opacity: 1, scale: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.relaxed,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.equipment-scroll', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-14 sm:py-16 md:py-20 lg:py-28">
      {/* Atmospheric background */}
      <Image
        src={IMAGES.equipmentBg}
        alt=""
        fill
        quality={50}
        sizes="100vw"
        className="object-cover opacity-[0.06]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="equipment-heading mb-10 sm:mb-12 lg:mb-16">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Echipamente Profesionale
          </p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Tehnologie de <span className="text-gold-gradient">Ultima Generatie</span>
          </h2>
          <div className="mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Horizontal scroll container */}
        <div className="equipment-scroll -mx-5 flex gap-4 overflow-x-auto px-5 pb-4 snap-x snap-mandatory scrollbar-hide sm:-mx-6 sm:gap-5 sm:px-6 md:gap-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0">
          {service.equipment.map((tool) => {
            const Icon = getIcon(tool.icon)
            return (
              <div
                key={tool.name}
                className="equipment-card w-[78%] shrink-0 snap-start rounded-2xl bg-gradient-to-b from-black-elevated to-black-soft/80 p-5 shadow-lg shadow-black/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 sm:w-[62%] sm:p-6 md:w-[46%] md:p-7 lg:w-auto lg:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/[0.06] md:mb-6 md:h-14 md:w-14">
                  <Icon className="h-5 w-5 text-gold/80 md:h-6 md:w-6" />
                </div>
                <h3 className="mb-1 text-base font-semibold text-white md:text-lg">{tool.name}</h3>
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
