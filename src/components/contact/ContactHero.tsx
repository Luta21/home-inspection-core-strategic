"use client"

import { useRef } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SITE } from '@/lib/constants'

export function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const tl = gsap.timeline({
      defaults: { ease: ANIM.ease.luxe },
    })

    tl.fromTo('.chero-gold-line',
      { scaleX: 0 },
      { scaleX: 1, duration: ANIM.duration.luxe, transformOrigin: 'left' }
    )
    tl.fromTo('.contact-reveal',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
      },
      '-=1'
    )

    // Phone icon pulse
    gsap.to('.chero-phone-pulse', {
      scale: 1.15,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="grain-overlay relative flex min-h-[60vh] items-center overflow-hidden bg-black-pure py-24 lg:py-32"
    >
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.02) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center lg:px-8">
        {/* Gold line */}
        <div className="chero-gold-line mx-auto mb-8 h-[2px] w-16 origin-left scale-x-0 bg-gold" />

        {/* Eyebrow */}
        <p className="contact-reveal mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold opacity-0">
          Contact
        </p>

        {/* H1 */}
        <h1 className="contact-reveal mb-10 font-[var(--font-playfair)] text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.1] text-white opacity-0">
          Contactează-ne Pentru o{' '}
          <span className="text-gold-gradient">Inspecție Tehnică Imobiliară</span>
        </h1>

        {/* Primary phone */}
        <a
          href={`tel:${SITE.phoneFormatted}`}
          className="contact-reveal mb-6 inline-flex items-center gap-3 opacity-0 transition-opacity hover:opacity-80"
        >
          <span className="chero-phone-pulse inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
            <Phone className="h-5 w-5 text-gold" />
          </span>
          <span className="text-gold-gradient font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.5rem)] font-bold">
            {SITE.phone}
          </span>
        </a>

        {/* WhatsApp button */}
        <div className="contact-reveal mb-8 opacity-0">
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle className="h-4 w-4" />
            Scrie pe WhatsApp
          </a>
        </div>

        {/* Secondary contacts */}
        <div className="contact-reveal flex flex-col items-center gap-2 text-sm text-grey-200 opacity-0">
          <a href={`tel:${SITE.phoneSecondaryFormatted}`} className="transition-colors hover:text-white">
            {SITE.phoneSecondaryName}: {SITE.phoneSecondary}
          </a>
          <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-gold">
            {SITE.email}
          </a>
        </div>
      </div>
    </section>
  )
}
