import type { Language } from './content'

const mapLabels: Record<Language, { island: string; street: string; lines: string; crossStreet: string; building: string; note: string }> = {
  ru: { island: 'Васильевский остров', street: 'Малый проспект В.О.', lines: '24–25-я линии В.О.', crossStreet: 'Средний проспект В.О.', building: '64к1', note: 'Схема условная' },
  en: { island: 'Vasilyevsky Island', street: 'Maly Prospekt', lines: '24th–25th Lines', crossStreet: 'Sredny Prospekt', building: '64, Building 1', note: 'Schematic map' },
  es: { island: 'Isla Vasílievski', street: 'Maly Prospekt', lines: 'Líneas 24–25', crossStreet: 'Sredny Prospekt', building: '64, edificio 1', note: 'Mapa esquemático' },
}

// Simplified block layout: 64k1 is south of Maly Prospekt, west of the 24th–25th Lines.
// Location checked on Yandex Maps (59.939951, 30.250812); not a navigation-scale map.
export default function ContactMap({ language, address }: { language: Language; address: string }) {
  const labels = mapLabels[language]
  return <svg className="contact-map" viewBox="0 0 688 426" role="img" aria-label={address}>
    <rect width="688" height="426" fill="#e1ebf6" />
    <rect x="0" y="0" width="688" height="142" fill="#d8e5ec" />
    <g fill="#cddded" stroke="#bdcfe1" strokeWidth="1">
      <rect x="22" y="202" width="74" height="100" rx="5" />
      <rect x="165" y="198" width="74" height="122" rx="5" />
      <rect x="263" y="266" width="62" height="65" rx="5" />
      <rect x="519" y="207" width="140" height="55" rx="5" />
      <rect x="530" y="295" width="99" height="38" rx="5" />
    </g>
    <g fill="none" stroke="#fff">
      <path d="M0 165H688M0 367H688" strokeWidth="34" />
      <path d="M125 176V426M479 176V426" strokeWidth="26" />
      <path d="M263 181V242H449" strokeWidth="7" />
    </g>
    <path d="M348 197H443V325H416V223H375V325H348Z" fill="#bdd1e4" stroke="#8cacc8" strokeWidth="2" />
    <g fill="#4d647c" fontFamily="Manrope Variable, sans-serif" fontSize="16">
      <text x="24" y="43" fontSize="17">{labels.island}</text>
      <text x="24" y="171">{labels.street}</text>
      <text x="155" y="373">{labels.crossStreet}</text>
      <text x="480" y="202" transform="rotate(90 480 202)">{labels.lines}</text>
      <text x="16" y="408" fontSize="12">{labels.note}</text>
    </g>
    <rect x="319" y="61" width="290" height="69" rx="8" fill="#f8fbff" stroke="#bdcfe1" />
    <g fill="#11223a" fontFamily="Manrope Variable, sans-serif" textAnchor="middle">
      <text x="464" y="87" fontSize="17">{labels.street}</text>
      <text x="464" y="113" fontSize="20" fontWeight="700">{labels.building}</text>
    </g>
    <path d="M396 151C378 151 364 165 364 183C364 204 396 239 396 239S428 204 428 183C428 165 414 151 396 151Z" fill="#e60039" />
    <circle cx="396" cy="183" r="11" fill="#fff" />
  </svg>
}
