"use client"

import { useRef, useState, useEffect } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { PROCESS_STEPS } from '@/lib/constants'

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Use IntersectionObserver to trigger the draw animation — reliable, no GSAP dependency
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
    if (prefersReducedMotion) return

    gsap.from('.process-heading > *', {
      y: 50, opacity: 0,
      duration: ANIM.duration.slow,
      stagger: ANIM.stagger.normal,
      ease: ANIM.ease.luxe,
      scrollTrigger: { trigger: '.process-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="proces" className="relative overflow-hidden bg-black-rich py-24 lg:py-36">
      {/* Blueprint grid bg */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="process-heading mb-20 text-center lg:mb-28">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Procesul Nostru</p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            Simplu. Profesional. <span className="text-gold-gradient">Transparent.</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Intersecting circles */}
        <div>
          {/* Mobile: vertical */}
          <div className="flex flex-col items-center gap-4 lg:hidden">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.number} className="relative h-[220px] w-[220px]">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 220" fill="none">
                  <circle
                    cx="110" cy="110" r="100"
                    stroke="#C9A84C"
                    strokeWidth="1"
                    strokeOpacity="0.5"
                    fill="none"
                    className={isVisible ? 'process-circle-draw' : ''}
                    style={{
                      strokeDasharray: 628,
                      strokeDashoffset: isVisible ? 0 : 628,
                      transition: `stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.5}s`,
                    }}
                  />
                  <circle
                    cx="110" cy="110" r="85"
                    stroke="#C9A84C"
                    strokeWidth="0.5"
                    strokeOpacity="0.15"
                    fill="none"
                    style={{
                      strokeDasharray: 534,
                      strokeDashoffset: isVisible ? 0 : 534,
                      transition: `stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.5 + 0.4}s`,
                    }}
                  />
                </svg>
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.85)',
                    transition: `opacity 0.8s ease ${i * 0.5 + 0.6}s, transform 0.8s ease ${i * 0.5 + 0.6}s`,
                  }}
                >
                  <span className="mb-1 font-[var(--font-jetbrains)] text-[10px] tracking-[0.2em] text-gold/50">
                    {step.number}
                  </span>
                  <h3 className="mb-2 font-[var(--font-playfair)] text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-grey-300/80">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: horizontal intersecting */}
          <div className="hidden justify-center lg:flex">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.number}
                className="relative h-[280px] w-[280px]"
                style={{
                  marginLeft: i === 0 ? 0 : '-50px',
                  zIndex: i + 1,
                }}
              >
                {/* Outer circle — CSS-driven draw animation */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 280 280" fill="none">
                  <circle
                    cx="140" cy="140" r="130"
                    stroke="url(#processGold)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      strokeDasharray: 817,
                      strokeDashoffset: isVisible ? 0 : 817,
                      transition: `stroke-dashoffset 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.5}s`,
                    }}
                  />
                  {/* Inner ring */}
                  <circle
                    cx="140" cy="140" r="112"
                    stroke="url(#processGoldSoft)"
                    strokeWidth="0.6"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      strokeDasharray: 703,
                      strokeDashoffset: isVisible ? 0 : 703,
                      transition: `stroke-dashoffset 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.5 + 0.5}s`,
                    }}
                  />
                  <defs>
                    <linearGradient id="processGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E8D5A3" stopOpacity="0.7" />
                      <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#B8860B" stopOpacity="0.7" />
                    </linearGradient>
                    <linearGradient id="processGoldSoft" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#E8D5A3" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Text content — fades in after circle starts drawing */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.85)',
                    transition: `opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.5 + 0.7}s, transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.5 + 0.7}s`,
                  }}
                >
                  <span className="mb-1.5 font-[var(--font-jetbrains)] text-[10px] tracking-[0.25em] text-gold/40">
                    {step.number}
                  </span>
                  <h3 className="mb-2.5 font-[var(--font-playfair)] text-[1.3rem] font-semibold leading-tight text-white">
                    {step.title}
                  </h3>
                  <p className="text-[0.75rem] leading-[1.7] text-grey-300/70">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
