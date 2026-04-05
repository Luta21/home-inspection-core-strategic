"use client"

import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { FAQ_ITEMS } from '@/lib/constants'

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
    <div className={`border-b transition-colors ${isOpen ? 'border-gold/30' : 'border-grey-500/20'}`}>
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-white"
        aria-expanded={isOpen}
      >
        <span className={`pr-4 text-base font-medium transition-colors ${isOpen ? 'text-gold' : 'text-white'}`}>
          {question}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <p className="pb-5 text-sm leading-relaxed text-grey-300">{answer}</p>
      </div>
    </div>
  )
}

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState(0)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.faq-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.faq-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
      }
    )

    gsap.fromTo('.faq-list',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.faq-list', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
      }
    )
  }, { scope: sectionRef })

  // FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <section ref={sectionRef} id="faq" className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        {/* Header */}
        <div className="faq-heading mb-12 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Întrebări Frecvente</p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            Răspunsuri la Întrebări <span className="text-gold-gradient">Frecvente</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* FAQ accordion */}
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
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
