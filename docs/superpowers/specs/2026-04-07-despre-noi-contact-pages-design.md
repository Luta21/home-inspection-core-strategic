# Despre Noi & Contact Pages — Design Spec

**Date:** 2026-04-07
**Scope:** Two new immersive pages for Core Strategic Consulting

---

## Shared Patterns

Both pages follow existing site conventions:
- `SmoothScrollProvider` wrapper with Lenis
- `Header` + `Footer` layout components
- Dark cinematic aesthetic (black-pure/black-rich backgrounds, gold accents)
- GSAP animations via `useGSAP` hook with `prefers-reduced-motion` checks
- Animation constants from `@/lib/animations` (ANIM object)
- `grain-overlay` texture on hero sections
- Font system: Playfair Display (headings), Inter (body)
- All components are `"use client"` when using GSAP/hooks

---

## Page 1: Despre Noi (`/despre-noi`)

**Route:** `src/app/despre-noi/page.tsx`
**Components directory:** `src/components/despre-noi/`

### Metadata

```
title: "Despre Noi — Cine Suntem | Core Strategic Consulting"
description: "Echipa Core Strategic Consulting — 15+ ani experiență în inspecție tehnică imobiliară. Echipamente profesionale Flir, metodologie riguroasă, peste 1000 proprietăți inspectate în București și Ilfov."
keywords: inspectie tehnica imobiliara bucuresti, echipa inspectie imobiliara, core strategic consulting despre noi, inspector tehnic imobil experienta
canonical: SITE.url + '/despre-noi'
```

### JSON-LD

- `AboutPage` schema type
- `BreadcrumbList`: Acasă → Despre Noi

### Section 1: Hero (`DespreHero.tsx`)

- Full viewport height (`min-h-[85vh]`), dark background
- Background: `IMAGES.aboutTeam` with 30% black overlay (matching service hero pattern)
- Gold accent line (2px, 16w, animated scaleX from left)
- Eyebrow `<p>`: "Core Strategic Consulting"
- H1: "Pasiunea Pentru Detalii Care Protejează Investiția Ta"
- Subtitle paragraph: brief mission statement
- Scroll indicator (ChevronDown icon, opacity pulse)
- GSAP timeline: gold line → eyebrow → h1 words stagger → subtitle → scroll indicator

### Section 2: Story (`DespreStory.tsx`)

- Split layout: text left (60%), image right (40%) on desktop. Stacked on mobile.
- Left side:
  - Gold eyebrow: "Povestea Noastră"
  - H2: "De La Pasiune La Misiune"
  - 2-3 paragraphs telling the founder's story: gap in Romanian real estate market (buying without inspection), decision to bring professional home inspection to București, building the team and investing in equipment
- Right side:
  - Atmospheric image (`IMAGES.aboutTeam`) with rounded corners
  - Floating stat badge overlay (bottom-right): "1000+ Proprietăți Inspectate" — dark bg, gold text, slight shadow
- GSAP: text reveals from left, image reveals from right, stat badge pops with elastic ease

### Section 3: Mission & Values (`DespreValues.tsx`)

- Section background: `black-soft` (alternating from story section)
- Gold eyebrow centered: "Valorile Noastre"
- H2 centered: "Principii Care Ne Ghidează"
- 3 cards in a row (mobile stacked), gap-8:
  - **Transparență** — Shield icon — "Rapoarte detaliate cu fotografii, fără informații ascunse. Clientul vede exact ce vedem noi."
  - **Precizie** — Crosshair icon — "Echipamente profesionale Flir de ultimă generație și metodologie standardizată pentru fiecare inspecție."
  - **Protecție** — ShieldCheck icon — "Misiunea noastră este să te protejăm de surprize costisitoare după achiziția unui imobil."
- Card style: dark elevated background (`black-elevated`), gold icon, white title, grey-200 description, subtle border gold/10
- GSAP: stagger cards from bottom (y: 60, opacity: 0, stagger: 0.15)

### Section 4: Equipment Showcase (`DespreEquipment.tsx`)

- Gold eyebrow centered: "Echipamente Profesionale"
- H2 centered: "Tehnologie de Ultimă Generație"
- Grid of 3 cards (desktop row, mobile stacked):
  - **Flir E60** — Camera termografică — "Detectare punți termice, infiltrații ascunse și pierderi de căldură cu rezoluție 320×240 pixeli infraroșu"
  - **Flir MR160** — Higrometru profesional — "Măsurare precisă a umidității în structuri, identificare surse infiltrații cu ghidare termică"
  - **Sclerometru** — Testare beton — "Determinare grad beton prin impact controlat, verificare rezistență elemente structurale"
- Card style: larger cards with icon area (top), equipment name (bold, white), type (gold, small), specs paragraph (grey-200)
- GSAP: stagger entrance, each card slides up

### Section 5: Stats Counter (`DespreStats.tsx`)

- Full-width section, black-pure background
- Reuse `STATS` data from constants: 1000+, 15+, 48h, 100%
- 4 columns centered (2x2 on mobile)
- Each stat: large animated counter (gold-gradient text, Playfair font, ~4rem), suffix, label below (grey-200)
- GSAP: ScrollTrigger-driven counter animation — numbers count from 0 to target value over 2 seconds on scroll into view
- Gold separator lines between stats on desktop

### Section 6: CTA

- Reuse `<CTABanner>` component
- headline: "Pregătit Să Îți Protejezi Investiția?"
- subtext: "Programează o inspecție tehnică și primește raportul detaliat în 48h."

---

## Page 2: Contact (`/contact`)

**Route:** `src/app/contact/page.tsx`
**Components directory:** `src/components/contact/`

### Metadata

```
title: "Contact — Programează Inspecția | Core Strategic Consulting"
description: "Contactează Core Strategic Consulting pentru o inspecție tehnică imobiliară în București și Ilfov. Sună: 0769 833 269 sau trimite un mesaj pe WhatsApp. Răspundem în maxim 2 ore."
keywords: contact inspectie tehnica imobiliara, programare inspectie apartament bucuresti, telefon inspector tehnic imobil
canonical: SITE.url + '/contact'
```

### JSON-LD

- `ContactPage` schema type
- `BreadcrumbList`: Acasă → Contact

### Section 1: Hero CTA (`ContactHero.tsx`)

- Dark cinematic hero, `min-h-[60vh]`, centered content
- Background: subtle grid pattern (matching service hero) + grain overlay
- Gold accent line animated
- Eyebrow `<p>`: "Contact"
- H1: "Contactează-ne Pentru o Inspecție Tehnică Imobiliară"
- Primary phone large and tappable: `<a href="tel:+40769833269">0769 833 269</a>` — large font (~2.5rem), gold-gradient text, with Phone icon, pulse animation on the icon
- WhatsApp button next to it: green accent, opens `wa.me/40769833269`
- Below (smaller, grey-200):
  - Secondary phone: "Lucian: 0727 224 230" with tel: link
  - Email: "contact@corestrategicconsulting.com" with mailto: link
- GSAP: staggered reveal of all elements

### Section 2: Contact Form (`ContactForm.tsx`)

- Section background: black-soft
- Gold eyebrow: "Trimite-ne un Mesaj"
- H2: "Solicită o Ofertă Personalizată"
- Form fields (staggered GSAP reveal on scroll):
  - **Nume** — text input, required
  - **Telefon** — tel input, required
  - **Email** — email input, optional
  - **Tip Proprietate** — select dropdown: Apartament / Casă / Vilă / Spațiu Comercial
  - **Mesaj** — textarea, optional, 4 rows
- Input styling: dark background (black-elevated), border grey-500/20, focus: border-gold, text-white, placeholder grey-400
- Submit button: gold gradient background (btn-shimmer class), uppercase tracking-wider, "Trimite Mesajul" text
- **On submit behavior:**
  - Collect form data
  - Open WhatsApp (`wa.me/40769833269`) with pre-filled message: "Bună ziua, mă numesc {Nume}. Doresc o inspecție pentru {Tip Proprietate}. {Mesaj}. Contact: {Telefon}, {Email}"
  - Form structure prepared for future Resend Server Action (form wrapped in `<form action={serverAction}>`)
- Success state: animated checkmark + "Mesaj trimis! Vă contactăm în maxim 2 ore."
- GSAP: fields stagger in from bottom (y: 30, opacity: 0, stagger: 0.1)

### Section 3: Contact Info Cards (`ContactInfo.tsx`)

- 3 cards side by side (mobile stacked), gap-8
- Card 1 — **Telefon** (Phone icon):
  - Primary: "0769 833 269" (tappable tel: link)
  - Secondary: "Lucian: 0727 224 230" (tappable tel: link)
- Card 2 — **Email** (Mail icon):
  - "contact@corestrategicconsulting.com" (mailto: link)
  - Subtext: "Răspundem în maxim 2 ore"
- Card 3 — **Program** (Clock icon):
  - "Luni — Vineri: 08:00 — 18:00"
  - "Sâmbătă: 09:00 — 14:00"
  - "Duminică: Închis"
- Card style: black-elevated background, gold icon (48px area), white title, grey-200 details, border gold/10
- GSAP: stagger entrance (y: 40, stagger: 0.12)

### Section 4: Google Maps (`ContactMap.tsx`)

- Full-width section, no padding
- Google Maps iframe embed centered on București
- Dark-styled map (using `&style=` parameters or grayscale CSS filter as fallback)
- Height: 400px desktop, 300px mobile
- Overlay gradient at top edge blending into the section above

### Section 5: FAQ Programare (`ContactFAQ.tsx`)

- Reuse accordion pattern from homepage `FAQSection.tsx`
- Gold eyebrow: "Întrebări Despre Programare"
- H2: "Informații Utile"
- 4 FAQ items:
  1. "Cum pot programa o inspecție?" → "Sunați la 0769 833 269, trimiteți mesaj pe WhatsApp sau completați formularul de contact. Confirmăm programarea în maxim 2 ore."
  2. "Cât durează o inspecție?" → "Între 2 și 4 ore, în funcție de dimensiunea proprietății. Raportul detaliat este livrat în maxim 48 de ore."
  3. "Ce trebuie să pregătesc pentru inspecție?" → "Asigurați accesul la toate camerele, inclusiv subsol și pod. Ideal: puneți la dispoziție documentația tehnică a imobilului dacă o aveți."
  4. "Pot fi prezent în timpul inspecției?" → "Da, recomandăm prezența dumneavoastră. Explicăm în timp real ce descoperim și răspundem la întrebări pe loc."
- GSAP: same accordion animation as homepage

---

## File Structure

```
src/app/despre-noi/page.tsx
src/app/contact/page.tsx

src/components/despre-noi/
  DespreHero.tsx
  DespreStory.tsx
  DespreValues.tsx
  DespreEquipment.tsx
  DespreStats.tsx

src/components/contact/
  ContactHero.tsx
  ContactForm.tsx
  ContactInfo.tsx
  ContactMap.tsx
  ContactFAQ.tsx
```

---

## Sitemap Update

Add both new routes to `src/app/sitemap.ts`:
- `/despre-noi` — priority 0.7, changeFrequency monthly
- `/contact` — priority 0.8, changeFrequency monthly

---

## Dependencies

No new packages. Uses existing: GSAP, ScrollTrigger, useGSAP, Lucide icons, next/image, ANIM constants, SITE constants.
