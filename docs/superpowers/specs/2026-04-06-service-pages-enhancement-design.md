# Service Pages Enhancement — Design Spec

**Date:** 2026-04-06
**Project:** Core Strategic Consulting — Service Pages
**Goal:** Add 5 new sections to each service page for deeper content, trust signals, and SEO. No changes to existing component design/styling — only new sections and expanded data.

---

## Context

Current service page flow (8 sections):
```
Hero → Concern → Solution → Methodology → Equipment → Deliverables → CTABanner → RelatedServices → FAQ → ClosingCTA
```

Brand data available: 15+ years construction experience, 1000+ properties inspected, Flir E60 + MR160 equipment, hydroinsulation specialization, 25-35 page reports with IN/NI/NP/D scoring system, București & Ilfov coverage.

6 service slugs: `verificare-documentatie-tehnica`, `verificare-elemente-structuri`, `scanare-termografica`, `verificare-instalatii`, `determinare-umiditate`, `expertize-tehnice`.

---

## New Page Flow

```
Hero (existing)
ConcernSection (existing)
NEW: WhoNeedsThisSection — buyer personas & scenarios
NEW: RiskAvoidanceSection — real costs of NOT inspecting
SolutionSection (existing)
MethodologyStepper (existing)
EquipmentSection (existing)
NEW: ServiceReportPreview — service-specific report mockup
DeliverablesSection (existing)
CTABanner (existing)
NEW: WhyCoreStrategic — shared trust block
RelatedServices (existing)
ServiceFAQ (existing, expanded data)
ServiceCTA (existing)
```

---

## 1. WhoNeedsThisSection

**Purpose:** Address "is this service for me?" — the #1 question both first-time buyers and investors have. Each persona maps to a search intent cluster.

**Data model — new field on `ServicePageData`:**
```typescript
whoNeedsThis: { persona: string; scenario: string }[]
```

3-4 personas per service. Examples for `verificare-elemente-structuri`:
- `{ persona: 'Cumpărător Apartament Nou', scenario: 'Vrei confirmarea că dezvoltatorul a respectat proiectul structural și armarea este conformă.' }`
- `{ persona: 'Proprietar Casă Veche', scenario: 'Observi fisuri în pereți sau tavane și vrei să știi dacă sunt structurale sau cosmetice.' }`
- `{ persona: 'Investitor Imobiliar', scenario: 'Evaluezi un imobil pentru renovare și ai nevoie de starea reală a structurii pentru bugetare.' }`

**Component:** `src/components/servicii/WhoNeedsThisSection.tsx`
- "use client" for GSAP scroll animations
- Props: `service: ServicePageData`
- Layout: Section heading + grid of persona cards (icon derived from persona name or generic user icon, persona title bold, scenario text below)
- Styling: Follow existing design system — `bg-black-soft` cards, `border-grey-500/15`, gold accent on hover, staggered GSAP reveal
- Heading: "Cine Are Nevoie de {service.title}?"

---

## 2. RiskAvoidanceSection

**Purpose:** Fear-of-loss content — the most powerful conversion driver. Shows concrete financial consequences of skipping the inspection. Targets "cost of NOT doing it" search intent.

**Data model — new field on `ServicePageData`:**
```typescript
risks: { title: string; cost: string; desc: string }[]
```

3-4 risks per service. Examples for `scanare-termografica`:
- `{ title: 'Punți termice nedetectate', cost: '€200-400/an', desc: 'Pierderi de căldură permanente care cresc factura la energie an de an, fără să știi de ce.' }`
- `{ title: 'Mucegai ascuns în pereți', cost: '€2.000-5.000', desc: 'Izolația deficitară creează condens → mucegai → probleme respiratorii și remediere costisitoare.' }`

**Component:** `src/components/servicii/RiskAvoidanceSection.tsx`
- "use client" for GSAP
- Props: `service: ServicePageData`
- Layout: Section heading + risk cards in a grid. Each card shows: title, cost in gold/red accent, description
- Styling: Slightly more dramatic — perhaps `bg-black-rich` background, red-tinted cost badges to signal danger, gold border on hover
- Heading: "Ce Riscuri Eviți cu {service.title}?"
- Bottom line: A summary sentence reinforcing that the inspection cost is a fraction of these risks

---

## 3. ServiceReportPreview

**Purpose:** Show what you actually GET — adapted from the homepage `ReportSection` but contextualized per service. Builds trust by showing professionalism and thoroughness.

**Data model — new field on `ServicePageData`:**
```typescript
reportHighlights: string[]
```

5-7 highlights per service describing what's in the report for THIS specific service. Examples for `determinare-umiditate`:
- `'Hartă de umiditate pe zone cu valori procentuale'`
- `'Termograme corelate cu măsurători higrometrice'`
- `'Identificarea sursei exacte (acoperiș, fațadă, fundație, conducte)'`

**Component:** `src/components/servicii/ServiceReportPreview.tsx`
- "use client" for GSAP
- Props: `service: ServicePageData`
- Layout: Two-column — left: simplified report mockup (adapted from homepage ReportSection mockup style, showing service-specific table of contents), right: highlights checklist with CheckCircle2 icons
- Reuses the visual language from `ReportSection.tsx`: report card with FileText icon, scoring bar, stacked paper effect
- Styling: `bg-black-elevated`, gold accents, same report card design language
- Heading: "Ce Primești în Raportul de {service.title}"

---

## 4. WhyCoreStrategic (Shared Component)

**Purpose:** Trust block — same on every service page. Answers "why should I choose you over competitors?" Pulls from existing brand data in constants.

**No new data on ServicePageData** — this is a shared component using constants/hardcoded brand data.

**Component:** `src/components/servicii/WhyCoreStrategic.tsx`
- "use client" for GSAP
- Props: none (uses constants directly)
- Content (hardcoded from existing brand data):
  - Stats row: `15+ Ani Experiență` | `1.000+ Proprietăți Inspectate` | `48h Raport Livrat` | `100% Clienți Mulțumiți`
  - 4 differentiator cards:
    1. Experiență directă în construcții (not just inspection — built and waterproofed buildings)
    2. Echipamente profesionale (Flir E60, MR160, sclerometer — not phone attachments)
    3. Rapoarte detaliate (25-35 pages, IN/NI/NP/D system, cost estimates)
    4. Consultanță post-inspecție (price negotiation support, remediation guidance)
- Layout: Stats bar at top, then 2x2 card grid below
- Styling: `bg-black-soft` section, gold stat values, cards with icon + title + description
- Heading: "De Ce Core Strategic?"

---

## 5. Expanded FAQ Data

**No new component** — existing `ServiceFAQ` component handles rendering. Just expand the `faq` array in each service's data from 4-6 questions to 8-10 questions, adding educational/informational queries that target long-tail SEO.

Additional FAQ topics to cover per service:
- Pricing/cost questions ("Cât costă...?")
- Timing questions ("Când este cel mai bun moment...?")
- Comparison questions ("Care este diferența între...?")
- Process questions ("Ce se întâmplă dacă...?")
- Legal/normative questions ("Este obligatorie...?")

---

## Data Population Strategy

Each service's new data fields (`whoNeedsThis`, `risks`, `reportHighlights`, expanded `faq`) will be populated using SEO research agents run in parallel — one agent per service. Each agent will:
1. Research Romanian search queries for that specific service domain
2. Identify real buyer personas and their search intent
3. Find concrete risk/cost data relevant to that service
4. Generate report highlights specific to the service deliverables
5. Expand FAQ with high-volume search queries
6. Write the data directly into `services-data.ts`

---

## Type Changes

```typescript
// In ServicePageData, ADD:
whoNeedsThis: { persona: string; scenario: string }[]
risks: { title: string; cost: string; desc: string }[]
reportHighlights: string[]
// faq array stays same type, just more entries
```

---

## File Changes Summary

| File | Change |
|------|--------|
| `src/lib/services-data.ts` | Add 3 new fields to type + populate data for all 6 services |
| `src/components/servicii/WhoNeedsThisSection.tsx` | New component |
| `src/components/servicii/RiskAvoidanceSection.tsx` | New component |
| `src/components/servicii/ServiceReportPreview.tsx` | New component |
| `src/components/servicii/WhyCoreStrategic.tsx` | New shared component |
| `src/app/servicii/[slug]/page.tsx` | Add 4 new sections to page layout |

No changes to existing components. No design system changes. No new dependencies.
