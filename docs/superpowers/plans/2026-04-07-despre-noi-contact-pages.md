# Despre Noi & Contact Pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build two immersive, GSAP-animated pages (`/despre-noi` and `/contact`) with full SEO metadata, JSON-LD schemas, and responsive design matching the existing dark cinematic aesthetic.

**Architecture:** Each page is a Server Component route file that imports `"use client"` section components. All animations use the `useGSAP` hook from `@gsap/react` with `prefers-reduced-motion` checks. Data comes from `@/lib/constants` and `@/lib/images`.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Lucide React icons, next/image

---

## File Map

```
CREATE: src/components/despre-noi/DespreHero.tsx      — Hero section with GSAP timeline
CREATE: src/components/despre-noi/DespreStory.tsx      — Founder story split layout
CREATE: src/components/despre-noi/DespreValues.tsx     — 3 value cards
CREATE: src/components/despre-noi/DespreEquipment.tsx  — Equipment showcase grid
CREATE: src/components/despre-noi/DespreStats.tsx      — Animated counter stats
CREATE: src/app/despre-noi/page.tsx                    — Page route with metadata + JSON-LD

CREATE: src/components/contact/ContactHero.tsx         — Hero with phone CTA
CREATE: src/components/contact/ContactForm.tsx         — Form with WhatsApp submit
CREATE: src/components/contact/ContactInfo.tsx         — 3 info cards
CREATE: src/components/contact/ContactMap.tsx          — Google Maps embed
CREATE: src/components/contact/ContactFAQ.tsx          — FAQ accordion
CREATE: src/app/contact/page.tsx                       — Page route with metadata + JSON-LD

MODIFY: src/app/sitemap.ts                            — Add /despre-noi and /contact routes
```

---

### Task 1: DespreHero Component

**Files:**
- Create: `src/components/despre-noi/DespreHero.tsx`

- [ ] **Step 1: Create the DespreHero component**

```tsx
"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { IMAGES } from '@/lib/images'

export function DespreHero() {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = heroRef.current
    if (!ctx) return

    const goldLine = ctx.querySelector('.hero-gold-line')
    const eyebrow = ctx.querySelector('.hero-eyebrow')
    const words = ctx.querySelectorAll('.hero-word')
    const subtitle = ctx.querySelector('.hero-subtitle')
    const scrollInd = ctx.querySelector('.hero-scroll')

    if (prefersReducedMotion) {
      gsap.set([goldLine, eyebrow, ...words, subtitle, scrollInd], {
        opacity: 1, y: 0, scaleX: 1, clipPath: 'inset(0% 0 0 0)',
      })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: ANIM.ease.luxe } })

    tl.to(goldLine, { scaleX: 1, duration: 1.4, ease: 'power2.out' }, 0.3)
    tl.to(eyebrow, { opacity: 1, y: 0, duration: ANIM.duration.normal }, 0.5)
    tl.to(words, {
      opacity: 1, clipPath: 'inset(0% 0 0 0)',
      duration: ANIM.duration.slow, stagger: 0.1,
    }, 0.7)
    tl.to(subtitle, { opacity: 1, y: 0, filter: 'blur(0px)', duration: ANIM.duration.normal }, 1.2)
    tl.to(scrollInd, { opacity: 1, duration: 1 }, 2)
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      className="grain-overlay relative flex min-h-[85vh] items-center overflow-hidden bg-black-pure"
    >
      {/* Background image */}
      <Image
        src={IMAGES.aboutTeam}
        alt="Echipa Core Strategic Consulting"
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover opacity-70"
      />
      {/* 30% black overlay */}
      <div className="absolute inset-0 bg-black-pure/30" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-32 text-center lg:px-8 lg:py-40">
        <div className="hero-gold-line mx-auto mb-8 h-[2px] w-16 origin-center scale-x-0 bg-gold" />

        <p
          className="hero-eyebrow mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold opacity-0"
          style={{ transform: 'translateY(-20px)' }}
        >
          Core Strategic Consulting
        </p>

        <h1 className="mx-auto mb-6 max-w-4xl font-[var(--font-playfair)] text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight">
          {['Pasiunea', 'Pentru', 'Detalii', 'Care', 'Protejează'].map((word) => (
            <span key={word}>
              <span
                className="hero-word inline-block text-white opacity-0"
                style={{ clipPath: 'inset(100% 0 0 0)' }}
              >
                {word}
              </span>{' '}
            </span>
          ))}
          <br className="hidden sm:block" />
          <span
            className="hero-word inline-block text-gold-gradient opacity-0"
            style={{ clipPath: 'inset(100% 0 0 0)' }}
          >
            Investiția Ta.
          </span>
        </h1>

        <p
          className="hero-subtitle mx-auto max-w-2xl text-base leading-relaxed text-grey-200 opacity-0 lg:text-lg"
          style={{ transform: 'translateY(20px)', filter: 'blur(8px)' }}
        >
          Peste 15 ani de experiență în construcții și peste 1.000 de proprietăți inspectate
          în București și Ilfov. Echipamente profesionale Flir, metodologie riguroasă și
          rapoarte detaliate care te protejează de surprize costisitoare.
        </p>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0">
          <ChevronDown className="h-6 w-6 animate-bounce text-gold/50" />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/despre-noi/DespreHero.tsx
git commit -m "feat(despre-noi): add hero section with GSAP animations"
```

---

### Task 2: DespreStory Component

**Files:**
- Create: `src/components/despre-noi/DespreStory.tsx`

- [ ] **Step 1: Create the DespreStory component**

```tsx
"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { IMAGES } from '@/lib/images'

export function DespreStory() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.story-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow, stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.story-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.story-text',
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: ANIM.duration.slow,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.story-text', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.story-image',
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: ANIM.duration.luxe,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.story-image', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.story-badge',
      { scale: 0 },
      {
        scale: 1,
        duration: ANIM.duration.normal,
        ease: ANIM.ease.elastic,
        scrollTrigger: { trigger: '.story-image', start: ANIM.scroll.startLate, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-16">
          {/* Left: Text (60%) */}
          <div className="story-text lg:col-span-3">
            <div className="story-heading mb-8">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
                Povestea Noastră
              </p>
              <h2 className="font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight text-white">
                De La Pasiune{' '}
                <span className="text-gold-gradient">La Misiune</span>
              </h2>
              <div className="mt-6 h-[2px] w-16 bg-gold" />
            </div>

            <div className="space-y-5 text-[0.95rem] leading-[1.8] text-grey-300">
              <p>
                Core Strategic Consulting s-a născut din convingerea că nimeni nu ar trebui
                să facă cea mai mare investiție a vieții — cumpărarea unui imobil — fără o
                verificare tehnică profesională. Am văzut prea mulți cumpărători descoperind
                probleme grave la luni de zile după achiziție: infiltrații ascunse, structuri
                compromise, instalații defectuoase.
              </p>
              <p>
                Cu o experiență de peste 15 ani în domeniul construcțiilor, hidroizolațiilor
                și termosistemelor, am decis să oferim un serviciu de inspecție tehnică imobiliară
                la standarde europene. Am investit în echipamente profesionale de ultimă generație
                — camera termografică Flir E60 și higrometrul Flir MR160 — pentru a detecta
                probleme invizibile ochiului liber.
              </p>
              <p>
                Astăzi, cu peste 1.000 de proprietăți inspectate în București și Ilfov,
                misiunea noastră rămâne aceeași: să protejăm fiecare client de surprizele
                costisitoare care vin cu un imobil neverificat. Fiecare raport pe care îl
                livrăm este o unealtă de negociere și o garanție a transparenței.
              </p>
            </div>
          </div>

          {/* Right: Image (40%) */}
          <div className="story-image mt-12 lg:col-span-2 lg:mt-0">
            <div className="relative overflow-hidden rounded-xl">
              <div className="relative aspect-[3/4]">
                <Image
                  src={IMAGES.aboutTeam}
                  alt="Echipa Core Strategic Consulting în timpul unei inspecții tehnice imobiliare"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black-pure/60 via-transparent to-transparent" />
              </div>

              {/* Floating stat badge */}
              <div className="story-badge absolute bottom-6 left-6 scale-0 rounded-lg border border-gold/20 bg-black-pure/80 p-4 backdrop-blur-sm">
                <span className="block font-[var(--font-jetbrains)] text-2xl font-bold text-gold">1000+</span>
                <span className="mt-0.5 block text-[10px] uppercase tracking-[0.15em] text-grey-300">
                  Proprietăți Inspectate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/despre-noi/DespreStory.tsx
git commit -m "feat(despre-noi): add story section with split layout and GSAP reveals"
```

---

### Task 3: DespreValues Component

**Files:**
- Create: `src/components/despre-noi/DespreValues.tsx`

- [ ] **Step 1: Create the DespreValues component**

```tsx
"use client"

import { useRef } from 'react'
import { Shield, Crosshair, ShieldCheck } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'

const VALUES = [
  {
    icon: Shield,
    title: 'Transparență',
    desc: 'Rapoarte detaliate cu fotografii, fără informații ascunse. Clientul vede exact ce vedem noi.',
  },
  {
    icon: Crosshair,
    title: 'Precizie',
    desc: 'Echipamente profesionale Flir de ultimă generație și metodologie standardizată pentru fiecare inspecție.',
  },
  {
    icon: ShieldCheck,
    title: 'Protecție',
    desc: 'Misiunea noastră este să te protejăm de surprize costisitoare după achiziția unui imobil.',
  },
]

export function DespreValues() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.values-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow, stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.values-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.value-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.normal, stagger: 0.15,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.values-grid', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="values-heading mb-16 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Valorile Noastre
          </p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            Principii Care Ne{' '}
            <span className="text-gold-gradient">Ghidează</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        <div className="values-grid grid gap-8 md:grid-cols-3">
          {VALUES.map((val, i) => (
            <div
              key={i}
              className="value-card group rounded-xl border border-gold/10 bg-black-elevated/50 p-8 transition-all duration-500 hover:border-gold/25 hover:bg-black-elevated/80"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-gold/15 bg-gold/[0.06] transition-colors duration-300 group-hover:bg-gold/10">
                <val.icon className="h-6 w-6 text-gold/70 transition-colors group-hover:text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 font-[var(--font-playfair)] text-xl font-semibold text-white">
                {val.title}
              </h3>
              <p className="text-[0.9rem] leading-[1.8] text-grey-300/90">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/despre-noi/DespreValues.tsx
git commit -m "feat(despre-noi): add values section with 3 animated cards"
```

---

### Task 4: DespreEquipment Component

**Files:**
- Create: `src/components/despre-noi/DespreEquipment.tsx`

- [ ] **Step 1: Create the DespreEquipment component**

```tsx
"use client"

import { useRef } from 'react'
import { Thermometer, Droplets, Hammer } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'

const EQUIPMENT = [
  {
    icon: Thermometer,
    name: 'Flir E60',
    type: 'Camera Termografică',
    specs: 'Detectare punți termice, infiltrații ascunse și pierderi de căldură cu rezoluție 320×240 pixeli infraroșu. Sensibilitate termică sub 0.05°C.',
  },
  {
    icon: Droplets,
    name: 'Flir MR160',
    type: 'Higrometru Profesional',
    specs: 'Măsurare precisă a umidității în structuri, identificare surse infiltrații cu ghidare termică. Mod pin și non-contact.',
  },
  {
    icon: Hammer,
    name: 'Sclerometru',
    type: 'Testare Beton',
    specs: 'Determinare grad beton prin impact controlat, verificare rezistență elemente structurale. Calibrare profesională certificată.',
  },
]

export function DespreEquipment() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.equip-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow, stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.equip-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.equip-card',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.normal, stagger: 0.15,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.equip-grid', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="equip-heading mb-16 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Echipamente Profesionale
          </p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            Tehnologie de Ultimă{' '}
            <span className="text-gold-gradient">Generație</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        <div className="equip-grid grid gap-8 md:grid-cols-3">
          {EQUIPMENT.map((item, i) => (
            <div
              key={i}
              className="equip-card group rounded-xl border border-gold/10 bg-black-elevated/50 p-8 transition-all duration-500 hover:border-gold/25 hover:bg-black-elevated/80"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-gold/15 bg-gold/[0.06] transition-colors duration-300 group-hover:bg-gold/10">
                <item.icon className="h-7 w-7 text-gold/70 transition-colors group-hover:text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="mb-1 font-[var(--font-playfair)] text-xl font-bold text-white">
                {item.name}
              </h3>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold/70">
                {item.type}
              </p>
              <p className="text-[0.9rem] leading-[1.8] text-grey-300/90">{item.specs}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/despre-noi/DespreEquipment.tsx
git commit -m "feat(despre-noi): add equipment showcase section"
```

---

### Task 5: DespreStats Component

**Files:**
- Create: `src/components/despre-noi/DespreStats.tsx`

- [ ] **Step 1: Create the DespreStats component**

```tsx
"use client"

import { useRef, useState, useEffect } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { STATS } from '@/lib/constants'

export function DespreStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useGSAP(() => {
    if (!isVisible) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    STATS.forEach((stat, i) => {
      const el = counterRefs.current[i]
      if (!el) return

      if (prefersReducedMotion) {
        el.textContent = String(stat.value)
        return
      }

      const obj = { value: 0 }
      gsap.to(obj, {
        value: stat.value,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.round(obj.value).toString()
        },
      })
    })
  }, { dependencies: [isVisible], scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-pure py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`text-center ${i < STATS.length - 1 ? 'lg:border-r lg:border-gold/10' : ''}`}
            >
              <div className="mb-2">
                <span
                  ref={(el) => { counterRefs.current[i] = el }}
                  className="font-[var(--font-playfair)] text-[clamp(2.5rem,5vw,4rem)] font-bold text-gold-gradient"
                >
                  0
                </span>
                <span className="font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2rem)] font-bold text-gold/70">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-grey-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/despre-noi/DespreStats.tsx
git commit -m "feat(despre-noi): add animated stats counter section"
```

---

### Task 6: Despre Noi Page Route

**Files:**
- Create: `src/app/despre-noi/page.tsx`

- [ ] **Step 1: Create the page with metadata, JSON-LD, and all sections**

```tsx
import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/effects/SmoothScroll'
import { CTABanner } from '@/components/ui/CTABanner'
import { DespreHero } from '@/components/despre-noi/DespreHero'
import { DespreStory } from '@/components/despre-noi/DespreStory'
import { DespreValues } from '@/components/despre-noi/DespreValues'
import { DespreEquipment } from '@/components/despre-noi/DespreEquipment'
import { DespreStats } from '@/components/despre-noi/DespreStats'

export const metadata: Metadata = {
  title: 'Despre Noi — Cine Suntem | Core Strategic Consulting',
  description: 'Echipa Core Strategic Consulting — 15+ ani experiență în inspecție tehnică imobiliară. Echipamente profesionale Flir, metodologie riguroasă, peste 1000 proprietăți inspectate în București și Ilfov.',
  keywords: [
    'inspectie tehnica imobiliara bucuresti',
    'echipa inspectie imobiliara',
    'core strategic consulting despre noi',
    'inspector tehnic imobil experienta',
  ],
  alternates: { canonical: `${SITE.url}/despre-noi` },
  openGraph: {
    title: 'Despre Noi — Cine Suntem | Core Strategic Consulting',
    description: 'Echipa Core Strategic Consulting — 15+ ani experiență, 1000+ proprietăți inspectate, echipamente profesionale Flir.',
    url: `${SITE.url}/despre-noi`,
    images: [{ url: '/og/og-image.jpg', width: 1200, height: 630, alt: 'Core Strategic Consulting — Despre Noi' }],
  },
}

function DespreNoiJsonLd() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Despre Noi', item: `${SITE.url}/despre-noi` },
    ],
  }

  const aboutPage = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Despre Core Strategic Consulting',
    description: 'Echipa Core Strategic Consulting — 15+ ani experiență în inspecție tehnică imobiliară profesională în București și Ilfov.',
    url: `${SITE.url}/despre-noi`,
    mainEntity: { '@id': `${SITE.url}/#organization` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPage) }} />
    </>
  )
}

export default function DespreNoiPage() {
  return (
    <SmoothScrollProvider>
      <Header />
      <DespreNoiJsonLd />

      <main id="main-content">
        <DespreHero />
        <DespreStory />
        <DespreValues />
        <DespreEquipment />
        <DespreStats />
        <CTABanner
          headline="Pregătit Să Îți Protejezi Investiția?"
          subtext="Programează o inspecție tehnică și primește raportul detaliat în 48h."
        />
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles and dev server loads the page**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/despre-noi/page.tsx
git commit -m "feat(despre-noi): add page route with metadata, JSON-LD, and all sections"
```

---

### Task 7: ContactHero Component

**Files:**
- Create: `src/components/contact/ContactHero.tsx`

- [ ] **Step 1: Create the ContactHero component**

```tsx
"use client"

import { useRef } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SITE } from '@/lib/constants'

export function ContactHero() {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = heroRef.current
    if (!ctx) return

    const elements = ctx.querySelectorAll('.contact-reveal')

    if (prefersReducedMotion) {
      gsap.set(elements, { opacity: 1, y: 0, scaleX: 1 })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: ANIM.ease.luxe } })

    tl.to(ctx.querySelector('.hero-gold-line'), { scaleX: 1, duration: 1.4, ease: 'power2.out' }, 0.3)

    elements.forEach((el, i) => {
      tl.to(el, { opacity: 1, y: 0, duration: ANIM.duration.normal }, 0.5 + i * 0.15)
    })

    // Phone pulse
    gsap.to(ctx.querySelector('.phone-pulse'), {
      scale: 1.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      className="grain-overlay relative flex min-h-[60vh] items-center overflow-hidden bg-black-pure"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-28 text-center lg:px-8 lg:py-36">
        <div className="hero-gold-line mx-auto mb-8 h-[2px] w-16 origin-center scale-x-0 bg-gold" />

        <p className="contact-reveal mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold opacity-0" style={{ transform: 'translateY(-20px)' }}>
          Contact
        </p>

        <h1 className="contact-reveal mx-auto mb-10 max-w-3xl font-[var(--font-playfair)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-white opacity-0" style={{ transform: 'translateY(20px)' }}>
          Contactează-ne Pentru o{' '}
          <span className="text-gold-gradient">Inspecție Tehnică Imobiliară</span>
        </h1>

        {/* Primary phone */}
        <div className="contact-reveal mb-6 opacity-0" style={{ transform: 'translateY(20px)' }}>
          <a
            href={`tel:${SITE.phoneFormatted}`}
            className="inline-flex items-center gap-3 text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-gold-gradient transition-opacity hover:opacity-80"
          >
            <Phone className="phone-pulse h-8 w-8 text-gold" />
            {SITE.phone}
          </a>
        </div>

        {/* WhatsApp button */}
        <div className="contact-reveal mb-10 opacity-0" style={{ transform: 'translateY(20px)' }}>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle className="h-5 w-5" />
            Scrie pe WhatsApp
          </a>
        </div>

        {/* Secondary contacts */}
        <div className="contact-reveal space-y-2 opacity-0" style={{ transform: 'translateY(20px)' }}>
          <p className="text-sm text-grey-300">
            <span className="text-grey-400">{SITE.phoneSecondaryName}: </span>
            <a href={`tel:${SITE.phoneSecondaryFormatted}`} className="text-grey-200 transition-colors hover:text-gold">
              {SITE.phoneSecondary}
            </a>
          </p>
          <p className="text-sm text-grey-300">
            <a href={`mailto:${SITE.email}`} className="text-grey-200 transition-colors hover:text-gold">
              {SITE.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/contact/ContactHero.tsx
git commit -m "feat(contact): add hero section with phone CTA and WhatsApp"
```

---

### Task 8: ContactForm Component

**Files:**
- Create: `src/components/contact/ContactForm.tsx`

- [ ] **Step 1: Create the ContactForm component**

```tsx
"use client"

import { useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SITE } from '@/lib/constants'

const PROPERTY_TYPES = ['Apartament', 'Casă', 'Vilă', 'Spațiu Comercial'] as const

export function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.form-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow, stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.form-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.form-field',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.normal, stagger: 0.1,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.form-fields', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const name = data.get('name') as string
    const phone = data.get('phone') as string
    const email = data.get('email') as string
    const propertyType = data.get('propertyType') as string
    const message = data.get('message') as string

    const whatsappText = [
      `Bună ziua, mă numesc ${name}.`,
      `Doresc o inspecție pentru: ${propertyType}.`,
      message ? `Detalii: ${message}` : '',
      `Contact: ${phone}${email ? `, ${email}` : ''}`,
    ].filter(Boolean).join('\n')

    window.open(
      `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(whatsappText)}`,
      '_blank'
    )

    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const inputClasses = 'w-full rounded-lg border border-grey-500/20 bg-black-elevated px-4 py-3.5 text-sm text-white placeholder:text-grey-400 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30'

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-24 lg:py-32">
      <div className="mx-auto max-w-2xl px-5 lg:px-8">
        <div className="form-heading mb-12 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Trimite-ne un Mesaj
          </p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Solicită o Ofertă{' '}
            <span className="text-gold-gradient">Personalizată</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-gold/10">
              <Check className="h-8 w-8 text-gold" />
            </div>
            <h3 className="font-[var(--font-playfair)] text-xl font-semibold text-white">
              Mesaj trimis!
            </h3>
            <p className="text-sm text-grey-300">Vă contactăm în maxim 2 ore.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form-fields space-y-5">
            <div className="form-field grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-grey-300">
                  Nume *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Numele dumneavoastră"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-grey-300">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="07XX XXX XXX"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="form-field grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-grey-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@exemplu.ro"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="propertyType" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-grey-300">
                  Tip Proprietate
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  className={`${inputClasses} appearance-none`}
                  defaultValue="Apartament"
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-grey-300">
                Mesaj
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Descrieți pe scurt proprietatea sau întrebarea dumneavoastră..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            <div className="form-field pt-2">
              <button
                type="submit"
                className="btn-shimmer relative w-full overflow-hidden rounded-lg px-8 py-4 text-sm font-bold uppercase tracking-wider text-black-rich transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)] sm:w-auto"
                style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C, #B8860B)' }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Trimite Mesajul
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/contact/ContactForm.tsx
git commit -m "feat(contact): add contact form with WhatsApp redirect"
```

---

### Task 9: ContactInfo Component

**Files:**
- Create: `src/components/contact/ContactInfo.tsx`

- [ ] **Step 1: Create the ContactInfo component**

```tsx
"use client"

import { useRef } from 'react'
import { Phone, Mail, Clock } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SITE } from '@/lib/constants'

const INFO_CARDS = [
  {
    icon: Phone,
    title: 'Telefon',
    content: (
      <>
        <a href={`tel:${SITE.phoneFormatted}`} className="block text-base font-semibold text-white transition-colors hover:text-gold">
          {SITE.phone}
        </a>
        <a href={`tel:${SITE.phoneSecondaryFormatted}`} className="mt-1 block text-sm text-grey-300 transition-colors hover:text-gold">
          {SITE.phoneSecondaryName}: {SITE.phoneSecondary}
        </a>
      </>
    ),
  },
  {
    icon: Mail,
    title: 'Email',
    content: (
      <>
        <a href={`mailto:${SITE.email}`} className="block text-base font-semibold text-white transition-colors hover:text-gold">
          {SITE.email}
        </a>
        <span className="mt-1 block text-sm text-grey-400">Răspundem în maxim 2 ore</span>
      </>
    ),
  },
  {
    icon: Clock,
    title: 'Program',
    content: (
      <>
        <span className="block text-base font-semibold text-white">Luni — Vineri: 08:00 — 18:00</span>
        <span className="mt-1 block text-sm text-grey-300">Sâmbătă: 09:00 — 14:00</span>
        <span className="mt-0.5 block text-sm text-grey-400">Duminică: Închis</span>
      </>
    ),
  },
]

export function ContactInfo() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.info-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.normal, stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.info-grid', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="info-grid grid gap-8 md:grid-cols-3">
          {INFO_CARDS.map((card, i) => (
            <div
              key={i}
              className="info-card group rounded-xl border border-gold/10 bg-black-elevated/50 p-7 text-center transition-all duration-500 hover:border-gold/25 hover:bg-black-elevated/80"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-gold/15 bg-gold/[0.06] transition-colors duration-300 group-hover:bg-gold/10">
                <card.icon className="h-6 w-6 text-gold/70 transition-colors group-hover:text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                {card.title}
              </h3>
              {card.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/contact/ContactInfo.tsx
git commit -m "feat(contact): add contact info cards (phone, email, hours)"
```

---

### Task 10: ContactMap Component

**Files:**
- Create: `src/components/contact/ContactMap.tsx`

- [ ] **Step 1: Create the ContactMap component**

```tsx
export function ContactMap() {
  return (
    <section className="relative overflow-hidden">
      {/* Top gradient blending */}
      <div className="absolute left-0 right-0 top-0 z-10 h-16 bg-gradient-to-b from-black-rich to-transparent" />

      <div className="relative h-[300px] lg:h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91158.11209853959!2d25.95867!3d44.43225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucharest!5e0!3m2!1sen!2sro!4v1712500000000"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(80%) contrast(1.1) brightness(0.7)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Locația Core Strategic Consulting — București"
        />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/contact/ContactMap.tsx
git commit -m "feat(contact): add Google Maps embed with dark filter"
```

---

### Task 11: ContactFAQ Component

**Files:**
- Create: `src/components/contact/ContactFAQ.tsx`

- [ ] **Step 1: Create the ContactFAQ component**

This reuses the accordion pattern from the homepage `FAQSection.tsx`.

```tsx
"use client"

import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'

const CONTACT_FAQ = [
  {
    question: 'Cum pot programa o inspecție?',
    answer: 'Sunați la 0769 833 269, trimiteți mesaj pe WhatsApp sau completați formularul de contact de mai sus. Confirmăm programarea în maxim 2 ore.',
  },
  {
    question: 'Cât durează o inspecție?',
    answer: 'Între 2 și 4 ore, în funcție de dimensiunea proprietății. Raportul detaliat este livrat în maxim 48 de ore.',
  },
  {
    question: 'Ce trebuie să pregătesc pentru inspecție?',
    answer: 'Asigurați accesul la toate camerele, inclusiv subsol și pod. Ideal: puneți la dispoziție documentația tehnică a imobilului dacă o aveți.',
  },
  {
    question: 'Pot fi prezent în timpul inspecției?',
    answer: 'Da, recomandăm prezența dumneavoastră. Explicăm în timp real ce descoperim și răspundem la întrebări pe loc.',
  },
]

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
        duration: ANIM.duration.slow, stagger: ANIM.stagger.normal,
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
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="cfaq-heading mb-12 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Întrebări Despre Programare
          </p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Informații <span className="text-gold-gradient">Utile</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        <div className="cfaq-list">
          {CONTACT_FAQ.map((item, i) => (
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/contact/ContactFAQ.tsx
git commit -m "feat(contact): add FAQ accordion for scheduling questions"
```

---

### Task 12: Contact Page Route

**Files:**
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create the page with metadata, JSON-LD, and all sections**

```tsx
import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/effects/SmoothScroll'
import { ContactHero } from '@/components/contact/ContactHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { ContactMap } from '@/components/contact/ContactMap'
import { ContactFAQ } from '@/components/contact/ContactFAQ'

export const metadata: Metadata = {
  title: 'Contact — Programează Inspecția | Core Strategic Consulting',
  description: `Contactează Core Strategic Consulting pentru o inspecție tehnică imobiliară în București și Ilfov. Sună: ${SITE.phone} sau trimite un mesaj pe WhatsApp. Răspundem în maxim 2 ore.`,
  keywords: [
    'contact inspectie tehnica imobiliara',
    'programare inspectie apartament bucuresti',
    'telefon inspector tehnic imobil',
  ],
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: 'Contact — Programează Inspecția | Core Strategic Consulting',
    description: `Sună ${SITE.phone} sau trimite un mesaj pe WhatsApp pentru o inspecție tehnică imobiliară în București și Ilfov.`,
    url: `${SITE.url}/contact`,
    images: [{ url: '/og/og-image.jpg', width: 1200, height: 630, alt: 'Core Strategic Consulting — Contact' }],
  },
}

function ContactJsonLd() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE.url}/contact` },
    ],
  }

  const contactPage = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Core Strategic Consulting',
    description: `Contactează-ne pentru o inspecție tehnică imobiliară în București și Ilfov. Telefon: ${SITE.phone}`,
    url: `${SITE.url}/contact`,
    mainEntity: { '@id': `${SITE.url}/#organization` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPage) }} />
    </>
  )
}

export default function ContactPage() {
  return (
    <SmoothScrollProvider>
      <Header />
      <ContactJsonLd />

      <main id="main-content">
        <ContactHero />
        <ContactForm />
        <ContactInfo />
        <ContactMap />
        <ContactFAQ />
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat(contact): add page route with metadata, JSON-LD, and all sections"
```

---

### Task 13: Update Sitemap

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add /despre-noi and /contact to the sitemap**

Update the `staticPages` array in `src/app/sitemap.ts` to include the two new routes. The full file should be:

```tsx
import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'
import { SERVICE_SLUGS } from '@/lib/services-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE.url}/despre-noi`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE.url}/servicii/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages]
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(seo): add /despre-noi and /contact to sitemap"
```

---

### Task 14: Final Verification

- [ ] **Step 1: Full TypeScript check**

Run: `npx tsc --noEmit 2>&1 | head -30`
Expected: No errors

- [ ] **Step 2: Dev server smoke test**

Run: `npm run dev`
Then verify in browser:
- `http://localhost:3000/despre-noi` — all 6 sections render, animations work on scroll
- `http://localhost:3000/contact` — all 5 sections render, form submits to WhatsApp, phone links work
- Check mobile responsive (375px viewport) for both pages

- [ ] **Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: final adjustments for despre-noi and contact pages"
```
