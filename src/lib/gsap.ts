"use client"

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)

  // Global fix: prevent from() with ScrollTrigger from hiding elements
  // before the trigger fires. Elements stay visible until scrolled into view,
  // then the animation plays naturally.
  const originalFrom = gsap.from.bind(gsap)
  gsap.from = function(targets: gsap.TweenTarget, vars: gsap.TweenVars) {
    if (vars.scrollTrigger) {
      vars.immediateRender = false
    }
    return originalFrom(targets, vars)
  } as typeof gsap.from
}

gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

gsap.config({
  nullTargetWarn: false,
})

export { gsap, ScrollTrigger, useGSAP }
