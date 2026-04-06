// Placeholder images from Unsplash — replace with real client photos
export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85',
  thermalScan: 'https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?w=800&q=80&fit=crop&crop=center&h=1100',
  aboutTeam: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
  equipmentBg: 'https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=1920&q=80',
  portfolio1: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  portfolio2: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  portfolio3: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  testimonial1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  testimonial2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  testimonial3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  ctaBg: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80',
  reportBg: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',

  // Service page images — hero backgrounds & concern section visuals
  services: {
    'verificare-documentatie-tehnica': {
      hero: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=85',
      concern: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    },
    'verificare-elemente-structuri': {
      hero: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85',
      concern: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    },
    'scanare-termografica': {
      hero: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=85',
      concern: 'https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?w=800&q=80',
    },
    'verificare-instalatii': {
      hero: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=85',
      concern: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    },
    'determinare-umiditate': {
      hero: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1920&q=85',
      concern: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    },
    'expertize-tehnice': {
      hero: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=85',
      concern: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    },
  } as Record<string, { hero: string; concern: string }>,
} as const
