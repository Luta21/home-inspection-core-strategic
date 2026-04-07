"use client"

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { IMAGES } from '@/lib/images'

const HEADLINE_WORDS = ['Pasiunea', 'Pentru', 'Detalii', 'Care', 'Protejează']

export function DespreHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="grain-overlay relative flex min-h-[85vh] items-center overflow-hidden bg-black-pure"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.aboutTeam}
          alt="Echipa Core Strategic Consulting - inspecție tehnică imobiliară profesională"
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-black-pure/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black-pure/60 via-transparent to-black-pure" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          {/* Gold accent line */}
          <div
            className="mb-8 h-[2px] w-16 bg-gold"
            style={{
              transform: loaded ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          />

          {/* Eyebrow */}
          <p
            className="mb-5 font-[var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.25em] text-gold"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
            }}
          >
            Core Strategic Consulting
          </p>

          {/* H1 with word stagger */}
          <h1 className="mb-6 font-[var(--font-playfair)] text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[1.05] tracking-tight">
            {HEADLINE_WORDS.map((word, i) => (
              <span key={word}>
                <span
                  className="inline-block text-white"
                  style={{
                    opacity: loaded ? 1 : 0,
                    clipPath: loaded
                      ? 'inset(0 0 0 0)'
                      : 'inset(100% 0 0 0)',
                    transition: `opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + i * 0.12}s, clip-path 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + i * 0.12}s`,
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
                clipPath: loaded
                  ? 'inset(0 0 0 0)'
                  : 'inset(100% 0 0 0)',
                transition: 'opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1) 1.4s, clip-path 1.6s cubic-bezier(0.16, 1, 0.3, 1) 1.4s',
              }}
            >
              Investiția Ta.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="mb-10 max-w-xl font-[var(--font-inter)] text-lg leading-relaxed text-grey-200"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              filter: loaded ? 'blur(0px)' : 'blur(4px)',
              transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.8s, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.8s, filter 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.8s',
            }}
          >
            Cu peste 15 ani de experiență in construcții și peste 1.000 de proprietăți inspectate,
            suntem partenerul tău de încredere pentru o achiziție imobiliară sigură.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.5s ease 2.8s',
          animation: loaded ? 'despre-hero-bounce 3s ease-in-out 3.5s infinite' : 'none',
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.2em] text-grey-400">Scroll</span>
          <ChevronDown className="h-4 w-4 text-gold" />
        </div>
      </div>

      <style jsx>{`
        @keyframes despre-hero-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
      `}</style>
    </section>
  )
}
