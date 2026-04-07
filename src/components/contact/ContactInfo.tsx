"use client"

import { useRef } from 'react'
import { Phone, Mail, Clock } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SITE } from '@/lib/constants'

export function ContactInfo() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.info-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.relaxed,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: sectionRef.current, start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
      }
    )
  }, { scope: sectionRef })

  const INFO_CARDS = [
    {
      icon: Phone,
      title: 'Telefon',
      content: (
        <>
          <a href={`tel:${SITE.phoneFormatted}`} className="block text-base font-bold text-white transition-colors hover:text-gold">
            {SITE.phone}
          </a>
          <a href={`tel:${SITE.phoneSecondaryFormatted}`} className="mt-1 block text-sm text-grey-300 transition-colors hover:text-white">
            {SITE.phoneSecondaryName}: {SITE.phoneSecondary}
          </a>
        </>
      ),
    },
    {
      icon: Mail,
      title: 'Email',
      content: (
        <>
          <a href={`mailto:${SITE.email}`} className="block text-base font-bold text-white transition-colors hover:text-gold">
            {SITE.email}
          </a>
          <p className="mt-1 text-sm text-grey-300">Răspundem în maxim 2 ore</p>
        </>
      ),
    },
    {
      icon: Clock,
      title: 'Program',
      content: (
        <>
          <p className="text-sm text-grey-200">Luni — Vineri: 08:00 — 18:00</p>
          <p className="text-sm text-grey-200">Sâmbătă: 09:00 — 14:00</p>
          <p className="mt-1 text-sm text-grey-400">Duminică: Închis</p>
        </>
      ),
    },
  ]

  return (
    <section ref={sectionRef} className="bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {INFO_CARDS.map((card) => (
            <div
              key={card.title}
              className="info-card rounded-xl border border-gold/10 bg-black-elevated/50 p-7 text-center opacity-0"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/20 bg-gold/5">
                <card.icon className="h-6 w-6 text-gold" />
              </div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{card.title}</p>
              {card.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
