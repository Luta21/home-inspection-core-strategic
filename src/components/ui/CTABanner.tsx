"use client"

import { useState, useEffect, useRef } from 'react'
import { Phone, ArrowRight, Sparkles } from 'lucide-react'
import { SITE } from '@/lib/constants'

interface CTABannerProps {
  variant?: 'gold' | 'dark'
  headline: string
  subtext?: string
}

export function CTABanner({ variant = 'gold', headline, subtext }: CTABannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = bannerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (variant === 'gold') {
    return (
      <div ref={bannerRef} className="relative overflow-hidden bg-black-soft">
        {/* Animated gold gradient line at top */}
        <div
          className="absolute left-0 right-0 top-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #C9A84C 50%, transparent 100%)',
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        {/* Bottom line mirrors */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #C9A84C 50%, transparent 100%)',
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
          }}
        />

        {/* Blueprint grid subtle bg */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Floating sparkle accents */}
        <div
          className="pointer-events-none absolute left-[15%] top-1/2 -translate-y-1/2 text-gold/10"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1s ease 0.6s',
            animation: isVisible ? 'float-sparkle 4s ease-in-out infinite' : 'none',
          }}
        >
          <Sparkles className="h-5 w-5" />
        </div>
        <div
          className="pointer-events-none absolute right-[18%] top-1/2 -translate-y-1/2 text-gold/10"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1s ease 0.8s',
            animation: isVisible ? 'float-sparkle 4s ease-in-out 1s infinite' : 'none',
          }}
        >
          <Sparkles className="h-4 w-4" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-12 md:flex-row lg:px-8">
          <div
            className="text-center md:text-left"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            <h3 className="font-[var(--font-playfair)] text-xl font-bold text-white lg:text-2xl">{headline}</h3>
            {subtext && <p className="mt-1.5 text-sm text-grey-300">{subtext}</p>}
          </div>
          <div
            className="flex flex-col items-center gap-3 sm:flex-row"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
            }}
          >
            <a
              href={`tel:${SITE.phoneFormatted}`}
              className="flex items-center gap-2 rounded-md border border-gold/30 px-5 py-3 text-sm font-medium text-gold transition-all hover:border-gold/60 hover:bg-gold/[0.06]"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
            <a
              href="#contact"
              className="btn-shimmer relative flex items-center gap-2 overflow-hidden rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wider text-black-rich transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,168,76,0.25)]"
              style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C, #B8860B)' }}
            >
              Programează Acum
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <style jsx>{`
          @keyframes float-sparkle {
            0%, 100% { transform: translateY(-50%) translateX(0) rotate(0deg); }
            50% { transform: translateY(calc(-50% - 8px)) translateX(4px) rotate(10deg); }
          }
        `}</style>
      </div>
    )
  }

  // Dark variant
  return (
    <div ref={bannerRef} className="border-y border-gold/[0.06] bg-black-pure">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-10 md:flex-row lg:px-8">
        <p
          className="text-center text-sm text-grey-200 md:text-left"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <span className="font-semibold text-gold">{headline}</span>{' '}
          {subtext && <span className="text-grey-400">{subtext}</span>}
        </p>
        <a
          href="#contact"
          className="flex shrink-0 items-center gap-2 text-sm font-medium text-gold transition-all hover:gap-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(15px)',
            transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, gap 0.3s ease',
          }}
        >
          Solicită Consultanță Gratuită <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
