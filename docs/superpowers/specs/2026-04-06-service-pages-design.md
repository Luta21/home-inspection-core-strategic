# Service Pages Design Spec

**Date:** 2026-04-06
**Project:** Core Strategic Consulting — Home Inspector Website
**Scope:** 6 individual service pages at `/servicii/[slug]`

---

## 1. Overview

Each of the 6 services gets its own immersive long-scroll page that functions as a standalone conversion funnel. Pages share a common 10-section structure but contain unique content per service. Design follows the existing dark luxury aesthetic (black + gold, Playfair Display + Inter, GSAP ScrollTrigger animations, Lenis smooth scroll).

### Pages

| Route | Service |
|-------|---------|
| `/servicii/verificare-documentatie-tehnica` | Verificarea documentatiei tehnice |
| `/servicii/verificare-elemente-structuri` | Verificare elemente structuri |
| `/servicii/scanare-termografica` | Scanare termografica |
| `/servicii/verificare-instalatii` | Verificare instalatii |
| `/servicii/determinare-umiditate` | Determinare umiditate structuri |
| `/servicii/expertize-tehnice` | Expertize tehnice |

### Routing

Dynamic route at `app/servicii/[slug]/page.tsx` using `generateStaticParams()` from the SERVICES constant. Each page is statically generated at build time.

---

## 2. Section-by-Section Specification

### Section 01 — Full-Width Cinematic Hero

**Layout:** Full viewport height, centered text, dark background with grain overlay.

**Content per service:**
- Gold label: service category (e.g., "Serviciu Premium", "Inspectie Specializada")
- Headline: Playfair Display, `clamp(2rem, 4vw, 3.5rem)`, white with one gold-accented line
- Subheadline: Inter, `text-base`, grey-300, max-width 560px, 1-2 sentences
- Dual CTAs: primary gold button ("Programeaza Inspectia") + outline button (phone number)
- Trust stats strip at bottom: 3 inline stats from STATS constant (1000+, 15+, 48h)
- Scroll indicator: animated gold vertical line at bottom center

**Animation:** GSAP staggered text reveal (label > headline > subheadline > CTAs > stats), matching homepage hero pattern with `cubic-bezier(0.16, 1, 0.3, 1)` easing.

**Component:** `components/servicii/ServiceHero.tsx` ("use client")

### Section 02 — Informative Concern

**Layout:** Two-column on desktop (text left, data points right), single column on mobile.

**Content per service:**
- Section label: gold uppercase "De Ce Conteaza"
- Heading: "De ce este importanta [service name]?"
- Body: 2-3 paragraphs explaining risks in professional, educational tone. No fear-mongering — position as knowledgeable advisor.
- Right column: 3 data point cards with gold numbers and brief labels (e.g., "73% din proprietati au defecte ascunse", "Costul mediu al remedierii: 5.000-15.000 EUR")

**Animation:** GSAP scroll reveal — text fades in from left, data cards stagger from right.

**Component:** `components/servicii/ConcernSection.tsx` ("use client")

### Section 03 — Solution Overview

**Layout:** Centered heading + 3-4 benefit items in a grid.

**Content per service:**
- Section label: gold uppercase "Solutia Noastra"
- Heading: What this service does (1 sentence)
- Benefits grid: 3-4 items, each with Lucide icon in gold-tinted box, title, and 1-line description
- Gold divider line below heading (matching homepage pattern: `h-[2px] w-16 bg-gold`)

**Animation:** Heading reveal, then benefits grid stagger with `ANIM.stagger.normal`.

**Component:** `components/servicii/SolutionSection.tsx` ("use client")

### Section 04 — Interactive Horizontal Stepper (Methodology)

**Layout:** Horizontal numbered circles connected by a gold line. Active step's content panel displayed below.

**Behavior:**
- 4-6 steps per service (defined in service data)
- On scroll, each step activates sequentially via ScrollTrigger with `scrub`
- Gold line fills progressively left-to-right as user scrolls
- Active step circle fills with gold, content panel transitions below
- On mobile: vertical layout with the same progressive activation

**Content per step:** Step number, title, 2-3 sentence description.

**Animation:** GSAP ScrollTrigger with `scrub: 1.5`. Pin the section while steps animate. Gold line `scaleX` from 0 to 1 mapped to scroll progress. Content panel crossfades between steps.

**Component:** `components/servicii/MethodologyStepper.tsx` ("use client")

### Section 05 — Equipment Horizontal Scroll Cards

**Layout:** Horizontal scrollable row of tool cards. Peek of next card visible to create scroll affordance.

**Content per service:** 2-4 tools, each card contains:
- Lucide icon (no emojis) in gold-tinted container
- Tool name and model (e.g., "Flir E60")
- Tool type label in gold (e.g., "Camera Termografica")
- One-line specs (e.g., "Rezolutie 320x240, sensibilitate 0.05 C")

**Card style:** Matches homepage card aesthetic — `bg-gradient-to-b from-black-elevated to-black-soft/80`, `border border-grey-500/15`, rounded-2xl. Gold border on hover.

**Animation:** Cards stagger-enter from right on scroll. Subtle parallax on scroll within the horizontal container.

**Mobile:** Full-width cards, swipeable horizontal scroll with snap.

**Component:** `components/servicii/EquipmentSection.tsx` ("use client")

### Section 06 — Deliverables Checklist

**Layout:** Centered heading + vertical checklist.

**Content per service:** 5-8 items showing everything the client receives:
- Gold checkmark icon (Lucide `Check` or `CheckCircle`) per item
- Item title in white, optional subtitle in grey
- Examples: "Raport PDF detaliat (25-30 pagini)", "Documentatie foto cu adnotari", "Estimare costuri remediere", "Recomandari tehnice prioritizate", "Consultanta post-inspectie"

**Animation:** Checkmarks and items stagger-reveal on scroll, each check icon scales from 0 with `elastic.out` ease.

**Component:** `components/servicii/DeliverablesSection.tsx` ("use client")

### Section 07 — CTA Banner (Mid-Page)

**Reuses:** Existing `components/ui/CTABanner.tsx` component.

**Content:** Service-specific headline and subtext. Example for thermography:
- Headline: "Detecteaza problemele ascunse inainte sa fie prea tarziu."
- Subtext: "Programeaza o scanare termografica si primeste raportul in 48h."

### Section 08 — Related Services Card Row

**Layout:** 3 cards in a row (responsive: 1 column mobile, 3 columns desktop).

**Logic:** Show 3 services from SERVICES constant, excluding the current service. Selection can be the next 3 in array order (wrapping around).

**Card style:** Matches homepage ServicesSection cards — Lucide icon, gold accent line, title, short description, "Afla mai multe" arrow link. Same hover effects (border-gold/25, shadow glow).

**Animation:** GSAP stagger entrance + parallax tilt on hover (reuse `handleMouseMove`/`handleMouseLeave` pattern from ServicesSection).

**Component:** `components/servicii/RelatedServices.tsx` ("use client")

### Section 09 — Service-Specific FAQ

**Layout:** Accordion, matching homepage FAQSection pattern.

**Content:** 4-6 unique questions per service targeting long-tail SEO keywords. Each answer 2-4 sentences.

**Animation:** Reuses FAQSection expand/collapse pattern with gold chevron icons.

**Component:** Reuse/extend existing `components/home/FAQSection.tsx` to accept custom FAQ items as props, or create `components/servicii/ServiceFAQ.tsx`.

### Section 10 — Final CTA Section

**Reuses:** Existing `components/home/CTASection.tsx` pattern.

**Content:** Service-specific closing headline. Phone + WhatsApp + schedule links.

---

## 3. Data Architecture

### Extended SERVICES Constant

Each service object in `lib/constants.ts` needs additional fields:

```typescript
type ServicePage = {
  // Existing fields
  slug: string
  title: string
  shortDesc: string
  icon: string

  // New fields for service pages
  heroLabel: string           // Gold label above headline
  heroHeadline: string        // Main headline (can include gold-wrapped word)
  heroSubheadline: string     // 1-2 sentence description
  concernHeading: string      // "De ce este importanta..."
  concernBody: string[]       // 2-3 paragraphs
  concernStats: { value: string; label: string }[]  // 3 data points
  benefits: { icon: string; title: string; desc: string }[]  // 3-4 items
  methodology: { title: string; desc: string }[]  // 4-6 steps
  equipment: { icon: string; name: string; type: string; specs: string }[]
  deliverables: string[]      // Checklist items
  ctaHeadline: string         // Mid-page CTA
  ctaSubtext: string
  faq: { question: string; answer: string }[]  // 4-6 items
  closingHeadline: string     // Final CTA heading

  // SEO
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
}
```

### Service Page Data Files

Service-specific content will be defined in `lib/services-data.ts` to keep `constants.ts` clean. This file exports a `SERVICE_PAGES` map keyed by slug.

---

## 4. SEO Per Page

Each service page gets:

- Unique `<title>`: "[Service Name] | Core Strategic Consulting"
- Unique `<meta description>`: Service-specific, includes location keywords
- Canonical URL: `https://corestrategic.ro/servicii/[slug]`
- Open Graph tags with service-specific title and description
- JSON-LD `Service` schema nested under the existing `ProfessionalService` organization
- Internal links to 3 related services (Section 08)
- FAQ structured data (`FAQPage` schema) from Section 09

### JSON-LD Per Service Page

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Scanare Termografica Profesionala",
  "description": "...",
  "provider": { "@id": "https://corestrategic.ro/#organization" },
  "areaServed": { "@type": "City", "name": "Bucuresti" },
  "url": "https://corestrategic.ro/servicii/scanare-termografica"
}
```

---

## 5. Component Architecture

```
app/servicii/[slug]/page.tsx          — Server Component, generateStaticParams, metadata
components/servicii/
  ServiceHero.tsx                     — "use client", GSAP staggered reveal
  ConcernSection.tsx                  — "use client", GSAP scroll reveal
  SolutionSection.tsx                 — "use client", GSAP stagger grid
  MethodologyStepper.tsx              — "use client", GSAP ScrollTrigger scrub + pin
  EquipmentSection.tsx                — "use client", horizontal scroll + GSAP stagger
  DeliverablesSection.tsx             — "use client", GSAP elastic checkmarks
  RelatedServices.tsx                 — "use client", GSAP parallax tilt cards
  ServiceFAQ.tsx                      — "use client", accordion (or reuse FAQSection)
  ServiceJsonLd.tsx                   — Server Component, JSON-LD script tag
lib/
  services-data.ts                    — SERVICE_PAGES data map
```

The page component (`app/servicii/[slug]/page.tsx`) is a Server Component that:
1. Looks up service data by slug
2. Generates metadata via `generateMetadata()`
3. Renders all sections, passing service-specific data as props
4. Wraps in SmoothScrollProvider, Header, Footer

---

## 6. Design Constraints

- **No emojis** — Lucide icons only, everywhere
- **Dark luxury palette** — black backgrounds, gold accents, white text
- **Typography** — Playfair Display for headings, Inter for body, JetBrains Mono for stats
- **GSAP patterns** — `useGSAP` hook, `ANIM` constants, `prefers-reduced-motion` check in every component
- **Lenis smooth scroll** — all pages wrapped in SmoothScrollProvider
- **Server Components by default** — "use client" only for GSAP/interactivity
- **Mobile-first responsive** — all sections work at 375px, 768px, 1280px
- **Grain overlay** — consistent with homepage texture
- **Performance** — images via next/image, static generation, no client-side data fetching

---

## 7. Pages Content Scope

Each of the 6 services needs unique content for:
- Hero headline + subheadline (2 lines)
- Concern section (2-3 paragraphs + 3 stats)
- 3-4 benefits with descriptions
- 4-6 methodology steps with descriptions
- 2-4 equipment items with specs
- 5-8 deliverable items
- CTA headline + subtext
- 4-6 FAQ questions with answers
- Closing headline
- SEO meta title, description, keywords

Content will be sourced from the reference site (consultanttehnic.ro/servicii/) and adapted for Core Strategic's brand voice.
