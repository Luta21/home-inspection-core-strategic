"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SITE } from '@/lib/constants'

const FOOTER_LINKS = {
  Servicii: [
    { label: 'Inspecție Tehnică', href: '#servicii' },
    { label: 'Verificare Structurală', href: '#servicii' },
    { label: 'Scanare Termografică', href: '#servicii' },
    { label: 'Verificare Instalații', href: '#servicii' },
    { label: 'Determinare Umiditate', href: '#servicii' },
    { label: 'Expertize Tehnice', href: '#servicii' },
  ],
  Companie: [
    { label: 'Despre Noi', href: '#despre' },
    { label: 'Prețuri', href: '#preturi' },
    { label: 'Portofoliu', href: '#' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#contact' },
  ],
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.footer-col',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.smooth,
        scrollTrigger: { trigger: footerRef.current, start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: footerRef })

  return (
    <footer ref={footerRef} className="border-t border-grey-500/20 bg-black-pure py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="footer-col">
            <div className="relative mb-4 h-10 w-[160px]">
              <Image
                src="/images/logo.jpeg"
                alt="Core Strategic Consulting"
                fill
                className="object-contain object-left"
                sizes="160px"
              />
            </div>
            <p className="mb-6 text-sm leading-relaxed text-grey-400">
              Inspecție tehnică imobiliară profesională în București și Ilfov.
              Protejăm investiția ta cu echipamente profesionale și experiență de 15+ ani.
            </p>
            <div className="space-y-2">
              <a href={`tel:${SITE.phoneFormatted}`} className="flex items-center gap-2 text-sm text-grey-300 transition-colors hover:text-gold">
                <Phone className="h-3.5 w-3.5" /> {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-sm text-grey-300 transition-colors hover:text-gold">
                <Mail className="h-3.5 w-3.5" /> {SITE.email}
              </a>
              <div className="flex items-center gap-2 text-sm text-grey-300">
                <MapPin className="h-3.5 w-3.5" /> {SITE.location}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="footer-col">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-grey-400 transition-colors hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Program */}
          <div className="footer-col">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold">Program</h4>
            <div className="space-y-2 text-sm text-grey-400">
              <p>Luni - Vineri: <span className="text-grey-200">08:00 - 18:00</span></p>
              <p>Sâmbătă: <span className="text-grey-200">09:00 - 14:00</span></p>
              <p>Duminică: <span className="text-grey-200">Închis</span></p>
            </div>
            <div className="mt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-4 py-2 text-xs font-medium uppercase tracking-wider text-gold transition-all hover:bg-gold/10"
              >
                Programează Acum
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-grey-500/10 pt-8 md:flex-row md:justify-between">
          <p className="text-xs text-grey-500">
            &copy; {new Date().getFullYear()} {SITE.name}. Toate drepturile rezervate.
          </p>
          <div className="flex gap-6 text-xs text-grey-500">
            <a href="#" className="transition-colors hover:text-grey-300">Politica de Confidențialitate</a>
            <a href="#" className="transition-colors hover:text-grey-300">Termeni și Condiții</a>
            <a href="#" className="transition-colors hover:text-grey-300">ANPC</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
