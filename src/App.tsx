import { useEffect, useRef, useState, type ReactNode } from 'react'
import { LazyMotion, domAnimation, m, MotionConfig, useReducedMotion } from 'motion/react'
import { ArrowUpRight, ArrowDown, ChevronLeft, ChevronRight, Menu, X, Maximize2 } from 'lucide-react'
import { asset, content, flags, mapUrl, photos, sectionIds, type Copy, type Language } from './content'
import { designCopy } from './design-copy'
import BiographyDialog, { PersonPortrait } from './BiographyDialog'
import { biographyLabels } from './biographies'

function initialLanguage(): Language {
  const query = new URLSearchParams(window.location.search).get('lang')
  if (query === 'ru' || query === 'en' || query === 'es') return query
  try {
    const saved = localStorage.getItem('isef-language')
    if (saved === 'en' || saved === 'es') return saved
  } catch { /* The site also works when storage is unavailable. */ }
  return 'ru'
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <m.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</m.div>
}

function LanguagePicker({ language, onChange, copy }: { language: Language; onChange: (language: Language) => void; copy: Copy }) {
  return <div className="languages" role="group" aria-label={copy.languageLabel}>
    {(['ru', 'es', 'en'] as const).map(lang => <button key={lang} lang={lang}
      aria-label={{ ru: 'Русский', es: 'Español', en: 'English' }[lang]}
      aria-pressed={language === lang} onClick={() => onChange(lang)}>{lang.toUpperCase()}</button>)}
  </div>
}

function Flag({ index, label = '' }: { index: number; label?: string }) {
  return <span className={`flag flag-${index}`}><img src={asset(flags[index])} alt={label} loading="lazy" width="70" height="46" /></span>
}

function Person({ index, copy, language, onOpen }: { index: number; copy: Copy; language: Language; onOpen: (index: number) => void }) {
  const labels = biographyLabels[language]
  return <article className="person">
    <PersonPortrait index={index} name={copy.people[index].name} />
    <div><h3>{copy.people[index].name}</h3><p>{copy.people[index].role}</p></div>
    <button type="button" className="person-open" aria-label={`${labels.open}: ${copy.people[index].name}`} aria-haspopup="dialog" aria-controls="biography-dialog" onClick={() => onOpen(index)} />
  </article>
}

function Activities({ copy }: { copy: Copy }) {
  return <div className="activity-board">
    <div className="activity-rink" aria-hidden="true"><span className="activity-circle circle-left" /><span className="activity-circle circle-center" /><span className="activity-circle circle-right" /></div>
    <div className="activity-grid">{copy.activities.map((item, index) => <article className="activity-cell" key={index}>
      <h3>{item.title}</h3>
      <div className="activity-body"><p>{item.description}</p></div>
    </article>)}</div>
  </div>
}

function Gallery({ copy, heading }: { copy: Copy; heading: string }) {
  const [selected, setSelected] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const open = (index: number) => {
    setSelected(index)
    dialog.current?.showModal()
    document.body.classList.add('dialog-open')
    closeButton.current?.focus()
  }
  const close = () => dialog.current?.close()
  const step = (direction: number) => setSelected(current => (current + direction + photos.length) % photos.length)
  return <section id="photos" className="gallery-section" aria-labelledby="gallery-title"><div className="container">
    <Reveal className="section-heading"><div><p className="eyebrow">05 / {copy.galleryTitle}</p><h2 id="gallery-title">{heading}</h2></div></Reveal>
    <div className="gallery">
    {photos.map((photo, index) => <button type="button" className={`gallery-photo photo-${index}`} key={photo}
      onClick={() => open(index)} aria-label={`${copy.openPhoto}: ${copy.photoAlts[index]}`}>
      <img src={asset(photo)} alt={copy.photoAlts[index]} loading="lazy" width={index === 0 ? 1180 : 590} height={index === 0 ? 1576 : 786} />
      <span className="photo-expand" aria-hidden="true"><Maximize2 size={22} /></span>
    </button>)}
    </div></div>
    <dialog className="lightbox" ref={dialog} aria-label={copy.galleryTitle}
      onClose={() => document.body.classList.remove('dialog-open')}
      onClick={event => { if (event.target === event.currentTarget) close() }}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1) }
        if (event.key === 'ArrowRight') { event.preventDefault(); step(1) }
      }}>
      <button ref={closeButton} className="icon-button lightbox-close" onClick={close} aria-label={copy.close}><X /></button>
      <figure><img src={asset(photos[selected])} alt={copy.photoAlts[selected]} />
        <figcaption aria-live="polite">{copy.photoAlts[selected]} <span>{selected + 1} / {photos.length}</span></figcaption>
      </figure>
      <button className="icon-button lightbox-prev" onClick={() => step(-1)} aria-label={copy.previous}><ChevronLeft /></button>
      <button className="icon-button lightbox-next" onClick={() => step(1)} aria-label={copy.next}><ChevronRight /></button>
    </dialog>
  </section>
}

export default function App() {
  const [language, setLanguage] = useState<Language>(initialLanguage)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null)
  const menuDialog = useRef<HTMLDialogElement>(null)
  const copy = content[language]
  const design = designCopy[language]

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    let cancelled = false
    // Direct section links must also work before React and local fonts finish loading.
    document.fonts.ready.then(() => {
      if (!cancelled && window.location.hash === hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' })
      }
    })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.title = copy.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', copy.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', copy.description)
    try { localStorage.setItem('isef-language', language) } catch { /* Storage is optional. */ }
    const url = new URL(window.location.href)
    if (language === 'ru') url.searchParams.delete('lang')
    else url.searchParams.set('lang', language)
    window.history.replaceState(null, '', url)
  }, [language, copy])

  const closeMenu = () => menuDialog.current?.close()
  const openMenu = () => {
    menuDialog.current?.showModal()
    document.body.classList.add('dialog-open')
    setMenuOpen(true)
  }

  return <LazyMotion features={domAnimation}><MotionConfig reducedMotion="user">
    <a className="skip-link" href="#main">{copy.skip}</a>
    <header className="header"><div className="container header-inner">
        <a className="brand" href="#home" aria-label="ISEF — Ice Sport Exchange Foundation">
          <img src={asset('9d28f.png')} alt="" width="96" height="56" fetchPriority="high" />
          <span><strong>ISEF</strong><small>Ice Sport Exchange Foundation</small></span>
        </a>
        <nav className="desktop-nav" aria-label={copy.openMenu}>{copy.nav.map((label, index) =>
          <a key={sectionIds[index]} href={`#${sectionIds[index]}`}>{label}</a>)}</nav>
        <LanguagePicker language={language} onChange={setLanguage} copy={copy} />
        <button className="mobile-language" onClick={openMenu} aria-label={copy.languageLabel}>{language.toUpperCase()}</button>
        <button className="icon-button menu-toggle" aria-label={copy.openMenu} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={openMenu}><Menu /></button>
    </div></header>

    <div className="site">
      <dialog ref={menuDialog} id="mobile-menu" className="mobile-menu" aria-label={copy.openMenu}
        onClose={() => { setMenuOpen(false); document.body.classList.remove('dialog-open') }}>
        <div className="mobile-menu-top"><strong>ISEF</strong><button className="icon-button" onClick={closeMenu} aria-label={copy.close}><X /></button></div>
        <nav>{copy.nav.map((label, index) => <a key={sectionIds[index]} href={`#${sectionIds[index]}`} onClick={closeMenu}>
          <span className="menu-index">0{index + 1}</span>{label}<ArrowUpRight size={22} />
        </a>)}</nav>
        <LanguagePicker language={language} onChange={setLanguage} copy={copy} />
        <a className="menu-email" href="mailto:info@glazov.me">info@glazov.me</a>
      </dialog>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-backdrop" aria-hidden="true"><img className="hero-image" src={asset('a2f66.png')} alt="" fetchPriority="high" width="1440" height="808" /></div>
          <div className="container hero-layout">
            <Reveal className="hero-content">
              <h1 id="hero-title">{design.heroStart} <span>{design.heroEnd}</span></h1><p className="hero-intro">{copy.heroText}</p>
              <div className="hero-actions"><a className="button button-primary" href="#activities">{copy.aboutButton}</a>
                <a className="button button-outline" href="#contacts">{copy.contactButton}</a></div>
              <a className="hero-scroll" href="#activities"><span><ArrowDown size={16} /></span>{design.scroll}</a>
            </Reveal>
          </div>
          <div className="container partner-strip"><span>{design.countryLabel}</span><div className="partner-flags">{flags.map((flag,index) => <Flag key={flag} index={index} label={copy.countries[index]} />)}</div></div>
        </section>

        <section className="activities" id="activities" aria-labelledby="activities-title">
          <div className="container activities-content"><Reveal className="section-heading"><h2 id="activities-title">{copy.activitiesTitle}</h2></Reveal>
            <Activities copy={copy} />
          </div>
        </section>

        <section className="mission" id="about" aria-labelledby="mission-title">
          <div className="mission-backdrop" aria-hidden="true"><img src={asset('d156b.png')} alt="" width="1180" height="1767" loading="lazy" /></div>
          <div className="container mission-content"><div className="mission-layout"><Reveal className="mission-text">
            <p className="eyebrow">02 / {copy.missionLabel}</p>
            <h2 id="mission-title">{copy.missionLead} <span className="mission-rest">{copy.missionRest}.</span></h2>
            <p className="mission-intro">{copy.missionText}</p>
          </Reveal></div>
          <div className="pillar-grid">{copy.pillars.map((item, index) => <Reveal className="pillar" key={index} delay={index * 0.08}>
            <article><h3>{item.title}</h3><p>{item.description}</p></article>
          </Reveal>)}</div></div>
        </section>

        <div className="people-region">
          <section className="geography container" id="geography" aria-labelledby="geography-title">
            <Reveal className="geography-intro"><div><p className="eyebrow">03 / ISEF WORLDWIDE</p><h2 id="geography-title">{copy.geographyTitle}</h2></div><p>{copy.geographyText}</p></Reveal>
            <div className="country-network">
              <ul className="country-grid">{copy.countries.map((name, index) => <li className={`country ${index === 4 ? 'country-featured' : ''}`} key={flags[index]}>
                <Flag index={index} /><span>{name}</span>
              </li>)}</ul>
              <div className="country-connections" aria-hidden="true">
                {flags.slice(1).map(flag => <img key={flag} src={asset('aafa5.svg')} alt="" />)}
              </div>
            </div>
          </section>

        </div>

          <section className="team" id="team" aria-labelledby="team-title">
            <div className="team-rink" aria-hidden="true" />
            <div className="container">
            <Reveal className="section-heading"><div><p className="eyebrow">04 / ISEF TEAM</p><h2 id="team-title">{copy.teamTitle}</h2></div><p className="section-description">{design.teamIntro}</p></Reveal>
            <div className="team-group" role="group" aria-label={biographyLabels[language].leadership}>
              <Reveal className="leadership">{[0, 1].map(index => <Person key={index} index={index} copy={copy} language={language} onOpen={setSelectedPerson} />)}</Reveal>
            </div>
            <div className="team-group" role="group" aria-label={biographyLabels[language].experts}>
              <Reveal className="experts">{[2, 3, 4, 5].map(index => <Person key={index} index={index} copy={copy} language={language} onOpen={setSelectedPerson} />)}</Reveal>
            </div>
            <div className="governance">{copy.governance.map((item, index) => <Reveal key={index} delay={index * 0.07}>
              <article><h3>{item.title}</h3><p>{item.description}</p></article>
            </Reveal>)}</div>
          </div></section>

        <Gallery copy={copy} heading={design.galleryHeading} />

        <section className="contacts" id="contacts" aria-labelledby="contacts-title"><div className="container contact-grid">
          <Reveal><p className="eyebrow">06 / {design.contactEyebrow}</p><h2 id="contacts-title">{copy.contactsTitle}</h2><p className="contact-intro">{copy.contactsText}</p>
            <address><dl>
              <div><dt>{copy.email}</dt><dd><a href="mailto:info@glazov.me">info@glazov.me</a></dd></div>
              <div><dt>{copy.phone}</dt><dd><a href="tel:+79995149199">+7 999 514-91-99</a></dd></div>
              <div><dt>{copy.addressLabel}</dt><dd><a href={mapUrl} target="_blank" rel="noopener noreferrer">{copy.address}</a></dd></div>
            </dl></address>
          </Reveal>
          <Reveal className="map-wrap"><a className="map-link" href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label={copy.openMap}>
            <img src={asset('2d17b.png')} alt={copy.address} width="688" height="426" loading="lazy" />
            <span className="map-action">{copy.openMap}<ArrowUpRight size={18} /></span>
          </a></Reveal>
        </div></section>
      </main>

      <BiographyDialog selected={selectedPerson} copy={copy} language={language} onSelect={setSelectedPerson} onClose={() => setSelectedPerson(null)} />

      <footer className="footer"><div className="container footer-inner"><div className="footer-info">
        <a href="#home" className="footer-brand">ISEF</a><p>{copy.foundationName}</p><p>{copy.address}</p>
      </div><p className="copyright">© 2026 Ice Sport Exchange Foundation</p></div></footer>
    </div>
  </MotionConfig></LazyMotion>
}
