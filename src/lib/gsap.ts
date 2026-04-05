"use client"

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

gsap.defaults({
  ease: 'expo.out',
  duration: 1.4,
})

gsap.config({
  nullTargetWarn: false,
})

/**
 * Helper: elegant scroll-triggered reveal using fromTo (no flash).
 * Use this instead of gsap.from() for scroll animations.
 */
export function revealFrom(
  targets: gsap.TweenTarget,
  from: gsap.TweenVars,
  scrollOpts: ScrollTrigger.Vars,
  extra?: gsap.TweenVars,
) {
  return gsap.fromTo(targets,
    { opacity: 0, ...from },
    {
      opacity: 1,
      y: 0, x: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0,
      ...extra,
      scrollTrigger: {
        toggleActions: 'play none none none',
        ...scrollOpts,
      },
    }
  )
}

export { gsap, ScrollTrigger, useGSAP }
