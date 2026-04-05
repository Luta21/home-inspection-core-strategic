export const ANIM = {
  ease: {
    smooth: 'power2.out',
    luxe: 'expo.out',
    sharp: 'power2.inOut',
    elastic: 'elastic.out(1, 0.5)',
    snappy: 'power4.out',
    silky: 'circ.out',
  },
  duration: {
    fast: 0.6,        // hover effects, small UI
    normal: 0.9,      // cards, content blocks — readable quickly
    slow: 1.3,        // headings, section titles — elegant but not sluggish
    luxe: 1.6,        // hero-level reveals, images
    dramatic: 2.2,    // special effects only (circle draws, counters)
  },
  stagger: {
    tight: 0.06,
    normal: 0.12,
    relaxed: 0.2,
    cascade: 0.1,
  },
  scroll: {
    start: 'top 85%',
    startLate: 'top 75%',
    toggleActions: 'play none none none',
    toggleOnce: 'play none none none',
  },
} as const
