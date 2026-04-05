"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { AlertTriangle, Eye, TrendingDown } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { IMAGES } from '@/lib/images'

const PROBLEMS = [
  {
    icon: AlertTriangle,
    stat: '73%',
    title: 'Defecte Ascunse',
    desc: 'din apartamentele din București au cel puțin un defect ascuns care nu poate fi identificat fără echipamente profesionale de inspecție tehnică.',
  },
  {
    icon: Eye,
    title: 'Probleme Structurale Invizibile',
    stat: '45%',
    desc: 'din problemele structurale — fisuri în armături, defecte de betonare, punți termice — rămân nedetectate fără scanare termografică și verificare cu sclerometru.',
  },
  {
    icon: TrendingDown,
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

    gsap.from('.problem-heading > *', {
      y: 60, opacity: 0, duration: ANIM.duration.slow, stagger: ANIM.stagger.normal,
      ease: ANIM.ease.luxe,
      scrollTrigger: { trigger: '.problem-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
    })

    gsap.from('.problem-card', {
      y: 80, opacity: 0, duration: ANIM.duration.slow, stagger: ANIM.stagger.relaxed,
      ease: ANIM.ease.luxe,
      scrollTrigger: { trigger: '.problem-cards', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
    })

    // Image clip-path reveal
    gsap.from('.problem-image', {
      clipPath: 'inset(0 100% 0 0)', duration: ANIM.duration.luxe, ease: ANIM.ease.sharp,
      scrollTrigger: { trigger: '.problem-image', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
    })

    // Parallax on image
    gsap.to('.problem-image-inner', {
      y: 60, ease: 'none',
      scrollTrigger: { trigger: '.problem-image', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    })

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

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="problem-cards flex flex-col gap-6">
            {PROBLEMS.map((problem, i) => (
              <div
                key={i}
                className="problem-card group flex gap-5 rounded-xl border border-grey-500/20 bg-black-elevated p-6transition-all duration-400 hover:border-gold/30 hover:shadow-[0_4px_20px_rgba(201,168,76,0.08)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                  <problem.icon className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <span className="mb-1 block font-[var(--font-jetbrains)] text-2xl font-bold text-gold">
                    {problem.stat}
                  </span>
                  <h3 className="mb-1 text-sm font-semibold text-white">{problem.title}</h3>
                  <p className="text-sm leading-relaxed text-grey-300">{problem.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="problem-image relative overflow-hidden rounded-xl" style={{ clipPath: 'inset(0 0 0 0)' }}>
            <div className="problem-image-inner relative aspect-[4/3] lg:aspect-auto lg:h-full">
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
