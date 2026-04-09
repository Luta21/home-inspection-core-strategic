"use client"

import { useRef } from 'react'
import { Check, ArrowRight, Star, Crown, Gem, Shield } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { PACKAGES } from '@/lib/constants'

const PACKAGE_ICONS = [Shield, Crown, Gem]

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Show everything immediately
      cardsRef.current.forEach((card) => {
        if (card) gsap.set(card, { opacity: 1, x: 0, scale: 1 })
      })
      return
    }

    gsap.fromTo('.pricing-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.pricing-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    const cards = cardsRef.current
    const leftCard = cards[0]
    const centerCard = cards[1]
    const rightCard = cards[2]

    // Center card: fade in + subtle scale
    if (centerCard) {
      gsap.fromTo(centerCard,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1,
          duration: ANIM.duration.normal,
          ease: ANIM.ease.luxe,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: ANIM.scroll.toggleOnce,
          },
        }
      )
    }

    // Left card: slide in from the left
    if (leftCard) {
      gsap.fromTo(leftCard,
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0,
          duration: ANIM.duration.normal,
          ease: ANIM.ease.luxe,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: ANIM.scroll.toggleOnce,
          },
        }
      )
    }

    // Right card: slide in from the right
    if (rightCard) {
      gsap.fromTo(rightCard,
        { opacity: 0, x: 80 },
        {
          opacity: 1, x: 0,
          duration: ANIM.duration.normal,
          ease: ANIM.ease.luxe,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: ANIM.scroll.toggleOnce,
          },
        }
      )
    }

    // Subtle parallax on scroll after reveal
    cards.forEach((card, i) => {
      if (!card) return
      gsap.to(card, {
        y: i === 1 ? -25 : -10,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      })
    })
  }, { scope: sectionRef })

  // Hover tilt for cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardsRef.current[idx]
    if (!card || window.matchMedia('(pointer: coarse)').matches) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(card, { rotateX: -y * 0.008, rotateY: x * 0.008, duration: 0.4, ease: 'power2.out' })
  }

  const handleMouseLeave = (idx: number) => {
    const card = cardsRef.current[idx]
    if (!card) return
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <section ref={sectionRef} id="preturi" className="relative overflow-hidden bg-black-elevated py-14 sm:py-16 md:py-20 lg:py-28">
      {/* Subtle radial glow behind center card */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 h-[600px] w-[600px] rounded-full bg-gold/[0.02] blur-[100px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pricing-heading mb-10 text-center sm:mb-12 lg:mb-16">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Prețuri Transparente</p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            Alege Pachetul <span className="text-gold-gradient">Potrivit</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-grey-300">
            Prețuri clare, fără surprize. Fiecare pachet include raport detaliat cu fotografii
            și recomandări de remediere.
          </p>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Pricing cards */}
        <div className="grid gap-4 sm:gap-5 md:gap-6 lg:grid-cols-3 lg:items-center lg:gap-8">
          {PACKAGES.map((pkg, i) => {
            const Icon = PACKAGE_ICONS[i]
            return (
              <div
                key={pkg.name}
                ref={(el) => { cardsRef.current[i] = el }}
                className={`group relative overflow-hidden rounded-2xl opacity-0 transition-shadow duration-700 ${
                  pkg.highlighted
                    ? 'border border-gold/20 lg:scale-[1.03]'
                    : 'border border-transparent'
                }`}
                style={{ perspective: '800px' }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                {/* Background — no border feel, just subtle gradient */}
                <div className={`absolute inset-0 ${
                  pkg.highlighted
                    ? 'bg-gradient-to-b from-gold/[0.04] via-black-rich to-black-rich'
                    : 'bg-black-rich'
                }`} />

                {/* Background icon watermark */}
                <div className="pointer-events-none absolute -bottom-8 -right-8 text-gold/[0.03] transition-all duration-700 group-hover:text-gold/[0.06]">
                  <Icon className="h-48 w-48" strokeWidth={0.4} />
                </div>

                {/* Hover glow from top */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{
                  background: pkg.highlighted
                    ? 'radial-gradient(circle at 50% -20%, rgba(201,168,76,0.1) 0%, transparent 60%)'
                    : 'radial-gradient(circle at 50% -20%, rgba(201,168,76,0.05) 0%, transparent 60%)',
                }} />

                {/* Recommended badge */}
                {pkg.highlighted && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 rounded-b-lg px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-black-rich" style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C)' }}>
                      <Star className="h-3 w-3" fill="currentColor" />
                      Recomandat
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className={`relative z-10 ${pkg.highlighted ? 'px-6 pb-8 pt-12 md:px-7 md:pt-14 lg:px-8 lg:pb-10' : 'p-6 md:p-7 lg:p-8'}`}>
                  {/* Icon + Name */}
                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        pkg.highlighted ? 'border border-gold/30 bg-gold/10' : 'border border-grey-500/20 bg-grey-500/5'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${pkg.highlighted ? 'text-gold' : 'text-grey-300'}`} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-[var(--font-playfair)] text-xl font-bold text-white">{pkg.name}</h3>
                      <p className="text-xs text-grey-400">{pkg.description}</p>
                    </div>
                  </div>

                  {/* Price — big, bold, no background */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-grey-400">de la</span>
                      <span className={`font-[var(--font-playfair)] text-7xl font-bold leading-none tracking-tight lg:text-8xl ${pkg.highlighted ? 'text-gold' : 'text-white'}`}>
                        {pkg.price}
                      </span>
                      <span className="self-end pb-2 text-lg text-grey-400">{pkg.currency}</span>
                    </div>
                    {/* Gold line under price */}
                    <div
                      className="mt-4 h-[1px]"
                      style={{
                        background: pkg.highlighted
                          ? 'linear-gradient(90deg, #C9A84C, transparent)'
                          : 'linear-gradient(90deg, rgba(68,68,68,0.5), transparent)',
                      }}
                    />
                  </div>

                  {/* Features */}
                  <ul className="mb-8 space-y-4 md:mb-10">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3"
                      >
                        <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          pkg.highlighted ? 'bg-gold/15' : 'bg-grey-500/10'
                        }`}>
                          <Check className={`h-3 w-3 ${pkg.highlighted ? 'text-gold' : 'text-grey-400'}`} strokeWidth={2.5} />
                        </div>
                        <span className="text-sm leading-relaxed text-grey-200">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className={`group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                      pkg.highlighted
                        ? 'btn-shimmer text-black-rich hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.25)]'
                        : 'border border-gold/25 text-gold hover:border-gold/50 hover:bg-gold/[0.06]'
                    }`}
                    style={pkg.highlighted ? { background: 'linear-gradient(135deg, #E8D5A3 0%, #C9A84C 50%, #B8860B 100%)' } : undefined}
                  >
                    Solicită Oferta
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-8 text-center text-sm text-grey-400 md:mt-10">
          Prețuri valabile pentru București și Ilfov. Pentru proprietăți &gt;350mp, solicită ofertă personalizată.
        </p>
      </div>
    </section>
  )
}
