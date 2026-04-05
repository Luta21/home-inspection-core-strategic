"use client"

import { useRef } from 'react'
import Image from 'next/image'
import {
  FileText, CheckCircle2, Camera, Thermometer, Droplets, Zap,
  Shield, Home, Flame, Wind, ArrowRight, Download
} from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { IMAGES } from '@/lib/images'

const REPORT_SECTIONS = [
  { icon: FileText, title: 'Detalii Inspecție & Scoring', desc: 'Scor general al imobilului de la 1 la 10, bazat pe normativele tehnice în vigoare.' },
  { icon: Shield, title: 'Verificare Structurală', desc: 'Stâlpi, grinzi, planșee, armături — concordanță proiect-execuție și defecte de betonare.' },
  { icon: Home, title: 'Subsol, Acoperiș & Exterior', desc: 'Fundație, hidroizolații, acoperiș, fațade, terase, balcoane, alei și ziduri de sprijin.' },
  { icon: Thermometer, title: 'Tâmplărie & Finisaje', desc: 'Glafuri, pierderi termice la ferestre, starea finisajelor interioare și exterioare.' },
  { icon: Zap, title: 'Instalații Electrice', desc: 'Tablou electric, prize, iluminat, protecție la scurtcircuit, calitate cablaj și siguranțe.' },
  { icon: Droplets, title: 'Instalații Sanitare & Încălzire', desc: 'Conducte apă, canalizare, centrală termică, calorifere, climatizare — presiune și etanșeitate.' },
  { icon: Flame, title: 'Protecție Incendiu', desc: 'Detectoare fum, monoxid de carbon, ignifugare, mijloace de protecție prezente.' },
  { icon: Wind, title: 'Climatizare & Dotări', desc: 'Sisteme HVAC, ventilație, echipamente încorporate, stare funcționare.' },
  { icon: Camera, title: 'Releveu Fotografic Complet', desc: 'Fotografii detaliate ale fiecărui element inspectat, inclusiv imagini termografice.' },
]

const REPORT_FEATURES = [
  '25-35 pagini de analiză detaliată',
  'Fotografii HD pentru fiecare defect identificat',
  'Imagini termografice cu camera Flir E60',
  'Scoring general al imobilului (1-10)',
  'Sistem IN/NI/NP/D pentru fiecare element',
  'Estimare costuri de remediere per defect',
  'Recomandări prioritizate de intervenție',
  'Format digital PDF — livrat în 48h',
]

export function ReportSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.from('.report-heading > *', {
      y: 50, opacity: 0, duration: ANIM.duration.slow, stagger: ANIM.stagger.normal,
      ease: ANIM.ease.luxe,
      scrollTrigger: { trigger: '.report-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
    })

    // Report mockup image reveal
    gsap.from('.report-mockup', {
      y: 80, opacity: 0, duration: ANIM.duration.luxe, ease: ANIM.ease.luxe,
      scrollTrigger: { trigger: '.report-mockup', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
    })

    // Features list stagger
    gsap.from('.report-feature', {
      x: -20, opacity: 0, duration: ANIM.duration.normal, stagger: ANIM.stagger.tight,
      ease: ANIM.ease.smooth,
      scrollTrigger: { trigger: '.report-features', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
    })

    // Sections grid stagger
    gsap.from('.report-section-card', {
      y: 40, opacity: 0, duration: ANIM.duration.normal, stagger: ANIM.stagger.cascade,
      ease: ANIM.ease.luxe,
      scrollTrigger: { trigger: '.report-sections-grid', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
    })

    // Parallax on bg decorative element
    gsap.to('.report-bg-accent', {
      y: -40, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    })

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="raport" className="relative overflow-hidden bg-black-elevated py-24 lg:py-32">
      {/* Decorative bg accent */}
      <div className="report-bg-accent absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-gold/[0.03] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <div className="report-heading mb-16 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Raport Tehnic Rezidențial
          </p>
          <h2 className="mx-auto mb-4 max-w-3xl font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            Raport de Inspecție Tehnică Detaliat —{' '}
            <span className="text-gold-gradient">Totul Documentat</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-grey-300">
            Fiecare inspecție se finalizează cu un raport tehnic rezidențial complet,
            de 25-35 pagini, care acoperă toate aspectele proprietății — de la structură
            și instalații până la finisaje și protecție la incendiu. Un document profesional
            care te ajută să iei cea mai bună decizie.
          </p>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Report preview + features */}
        <div className="mb-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Report mockup */}
          <div className="report-mockup relative">
            <div className="relative overflow-hidden rounded-xl border border-gold/20 bg-black-soft p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {/* Report header mockup */}
              <div className="mb-6 border-b border-grey-500/20 pb-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10">
                    <FileText className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-[var(--font-playfair)] text-lg font-bold text-white">
                      RAPORT TEHNIC REZIDENȚIAL
                    </h3>
                    <p className="text-xs text-grey-400">Core Strategic Consulting</p>
                  </div>
                </div>
              </div>

              {/* Scoring mockup */}
              <div className="mb-6 rounded-lg bg-black-rich p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-grey-200">Scoring General Imobil</span>
                  <div className="flex items-center gap-2">
                    <span className="font-[var(--font-jetbrains)] text-2xl font-bold text-gold">8</span>
                    <span className="text-sm text-grey-400">/ 10</span>
                  </div>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-black-muted">
                  <div className="h-full w-[80%] rounded-full" style={{ background: 'linear-gradient(90deg, #C9A84C, #E8D5A3)' }} />
                </div>
              </div>

              {/* Table of contents mockup */}
              <div className="space-y-2">
                {['Detalii Inspecție', 'Documentație Tehnică', 'Structură', 'Acoperiș', 'Finisaje', 'Tâmplărie', 'Instalații Electrice', 'Instalații Sanitare', 'Protecție Incendiu', 'Releveu Fotografic'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-md px-3 py-2 transition-colors hover:bg-black-muted/50">
                    <div className="flex items-center gap-3">
                      <span className="font-[var(--font-jetbrains)] text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-sm text-grey-200">{item}</span>
                    </div>
                    <div className="flex gap-1">
                      {['IN', 'NI', 'NP', 'D'].map((status) => (
                        <span key={status} className="rounded bg-black-muted px-1.5 py-0.5 text-[9px] font-medium text-grey-400">
                          {status}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Page indicator */}
              <div className="mt-6 flex items-center justify-between border-t border-grey-500/20 pt-4">
                <span className="text-[10px] text-grey-500">Core Strategic Consulting</span>
                <span className="text-[10px] text-grey-500">Pagina 2 din 32</span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-xl border border-gold/10 bg-black-soft" style={{ zIndex: -1 }} />
            <div className="absolute -bottom-8 -right-8 h-full w-full rounded-xl border border-gold/5 bg-black-soft" style={{ zIndex: -2 }} />
          </div>

          {/* Features list */}
          <div>
            <h3 className="mb-2 font-[var(--font-playfair)] text-xl font-semibold text-white">
              Ce Conține Raportul de Inspecție
            </h3>
            <p className="mb-8 text-sm text-grey-300">
              Raportul tehnic rezidențial folosește sistemul de clasificare
              IN (Inspectat) / NI (Neinspectat) / NP (Nu este prezent) / D (Defect)
              pentru fiecare element verificat, oferindu-vă o imagine clară și completă.
            </p>

            <div className="report-features space-y-3">
              {REPORT_FEATURES.map((feature, i) => (
                <div key={i} className="report-feature flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-sm text-grey-200">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="btn-shimmer relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wider text-black-rich transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C, #B8860B)' }}
              >
                Solicită Inspecție
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gold/40 px-6 py-3 text-sm font-medium text-gold transition-all hover:bg-gold/10"
              >
                <Download className="h-4 w-4" />
                Descarcă Raport Exemplu
              </a>
            </div>
          </div>
        </div>

        {/* Report sections grid */}
        <div>
          <h3 className="mb-8 text-center font-[var(--font-playfair)] text-xl font-semibold text-white">
            Cele 17 Capitole Verificate în Fiecare Inspecție
          </h3>
          <div className="report-sections-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REPORT_SECTIONS.map((section, i) => (
              <div
                key={i}
                className="report-section-card group flex gap-4 rounded-lg border border-grey-500/15 bg-black-soft p-5transition-all duration-300 hover:border-gold/20 hover:bg-black-muted"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                  <section.icon className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-white">{section.title}</h4>
                  <p className="text-xs leading-relaxed text-grey-400">{section.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
