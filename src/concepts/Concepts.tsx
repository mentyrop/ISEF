import { useEffect, useRef, useState, type ReactNode } from 'react'
import { LazyMotion, domAnimation, m, MotionConfig, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { ArrowUpRight, ArrowDown, ArrowRight, ArrowUp, Menu, X, Plus, ChevronLeft, ChevronRight, Globe2, MoveUpRight } from 'lucide-react'
import { asset, content, flags, photos, portraits, sectionIds, mapUrl, type Copy, type Language } from '../content'
import { conceptIds, conceptNames, conceptCopy, type Concept, type ConceptCopy } from './copy'

const base = import.meta.env.BASE_URL
const countryCodes = ['RS', 'KZ', 'AE', 'EG', 'MX', 'IN', 'CN', 'TH', 'ZA']

function getLanguage(): Language {
  const lang = new URLSearchParams(location.search).get('lang')
  return lang === 'en' || lang === 'es' ? lang : 'ru'
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <m.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }}
    transition={{ duration: .7, delay, ease: [.22, 1, .36, 1] }}>{children}</m.div>
}

function Flag({ index }: { index: number }) {
  return <span className={`c-flag c-flag-${index}`}><img src={asset(flags[index])} alt="" width="70" height="46" loading="lazy" /></span>
}

function PuckDisk({ className = '' }: { className?: string }) {
  return <div className={`c-puck ${className}`} aria-hidden="true"><span className="c-puck-shadow" /><span className="c-puck-edge" /><span className="c-puck-face"><span>ISEF<small>ICE · SPORT · EXCHANGE</small></span></span></div>
}

function Languages({ language, onChange, label }: { language: Language; onChange: (lang: Language) => void; label: string }) {
  return <div className="c-languages" role="group" aria-label={label}>{(['ru', 'en', 'es'] as const).map(lang =>
    <button key={lang} type="button" aria-label={{ ru: 'Русский', en: 'English', es: 'Español' }[lang]} aria-pressed={lang === language} onClick={() => onChange(lang)}>{lang.toUpperCase()}</button>)}</div>
}

function ConceptBar({ concept, language, ui }: { concept: Concept; language: Language; ui: ConceptCopy }) {
  return <div className="c-concept-bar"><span className="c-concept-label">ISEF <span>/ {ui.concepts}</span></span>
    <nav aria-label={ui.concepts}>{conceptIds.map((id, i) => <a key={id} href={`${base}concepts.html?design=${id}&lang=${language}`} aria-current={concept === id ? 'page' : undefined}>
      <span className={`c-swatch c-swatch-${id}`} /><span className="c-concept-number">0{i + 1}</span><span>{conceptNames[language][i]}</span></a>)}</nav>
    <a className="c-original" href={`${base}?lang=${language}`} aria-label={ui.original}><span>{ui.original}</span><ArrowUpRight size={13} /></a>
  </div>
}

function Header({ copy, language, onLanguage }: { copy: Copy; language: Language; onLanguage: (lang: Language) => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 28 })
  const reduce = useReducedMotion()
  const close = () => dialog.current?.close()
  useEffect(() => {
    const query = matchMedia('(min-width: 1100px)')
    const resize = () => { if (query.matches) dialog.current?.close() }
    query.addEventListener('change', resize)
    return () => query.removeEventListener('change', resize)
  }, [])
  return <>
    <header className="c-header"><div className="c-wrap c-header-inner">
      <a className="c-brand" href="#home" aria-label="ISEF — Ice Sport Exchange Foundation"><img src={asset('9d28f.png')} alt="" width="80" height="48" /><span>ISEF<small>ICE SPORT EXCHANGE FOUNDATION</small></span></a>
      <nav className="c-desktop-nav" aria-label={copy.openMenu}>{copy.nav.map((title, i) => <a href={`#${sectionIds[i]}`} key={title}>{title}</a>)}</nav>
      <Languages language={language} onChange={onLanguage} label={copy.languageLabel} />
      <button className="c-icon c-menu-button" aria-expanded={open} aria-label={copy.openMenu} aria-controls="concept-menu" onClick={() => { dialog.current?.showModal(); setOpen(true); document.body.classList.add('c-locked') }}><Menu size={21} /></button>
    </div><m.div className="c-reading-progress" style={{ scaleX: reduce ? scrollYProgress : progress }} aria-hidden="true" /></header>
    <dialog ref={dialog} id="concept-menu" className="c-menu" aria-label={copy.openMenu} onClose={() => { setOpen(false); document.body.classList.remove('c-locked') }}>
      <div className="c-menu-top"><span>ISEF</span><button className="c-icon" onClick={close} aria-label={copy.close}><X /></button></div>
      <nav>{copy.nav.map((title, i) => <a href={`#${sectionIds[i]}`} key={title} onClick={close}><small>0{i + 1}</small>{title}<ArrowUpRight /></a>)}</nav>
      <Languages language={language} onChange={onLanguage} label={copy.languageLabel} />
    </dialog>
  </>
}

function Hero({ concept, copy, ui }: { concept: Concept; copy: Copy; ui: ConceptCopy }) {
  const reduce = useReducedMotion()
  const [passes, setPasses] = useState(0)
  const [moving, setMoving] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current) }, [])
  const pass = () => {
    if (moving) return
    setPasses(p => p + 1)
    if (!reduce) {
      setMoving(true)
      timeout.current = setTimeout(() => setMoving(false), 1100)
    }
  }
  const label = concept === 'ice' ? ui.labelIce : concept === 'arena' ? ui.labelArena : ui.labelAtlas
  const title = <h1><span>{ui.line1}</span><span>{ui.line2}</span><em>{ui.line3}</em></h1>
  const actions = <div className="c-hero-actions"><a className="c-btn c-btn-primary" href="#about">{copy.aboutButton}<ArrowUpRight size={19} /></a><a className="c-text-link" href="#contacts">{copy.contactButton}<ArrowUpRight size={17} /></a></div>
  const passButton = <button type="button" className="c-pass" onClick={pass} disabled={moving}><span className="c-pass-dot" />{ui.pass}<ArrowUpRight size={17} /></button>
  return <section className={`c-hero c-hero-${concept} ${moving ? 'is-passing' : ''}`} id="home" aria-label={copy.heroTitle}>
    {concept === 'arena' && <div className="c-arena-photo"><img src={asset('a2f66.png')} alt={ui.image} width="1400" height="785" fetchPriority="high" /><div className="c-arena-vignette" /></div>}
    <div className="c-wrap c-hero-layout">
      <Reveal className="c-hero-copy"><p className="c-kicker"><span className="c-live-dot" />{label}</p>{title}<p className="c-hero-description">{ui.shortIntro}</p>{actions}</Reveal>
      {concept === 'ice' && <div className="c-ice-scene">
        <div className="c-ice-photo"><img src={asset('d156b.png')} alt={ui.player} width="1100" height="1650" fetchPriority="high" /></div>
        <span className="c-scene-coordinate">59°55′ N / 30°21′ E</span><span className="c-scene-word" aria-hidden="true">EXCHANGE</span>
        <div className="c-ice-rink" aria-hidden="true"><span /><i /><b /><em /></div>
        <div className="c-hero-puck"><PuckDisk /></div>
        <span className="c-puck-trace" aria-hidden="true" />
        <div className="c-ice-pass">{passButton}<small>{ui.passHint}</small></div>
        <span className="c-corner-mark c-corner-a">+</span><span className="c-corner-mark c-corner-b">+</span>
      </div>}
      {concept === 'arena' && <div className="c-arena-interaction"><div className="c-target" aria-hidden="true"><span /><i /><b /></div><span className="c-arena-image-label">01 / ICE IN MOTION</span>{passButton}<span className="c-arena-hint">{ui.passHint}</span></div>}
      {concept === 'atlas' && <div className="c-atlas-scene"><div className="c-atlas-orbit" aria-hidden="true" /><figure className="c-atlas-photo"><img src={asset('a2f66.png')} alt={ui.image} width="1000" height="561" fetchPriority="high" /><figcaption>ICE SPORT<br />EXCHANGE<br />FOUNDATION</figcaption></figure>
        <span className="c-atlas-stamp">SPORT<br /><Globe2 size={38} strokeWidth={1} /><br />WITHOUT BORDERS</span>
        <div className="c-atlas-puck"><PuckDisk /></div><div className="c-atlas-pass">{passButton}</div><span className="c-atlas-coordinate">↗ RS · KZ · AE · EG · MX · IN · CN · TH · ZA</span>
      </div>}
    </div>
    <div className="c-wrap c-hero-bottom"><a href="#about"><ArrowDown size={17} />{ui.scroll}</a><span className="c-hero-motto">ICE. SPORT. EXCHANGE.</span><span className="c-pass-count" aria-live="polite">{passes ? `${ui.passStatus} · ${String(passes).padStart(2, '0')}` : 'EST. / ISEF'}</span></div>
  </section>
}

function CountryRibbon({ copy, ui }: { copy: Copy; ui: ConceptCopy }) {
  return <div className="c-ribbon"><div className="c-wrap c-ribbon-inner"><span>{ui.countries}<ArrowRight size={17} /></span><ul>{copy.countries.map((country, i) => <li key={country}><Flag index={i} /><span>{country}</span></li>)}</ul></div></div>
}

function Intro({ copy, ui }: { copy: Copy; ui: ConceptCopy }) {
  return <section className="c-intro c-wrap c-section" id="about"><Reveal className="c-intro-grid"><p className="c-kicker">01 / {copy.nav[0]}</p><div><h2>{ui.mission}</h2><p className="c-intro-text">{copy.heroText}</p></div><div className="c-intro-numbers"><div><strong>09<span>↗</span></strong><p>{ui.countries}</p></div><div><strong>06<span>↗</span></strong><p>{ui.directions}</p></div></div></Reveal></section>
}

function Mission({ copy, ui }: { copy: Copy; ui: ConceptCopy }) {
  return <section className="c-mission c-section"><div className="c-wrap"><Reveal className="c-mission-layout">
    <figure className="c-mission-photo"><img src={asset('39df7.png')} alt={copy.photoAlts[1]} width="900" height="1200" loading="lazy" /><figcaption><span>EXCHANGE / 01</span><ArrowUpRight size={25} /></figcaption></figure>
    <div className="c-mission-copy"><p className="c-kicker">ISEF / {copy.missionLabel}</p><h2>{copy.missionLead}<span> {copy.missionRest}</span></h2><p>{copy.missionText}</p></div>
  </Reveal><div className="c-pillars">{copy.pillars.map((item, i) => <Reveal key={item.title} delay={i * .07}><article><span className="c-item-index">0{i + 1}</span><h3>{item.title}</h3><p>{item.description}</p><ArrowUpRight size={22} aria-hidden="true" /></article></Reveal>)}</div></div></section>
}

function Activities({ copy, ui, concept }: { copy: Copy; ui: ConceptCopy; concept: Concept }) {
  const [opened, setOpened] = useState(0)
  return <section className="c-work c-section" id="activities"><div className="c-wrap"><Reveal className="c-section-heading"><div><p className="c-kicker">02 / {copy.activitiesTitle}</p><h2>{ui.work}</h2></div><span className="c-heading-mark" aria-hidden="true">↗</span></Reveal>
    <div className="c-activities">{copy.activities.map((item, i) => <Reveal key={item.title} delay={(i % 3) * .045}><article className={opened === i ? 'c-activity is-open' : 'c-activity'}>
      <span className="c-item-index">0{i + 1}</span>
      {concept === 'atlas' ? <><h3><button onClick={() => setOpened(opened === i ? -1 : i)} aria-expanded={opened === i} aria-controls={`c-activity-${i}`}>{item.title}<Plus size={24} /></button></h3><div id={`c-activity-${i}`} hidden={opened !== i}><p>{item.description}</p></div></> : <><h3>{item.title}</h3><p>{item.description}</p><ArrowUpRight className="c-activity-arrow" size={24} aria-hidden="true" /></>}
    </article></Reveal>)}</div>
  </div></section>
}

function ExchangeRoute({ copy, ui }: { copy: Copy; ui: ConceptCopy }) {
  const [selected, setSelected] = useState(4)
  const track = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const element = track.current
    if (!element) return
    const update = () => {
      const marker = element.querySelectorAll('[data-route-point]')[selected]
      if (!marker) return
      const box = element.getBoundingClientRect()
      const target = marker.getBoundingClientRect()
      setPosition({ x: target.left - box.left + target.width / 2 - 30.5, y: target.top - box.top + target.height / 2 - 21.5 })
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [selected])
  return <div className="c-exchange-route"><div className="c-route-title"><span>THE EXCHANGE ROUTE</span><small>{ui.countryHint}</small></div>
    <div className="c-route-track" ref={track} role="group" aria-label={ui.countries}>{copy.countries.map((name, i) => <button key={name} aria-pressed={i === selected} aria-label={name} onClick={() => setSelected(i)}><span className="c-route-marker" data-route-point><i /></span><strong>{countryCodes[i]}</strong><span>{name}</span></button>)}
      {position && <m.div className="c-route-moving-puck" initial={false} animate={position} transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 100, damping: 19 }} aria-hidden="true"><PuckDisk /></m.div>}
    </div>
    <div className="c-route-destination" aria-live="polite"><Flag index={selected} /><span>{ui.countryStatus} <b>{copy.countries[selected]}</b></span><span className="c-route-destination-code">{String(selected + 1).padStart(2, '0')} / 09<ArrowUpRight size={20} /></span></div>
  </div>
}

function Geography({ copy, ui }: { copy: Copy; ui: ConceptCopy }) {
  return <section className="c-geography c-section" id="geography"><div className="c-wrap"><Reveal className="c-section-heading"><div><p className="c-kicker">03 / {copy.geographyTitle}</p><h2>{ui.world}</h2></div><p>{ui.worldNote}</p></Reveal>
    <Reveal><ExchangeRoute copy={copy} ui={ui} /></Reveal><Reveal className="c-geography-story"><p>{copy.geographyText}</p><aside><span className="c-kicker">MX / MEXICO</span><h3>{ui.mexico}</h3><p>{ui.mexicoNote}</p><Flag index={4} /></aside></Reveal>
  </div></section>
}

function Team({ copy, ui }: { copy: Copy; ui: ConceptCopy }) {
  return <section className="c-team c-section" id="team"><div className="c-wrap"><Reveal className="c-section-heading"><div><p className="c-kicker">04 / {copy.teamTitle}</p><h2>{ui.people}</h2></div><span className="c-heading-mark" aria-hidden="true">↗</span></Reveal>
    <div className="c-team-grid">{copy.people.map((person, i) => <Reveal key={person.name} delay={(i % 3) * .05}><article className="c-person"><span className="c-person-no">0{i + 1}</span>{i ? <img src={asset(portraits[i])} alt="" width="160" height="160" loading="lazy" /> : <div className="c-person-initials" aria-hidden="true">{person.name.split(' ').map(n => n[0]).join('')}</div>}<h3>{person.name}</h3><p>{person.role}</p></article></Reveal>)}</div>
    <div className="c-governance">{copy.governance.map((item, i) => <Reveal key={item.title}><span className="c-item-index">0{i + 1} /</span><h3>{item.title}</h3><p>{item.description}</p></Reveal>)}</div>
  </div></section>
}

function Gallery({ copy, ui }: { copy: Copy; ui: ConceptCopy }) {
  const [selected, setSelected] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)
  const step = (n: number) => setSelected(i => (i + n + photos.length) % photos.length)
  const close = () => dialog.current?.close()
  return <section className="c-gallery c-section" id="photos"><div className="c-wrap"><Reveal className="c-section-heading"><div><p className="c-kicker">05 / {copy.galleryTitle}</p><h2>{ui.gallery}</h2></div><span className="c-gallery-count">01 — 03</span></Reveal>
    <div className="c-gallery-grid">{photos.map((photo, i) => <Reveal key={photo}><button className="c-photo-button" onClick={e => { trigger.current = e.currentTarget; setSelected(i); dialog.current?.showModal(); document.body.classList.add('c-locked') }} aria-label={`${ui.zoom}: ${copy.photoAlts[i]}`}>
      <img src={asset(photo)} alt={copy.photoAlts[i]} width={i ? '900' : '1400'} height={i ? '1200' : '980'} loading="lazy" /><span className="c-photo-caption"><span>0{i + 1} / {copy.galleryTitle}</span><span className="c-photo-open"><ArrowUpRight size={22} /></span></span></button></Reveal>)}</div>
    <dialog className="c-lightbox" ref={dialog} aria-label={copy.galleryTitle} onClose={() => { document.body.classList.remove('c-locked'); trigger.current?.focus() }} onClick={e => { if (e.target === e.currentTarget) close() }} onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); step(1) } if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) } }}>
      <button autoFocus className="c-icon c-lightbox-close" onClick={close} aria-label={ui.close}><X /></button><figure><img src={asset(photos[selected])} alt={copy.photoAlts[selected]} /><figcaption aria-live="polite">{copy.photoAlts[selected]}<span>{selected + 1} / 3</span></figcaption></figure>
      <div className="c-lightbox-controls"><button className="c-icon" onClick={() => step(-1)} aria-label={ui.prev}><ChevronLeft /></button><button className="c-icon" onClick={() => step(1)} aria-label={ui.next}><ChevronRight /></button></div>
    </dialog>
  </div></section>
}

function Contacts({ copy, ui }: { copy: Copy; ui: ConceptCopy }) {
  return <section className="c-contacts c-section" id="contacts"><div className="c-wrap"><Reveal className="c-contact-head"><div><p className="c-kicker">06 / {copy.contactsTitle}</p><h2>{ui.contact}</h2></div><a className="c-contact-arrow" href="mailto:info@glazov.me" aria-label={copy.email}><MoveUpRight strokeWidth={1} /></a></Reveal>
    <Reveal className="c-contact-grid"><div><p className="c-contact-intro">{copy.contactsText}</p><address><a className="c-contact-email" href="mailto:info@glazov.me">info@glazov.me<ArrowUpRight size={22} /></a><a className="c-contact-phone" href="tel:+79995149199">+7 999 514-91-99</a><a className="c-contact-address" href={mapUrl} target="_blank" rel="noopener noreferrer">{copy.address}<ArrowUpRight size={17} /></a></address></div>
      <a className="c-map" href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label={copy.openMap}><img src={asset('2d17b.png')} alt={copy.address} width="450" height="278" loading="lazy" /><span>{copy.openMap}<ArrowUpRight size={16} /></span></a></Reveal>
    <footer className="c-footer"><a href="#home" className="c-footer-brand">ISEF<span>ICE SPORT EXCHANGE FOUNDATION</span></a><p>{copy.foundationName}</p><span>© 2026 ISEF</span><a href="#home" className="c-footer-top" aria-label={ui.top}><ArrowUp size={20} /></a></footer>
  </div></section>
}

export default function Concepts() {
  const requested = new URLSearchParams(location.search).get('design')
  const concept: Concept = requested === 'arena' || requested === 'atlas' ? requested : 'ice'
  const [language, setLanguage] = useState<Language>(getLanguage)
  const copy = content[language]
  const ui = conceptCopy[language]
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dataset.concept = concept
    document.title = `ISEF — ${conceptNames[language][conceptIds.indexOf(concept)]}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.description)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', { ice: '#edf2f2', arena: '#101517', atlas: '#f4f0e7' }[concept])
    const url = new URL(location.href)
    url.searchParams.set('design', concept)
    url.searchParams.set('lang', language)
    history.replaceState(null, '', url)
  }, [concept, language, copy])
  useEffect(() => {
    const hash = location.hash
    if (hash) document.fonts.ready.then(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' }))
  }, [])
  const sections: Record<string, ReactNode> = {
    mission: <Mission copy={copy} ui={ui} />,
    work: <Activities copy={copy} ui={ui} concept={concept} />,
    world: <Geography copy={copy} ui={ui} />,
    team: <Team copy={copy} ui={ui} />,
    photos: <Gallery copy={copy} ui={ui} />,
  }
  const order = concept === 'arena' ? ['work', 'mission', 'photos', 'world', 'team'] : concept === 'atlas' ? ['world', 'mission', 'work', 'team', 'photos'] : ['mission', 'work', 'world', 'team', 'photos']
  return <LazyMotion features={domAnimation}><MotionConfig reducedMotion="user"><div className={`c-site c-${concept}`}>
    <a className="c-skip" href="#main">{copy.skip}</a><ConceptBar concept={concept} language={language} ui={ui} /><Header copy={copy} language={language} onLanguage={setLanguage} />
    <main id="main"><Hero concept={concept} copy={copy} ui={ui} /><CountryRibbon copy={copy} ui={ui} /><Intro copy={copy} ui={ui} />
      {order.map(key => <div className={`c-section-slot c-slot-${key}`} key={key}>{sections[key]}</div>)}<Contacts copy={copy} ui={ui} />
    </main>
  </div></MotionConfig></LazyMotion>
}
