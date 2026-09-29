import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { biographies, biographyLabels, personIds, personPhoto } from './biographies'
import type { Copy, Language } from './content'

type Props = {
  selected: number | null
  copy: Copy
  language: Language
  onSelect: (index: number) => void
  onClose: () => void
}

export function PersonPortrait({ index, name, className = 'portrait' }: { index: number; name: string; className?: string }) {
  const src = personPhoto(index)
  return src ? <img className={className} src={src} alt="" width="240" height="240" loading="lazy" /> :
    <div className={`${className} portrait-initials`} aria-hidden="true">{name.split(' ').map(word => word[0]).join('')}</div>
}

export default function BiographyDialog({ selected, copy, language, onSelect, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const scrollArea = useRef<HTMLDivElement>(null)
  const pointerStartedOutside = useRef(false)
  const open = selected !== null
  const labels = biographyLabels[language]

  useEffect(() => {
    if (!open) return
    const element = dialog.current!
    element.showModal()
    document.body.classList.add('dialog-open')
    closeButton.current?.focus({ preventScroll: true })
    return () => {
      element.close()
      if (!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-open')
    }
  }, [open])

  useEffect(() => {
    if (scrollArea.current) scrollArea.current.scrollTop = 0
  }, [selected])

  const previous = ((selected ?? 0) + personIds.length - 1) % personIds.length
  const next = ((selected ?? 0) + 1) % personIds.length
  const close = () => dialog.current?.close()

  return <dialog ref={dialog} id="biography-dialog" className="biography-dialog" aria-labelledby="biography-name" aria-describedby="biography-role"
    onClose={onClose}
    onPointerDown={event => { pointerStartedOutside.current = event.target === event.currentTarget }}
    onClick={event => { if (pointerStartedOutside.current && event.target === event.currentTarget) close() }}
    onKeyDown={event => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      if (event.key === 'ArrowLeft') { event.preventDefault(); onSelect(previous) }
      if (event.key === 'ArrowRight') { event.preventDefault(); onSelect(next) }
    }}>
    {selected !== null && <>
      <div className="biography-toolbar"><p className="eyebrow">ISEF / {selected < 2 ? labels.leadership : labels.experts}</p>
        <button ref={closeButton} type="button" className="biography-close" onClick={close} aria-label={copy.close}><X size={20} aria-hidden="true" /></button>
      </div>
      <div ref={scrollArea} className="biography-scroll">
        <div className="biography-layout">
          <div className="biography-photo"><PersonPortrait index={selected} name={copy.people[selected].name} className="biography-portrait" /></div>
          <div className="biography-details">
            <div className="biography-heading"><h2 id="biography-name" aria-live="polite">{copy.people[selected].name}</h2><p id="biography-role">{copy.people[selected].role}</p></div>
            <div className="biography-text">{biographies[language][personIds[selected]].map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
          </div>
        </div>
      </div>
      <div className="biography-footer">
        <button type="button" className="biography-previous" onClick={() => onSelect(previous)} aria-label={`${labels.previous}: ${copy.people[previous].name}`}>
          <ArrowLeft size={18} aria-hidden="true" /><span>{copy.people[previous].name}</span>
        </button>
        <button type="button" className="biography-next" onClick={() => onSelect(next)} aria-label={`${labels.next}: ${copy.people[next].name}`}>
          <span>{copy.people[next].name}</span><ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </>}
  </dialog>
}
