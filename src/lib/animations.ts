export const ANIM = {
  ease: {
    smooth: 'power3.out',
    luxe: 'expo.out',
    sharp: 'power2.inOut',
    elastic: 'elastic.out(1, 0.5)',
    snappy: 'power4.out',
  },
  duration: {
    fast: 0.5,
    normal: 0.8,
    slow: 1.2,
    luxe: 1.5,
    dramatic: 2.0,
  },
  stagger: {
    tight: 0.05,
    normal: 0.1,
    relaxed: 0.15,
    cascade: 0.08,
  },
  scroll: {
    start: 'top 85%',
    startLate: 'top 75%',
    toggleActions: 'play none none none',
    toggleOnce: 'play none none none',
  },
} as const
