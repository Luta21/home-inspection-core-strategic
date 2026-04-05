"use client"

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

const TRUST_ITEMS = [
  'Echipamente Flir Profesionale',
  '1000+ Proprietăți Inspectate',
  'Rapoarte Detaliate cu Fotografii',
  '15+ Ani Experiență',
  'Verificare Non-Distructivă',
  'Specializare Hidroizolații',
  'București & Ilfov',
  'Estimare Costuri Remediere',
]

export function TrustStrip() {
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!trackRef.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 30,
      repeat: -1,
      ease: 'none',
    })
  })

  return (
    <div className="overflow-hidden border-y border-grey-500/20 bg-black-elevated py-4">
      <div ref={trackRef} className="flex w-fit gap-8">
        {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
          <div key={i} className="flex shrink-0 items-center gap-4">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.15em] text-grey-300">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
