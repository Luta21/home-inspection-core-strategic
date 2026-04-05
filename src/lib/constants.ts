export const SITE = {
  name: 'Core Strategic Consulting',
  tagline: 'Investiția ta, Verificarea noastră.',
  phone: '0745 123 456',
  phoneFormatted: '+40745123456',
  email: 'contact@corestrategic.ro',
  url: 'https://corestrategic.ro',
  location: 'București & Ilfov',
  whatsapp: '40745123456',
} as const

export const SERVICES = [
  {
    slug: 'inspectie-tehnica-imobiliara',
    title: 'Inspecție Tehnică Imobiliară',
    shortDesc: 'Evaluare completă a apartamentului sau casei înainte de cumpărare — verificăm structura, instalațiile, hidroizolațiile și finisajele cu echipamente profesionale. Raport detaliat cu fotografii livrat în 48h.',
    icon: 'Search' as const,
  },
  {
    slug: 'verificare-structurala',
    title: 'Verificare Structurală Imobil',
    shortDesc: 'Verificare armături în stâlpi, grinzi și planșee, concordanță proiect tehnic-execuție, identificare defecte de betonare și vibrare. Opțional: testare grad beton cu sclerometru profesional.',
    icon: 'Shield' as const,
  },
  {
    slug: 'scanare-termografica',
    title: 'Scanare Termografică Profesională',
    shortDesc: 'Detectare punți termice, defecte de izolație la anvelopa clădirii, infiltrații ascunse și pierderi de căldură cu camera profesională Flir E60. Identificăm probleme invizibile ochiului liber.',
    icon: 'Thermometer' as const,
  },
  {
    slug: 'verificare-instalatii',
    title: 'Verificare Instalații Complete',
    shortDesc: 'Audit complet al instalațiilor electrice, sanitare, de încălzire și climatizare. Verificăm calitatea execuției, conformitatea cu normativele și identificăm riscuri potențiale.',
    icon: 'Zap' as const,
  },
  {
    slug: 'determinare-umiditate',
    title: 'Determinare Umiditate Structuri',
    shortDesc: 'Măsurare precisă a umidității cu higrometrul profesional Flir MR160. Identificăm sursa infiltrațiilor — acoperiș, fațadă, fundație sau conducte sparte — și recomandăm soluții de remediere.',
    icon: 'Droplets' as const,
  },
  {
    slug: 'expertize-tehnice',
    title: 'Expertize Tehnice de Specialitate',
    shortDesc: 'Expertize tehnice pentru mansardare, supraetajare, extindere, consolidare, restaurare, demolare parțială sau schimbare destinație imobil. Documentație conformă cu legislația în vigoare.',
    icon: 'FileCheck' as const,
  },
] as const

export const STATS = [
  { value: 1000, suffix: '+', label: 'Proprietăți Inspectate' },
  { value: 15, suffix: '+', label: 'Ani Experiență' },
  { value: 48, suffix: 'h', label: 'Raport Livrat' },
  { value: 100, suffix: '%', label: 'Clienți Mulțumiți' },
] as const

export const PACKAGES = [
  {
    name: 'Esențial',
    price: 350,
    currency: 'EUR',
    description: 'Ideal pentru apartamente 1-2 camere',
    features: [
      'Verificare structurală de bază',
      'Verificare instalații',
      'Raport sumar (10-15 pagini)',
      'Livrare în 72h',
    ],
    highlighted: false,
  },
  {
    name: 'Complet',
    price: 500,
    currency: 'EUR',
    description: 'Cel mai popular — apartamente și case',
    features: [
      'Verificare structurală completă',
      'Scanare termografică Flir E60',
      'Verificare instalații complete',
      'Determinare umiditate',
      'Raport detaliat (25-30 pagini)',
      'Estimare costuri remediere',
      'Consultanță negociere preț',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: 800,
    currency: 'EUR',
    description: 'Vile, proprietăți premium, investiții',
    features: [
      'Tot ce include Pachetul Complet',
      'Verificare documentație tehnică',
      'Testare grad beton (sclerometru)',
      'Raport extins (35+ pagini)',
      'Asistență post-achiziție 30 zile',
      'Consultație video follow-up',
    ],
    highlighted: false,
  },
] as const

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Programare',
    desc: 'Alege data și tipul inspecției online sau telefonic. Confirmăm în maxim 2 ore.',
  },
  {
    number: '02',
    title: 'Inspecție',
    desc: 'Echipa noastră verifică proprietatea cu echipamente profesionale Flir.',
  },
  {
    number: '03',
    title: 'Raport',
    desc: 'Primești raportul detaliat cu fotografii și recomandări în format digital.',
  },
  {
    number: '04',
    title: 'Decizie',
    desc: 'Ia cea mai bună decizie pentru investiția ta, cu date concrete în mână.',
  },
] as const

export const FAQ_ITEMS = [
  {
    question: 'Ce este o inspecție tehnică imobiliară?',
    answer: 'O inspecție tehnică imobiliară este o evaluare profesională a stării unei proprietăți, care verifică structura, instalațiile, finisajele și identifică problemele ascunse care nu sunt vizibile cu ochiul liber. Raportul detaliat te ajută să iei o decizie informată înainte de achiziție.',
  },
  {
    question: 'Cât durează o inspecție și când primesc raportul?',
    answer: 'Inspecția pe teren durează între 2 și 4 ore, în funcție de dimensiunea proprietății. Raportul detaliat cu fotografii și recomandări este livrat în format digital în maxim 48 de ore.',
  },
  {
    question: 'Ce echipamente folosiți?',
    answer: 'Utilizăm echipamente profesionale de ultimă generație: camera termografică Flir E60 pentru detectarea punților termice, higrometrul Flir MR160 pentru măsurarea umidității, sclerometru pentru testarea betonului, și echipamente specializate pentru verificarea instalațiilor.',
  },
  {
    question: 'Pot fi prezent în timpul inspecției?',
    answer: 'Absolut! Recomandăm prezența dumneavoastră pentru a vedea în timp real ce descoperim și pentru a primi explicații detaliate. Consultanța se face în prezența dumneavoastră, fără stres.',
  },
  {
    question: 'Ce se întâmplă dacă se găsesc probleme?',
    answer: 'Raportul include o estimare a costurilor de remediere pentru fiecare problemă identificată. Aceste informații vă oferă putere de negociere a prețului proprietății sau vă ajută să decideți dacă achiziția merită.',
  },
] as const
