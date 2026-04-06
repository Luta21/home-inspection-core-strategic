# Service Pages Visual Redesign — Design Spec

**Date:** 2026-04-06
**Goal:** Remove card borders, add soft elevation shadows for depth, cinematic hero reveal, and varied GSAP animations across all service page sections.

---

## 1. Card System — Soft Elevation

### Standard Cards (SolutionSection, WhoNeedsThisSection, RiskAvoidanceSection, WhyCoreStrategic differentiator cards, EquipmentSection)

**Remove:**
- `border border-grey-500/15`
- `hover:border-gold/25` (and all border hover variants like `hover:border-red-500/25`)

**Replace with:**
```
shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1
```

Keep existing: `rounded-xl`, `bg-gradient-to-b from-black-elevated to-black-soft/80`, `p-8`, `transition-all duration-500`, `group`

### Stat Cards (ConcernSection stats, WhyCoreStrategic stats)

**Remove:**
- `border border-grey-500/15`
- `hover:border-gold/20`

**Replace with:**
```
shadow-md shadow-black/25 hover:shadow-lg hover:shadow-black/35
```

Keep existing: `rounded-xl`, `bg-black-elevated`, `p-6`, `transition-colors` (change to `transition-all`)

### Icon Containers (inside all cards)

**Remove:**
- `border border-gold/15`
- `group-hover:border-gold/30`

**Keep:**
- `bg-gold/[0.06]`
- `group-hover:bg-gold/10`
- All sizing and rounding

### Deliverables Items (DeliverablesSection)

**Remove:**
- `border border-grey-500/10`
- `hover:border-gold/15`

**Replace with:**
```
shadow-sm shadow-black/20 hover:shadow-md hover:shadow-black/30
```

### FAQ Accordion Items (ServiceFAQ)

Remove borders from FAQ items, add subtle shadow. Keep the open/closed state differentiation via background color change rather than border color.

### MethodologyStepper Cards

Remove borders from step cards, add shadow-md. Keep the numbered circles and connecting line.

### Report Preview Mockup (ServiceReportPreview)

**Remove** from main mockup card:
- `border border-gold/20`

**Replace with:**
```
shadow-2xl shadow-black/50
```

**Remove** from stacked paper elements:
- `border border-gold/10` and `border border-gold/5`

**Replace with:**
```
shadow-lg shadow-black/30
```

Keep the gold border ONLY on inner elements like the scoring bar section dividers — these are structural, not decorative card borders.

### Inner Dividers & Structural Lines

Keep all `border-b border-grey-500/20` inside cards (table of contents separators, report header dividers). These are content structure, not card chrome.

---

## 2. Hero — Cinematic Reveal

### Animation Sequence (ServiceHero.tsx)

Replace the current staggered fade-up with this sequence:

1. **Background glow** (0s): A radial gradient circle (`bg-gold/[0.03]`) at center expands from `scale: 0` to `scale: 1.5` over 2s, then holds. Creates a subtle "light turning on" behind content.

2. **Gold accent line** (0s): The existing `h-[1px]` or `h-[2px]` gold divider animates `scaleX: 0 → 1` from center (`transformOrigin: center`), duration 0.8s, ease `power2.inOut`.

3. **Label** (0.4s delay): Small uppercase label (`heroLabel`) enters from above: `y: -20, opacity: 0 → y: 0, opacity: 1`, duration 0.6s, ease luxe.

4. **Main headline** (0.6s delay): Uses `clipPath` reveal — starts `clipPath: 'inset(100% 0 0 0)'` (fully clipped from bottom), animates to `clipPath: 'inset(0% 0 0 0)'` (fully visible). Duration 1.2s, ease `expo.out`. Text appears to slide up as clip opens.

5. **Gold headline** (0.8s delay): Same `clipPath` animation with 0.2s delay after main headline.

6. **Subheadline** (1.2s delay): Fade up + blur clear: `y: 20, opacity: 0, filter: 'blur(8px)' → y: 0, opacity: 1, filter: 'blur(0px)'`. Duration 1s, ease luxe.

7. **CTA buttons** (1.6s delay): Staggered fade up, 0.15s between each: `y: 20, opacity: 0 → y: 0, opacity: 1`. Duration 0.8s.

8. **Trust stats** (2.0s delay): Fade up, duration 0.6s. Numbers animate via counting tween from 0 to target value.

### Initial CSS States

All animated hero elements start with `opacity: 0` in CSS to prevent flash. The clipPath elements also need `clip-path: inset(100% 0 0 0)` as initial CSS state.

### Background Glow Element

Add a new div inside the hero:
```html
<div className="hero-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gold/[0.03] scale-0" />
```

GSAP animates this to `scale: 1.5` with `duration: 2, ease: 'power1.out'`.

---

## 3. Enhanced Section Animations

### Section Headings (all sections)

**Current:** `{ y: 50, opacity: 0 } → { y: 0, opacity: 1 }`

**New:** Add blur clear:
```javascript
{ y: 30, opacity: 0, filter: 'blur(6px)' }
→ { y: 0, opacity: 1, filter: 'blur(0px)' }
```

### Standard Card Stagger (SolutionSection, WhoNeedsThisSection, WhyCoreStrategic, EquipmentSection)

**Current:** `{ y: 60, opacity: 0 } → { y: 0, opacity: 1 }`

**New:** Add subtle scale:
```javascript
{ y: 40, opacity: 0, scale: 0.95 }
→ { y: 0, opacity: 1, scale: 1 }
```

### Risk Cards (RiskAvoidanceSection)

**New:** Alternating horizontal entry. Odd cards enter from left, even from right:
```javascript
cards.forEach((card, i) => {
  gsap.fromTo(card,
    { x: i % 2 === 0 ? -40 : 40, opacity: 0, scale: 0.95 },
    { x: 0, opacity: 1, scale: 1, duration, delay: i * stagger, ease, scrollTrigger }
  )
})
```

### Report Mockup (ServiceReportPreview)

**New:** 3D tilt on entrance:
```javascript
{ y: 80, opacity: 0, rotateY: 5 }
→ { y: 0, opacity: 1, rotateY: 0 }
```

The parent needs `perspective: 1000px` in style for the 3D effect.

### Stat Numbers (WhyCoreStrategic stats bar)

Add counting animation — GSAP `textContent` tween from 0 to the stat value:
```javascript
gsap.fromTo(numberElement,
  { textContent: 0 },
  { textContent: stat.value, duration: 2, ease: 'power1.out', snap: { textContent: 1 },
    scrollTrigger: { ... }
  }
)
```

### Deliverables Checkmarks

Keep the existing elastic pop animation on checkmark icons — this is already distinctive and good.

---

## 4. Files to Modify

| File | Changes |
|------|---------|
| `src/components/servicii/ServiceHero.tsx` | Cinematic reveal sequence, background glow element |
| `src/components/servicii/WhoNeedsThisSection.tsx` | Remove borders, add shadows, add scale to card animation |
| `src/components/servicii/RiskAvoidanceSection.tsx` | Remove borders, add shadows, alternating horizontal animation |
| `src/components/servicii/SolutionSection.tsx` | Remove borders, add shadows, add scale to card animation |
| `src/components/servicii/WhyCoreStrategic.tsx` | Remove borders, add shadows, counting stat animation |
| `src/components/servicii/EquipmentSection.tsx` | Remove borders, add shadows, add scale to card animation |
| `src/components/servicii/ConcernSection.tsx` | Remove borders on stat cards, add shadows |
| `src/components/servicii/ServiceReportPreview.tsx` | Remove borders, add deep shadows, 3D tilt animation |
| `src/components/servicii/DeliverablesSection.tsx` | Remove borders, add subtle shadows |
| `src/components/servicii/ServiceFAQ.tsx` | Remove borders, add shadows |
| `src/components/servicii/MethodologyStepper.tsx` | Remove borders on step cards, add shadows |
| `src/components/servicii/ServiceCTA.tsx` | Check for borders, apply same treatment |

All heading animations across all sections get blur-clear enhancement.

---

## 5. What Does NOT Change

- Color palette (gold, black variants, grey, red for risk)
- Typography (Playfair Display, JetBrains Mono, Inter)
- Layout structure (grid columns, spacing, max-widths)
- Content/data
- Section order
- Font sizes
- Existing special animations (deliverables elastic checkmarks, gold accent lines)
