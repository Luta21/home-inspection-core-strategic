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
  whoNeedsThis: { persona: string; scenario: string }[]
  risks: { title: string; cost: string; desc: string }[]
  reportHighlights: string[]
}

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  'verificare-documentatie-tehnica': {
    slug: 'verificare-documentatie-tehnica',
    title: 'Verificarea Documentației Tehnice',
    icon: 'FileCheck',
    heroLabel: 'Documentație & Conformitate Legală',
    heroHeadline: 'Proiect vs. Execuție:',
    heroHeadlineGold: 'Adevărul din Documente.',
    heroSubheadline: 'Verificăm cartea tehnică a construcției, corelăm proiectul tehnic cu execuția reală și identificăm orice neconcordanță înainte să semnezi contractul. Raport complet în 48h.',
    concernHeading: 'De ce 6 din 10 cumpărători regretă că n-au verificat documentația?',
    concernBody: [
      'Cartea tehnică a construcției și autorizația de construire sunt fundația legală a oricărui imobil. Fără ele, nu poți obține autorizație pentru renovare, nu poți înregistra modificări la cadastru și riști blocaje la revânzare — uneori la ani distanță de achiziție.',
      'Neconcordanța dintre proiectul tehnic aprobat și execuția reală este mai frecventă decât crezi: suprafețe modificate, structuri schimbate fără proiect, instalații deviate față de proiect. Acestea devin probleme legale și financiare care cad exclusiv pe cumpărător.',
      'O verificare profesională a documentației tehnice înainte de semnare îți oferă putere de negociere reală: fie obții remedierea problemelor, fie reduci prețul, fie eviți o capcană costisitoare. Este singura protecție concretă înainte de tranzacție.',
    ],
    concernStats: [
      { value: '62%', label: 'Din imobilele verificate prezintă neconcordanțe documentație-execuție' },
      { value: '€8.500+', label: 'Costul mediu al regularizărilor legale nedetectate la achiziție' },
      { value: '48h', label: 'Termen livrare raport complet de conformitate documentară' },
    ],
    benefits: [
      { icon: 'FileSearch', title: 'Verificare Carte Tehnică', desc: 'Analizăm completitudinea cărții tehnice: procese verbale, recepție finală, avize, modificări înregistrate.' },
      { icon: 'GitCompare', title: 'Corelație Proiect–Execuție', desc: 'Comparăm planurile aprobate (arhitectură, structură, instalații) cu situația reală din imobil.' },
      { icon: 'Scale', title: 'Conformitate Legală și Cadastrală', desc: 'Verificăm concordanța cu extrasul CF, autorizația de construire și reglementările urbanistice în vigoare.' },
      { icon: 'ShieldCheck', title: 'Raport Scris de Conformitate', desc: 'Livrăm un raport structurat cu fiecare neconcordanță identificată, gradul de risc și recomandările de acțiune.' },
    ],
    methodology: [
      { title: 'Colectare și Pre-Analiză Documente', desc: 'Solicităm cartea tehnică, proiectul tehnic (arhitectură, structură, instalații), autorizația de construire și extrasul de carte funciară. Identificăm din birou eventualele lipsuri înainte de vizita pe teren.' },
      { title: 'Analiză Documentară Detaliată', desc: 'Verificăm completitudinea dosarului tehnic, calitatea întocmirii documentelor, existența proceselor verbale de recepție pe faze și conformitatea cu normativele aplicabile.' },
      { title: 'Verificare pe Teren și Corelație', desc: 'Comparăm la fața locului dimensiunile, compartimentările, poziția instalațiilor și elementele structurale vizibile cu planurile din proiectul tehnic aprobat.' },
      { title: 'Raport Final și Consultanță', desc: 'Întocmim raportul complet cu toate neconcordanțele identificate, clasificate după severitate, plus recomandări concrete pentru regularizare sau negociere.' },
    ],
    equipment: [
      { icon: 'Ruler', name: 'Distanțometru Laser', type: 'Verificare Dimensiuni', specs: 'Precizie ±1mm — comparare suprafețe și compartimentări față de planuri' },
      { icon: 'Camera', name: 'Documentare Foto Adnotată', type: 'Evidență Vizuală', specs: 'Fotografii cu markup tehnic pentru fiecare neconcordanță identificată' },
      { icon: 'ClipboardCheck', name: 'Checklist Normativ Complet', type: 'Conformitate Legală', specs: 'Verificare față de Legea 10/1995, NP 051, regulament local de urbanism' },
    ],
    deliverables: [
      'Raport scris de conformitate documentație-execuție (PDF, semnat)',
      'Dosar fotografic adnotat cu toate neconcordanțele identificate',
      'Listă completă a lipsurilor documentare și riscurilor legale asociate',
      'Clasificarea neconcordanțelor pe grade de severitate (minor / semnificativ / blocant)',
      'Recomandări de remediere și regularizare prioritizate',
      'Consultanță telefonică post-livrare inclusă (30 minute)',
    ],
    ctaHeadline: 'Nu semna contractul fără să știi ce cumperi.',
    ctaSubtext: 'Programează verificarea documentației tehnice — raport complet în 48h. Sună acum: 0745 123 456.',
    faq: [
      { question: 'Ce documente sunt necesare pentru verificarea documentației tehnice?', answer: 'Documentele esențiale sunt: cartea tehnică a construcției, proiectul tehnic (planuri arhitectură, structură, instalații), autorizația de construire, procesele verbale de recepție și extrasul din cartea funciară. Dacă unele documente lipsesc, vom lucra cu ce este disponibil și vom semnala explicit fiecare lipsă în raport — lipsa unui document este în sine un risc documentat.' },
      { question: 'Cât costă și cât durează verificarea documentației tehnice pentru un apartament?', answer: 'Durata totală este de regulă 1-2 zile lucrătoare pentru analiza documentară plus 2-3 ore pentru vizita pe teren. Raportul final este livrat în maxim 48 de ore de la finalizarea inspecției. Contactați-ne la 0745 123 456 pentru un deviz personalizat în funcție de suprafață și tipul imobilului.' },
      { question: 'Verificarea documentației tehnice este necesară și la apartamente noi, de la dezvoltator?', answer: 'Da — la apartamentele noi este chiar mai importantă. Proiectele rezidențiale mari pot prezenta diferențe între planurile aprobate și execuția reală (compartimentări modificate, suprafețe alterate, instalații deviate). Verificarea înainte de semnarea procesului verbal de predare-primire este singurul moment în care poți impune remedierea pe costul dezvoltatorului.' },
      { question: 'Ce se întâmplă dacă dezvoltatorul sau vânzătorul refuză să furnizeze documentația?', answer: 'Refuzul accesului la documentația tehnică este un semnal de alarmă major și reprezintă în sine un motiv de reconsiderare a tranzacției. Putem efectua o verificare vizuală și dimensională pe teren care documentează situația existentă, dar nu poate înlocui complet lipsa documentelor legale. Vă sfătuim să condiționați semnarea contractului de furnizarea integrală a documentației tehnice.' },
    ],
    closingHeadline: 'Documentele verificate înseamnă tranzacție fără surprize.',
    metaTitle: 'Verificare Documentație Tehnică Imobil București',
    metaDescription: 'Verificare profesională documentație tehnică imobil în București și Ilfov. Carte tehnică, concordanță proiect-execuție, conformitate legală. Raport în 48h. Sună: 0745 123 456.',
    metaKeywords: [
      'verificare documentatie tehnica imobil',
      'carte tehnica constructie bucuresti',
      'concordanta proiect executie',
      'verificare documente casa apartament',
      'inspectie documentatie imobiliara',
      'verificare autorizatie construire',
      'conformitate legala imobil bucuresti',
      'verificare carte funciara proiect tehnic',
      'due diligence documentatie imobil',
      'inspector imobiliar documentatie bucuresti',
      'verificare documente apartament nou',
      'raport conformitate documentatie tehnica',
    ],
    whoNeedsThis: [],
    risks: [],
    reportHighlights: [],
  },

  'verificare-elemente-structuri': {
    slug: 'verificare-elemente-structuri',
    title: 'Verificare Elemente Structuri',
    icon: 'Shield',
    heroLabel: 'Inspecție Structurală Profesională',
    heroHeadline: 'Structura Solidă,',
    heroHeadlineGold: 'Investiția Sigură.',
    heroSubheadline: 'Verificăm armăturile din stâlpi, grinzi și planșee, detectăm defecte ascunse de betonare și corelăm execuția cu proiectul tehnic înainte de cumpărare. Test sclerometric beton inclus.',
    concernHeading: 'De ce este critică verificarea structurală înainte de cumpărare?',
    concernBody: [
      'Stâlpii, grinzile, diafragmele și planșeele sunt scheletul invizibil al oricărei clădiri. Viciile structurale — armături lipsă, beton de calitate inferioară, vibrare deficitară — sunt complet ascunse după finisare și nu pot fi detectate fără echipamente specializate.',
      'O inspecție structurală efectuată înainte de achiziție identifică problemele cât timp mai ai putere de negociere. Corelarea execuției cu proiectul tehnic și detaliile de execuție (D.D.E.) poate scoate la lumină abateri grave față de proiectul autorizat — abateri pentru care constructorul răspunde legal.',
      'Expertiza structurală a unui imobil nu este un lux — este singura modalitate de a ști dacă plătești prețul corect. O structură compromisă poate genera costuri de consolidare și remediere care depășesc cu ușurință valoarea tranzacției.',
    ],
    concernStats: [
      { value: '1 din 3', label: 'Blocuri noi din București prezintă abateri față de proiectul de structură' },
      { value: '€20k–€50k', label: 'Costul mediu al consolidării structurale la o locuință' },
      { value: '0', label: 'Compromisuri acceptabile la structura de rezistență a clădirii' },
    ],
    benefits: [
      { icon: 'ScanSearch', title: 'Detectare Armături', desc: 'Scanăm nedistructiv stâlpii și grinzile — verificăm diametrul barelor, repartiția etrierilor și acoperirea cu beton.' },
      { icon: 'Hammer', title: 'Test Sclerometric Beton', desc: 'Determinăm clasa betonului pus în operă conform SR EN 12504-2 cu sclerometru digital calibrat metrologic.' },
      { icon: 'GitCompare', title: 'Corelație Proiect–Execuție', desc: 'Comparăm execuția reală cu detaliile de execuție (D.D.E.) și planurile de armare din proiectul autorizat.' },
      { icon: 'AlertTriangle', title: 'Identificare Vicii Ascunse', desc: 'Detectăm segregări de beton, zone nevibrare, fisuri structurale și alte defecte invizibile după finisaj.' },
    ],
    methodology: [
      { title: 'Analiză Documentație Structurală', desc: 'Studiem proiectul de structură, planurile de armare și detaliile de execuție (D.D.E.) pentru a stabili ce și unde trebuie verificat.' },
      { title: 'Inspecție Vizuală Detaliată', desc: 'Examinăm toate elementele structurale accesibile: stâlpi, grinzi, planșee, diafragme, pereți de beton. Identificăm fisuri, segregări, deformații și degradări.' },
      { title: 'Verificare Instrumentală Nedistructivă', desc: 'Folosim cover meter profesional (detector armături) și sclerometru digital pentru a măsura precis fără a deteriora structura.' },
      { title: 'Raport Tehnic cu Recomandări', desc: 'Corelăm toate constatările cu documentația tehnică și emitem un raport structurat cu harta defectelor, concluzii clare și recomandări de remediere sau consolidare.' },
    ],
    equipment: [
      { icon: 'Scan', name: 'Cover Meter / Detector Armături', type: 'Scanare Nedistructivă', specs: 'Detectare armături, măsurare acoperire beton, estimare diametru bare' },
      { icon: 'Hammer', name: 'Sclerometru Digital Schmidt', type: 'Test Sclerometric Beton', specs: 'Determinare clasă beton conform SR EN 12504-2, calibrat metrologic' },
      { icon: 'Camera', name: 'Documentare Foto HD + Macro', type: 'Evidență Vizuală', specs: 'Fotografiere macro fisuri, segregări, defecte de turnare — geotagged' },
    ],
    deliverables: [
      'Raport tehnic de inspecție structurală (20–30 pagini)',
      'Hartă grafică a defectelor pe elemente structurale',
      'Documentare fotografică numerotată și adnotată',
      'Rezultate complete ale testării sclerometrice (clasă beton per element)',
      'Tabel de corelație proiect–execuție cu evidențierea neconcordanțelor',
      'Recomandări tehnice de consolidare sau remediere (cu prioritizare)',
      'Estimare orientativă costuri remediere pentru negocierea prețului de achiziție',
    ],
    ctaHeadline: 'Structura se verifică înainte de semnarea contractului, nu după.',
    ctaSubtext: 'Programează o inspecție structurală profesională în București și Ilfov. Raport în 48h. Sună acum: 0745 123 456.',
    faq: [
      { question: 'Se poate face inspecție structurală la un apartament finisiat?', answer: 'Da. Detectorul de armături (cover meter) funcționează nedistructiv prin finisaje de până la 100mm grosime. Verificăm stâlpii, grinzile și planșeele chiar și la apartamentele cu pereți gata finisați. Inspectăm suplimentar subsolul tehnic și zonele comune unde structura este expusă.' },
      { question: 'Ce înseamnă testare sclerometrică și la ce ajută?', answer: 'Testul sclerometric (test Schmidt) măsoară duritatea suprafeței betonului și estimează clasa acestuia conform SR EN 12504-2. Îți spune dacă s-a turnat beton C20/25 sau doar C12/15 — o diferență critică pentru rezistența la seism. Testarea este nedistructivă și lasă urme minime (sub 3mm diametru).' },
      { question: 'Cât durează o verificare structurală completă?', answer: 'Inspecția pe teren durează 3–4 ore pentru un apartament și 5–7 ore pentru o casă sau imobil mai mare. Raportul tehnic complet este livrat în maximum 48 de ore de la inspecție. Serviciul acoperă București și județul Ilfov.' },
      { question: 'Poate fi folosit raportul pentru negocierea prețului sau în instanță?', answer: 'Da. Raportul nostru tehnic este un document structurat, cu fotografii numerotate, măsurători instrumentale și concluzii argumentate. Poate fi folosit pentru negocierea prețului de achiziție, reclamații față de constructor sau ca probă în litigii legate de vicii ascunse structurale.' },
      { question: 'Faceți inspecție structurală și la case, nu doar la blocuri?', answer: 'Efectuăm inspecții structurale atât la apartamente în blocuri (inclusiv blocuri ANL sau blocuri vechi interbelice), cât și la case individuale, vile și imobile comerciale. Pentru case, verificăm suplimentar fundația, pereții portanți, centura de beton și șarpanta.' },
    ],
    closingHeadline: 'Siguranța structurală a casei tale nu se negociază.',
    metaTitle: 'Inspecție Structurală Imobil București | Core Strategic',
    metaDescription: 'Verificare structurală profesională înainte de cumpărare în București & Ilfov. Armături, test sclerometric beton, corelație proiect-execuție. Raport 48h. Sună: 0745 123 456.',
    metaKeywords: ['inspectie structurala bucuresti', 'verificare structura apartament', 'verificare structurala inainte de cumparare', 'test sclerometric beton', 'verificare armatura stalpi grinzi', 'expertiza structurala imobil', 'verificare elemente structuri', 'inspectie structurala casa bucuresti', 'detectie armatura nedistructiva', 'verificare beton bloc nou', 'vicii ascunse structurale', 'inspectie imobil ilfov'],
    whoNeedsThis: [],
    risks: [],
    reportHighlights: [],
  },

  'scanare-termografica': {
    slug: 'scanare-termografica',
    title: 'Scanare Termografică Profesională',
    icon: 'Thermometer',
    heroLabel: 'Termografie cu Flir E60',
    heroHeadline: 'Vedem Ce Ochiul',
    heroHeadlineGold: 'Nu Poate Vedea.',
    heroSubheadline: 'Detectăm punți termice, defecte de izolație, infiltrații ascunse și pierderi de căldură cu camera profesională Flir E60 (320×240px, 0.05°C sensibilitate). Audit termic complet, raport în 48h.',
    concernHeading: 'De ce crește factura la căldură an de an?',
    concernBody: [
      'Punțile termice și defectele de izolație sunt invizibile ochiului liber, dar costă lunar: un apartament cu izolație deficitară pierde 25–35% din energia de încălzire prin pereți, colțuri și planșee. Mucegaiul care apare ulterior este doar simptomul — nu cauza.',
      'Infiltrațiile ascunse în pereți sau tavane degradează structura de rezistență în tăcere: umiditatea în beton reduce capacitatea portantă cu până la 40% în 10 ani și provoacă alergii și probleme respiratorii locatarilor.',
      'Scanarea termografică profesională identifică toate aceste probleme într-o singură vizită, non-invaziv, înainte de achiziție sau renovare — și vă oferă putere reală de negociere a prețului sau claritate asupra bugetului de reabilitare.',
    ],
    concernStats: [
      { value: '30%', label: 'Pierderi energetice medii din punți termice și izolație deficitară' },
      { value: '€4k–10k', label: 'Cost mediu remediere izolație la apartament nedepistată la timp' },
      { value: '0.05°C', label: 'Sensibilitate termică Flir E60 — detectează anomalii imperceptibile' },
    ],
    benefits: [
      { icon: 'ThermometerSun', title: 'Detectare Punți Termice', desc: 'Localizăm exact zonele cu izolație lipsă sau deficitară în pereți, colțuri, planșee și buiandrugi — vizualizare în timp real pe termogramă.' },
      { icon: 'Droplets', title: 'Infiltrații și Umiditate Ascunsă', desc: 'Detectăm infiltrații de apă și acumulări de umiditate în pereți, tavane și pardoseli înainte să apară mucegaiul vizibil.' },
      { icon: 'Zap', title: 'Anomalii Electrice', desc: 'Evidențiem supraîncălziri la tabloul electric, conexiuni defecte și cabluri suprasolicitate — risc de incendiu eliminat preventiv.' },
      { icon: 'Heater', title: 'Eficiență Termică Instalații', desc: 'Verificăm distribuția uniformă a căldurii în calorifere, identificăm zone colmatate și pierderile la conductele de încălzire.' },
    ],
    methodology: [
      { title: 'Verificare Condiții de Scanare', desc: 'Confirmăm diferența de temperatură interior-exterior de minim 10°C și absența expunerii solare directe pe fațadă — condiții obligatorii pentru termograme valide.' },
      { title: 'Scanare Termică Interioară', desc: 'Parcurgem sistematic toți pereții, tavanele, pardoselile, colțurile și joncțiunile structurale, captând anomalii termice cu camera Flir E60.' },
      { title: 'Scanare Termică Exterioară', desc: 'Termoscanăm fațadele exterioare pentru identificarea punților termice la scară macro, defectelor de tencuială termoizolantă și rosturilor de dilatare.' },
      { title: 'Audit Termic Instalații', desc: 'Scanăm tabloul electric, distribuitoarele de încălzire și conductele accesibile pentru detectarea supraîncălzirilor și pierderilor de căldură.' },
      { title: 'Raport Termografic Detaliat', desc: 'Procesăm toate termogramele, le suprapunem cu fotografii reale și întocmim raportul cu clasificarea defectelor, severitate și recomandări de remediere prioritizate.' },
    ],
    equipment: [
      { icon: 'Camera', name: 'Flir E60', type: 'Cameră Termografică Profesională', specs: 'Rezoluție 320×240px, sensibilitate 0.05°C, domeniu -20°C la +650°C, MSX® enhancement' },
      { icon: 'Thermometer', name: 'Termometru IR de Precizie', type: 'Măsurare Punctuală Suprafețe', specs: 'Verificare și corelare temperaturi de suprafață pentru validarea termogramelor' },
      { icon: 'Wind', name: 'Anemometru Digital', type: 'Detectare Infiltrații Aer', specs: 'Măsurare curenți de aer la ferestre, uși și rosturi pentru confirmarea infiltrațiilor' },
    ],
    deliverables: [
      'Raport termografic profesional cu toate termogramele adnotate și geo-referențiate',
      'Fotografii reale suprapuse cu imagini termice (tehnologie MSX®)',
      'Hartă completă a punților termice și clasificare după severitate',
      'Inventar defecte de izolație cu localizare precisă pe plan',
      'Analiza anomaliilor electrice și termice la instalații',
      'Recomandări de remediere prioritizate cu estimări orientative de cost',
      'Consultanță energetică inclusă — opțiuni de reabilitare termică',
    ],
    ctaHeadline: 'Oprește pierderile de căldură și factura în creștere.',
    ctaSubtext: 'Programează scanarea termografică acum — raport complet cu termograme în 48h. Sună: 0745 123 456.',
    faq: [
      { question: 'Care este prețul unei scanări termografice în București?', answer: 'Prețul variază în funcție de suprafața și tipul proprietății (apartament, casă, bloc). Contactați-ne la 0745 123 456 pentru o ofertă personalizată. Includem deplasarea în București și Ilfov, scanarea completă și raportul termografic cu termograme adnotate.' },
      { question: 'Când este cel mai bun moment pentru o scanare termografică?', answer: 'Sezonul rece (octombrie–aprilie) este ideal pentru auditul termic al anvelopei, când diferența de temperatură interior-exterior depășește 10°C. Scanarea instalațiilor electrice și detectarea infiltrațiilor de apă se pot efectua în orice anotimp.' },
      { question: 'Scanarea termografică poate detecta mucegaiul din pereți?', answer: 'Termografia identifică zonele cu umiditate ridicată și temperaturi scăzute care favorizează apariția mucegaiului, chiar înainte ca acesta să devină vizibil. Aceasta permite intervenția preventivă înainte de degradarea structurii și riscurile pentru sănătate.' },
      { question: 'Ce cameră termografică folosiți — nu e doar un accesoriu de telefon?', answer: 'Utilizăm camera profesională Flir E60 cu rezoluție 320×240px și sensibilitate de 0.05°C — echipament de clasă industrială, incomparabil cu modulele atașabile telefonului (64×48px). Diferența este vizibilă direct în calitatea diagnosticului.' },
      { question: 'Termografia este utilă și la blocuri sau doar la case?', answer: 'Efectuăm termografie atât la apartamente și blocuri (inclusiv scanare fațadă exterioară), cât și la case individuale, spații comerciale și clădiri industriale. Identificăm punțile termice specifice construcțiilor din panouri prefabricate, frecvente în blocurile din perioada comunistă.' },
      { question: 'Pot face termografie vara dacă am probleme cu infiltrațiile?', answer: 'Pentru detectarea infiltrațiilor de apă și a umidității ascunse, termografia funcționează eficient în orice anotimp. Auditul termic al izolației și punților termice necesită diferență de temperatură, deci vara este mai puțin eficient pentru acea componentă specifică.' },
    ],
    closingHeadline: 'O scanare termografică astăzi poate economisi mii de euro în facturi și reparații.',
    metaTitle: 'Scanare Termografică București | Punți Termice Flir E60',
    metaDescription: 'Scanare termografică profesională București și Ilfov. Punți termice, infiltrații, mucegai ascuns. Flir E60. Raport în 48h. Sună: 0745 123 456.',
    metaKeywords: ['scanare termografica bucuresti', 'termografie profesionala', 'detectare punti termice', 'camera termoviziune flir e60', 'audit termic apartament', 'termografie bloc bucuresti', 'detectare infiltratii ascunse', 'pierderi caldura termografie', 'inspectie termica imobil', 'scanare termografica pret', 'termografie in constructii', 'audit energetic imobil'],
    whoNeedsThis: [],
    risks: [],
    reportHighlights: [],
  },

  'verificare-instalatii': {
    slug: 'verificare-instalatii',
    title: 'Verificare Instalații Complete',
    icon: 'Zap',
    heroLabel: 'Audit Instalații',
    heroHeadline: 'Instalații Verificate,',
    heroHeadlineGold: 'Risc Zero.',
    heroSubheadline: 'Audit complet al instalației electrice, sanitare, termice și de climatizare. Verificăm tabloul electric, centrala termică, presiunea apei și conformitatea cu normativele I7 și I9 — înainte să cumpărați sau renovați.',
    concernHeading: 'De ce contează verificarea instalațiilor înainte de cumpărare?',
    concernBody: [
      'Instalația electrică deficitară cauzează 6 din 10 incendii rezidențiale din România. Cabluri subdimensionate, împământare lipsă sau tablou electric neconform cu normativul I7 sunt pericole invizibile — pe care ochiul liber nu le detectează, dar un inspector certificat le identifică în câteva minute.',
      'O inundație dintr-un racord sanitar fisurat sau un tub de canalizare degradat poate provoca daune de zeci de mii de euro în câteva ore. Refacerea completă a instalației sanitare a unui apartament costă între 2.000 și 6.000 EUR; a celei electrice, între 3.000 și 8.000 EUR.',
      'Auditul profesional de instalații identifică toate aceste riscuri înainte de semnarea contractului. Cunoașteți exact costul real al remedierii și negociați prețul imobilului din poziție de forță.',
    ],
    concernStats: [
      { value: '60%', label: 'Din incendiile rezidențiale — cauzate de instalații electrice neconforme' },
      { value: '€3k–8k', label: 'Costul mediu refacere instalație electrică apartament' },
      { value: '4 sisteme', label: 'Verificate complet: electric, sanitar, termic, climatizare' },
    ],
    benefits: [
      { icon: 'Zap', title: 'Instalație Electrică', desc: 'Tablou electric, secțiuni cabluri, împământare, protecție diferențială — conformitate normativ I7.' },
      { icon: 'Droplets', title: 'Instalație Sanitară', desc: 'Presiune apă, etanșeitate racorduri, stare canalizare, materiale și conformitate normativ I9.' },
      { icon: 'Flame', title: 'Instalație Termică', desc: 'Centrală termică, distribuție agent termic, corpuri de încălzire, randament și pierderi.' },
      { icon: 'AirVent', title: 'Climatizare & Ventilație', desc: 'Unități AC, ventilație mecanică, hote de bucătărie, tiraj coșuri de fum.' },
    ],
    methodology: [
      { title: 'Audit Instalație Electrică', desc: 'Verificăm tabloul electric, secțiunile cablurilor față de sarcina reală, prezența împământării, funcționarea diferențialelor și conformitatea cu normativul I7. Măsurăm impedanța buclei de defect și testăm RCD-urile conform SR EN 61008.' },
      { title: 'Audit Instalație Sanitară', desc: 'Testăm presiunea rețelei de apă rece și caldă, verificăm etanșeitatea tuturor racordurilor, starea coloanelor și a canalizării, materialele utilizate și conformitatea cu normativul I9.' },
      { title: 'Audit Instalație Termică', desc: 'Inspectăm centrala termică (parametri funcționare, vârstă, eficiență), distribuția agentului termic, corpurile de încălzire și detectăm colmatări sau pierderi în sistem.' },
      { title: 'Audit Climatizare & Ventilație', desc: 'Verificăm unitățile de aer condiționat (filtre, drenaj, stare freon), ventilația mecanică sau naturală, hotele și tirajul coșurilor de fum — risc de intoxicare cu CO.' },
      { title: 'Raport Integrat cu Prioritizare', desc: 'Livrăm un raport unificat de 25-30 pagini cu starea fiecărui sistem, defectele clasificate pe trei niveluri de urgență (critic / important / recomandat) și estimări de cost pentru remediere.' },
    ],
    equipment: [
      { icon: 'Gauge', name: 'Multimetru Digital Profesional', type: 'Măsurători Electrice', specs: 'Tensiune, curent, rezistență, continuitate, impedanță buclă de defect' },
      { icon: 'Activity', name: 'Tester RCD / Diferențial', type: 'Protecție Electrică', specs: 'Verificare timp de declanșare și curent rezidual conform SR EN 61008' },
      { icon: 'Thermometer', name: 'Camera Termografică Flir E60', type: 'Termografie Instalații', specs: 'Detectare contacte imperfecte, supraîncălziri, colmatări conducte ascunse' },
      { icon: 'Droplets', name: 'Manometru Digital', type: 'Presiune & Etanșeitate', specs: 'Testare presiune statică și dinamică instalații sanitare' },
    ],
    deliverables: [
      'Raport detaliat verificare instalații (25-30 pagini, format PDF)',
      'Documentare foto completă pentru fiecare sistem verificat',
      'Rezultate măsurători electrice: tensiuni, rezistențe, impedanță buclă',
      'Raport test funcțional protecții electrice (RCD/diferențiale)',
      'Rezultate test presiune și etanșeitate instalație sanitară',
      'Evaluare stare și vârstă centrală termică cu recomandare înlocuire',
      'Listă defecte clasificate pe niveluri de urgență (critic / important / recomandat)',
      'Estimare costuri remediere detaliată per sistem de instalații',
    ],
    ctaHeadline: 'Un incendiu sau o inundație costă de 100 de ori mai mult decât auditul.',
    ctaSubtext: 'Programați un audit complet al instalațiilor înainte de cumpărare sau renovare. Raport în 48h, garanție profesională. Sună acum: 0745 123 456.',
    faq: [
      { question: 'Verificați și instalația de gaz?', answer: 'Verificarea și autorizarea instalațiilor de gaz este reglementată de ANRE și necesită autorizație specifică. Inspecționăm vizual traseul conductelor și starea racordurilor, dar testarea etanșeității sub presiune o recomandăm unui verificator autorizat ANRE — pe care vi-l putem indica.' },
      { question: 'Trebuie să fie curentul și apa pornite în timpul inspecției?', answer: 'Da. Verificarea instalației electrice necesită alimentare activă pentru a testa diferențialele și a măsura impedanța buclei. Instalația sanitară trebuie să aibă apă curentă pentru testele de presiune. Centrala termică trebuie să fie funcțională pentru evaluarea randamentului.' },
      { question: 'Cât durează auditul complet de instalații?', answer: 'La un apartament de 2-3 camere, auditul complet al celor patru sisteme durează 3-4 ore. La o casă individuală, 5-7 ore. Raportul scris este livrat în maxim 48 de ore de la inspecție.' },
      { question: 'Puteți detecta probleme la instalațiile ascunse în pereți?', answer: 'Da. Cu camera termografică Flir E60 detectăm supraîncălziri ale cablurilor electrice, contacte imperfecte și conducte de apă caldă sau agent termic ascunse în pereți. Pentru trasee exacte ale instalațiilor mascate recomandăm o scanare termografică dedicată.' },
      { question: 'Ce normative electrice verificați?', answer: 'Verificăm conformitatea instalației cu normativul I7/2011 (instalații electrice la tensiune joasă) și cu standardele SR EN 61008 / SR EN 61009 pentru protecțiile diferențiale. Identificăm inclusiv cabluri ALCu (aluminiu-cupru) interzise în instalațiile noi, care prezintă risc ridicat de incendiu.' },
      { question: 'Ce se întâmplă dacă găsiți defecte grave?', answer: 'Defectele critice — risc imediat de incendiu sau inundație — sunt marcate explicit în raport și comunicate verbal pe loc. Furnizăm documentația necesară pentru a negocia reducerea prețului imobilului sau pentru a solicita remedierea de către vânzător înainte de semnarea contractului.' },
    ],
    closingHeadline: 'Instalații verificate — nicio surpriză după mutare.',
    metaTitle: 'Verificare Instalații Electrice și Sanitare București',
    metaDescription: 'Audit instalații electrice, sanitare și termice în București. Verificare tablou electric, centrală termică, presiune apă. Raport în 48h. Sună: 0745 123 456.',
    metaKeywords: ['verificare instalatie electrica apartament', 'audit instalatii electrice bucuresti', 'inspectie instalatii sanitare', 'verificare centrala termica', 'verificare tablou electric', 'test instalatie electrica normativ i7', 'inspectie instalatii imobil inainte cumparare', 'verificare instalatii casa bucuresti ilfov', 'audit instalatii sanitare bucuresti', 'verificare presiune apa apartament', 'inspector instalatii electrice bucuresti', 'verificare instalatii complete imobil'],
    whoNeedsThis: [],
    risks: [],
    reportHighlights: [],
  },

  'determinare-umiditate': {
    slug: 'determinare-umiditate',
    title: 'Determinare Umiditate Structuri',
    icon: 'Droplets',
    heroLabel: 'Diagnostic Umiditate & Infiltrații',
    heroHeadline: 'Umiditate în Pereți?',
    heroHeadlineGold: 'Găsim Sursa în 2 Ore.',
    heroSubheadline: 'Măsurare non-invazivă a umidității cu higrometrul profesional Flir MR160. Detectăm infiltrații ascunse în pereți, tavan și pardoseală — acoperiș, fațadă, fundație sau conducte sparte — înainte să apară mucegaiul.',
    concernHeading: 'Umiditatea în perete: de ce nu poți ignora problema?',
    concernBody: [
      'Umiditatea ridicată în structuri este cauza nr. 1 a mucegaiului în apartamente și case. Sporii de mucegai provoacă afecțiuni respiratorii, alergii și astm — mai ales la copii și vârstnici. Ce e mai grav: umiditatea lucrează ascuns, în spatele gletelui și al tapetului, timp de luni sau ani înainte să devină vizibilă.',
      'Sursele de infiltrații sunt multiple și adesea confundate: infiltrații prin acoperiș sau terasă, capilaritate ascendentă din fundație, conducte sparte în pereți, rosturi de dilatație defecte sau condensare din cauza termopanelor fără ventilație. Fiecare cauză necesită o soluție diferită — tratarea simptomelor fără diagnosticul corect înseamnă bani aruncați și probleme recurente.',
      'Măsurarea umidității în pereți cu echipamente profesionale este singurul mod de a confirma sau infirma o problemă înainte de cumpărare, renovare sau reclamație la administrator. Un raport de specialitate îți oferă argumentul documentat de care ai nevoie.',
    ],
    concernStats: [
      { value: '40%', label: 'Din apartamentele din București au umiditate ridicată în cel puțin un perete' },
      { value: '€3k-15k', label: 'Costul mediu al remedierii infiltrațiilor cronice nedepistate la timp' },
      { value: '72h', label: 'Timpul în care mucegaiul se poate forma pe suprafețe cu umiditate peste 80% RH' },
    ],
    benefits: [
      { icon: 'Droplets', title: 'Măsurare Non-Invazivă', desc: 'Determinăm nivelul exact de umiditate în beton, tencuială, glet, lemn și șapă — fără a deteriora finisajele.' },
      { icon: 'Search', title: 'Detectare Sursa Infiltrației', desc: 'Localizăm cu precizie sursa: infiltrație acoperiș, fisură fațadă, conductă spartă sau capilaritate fundație.' },
      { icon: 'Thermometer', title: 'Corelație Termică', desc: 'Combinăm higrometrul cu camera termografică Flir E60 pentru a vizualiza zonele umede ascunse.' },
      { icon: 'FileText', title: 'Raport cu Plan de Remediere', desc: 'Primești soluții concrete și priorități clare, nu doar date brute. Raport PDF livrat în 48h.' },
    ],
    methodology: [
      { title: 'Inspecție Vizuală & Anamneză', desc: 'Documentăm urmele vizibile — pete de umiditate, eflorescențe albe, mucegai negru, bășici de vopsea, decolorări — și istoricul problemei.' },
      { title: 'Cartografiere Higrometrică', desc: 'Scanăm sistematic toți pereții, pardoselile și tavanele cu higrometrul Flir MR160 și înregistrăm o hartă a umidității pe zone și niveluri.' },
      { title: 'Corelație Termografică', desc: 'Suprapunem harta de umiditate cu termogramele Flir E60 pentru a identifica precis sursa infiltrației și extinderea zonei afectate în profunzime.' },
      { title: 'Diagnostic Cauzal & Recomandări', desc: 'Stabilim cauza principală și cauzele secundare, estimăm severitatea și furnizăm recomandări de remediere prioritizate cu costuri orientative.' },
    ],
    equipment: [
      { icon: 'Droplets', name: 'Flir MR160', type: 'Higrometru Profesional', specs: 'Ghidare termică IGM, umiditate relativă și absolută, sondă externă de profunzime, precizie ±2% RH' },
      { icon: 'Camera', name: 'Flir E60', type: 'Cameră Termografică', specs: 'Corelație termică-umiditate, rezoluție 320×240, detectare zone reci umede sub finisaje' },
      { icon: 'Ruler', name: 'Sondă Pin & Non-Pin', type: 'Măsurare In-Depth', specs: 'Determinare umiditate în profunzimea materialului, testare lemn, beton și șapă' },
    ],
    deliverables: [
      'Raport PDF detaliat determinare umiditate',
      'Hartă de umiditate pe zone, pereți și niveluri',
      'Termograme corelate cu măsurătorile higrometrice',
      'Identificarea cauzei principale a umidității și infiltrațiilor',
      'Documentare foto și video a tuturor zonelor afectate',
      'Recomandări de remediere prioritizate (urgent / pe termen mediu)',
      'Estimare orientativă costuri remediere per zonă',
    ],
    ctaHeadline: 'Ai pete de umiditate sau miros de mucegai? Nu amâna diagnosticul.',
    ctaSubtext: 'Programează o inspecție de umiditate și află sursa exactă a problemei înainte să se agraveze. Sună acum: 0745 123 456.',
    faq: [
      { question: 'Se poate măsura umiditatea pereților fără a-i deteriora?', answer: 'Da. Higrometrul Flir MR160 are mod non-invaziv (fără pini) care măsoară umiditatea prin scanare de suprafață, fără nicio deteriorare. Pentru confirmare în profunzime folosim sonda externă cu pini fini care lasă urme minime, invizibile după o simplă gletuire.' },
      { question: 'Ce nivel de umiditate în perete este considerat periculos?', answer: 'Depinde de material. Betonul devine problematic peste 4-5% umiditate gravimetrică; tencuiala peste 3%; lemnul structural peste 18-20% risc degradare biologică și atac de ciuperci. Umiditatea relativă a aerului interior peste 65% RH favorizează mucegaiul pe orice suprafață rece. Raportul nostru include valorile de referință și comparația cu normele europene EN ISO 13788.' },
      { question: 'Puteți determina dacă infiltrația vine din apartamentul de deasupra sau din exterior?', answer: 'Da. Prin corelarea hărții higrometrice cu termografia și analiza distribuției umidității (gradient vertical vs. orizontal), stabilim cu precizie dacă sursa este externă (infiltrație acoperiș, fisură fațadă, rost tâmplărie) sau internă (conductă spartă, neetanșeitate instalație de la vecin). Raportul nostru poate fi folosit ca probă în litigii cu asociația sau proprietarul de deasupra.' },
      { question: 'Cât durează o inspecție de umiditate și când primesc raportul?', answer: 'Pentru un apartament standard (50-80 mp), inspecția completă durează 1,5-2 ore. Pentru o casă cu subsol și etaj, 3-4 ore. Raportul PDF cu interpretare, termograme și recomandări este livrat în maximum 48 de ore de la inspecție.' },
      { question: 'Faceți și inspecție de umiditate înainte de cumpărarea unui apartament?', answer: 'Absolut. Este unul dintre cele mai solicitate servicii. O inspecție pre-achiziție de 2 ore îți poate economisi zeci de mii de euro în reparații neprevăzute. Dacă detectăm probleme semnificative de umiditate sau infiltrații, ai argumentul documentat pentru a renegocia prețul sau a te retrage din tranzacție.' },
    ],
    closingHeadline: 'Mucegaiul și infiltrațiile nu dispar de la sine — diagnosticul corect salvează bani și sănătate.',
    metaTitle: 'Determinare Umiditate Pereți București | Infiltrații',
    metaDescription: 'Detectare umiditate pereți și infiltrații cu higrometru Flir MR160 în București & Ilfov. Diagnostic non-invaziv, hartă umiditate, raport 48h. Sună: 0745 123 456.',
    metaKeywords: ['determinare umiditate perete', 'detectare infiltratii apartament', 'masurare umiditate casa bucuresti', 'umiditate in perete cauze', 'mucegai apartament diagnostic', 'higrometru inspectie imobil', 'infiltratii perete interior', 'umiditate structuri bucuresti', 'detectare umiditate non-invaziva', 'inspectie umiditate inainte cumparare', 'umiditate ridicata apartament', 'sursa infiltratie perete'],
    whoNeedsThis: [],
    risks: [],
    reportHighlights: [],
  },

  'expertize-tehnice': {
    slug: 'expertize-tehnice',
    title: 'Expertize Tehnice de Specialitate',
    icon: 'FileCheck',
    heroLabel: 'Expert Atestat MDLPA · Autorizare Legală',
    heroHeadline: 'Expertize Tehnice',
    heroHeadlineGold: 'Fără Risc Legal.',
    heroSubheadline: 'Expertize tehnice pentru mansardare, supraetajare, extindere, consolidare, restaurare, demolare parțială sau schimbare de destinație imobil. Documentație semnată de expert atestat MDLPA, acceptată de toate primăriile din București și Ilfov.',
    concernHeading: 'De ce expertiza tehnică este obligatorie — nu opțională?',
    concernBody: [
      'Legea 50/1991 și Legea 10/1995 impun că orice intervenție asupra structurii de rezistență a unui imobil — mansardare, supraetajare, consolidare sau schimbare de destinație — necesită o expertiză tehnică semnată de un expert atestat MDLPA. Fără acest document, Primăria nu eliberează autorizație de construire.',
      'Riscul real al intervențiilor neautorizate: amenzi între 1.000 și 100.000 lei pentru proprietar, obligație de demolare pe cheltuiala proprie și răspundere penală dacă intervenția provoacă un accident. Inspectoratul de Stat în Construcții (ISC) efectuează controale periodice și poate sista lucrările pe loc.',
      'O expertiză tehnică profesională evaluează capacitatea portantă a structurii, calculează sarcinile suplimentare conform codului seismic P100-1/2013 și livrează dosarul complet pentru obținerea autorizației de construire în termenul legal.',
    ],
    concernStats: [
      { value: '100.000 lei', label: 'Amenda maximă ISC pentru lucrări neautorizate pe structură' },
      { value: 'P100-1/2013', label: 'Cod seismic obligatoriu pentru toate expertizele structurale' },
      { value: '30 zile', label: 'Termen legal de eliberare autorizație cu dosar complet' },
    ],
    benefits: [
      { icon: 'Building', title: 'Mansardare & Supraetajare', desc: 'Evaluăm capacitatea portantă a structurii existente de a prelua niveluri suplimentare, conform P100-1 și CR6.' },
      { icon: 'Expand', title: 'Extindere & Consolidare Clădire', desc: 'Soluții tehnice certificate pentru extinderea amprentei sau consolidarea elementelor de rezistență degradate.' },
      { icon: 'Landmark', title: 'Restaurare Clădiri Istorice', desc: 'Expertize pentru imobile cu valoare arhitecturală sau în zone protejate, conforme cu normele MCC.' },
      { icon: 'FileText', title: 'Schimbare Destinație Imobil', desc: 'Documentație tehnică completă pentru transformarea spațiilor: rezidențial în comercial, birou, medical sau invers.' },
    ],
    methodology: [
      { title: 'Analiză Documentară & Istoric', desc: 'Verificăm cartea tehnică a construcției, proiectul original, istoricul intervențiilor anterioare și cerințele specifice pentru autorizare.' },
      { title: 'Investigații Structurale Pe Teren', desc: 'Inspecție vizuală și instrumentală: detector armături, sclerometru pentru caracteristici beton, releveu geometric complet al construcției existente.' },
      { title: 'Calcule de Verificare Seismică', desc: 'Calculele de verificare structurală conform P100-1/2013, CR6, CR2-1-1.1 — documentate și justificate pentru dosarul de autorizare.' },
      { title: 'Expertiză Completă & Dosar Autorizare', desc: 'Redactăm expertiza tehnică semnată și ștampilată de expert atestat MDLPA, cu toate piesele scrise și desenate necesare Primăriei.' },
    ],
    equipment: [
      { icon: 'Scan', name: 'Detector Armături Profesional', type: 'Investigație Structurală', specs: 'Scanare armături existente — poziție și diametru — pentru calcule de verificare' },
      { icon: 'Hammer', name: 'Sclerometru Schmidt', type: 'Testare Rezistență Beton', specs: 'Determinare clasa beton (Rb) pentru elemente de rezistență existente' },
      { icon: 'Ruler', name: 'Stație Totală & Laser', type: 'Releveu Tehnic', specs: 'Măsurători topografice precise pentru releveu conform cu realitatea' },
    ],
    deliverables: [
      'Expertiză tehnică completă semnată de expert atestat MDLPA',
      'Releveu tehnic al construcției existente (plan, secțiuni, fațade)',
      'Calcule de verificare structurală conform P100-1/2013',
      'Memoriu tehnic justificativ pentru intervenția propusă',
      'Soluții tehnice detaliate cu specificații materiale',
      'Piese desenate pentru dosarul de autorizare la Primărie',
      'Estimare costuri lucrări de intervenție propuse',
      'Consultanță pentru obținerea autorizației de construire',
    ],
    ctaHeadline: 'Dosarul complet pentru autorizare — livrat în termen.',
    ctaSubtext: 'Solicită o expertiză tehnică de la expert atestat MDLPA și evită amenzile ISC. Sună acum: 0745 123 456.',
    faq: [
      { question: 'Cine poate semna legal o expertiză tehnică în România?', answer: 'Conform Legii 10/1995, expertizele tehnice pentru structuri de rezistență pot fi semnate exclusiv de experți tehnici atestați de Ministerul Dezvoltărilor Lucrărilor Publice și Administrației (MDLPA), pe cerința fundamentală A1 (rezistență mecanică și stabilitate). Colaborăm cu experți atestați cu experiență în clădiri din București și Ilfov.' },
      { question: 'Cât costă o expertiză tehnică pentru mansardare?', answer: 'Prețul unei expertize tehnice pentru mansardare sau supraetajare variază în funcție de suprafața construită, complexitatea structurii și numărul de niveluri existente. Oferim evaluare gratuită și deviz estimativ după o primă discuție tehnică. Sună la 0745 123 456 pentru detalii.' },
      { question: 'Cât durează elaborarea unei expertize tehnice?', answer: 'Pentru o mansardare simplă a unei case unifamiliale: 2-3 săptămâni. Pentru supraetajare bloc sau consolidări complexe: 4-8 săptămâni. Investigațiile pe teren durează 1-2 zile. Urgentarea este posibilă pentru proiecte cu termen de autorizare fix.' },
      { question: 'Este expertiza obligatorie pentru orice modificare structurală?', answer: 'Da. Legea 50/1991 impune expertiza tehnică pentru orice intervenție care afectează structura de rezistență: mansardare, supraetajare, extindere, consolidare, demolare parțială de elemente structurale sau schimbare de destinație. Nu este necesară pentru compartimentări pe pereți nestructurali sau finisaje.' },
      { question: 'Ce se întâmplă dacă structura nu permite mansardarea sau supraetajarea?', answer: 'Dacă calculele arată că structura existentă nu poate prelua sarcinile suplimentare, expertiza propune un scenariu de consolidare prealabilă care să permită intervenția dorită. Costurile de consolidare sunt estimate în raport. Astfel, cunoașteți investiția totală înainte de a lua decizia finală.' },
      { question: 'Expertiza este valabilă la Primăria de Sector sau doar la Primăria Generală?', answer: 'Expertiza tehnică semnată de un expert atestat MDLPA este valabilă la orice primărie din România — inclusiv la toate primăriile de sector din București, Primăria Generală și primăriile din județul Ilfov. Dosarul nostru respectă cerințele Ordinului 839/2009 privind conținutul documentației pentru autorizare.' },
    ],
    closingHeadline: 'Autorizația de construire începe cu expertiza corectă.',
    metaTitle: 'Expertize Tehnice Structurale București | Expert Atestat MDLPA',
    metaDescription: 'Expertize tehnice pentru mansardare, supraetajare și consolidare în București. Expert atestat MDLPA, dosar complet pentru autorizație construire. Sună: 0745 123 456.',
    metaKeywords: ['expertiza tehnica mansardare bucuresti', 'expert atestat MDLPA', 'expertiza supraetajare autorizatie construire', 'expertiza consolidare cladire bucuresti', 'expertiza schimbare destinatie imobil', 'expertiza tehnica structurala pret', 'dosar autorizatie construire expertiza', 'expert tehnic atestat ilfov', 'expertiza tehnica bloc bucuresti', 'expertiza demolare partiala', 'expertiza restaurare cladire istorica', 'expertiza structurala P100'],
    whoNeedsThis: [],
    risks: [],
    reportHighlights: [],
  },
}

export const SERVICE_SLUGS = Object.keys(SERVICE_PAGES)
