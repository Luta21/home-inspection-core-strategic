"use client"

import { useRef, useState, useEffect } from 'react'
import { Phone, ArrowRight, ChevronDown } from 'lucide-react'
import { SITE } from '@/lib/constants'
import type { ServicePageData } from '@/lib/services-data'

interface ServiceHeroProps {
  service: ServicePageData
}

export function ServiceHero({ service }: ServiceHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const transition = (delay: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  })

  return (
    <section
      ref={heroRef}
      className="grain-overlay relative flex min-h-[85vh] items-center overflow-hidden bg-black-pure"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black-pure via-black-rich/50 to-black-pure" />

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
          className="mx-auto mb-8 h-[2px] w-16 bg-gold"
          style={{
            transform: loaded ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        />

        {/* Label */}
        <p
          className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold"
          style={transition(0.5)}
        >
          {service.heroLabel}
        </p>

        {/* Headline */}
        <h1 className="mx-auto mb-6 max-w-3xl font-[var(--font-playfair)] text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight">
          <span className="inline-block text-white" style={transition(0.7)}>
            {service.heroHeadline}
          </span>{' '}
          <span className="inline-block text-gold-gradient" style={transition(0.9)}>
            {service.heroHeadlineGold}
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-grey-200 lg:text-lg"
          style={transition(1.1)}
        >
          {service.heroSubheadline}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={transition(1.4)}
        >
          <a
            href="#contact"
            className="btn-shimmer relative inline-flex items-center gap-2 overflow-hidden rounded-md px-8 py-4 text-sm font-bold uppercase tracking-wider text-black-rich transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)]"
            style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C, #B8860B)' }}
          >
            Programeaza Inspectia
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={`tel:${SITE.phoneFormatted}`}
            className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-8 py-4 text-sm font-medium text-gold transition-all hover:border-gold hover:bg-gold/10"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
        </div>

        {/* Trust stats */}
        <div className="mx-auto mt-16 flex max-w-lg flex-wrap items-center justify-center gap-8 border-t border-grey-500/20 pt-8 lg:gap-12">
          {[
            { value: '1000+', label: 'Proprietati' },
            { value: '15+', label: 'Ani Experienta' },
            { value: '48h', label: 'Raport Livrat' },
          ].map((stat, i) => (
            <div key={stat.label} style={transition(1.8 + i * 0.15)}>
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
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.5s ease 2.5s',
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.2em] text-grey-400">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-gold" />
        </div>
      </div>
    </section>
  )
}
