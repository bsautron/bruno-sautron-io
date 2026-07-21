import contactsData from '../../contacts.json'
import './contacts.css'

const { contacts: CONTACTS, links: LINKS } = contactsData

export function Contacts() {
  return (
    <div className="masthead-contacts">
      <ul className="contact-footnotes">
        {CONTACTS.map((c) => (
          <li key={c.label}>
            <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <sup className="contact-mark">{c.mark}</sup>
              {c.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="contact-links">
        {LINKS.map((l, i) => (
          <span key={l.label}>
            <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            {i < LINKS.length - 1 && <span className="contact-links-sep"> &middot; </span>}
          </span>
        ))}
      </p>
    </div>
  )
}
