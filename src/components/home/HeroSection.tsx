"use client"

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { IMAGES } from '@/lib/images'

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)

    // Hide hero once user scrolls past 1 viewport height (the spacer)
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      setHidden(scrollY > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="grain-overlay fixed inset-0 flex h-screen min-h-[700px] items-center overflow-hidden bg-black-pure"
      style={{
        zIndex: 0,
        // Kill GPU compositing when hero is off-screen
        visibility: hidden ? 'hidden' : 'visible',
        contentVisibility: hidden ? 'hidden' : 'visible',
      }}
    >
      {/* Static background image — NO parallax, just a solid hero */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="Inspecție tehnică imobiliară profesională în București — verificare apartament și casă înainte de cumpărare"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black-pure/75 via-black-pure/40 to-black-pure" />
        <div className="absolute inset-0 bg-gradient-to-r from-black-pure/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          {/* Gold accent line — slow elegant draw */}
          <div
            className="mb-8 h-[2px] w-16 bg-gold"
            style={{
              transform: loaded ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          />

          {/* H1 — Primary SEO heading */}
          <h1
            className="mb-5 font-[var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.25em] text-gold"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
            }}
          >
            Inspecție Tehnică Imobiliară — București & Ilfov
          </h1>

          {/* Visual headline — each word staggers in slowly */}
          <h2 className="mb-6 font-[var(--font-playfair)] text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[1.05] tracking-tight">
            {['Verifică', 'Înainte', 'Să'].map((word, i) => (
              <span key={word}>
                <span
                  className="inline-block text-white"
                  style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? 'translateY(0)' : 'translateY(60px)',
                    transition: `opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + i * 0.15}s, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + i * 0.15}s`,
                  }}
                >
                  {word}
                </span>{' '}
              </span>
            ))}
            <br className="hidden sm:block" />
            <span
              className="inline-block text-gold-gradient"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(60px)',
                transition: 'opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1) 1.2s, transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) 1.2s',
              }}
            >
              Investești.
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="mb-10 max-w-xl font-[var(--font-inter)] text-lg leading-relaxed text-grey-200"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.6s, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.6s',
            }}
          >
            Inspecție tehnică imobiliară profesională cu echipamente Flir de ultimă generație.
            Peste 1.000 de apartamente și case verificate în București și Ilfov.
            Raport detaliat cu fotografii și estimări de costuri livrat în 48h.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="btn-shimmer relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md px-8 py-4 text-sm font-bold uppercase tracking-wider text-black-rich transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)]"
              style={{
                background: 'linear-gradient(135deg, #E8D5A3, #C9A84C, #B8860B)',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 2s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 2s, box-shadow 0.3s ease',
              }}
            >
              Programează Inspecția
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#raport"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gold/40 px-8 py-4 text-sm font-medium uppercase tracking-wider text-gold transition-all hover:border-gold hover:bg-gold/10"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 2.2s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 2.2s, border-color 0.3s ease, background-color 0.3s ease',
              }}
            >
              Vezi Raport Exemplu
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-16 flex flex-wrap gap-8 border-t border-grey-500/30 pt-8 lg:gap-12">
            {[
              { value: '1000+', label: 'Proprietăți Inspectate' },
              { value: '15+', label: 'Ani Experiență Construcții' },
              { value: '48h', label: 'Livrare Raport' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(15px)',
                  transition: `opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${2.6 + i * 0.15}s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${2.6 + i * 0.15}s`,
                }}
              >
                <span className="block font-[var(--font-jetbrains)] text-2xl font-bold text-gold lg:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.15em] text-grey-300">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.5s ease 3.2s',
          animation: loaded ? 'hero-bounce 3s ease-in-out 4s infinite' : 'none',
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.2em] text-grey-400">Scroll</span>
          <ChevronDown className="h-4 w-4 text-gold" />
        </div>
      </div>

      <style jsx>{`
        @keyframes hero-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
      `}</style>
    </section>
  )
}
