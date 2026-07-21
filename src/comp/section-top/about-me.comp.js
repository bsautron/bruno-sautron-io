import paragraphs from '../../about.json'

export function AboutMe() {
  return (
    <div className="abstract-body">
      {paragraphs.map((html, i) => (
        <p
          key={i}
          className={i === 0 ? 'abstract-lede' : undefined}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ))}
    </div>
  )
}
