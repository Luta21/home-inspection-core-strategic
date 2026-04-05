"use client"

import { useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SITE } from '@/lib/constants'

export function WhatsAppFAB() {
  const fabRef = useRef<HTMLAnchorElement>(null)

  useGSAP(() => {
    if (!fabRef.current) return
    gsap.from(fabRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
      delay: 2,
    })
  })

  return (
    <a
      ref={fabRef}
      href={`https://wa.me/${SITE.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactează-ne pe WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}
