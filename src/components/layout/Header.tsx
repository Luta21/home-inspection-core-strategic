"use client"

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { SITE } from '@/lib/constants'

const NAV_LINKS = [
  { href: '#servicii', label: 'Servicii' },
  { href: '#proces', label: 'Cum Funcționează' },
  { href: '#despre', label: 'Despre Noi' },
  { href: '#preturi', label: 'Prețuri' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useGSAP(() => {
    const header = headerRef.current
    if (!header) return

    let lastScroll = 0

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const scroll = self.scroll()
        const progress = Math.min(scroll / 100, 1)

        gsap.set(header, {
          backgroundColor: `rgba(10, 10, 10, ${progress * 0.95})`,
          backdropFilter: progress > 0.1 ? 'blur(12px)' : 'none',
          borderBottomColor: progress > 0.5 ? 'rgba(201, 168, 76, 0.1)' : 'transparent',
        })

        if (scroll > lastScroll && scroll > 400) {
          gsap.to(header, { y: -100, duration: 0.3, ease: 'power2.in' })
        } else {
          gsap.to(header, { y: 0, duration: 0.3, ease: 'power2.out' })
        }
        lastScroll = scroll
      },
    })
  }, { scope: headerRef })

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          {/* Logo */}
          <a href="#" className="relative block h-10 w-[160px]">
            <Image
              src="/images/logo.jpeg"
              alt="Core Strategic Consulting"
              fill
              className="object-contain object-left"
              sizes="160px"
              priority
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-xs font-medium uppercase tracking-[0.1em] text-grey-200 transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={`tel:${SITE.phoneFormatted}`}
              className="flex items-center gap-2 text-xs text-gold transition-colors hover:text-gold-light"
            >
              <Phone className="h-3.5 w-3.5" />
              {SITE.phone}
            </a>
            <a
              href="#contact"
              className="btn-shimmer relative overflow-hidden rounded-md px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black-rich"
              style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C, #B8860B)' }}
            >
              Programează Inspecția
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white lg:hidden"
            aria-label="Meniu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black-pure/[0.98] lg:hidden">
          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-[var(--font-playfair)] text-2xl font-semibold text-white transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 h-[1px] w-16 bg-gold" />
            <a
              href={`tel:${SITE.phoneFormatted}`}
              className="flex items-center gap-2 text-gold"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
