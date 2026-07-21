import { Experience } from './experience'

export function Job({ index, title, company, years, tech, explanations }) {
  return (
    <Experience index={index} title={title} company={company} years={years} tech={tech}>
      {explanations.map((explanation, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: explanation }} />
      ))}
    </Experience>
  )
}
