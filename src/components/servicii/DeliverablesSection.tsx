// src/components/servicii/DeliverablesSection.tsx
"use client"

import { useRef } from 'react'
import { CheckCircle } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import type { ServicePageData } from '@/lib/services-data'

interface DeliverablesSectionProps {
  service: ServicePageData
}

export function DeliverablesSection({ service }: DeliverablesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.deliverables-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.deliverables-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    const items = itemsRef.current.filter(Boolean)
    items.forEach((item, i) => {
      if (!item) return
      const icon = item.querySelector('.check-icon')

      gsap.fromTo(item,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: ANIM.duration.fast,
          delay: i * 0.08,
          ease: ANIM.ease.luxe,
          scrollTrigger: { trigger: '.deliverables-list', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
        }
      )

      if (icon) {
        gsap.fromTo(icon,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            delay: i * 0.08 + 0.2,
            ease: ANIM.ease.elastic,
            scrollTrigger: { trigger: '.deliverables-list', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
          }
        )
      }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        {/* Header */}
        <div className="deliverables-heading mb-12 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Ce Primesti
          </p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Livrabile <span className="text-gold-gradient">Incluse</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Checklist */}
        <div className="deliverables-list space-y-4">
          {service.deliverables.map((item, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el }}
              className="flex items-start gap-4 rounded-lg border border-grey-500/10 bg-black-elevated/50 px-6 py-4 transition-colors hover:border-gold/15"
            >
              <CheckCircle className="check-icon mt-0.5 h-5 w-5 shrink-0 text-gold" style={{ transform: 'scale(0)' }} />
              <span className="text-base text-grey-200">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
