import './contacts.css'

const CONTACTS = [
  { mark: '*', label: 'bruno@sautron.io', href: 'mailto:bruno@sautron.io' },
  { mark: '†', label: '+33 7 86 65 45 20', href: 'tel:+33786654520' },
  {
    mark: '‡',
    label: 'Full Remote',
    href: 'https://www.google.fr/maps/space/io/@-13.1874945,-22.9320692,19286313m/data=!3m1!1e3',
  },
]

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bsautron/' },
  { label: 'Malt', href: 'https://www.malt.fr/profile/brunosautron/' },
  { label: 'Instagram', href: 'https://www.instagram.com/by.sautron/' },
]

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
