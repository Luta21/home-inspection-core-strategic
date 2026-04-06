"use client"

import { useRef } from 'react'
import { FileText, CheckCircle2, ArrowRight } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SITE } from '@/lib/constants'
import type { ServicePageData } from '@/lib/services-data'

interface ServiceReportPreviewProps {
  service: ServicePageData
}

export function ServiceReportPreview({ service }: ServiceReportPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.report-preview-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.report-preview-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.report-preview-mockup',
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.luxe,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.report-preview-mockup', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.report-preview-highlight',
      { x: -20, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.tight,
        ease: ANIM.ease.smooth,
        scrollTrigger: { trigger: '.report-preview-highlights', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  if (service.reportHighlights.length === 0) return null

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-elevated py-24 lg:py-32">
      <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-gold/[0.03] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="report-preview-heading mb-16 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Raportul Tău
          </p>
          <h2 className="mx-auto mb-4 max-w-3xl font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Ce Primești în Raportul de{' '}
            <span className="text-gold-gradient">{service.title}</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="report-preview-mockup relative">
            <div className="relative overflow-hidden rounded-xl border border-gold/20 bg-black-soft p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="mb-6 border-b border-grey-500/20 pb-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10">
                    <FileText className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-[var(--font-playfair)] text-lg font-bold text-white">
                      {service.title.toUpperCase()}
                    </h3>
                    <p className="text-xs text-grey-400">{SITE.name}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-lg bg-black-rich p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-grey-200">Scoring Element</span>
                  <div className="flex items-center gap-2">
                    <span className="font-[var(--font-jetbrains)] text-2xl font-bold text-gold">8</span>
                    <span className="text-sm text-grey-400">/ 10</span>
                  </div>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-black-muted">
                  <div className="h-full w-[80%] rounded-full" style={{ background: 'linear-gradient(90deg, #C9A84C, #E8D5A3)' }} />
                </div>
              </div>

              <div className="space-y-2">
                {service.deliverables.slice(0, 6).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-black-muted/50">
                    <span className="font-[var(--font-jetbrains)] text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-grey-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-grey-500/20 pt-4">
                <span className="text-[10px] text-grey-500">{SITE.name}</span>
                <span className="text-[10px] text-grey-500">Format PDF — livrat în 48h</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-xl border border-gold/10 bg-black-soft" style={{ zIndex: -1 }} />
            <div className="absolute -bottom-8 -right-8 h-full w-full rounded-xl border border-gold/5 bg-black-soft" style={{ zIndex: -2 }} />
          </div>

          <div>
            <h3 className="mb-2 font-[var(--font-playfair)] text-xl font-semibold text-white">
              Elemente Specifice în Raport
            </h3>
            <p className="mb-8 text-sm text-grey-300">
              Pe lângă secțiunile standard ale raportului tehnic rezidențial,
              acest serviciu include analize și documentație specifice:
            </p>

            <div className="report-preview-highlights space-y-3">
              {service.reportHighlights.map((highlight, i) => (
                <div key={i} className="report-preview-highlight flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-sm text-grey-200">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="#contact"
                className="btn-shimmer relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wider text-black-rich transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C, #B8860B)' }}
              >
                Solicită Inspecție
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
