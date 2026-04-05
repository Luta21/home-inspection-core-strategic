"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { IMAGES } from '@/lib/images'

const PROBLEMS = [
  {
    stat: '73%',
    title: 'Defecte Ascunse',
    desc: 'din apartamentele din București au cel puțin un defect ascuns care nu poate fi identificat fără echipamente profesionale de inspecție tehnică.',
  },
  {
    title: 'Probleme Structurale Invizibile',
    stat: '45%',
    desc: 'din problemele structurale — fisuri în armături, defecte de betonare, punți termice — rămân nedetectate fără scanare termografică și verificare cu sclerometru.',
  },
  {
    stat: '€15.000+',
    title: 'Costuri Neprevăzute',
    desc: 'este costul mediu al reparațiilor neprevăzute descoperite după achiziție. O inspecție tehnică de 350-800 EUR te poate proteja de pierderi majore.',
  },
]

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.problem-heading > *',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: ANIM.duration.slow, stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.problem-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
      }
    )

    gsap.fromTo('.problem-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: ANIM.duration.normal, stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.problem-cards', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
      }
    )

    // Image clip-path reveal
    gsap.fromTo('.problem-image',
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)', duration: ANIM.duration.luxe, ease: ANIM.ease.sharp,
        scrollTrigger: { trigger: '.problem-image', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    // Parallax on image — starts at natural position, moves down gently
    gsap.fromTo('.problem-image-inner',
      { y: 0 },
      {
        y: 40, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top center', end: 'bottom top', scrub: 1.5 },
      }
    )

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="problem-heading mb-16 max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            De Ce Ai Nevoie De Inspecție Tehnică
          </p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            Nu Cumpăra Apartament Fără Să{' '}
            <span className="text-gold-gradient">Verifici</span>
          </h2>
          <p className="text-base leading-relaxed text-grey-300">
            Cea mai mare investiție a vieții tale — un apartament sau o casă în București —
            merită o verificare profesională. Problemele ascunse în structură, instalații și
            hidroizolații costă mult mai mult decât o inspecție tehnică imobiliară.
          </p>
          <div className="mt-6 h-[2px] w-16 bg-gold" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <div className="problem-cards flex flex-col gap-8">
            {PROBLEMS.map((problem, i) => (
              <div
                key={i}
                className="problem-card group py-6"
                style={{ borderBottom: i < PROBLEMS.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none' }}
              >
                <span className="mb-2 block font-[var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] font-bold text-gold-gradient leading-none">
                  {problem.stat}
                </span>
                <h3 className="mb-2 font-[var(--font-playfair)] text-lg font-semibold text-gold-light">{problem.title}</h3>
                <p className="max-w-md text-sm leading-[1.8] text-grey-300/80">{problem.desc}</p>
              </div>
            ))}
          </div>

          <div className="problem-image relative overflow-hidden rounded-xl lg:min-h-[500px]" style={{ clipPath: 'inset(0 0 0 0)' }}>
            <div className="problem-image-inner relative aspect-[3/4] sm:aspect-[4/3] lg:absolute lg:inset-0">
              <Image
                src={IMAGES.thermalScan}
                alt="Scanare termografică apartament București — detectare punți termice și infiltrații cu camera profesională Flir E60"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Scan line effect */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-0 right-0 h-[2px] animate-[scan-line_4s_linear_infinite] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black-pure/90 to-transparent p-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gold">Scanare Termografică Profesională</p>
                <p className="mt-1 text-sm text-grey-200">
                  Defecte de izolație termică și infiltrații ascunse, detectate cu camera profesională
                  Flir E60. Identificăm punți termice, umiditate în pereți și pierderi de căldură
                  invizibile cu ochiul liber.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan-line {
          0% { top: -2px; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  )
}
