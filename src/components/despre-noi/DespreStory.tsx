"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { IMAGES } from '@/lib/images'

export function DespreStory() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Heading stagger
    gsap.fromTo('.story-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: {
          trigger: '.story-heading',
          start: ANIM.scroll.start,
          toggleActions: ANIM.scroll.toggleOnce,
        },
      }
    )

    // Text paragraphs from left
    gsap.fromTo('.story-text',
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.relaxed,
        ease: ANIM.ease.luxe,
        scrollTrigger: {
          trigger: '.story-text',
          start: ANIM.scroll.start,
          toggleActions: ANIM.scroll.toggleOnce,
        },
      }
    )

    // Image from right
    gsap.fromTo('.story-image',
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: ANIM.duration.luxe,
        ease: ANIM.ease.luxe,
        scrollTrigger: {
          trigger: '.story-image',
          start: ANIM.scroll.start,
          toggleActions: ANIM.scroll.toggleOnce,
        },
      }
    )

    // Badge elastic pop
    gsap.fromTo('.story-badge',
      { scale: 0, opacity: 0 },
      {
        scale: 1, opacity: 1,
        duration: ANIM.duration.normal,
        ease: ANIM.ease.elastic,
        scrollTrigger: {
          trigger: '.story-image',
          start: ANIM.scroll.startLate,
          toggleActions: ANIM.scroll.toggleOnce,
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-14 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-16">
          {/* Left — Story content */}
          <div className="lg:col-span-3">
            {/* Heading */}
            <div className="story-heading mb-10 sm:mb-12 lg:mb-16">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
                Povestea Noastra
              </p>
              <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
                De La Pasiune{' '}
                <span className="text-gold-gradient">La Misiune</span>
              </h2>
              <div className="h-[2px] w-16 bg-gold" />
            </div>

            {/* Paragraphs */}
            <div className="space-y-6">
              <p className="story-text font-[var(--font-inter)] text-base leading-relaxed text-grey-300">
                Core Strategic Consulting s-a nascut din observarea unui gol critic pe piata
                imobiliara din Romania. Prea multi cumparatori investesc sume importante fara
                o verificare tehnica profesionala a proprietatii. Am decis sa schimbam asta.
              </p>
              <p className="story-text font-[var(--font-inter)] text-base leading-relaxed text-grey-300">
                Cu peste 15 ani de experienta in domeniul constructiilor, fondatorul companiei
                a lucrat direct pe santiere, intelegand fiecare detaliu al procesului de
                constructie, de la fundatie pana la acoperis. Aceasta experienta practica este
                fundamentul fiecarei inspectii pe care o realizam.
              </p>
              <p className="story-text font-[var(--font-inter)] text-base leading-relaxed text-grey-300">
                Peste 1.000 de proprietati inspectate mai tarziu, misiunea noastra ramane aceeasi:
                sa oferim fiecarui client informatiile de care are nevoie pentru a lua cea mai
                buna decizie. Folosim echipamente profesionale Flir de ultima generatie si o
                metodologie riguroasa pentru a identifica fiecare problema, vizibila sau ascunsa.
              </p>
            </div>
          </div>

          {/* Right — Image */}
          <div className="mt-12 lg:col-span-2 lg:mt-0">
            <div className="story-image relative overflow-hidden rounded-xl">
              <div className="aspect-[3/4]">
                <Image
                  src={IMAGES.aboutTeam}
                  alt="Inspectie tehnica imobiliara profesionala - echipa Core Strategic"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  quality={80}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black-pure/60 via-transparent to-transparent" />
              </div>

              {/* Floating stat badge */}
              <div className="story-badge absolute bottom-6 left-6 rounded-xl border border-gold/20 bg-black-elevated/80 px-6 py-4 backdrop-blur-md">
                <span className="block font-[var(--font-jetbrains)] text-3xl font-bold text-gold">
                  1000+
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.15em] text-grey-300">
                  Proprietati Inspectate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
