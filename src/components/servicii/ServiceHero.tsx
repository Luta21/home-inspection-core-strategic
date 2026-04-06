"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { Phone, ArrowRight, ChevronDown } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SITE } from '@/lib/constants'
import { IMAGES } from '@/lib/images'
import type { ServicePageData } from '@/lib/services-data'

interface ServiceHeroProps {
  service: ServicePageData
}

export function ServiceHero({ service }: ServiceHeroProps) {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const ctx = heroRef.current
    if (!ctx) return

    const glow = ctx.querySelector('.hero-glow')
    const goldLine = ctx.querySelector('.hero-gold-line')
    const label = ctx.querySelector('.hero-label')
    const headline = ctx.querySelector('.hero-headline')
    const headlineGold = ctx.querySelector('.hero-headline-gold')
    const subheadline = ctx.querySelector('.hero-subheadline')
    const ctaButtons = ctx.querySelectorAll('.hero-cta')
    const trustStats = ctx.querySelector('.hero-trust-stats')
    const scrollIndicator = ctx.querySelector('.hero-scroll-indicator')

    if (prefersReducedMotion) {
      gsap.set([glow, goldLine, label, headline, headlineGold, subheadline, trustStats, scrollIndicator], {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        clipPath: 'inset(0% 0 0 0)',
        scale: 1,
        scaleX: 1,
      })
      gsap.set(glow, { scale: 1.5 })
      gsap.set(ctaButtons, { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: ANIM.ease.luxe } })

    // 1. Background glow (0s)
    tl.to(glow, {
      scale: 1.5,
      opacity: 1,
      duration: 2,
      ease: 'power1.out',
    }, 0)

    // 2. Gold accent line (0s)
    tl.to(goldLine, {
      scaleX: 1,
      duration: 0.8,
      ease: ANIM.ease.sharp,
    }, 0)

    // 3. Label (0.4s)
    tl.to(label, {
      y: 0,
      opacity: 1,
      duration: ANIM.duration.fast,
      ease: ANIM.ease.luxe,
    }, 0.4)

    // 4. Main headline clipPath reveal (0.6s)
    tl.to(headline, {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      duration: 1.2,
      ease: 'expo.out',
    }, 0.6)

    // 5. Gold headline clipPath reveal (0.8s)
    tl.to(headlineGold, {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      duration: 1.2,
      ease: 'expo.out',
    }, 0.8)

    // 6. Subheadline with blur (1.2s)
    tl.to(subheadline, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: ANIM.ease.luxe,
    }, 1.2)

    // 7. CTA buttons staggered (1.6s)
    tl.to(ctaButtons, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: ANIM.ease.luxe,
    }, 1.6)

    // 8. Trust stats (2.0s)
    tl.to(trustStats, {
      y: 0,
      opacity: 1,
      duration: ANIM.duration.fast,
      ease: ANIM.ease.luxe,
    }, 2.0)

    // Scroll indicator (2.5s)
    tl.to(scrollIndicator, {
      opacity: 1,
      duration: 1,
      ease: 'power1.out',
    }, 2.5)
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      className="grain-overlay relative flex min-h-[85vh] items-center overflow-hidden bg-black-pure"
    >
      {/* Background image */}
      <Image
        src={IMAGES.services[service.slug]?.hero || IMAGES.hero}
        alt={service.title}
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover opacity-[0.15]"
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black-pure via-black-rich/50 to-black-pure" />

      {/* Background glow */}
      <div className="hero-glow pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-gold/[0.03] opacity-0" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-32 text-center lg:px-8 lg:py-40">
        {/* Gold accent line */}
        <div
          className="hero-gold-line mx-auto mb-8 h-[2px] w-16 origin-center scale-x-0 bg-gold"
        />

        {/* Label */}
        <p
          className="hero-label mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold opacity-0"
          style={{ transform: 'translateY(-20px)' }}
        >
          {service.heroLabel}
        </p>

        {/* Headline */}
        <h1 className="mx-auto mb-6 max-w-3xl font-[var(--font-playfair)] text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight">
          <span
            className="hero-headline inline-block text-white opacity-0"
            style={{ clipPath: 'inset(100% 0 0 0)' }}
          >
            {service.heroHeadline}
          </span>{' '}
          <span
            className="hero-headline-gold inline-block text-gold-gradient opacity-0"
            style={{ clipPath: 'inset(100% 0 0 0)' }}
          >
            {service.heroHeadlineGold}
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="hero-subheadline mx-auto mb-10 max-w-2xl text-base leading-relaxed text-grey-200 opacity-0 lg:text-lg"
          style={{ transform: 'translateY(20px)', filter: 'blur(8px)' }}
        >
          {service.heroSubheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="hero-cta btn-shimmer relative inline-flex items-center gap-2 overflow-hidden rounded-md px-8 py-4 text-sm font-bold uppercase tracking-wider text-black-rich opacity-0 shadow-lg shadow-black/30 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)]"
            style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C, #B8860B)', transform: 'translateY(20px)' }}
          >
            Programeaza Inspectia
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={`tel:${SITE.phoneFormatted}`}
            className="hero-cta inline-flex items-center gap-2 rounded-md border border-gold/40 px-8 py-4 text-sm font-medium text-gold opacity-0 shadow-lg shadow-black/30 transition-all hover:border-gold hover:bg-gold/10"
            style={{ transform: 'translateY(20px)' }}
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
        </div>

        {/* Trust stats */}
        <div
          className="hero-trust-stats mx-auto mt-16 flex max-w-lg flex-wrap items-center justify-center gap-8 border-t border-grey-500/20 pt-8 opacity-0 lg:gap-12"
          style={{ transform: 'translateY(20px)' }}
        >
          {[
            { value: '1000+', label: 'Proprietati' },
            { value: '15+', label: 'Ani Experienta' },
            { value: '48h', label: 'Raport Livrat' },
          ].map((stat) => (
            <div key={stat.label}>
              <span className="block font-[var(--font-jetbrains)] text-2xl font-bold text-gold">
                {stat.value}
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.15em] text-grey-300">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.2em] text-grey-400">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-gold" />
        </div>
      </div>
    </section>
  )
}
