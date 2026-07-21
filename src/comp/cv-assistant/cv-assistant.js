import { useEffect, useRef, useState } from 'react'
import { answerQuestion, SUGGESTED_PROMPTS } from '../../lib/answer-engine'
import './cv-assistant.css'

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function CvAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [pending, setPending] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const inputRef = useRef(null)
  const timersRef = useRef([])

  useEffect(() => () => {
    timersRef.current.forEach((t) => window.clearInterval(t))
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      if (!dialog.open) dialog.showModal()
      window.setTimeout(() => inputRef.current && inputRef.current.focus(), 50)
    } else if (dialog.open) {
      dialog.close()
    }
  }, [open])

  function firePulseNear(el) {
    if (!el) return
    const rect = el.getBoundingClientRect()
    window.dispatchEvent(new CustomEvent('neural:pulse', {
      detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
    }))
  }

  function pushAssistantMessage(fullText, sources) {
    const id = makeId('a')

    if (prefersReducedMotion()) {
      setMessages((m) => [...m, { id, role: 'assistant', text: fullText, sources, streaming: false }])
      firePulseNear(dialogRef.current)
      return
    }

    setMessages((m) => [...m, { id, role: 'assistant', text: '', sources, streaming: true }])
    const words = fullText.split(/(\s+)/)
    let i = 0
    const timer = window.setInterval(() => {
      i += 1
      const partial = words.slice(0, i).join('')
      setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, text: partial } : msg)))
      if (i >= words.length) {
        window.clearInterval(timer)
        timersRef.current = timersRef.current.filter((t) => t !== timer)
        setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, streaming: false } : msg)))
        firePulseNear(dialogRef.current)
      }
    }, 28)
    timersRef.current.push(timer)
  }

  function ask(question) {
    const trimmed = question.trim()
    if (!trimmed || pending) return

    setMessages((m) => [...m, { id: makeId('u'), role: 'user', text: trimmed }])
    setInputValue('')
    setPending(true)

    const delay = prefersReducedMotion() ? 120 : 480 + Math.random() * 420
    const timer = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((t) => t !== timer)
      const { text, sources } = answerQuestion(trimmed)
      setPending(false)
      pushAssistantMessage(text, sources)
    }, delay)
    timersRef.current.push(timer)
  }

  function handleSubmit(e) {
    e.preventDefault()
    ask(inputValue)
  }

  function handleDialogClick(e) {
    if (e.target === dialogRef.current) setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className="assistant-trigger"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <span className="assistant-trigger-dot" aria-hidden="true" />
        Ask this CV
      </button>

      <dialog
        ref={dialogRef}
        className="assistant-dialog"
        aria-labelledby="assistant-title"
        onClick={handleDialogClick}
        onClose={() => setOpen(false)}
      >
        <header className="assistant-header">
          <div>
            <h2 id="assistant-title" className="assistant-title">Ask about this CV</h2>
            <p className="assistant-subtitle">
              Runs entirely in your browser &mdash; matches your question against the content on this page.
              No server, no external model.
            </p>
          </div>
          <button type="button" className="assistant-close" onClick={() => setOpen(false)} aria-label="Close">
            &times;
          </button>
        </header>

        <div className="assistant-log" role="log" aria-live="polite">
          {messages.length === 0 && (
            <div className="assistant-prompts">
              {SUGGESTED_PROMPTS.map((p) => (
                <button type="button" key={p} className="assistant-prompt-chip" onClick={() => ask(p)}>
                  {p}
                </button>
              ))}
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`assistant-message assistant-message--${m.role}`}>
              <p className="assistant-message-text">{m.text}{m.streaming && <span className="assistant-caret" aria-hidden="true" />}</p>
              {m.sources && m.sources.length > 0 && !m.streaming && (
                <p className="assistant-message-sources">{m.sources.join(' · ')}</p>
              )}
            </div>
          ))}

          {pending && (
            <div className="assistant-message assistant-message--assistant assistant-message--pending">
              <span className="assistant-typing" aria-hidden="true">
                <span /><span /><span />
              </span>
              <span className="visually-hidden">Searching the CV&hellip;</span>
            </div>
          )}
        </div>

        <form className="assistant-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="assistant-input"
            placeholder="Ask about experience, skills, contact…"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Ask a question about this CV"
          />
          <button type="submit" className="assistant-send" disabled={!inputValue.trim() || pending}>
            Send
          </button>
        </form>
      </dialog>
    </>
  )
}
