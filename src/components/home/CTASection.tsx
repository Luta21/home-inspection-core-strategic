"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SITE } from '@/lib/constants'
import { IMAGES } from '@/lib/images'

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.cta-content > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.cta-content', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
      }
    )

    gsap.fromTo('.cta-form',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.cta-form', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
      }
    )

    // Parallax bg
    gsap.to('.cta-bg', {
      y: 80,
      ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="contact" className="grain-overlay relative overflow-hidden py-24 lg:py-32">
      {/* Background with parallax */}
      <div className="cta-bg absolute inset-0 -top-[20%] -bottom-[20%]">
        <Image
          src={IMAGES.ctaBg}
          alt="Contactează Core Strategic Consulting — programează inspecție tehnică imobiliară în București"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black-pure/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Info */}
          <div className="cta-content">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Contact</p>
            <h2 className="mb-6 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
              Programează o Inspecție{' '}
              <span className="text-gold-gradient">Astăzi</span>
            </h2>
            <p className="mb-10 max-w-md text-base leading-relaxed text-grey-300">
              Nu lăsa cea mai mare investiție a vieții tale la voia întâmplării.
              Contactează-ne pentru o consultație gratuită.
            </p>

            {/* Contact info */}
            <div className="space-y-5">
              <a href={`tel:${SITE.phoneFormatted}`} className="group flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                  <Phone className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <span className="block text-xs text-grey-400">Telefon</span>
                  <span className="text-base font-semibold text-white transition-colors group-hover:text-gold">{SITE.phone}</span>
                </div>
              </a>

              <a href={`mailto:${SITE.email}`} className="group flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                  <Mail className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <span className="block text-xs text-grey-400">Email</span>
                  <span className="text-base font-semibold text-white transition-colors group-hover:text-gold">{SITE.email}</span>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10">
                  <MapPin className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <span className="block text-xs text-grey-400">Zona de acoperire</span>
                  <span className="text-base font-semibold text-white">{SITE.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="cta-form">
            <form className="rounded-xl border border-grey-500/20 bg-black-elevated p-8">
              <h3 className="mb-6 font-[var(--font-playfair)] text-xl font-semibold text-white">
                Solicită o Consultanță
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-grey-200">Nume complet</label>
                  <input
                    type="text"
                    placeholder="Numele dumneavoastră"
                    className="w-full rounded-lg border border-grey-500/30 bg-black-soft px-4 py-3 text-sm text-white placeholder:text-grey-400 transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-grey-200">Telefon</label>
                  <input
                    type="tel"
                    placeholder="07XX XXX XXX"
                    className="w-full rounded-lg border border-grey-500/30 bg-black-soft px-4 py-3 text-sm text-white placeholder:text-grey-400 transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-grey-200">Tip proprietate</label>
                  <select className="w-full rounded-lg border border-grey-500/30 bg-black-soft px-4 py-3 text-sm text-grey-300 transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)] focus:outline-none">
                    <option value="">Selectează tipul</option>
                    <option value="apartament">Apartament</option>
                    <option value="casa">Casă / Vilă</option>
                    <option value="comercial">Spațiu Comercial</option>
                    <option value="altele">Altele</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-grey-200">Mesaj (opțional)</label>
                  <textarea
                    rows={3}
                    placeholder="Detalii despre proprietate..."
                    className="w-full resize-none rounded-lg border border-grey-500/30 bg-black-soft px-4 py-3 text-sm text-white placeholder:text-grey-400 transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-shimmer relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg py-4 text-sm font-bold uppercase tracking-wider text-black-rich transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,168,76,0.3)]"
                  style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C, #B8860B)' }}
                >
                  Trimite Solicitarea
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
