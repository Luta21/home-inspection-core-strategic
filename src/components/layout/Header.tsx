"use client"

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Menu, X, Phone, ChevronDown,
  Search, Shield, Thermometer, Zap, Droplets, FileCheck,
} from 'lucide-react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { SITE, SERVICES } from '@/lib/constants'

/* ── Icon map for services dropdown ── */
const SERVICE_ICONS: Record<string, React.ElementType> = {
  Search, Shield, Thermometer, Zap, Droplets, FileCheck,
}

/* ── Navigation structure ── */
const NAV_LINKS = [
  { href: '#servicii', label: 'Servicii', hasSubmenu: true },
  { href: '#proces', label: 'Cum Funcționează' },
  { href: '#preturi', label: 'Prețuri' },
  { href: '/despre-noi', label: 'Despre Noi', isPage: true },
  { href: '/blog', label: 'Blog', isPage: true },
  { href: '/contact', label: 'Contact', isPage: true },
]

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ── Dropdown hover handlers with delay ── */
  const openDropdown = useCallback(() => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setServicesOpen(true)
  }, [])

  const closeDropdown = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => setServicesOpen(false), 150)
  }, [])

  /* ── GSAP scroll behaviour ── */
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
          <Link href="/" className="relative block h-10 w-[160px]">
            <Image
              src="/images/logo.jpeg"
              alt="Core Strategic Consulting"
              fill
              className="object-contain object-left"
              sizes="160px"
              priority
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) =>
              link.hasSubmenu ? (
                /* Services with dropdown */
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <a
                    href={link.href}
                    className="group relative flex items-center gap-1 text-xs font-medium uppercase tracking-[0.1em] text-grey-200 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-300 ${
                        servicesOpen ? 'rotate-180 text-gold' : ''
                      }`}
                    />
                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                  </a>

                  {/* ── Dropdown panel ── */}
                  <div
                    className={`absolute left-1/2 top-full pt-4 -translate-x-1/2 transition-all duration-300 ${
                      servicesOpen
                        ? 'pointer-events-auto translate-y-0 opacity-100'
                        : 'pointer-events-none -translate-y-2 opacity-0'
                    }`}
                  >
                    <div className="w-[520px] overflow-hidden rounded-xl border border-gold/10 bg-black-rich/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
                      {/* Gold accent line */}
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                      <div className="p-2">
                        {SERVICES.map((service) => {
                          const Icon = SERVICE_ICONS[service.icon]
                          return (
                            <Link
                              key={service.slug}
                              href={`/servicii/${service.slug}`}
                              className="group/item flex items-start gap-3.5 rounded-lg px-4 py-3 transition-all duration-200 hover:bg-white/[0.04]"
                              onClick={() => setServicesOpen(false)}
                            >
                              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gold/10 bg-gold/[0.06] transition-colors duration-200 group-hover/item:border-gold/25 group-hover/item:bg-gold/[0.12]">
                                {Icon && (
                                  <Icon className="h-4 w-4 text-gold/70 transition-colors duration-200 group-hover/item:text-gold" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[13px] font-medium text-grey-100 transition-colors duration-200 group-hover/item:text-white">
                                  {service.title}
                                </p>
                                <p className="mt-0.5 line-clamp-1 text-[11px] leading-relaxed text-grey-400 transition-colors duration-200 group-hover/item:text-grey-300">
                                  {service.shortDesc}
                                </p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>

                      {/* View all link */}
                      <div className="border-t border-white/[0.04] px-4 py-3">
                        <a
                          href="#servicii"
                          className="flex items-center justify-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-gold/70 transition-colors duration-200 hover:text-gold"
                          onClick={() => setServicesOpen(false)}
                        >
                          Vezi Toate Serviciile
                          <span className="text-[10px]">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Regular nav links */
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isPage={link.isPage}
                />
              ),
            )}
          </nav>

          {/* ── Desktop CTA ── */}
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

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-y-auto bg-black-pure/[0.98] lg:hidden">
          <nav className="flex w-full max-w-sm flex-col items-center gap-6 px-6 py-20">
            {NAV_LINKS.map((link) =>
              link.hasSubmenu ? (
                /* Mobile services accordion */
                <div key={link.href} className="flex w-full flex-col items-center">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center gap-2 font-[var(--font-playfair)] text-2xl font-semibold text-white transition-colors hover:text-gold"
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        mobileServicesOpen ? 'rotate-180 text-gold' : ''
                      }`}
                    />
                  </button>

                  {/* Expandable services list */}
                  <div
                    className={`grid w-full transition-all duration-400 ease-out ${
                      mobileServicesOpen
                        ? 'mt-4 grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-1 rounded-xl border border-gold/10 bg-white/[0.03] p-2">
                        {SERVICES.map((service) => {
                          const Icon = SERVICE_ICONS[service.icon]
                          return (
                            <Link
                              key={service.slug}
                              href={`/servicii/${service.slug}`}
                              onClick={() => { setMobileOpen(false); setMobileServicesOpen(false) }}
                              className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.05]"
                            >
                              {Icon && (
                                <Icon className="h-4 w-4 shrink-0 text-gold/60" />
                              )}
                              <span className="text-sm text-grey-200">{service.title}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : link.isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-[var(--font-playfair)] text-2xl font-semibold text-white transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-[var(--font-playfair)] text-2xl font-semibold text-white transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              ),
            )}
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

/* ── NavLink helper ── */
function NavLink({ href, label, isPage }: { href: string; label: string; isPage?: boolean }) {
  const Tag = isPage ? Link : 'a'
  return (
    <Tag
      href={href}
      className="group relative text-xs font-medium uppercase tracking-[0.1em] text-grey-200 transition-colors hover:text-white"
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
    </Tag>
  )
}
