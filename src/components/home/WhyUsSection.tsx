"use client"

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Building2, Calendar, Clock, ThumbsUp } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { STATS } from '@/lib/constants'
import { IMAGES } from '@/lib/images'

const STAT_ICONS = [Building2, Calendar, Clock, ThumbsUp]

export function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i]
        if (el) el.textContent = String(stat.value)
      })
      return
    }

    gsap.fromTo('.whyus-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: ANIM.duration.slow, stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.whyus-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    // Animated counters
    STATS.forEach((stat, i) => {
      const el = counterRefs.current[i]
      if (!el) return
      const obj = { value: 0 }
      gsap.to(obj, {
        value: stat.value, duration: 2.5, ease: 'power2.out',
        delay: i * 0.3,
        scrollTrigger: { trigger: '.stat-cards', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
        onUpdate: () => { el.textContent = Math.round(obj.value).toLocaleString('ro-RO') },
      })
    })

    // Parallax bg
    gsap.to('.whyus-bg', {
      y: 80, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    })

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="grain-overlay relative overflow-hidden py-14 sm:py-16 md:py-20 lg:py-28">
      <div className="whyus-bg absolute inset-0 -top-[20%] -bottom-[20%]">
        <Image
          src={IMAGES.equipmentBg}
          alt="Echipamente profesionale de inspecție tehnică imobiliară — cameră termografică Flir E60"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black-pure/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="whyus-heading mb-10 text-center sm:mb-12 lg:mb-16">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">De Ce Core Strategic</p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            Experiență Dovedită în Inspecție{' '}
            <span className="text-gold-gradient">Imobiliară</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-grey-300">
            Cifrele care demonstrează de ce peste 1.000 de clienți din București și Ilfov
            ne-au ales pentru verificarea proprietăților lor.
          </p>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Redesigned stat cards */}
        <div className="stat-cards grid gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {STATS.map((stat, i) => {
            const Icon = STAT_ICONS[i]
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-gold/[0.08] bg-black-elevated/40 backdrop-blur-md"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                  transition: `opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.25}s, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.25}s`,
                }}
              >
                {/* Background icon watermark */}
                <div className="pointer-events-none absolute -bottom-4 -right-4 text-gold/[0.03] transition-all duration-700 group-hover:text-gold/[0.07]">
                  <Icon className="h-36 w-36" strokeWidth={0.5} />
                </div>

                {/* Gold top accent — draws in */}
                <div
                  className="absolute left-0 right-0 top-0 h-[1px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, #C9A84C 50%, transparent 100%)',
                    transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                    transition: `transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.25 + 0.5}s`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 px-6 py-8 text-center md:px-7 md:py-10 lg:px-8 lg:py-12">
                  {/* Small icon */}
                  <div
                    className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-gold/15 bg-gold/[0.05]"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'scale(1)' : 'scale(0.5)',
                      transition: `opacity 1s ease ${i * 0.25 + 0.4}s, transform 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.25 + 0.4}s`,
                    }}
                  >
                    <Icon className="h-5 w-5 text-gold/70" strokeWidth={1.5} />
                  </div>

                  {/* Number */}
                  <div className="mb-3 flex items-baseline justify-center gap-1">
                    <span
                      ref={(el) => { counterRefs.current[i] = el }}
                      className="font-[var(--font-playfair)] text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-none text-gold"
                    >
                      0
                    </span>
                    <span className="font-[var(--font-playfair)] text-xl text-gold/60">{stat.suffix}</span>
                  </div>

                  {/* Thin divider */}
                  <div
                    className="mx-auto mb-4 h-[1px] w-8"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
                      opacity: isVisible ? 0.4 : 0,
                      transition: `opacity 1.2s ease ${i * 0.25 + 0.8}s`,
                    }}
                  />

                  {/* Label */}
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-grey-300/80">{stat.label}</p>
                </div>

                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)',
                }} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
