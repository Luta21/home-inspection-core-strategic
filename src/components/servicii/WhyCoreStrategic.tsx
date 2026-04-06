"use client"

import { useRef } from 'react'
import { Building2, Camera, FileText, HeadphonesIcon } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { STATS } from '@/lib/constants'

const DIFFERENTIATORS = [
  {
    icon: Building2,
    title: '15+ Ani Experiență Directă',
    desc: 'Nu suntem doar inspectori — avem experiență practică în construcții, hidroizolații și termosisteme. Știm cum se construiește și unde apar problemele.',
  },
  {
    icon: Camera,
    title: 'Echipamente Profesionale',
    desc: 'Camera termografică Flir E60, higrometru Flir MR160, sclerometru pentru testare beton — echipamente de clasă profesională, nu accesorii de telefon.',
  },
  {
    icon: FileText,
    title: 'Rapoarte de 25-35 Pagini',
    desc: 'Sistem de clasificare IN/NI/NP/D pentru fiecare element, fotografii HD, termograme, estimări de costuri remediere — totul documentat profesional.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Consultanță Post-Inspecție',
    desc: 'Nu te lăsăm singur cu raportul. Te ajutăm să înțelegi constatările, să negociezi prețul și să prioritizezi remedierea defectelor.',
  },
]

export function WhyCoreStrategic() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.why-cs-heading > *',
      { y: 50, opacity: 0, filter: 'blur(6px)' },
      {
        y: 0, opacity: 1, filter: 'blur(0px)',
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.why-cs-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.why-cs-stat',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.fast,
        stagger: ANIM.stagger.tight,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.why-cs-stats', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    const statNumbers = gsap.utils.toArray('.why-cs-stat-value') as HTMLElement[]
    statNumbers.forEach((el) => {
      const target = parseInt(el.dataset.value || '0', 10)
      gsap.fromTo(el,
        { textContent: 0 },
        {
          textContent: target,
          duration: ANIM.duration.dramatic,
          ease: 'power1.out',
          snap: { textContent: 1 },
          scrollTrigger: { trigger: '.why-cs-stats', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
        }
      )
    })

    gsap.fromTo('.why-cs-card',
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.why-cs-grid', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="why-cs-heading mb-16 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            De Ce Noi
          </p>
          <h2 className="mx-auto mb-4 max-w-2xl font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            De Ce{' '}
            <span className="text-gold-gradient">Core Strategic</span>?
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        <div className="why-cs-stats mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="why-cs-stat rounded-xl bg-black-elevated p-6 text-center shadow-md shadow-black/25 transition-all hover:shadow-lg hover:shadow-black/35"
            >
              <span className="why-cs-stat-value block font-[var(--font-jetbrains)] text-3xl font-bold text-gold" data-value={stat.value}>
                {stat.value}{stat.suffix}
              </span>
              <span className="mt-2 block text-sm text-grey-300">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="why-cs-grid grid gap-6 sm:grid-cols-2 lg:gap-8">
          {DIFFERENTIATORS.map((item) => (
            <div
              key={item.title}
              className="why-cs-card group rounded-xl bg-gradient-to-b from-black-elevated to-black-soft/80 p-8 shadow-lg shadow-black/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/[0.06] transition-all duration-400 group-hover:bg-gold/10">
                <item.icon className="h-5 w-5 text-gold/80 transition-colors duration-400 group-hover:text-gold" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-grey-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
