"use client"

import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import type { ServicePageData } from '@/lib/services-data'

function FAQItem({ question, answer, isOpen, onClick }: {
  question: string; answer: string; isOpen: boolean; onClick: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!contentRef.current) return
    gsap.to(contentRef.current, {
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.7,
      ease: 'expo.out',
    })
  }, { dependencies: [isOpen] })

  return (
    <div className={`mb-3 rounded-lg transition-shadow ${isOpen ? 'shadow-lg shadow-black/35' : 'shadow-md shadow-black/25'}`}>
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between px-5 py-5 text-left transition-colors hover:text-white"
        aria-expanded={isOpen}
      >
        <span className={`pr-4 text-base font-medium transition-colors ${isOpen ? 'text-gold' : 'text-white'}`}>
          {question}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <p className="px-5 pb-5 text-sm leading-relaxed text-grey-300">{answer}</p>
      </div>
    </div>
  )
}

interface ServiceFAQProps {
  service: ServicePageData
}

export function ServiceFAQ({ service }: ServiceFAQProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState(0)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.service-faq-heading > *',
      { y: 50, opacity: 0, filter: 'blur(6px)' },
      {
        y: 0, opacity: 1, filter: 'blur(0px)',
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.service-faq-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.service-faq-list',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.service-faq-list', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        {/* Header */}
        <div className="service-faq-heading mb-12 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Intrebari Frecvente</p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Raspunsuri la Intrebari <span className="text-gold-gradient">Frecvente</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Accordion */}
        <div className="service-faq-list">
          {service.faq.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
