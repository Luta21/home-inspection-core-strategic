"use client"

import { useRef } from 'react'
import { Thermometer, Droplets, Hammer } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'

const EQUIPMENT = [
  {
    icon: Thermometer,
    name: 'Flir E60',
    type: 'Camera Termografica',
    specs: 'Detectare punti termice, infiltratii ascunse si pierderi de caldura cu rezolutie 320x240 pixeli infrarosu. Sensibilitate termica sub 0.05\u00B0C.',
  },
  {
    icon: Droplets,
    name: 'Flir MR160',
    type: 'Higrometru Profesional',
    specs: 'Masurare precisa a umiditatii in structuri, identificare surse infiltratii cu ghidare termica. Mod pin si non-contact.',
  },
  {
    icon: Hammer,
    name: 'Sclerometru',
    type: 'Testare Beton',
    specs: 'Determinare grad beton prin impact controlat, verificare rezistenta elemente structurale. Calibrare profesionala certificata.',
  },
] as const

export function DespreEquipment() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Heading stagger
    gsap.fromTo('.equipment-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: {
          trigger: '.equipment-heading',
          start: ANIM.scroll.start,
          toggleActions: ANIM.scroll.toggleOnce,
        },
      }
    )

    // Cards stagger
    gsap.fromTo('.equipment-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.relaxed,
        ease: ANIM.ease.luxe,
        scrollTrigger: {
          trigger: '.equipment-grid',
          start: ANIM.scroll.start,
          toggleActions: ANIM.scroll.toggleOnce,
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <div className="equipment-heading mb-20 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Echipamente Profesionale
          </p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            Tehnologie de Ultima{' '}
            <span className="text-gold-gradient">Generatie</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Cards */}
        <div className="equipment-grid grid gap-6 md:grid-cols-3 lg:gap-8">
          {EQUIPMENT.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.name}
                className="equipment-card group rounded-xl border border-gold/10 bg-black-elevated/50 p-8 transition-colors duration-500 hover:border-gold/25"
              >
                {/* Icon container */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gold/[0.06]">
                  <Icon className="h-7 w-7 text-gold/80" strokeWidth={1.5} />
                </div>

                {/* Name */}
                <h3 className="mb-1 font-[var(--font-playfair)] text-xl font-bold text-white">
                  {item.name}
                </h3>

                {/* Type label */}
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/70">
                  {item.type}
                </p>

                {/* Specs */}
                <p className="font-[var(--font-inter)] text-sm leading-relaxed text-grey-300">
                  {item.specs}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
