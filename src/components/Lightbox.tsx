import { useEffect, useRef } from "react"
import type { Poster } from "../data/portfolio"
import { Arrow } from "./Icons"

type LightboxProps = {
  brand: string
  posters: Poster[]
  index: number | null
  onClose: () => void
  onChange: (index: number) => void
}

export function Lightbox({ brand, posters, index, onClose, onChange }: LightboxProps) {
  const isOpen = index !== null
  const closeButton = useRef<HTMLButtonElement | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const touchStart = useRef<number | null>(null)
  const callbacks = useRef({ onClose, onChange })

  callbacks.current = { onClose, onChange }

  useEffect(() => {
    if (!isOpen) return

    returnFocus.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButton.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        callbacks.current.onClose()
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        callbacks.current.onChange((index! + 1) % posters.length)
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        callbacks.current.onChange((index! - 1 + posters.length) % posters.length)
      }
      if (event.key === "Tab") {
        const focusables = document.querySelectorAll<HTMLElement>(
          "[data-lightbox] button",
        )
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      returnFocus.current?.focus()
    }
  }, [isOpen, index, posters.length])

  if (!isOpen) return null

  const poster = posters[index]

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${brand} creative gallery`}
      data-lightbox
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return
        const end = event.changedTouches[0]?.clientX ?? touchStart.current
        const delta = end - touchStart.current
        touchStart.current = null
        if (Math.abs(delta) < 50) return
        onChange((index + (delta < 0 ? 1 : -1) + posters.length) % posters.length)
      }}
    >
      <div className="lightbox-top">
        <p>
          <span>{brand}</span>
          <span>
            {String(index + 1).padStart(2, "0")} / {String(posters.length).padStart(2, "0")}
          </span>
        </p>
        <button
          type="button"
          className="lightbox-close"
          onClick={onClose}
          ref={closeButton}
          aria-label="Close gallery"
        >
          <span />
          <span />
        </button>
      </div>

      <div className="lightbox-stage">
        <button
          type="button"
          className="lightbox-nav prev"
          onClick={() => onChange((index - 1 + posters.length) % posters.length)}
          aria-label="Previous artwork"
        >
          <Arrow />
        </button>
        <figure className="lightbox-figure">
          <img key={poster.src} src={poster.src} alt={poster.alt} />
          <figcaption aria-live="polite">
            <span>{poster.title}</span>
            <span>{poster.type}</span>
          </figcaption>
        </figure>
        <button
          type="button"
          className="lightbox-nav next"
          onClick={() => onChange((index + 1) % posters.length)}
          aria-label="Next artwork"
        >
          <Arrow />
        </button>
      </div>

      <p className="lightbox-hint">Use arrow keys to browse · Esc to close</p>
    </div>
  )
}
