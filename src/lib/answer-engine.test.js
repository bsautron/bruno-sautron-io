import { answerQuestion } from './answer-engine'

test('answers a greeting', () => {
  const { text } = answerQuestion('hello')
  expect(text.toLowerCase()).toContain('in-browser search')
})

test('answers a contact question with the real email', () => {
  const { text } = answerQuestion('how can I reach you?')
  expect(text).toContain('bruno@sautron.io')
})

test('answers a current-role question from job data', () => {
  const { text, sources } = answerQuestion('what is your current role?')
  expect(text).toContain('Lalalab')
  expect(sources[0]).toMatch(/^\[1\]/)
})

test('answers a top-skills question sorted by level', () => {
  const { text } = answerQuestion('what are your strongest skills?')
  expect(text).toContain('Backend development')
})

test('retrieves company-specific content', () => {
  const { text, sources } = answerQuestion('tell me about Wemaintain')
  expect(text.toLowerCase()).toContain('wemaintain')
  expect(sources.some((s) => s.includes('Wemaintain'))).toBe(true)
})

test('falls back gracefully on unmatched questions', () => {
  const { text, sources } = answerQuestion('what is your favorite pizza topping?')
  expect(text).toMatch(/couldn't find/i)
  expect(sources).toHaveLength(0)
})

test('handles empty input', () => {
  const { text } = answerQuestion('   ')
  expect(text.length).toBeGreaterThan(0)
})
