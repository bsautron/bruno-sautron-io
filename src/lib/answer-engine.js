import { KNOWLEDGE, SKILLS, JOBS, CONTACTS, LINKS } from './knowledge'

const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'to', 'of', 'in', 'on',
  'for', 'with', 'and', 'or', 'but', 'do', 'does', 'did', 'you', 'your', 'yours', 'i', 'me', 'my',
  'mine', 'he', 'she', 'it', 'they', 'them', 'what', 'whats', 'when', 'where', 'who', 'how', 'why',
  'can', 'could', 'would', 'should', 'will', 'about', 'tell', 'please', 'so', 'that', 'this',
  'have', 'has', 'had', 'as', 'at', 'by', 'from', 'which', 's',
])

function tokenize(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
}

const INDEX = KNOWLEDGE.map((chunk) => ({
  ...chunk,
  tokens: tokenize(`${chunk.text} ${chunk.sourceLabel} ${chunk.keywords || ''}`),
}))

function scoreChunk(questionTokens, chunk) {
  let score = 0
  questionTokens.forEach((qt) => {
    chunk.tokens.forEach((ct) => {
      if (ct === qt) score += 2
      else if (ct.length > 3 && (ct.startsWith(qt) || qt.startsWith(ct))) score += 1
    })
  })
  return score
}

function detectIntent(text) {
  if (/^\s*(hi|hello|hey|salut|bonjour|yo)\b/.test(text)) return 'greeting'
  if (/\b(strongest|best|top|main|favorite|favourite)\b/.test(text) && /\bskill/.test(text)) return 'top-skills'
  if (/\b(current|now|today|currently)\b/.test(text) && /\b(role|job|position|work|doing)\b/.test(text)) return 'current-role'
  if (/\b(contact|reach|email|phone|call|hire|available)\b/.test(text)) return 'contact'
  return null
}

function greetingAnswer() {
  return {
    text: "Hi! I'm a small in-browser search over this CV, not a hosted AI model. Ask about Bruno's experience, skills, or how to reach him.",
    sources: [],
  }
}

function contactAnswer() {
  const email = CONTACTS.find((c) => c.kind === 'email')
  const phone = CONTACTS.find((c) => c.kind === 'phone')
  const location = CONTACTS.find((c) => c.kind === 'location')
  const linkList = LINKS.map((l) => l.label).join(', ')
  return {
    text: `You can reach Bruno at ${email.label} or by phone at ${phone.label}. He's currently set up for ${location.label.toLowerCase()}. He's also on ${linkList}.`,
    sources: [],
  }
}

function topSkillsAnswer() {
  const top = [...SKILLS].sort((a, b) => b.level - a.level).slice(0, 3)
  const lines = top.map((s) => `${s.name} (${s.level}/100) — ${s.tools.map((t) => t.name).join(', ')}`)
  return {
    text: `Bruno's strongest areas, by his own self-rating:\n\n${lines.join('\n')}`,
    sources: top.map((s) => `Keywords · ${s.name}`),
  }
}

function currentRoleAnswer() {
  const current = JOBS.find((j) => /today|present/i.test(j.years)) || JOBS[0]
  const index = JOBS.indexOf(current) + 1
  return {
    text: `Currently: ${current.title} at ${current.company} (${current.years}).`,
    sources: [`[${index}] ${current.company}, ${current.title} (${current.years})`],
  }
}

export function answerQuestion(raw) {
  const trimmed = (raw || '').trim()
  if (!trimmed) {
    return { text: "Ask me something about Bruno's experience, skills, or how to reach him.", sources: [] }
  }

  const normalized = trimmed.toLowerCase()
  const intent = detectIntent(normalized)
  if (intent === 'greeting') return greetingAnswer()
  if (intent === 'contact') return contactAnswer()
  if (intent === 'top-skills') return topSkillsAnswer()
  if (intent === 'current-role') return currentRoleAnswer()

  const qTokens = tokenize(trimmed)
  if (qTokens.length === 0) {
    return { text: 'Could you rephrase that? Try asking about a specific skill or company.', sources: [] }
  }

  const scored = INDEX
    .map((chunk) => ({ chunk, score: scoreChunk(qTokens, chunk) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)

  if (scored.length === 0) {
    return {
      text: "I couldn't find anything about that in this CV. Try asking about Bruno's backend experience, "
        + 'a specific company (Lalalab, Wemaintain, Pickme...), a skill (NodeJS, GraphQL, AWS...), '
        + 'or how to reach him.',
      sources: [],
    }
  }

  const top = scored.slice(0, 3)
  const lines = top.map(({ chunk }) => chunk.text)
  return {
    text: lines.join('\n\n'),
    sources: top.map(({ chunk }) => chunk.sourceLabel),
  }
}

export const SUGGESTED_PROMPTS = [
  "What's your current role?",
  'What are your strongest skills?',
  'Tell me about Wemaintain',
  'How can I reach you?',
]
