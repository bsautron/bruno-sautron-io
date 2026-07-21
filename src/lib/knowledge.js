import about from '../about.json'
import skills from '../skills.json'
import jobs from '../jobs.json'
import contactsData from '../contacts.json'

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, '')
}

function buildChunks() {
  const chunks = []

  about.forEach((html, i) => {
    chunks.push({
      id: `about-${i}`,
      section: 'Abstract',
      text: stripHtml(html),
      sourceLabel: 'Abstract',
      keywords: 'about bio background introduction who profile summary',
    })
  })

  skills.forEach((skill) => {
    const tools = skill.tools.map((t) => t.name).join(', ')
    chunks.push({
      id: `skill-${skill.name}`,
      section: 'Keywords',
      level: skill.level,
      text: `${skill.name}: proficiency ${skill.level} out of 100. Tools: ${tools}.`,
      sourceLabel: `Keywords · ${skill.name}`,
      keywords: 'skill skills keyword competency proficiency stack technology tool expertise',
    })
  })

  jobs.forEach((job, i) => {
    const index = i + 1
    const tech = job.tech.map((group) => group.join(', ')).join('; ')
    const explanations = job.explanations.map(stripHtml).join(' ')
    chunks.push({
      id: `job-${index}`,
      section: 'Employment History',
      index,
      isCurrent: /today|present/i.test(job.years),
      text: `${job.title} at ${job.company} (${job.years}). ${explanations} Technologies: ${tech}.`,
      sourceLabel: `[${index}] ${job.company}, ${job.title} (${job.years})`,
      keywords: 'job employment work experience company role position history career',
    })
  })

  return chunks
}

export const KNOWLEDGE = buildChunks()
export const SKILLS = skills
export const JOBS = jobs
export const CONTACTS = contactsData.contacts
export const LINKS = contactsData.links
