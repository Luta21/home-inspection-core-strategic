// src/lib/services-data.ts

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
