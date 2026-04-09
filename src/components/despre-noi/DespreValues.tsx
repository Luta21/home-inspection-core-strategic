"use client"

import { useRef } from 'react'
import { Shield, Crosshair, ShieldCheck } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'

const VALUES = [
  {
    icon: Shield,
    title: 'Transparenta',
    description: 'Rapoarte detaliate cu fotografii, fara informatii ascunse. Clientul vede exact ce vedem noi.',
  },
  {
    icon: Crosshair,
    title: 'Precizie',
    description: 'Echipamente profesionale Flir de ultima generatie si metodologie standardizata pentru fiecare inspectie.',
  },
  {
    icon: ShieldCheck,
    title: 'Protectie',
    description: 'Misiunea noastra este sa te protejam de surprize costisitoare dupa achizitia unui imobil.',
  },
] as const

export function DespreValues() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Heading stagger
    gsap.fromTo('.values-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: {
          trigger: '.values-heading',
          start: ANIM.scroll.start,
          toggleActions: ANIM.scroll.toggleOnce,
        },
      }
    )

    // Cards stagger
    gsap.fromTo('.value-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.relaxed,
        ease: ANIM.ease.luxe,
        scrollTrigger: {
          trigger: '.values-grid',
          start: ANIM.scroll.start,
          toggleActions: ANIM.scroll.toggleOnce,
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-14 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="values-heading mb-10 text-center sm:mb-12 lg:mb-16">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Valorile Noastre
          </p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            Principii Care Ne{' '}
            <span className="text-gold-gradient">Ghideaza</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Cards */}
        <div className="values-grid grid gap-6 md:grid-cols-3 lg:gap-8">
          {VALUES.map((value) => {
            const Icon = value.icon
            return (
              <div
                key={value.title}
                className="value-card group rounded-xl border border-gold/10 bg-black-elevated/50 p-6 md:p-7 lg:p-8 transition-colors duration-500 hover:border-gold/25"
              >
                {/* Icon container */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/[0.06]">
                  <Icon className="h-6 w-6 text-gold/80" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="mb-3 font-[var(--font-playfair)] text-xl font-bold text-white">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="font-[var(--font-inter)] text-sm leading-relaxed text-grey-300">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
