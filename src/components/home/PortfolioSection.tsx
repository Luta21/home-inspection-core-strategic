"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { IMAGES } from '@/lib/images'

const PROJECTS = [
  {
    title: 'Apartament 3 Camere — Sector 1, București',
    type: 'Inspecție Pre-Achiziție',
    finding: 'Infiltrații la nivelul acoperișului și punți termice la tâmplăria exterioară, detectate prin scanare termografică Flir E60.',
    saved: '€8.500 negociat din prețul de achiziție',
    image: IMAGES.portfolio1,
    details: 'Apartament în bloc din 2018, etaj 8/10. Probleme de hidroizolație la acoperiș identificate la scanarea termografică și confirmate cu higrometrul de contact.',
  },
  {
    title: 'Vilă P+1 — Pipera, Ilfov',
    type: 'Inspecție Completă + Verificare Instalații',
    finding: 'Defecte hidroizolație fundație radier, tâmplărie cu montaj defectuos și instalație electrică subdimensionată.',
    saved: '€12.000 estimare costuri remediere',
    image: IMAGES.portfolio2,
    details: 'Vilă nou construită, 280mp. Am identificat 14 probleme tehnice majore, inclusiv lipsa protecției la umezeală a fundației și cablaj electric necorespunzător normativelor.',
  },
  {
    title: 'Apartament Nou — Aviatiei, București',
    type: 'Recepție Apartament de la Dezvoltator',
    finding: 'Punți termice la 3 ferestre, defecte instalații sanitare și fisuri în tencuială la 2 pereți interiori.',
    saved: 'Remediat integral de dezvoltator în garanție',
    image: IMAGES.portfolio3,
    details: 'Apartament 2 camere, bloc nou 2024. Raportul nostru a servit ca bază pentru solicitarea de remediere în perioada de garanție a dezvoltatorului.',
  },
]

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.from('.portfolio-heading > *', {
      y: 50, opacity: 0, duration: ANIM.duration.slow, stagger: ANIM.stagger.normal,
      ease: ANIM.ease.luxe,
      scrollTrigger: { trigger: '.portfolio-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
    })

    gsap.from('.portfolio-card', {
      y: 80, opacity: 0, duration: ANIM.duration.slow, stagger: ANIM.stagger.relaxed,
      ease: ANIM.ease.luxe,
      scrollTrigger: { trigger: '.portfolio-grid', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="portfolio-heading mb-16">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Portofoliu Inspecții</p>
              <h2 className="font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
                Proiecte de Inspecție Tehnică{' '}
                <span className="text-gold-gradient">Recente</span>
              </h2>
              <p className="mt-3 max-w-xl text-base text-grey-300">
                Exemple reale de inspecții tehnice imobiliare realizate în București și Ilfov,
                cu defecte identificate și bani economisiți pentru clienții noștri.
              </p>
            </div>
            <a href="#contact" className="group flex items-center gap-2 text-sm font-medium text-gold transition-all hover:gap-3">
              Vezi toate proiectele <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-6 h-[2px] w-16 bg-gold" />
        </div>

        <div className="portfolio-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              className="portfolio-card group relative overflow-hidden rounded-xl border border-grey-500/20 bg-black-elevatedtransition-all duration-500 hover:border-gold/30"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.type} — inspecție tehnică imobiliară`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black-pure/70transition-opacity duration-400 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-gold/10">
                    <ArrowUpRight className="h-5 w-5 text-gold" />
                  </div>
                </div>
                <div className="absolute left-4 top-4">
                  <span className="rounded-sm bg-black-pure/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-gold backdrop-blur-sm">
                    {project.type}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 font-[var(--font-playfair)] text-lg font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mb-2 text-sm text-grey-300">{project.finding}</p>
                <p className="mb-3 text-xs text-grey-400">{project.details}</p>
                <div className="flex items-center gap-2 border-t border-grey-500/20 pt-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  <span className="text-xs font-medium text-gold">{project.saved}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
