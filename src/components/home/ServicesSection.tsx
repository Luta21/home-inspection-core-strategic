"use client"

import { useRef, useCallback } from 'react'
import { ArrowRight, Search, Shield, Thermometer, Zap, Droplets, FileCheck } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SERVICES } from '@/lib/constants'

const ICON_MAP = { Search, Shield, Thermometer, Zap, Droplets, FileCheck } as const

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.services-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.services-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    const cards = cardsRef.current.filter(Boolean)
    cards.forEach((card, i) => {
      if (!card) return

      gsap.fromTo(card,
        { y: 60 + (i % 2 === 0 ? 20 : 0), opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: ANIM.duration.normal,
          delay: i * 0.1,
          ease: ANIM.ease.luxe,
          scrollTrigger: { trigger: '.services-grid', start: 'top 90%', toggleActions: ANIM.scroll.toggleOnce },
        }
      )

      // Parallax — odd cards float slightly faster
      gsap.to(card, {
        y: i % 2 === 0 ? -20 : -40,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      })

      // Background icon parallax — moves slower than card for depth
      const bgIcon = card.querySelector('.card-bg-icon')
      if (bgIcon) {
        gsap.to(bgIcon, {
          y: -15,
          rotate: 5,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 2 },
        })
      }

      const line = card.querySelector('.card-gold-line')
      if (line) {
        gsap.fromTo(line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1, transformOrigin: 'left center',
            duration: 0.8,
            delay: i * 0.12 + 0.3,
            ease: ANIM.ease.sharp,
            scrollTrigger: { trigger: card, start: ANIM.scroll.startLate, toggleActions: ANIM.scroll.toggleOnce },
          }
        )
      }
    })
  }, { scope: sectionRef })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardsRef.current[idx]
    if (!card || window.matchMedia('(pointer: coarse)').matches) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(card, { x: x * 0.02, y: y * 0.02, rotateX: -y * 0.008, rotateY: x * 0.008, duration: 0.4, ease: 'power2.out' })

    const glow = card.querySelector('.card-glow') as HTMLElement
    if (glow) gsap.to(glow, { opacity: 1, x: e.clientX - rect.left, y: e.clientY - rect.top, duration: 0.3 })
  }, [])

  const handleMouseLeave = useCallback((idx: number) => {
    const card = cardsRef.current[idx]
    if (!card) return
    gsap.to(card, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.6, ease: ANIM.ease.elastic })
    const glow = card.querySelector('.card-glow') as HTMLElement
    if (glow) gsap.to(glow, { opacity: 0, duration: 0.3 })
  }, [])

  return (
    <section ref={sectionRef} id="servicii" className="relative overflow-hidden bg-black-soft py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="services-heading mb-20 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Servicii</p>
          <h2 className="mx-auto mb-4 max-w-2xl font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            Soluții Complete de{' '}
            <span className="text-gold-gradient">Inspecție Tehnică</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-grey-300">
            Echipamente profesionale, metodologie riguroasă și rapoarte detaliate
            pentru fiecare tip de proprietate.
          </p>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Cards grid */}
        <div className="services-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon]
            return (
              <div
                key={service.slug}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group relative overflow-hidden rounded-2xl border border-grey-500/15 bg-gradient-to-b from-black-elevated to-black-soft/80 transition-all duration-500 hover:border-gold/25 hover:shadow-[0_8px_40px_rgba(201,168,76,0.06)]"
                style={{ perspective: '800px' }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                {/* Background watermark icon — large, low opacity, gold tint */}
                <div className="card-bg-icon pointer-events-none absolute -bottom-6 -right-6 text-gold/[0.04] transition-all duration-700 group-hover:text-gold/[0.08]">
                  <Icon className="h-52 w-52 lg:h-60 lg:w-60" strokeWidth={0.6} />
                </div>

                {/* Cursor-following glow */}
                <div className="card-glow pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl" style={{ background: 'rgba(201,168,76,0.06)' }} />

                {/* Inner content */}
                <div className="relative z-10 p-8 lg:p-10">
                  {/* Gold accent line */}
                  <div className="card-gold-line mb-8 h-[1px] w-12 bg-gradient-to-r from-gold to-gold/30" />

                  {/* Small icon */}
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl border border-gold/15 bg-gold/[0.06] transition-all duration-400 group-hover:border-gold/30 group-hover:bg-gold/10 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.08)]">
                    <Icon className="h-6 w-6 text-gold/80 transition-colors duration-400 group-hover:text-gold" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 font-[var(--font-playfair)] text-xl font-semibold leading-snug text-white lg:text-[1.35rem]">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-8 text-[0.9rem] leading-[1.8] text-grey-300/90">
                    {service.shortDesc}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 border-t border-grey-500/10 pt-6">
                    <span className="text-sm font-medium text-gold/80 transition-all duration-300 group-hover:text-gold">
                      Află mai multe
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-gold/60 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-gold" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
