# Mobile Spacing Strategy — Core Strategic Consulting

> **Single source of truth for vertical rhythm, horizontal gutters, and inner spacing across every page and component.** Every new or refactored section MUST conform.

**Status:** Authoritative — 2026-04-09
**Scope:** Every route under `src/app/**`, every component under `src/components/**`
**Stack:** Next.js 16 (App Router) · Tailwind v4 · mobile-first

---

## 1. Audit Findings (Why This Doc Exists)

The codebase was audited live (dev server + Playwright) and statically (every section component grep'd for spacing classes). The audit surfaced three structural problems:

### 1.1 Mobile vertical padding is too heavy
Every section currently uses `py-24` (96px) or `py-28` (112px) on mobile. That is **192–224px of dead vertical space per section on a 390px viewport** — roughly 25% of the screen between every content block. This destroys scroll momentum and forces users through empty space on the most important device category.

### 1.2 No `md:` tier — mobile jumps straight to `lg:`
Tailwind overrides in the codebase are `lg:py-32` / `lg:py-36` (≥1024px). There is **no tablet tier**. A 768px iPad inherits the mobile value, which is wrong for that density. Result: iPads get the cramped-for-tablet mobile spacing, phones get desktop-sized whitespace.

### 1.3 Inconsistent baselines within the same tier
Two base values are in the wild with no rule separating them:

| Value | Sections |
|---|---|
| `py-24 lg:py-32` | 22 sections (default) |
| `py-28 lg:py-36` | 8 sections (Pricing, Services, Testimonials, WhyUs, DespreStory, DespreValues, DespreEquipment, Process) |

Heading → content gaps are even worse — **three** different values (`mb-12`, `mb-16`, `mb-20`) used interchangeably across the same page.

| Heading gap | Count | Sections (examples) |
|---|---|---|
| `mb-20` (80px) | 7 | DespreEquipment, DespreValues, Pricing, Process, Services, Testimonials, WhyUs |
| `mb-16` (64px) | 14 | About, Portfolio, Problem, Report, Methodology, RelatedServices, Risk, SolutionSection, WhyCoreStrategic… |
| `mb-12` (48px) | 9 | ContactFAQ, ContactForm, DespreStory, FAQ, Deliverables, Equipment, ServiceFAQ… |

There is no discernible reason why — the same *kind* of section uses different values. This is the single biggest "feels unprofessional" lever on the site.

### 1.4 What IS consistent (and stays)
- **Container:** `px-5 lg:px-8` + `max-w-7xl mx-auto` (44 + 38 + 30 occurrences — clear winner).
- **Card internal padding:** `p-8` is dominant for primary cards, `p-6` for secondary.
- **`gap-2`** is used almost exclusively for inline icon+label pairs.

These patterns are good — the strategy below codifies them rather than replacing them.

---

## 2. The Spacing System

Instead of hand-picking `py-*` values per section, every section and card now uses **named semantic utilities**. All values are defined once, used everywhere.

### 2.1 Tiers

We define **four** breakpoints for spacing (Tailwind defaults):

```
Mobile     <  640px   (base, no prefix)
SM         ≥  640px   (large phones / small tablet portrait)
MD         ≥  768px   (tablet)
LG         ≥ 1024px   (small desktop)
```

`xl:` and `2xl:` are **not** used for spacing — the `lg:` value is the ceiling. This prevents runaway whitespace on 4K monitors.

### 2.2 The Scale (memorise this)

| Token | Mobile | SM (≥640) | MD (≥768) | LG (≥1024) | Meaning |
|---|---|---|---|---|---|
| **Section V-padding (primary)** | `py-14` / 56px | `py-16` / 64 | `py-20` / 80 | `py-28` / 112 | Default for every full-width section |
| **Section V-padding (dense)** | `py-10` / 40 | `py-12` / 48 | `py-14` / 56 | `py-20` / 80 | Short sections: CTA banners, logo strips, trust strips |
| **Section V-padding (hero)** | `pt-28 pb-16` | `pt-32 pb-20` | `pt-36 pb-24` | `pt-40 pb-32` | Any `*Hero.tsx` — accounts for fixed header |
| **Heading → content** | `mb-10` / 40 | `mb-12` / 48 | `mb-12` / 48 | `mb-16` / 64 | The gap after the heading block before the grid/cards |
| **Content block → block** | `mb-8` / 32 | `mb-10` / 40 | `mb-10` / 40 | `mb-12` / 48 | Between two major content blocks inside the same section |
| **Grid gap (cards)** | `gap-4` / 16 | `gap-5` / 20 | `gap-6` / 24 | `gap-8` / 32 | Card grids, feature grids |
| **Grid gap (columns)** | `gap-8` / 32 | `gap-10` / 40 | `gap-12` / 48 | `gap-16` / 64 | 2-col layouts (image + text) |
| **Card internal padding (primary)** | `p-6` / 24 | `p-6` / 24 | `p-7` / 28 | `p-8` / 32 | Pricing cards, testimonial cards, feature cards |
| **Card internal padding (dense)** | `p-4` / 16 | `p-5` / 20 | `p-5` / 20 | `p-6` / 24 | Compact list items, stat cards |
| **Horizontal gutter** | `px-5` / 20 | `px-6` / 24 | `px-6` / 24 | `px-8` / 32 | Container `px-*` — unchanged, this is what works |
| **Container max-width** | — | — | — | `max-w-7xl` | Stays |
| **Inline label → title** | `mb-3` / 12 | `mb-3` | `mb-4` | `mb-4` | The eyebrow-to-h2 gap |
| **Title → subtitle** | `mb-4` / 16 | `mb-4` | `mb-5` | `mb-6` | h2-to-description gap |

### 2.3 Why these numbers

- **`py-14` (56px) mobile section padding** was chosen after measuring: 56px top + 56px bottom = 112px total between section content boundaries. On a 844px-tall iPhone 14 viewport, that's ~13% of screen — enough breathing room for premium feel, tight enough for momentum. Current `py-24` is 23% (2× too much).
- **Four tiers instead of two** fixes the tablet gap. At 768px (iPad portrait), `md:py-20` gives 80px — halfway between mobile and desktop, which is right for that density.
- **`lg:py-28` is the ceiling** (not `py-32` or `py-36`). The site is editorial/premium but uses a fixed header and a dark palette — excessive whitespace reads as "unfinished" on dark backgrounds rather than "luxurious."
- **Single heading→content value per tier** eliminates the mb-12/16/20 chaos. One rule. No exceptions.

---

## 3. Canonical Snippets

Copy-paste these verbatim. Do not invent variants.

### 3.1 Standard section shell

```tsx
<section className="relative overflow-hidden bg-black-rich py-14 sm:py-16 md:py-20 lg:py-28">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
    {/* heading block */}
    <div className="mb-10 sm:mb-12 lg:mb-16 text-center">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
        Eyebrow
      </p>
      <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,5vw,2.5rem)] font-bold text-white lg:mb-6">
        Section title
      </h2>
      <p className="max-w-2xl text-base text-grey-300 lg:text-lg">
        Short description.
      </p>
    </div>

    {/* content grid */}
    <div className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* cards */}
    </div>
  </div>
</section>
```

### 3.2 Two-column (image + text) section

```tsx
<section className="relative overflow-hidden bg-black-soft py-14 sm:py-16 md:py-20 lg:py-28">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
    <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
      <div>{/* text */}</div>
      <div>{/* image */}</div>
    </div>
  </div>
</section>
```

### 3.3 Dense section (CTA banner, trust strip)

```tsx
<section className="relative overflow-hidden bg-black-pure py-10 sm:py-12 md:py-14 lg:py-20">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
    {/* short content */}
  </div>
</section>
```

### 3.4 Hero section

```tsx
<section className="grain-overlay relative flex min-h-[85vh] items-center overflow-hidden bg-black-pure pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 lg:pt-40 lg:pb-32">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
    {/* hero content */}
  </div>
</section>
```

### 3.5 Primary card

```tsx
<div className="rounded-2xl border border-white/5 bg-black-elevated p-6 md:p-7 lg:p-8">
  {/* card content */}
</div>
```

---

## 4. Rules (Non-Negotiable)

1. **No raw `py-*` / `mb-*` values outside this scale.** If you reach for `py-24` or `mb-20`, you are breaking the system. If the system truly does not cover your case, this doc gets updated — not the component.
2. **Every section must declare all four tiers** of vertical padding (`py-14 sm:py-16 md:py-20 lg:py-28`), not just mobile + lg. The `md:` tier is mandatory.
3. **Heading→content gap is one value per tier.** No hand-picking `mb-20` because "it looks better here."
4. **Containers are `px-5 sm:px-6 lg:px-8` + `max-w-7xl mx-auto`.** No `px-3`, no `px-4`, no `px-10`.
5. **Card padding follows 3.5 exactly** — `p-6 md:p-7 lg:p-8` for primary, `p-4 md:p-5 lg:p-6` for dense.
6. **Grid gaps use the scale in §2.2.** A 3-col grid of cards is always `gap-4 sm:gap-5 md:gap-6 lg:gap-8`. A 2-col layout is always `gap-8 md:gap-12 lg:gap-16`.
7. **`lg:` is the ceiling.** No `xl:py-*` or `2xl:py-*` for section spacing. Content grows, whitespace doesn't.
8. **Hero sections are the only exception** to the py-14 baseline — they use asymmetric `pt-* pb-*` because of the fixed header.
9. **`prefers-reduced-motion`** is already respected in animations — spacing is independent of this and stays static.
10. **No margin collapse tricks.** Use padding on section + margin on heading block. Never add `my-*` to a section element.

---

## 5. Migration Plan (Diff Per File)

All 34 section files need touchups. The diff is mechanical — it's the same three-class rewrite in each. Apply in this order so visual regressions are caught page-by-page.

### Phase 1 — Homepage (blocks the most critical traffic)

| File | Current | → New |
|---|---|---|
| `src/components/home/HeroSection.tsx` | fixed inset, custom | `pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 lg:pt-40 lg:pb-32` (if not fixed) |
| `src/components/home/TrustStrip.tsx` | (dense) | `py-10 sm:py-12 md:py-14 lg:py-20` |
| `src/components/home/ProblemSection.tsx` | `py-24 lg:py-32` | `py-14 sm:py-16 md:py-20 lg:py-28` + `mb-10 sm:mb-12 lg:mb-16` on heading |
| `src/components/home/AboutSection.tsx` | `py-24 lg:py-32` | same |
| `src/components/home/ServicesSection.tsx` | `py-28 lg:py-36` | same |
| `src/components/home/ProcessSection.tsx` | `py-24 lg:py-36` | same, drop `lg:mb-28` on heading |
| `src/components/home/ReportSection.tsx` | `py-24 lg:py-32` | same |
| `src/components/home/PricingSection.tsx` | `py-28 lg:py-36` | same |
| `src/components/home/PortfolioSection.tsx` | `py-24 lg:py-32` | same |
| `src/components/home/TestimonialsSection.tsx` | `py-28 lg:py-36` | same |
| `src/components/home/WhyUsSection.tsx` | `py-28 lg:py-36` | same |
| `src/components/home/FAQSection.tsx` | `py-24 lg:py-32` | same |
| `src/components/home/CTASection.tsx` | `py-24 lg:py-32` | same (or dense if it's a banner — review) |

### Phase 2 — Service pages

All 12 files in `src/components/servicii/`: same rewrite. Additionally:
- `WhyCoreStrategic.tsx`: stats grid `grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8` → `grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-4 lg:gap-8`
- `SolutionSection.tsx`, `MethodologyStepper.tsx`: the inline `mb-16` on images → `mb-10 sm:mb-12 lg:mb-16`

### Phase 3 — Despre Noi

5 files. Same rewrite. `DespreStory`, `DespreValues`, `DespreEquipment` all currently `py-28 lg:py-36` → drop to `py-14 sm:py-16 md:py-20 lg:py-28`.

### Phase 4 — Contact

4 files. Same rewrite. `ContactHero.tsx` needs the hero variant, not the section variant.

### Phase 5 — Global card sweep

Grep for `p-8`, `p-7`, `p-6` inside card-like containers (rounded borders) and apply the card scale from §3.5. Approximate scope: ~20 replacements.

### Phase 6 — Verification

1. `npm run dev` and walk every route at 390px, 768px, 1024px, 1440px in DevTools device emulation.
2. Lighthouse mobile on `/`, `/servicii/[slug]`, `/contact`. CLS must stay < 0.1.
3. `npx tsc --noEmit` — must stay clean.
4. Compare before/after screenshots per section — look for sections that now feel too tight (unlikely but possible on long text blocks — remedy is `md:py-20 lg:py-28` staying, not going back to `py-24` mobile).

---

## 6. Enforcement

- **PR review:** any `py-2[0-9]` / `py-3[0-9]` without the full 4-tier prefix set is a blocking comment.
- **New sections:** start from the §3.1 snippet. Don't compose from scratch.
- **When in doubt:** use the "standard section shell" — it's correct for ~90% of cases.

---

## 7. Open Items / Future Work

- **Tailwind v4 `@theme` custom utilities:** once the migration stabilises, these scales should be lifted into `globals.css` as named utilities (`py-section`, `mb-heading`, `gap-cards`) so they can't drift. For now, the raw classes are authoritative — promotion to utilities is a second pass.
- **Live mobile verification:** once `mcp__playwright__*` tools load (after Claude Code session restart), a pixel-diff pass at 375/390/414px against the strategy screenshots should be run. The static audit behind this doc is sufficient to begin implementation, but visual confirmation is still owed.
- **Custom hero padding:** `HeroSection.tsx` currently uses `fixed inset-0 h-screen`. Confirm whether that's intentional for scroll-pin behaviour before retrofitting the hero token — if it stays fixed, the hero token applies to `DespreHero`/`ContactHero`/`ServiceHero` only.
