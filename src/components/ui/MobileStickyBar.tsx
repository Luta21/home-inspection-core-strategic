"use client"

import { Phone, ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/constants'

export function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gold/20 bg-black-pure/95 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-2 px-4 py-3">
        <a
          href={`tel:${SITE.phoneFormatted}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gold/40 py-2.5 text-xs font-medium text-gold"
        >
          <Phone className="h-3.5 w-3.5" />
          Sună Acum
        </a>
        <a
          href="#contact"
          className="flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 text-xs font-bold text-black-rich"
          style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C, #B8860B)' }}
        >
          Programează
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}
