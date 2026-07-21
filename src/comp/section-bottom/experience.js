import './experience.css'

export function Experience({ index, title, company, years, children, tech }) {
  return (
    <li className="employment-entry">
      <span className="entry-number" aria-hidden="true">[{index}]</span>
      <div className="entry-body">
        <div className="entry-head">
          <h3 className="entry-title">{title}</h3>
          <span className="entry-meta">{company} &middot; {years}</span>
        </div>
        <div className="entry-desc">{children}</div>
        <p className="entry-tech">
          {tech.map((group, i) => (
            <span className="entry-tech-group" key={i}>{group.join(', ')}</span>
          ))}
        </p>
      </div>
    </li>
  )
}
