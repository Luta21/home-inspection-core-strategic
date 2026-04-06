# Service Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 6 immersive service pages at `/servicii/[slug]` with a 10-section conversion funnel, GSAP animations, and per-page SEO.

**Architecture:** Dynamic route `app/servicii/[slug]/page.tsx` as Server Component using `generateStaticParams()`. All section components live in `components/servicii/`. Service-specific content stored in `lib/services-data.ts` keyed by slug.

**Tech Stack:** Next.js 16 (App Router, SSR/SSG), TypeScript, Tailwind CSS v4, GSAP 3 + ScrollTrigger + @gsap/react, Lucide React, Lenis smooth scroll.

**Design spec:** `docs/superpowers/specs/2026-04-06-service-pages-design.md`

---

## File Structure

```
src/
  lib/
    services-data.ts              — CREATE: Full content for all 6 service pages
  app/
    servicii/
      [slug]/
        page.tsx                   — CREATE: Dynamic route, SSG, metadata, JSON-LD
  components/
    servicii/
      ServiceHero.tsx              — CREATE: Full-width cinematic hero
      ConcernSection.tsx           — CREATE: "De ce conteaza" informative section
      SolutionSection.tsx          — CREATE: Benefits grid
      MethodologyStepper.tsx       — CREATE: Interactive horizontal stepper
      EquipmentSection.tsx         — CREATE: Horizontal scroll equipment cards
      DeliverablesSection.tsx      — CREATE: Gold checkmark list
      RelatedServices.tsx          — CREATE: 3-card cross-sell row
      ServiceFAQ.tsx               — CREATE: Accordion with JSON-LD
```

---

## Task 1: Service Page Data (`lib/services-data.ts`)

**Files:**
- Create: `src/lib/services-data.ts`

- [ ] **Step 1: Create the ServicePageData type and all 6 service data entries**

```typescript
// src/lib/services-data.ts
import type { LucideIcon } from 'lucide-react'

export type ServicePageData = {
  slug: string
  title: string
  icon: string
  heroLabel: string
  heroHeadline: string
  heroHeadlineGold: string
  heroSubheadline: string
  concernHeading: string
  concernBody: string[]
  concernStats: { value: string; label: string }[]
  benefits: { icon: string; title: string; desc: string }[]
  methodology: { title: string; desc: string }[]
  equipment: { icon: string; name: string; type: string; specs: string }[]
  deliverables: string[]
  ctaHeadline: string
  ctaSubtext: string
  faq: { question: string; answer: string }[]
  closingHeadline: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
}

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  'verificare-documentatie-tehnica': {
    slug: 'verificare-documentatie-tehnica',
    title: 'Verificarea Documentației Tehnice',
    icon: 'FileCheck',
    heroLabel: 'Documentație & Conformitate',
    heroHeadline: 'Concordanța Proiect',
    heroHeadlineGold: 'Execuție.',
    heroSubheadline: 'Verificăm documentația tehnică, cartea construcției și corelăm proiectul tehnic cu realitatea de pe teren. Siguranța investiției tale începe cu documentele corecte.',
    concernHeading: 'De ce este importantă verificarea documentației tehnice?',
    concernBody: [
      'Cartea tehnică a construcției reprezintă garanția faptului că proiectul tehnic a fost implementat corect și clădirea respectă standardele de calitate prevăzute de legislația în vigoare.',
      'Lipsa sau neconcordanța documentației tehnice poate duce la probleme legale la revânzare, imposibilitatea obținerii autorizațiilor pentru modificări ulterioare și, cel mai important, la riscuri structurale necunoscute.',
      'O analiză profesională identifică discrepanțele dintre documentație și execuția reală, oferindu-vă o imagine clară asupra stării reale a proprietății.',
    ],
    concernStats: [
      { value: '40%', label: 'Din proprietăți au neconcordanțe documentație-execuție' },
      { value: '€5k+', label: 'Costul mediu al remedierii problemelor nedetectate' },
      { value: '100%', label: 'Verificare conformitate legislație în vigoare' },
    ],
    benefits: [
      { icon: 'FileSearch', title: 'Analiză Carte Tehnică', desc: 'Verificăm completitudinea și corectitudinea cărții tehnice a construcției.' },
      { icon: 'GitCompare', title: 'Corelație Proiect-Execuție', desc: 'Comparăm proiectul tehnic cu ceea ce s-a construit efectiv pe teren.' },
      { icon: 'Scale', title: 'Conformitate Legală', desc: 'Verificăm respectarea normativelor și standardelor în vigoare.' },
      { icon: 'ShieldCheck', title: 'Raport de Conformitate', desc: 'Documentație completă cu constatări și recomandări clare.' },
    ],
    methodology: [
      { title: 'Solicitare Documentație', desc: 'Solicităm accesul la cartea tehnică a construcției, proiectul tehnic și detaliile de execuție de la proprietar sau dezvoltator.' },
      { title: 'Analiză Documentară', desc: 'Studiem în detaliu calitatea întocmirii documentației, verificăm completitudinea și identificăm eventualele lipsuri.' },
      { title: 'Verificare Pe Teren', desc: 'Efectuăm vizita la fața locului pentru a corela documentația cu ceea ce s-a construit în realitate.' },
      { title: 'Raport & Consultanță', desc: 'Întocmim raportul detaliat cu constatări, neconcordanțe identificate și recomandări de acțiune.' },
    ],
    equipment: [
      { icon: 'Ruler', name: 'Instrumente de Măsură', type: 'Verificare Dimensiuni', specs: 'Metru laser, nivelă digitală, instrumente de precizie' },
      { icon: 'Camera', name: 'Documentare Foto', type: 'Evidență Vizuală', specs: 'Fotografiere detaliată a elementelor verificate' },
      { icon: 'ClipboardCheck', name: 'Checklist Normativ', type: 'Conformitate', specs: 'Liste de verificare conform normativelor în vigoare' },
    ],
    deliverables: [
      'Raport detaliat de conformitate documentație-execuție',
      'Documentare fotografică cu adnotări tehnice',
      'Lista neconcordanțelor identificate cu grad de severitate',
      'Recomandări de remediere prioritizate',
      'Evaluarea riscurilor asociate neconcordanțelor',
      'Consultanță post-analiză inclusă',
    ],
    ctaHeadline: 'Nu semna actele fără o verificare profesională.',
    ctaSubtext: 'Programează o verificare a documentației tehnice și ia decizii informate.',
    faq: [
      { question: 'Ce documente trebuie să pun la dispoziție?', answer: 'Ideal, aveți nevoie de cartea tehnică a construcției, proiectul tehnic (planuri arhitectură, structură, instalații), autorizația de construire și procesele verbale de recepție. Dacă nu aveți toate documentele, putem lucra cu ceea ce este disponibil și vom nota lipsurile în raport.' },
      { question: 'Cât durează verificarea documentației?', answer: 'Analiza documentară durează 1-2 zile lucrătoare, în funcție de complexitatea proiectului. Vizita pe teren adaugă încă 2-3 ore. Raportul final este livrat în maxim 48 de ore de la finalizarea verificării.' },
      { question: 'Ce se întâmplă dacă dezvoltatorul refuză să furnizeze documentația?', answer: 'Refuzul furnizării documentației este un semnal de alarmă major. Vă recomandăm să nu procedați cu achiziția fără acces la documentația tehnică. Putem efectua o verificare vizuală și structurală pe teren care compensează parțial lipsa documentelor.' },
      { question: 'Este relevantă această verificare pentru apartamente noi?', answer: 'Da, este chiar esențială. Construcțiile noi pot avea neconcordanțe semnificative între proiect și execuție. Verificarea documentației vă protejează înainte de semnarea actului de predare-primire.' },
    ],
    closingHeadline: 'Documentele corecte înseamnă o investiție sigură.',
    metaTitle: 'Verificare Documentație Tehnică Imobil',
    metaDescription: 'Verificare profesională a documentației tehnice imobiliare în București. Concordanță proiect-execuție, carte tehnică construcție, conformitate legală. Raport detaliat în 48h.',
    metaKeywords: ['verificare documentatie tehnica', 'carte tehnica constructie', 'concordanta proiect executie', 'verificare documente imobil bucuresti'],
  },

  'verificare-elemente-structuri': {
    slug: 'verificare-elemente-structuri',
    title: 'Verificare Elemente Structuri',
    icon: 'Shield',
    heroLabel: 'Integritate Structurală',
    heroHeadline: 'Structura Solidă,',
    heroHeadlineGold: 'Investiția Sigură.',
    heroSubheadline: 'Verificăm armăturile în stâlpi, grinzi și planșee, identificăm defecte de betonare și corelăm execuția cu proiectul tehnic. Opțional: testare grad beton cu sclerometru.',
    concernHeading: 'De ce este importantă verificarea structurală?',
    concernBody: [
      'Elementele structurale — stâlpi, grinzi, diafragme și planșee — sunt scheletul oricărei clădiri. Defectele structurale sunt cele mai costisitoare și mai periculoase probleme pe care le poate avea un imobil.',
      'Verificarea repartiției etrierilor și a calității betonului pune în evidență zonele cu vicii de vibrare sau de turnare a betonului. Aceste defecte sunt invizibile după finisare, dar pot compromite siguranța structurală.',
      'Corelarea execuției cu proiectul tehnic și detaliile de execuție (D.D.E.) are rol hotărâtor în decizia de achiziție. O structură compromisă poate însemna costuri de remediere care depășesc valoarea proprietății.',
    ],
    concernStats: [
      { value: '25%', label: 'Din construcțiile noi au defecte structurale ascunse' },
      { value: '€15k+', label: 'Costul mediu al consolidării structurale' },
      { value: '0', label: 'Compromisuri acceptabile la structura de rezistență' },
    ],
    benefits: [
      { icon: 'ScanSearch', title: 'Verificare Armături', desc: 'Verificăm repartiția etrierilor în stâlpi, grinzi și diafragme.' },
      { icon: 'Hammer', title: 'Testare Beton', desc: 'Determinăm marca betonului pus în operă cu sclerometru profesional.' },
      { icon: 'GitCompare', title: 'Corelație cu D.D.E.', desc: 'Comparăm execuția reală cu detaliile de execuție din proiect.' },
      { icon: 'AlertTriangle', title: 'Identificare Vicii', desc: 'Detectăm zone cu vibrare deficitară sau defecte de turnare beton.' },
    ],
    methodology: [
      { title: 'Analiză Proiect Tehnic', desc: 'Studiem proiectul de structură, detaliile de execuție și planurile de armare pentru a ști exact ce trebuie verificat.' },
      { title: 'Inspecție Vizuală', desc: 'Examinăm vizual elementele structurale accesibile, identificăm fisuri, segregări de beton sau deformații.' },
      { title: 'Verificare Instrumentală', desc: 'Folosim echipamente specializate pentru verificarea armăturilor și testarea betonului cu sclerometrul.' },
      { title: 'Corelație și Raport', desc: 'Corelăm toate constatările cu documentația tehnică și întocmim raportul cu concluzii și recomandări.' },
    ],
    equipment: [
      { icon: 'Scan', name: 'Detector Armături', type: 'Scanare Structurală', specs: 'Detectare armături, acoperire beton, diametru bare' },
      { icon: 'Hammer', name: 'Sclerometru Digital', type: 'Testare Beton', specs: 'Determinare clasă beton conform SR EN 12504-2' },
      { icon: 'Camera', name: 'Documentare Foto HD', type: 'Evidență Vizuală', specs: 'Fotografiere macro defecte, fisuri, segregări' },
    ],
    deliverables: [
      'Raport detaliat verificare structurală (20-25 pagini)',
      'Documentare fotografică cu identificare defecte',
      'Rezultate testare sclerometrică (dacă s-a efectuat)',
      'Harta defectelor pe elemente structurale',
      'Corelație proiect-execuție cu neconcordanțe',
      'Recomandări de consolidare (dacă este cazul)',
      'Estimare costuri remediere',
    ],
    ctaHeadline: 'Structura clădirii nu se verifică după ce ai cumpărat.',
    ctaSubtext: 'Programează o verificare structurală și cunoaște starea reală a proprietății.',
    faq: [
      { question: 'Se poate verifica structura unui apartament la etaj?', answer: 'Da. Verificăm elementele structurale accesibile — stâlpi, grinzi vizibile, planșee. Pentru apartamente, inspectăm inclusiv subsolul tehnic și zonele comune unde structura este expusă. Detectorul de armături funcționează prin finisaje.' },
      { question: 'Testarea cu sclerometru deteriorează pereții?', answer: 'Sclerometrul lasă mici urme punctiforme pe suprafața betonului (2-3mm diametru). Testarea se face pe zone de beton expus sau în locuri discrete. Nu deteriorează finisajele și nu afectează integritatea structurală.' },
      { question: 'Cât durează o verificare structurală completă?', answer: 'Inspecția pe teren durează 3-4 ore pentru un apartament standard, 5-6 ore pentru o casă. Raportul este livrat în 48 de ore. Testarea sclerometrică adaugă aproximativ 1 oră.' },
      { question: 'Colaborați cu laboratoare acreditate?', answer: 'Da. Pentru testări complexe (carotare beton, analize chimice), colaborăm cu laboratoare de încercări acreditate RENAR. Rezultatele sunt incluse în raportul nostru.' },
    ],
    closingHeadline: 'Siguranța structurală nu se negociază.',
    metaTitle: 'Verificare Structurală Imobil',
    metaDescription: 'Verificare structurală profesională în București. Armături, beton, concordanță proiect-execuție. Testare sclerometrică opțională. Raport detaliat în 48h. Sună: 0745 123 456.',
    metaKeywords: ['verificare structurala', 'verificare armatura beton', 'sclerometru', 'inspectie structurala bucuresti', 'verificare stalpi grinzi'],
  },

  'scanare-termografica': {
    slug: 'scanare-termografica',
    title: 'Scanare Termografică Profesională',
    icon: 'Thermometer',
    heroLabel: 'Termografie Profesională',
    heroHeadline: 'Vedem Ce Ochiul',
    heroHeadlineGold: 'Nu Poate Vedea.',
    heroSubheadline: 'Detectăm punți termice, defecte de izolație, infiltrații ascunse și pierderi de căldură cu camera profesională Flir E60. Identificăm probleme invizibile ochiului liber.',
    concernHeading: 'De ce este importantă scanarea termografică?',
    concernBody: [
      'Termografia este singura metodă non-invazivă care poate identifica defecte ascunse în anvelopa clădirii, instalații și structură fără a necesita demolări sau intervenții costisitoare.',
      'Punțile termice, defectele de izolație și infiltrațiile ascunse generează pierderi de energie de până la 30% și pot duce la formarea mucegaiului și degradarea structurii în timp.',
      'O scanare termografică profesională identifică aceste probleme înainte de achiziție, oferindu-vă putere de negociere și cunoașterea exactă a investițiilor necesare post-achiziție.',
    ],
    concernStats: [
      { value: '30%', label: 'Pierderi energetice din punți termice nedetectate' },
      { value: '€3k-8k', label: 'Costul remedierii izolației deficitare' },
      { value: '0.05°C', label: 'Sensibilitate camera Flir E60' },
    ],
    benefits: [
      { icon: 'ThermometerSun', title: 'Detectare Punți Termice', desc: 'Identificăm zonele cu izolație deficitară sau lipsă din anvelopa clădirii.' },
      { icon: 'Droplets', title: 'Infiltrații Ascunse', desc: 'Detectăm umiditatea și infiltrațiile din pereți, tavane și pardoseli.' },
      { icon: 'Zap', title: 'Defecte Electrice', desc: 'Evidențiem contacte imperfecte și supraîncălziri în instalația electrică.' },
      { icon: 'Heater', title: 'Eficiență Încălzire', desc: 'Verificăm randamentul corpurilor de încălzire și detectăm zone colmatate.' },
    ],
    methodology: [
      { title: 'Pregătire Condiții', desc: 'Verificăm condițiile optime de scanare: diferență de temperatură interior-exterior minim 10°C, fără expunere directă la soare pe fațadă.' },
      { title: 'Scanare Interioară', desc: 'Scanăm sistematic pereții, tavanele, pardoselile și joncțiunile structurale din interiorul proprietății.' },
      { title: 'Scanare Exterioară', desc: 'Termoscanăm fațadele exterioare pentru identificarea punților termice și defectelor de anvelopare la scară macro.' },
      { title: 'Scanare Instalații', desc: 'Verificăm tabloul electric, distribuția de încălzire și conductele accesibile pentru anomalii termice.' },
      { title: 'Analiză și Raport', desc: 'Procesăm termogramele, suprapunem cu fotografii reale și întocmim raportul cu concluzii și recomandări.' },
    ],
    equipment: [
      { icon: 'Camera', name: 'Flir E60', type: 'Cameră Termografică', specs: 'Rezoluție 320x240, sensibilitate 0.05°C, domeniu -20°C la +650°C' },
      { icon: 'Thermometer', name: 'Termometru IR', type: 'Măsurare Punctuală', specs: 'Verificare temperaturi de suprafață cu precizie ridicată' },
      { icon: 'Wind', name: 'Anemometru', type: 'Măsurare Curenți Aer', specs: 'Detectare infiltrații de aer la ferestre și uși' },
    ],
    deliverables: [
      'Raport termografic complet cu termograme adnotate',
      'Fotografii reale suprapuse cu imagini termice',
      'Identificarea și clasificarea punților termice',
      'Harta defectelor de izolație pe zone',
      'Analiza instalațiilor electrice și de încălzire',
      'Recomandări de remediere cu estimări de cost',
      'Consultanță energetică inclusă',
    ],
    ctaHeadline: 'Detectează problemele ascunse înainte să fie prea târziu.',
    ctaSubtext: 'Programează o scanare termografică și primește raportul detaliat în 48h.',
    faq: [
      { question: 'Când este cel mai bun moment pentru o scanare termografică?', answer: 'Scanarea termografică este cel mai eficientă în sezonul rece (octombrie-aprilie), când diferența de temperatură interior-exterior este de minim 10°C. Scanarea instalațiilor electrice poate fi efectuată în orice moment al anului.' },
      { question: 'Scanarea termografică este invazivă?', answer: 'Nu. Termografia este o metodă complet non-invazivă. Camera termografică captează radiația infraroșie emisă de suprafețe fără contact fizic. Nu necesită demolări, găuriri sau alte intervenții în structura clădirii.' },
      { question: 'Ce tip de cameră termografică folosiți?', answer: 'Utilizăm camera profesională Flir E60 cu rezoluție termică de 320x240 pixeli și sensibilitate de 0.05°C. Este un echipament de clasă profesională, nu o cameră atașabilă telefonului.' },
      { question: 'Pot face termografie vara?', answer: 'Scanarea anvelopei clădirii pentru punți termice necesită diferență de temperatură, deci vara nu este optimă. Însă scanarea instalațiilor electrice, detectarea infiltrațiilor de apă și verificarea instalațiilor de climatizare se pot face în orice anotimp.' },
      { question: 'Termografia poate detecta mucegaiul din pereți?', answer: 'Termografia detectează zonele cu umiditate ridicată care favorizează apariția mucegaiului, chiar dacă acesta nu este vizibil. Zonele reci și umede identificate pe termograme sunt potențiale focare de mucegai.' },
    ],
    closingHeadline: 'Investiția în termografie previne surprizele costisitoare.',
    metaTitle: 'Scanare Termografică Profesională',
    metaDescription: 'Scanare termografică profesională cu camera Flir E60 în București. Detectare punți termice, infiltrații, defecte izolație. Raport cu termograme în 48h. Sună: 0745 123 456.',
    metaKeywords: ['scanare termografica', 'termografie profesionala bucuresti', 'detectare punti termice', 'camera termoviziune flir', 'audit energetic'],
  },

  'verificare-instalatii': {
    slug: 'verificare-instalatii',
    title: 'Verificare Instalații Complete',
    icon: 'Zap',
    heroLabel: 'Audit Instalații',
    heroHeadline: 'Instalații Verificate,',
    heroHeadlineGold: 'Locuință Sigură.',
    heroSubheadline: 'Audit complet al instalațiilor electrice, sanitare, de încălzire și climatizare. Verificăm calitatea execuției, conformitatea cu normativele și identificăm riscuri potențiale.',
    concernHeading: 'De ce este importantă verificarea instalațiilor?',
    concernBody: [
      'Instalațiile deficitare sunt principala cauză a incendiilor și inundațiilor în locuințe. O execuție necorespunzătoare, materiale de slabă calitate sau nerespectarea proiectului pot genera riscuri majore.',
      'Costul remedierii instalațiilor deficitare după achiziție poate fi semnificativ — refacerea completă a instalației electrice a unui apartament costă între 3.000 și 8.000 EUR, iar a celei sanitare între 2.000 și 6.000 EUR.',
      'Verificarea profesională identifică problemele înainte de achiziție, oferindu-vă o imagine clară a investițiilor necesare și putere reală de negociere a prețului.',
    ],
    concernStats: [
      { value: '60%', label: 'Din incendiile rezidențiale sunt cauzate de instalații electrice' },
      { value: '€3k-8k', label: 'Costul refacerii instalației electrice' },
      { value: '4 tipuri', label: 'De instalații verificate (electric, sanitar, termic, HVAC)' },
    ],
    benefits: [
      { icon: 'Zap', title: 'Instalații Electrice', desc: 'Tablou electric, secțiuni cabluri, împământare, protecție diferențială.' },
      { icon: 'Droplets', title: 'Instalații Sanitare', desc: 'Alimentare apă, canalizare, etanșeitate, presiune, materiale.' },
      { icon: 'Flame', title: 'Instalații Termice', desc: 'Centrală termică, distribuție, corpuri încălzire, eficiență.' },
      { icon: 'AirVent', title: 'Climatizare & Ventilație', desc: 'Unități AC, ventilație, hote, tiraj coșuri.' },
    ],
    methodology: [
      { title: 'Verificare Electrică', desc: 'Inspectăm tabloul electric, verificăm secțiunile cablurilor, prezența împământării, funcționarea diferențialelor și conformitatea cu normativul I7.' },
      { title: 'Verificare Sanitară', desc: 'Testăm presiunea apei, verificăm etanșeitatea racordurilor, starea canalizării, materialele folosite și conformitatea cu proiectul.' },
      { title: 'Verificare Termică', desc: 'Inspectăm centrala termică, distribuția, corpurile de încălzire, verificăm randamentul și detectăm pierderi sau colmatări.' },
      { title: 'Verificare HVAC', desc: 'Verificăm unitățile de climatizare, ventilația, hotele și tirajul coșurilor de fum sau ventilație.' },
      { title: 'Raport Integrat', desc: 'Întocmim raportul unificat cu starea fiecărui tip de instalație, defecte identificate și recomandări prioritizate.' },
    ],
    equipment: [
      { icon: 'Gauge', name: 'Multimetru Digital', type: 'Măsurători Electrice', specs: 'Tensiune, curent, rezistență, continuitate, impedanță buclă' },
      { icon: 'Activity', name: 'Tester Diferențial', type: 'Protecție Electrică', specs: 'Verificare timp declanșare și curent rezidual RCD' },
      { icon: 'Thermometer', name: 'Flir E60', type: 'Termografie Instalații', specs: 'Detectare contacte imperfecte, supraîncălziri, colmatări' },
      { icon: 'Droplets', name: 'Manometru', type: 'Presiune Apă', specs: 'Testare presiune și etanșeitate instalații sanitare' },
    ],
    deliverables: [
      'Raport detaliat verificare instalații (25-30 pagini)',
      'Documentare foto fiecare tip de instalație',
      'Rezultate măsurători electrice (tensiuni, rezistențe)',
      'Test funcțional protecții electrice',
      'Verificare presiune și etanșeitate sanitare',
      'Evaluare stare centrală termică',
      'Lista defecte cu grad de urgență',
      'Estimare costuri remediere per instalație',
    ],
    ctaHeadline: 'Instalațiile deficitare costă mai mult decât o verificare.',
    ctaSubtext: 'Programează un audit complet al instalațiilor și evită surprizele costisitoare.',
    faq: [
      { question: 'Verificați și instalația de gaz?', answer: 'Verificarea instalației de gaz este reglementată strict și necesită autorizare ISCIR specifică. Verificăm vizual traseul și starea conductelor, dar pentru testarea propriu-zisă vă recomandăm un verificator autorizat ISCIR pe care vi-l putem recomanda.' },
      { question: 'Trebuie să fie curentul pornit în timpul inspecției?', answer: 'Da, pentru verificarea completă a instalației electrice avem nevoie de alimentare cu energie electrică. La fel, pentru testarea instalației sanitare avem nevoie de apă curentă. Instalația de încălzire trebuie să fie funcțională.' },
      { question: 'Cât durează verificarea tuturor instalațiilor?', answer: 'Pentru un apartament de 2-3 camere, verificarea completă a tuturor tipurilor de instalații durează 3-4 ore. Pentru o casă, 4-6 ore. Raportul este livrat în 48 de ore.' },
      { question: 'Puteți verifica instalațiile ascunse în pereți?', answer: 'Cu camera termografică Flir E60 putem detecta conducte fierbinți sau reci ascunse în pereți, precum și contacte electrice supraîncălzite. Pentru trasee precise ale instalațiilor ascunse, recomandăm o scanare suplimentară.' },
    ],
    closingHeadline: 'Instalații verificate, locuință fără surprize.',
    metaTitle: 'Verificare Instalații Complete Imobil',
    metaDescription: 'Verificare profesională instalații electrice, sanitare, termice și HVAC în București. Audit complet cu echipamente specializate. Raport detaliat în 48h. Sună: 0745 123 456.',
    metaKeywords: ['verificare instalatii', 'audit electric', 'verificare instalatii sanitare', 'inspectie instalatii bucuresti', 'verificare centrala termica'],
  },

  'determinare-umiditate': {
    slug: 'determinare-umiditate',
    title: 'Determinare Umiditate Structuri',
    icon: 'Droplets',
    heroLabel: 'Diagnostic Umiditate',
    heroHeadline: 'Umiditatea Ascunsă,',
    heroHeadlineGold: 'Descoperită La Timp.',
    heroSubheadline: 'Măsurare precisă a umidității cu higrometrul profesional Flir MR160. Identificăm sursa infiltrațiilor — acoperiș, fațadă, fundație sau conducte sparte — și recomandăm soluții.',
    concernHeading: 'De ce este importantă determinarea umidității?',
    concernBody: [
      'Umiditatea excesivă în structuri este una dintre cele mai insidioase probleme ale unui imobil. Efectele nu sunt vizibile imediat, dar în timp duc la degradarea structurală, mucegai și probleme de sănătate.',
      'Sursele de umiditate sunt multiple și adesea ascunse: infiltrații prin acoperiș sau fațadă, capilaritate ascendentă din fundație, conducte sparte în pereți sau condensare din cauza izolației deficitare.',
      'Identificarea sursei exacte este esențială pentru o remediere eficientă. Tratarea simptomelor fără rezolvarea cauzei înseamnă bani aruncați și probleme recurente.',
    ],
    concernStats: [
      { value: '35%', label: 'Din locuințe au probleme de umiditate nedetectate' },
      { value: '€2k-10k', label: 'Costul remedierii infiltrațiilor cronice' },
      { value: '24/7', label: 'Umiditatea lucrează non-stop la degradarea structurii' },
    ],
    benefits: [
      { icon: 'Droplets', title: 'Măsurare Precisă', desc: 'Determinăm nivelul exact de umiditate în beton, tencuială, lemn și alte materiale.' },
      { icon: 'Search', title: 'Identificare Sursă', desc: 'Localizăm sursa exactă a umidității: acoperiș, fațadă, fundație sau conducte.' },
      { icon: 'Thermometer', title: 'Corelație Termică', desc: 'Combinăm higrometria cu termografia pentru diagnostic complet.' },
      { icon: 'FileText', title: 'Soluții de Remediere', desc: 'Recomandăm soluții specifice pentru fiecare sursă identificată.' },
    ],
    methodology: [
      { title: 'Inspecție Vizuală', desc: 'Identificăm urmele vizibile de umiditate: pete, eflorescențe, mucegai, degradări ale finisajelor, bășici de vopsea.' },
      { title: 'Măsurare Higrometrică', desc: 'Scanăm sistematic pereții, pardoselile și tavanele cu higrometrul Flir MR160 pentru a cartografia umiditatea.' },
      { title: 'Corelație Termografică', desc: 'Suprapunem măsurătorile de umiditate cu termogramele pentru a identifica precis zonele afectate și sursa.' },
      { title: 'Diagnostic și Soluții', desc: 'Analizăm datele, stabilim sursa umidității și întocmim raportul cu recomandări de remediere specifice.' },
    ],
    equipment: [
      { icon: 'Droplets', name: 'Flir MR160', type: 'Higrometru Profesional', specs: 'Ghidare termică IGM, umiditate relativă și absolută, sondă externă' },
      { icon: 'Camera', name: 'Flir E60', type: 'Cameră Termografică', specs: 'Corelație termică-umiditate, detectare zone reci umede' },
      { icon: 'Ruler', name: 'Sondă Profunzime', type: 'Măsurare In-Depth', specs: 'Determinare umiditate în profunzimea materialului' },
    ],
    deliverables: [
      'Raport detaliat determinare umiditate',
      'Hartă de umiditate pe zone și nivele',
      'Termograme corelate cu măsurători higrometrice',
      'Identificarea sursei/surselor de umiditate',
      'Documentare foto zone afectate',
      'Recomandări de remediere prioritizate',
      'Estimare costuri remediere per zonă',
    ],
    ctaHeadline: 'Umiditatea ascunsă devine vizibilă cu echipamentele potrivite.',
    ctaSubtext: 'Programează o determinare de umiditate și cunoaște starea reală a proprietății.',
    faq: [
      { question: 'Se poate măsura umiditatea fără a deteriora pereții?', answer: 'Da. Higrometrul Flir MR160 are mod non-invaziv care măsoară umiditatea prin scanare de suprafață. Pentru măsurători de profunzime folosim sonda externă care necesită doar contact cu suprafața, fără deteriorare.' },
      { question: 'Ce nivel de umiditate este considerat problematic?', answer: 'Depinde de materialul de construcție. Pentru beton, umiditatea peste 4-5% este îngrijorătoare. Pentru tencuială, peste 3%. Pentru lemn, peste 18% indică risc de degradare biologică. Raportul nostru include valorile de referință pentru fiecare material.' },
      { question: 'Puteți determina dacă umiditatea vine din interior sau exterior?', answer: 'Da. Prin corelarea măsurătorilor higrometrice cu termografia și analiza distribuției umidității, putem stabili cu precizie dacă sursa este externă (infiltrație, capilaritate) sau internă (condensare, conducte sparte).' },
      { question: 'Cât durează măsurătorile de umiditate?', answer: 'Pentru un apartament standard, măsurătorile complete durează 2-3 ore. Pentru o casă cu subsol, 3-4 ore. Raportul cu interpretare și recomandări este livrat în 48 de ore.' },
    ],
    closingHeadline: 'Nu lăsa umiditatea să-ți erodeze investiția.',
    metaTitle: 'Determinare Umiditate Structuri',
    metaDescription: 'Determinare umiditate profesională cu higrometru Flir MR160 în București. Identificare surse infiltrații, măsurare precisă, corelație termografică. Raport în 48h.',
    metaKeywords: ['determinare umiditate', 'higrometru profesional', 'infiltratii perete', 'umiditate structuri bucuresti', 'detectare umiditate'],
  },

  'expertize-tehnice': {
    slug: 'expertize-tehnice',
    title: 'Expertize Tehnice de Specialitate',
    icon: 'FileCheck',
    heroLabel: 'Expertiză & Autorizare',
    heroHeadline: 'Expertize Tehnice',
    heroHeadlineGold: 'Conform Legislației.',
    heroSubheadline: 'Expertize tehnice pentru mansardare, supraetajare, extindere, consolidare, restaurare, demolare parțială sau schimbare destinație imobil. Documentație conformă cu legislația în vigoare.',
    concernHeading: 'De ce ai nevoie de o expertiză tehnică?',
    concernBody: [
      'Orice intervenție asupra structurii unui imobil — de la mansardare și supraetajare până la consolidare sau schimbare de destinație — necesită o expertiză tehnică întocmită de un expert atestat, conform legislației române.',
      'Fără expertiza tehnică, nu puteți obține autorizație de construire pentru modificările dorite. Mai mult, intervențiile neautorizate asupra structurii pot compromite siguranța clădirii și pot atrage sancțiuni legale severe.',
      'O expertiză profesională evaluează capacitatea structurii de a prelua sarcinile suplimentare, identifică intervențiile necesare și oferă soluțiile tehnice conforme cu normativele în vigoare.',
    ],
    concernStats: [
      { value: '100%', label: 'Obligatoriu legal pentru intervenții structurale' },
      { value: 'P100-1', label: 'Cod seismic de referință pentru expertize' },
      { value: '€10k+', label: 'Amenzi pentru intervenții neautorizate' },
    ],
    benefits: [
      { icon: 'Building', title: 'Mansardare & Supraetajare', desc: 'Evaluăm capacitatea structurii de a prelua niveluri suplimentare.' },
      { icon: 'Expand', title: 'Extindere & Consolidare', desc: 'Soluții tehnice pentru extinderea sau consolidarea clădirilor existente.' },
      { icon: 'Landmark', title: 'Restaurare', desc: 'Expertize pentru clădiri istorice sau cu valoare arhitecturală.' },
      { icon: 'FileText', title: 'Schimbare Destinație', desc: 'Documentație pentru transformarea spațiilor (rezidențial/comercial).' },
    ],
    methodology: [
      { title: 'Analiză Documentar', desc: 'Studiem documentația existentă, proiectul original, istoricul intervențiilor și cerințele specifice ale proprietarului.' },
      { title: 'Investigații Pe Teren', desc: 'Efectuăm investigațiile necesare: verificare structurală, măsurători, prelevare probe dacă este cazul.' },
      { title: 'Calcule și Verificări', desc: 'Realizăm calculele de verificare structurală conform normativelor în vigoare (P100-1, CR6, etc.).' },
      { title: 'Întocmire Expertiză', desc: 'Redactăm expertiza tehnică completă cu concluzii, soluții propuse și documentație pentru autorizare.' },
    ],
    equipment: [
      { icon: 'Scan', name: 'Detector Armături', type: 'Investigație Structurală', specs: 'Scanare armături existente pentru calcule de verificare' },
      { icon: 'Hammer', name: 'Sclerometru', type: 'Testare Beton', specs: 'Determinare caracteristici beton existent' },
      { icon: 'Ruler', name: 'Echipamente Topografice', type: 'Releveuri', specs: 'Măsurători precise pentru releveu tehnic' },
    ],
    deliverables: [
      'Expertiză tehnică completă conform legislație',
      'Releveu tehnic al construcției existente',
      'Calcule de verificare structurală',
      'Soluții tehnice propuse detaliate',
      'Documentație necesară pentru autorizare',
      'Estimare costuri intervenții propuse',
      'Consultanță pentru etapele ulterioare',
    ],
    ctaHeadline: 'Expertiza corectă deschide calea către proiectul tău.',
    ctaSubtext: 'Solicită o expertiză tehnică și primește documentația necesară pentru autorizare.',
    faq: [
      { question: 'Cine poate semna o expertiză tehnică?', answer: 'Expertizele tehnice sunt întocmite și semnate de experți tehnici atestați de Ministerul Dezvoltării (MLPDA). Colaborăm cu experți atestați pe cerințele fundamentale relevante (A1-rezistență mecanică, A2-securitate la incendiu).' },
      { question: 'Cât durează elaborarea unei expertize tehnice?', answer: 'Durata depinde de complexitatea proiectului. Pentru o mansardare simplă, 2-3 săptămâni. Pentru consolidări complexe sau clădiri istorice, 4-8 săptămâni. Investigațiile pe teren durează 1-2 zile.' },
      { question: 'Este expertiza obligatorie pentru orice modificare?', answer: 'Expertiza tehnică este obligatorie pentru orice intervenție care afectează structura de rezistență: mansardare, supraetajare, extindere, consolidare, demolare parțială de elemente structurale sau schimbare de destinație. Nu este necesară pentru modificări de compartimentare pe pereți nestructurali.' },
      { question: 'Ce se întâmplă dacă structura nu permite intervenția dorită?', answer: 'Dacă evaluarea arată că structura existentă nu poate prelua sarcinile suplimentare, expertiza va propune soluții de consolidare care să permită intervenția dorită. Costurile de consolidare sunt estimate în raport pentru a vă ajuta în luarea deciziei.' },
    ],
    closingHeadline: 'Fiecare proiect de succes începe cu o expertiză solidă.',
    metaTitle: 'Expertize Tehnice de Specialitate',
    metaDescription: 'Expertize tehnice pentru mansardare, supraetajare, consolidare, restaurare în București. Expert atestat, documentație conformă legislație. Consultanță completă.',
    metaKeywords: ['expertiza tehnica', 'expertiza structurala', 'mansardare', 'supraetajare', 'consolidare cladire', 'expert atestat bucuresti'],
  },
}

export const SERVICE_SLUGS = Object.keys(SERVICE_PAGES)
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /Users/denistipelea/workspace/homeInspector/core-strategic && npx tsc --noEmit`
Expected: No errors related to `services-data.ts`

- [ ] **Step 3: Commit**

```bash
git add src/lib/services-data.ts
git commit -m "feat(servicii): add service page data for all 6 services"
```

---

## Task 2: Dynamic Route & SEO (`app/servicii/[slug]/page.tsx`)

**Files:**
- Create: `src/app/servicii/[slug]/page.tsx`

**Dependencies:** Task 1 must be complete.

- [ ] **Step 1: Create the page component with generateStaticParams, generateMetadata, and JSON-LD**

```typescript
// src/app/servicii/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICE_PAGES, SERVICE_SLUGS } from '@/lib/services-data'
import { SITE } from '@/lib/constants'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/effects/SmoothScroll'
import { CTABanner } from '@/components/ui/CTABanner'
import { ServiceHero } from '@/components/servicii/ServiceHero'
import { ConcernSection } from '@/components/servicii/ConcernSection'
import { SolutionSection } from '@/components/servicii/SolutionSection'
import { MethodologyStepper } from '@/components/servicii/MethodologyStepper'
import { EquipmentSection } from '@/components/servicii/EquipmentSection'
import { DeliverablesSection } from '@/components/servicii/DeliverablesSection'
import { RelatedServices } from '@/components/servicii/RelatedServices'
import { ServiceFAQ } from '@/components/servicii/ServiceFAQ'
import { ServiceCTA } from '@/components/servicii/ServiceCTA'

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = SERVICE_PAGES[params.slug]
  if (!service) return {}

  const url = `${SITE.url}/servicii/${service.slug}`

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.metaKeywords,
    openGraph: {
      title: `${service.metaTitle} | ${SITE.name}`,
      description: service.metaDescription,
      url,
      siteName: SITE.name,
      locale: 'ro_RO',
      type: 'website',
      images: [{ url: '/og/og-image.jpg', width: 1200, height: 630, alt: service.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.metaTitle} | ${SITE.name}`,
      description: service.metaDescription,
      images: ['/og/og-image.jpg'],
    },
    alternates: { canonical: url },
  }
}

function ServiceJsonLd({ service }: { service: typeof SERVICE_PAGES[string] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'București' },
      { '@type': 'AdministrativeArea', name: 'Ilfov' },
    ],
    url: `${SITE.url}/servicii/${service.slug}`,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICE_PAGES[params.slug]
  if (!service) notFound()

  return (
    <SmoothScrollProvider>
      <Header />
      <ServiceJsonLd service={service} />

      <main id="main-content">
        <ServiceHero service={service} />
        <ConcernSection service={service} />
        <SolutionSection service={service} />
        <MethodologyStepper service={service} />
        <EquipmentSection service={service} />
        <DeliverablesSection service={service} />

        <CTABanner headline={service.ctaHeadline} subtext={service.ctaSubtext} />

        <RelatedServices currentSlug={service.slug} />
        <ServiceFAQ service={service} />
        <ServiceCTA headline={service.closingHeadline} />
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
```

Note: This file imports components that don't exist yet. It will not compile until Tasks 3-10 are done. That's expected — we're building top-down.

- [ ] **Step 2: Commit**

```bash
git add src/app/servicii/[slug]/page.tsx
git commit -m "feat(servicii): add dynamic route with SSG, metadata, and JSON-LD"
```

---

## Task 3: ServiceHero Component

**Files:**
- Create: `src/components/servicii/ServiceHero.tsx`

- [ ] **Step 1: Create the cinematic hero component**

```typescript
// src/components/servicii/ServiceHero.tsx
"use client"

import { useRef, useState, useEffect } from 'react'
import { Phone, ArrowRight, ChevronDown } from 'lucide-react'
import { SITE } from '@/lib/constants'
import type { ServicePageData } from '@/lib/services-data'

interface ServiceHeroProps {
  service: ServicePageData
}

export function ServiceHero({ service }: ServiceHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const transition = (delay: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  })

  return (
    <section
      ref={heroRef}
      className="grain-overlay relative flex min-h-[85vh] items-center overflow-hidden bg-black-pure"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black-pure via-black-rich/50 to-black-pure" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-32 text-center lg:px-8 lg:py-40">
        {/* Gold accent line */}
        <div
          className="mx-auto mb-8 h-[2px] w-16 bg-gold"
          style={{
            transform: loaded ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        />

        {/* Label */}
        <p
          className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold"
          style={transition(0.5)}
        >
          {service.heroLabel}
        </p>

        {/* Headline */}
        <h1 className="mx-auto mb-6 max-w-3xl font-[var(--font-playfair)] text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight">
          <span className="inline-block text-white" style={transition(0.7)}>
            {service.heroHeadline}
          </span>{' '}
          <span className="inline-block text-gold-gradient" style={transition(0.9)}>
            {service.heroHeadlineGold}
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-grey-200 lg:text-lg"
          style={transition(1.1)}
        >
          {service.heroSubheadline}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={transition(1.4)}
        >
          <a
            href="#contact"
            className="btn-shimmer relative inline-flex items-center gap-2 overflow-hidden rounded-md px-8 py-4 text-sm font-bold uppercase tracking-wider text-black-rich transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)]"
            style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C, #B8860B)' }}
          >
            Programeaza Inspectia
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={`tel:${SITE.phoneFormatted}`}
            className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-8 py-4 text-sm font-medium text-gold transition-all hover:border-gold hover:bg-gold/10"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
        </div>

        {/* Trust stats */}
        <div className="mx-auto mt-16 flex max-w-lg flex-wrap items-center justify-center gap-8 border-t border-grey-500/20 pt-8 lg:gap-12">
          {[
            { value: '1000+', label: 'Proprietati' },
            { value: '15+', label: 'Ani Experienta' },
            { value: '48h', label: 'Raport Livrat' },
          ].map((stat, i) => (
            <div key={stat.label} style={transition(1.8 + i * 0.15)}>
              <span className="block font-[var(--font-jetbrains)] text-2xl font-bold text-gold">
                {stat.value}
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.15em] text-grey-300">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.5s ease 2.5s',
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.2em] text-grey-400">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-gold" />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/servicii/ServiceHero.tsx
git commit -m "feat(servicii): add cinematic hero component"
```

---

## Task 4: ConcernSection Component

**Files:**
- Create: `src/components/servicii/ConcernSection.tsx`

- [ ] **Step 1: Create the informative concern section**

```typescript
// src/components/servicii/ConcernSection.tsx
"use client"

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import type { ServicePageData } from '@/lib/services-data'

interface ConcernSectionProps {
  service: ServicePageData
}

export function ConcernSection({ service }: ConcernSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.concern-text > *',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.concern-text', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.concern-stats > *',
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.relaxed,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.concern-stats', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Text — 3 columns */}
          <div className="concern-text lg:col-span-3">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              De Ce Conteaza
            </p>
            <h2 className="mb-8 font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              {service.concernHeading}
            </h2>
            {service.concernBody.map((paragraph, i) => (
              <p key={i} className="mb-4 text-base leading-relaxed text-grey-300 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Stats — 2 columns */}
          <div className="concern-stats flex flex-col gap-6 lg:col-span-2">
            {service.concernStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-grey-500/15 bg-black-elevated p-6 transition-colors hover:border-gold/20"
              >
                <span className="block font-[var(--font-jetbrains)] text-3xl font-bold text-gold">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm text-grey-300">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/servicii/ConcernSection.tsx
git commit -m "feat(servicii): add informative concern section component"
```

---

## Task 5: SolutionSection Component

**Files:**
- Create: `src/components/servicii/SolutionSection.tsx`

- [ ] **Step 1: Create the solution overview with benefits grid**

```typescript
// src/components/servicii/SolutionSection.tsx
"use client"

import { useRef } from 'react'
import * as LucideIcons from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import type { ServicePageData } from '@/lib/services-data'

interface SolutionSectionProps {
  service: ServicePageData
}

export function SolutionSection({ service }: SolutionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.solution-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.solution-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.solution-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.solution-grid', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="solution-heading mb-16 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Solutia Noastra
          </p>
          <h2 className="mx-auto mb-4 max-w-2xl font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            {service.title}
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Benefits grid */}
        <div className="solution-grid grid gap-6 sm:grid-cols-2 lg:gap-8">
          {service.benefits.map((benefit) => {
            const Icon = (LucideIcons as Record<string, LucideIcons.LucideIcon>)[benefit.icon] || LucideIcons.CircleDot
            return (
              <div
                key={benefit.title}
                className="solution-card group rounded-xl border border-grey-500/15 bg-gradient-to-b from-black-elevated to-black-soft/80 p-8 transition-all duration-500 hover:border-gold/25"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-gold/15 bg-gold/[0.06] transition-all duration-400 group-hover:border-gold/30 group-hover:bg-gold/10">
                  <Icon className="h-5 w-5 text-gold/80 transition-colors duration-400 group-hover:text-gold" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-grey-300">{benefit.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/servicii/SolutionSection.tsx
git commit -m "feat(servicii): add solution overview with benefits grid"
```

---

## Task 6: MethodologyStepper Component

**Files:**
- Create: `src/components/servicii/MethodologyStepper.tsx`

- [ ] **Step 1: Create the interactive horizontal stepper with ScrollTrigger**

```typescript
// src/components/servicii/MethodologyStepper.tsx
"use client"

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import type { ServicePageData } from '@/lib/services-data'

interface MethodologyStepperProps {
  service: ServicePageData
}

export function MethodologyStepper({ service }: MethodologyStepperProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  const steps = service.methodology

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Show all steps immediately
      stepsRef.current.forEach((el) => el && gsap.set(el, { opacity: 1 }))
      contentRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1 }))
      if (lineRef.current) gsap.set(lineRef.current, { scaleX: 1 })
      return
    }

    // Heading animation
    gsap.fromTo('.methodology-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.methodology-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    // Progressive gold line fill
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1.5,
          },
        }
      )
    }

    // Step circles activate sequentially
    const totalSteps = steps.length
    stepsRef.current.forEach((el, i) => {
      if (!el) return
      const progress = i / (totalSteps - 1)

      gsap.fromTo(el,
        { scale: 0.5, opacity: 0.3 },
        {
          scale: 1, opacity: 1,
          duration: 0.4,
          ease: ANIM.ease.elastic,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top ${70 - progress * 30}%`,
            toggleActions: ANIM.scroll.toggleOnce,
          },
        }
      )
    })

    // Content panels crossfade
    contentRefs.current.forEach((el, i) => {
      if (!el) return
      const progress = i / (totalSteps - 1)

      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: ANIM.duration.normal,
          ease: ANIM.ease.luxe,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top ${70 - progress * 30}%`,
            toggleActions: ANIM.scroll.toggleOnce,
          },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="methodology-heading mb-16 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Metodologie
          </p>
          <h2 className="mx-auto mb-4 max-w-2xl font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Cum Decurge <span className="text-gold-gradient">Procesul</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Desktop: Horizontal stepper */}
        <div className="hidden lg:block">
          {/* Step indicators */}
          <div className="relative mb-12 flex items-center justify-between px-8">
            {/* Background line */}
            <div className="absolute left-8 right-8 top-1/2 h-[1px] -translate-y-1/2 bg-grey-500/20" />
            {/* Gold fill line */}
            <div
              ref={lineRef}
              className="absolute left-8 right-8 top-1/2 h-[1px] -translate-y-1/2 bg-gold"
              style={{ transformOrigin: 'left center', transform: 'scaleX(0)' }}
            />

            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { stepsRef.current[i] = el }}
                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/30 bg-black-rich transition-colors"
                style={{ opacity: 0.3 }}
              >
                <span className="font-[var(--font-jetbrains)] text-sm font-bold text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>

          {/* Step content panels */}
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { contentRefs.current[i] = el }}
                className="rounded-xl border border-grey-500/15 bg-black-elevated p-6 text-center"
                style={{ opacity: 0 }}
              >
                <h3 className="mb-2 text-base font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-grey-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden">
          <div className="relative pl-10">
            {/* Vertical line */}
            <div className="absolute bottom-0 left-[18px] top-0 w-[1px] bg-gradient-to-b from-gold via-gold/50 to-gold/10" />

            {steps.map((step, i) => (
              <div key={i} className="relative mb-8 last:mb-0">
                {/* Circle */}
                <div className="absolute -left-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold/40 bg-black-rich">
                  <span className="font-[var(--font-jetbrains)] text-xs font-bold text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mb-1 text-base font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-grey-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/servicii/MethodologyStepper.tsx
git commit -m "feat(servicii): add interactive horizontal stepper with ScrollTrigger"
```

---

## Task 7: EquipmentSection Component

**Files:**
- Create: `src/components/servicii/EquipmentSection.tsx`

- [ ] **Step 1: Create the horizontal scroll equipment cards**

```typescript
// src/components/servicii/EquipmentSection.tsx
"use client"

import { useRef } from 'react'
import * as LucideIcons from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import type { ServicePageData } from '@/lib/services-data'

interface EquipmentSectionProps {
  service: ServicePageData
}

export function EquipmentSection({ service }: EquipmentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.equipment-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.equipment-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.equipment-card',
      { x: 60, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: ANIM.duration.normal,
        stagger: ANIM.stagger.relaxed,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.equipment-scroll', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="equipment-heading mb-12">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Echipamente Profesionale
          </p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Tehnologie de <span className="text-gold-gradient">Ultima Generatie</span>
          </h2>
          <div className="mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Horizontal scroll container */}
        <div className="equipment-scroll -mx-5 flex gap-6 overflow-x-auto px-5 pb-4 snap-x snap-mandatory scrollbar-hide lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0">
          {service.equipment.map((tool) => {
            const Icon = (LucideIcons as Record<string, LucideIcons.LucideIcon>)[tool.icon] || LucideIcons.CircleDot
            return (
              <div
                key={tool.name}
                className="equipment-card min-w-[280px] shrink-0 snap-start rounded-2xl border border-grey-500/15 bg-gradient-to-b from-black-elevated to-black-soft/80 p-8 transition-all duration-500 hover:border-gold/25 lg:min-w-0"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-gold/15 bg-gold/[0.06]">
                  <Icon className="h-6 w-6 text-gold/80" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-white">{tool.name}</h3>
                <p className="mb-3 text-sm font-medium text-gold">{tool.type}</p>
                <p className="text-sm leading-relaxed text-grey-300">{tool.specs}</p>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/servicii/EquipmentSection.tsx
git commit -m "feat(servicii): add horizontal scroll equipment cards"
```

---

## Task 8: DeliverablesSection Component

**Files:**
- Create: `src/components/servicii/DeliverablesSection.tsx`

- [ ] **Step 1: Create the deliverables checklist with gold checkmarks**

```typescript
// src/components/servicii/DeliverablesSection.tsx
"use client"

import { useRef } from 'react'
import { CheckCircle } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import type { ServicePageData } from '@/lib/services-data'

interface DeliverablesSectionProps {
  service: ServicePageData
}

export function DeliverablesSection({ service }: DeliverablesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.deliverables-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.deliverables-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    const items = itemsRef.current.filter(Boolean)
    items.forEach((item, i) => {
      if (!item) return
      const icon = item.querySelector('.check-icon')

      gsap.fromTo(item,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: ANIM.duration.fast,
          delay: i * 0.08,
          ease: ANIM.ease.luxe,
          scrollTrigger: { trigger: '.deliverables-list', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
        }
      )

      if (icon) {
        gsap.fromTo(icon,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            delay: i * 0.08 + 0.2,
            ease: ANIM.ease.elastic,
            scrollTrigger: { trigger: '.deliverables-list', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
          }
        )
      }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        {/* Header */}
        <div className="deliverables-heading mb-12 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Ce Primesti
          </p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Livrabile <span className="text-gold-gradient">Incluse</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Checklist */}
        <div className="deliverables-list space-y-4">
          {service.deliverables.map((item, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el }}
              className="flex items-start gap-4 rounded-lg border border-grey-500/10 bg-black-elevated/50 px-6 py-4 transition-colors hover:border-gold/15"
            >
              <CheckCircle className="check-icon mt-0.5 h-5 w-5 shrink-0 text-gold" style={{ transform: 'scale(0)' }} />
              <span className="text-base text-grey-200">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/servicii/DeliverablesSection.tsx
git commit -m "feat(servicii): add deliverables checklist with elastic checkmarks"
```

---

## Task 9: RelatedServices Component

**Files:**
- Create: `src/components/servicii/RelatedServices.tsx`

- [ ] **Step 1: Create the related services card row**

```typescript
// src/components/servicii/RelatedServices.tsx
"use client"

import { useRef, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SERVICE_PAGES } from '@/lib/services-data'

interface RelatedServicesProps {
  currentSlug: string
}

export function RelatedServices({ currentSlug }: RelatedServicesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([])

  const allServices = Object.values(SERVICE_PAGES)
  const related = allServices.filter((s) => s.slug !== currentSlug).slice(0, 3)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.related-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.related-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    const cards = cardsRef.current.filter(Boolean)
    cards.forEach((card, i) => {
      if (!card) return

      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: ANIM.duration.normal,
          delay: i * 0.12,
          ease: ANIM.ease.luxe,
          scrollTrigger: { trigger: '.related-grid', start: 'top 90%', toggleActions: ANIM.scroll.toggleOnce },
        }
      )
    })
  }, { scope: sectionRef })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>, idx: number) => {
    const card = cardsRef.current[idx]
    if (!card || window.matchMedia('(pointer: coarse)').matches) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(card, { x: x * 0.02, y: y * 0.02, rotateX: -y * 0.008, rotateY: x * 0.008, duration: 0.4, ease: 'power2.out' })
  }, [])

  const handleMouseLeave = useCallback((idx: number) => {
    const card = cardsRef.current[idx]
    if (!card) return
    gsap.to(card, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.6, ease: ANIM.ease.elastic })
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="related-heading mb-16 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Servicii Complementare
          </p>
          <h2 className="mx-auto mb-4 max-w-2xl font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Completeaza <span className="text-gold-gradient">Inspectia</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Cards */}
        <div className="related-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((service, i) => {
            const Icon = (LucideIcons as Record<string, LucideIcons.LucideIcon>)[service.icon] || LucideIcons.CircleDot
            return (
              <a
                key={service.slug}
                href={`/servicii/${service.slug}`}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group relative overflow-hidden rounded-2xl border border-grey-500/15 bg-gradient-to-b from-black-elevated to-black-soft/80 transition-all duration-500 hover:border-gold/25 hover:shadow-[0_8px_40px_rgba(201,168,76,0.06)]"
                style={{ perspective: '800px' }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                <div className="relative z-10 p-8">
                  {/* Gold accent line */}
                  <div className="mb-8 h-[1px] w-12 bg-gradient-to-r from-gold to-gold/30" />

                  {/* Icon */}
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-gold/15 bg-gold/[0.06] transition-all duration-400 group-hover:border-gold/30 group-hover:bg-gold/10">
                    <Icon className="h-5 w-5 text-gold/80 transition-colors duration-400 group-hover:text-gold" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 font-[var(--font-playfair)] text-lg font-semibold text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-grey-300">
                    {service.heroSubheadline.slice(0, 120)}...
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 border-t border-grey-500/10 pt-5">
                    <span className="text-sm font-medium text-gold/80 transition-all duration-300 group-hover:text-gold">
                      Afla mai multe
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-gold/60 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-gold" />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/servicii/RelatedServices.tsx
git commit -m "feat(servicii): add related services cross-sell cards"
```

---

## Task 10: ServiceFAQ and ServiceCTA Components

**Files:**
- Create: `src/components/servicii/ServiceFAQ.tsx`
- Create: `src/components/servicii/ServiceCTA.tsx`

- [ ] **Step 1: Create ServiceFAQ (adapts homepage FAQSection pattern)**

```typescript
// src/components/servicii/ServiceFAQ.tsx
"use client"

import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import type { ServicePageData } from '@/lib/services-data'

function FAQItem({ question, answer, isOpen, onClick }: {
  question: string; answer: string; isOpen: boolean; onClick: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!contentRef.current) return
    gsap.to(contentRef.current, {
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.7,
      ease: 'expo.out',
    })
  }, { dependencies: [isOpen] })

  return (
    <div className={`border-b transition-colors ${isOpen ? 'border-gold/30' : 'border-grey-500/20'}`}>
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-white"
        aria-expanded={isOpen}
      >
        <span className={`pr-4 text-base font-medium transition-colors ${isOpen ? 'text-gold' : 'text-white'}`}>
          {question}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <p className="pb-5 text-sm leading-relaxed text-grey-300">{answer}</p>
      </div>
    </div>
  )
}

interface ServiceFAQProps {
  service: ServicePageData
}

export function ServiceFAQ({ service }: ServiceFAQProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState(0)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.service-faq-heading > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.service-faq-heading', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )

    gsap.fromTo('.service-faq-list',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.service-faq-list', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black-rich py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        {/* Header */}
        <div className="service-faq-heading mb-12 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Intrebari Frecvente</p>
          <h2 className="mb-4 font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
            Raspunsuri la Intrebari <span className="text-gold-gradient">Frecvente</span>
          </h2>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        {/* Accordion */}
        <div className="service-faq-list">
          {service.faq.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create ServiceCTA (simplified final CTA)**

```typescript
// src/components/servicii/ServiceCTA.tsx
"use client"

import { useRef } from 'react'
import { Phone, ArrowRight, MessageCircle } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { ANIM } from '@/lib/animations'
import { SITE } from '@/lib/constants'

interface ServiceCTAProps {
  headline: string
}

export function ServiceCTA({ headline }: ServiceCTAProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo('.service-cta-content > *',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: ANIM.duration.slow,
        stagger: ANIM.stagger.normal,
        ease: ANIM.ease.luxe,
        scrollTrigger: { trigger: '.service-cta-content', start: ANIM.scroll.start, toggleActions: ANIM.scroll.toggleOnce },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="grain-overlay relative overflow-hidden bg-black-pure py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8">
        <div className="service-cta-content">
          <div className="mx-auto mb-8 h-[2px] w-16 bg-gold" />

          <h2 className="mb-6 font-[var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-white">
            {headline}
          </h2>

          <p className="mb-10 text-base text-grey-300">
            Contacteaza-ne pentru o consultatie gratuita. Raspundem in maxim 2 ore.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="btn-shimmer relative inline-flex items-center gap-2 overflow-hidden rounded-md px-8 py-4 text-sm font-bold uppercase tracking-wider text-black-rich transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)]"
              style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A84C, #B8860B)' }}
            >
              Programeaza Inspectia
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href={`tel:${SITE.phoneFormatted}`}
              className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-8 py-4 text-sm font-medium text-gold transition-all hover:border-gold hover:bg-gold/10"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>

            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-gold/20 px-6 py-4 text-sm font-medium text-gold/80 transition-all hover:border-gold/40 hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/servicii/ServiceFAQ.tsx src/components/servicii/ServiceCTA.tsx
git commit -m "feat(servicii): add FAQ accordion and final CTA components"
```

---

## Task 11: Build Verification & Fix

**Files:** All files from Tasks 1-10.

- [ ] **Step 1: Run TypeScript check**

Run: `cd /Users/denistipelea/workspace/homeInspector/core-strategic && npx tsc --noEmit`

Fix any type errors found. Common issues to watch for:
- `params` type in Next.js 16 may need to be `Promise<{ slug: string }>` — check `node_modules/next/dist/docs/` for the current API
- Import paths must use `@/` alias which maps to `./src/`
- Lucide icon dynamic lookup type casting

- [ ] **Step 2: Run ESLint**

Run: `npm run lint`

Fix any linting errors.

- [ ] **Step 3: Run dev server and verify pages load**

Run: `npm run dev`

Visit each page manually:
- `http://localhost:3000/servicii/verificare-documentatie-tehnica`
- `http://localhost:3000/servicii/verificare-elemente-structuri`
- `http://localhost:3000/servicii/scanare-termografica`
- `http://localhost:3000/servicii/verificare-instalatii`
- `http://localhost:3000/servicii/determinare-umiditate`
- `http://localhost:3000/servicii/expertize-tehnice`

Check: No console errors, no hydration mismatches, all sections render.

- [ ] **Step 4: Run production build**

Run: `npm run build`

Expected: All 6 pages statically generated, zero errors.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix(servicii): resolve build errors and type issues"
```

---

## Task 12: Update Header Navigation (Optional)

**Files:**
- Modify: `src/components/layout/Header.tsx:9-16` (NAV_LINKS array)

- [ ] **Step 1: Add Servicii link to navigation if not already linking to service pages**

The current header uses anchor links (`#servicii`). Consider whether the servicii link should navigate to the services section on homepage or to a `/servicii` listing page. For now, the anchor link on the homepage already scrolls to the services section which links to individual service pages via "Afla mai multe" arrows.

If a `/servicii` listing page is needed later, that would be a separate task.

- [ ] **Step 2: Verify navigation works from service pages back to homepage**

On service pages, the `#servicii` anchor link should navigate to `/#servicii`. Update if needed:

In `Header.tsx`, change anchor links to include the base path when not on homepage:

```typescript
// Only needed if links don't work from service pages
// For now, test and fix if broken
```

- [ ] **Step 3: Commit if changes were made**

```bash
git add src/components/layout/Header.tsx
git commit -m "fix(nav): ensure header links work from service pages"
```
