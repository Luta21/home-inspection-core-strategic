"use client"

import { useRef, useState, useEffect } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { STATS } from '@/lib/constants'

export function DespreStats() {
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

    // Animated counters
    STATS.forEach((stat, i) => {
      const el = counterRefs.current[i]
      if (!el) return
      const obj = { value: 0 }
      gsap.to(obj, {
        value: stat.value,
        duration: ANIM.duration.dramatic,
        ease: 'power2.out',
        delay: i * 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: ANIM.scroll.start,
          toggleActions: ANIM.scroll.toggleOnce,
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.value).toLocaleString('ro-RO')
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-pure py-14 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${
                i < STATS.length - 1 ? 'lg:border-r lg:border-gold/10' : ''
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.2}s, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.2}s`,
              }}
            >
              {/* Counter */}
              <div className="mb-2 flex items-baseline justify-center gap-1">
                <span
                  ref={(el) => { counterRefs.current[i] = el }}
                  className="font-[var(--font-playfair)] text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none text-gold-gradient"
                >
                  0
                </span>
                <span className="font-[var(--font-playfair)] text-xl text-gold/70">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-grey-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
