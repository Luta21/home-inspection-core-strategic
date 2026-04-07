# Service Pages Enhancement — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 5 new sections to each service page (WhoNeedsThis, RiskAvoidance, ServiceReportPreview, WhyCoreStrategic, expanded FAQ) to increase content depth, trust signals, and SEO value.

**Architecture:** Extend `ServicePageData` type with 3 new fields, create 4 new client components following existing patterns (GSAP animations, dark theme, gold accents), wire them into the page layout, then populate all 6 services' data via parallel SEO research agents.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS, GSAP + @gsap/react, Lucide React icons

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/lib/services-data.ts` | Modify | Add 3 new fields to `ServicePageData` type, add empty arrays as defaults for all 6 services |
| `src/components/servicii/WhoNeedsThisSection.tsx` | Create | Buyer personas grid — who needs this service |
| `src/components/servicii/RiskAvoidanceSection.tsx` | Create | Risk/cost cards — what happens if you skip inspection |
| `src/components/servicii/ServiceReportPreview.tsx` | Create | Report mockup + highlights — what you get in the report |
| `src/components/servicii/WhyCoreStrategic.tsx` | Create | Shared trust block — brand stats + differentiators |
| `src/app/servicii/[slug]/page.tsx` | Modify | Wire 4 new components into page layout |
| `src/lib/icons.ts` | Modify | Add any missing Lucide icons (User, AlertOctagon, TrendingDown, Award, Briefcase, FileText already present) |

---

### Task 1: Extend ServicePageData Type + Add Empty Defaults

**Files:**
- Modify: `src/lib/services-data.ts` (type definition at lines 1-25, then each service object)

- [ ] **Step 1: Add new fields to the ServicePageData type**

In `src/lib/services-data.ts`, add 3 new fields to the type after the existing `metaKeywords` field:

```typescript
export type ServicePageData = {
  slug: string
  title: string
  icon: string
  heroLabel: string
  heroHeadline: string
  heroHeadlineGold: string
  heroSubheadline: string
  concernHeading: string
  concernBody: string[]
  concernStats: { value: string; label: string }[]
  benefits: { icon: string; title: string; desc: string }[]
  methodology: { title: string; desc: string }[]
  equipment: { icon: string; name: string; type: string; specs: string }[]
  deliverables: string[]
  ctaHeadline: string
  ctaSubtext: string
  faq: { question: string; answer: string }[]
  closingHeadline: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
  // NEW FIELDS
  whoNeedsThis: { persona: string; scenario: string }[]
  risks: { title: string; cost: string; desc: string }[]
  reportHighlights: string[]
}
```

- [ ] **Step 2: Add empty arrays to each service object**

For each of the 6 service objects in `SERVICE_PAGES`, add these 3 fields right before the closing `}` of each service:

```typescript
    whoNeedsThis: [],
    risks: [],
    reportHighlights: [],
```

Add these to ALL 6 services: `verificare-documentatie-tehnica`, `verificare-elemente-structuri`, `scanare-termografica`, `verificare-instalatii`, `determinare-umiditate`, `expertize-tehnice`.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/services-data.ts
git commit -m "feat(servicii): extend ServicePageData type with whoNeedsThis, risks, reportHighlights"
```

---

### Task 2: Create WhoNeedsThisSection Component

**Files:**
- Create: `src/components/servicii/WhoNeedsThisSection.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/servicii/WhoNeedsThisSection.tsx`:

```tsx
"use client"

import { useRef } from 'react'
import { User } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import type { ServicePageData } from '@/lib/services-data'

interface WhoNeedsThisSectionProps {
  service: ServicePageData
}

export function WhoNeedsThisSection({ service }: WhoNeedsThisSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.who-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.who-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.who-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.who-grid', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  if (service.whoNeedsThis.length === 0) return null

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="who-heading mb-16 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Este Pentru Tine?
          </p>
          <h2 className="mx-auto mb-4 max-w-3xl font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Cine Are Nevoie de{' '}
            <span className="text-gold-gradient">{service.title}</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Personas grid */}
        <div className="who-grid grid gap-6 sm:grid-cols-2 lg:gap-8">
          {service.whoNeedsThis.map((item) => (
            <div
              key={item.persona}
              className="who-card group rounded-xl border border-grey-500/15 bg-gradient-to-b from-black-elevated to-black-soft/80 p-8 transition-all duration-500 hover:border-gold/25"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-gold/15 bg-gold/[0.06] transition-all duration-400 group-hover:border-gold/30 group-hover:bg-gold/10">
                <User className="h-5 w-5 text-gold/80 transition-colors duration-400 group-hover:text-gold" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{item.persona}</h3>
              <p className="text-sm leading-relaxed text-grey-300">{item.scenario}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add User icon to icon map if missing**

Check `src/lib/icons.ts`. If `User` is not in the import list or ICON_MAP, add it. (It's not currently present — add it.)

Add to the import statement in `src/lib/icons.ts`:
```typescript
import {
  // ... existing imports ...
  User,
} from 'lucide-react'
```

Add to `ICON_MAP`:
```typescript
const ICON_MAP: Record<string, LucideIcon> = {
  // ... existing entries ...
  User,
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/servicii/WhoNeedsThisSection.tsx src/lib/icons.ts
git commit -m "feat(servicii): add WhoNeedsThisSection component"
```

---

### Task 3: Create RiskAvoidanceSection Component

**Files:**
- Create: `src/components/servicii/RiskAvoidanceSection.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/servicii/RiskAvoidanceSection.tsx`:

```tsx
"use client"

import { useRef } from 'react'
import { AlertTriangle } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import type { ServicePageData } from '@/lib/services-data'

interface RiskAvoidanceSectionProps {
  service: ServicePageData
}

export function RiskAvoidanceSection({ service }: RiskAvoidanceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.risk-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.risk-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.risk-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.risk-grid', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  if (service.risks.length === 0) return null

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="risk-heading mb-16 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-red-400">
            Riscuri Reale
          </p>
          <h2 className="mx-auto mb-4 max-w-3xl font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Ce Riscuri Eviți cu{' '}
            <span className="text-gold-gradient">{service.title}</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Risks grid */}
        <div className="risk-grid grid gap-6 sm:grid-cols-2 lg:gap-8">
          {service.risks.map((risk) => (
            <div
              key={risk.title}
              className="risk-card group rounded-xl border border-grey-500/15 bg-gradient-to-b from-black-elevated to-black-soft/80 p-8 transition-all duration-500 hover:border-red-500/25"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/15 bg-red-500/[0.06] transition-all duration-400 group-hover:border-red-500/30 group-hover:bg-red-500/10">
                  <AlertTriangle className="h-5 w-5 text-red-400/80 transition-colors duration-400 group-hover:text-red-400" />
                </div>
                <span className="rounded-lg bg-red-500/10 px-3 py-1.5 font-[var(--font-jetbrains)] text-sm font-bold text-red-400">
                  {risk.cost}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{risk.title}</h3>
              <p className="text-sm leading-relaxed text-grey-300">{risk.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <p className="mt-12 text-center text-sm text-grey-400">
          Costul unei inspecții profesionale este o fracțiune din costul remedierii problemelor nedetectate.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/servicii/RiskAvoidanceSection.tsx
git commit -m "feat(servicii): add RiskAvoidanceSection component"
```

---

### Task 4: Create ServiceReportPreview Component

**Files:**
- Create: `src/components/servicii/ServiceReportPreview.tsx`

This adapts the homepage `ReportSection` mockup design but uses service-specific `reportHighlights` data. The left side shows a simplified report mockup card (reusing the visual language: stacked paper effect, FileText icon, scoring bar, table of contents). The right side shows the service-specific highlights checklist.

- [ ] **Step 1: Create the component**

Create `src/components/servicii/ServiceReportPreview.tsx`:

```tsx
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
      {/* Decorative bg accent */}
      <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-gold/[0.03] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
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

        {/* Report preview + highlights */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Report mockup */}
          <div className="report-preview-mockup relative">
            <div className="relative overflow-hidden rounded-xl border border-gold/20 bg-black-soft p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {/* Report header */}
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

              {/* Scoring mockup */}
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

              {/* Deliverables as table of contents */}
              <div className="space-y-2">
                {service.deliverables.slice(0, 6).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-black-muted/50">
                    <span className="font-[var(--font-jetbrains)] text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-grey-200">{item}</span>
                  </div>
                ))}
              </div>

              {/* Page indicator */}
              <div className="mt-6 flex items-center justify-between border-t border-grey-500/20 pt-4">
                <span className="text-[10px] text-grey-500">{SITE.name}</span>
                <span className="text-[10px] text-grey-500">Format PDF — livrat în 48h</span>
              </div>
            </div>

            {/* Stacked paper effect */}
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-xl border border-gold/10 bg-black-soft" style={{ zIndex: -1 }} />
            <div className="absolute -bottom-8 -right-8 h-full w-full rounded-xl border border-gold/5 bg-black-soft" style={{ zIndex: -2 }} />
          </div>

          {/* Highlights list */}
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/servicii/ServiceReportPreview.tsx
git commit -m "feat(servicii): add ServiceReportPreview component"
```

---

### Task 5: Create WhyCoreStrategic Component

**Files:**
- Create: `src/components/servicii/WhyCoreStrategic.tsx`

This is a shared trust block that pulls from `STATS` in constants. Same content on every service page.

- [ ] **Step 1: Create the component**

Create `src/components/servicii/WhyCoreStrategic.tsx`:

```tsx
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
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
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

    gsap.fromTo('.why-cs-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
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
        {/* Header */}
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

        {/* Stats bar */}
        <div className="why-cs-stats mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="why-cs-stat rounded-xl border border-grey-500/15 bg-black-elevated p-6 text-center transition-colors hover:border-gold/20"
            >
              <span className="block font-[var(--font-jetbrains)] text-3xl font-bold text-gold">
                {stat.value}{stat.suffix}
              </span>
              <span className="mt-2 block text-sm text-grey-300">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Differentiators grid */}
        <div className="why-cs-grid grid gap-6 sm:grid-cols-2 lg:gap-8">
          {DIFFERENTIATORS.map((item) => (
            <div
              key={item.title}
              className="why-cs-card group rounded-xl border border-grey-500/15 bg-gradient-to-b from-black-elevated to-black-soft/80 p-8 transition-all duration-500 hover:border-gold/25"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-gold/15 bg-gold/[0.06] transition-all duration-400 group-hover:border-gold/30 group-hover:bg-gold/10">
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/servicii/WhyCoreStrategic.tsx
git commit -m "feat(servicii): add WhyCoreStrategic shared trust component"
```

---

### Task 6: Wire New Components into Page Layout

**Files:**
- Modify: `src/app/servicii/[slug]/page.tsx`

- [ ] **Step 1: Add imports for the 4 new components**

Add these imports after the existing component imports in `src/app/servicii/[slug]/page.tsx`:

```typescript
import { WhoNeedsThisSection } from '@/components/servicii/WhoNeedsThisSection'
import { RiskAvoidanceSection } from '@/components/servicii/RiskAvoidanceSection'
import { ServiceReportPreview } from '@/components/servicii/ServiceReportPreview'
import { WhyCoreStrategic } from '@/components/servicii/WhyCoreStrategic'
```

- [ ] **Step 2: Insert components into the page layout**

Replace the `<main>` block in the default export function with this updated layout:

```tsx
      <main id="main-content">
        <ServiceHero service={service} />
        <ConcernSection service={service} />
        <WhoNeedsThisSection service={service} />
        <RiskAvoidanceSection service={service} />
        <SolutionSection service={service} />
        <MethodologyStepper service={service} />
        <EquipmentSection service={service} />
        <ServiceReportPreview service={service} />
        <DeliverablesSection service={service} />

        <CTABanner headline={service.ctaHeadline} subtext={service.ctaSubtext} />

        <WhyCoreStrategic />
        <RelatedServices currentSlug={service.slug} />
        <ServiceFAQ service={service} />
        <ServiceCTA headline={service.closingHeadline} />
      </main>
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Verify dev server renders without errors**

Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/servicii/verificare-documentatie-tehnica`
Expected: `200`

The new sections should not render yet (they return null when their data arrays are empty).

- [ ] **Step 5: Commit**

```bash
git add src/app/servicii/[slug]/page.tsx
git commit -m "feat(servicii): wire WhoNeedsThis, RiskAvoidance, ReportPreview, WhyCoreStrategic into page"
```

---

### Task 7: Populate Data for All 6 Services via SEO Research

**Files:**
- Modify: `src/lib/services-data.ts` (all 6 service objects — new fields only)

This task dispatches 6 parallel SEO research agents, one per service. Each agent populates the `whoNeedsThis`, `risks`, `reportHighlights` fields, and expands the `faq` array.

- [ ] **Step 1: Dispatch 6 parallel seo-research agents**

Launch 6 `seo-research` agents in parallel, one per service slug. Each agent should:

1. Research Romanian search queries for the specific service domain
2. Populate `whoNeedsThis` with 4 personas matching real buyer intent
3. Populate `risks` with 4 concrete risk/cost scenarios
4. Populate `reportHighlights` with 6-7 service-specific report items
5. Expand `faq` to 8-10 questions targeting long-tail SEO queries
6. Write directly into `src/lib/services-data.ts` — ONLY their assigned service block

Each agent needs the full context: brand data (Core Strategic Consulting, București & Ilfov, 15+ years, 1000+ inspections, Flir E60/MR160/sclerometer), the service's existing data, and the `ServicePageData` type definition.

**Service slugs to dispatch:**
- `verificare-documentatie-tehnica` (technical documentation verification)
- `verificare-elemente-structuri` (structural elements inspection)
- `scanare-termografica` (thermographic scanning)
- `verificare-instalatii` (installations audit)
- `determinare-umiditate` (moisture detection)
- `expertize-tehnice` (technical expertise)

- [ ] **Step 2: Verify TypeScript compiles after all agents complete**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Verify all pages render**

Run:
```bash
for slug in verificare-documentatie-tehnica verificare-elemente-structuri scanare-termografica verificare-instalatii determinare-umiditate expertize-tehnice; do
  echo "$slug: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3001/servicii/$slug)"
done
```
Expected: All return `200`

- [ ] **Step 4: Commit**

```bash
git add src/lib/services-data.ts
git commit -m "feat(servicii): populate whoNeedsThis, risks, reportHighlights, expanded FAQ for all 6 services"
```

---

### Task 8: Final Build Verification

- [ ] **Step 1: Run full TypeScript check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: Build succeeds with all 6 service pages statically generated

- [ ] **Step 3: Run linter**

Run: `npm run lint`
Expected: No errors or warnings related to new files

- [ ] **Step 4: Final commit if any fixes needed**

If any issues were found and fixed in steps 1-3, commit the fixes:
```bash
git add -A
git commit -m "fix(servicii): resolve build issues from service pages enhancement"
```
