// src/components/servicii/MethodologyStepper.tsx
"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { IMAGES } from '@/lib/images'
import type { ServicePageData } from '@/lib/services-data'

interface MethodologyStepperProps {
  service: ServicePageData
}

export function MethodologyStepper({ service }: MethodologyStepperProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  const steps = service.methodology

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Show all steps immediately
      stepsRef.current.forEach((el) => el && gsap.set(el, { opacity: 1 }))
      contentRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1 }))
      if (lineRef.current) gsap.set(lineRef.current, { scaleX: 1 })
      return
    }

    // Heading animation
    gsap.fromTo('.methodology-heading > *',
      { y: 50, opacity: 0, filter: 'blur(6px)' },
      {
        y: 0, opacity: 1, filter: 'blur(0px)',
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.methodology-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    // Methodology image reveal
    gsap.fromTo('.methodology-image',
      { y: 60, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: ANIM.duration.luxe,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.methodology-image', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    // Progressive gold line fill
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1.5,
          },
        }
      )
    }

    // Step circles activate sequentially
    const totalSteps = steps.length
    stepsRef.current.forEach((el, i) => {
      if (!el) return
      const progress = i / (totalSteps - 1)

      gsap.fromTo(el,
        { scale: 0.5, opacity: 0.3 },
        {
          scale: 1, opacity: 1,
          duration: 0.4,
          ease: ANIM.ease.elastic,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top ${70 - progress * 30}%`,
            toggleActions: ANIM.scroll.toggleOnce,
          },
        }
      )
    })

    // Content panels crossfade
    contentRefs.current.forEach((el, i) => {
      if (!el) return
      const progress = i / (totalSteps - 1)

      gsap.fromTo(el,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: ANIM.duration.normal,
          ease: ANIM.ease.luxe,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top ${70 - progress * 30}%`,
            toggleActions: ANIM.scroll.toggleOnce,
          },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="methodology-heading mb-16 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Metodologie
          </p>
          <h2 className="mx-auto mb-4 max-w-2xl font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Cum Decurge <span className="text-gold-gradient">Procesul</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Methodology image */}
        <div className="methodology-image relative mb-16 h-56 overflow-hidden rounded-2xl shadow-xl shadow-black/40 lg:h-72">
          <Image
            src={IMAGES.services[service.slug]?.methodology || IMAGES.hero}
            alt={`Metodologie ${service.title}`}
            fill
            quality={80}
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-rich via-transparent to-black-rich/30" />
        </div>

        {/* Desktop: Horizontal stepper */}
        <div className="hidden lg:block">
          {/* Step indicators — same grid as content so circles sit centered above cards */}
          <div className="relative mb-12 grid gap-6" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {/* Background line — spans from first circle center to last circle center */}
            <div
              className="pointer-events-none absolute top-1/2 h-[1px] -translate-y-1/2 bg-grey-500/20"
              style={{
                left: `calc(${100 / steps.length / 2}% + 0px)`,
                right: `calc(${100 / steps.length / 2}% + 0px)`,
              }}
            />
            {/* Gold fill line */}
            <div
              ref={lineRef}
              className="pointer-events-none absolute top-1/2 h-[1px] -translate-y-1/2 bg-gold"
              style={{
                left: `calc(${100 / steps.length / 2}% + 0px)`,
                right: `calc(${100 / steps.length / 2}% + 0px)`,
                transformOrigin: 'left center',
                transform: 'scaleX(0)',
              }}
            />

            {steps.map((step, i) => (
              <div key={i} className="flex justify-center">
                <div
                  ref={(el) => { stepsRef.current[i] = el }}
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/30 bg-black-rich transition-colors"
                  style={{ opacity: 0.3 }}
                >
                  <span className="font-[var(--font-jetbrains)] text-sm font-bold text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Step content panels */}
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { contentRefs.current[i] = el }}
                className="rounded-xl bg-black-elevated p-6 text-center shadow-md shadow-black/25 transition-shadow hover:shadow-lg hover:shadow-black/35"
                style={{ opacity: 0 }}
              >
                <h3 className="mb-2 text-base font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-grey-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden">
          <div className="relative pl-10">
            {/* Vertical line */}
            <div className="absolute bottom-0 left-[18px] top-0 w-[1px] bg-gradient-to-b from-gold via-gold/50 to-gold/10" />

            {steps.map((step, i) => (
              <div key={i} className="relative mb-8 last:mb-0">
                {/* Circle */}
                <div className="absolute -left-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold/40 bg-black-rich">
                  <span className="font-[var(--font-jetbrains)] text-xs font-bold text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mb-1 text-base font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-grey-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
