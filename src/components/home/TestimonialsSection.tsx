"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
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
  },
  {
    name: 'Maria D.',
    role: 'Proprietar vilă, Voluntari, Ilfov',
    text: 'Profesionalism impecabil de la programare până la livrarea raportului. Au identificat probleme cu hidroizolația la fundație care ar fi costat €15.000+ pe termen lung. Echipamentele Flir fac diferența — am văzut literal căldura care se pierdea prin pereți și ferestre.',
    rating: 5,
    image: IMAGES.testimonial2,
  },
  {
    name: 'Radu C.',
    role: 'Investitor imobiliar, București',
    text: 'Colaborez cu Core Strategic pentru fiecare achiziție din portofoliul meu. Rapoartele lor de 30+ pagini cu estimări detaliate de costuri mă ajută să iau decizii informate. Au identificat probleme structurale la un apartament pe care eram gata să-l cumpăr — m-au salvat de o investiție proastă.',
    rating: 5,
    image: IMAGES.testimonial3,
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.from('.testimonials-heading > *', {
      y: 50, opacity: 0, duration: ANIM.duration.slow, stagger: ANIM.stagger.normal,
      ease: ANIM.ease.luxe,
      scrollTrigger: { trigger: '.testimonials-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
    })

    gsap.from('.testimonial-card', {
      y: 60, opacity: 0, duration: ANIM.duration.slow, stagger: ANIM.stagger.relaxed,
      ease: ANIM.ease.luxe,
      scrollTrigger: { trigger: '.testimonials-grid', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="testimonials-heading mb-16 text-center">
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

        <div className="testimonials-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={i}
              className="testimonial-card relative rounded-xl border border-grey-500/20 bg-black-elevated p-7transition-all duration-400 hover:border-gold/20"
            >
              <div className="absolute bottom-6 left-0 top-6 w-[2px] bg-gold/30" />
              <Quote className="mb-4 h-6 w-6 text-gold/30" />
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 text-gold" fill="currentColor" />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-grey-200">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-grey-500/20 pt-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-grey-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
