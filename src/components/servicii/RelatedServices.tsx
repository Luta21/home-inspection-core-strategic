"use client"

import { useRef, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'
import { getIcon } from '@/lib/icons'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SERVICE_PAGES } from '@/lib/services-data'

interface RelatedServicesProps {
  currentSlug: string
}

export function RelatedServices({ currentSlug }: RelatedServicesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([])

  const allServices = Object.values(SERVICE_PAGES)
  const related = allServices.filter((s) => s.slug !== currentSlug).slice(0, 3)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.related-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.related-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    const cards = cardsRef.current.filter(Boolean)
    cards.forEach((card, i) => {
      if (!card) return

      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: ANIM.duration.normal,
          delay: i * 0.12,
          ease: ANIM.ease.luxe,
          scrollTrigger: { trigger: '.related-grid', start: 'top 90%', toggleActions: ANIM.scroll.toggleOnce },
        }
      )
    })
  }, { scope: sectionRef })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>, idx: number) => {
    const card = cardsRef.current[idx]
    if (!card || window.matchMedia('(pointer: coarse)').matches) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(card, { x: x * 0.02, y: y * 0.02, rotateX: -y * 0.008, rotateY: x * 0.008, duration: 0.4, ease: 'power2.out' })
  }, [])

  const handleMouseLeave = useCallback((idx: number) => {
    const card = cardsRef.current[idx]
    if (!card) return
    gsap.to(card, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.6, ease: ANIM.ease.elastic })
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-14 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="related-heading mb-10 text-center sm:mb-12 lg:mb-16">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Servicii Complementare
          </p>
          <h2 className="mx-auto mb-4 max-w-2xl font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Completeaza <span className="text-gold-gradient">Inspectia</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Cards */}
        <div className="related-grid grid gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {related.map((service, i) => {
            const Icon = getIcon(service.icon)
            return (
              <a
                key={service.slug}
                href={`/servicii/${service.slug}`}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group relative overflow-hidden rounded-2xl border border-grey-500/15 bg-gradient-to-b from-black-elevated to-black-soft/80 transition-all duration-500 hover:border-gold/25 hover:shadow-[0_8px_40px_rgba(201,168,76,0.06)]"
                style={{ perspective: '800px' }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                <div className="relative z-10 p-8">
                  {/* Gold accent line */}
                  <div className="mb-8 h-[1px] w-12 bg-gradient-to-r from-gold to-gold/30" />

                  {/* Icon */}
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-gold/15 bg-gold/[0.06] transition-all duration-400 group-hover:border-gold/30 group-hover:bg-gold/10">
                    <Icon className="h-5 w-5 text-gold/80 transition-colors duration-400 group-hover:text-gold" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 font-[var(--font-playfair)] text-lg font-semibold text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-grey-300">
                    {service.heroSubheadline.slice(0, 120)}...
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 border-t border-grey-500/10 pt-5">
                    <span className="text-sm font-medium text-gold/80 transition-all duration-300 group-hover:text-gold">
                      Afla mai multe
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-gold/60 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-gold" />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
