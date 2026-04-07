"use client"

import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SITE } from '@/lib/constants'

const CONTACT_FAQ_ITEMS = [
  {
    question: 'Cum pot programa o inspecție?',
    answer: `Puteți programa o inspecție sunând la ${SITE.phone}, trimițând un mesaj pe WhatsApp, sau completând formularul de pe această pagină. Vă confirmăm programarea în maxim 2 ore.`,
  },
  {
    question: 'Cât durează o inspecție?',
    answer: 'O inspecție completă durează între 2 și 4 ore, în funcție de dimensiunea și complexitatea proprietății. Raportul detaliat cu fotografii și recomandări este livrat în format digital în maxim 48 de ore.',
  },
  {
    question: 'Ce trebuie să pregătesc pentru inspecție?',
    answer: 'Asigurați accesul la toate camerele, inclusiv pivnița, podul și spațiile tehnice. Dacă aveți documentația tehnică a proprietății (cartea construcției, proiectul tehnic), vă rugăm să o pregătiți. De asemenea, asigurați-vă că utilitățile (apă, curent, gaz) sunt funcționale.',
  },
  {
    question: 'Pot fi prezent în timpul inspecției?',
    answer: 'Absolut, recomandăm prezența dumneavoastră! Veți vedea în timp real ce descoperim și veți primi explicații detaliate. Consultanța se face în prezența dumneavoastră, fără stres, astfel încât să înțelegeți fiecare aspect verificat.',
  },
] as const

function ContactFAQItem({ question, answer, isOpen, onClick }: {
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

export function ContactFAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState(0)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.cfaq-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.cfaq-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
      }
    )

    gsap.fromTo('.cfaq-list',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.cfaq-list', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleActions },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-black-soft py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        {/* Header */}
        <div className="cfaq-heading mb-12 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Informații Utile</p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            Întrebări Despre <span className="text-gold-gradient">Programare</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* FAQ accordion */}
        <div className="cfaq-list">
          {CONTACT_FAQ_ITEMS.map((item, i) => (
            <ContactFAQItem
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
