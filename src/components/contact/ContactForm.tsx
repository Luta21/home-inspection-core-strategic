"use client"

import { useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SITE } from '@/lib/constants'

const PROPERTY_TYPES = ['Apartament', 'Casă', 'Vilă', 'Spațiu Comercial'] as const

export function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.cform-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.cform-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
      }
    )

    gsap.fromTo('.form-field',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.cascade,
        ease: ANIM.ease.smooth,
        scrollTrigger: { trigger: '.cform-fields', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
      }
    )
  }, { scope: sectionRef })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string
    const propertyType = formData.get('propertyType') as string
    const message = formData.get('message') as string

    const lines = [
      `Bună ziua, sunt ${name}.`,
      phone ? `Telefon: ${phone}` : '',
      email ? `Email: ${email}` : '',
      propertyType ? `Tip proprietate: ${propertyType}` : '',
      message ? `\nMesaj: ${message}` : '',
    ].filter(Boolean)

    const text = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/${SITE.whatsapp}?text=${text}`, '_blank')

    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const inputClasses = 'w-full rounded-lg border border-grey-500/20 bg-black-elevated px-4 py-3 text-sm text-white placeholder:text-grey-400 transition-colors focus:border-gold focus:outline-none'

  return (
    <section ref={sectionRef} className="bg-black-soft py-14 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="cform-heading mb-10 text-center sm:mb-12 lg:mb-16">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Trimite-ne un Mesaj</p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            Solicită o Ofertă <span className="text-gold-gradient">Personalizată</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="cform-fields space-y-5">
          {/* Row 1 */}
          <div className="form-field grid gap-5 opacity-0 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-grey-300">
                Nume <span className="text-gold">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Numele dumneavoastră"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-grey-300">
                Telefon <span className="text-gold">*</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                placeholder="07xx xxx xxx"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-field grid gap-5 opacity-0 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-grey-300">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="email@exemplu.ro"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="contact-property" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-grey-300">
                Tip Proprietate
              </label>
              <select
                id="contact-property"
                name="propertyType"
                className={`${inputClasses} appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'12'%20height%3D'12'%20fill%3D'%23666'%20viewBox%3D'0%200%2016%2016'%3E%3Cpath%20d%3D'M8%2011L3%206h10z'%2F%3E%3C%2Fsvg%3E")] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-8`}
              >
                <option value="">Selectează tipul</option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-field opacity-0">
            <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-grey-300">
              Mesaj
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder="Descrieți pe scurt proprietatea sau întrebarea dumneavoastră..."
              className={`${inputClasses} resize-none`}
            />
          </div>

          {/* Submit */}
          <div className="form-field opacity-0">
            {submitted ? (
              <div className="flex items-center justify-center gap-3 py-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                  <Check className="h-5 w-5 text-gold" />
                </span>
                <span className="text-sm text-grey-200">Mesaj trimis! Vă contactăm în maxim 2 ore.</span>
              </div>
            ) : (
              <button
                type="submit"
                className="btn-shimmer relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-md px-8 py-4 text-sm font-bold uppercase tracking-wider text-black-rich transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)] sm:w-auto"
                style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C, #B8860B)' }}
              >
                Trimite Mesajul
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
