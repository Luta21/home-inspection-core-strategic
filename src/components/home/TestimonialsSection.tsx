"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { IMAGES } from '@/lib/images'

const TESTIMONIALS = [
  {
    name: 'Alexandru M.',
    role: 'Cumpărător apartament, Sector 3 București',
    text: 'Am descoperit infiltrații la acoperiș pe care nu le-am fi observat niciodată cu ochiul liber. Scanarea termografică a arătat clar unde erau problemele. Raportul detaliat ne-a ajutat să negociem €8.000 din prețul apartamentului. Cea mai bună investiție de 500 EUR pe care am făcut-o.',
    rating: 5,
    image: IMAGES.testimonial1,
    saved: '€8.000',
  },
  {
    name: 'Maria D.',
    role: 'Proprietar vilă, Voluntari, Ilfov',
    text: 'Profesionalism impecabil de la programare până la livrarea raportului. Au identificat probleme cu hidroizolația la fundație care ar fi costat €15.000+ pe termen lung. Echipamentele Flir fac diferența — am văzut literal căldura care se pierdea prin pereți și ferestre.',
    rating: 5,
    image: IMAGES.testimonial2,
    saved: '€15.000+',
  },
  {
    name: 'Radu C.',
    role: 'Investitor imobiliar, București',
    text: 'Colaborez cu Core Strategic pentru fiecare achiziție din portofoliul meu. Rapoartele lor de 30+ pagini cu estimări detaliate de costuri mă ajută să iau decizii informate. Au identificat probleme structurale la un apartament pe care eram gata să-l cumpăr — m-au salvat de o investiție proastă.',
    rating: 5,
    image: IMAGES.testimonial3,
    saved: '30+ pagini',
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set('.testimonial-card', { opacity: 1 })
      return
    }

    // Heading reveal
    gsap.fromTo('.testimonials-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: ANIM.duration.slow, stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.testimonials-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    // Cards stagger in with rotation and scale for a dramatic entrance
    cardsRef.current.forEach((card, i) => {
      if (!card) return

      // Each card slides up and rotates slightly from alternating sides
      const rotation = i === 0 ? -3 : i === 2 ? 3 : 0
      const xOffset = i === 0 ? -40 : i === 2 ? 40 : 0

      gsap.fromTo(card,
        { opacity: 0, y: 50, x: xOffset * 0.5, rotateZ: rotation * 0.5, scale: 0.96 },
        {
          opacity: 1, y: 0, x: 0, rotateZ: 0, scale: 1,
          duration: ANIM.duration.normal,
          ease: ANIM.ease.luxe,
          scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 85%',
            toggleActions: ANIM.scroll.toggleOnce,
          },
          delay: i * 0.18,
        }
      )

      // Animate the gold accent line drawing in
      const accentLine = card.querySelector('.testimonial-accent-line') as HTMLElement
      if (accentLine) {
        gsap.fromTo(accentLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.testimonials-grid',
              start: 'top 85%',
              toggleActions: ANIM.scroll.toggleOnce,
            },
            delay: i * 0.18 + 0.4,
          }
        )
      }

      // Animate the quote mark scaling in
      const quoteMark = card.querySelector('.testimonial-quote') as HTMLElement
      if (quoteMark) {
        gsap.fromTo(quoteMark,
          { opacity: 0, scale: 0.3 },
          {
            opacity: 1, scale: 1,
            duration: 0.6,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: '.testimonials-grid',
              start: 'top 85%',
              toggleActions: ANIM.scroll.toggleOnce,
            },
            delay: i * 0.18 + 0.3,
          }
        )
      }

      // Stars cascade in
      const stars = card.querySelectorAll('.testimonial-star')
      gsap.fromTo(stars,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1, scale: 1, rotation: 0,
          duration: 0.4,
          ease: 'back.out(3)',
          stagger: 0.06,
          scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 85%',
            toggleActions: ANIM.scroll.toggleOnce,
          },
          delay: i * 0.18 + 0.5,
        }
      )

      // Saved amount counter reveal
      const savedBadge = card.querySelector('.testimonial-saved') as HTMLElement
      if (savedBadge) {
        gsap.fromTo(savedBadge,
          { opacity: 0, x: 20 },
          {
            opacity: 1, x: 0,
            duration: 0.6,
            ease: ANIM.ease.smooth,
            scrollTrigger: {
              trigger: '.testimonials-grid',
              start: 'top 85%',
              toggleActions: ANIM.scroll.toggleOnce,
            },
            delay: i * 0.18 + 0.7,
          }
        )
      }
    })

    // Subtle parallax on individual cards
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.to(card, {
        y: i === 1 ? -15 : -8,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      })
    })
  }, { scope: sectionRef })

  // Hover tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardsRef.current[idx]
    if (!card || window.matchMedia('(pointer: coarse)').matches) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(card, { rotateX: -y * 0.01, rotateY: x * 0.01, duration: 0.4, ease: 'power2.out' })
  }

  const handleMouseLeave = (idx: number) => {
    const card = cardsRef.current[idx]
    if (!card) return
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-14 sm:py-16 md:py-20 lg:py-28">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
        {/* Large faded quote in background */}
        <div className="absolute left-[5%] top-[15%] font-[var(--font-playfair)] text-[20rem] font-bold leading-none text-gold/[0.015]">
          &ldquo;
        </div>
        <div className="absolute bottom-[10%] right-[5%] font-[var(--font-playfair)] text-[20rem] font-bold leading-none text-gold/[0.015]">
          &rdquo;
        </div>
        {/* Subtle radial glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gold/[0.015] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="testimonials-heading mb-10 text-center sm:mb-12 lg:mb-16">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Recenzii Clienți</p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            Ce Spun Clienții Despre Inspecțiile{' '}
            <span className="text-gold-gradient">Noastre</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-grey-300">
            Feedback real de la proprietari și investitori care au ales o inspecție
            tehnică imobiliară profesională înainte de a cumpăra.
          </p>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Cards grid */}
        <div className="testimonials-grid grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className="testimonial-card group relative opacity-0 rounded-2xl border border-grey-500/10 bg-black-elevated/80 backdrop-blur-sm transition-all duration-500 hover:border-gold/25 hover:shadow-[0_8px_40px_rgba(201,168,76,0.08)]"
              style={{ perspective: '800px' }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              {/* Gold accent line — left edge */}
              <div
                className="testimonial-accent-line absolute left-0 top-8 bottom-8 w-[2px] origin-top"
                style={{ background: 'linear-gradient(180deg, #C9A84C, rgba(201,168,76,0.1))' }}
              />

              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
              />

              <div className="relative z-10 p-6 md:p-7 lg:p-8">
                {/* Quote mark + saved badge row */}
                <div className="mb-5 flex items-start justify-between">
                  <span className="testimonial-quote font-[var(--font-playfair)] text-5xl font-bold leading-none text-gold/25 transition-colors duration-300 group-hover:text-gold/40">
                    &ldquo;
                  </span>
                  <span className="testimonial-saved rounded-full border border-gold/20 bg-gold/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold opacity-0">
                    Economie {testimonial.saved}
                  </span>
                </div>

                {/* Stars */}
                <div className="mb-5 flex gap-1.5">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="testimonial-star h-4 w-4 text-gold" fill="currentColor" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="mb-6 text-[15px] leading-[1.85] text-grey-200/90 md:mb-8">
                  {testimonial.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 border-t border-grey-500/10 pt-5 md:pt-6">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-gold/15 ring-offset-2 ring-offset-black-elevated transition-all duration-300 group-hover:ring-gold/30">
                    <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="font-[var(--font-playfair)] text-base font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-grey-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust line */}
        <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
          {[
            { value: '100+', label: 'Inspecții Finalizate' },
            { value: '5.0', label: 'Rating Mediu' },
            { value: '€2M+', label: 'Economii Clienți' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 text-sm">
              <span className="font-[var(--font-playfair)] text-lg font-bold text-gold">{stat.value}</span>
              <span className="text-grey-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
