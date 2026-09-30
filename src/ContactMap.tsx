import type { Language } from './content'

const mapLabels: Record<Language, { street: string; address: string; note: string }> = {
  ru: { street: 'Невский проспект', address: 'Невский проспект, 153', note: 'Схема условная' },
  en: { street: 'Nevsky Prospekt', address: '153 Nevsky Prospekt', note: 'Schematic map' },
  es: { street: 'Nevsky Prospekt', address: 'Nevsky Prospekt, 153', note: 'Mapa esquemático' },
}

// Keep the original schematic layout, with real text that follows the site language.
export default function ContactMap({ language, address }: { language: Language; address: string }) {
  const labels = mapLabels[language]
  return <svg className="contact-map" viewBox="0 0 688 426" role="img" aria-label={address}>
    <rect width="688" height="426" fill="#e1ebf6" />
    <path d="M551 0H688V224C626 176 585 105 551 0Z" fill="#cddff1" />
    <g fill="none" stroke="#fff">
      <path d="M116 0 155 426M294 0 323 426M0 116 688 155M0 323 688 352" strokeWidth="10" />
      <path d="M0 204 373 244 629 372" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g fill="#42556b" fontFamily="Manrope Variable, sans-serif">
      <text x="146" y="202" fontSize="14" transform="rotate(6 146 202)">{labels.street}</text>
      <text x="14" y="417" fontSize="11">{labels.note}</text>
    </g>
    <rect x="444" y="191" width="229" height="37" fill="#f8fbff" />
    <text x="558.5" y="215" fill="#11223a" fontFamily="Manrope Variable, sans-serif" fontSize="14" textAnchor="middle">{labels.address}</text>
    <path d="M550 256C533 256 521 269 521 285C521 304 550 334 550 334S580 304 580 285C580 269 567 256 550 256Z" fill="#e60039" />
    <circle cx="550" cy="285" r="10" fill="#fff" />
  </svg>
}
