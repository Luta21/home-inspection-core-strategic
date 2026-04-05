"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { CheckCircle2, Building2, Wrench, Shield, Microscope } from 'lucide-react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { IMAGES } from '@/lib/images'

const ABOUT_CARDS = [
  {
    icon: Building2,
    title: '15+ Ani în Construcții',
    text: 'Compania noastră este specializată în consultanță tehnică imobiliară, oferind soluții profesioniste bazate pe o experiență de peste 15 ani în domeniul construcțiilor.',
  },
  {
    icon: Wrench,
    title: 'Expertiză în Hidroizolații',
    text: 'Expertiza practică în lucrări de hidroizolații pentru fundații tip radier, terase, case cu acoperiș mediteranean și proiecte de infrastructură ne oferă o perspectivă tehnică aprofundată.',
  },
  {
    icon: Shield,
    title: '1.000+ Proprietăți Inspectate',
    text: 'Portofoliul nostru include peste 1.000 de imobile inspectate tehnic și reabilitate termic și hidroizolant în București și Ilfov — un reper important al încrederii clienților.',
  },
  {
    icon: Microscope,
    title: 'Metodologie Riguroasă',
    text: 'Fiecare inspecție tehnică este realizată cu echipamente profesionale de ultimă generație și urmează o metodologie care acoperă structura, instalațiile, hidroizolațiile și finisajele.',
  },
]

const DIFFERENTIATORS = [
  '15+ ani experiență directă în construcții, hidroizolații și termosisteme',
  'Camera termografică profesională Flir E60 pentru detectare punți termice',
  'Higrometru de contact Flir MR160 pentru măsurarea precisă a umidității',
  'Peste 1.000 de apartamente și case inspectate în București și Ilfov',
  'Rapoarte detaliate de 25-35 pagini cu fotografii și estimări de costuri',
  'Consultanță post-inspecție pentru negocierea prețului proprietății',
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Only pin on desktop
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      // Pin the image on the left while cards scroll on the right
      ScrollTrigger.create({
        trigger: '.about-pinned-wrapper',
        start: 'top 80px',
        end: 'bottom bottom',
        pin: '.about-image-col',
        pinSpacing: false,
      })

      // Each card fades/slides in as you scroll
      gsap.utils.toArray<HTMLElement>('.about-card').forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: ANIM.ease.luxe,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })
    })

    // Mobile — simple stagger
    mm.add('(max-width: 1023px)', () => {
      gsap.from('.about-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: ANIM.ease.luxe,
        scrollTrigger: {
          trigger: '.about-cards-col',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })

    // Heading animation
    gsap.from('.about-heading > *', {
      y: 50, opacity: 0,
      duration: ANIM.duration.slow,
      stagger: ANIM.stagger.normal,
      ease: ANIM.ease.luxe,
      scrollTrigger: { trigger: '.about-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
    })

    // Checklist stagger
    gsap.from('.about-check', {
      x: -20, opacity: 0,
      duration: ANIM.duration.normal,
      stagger: ANIM.stagger.cascade,
      ease: ANIM.ease.smooth,
      scrollTrigger: { trigger: '.about-checks', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
    })

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="despre" className="relative overflow-hidden bg-black-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section heading */}
        <div className="about-heading mb-16 max-w-2xl lg:mb-20">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Despre Core Strategic Consulting</p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight text-white">
            Consultanță Tehnică Imobiliară cu{' '}
            <span className="text-gold-gradient">Experiență Reală</span>
          </h2>
          <div className="mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Pinned layout — image left, scrolling cards right */}
        <div className="about-pinned-wrapper lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Left: Pinned image */}
          <div className="about-image-col mb-12 lg:mb-0">
            <div className="relative overflow-hidden rounded-xl">
              <div className="relative aspect-[3/4]">
                <Image
                  src={IMAGES.aboutTeam}
                  alt="Echipa Core Strategic Consulting — inspecție tehnică imobiliară profesională cu echipamente Flir"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Dark gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black-pure/60 via-transparent to-transparent" />
              </div>

              {/* Floating stat over image */}
              <div className="absolute bottom-6 left-6 rounded-lg border border-gold/20 bg-black-pure/80 p-4 backdrop-blur-sm">
                <span className="block font-[var(--font-jetbrains)] text-2xl font-bold text-gold">1000+</span>
                <span className="mt-0.5 block text-[10px] uppercase tracking-[0.15em] text-grey-300">Proprietăți Inspectate</span>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute -left-3 -top-3 hidden h-24 w-24 rounded-tl-xl border-l-2 border-t-2 border-gold/20 lg:block" />
          </div>

          {/* Right: Scrolling cards */}
          <div className="about-cards-col space-y-6">
            {ABOUT_CARDS.map((card, i) => (
              <div
                key={i}
                className="about-card group rounded-xl border border-grey-500/10 bg-black-elevated/50 p-7 transition-all duration-500 hover:border-gold/20 hover:bg-black-elevated/80"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/15 bg-gold/[0.06] transition-colors duration-300 group-hover:bg-gold/10">
                    <card.icon className="h-5 w-5 text-gold/70 transition-colors group-hover:text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-[var(--font-playfair)] text-lg font-semibold text-white">{card.title}</h3>
                </div>
                <p className="text-[0.9rem] leading-[1.8] text-grey-300/90">{card.text}</p>
              </div>
            ))}

            {/* Differentiators checklist below cards */}
            <div className="about-checks mt-8 space-y-3 border-t border-grey-500/10 pt-8">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold">Ce Ne Diferențiază</h3>
              {DIFFERENTIATORS.map((item, i) => (
                <div key={i} className="about-check flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                  <span className="text-sm leading-relaxed text-grey-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
