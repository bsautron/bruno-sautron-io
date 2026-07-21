import React, { useState } from 'react'
import './App.css'
import skills from './skills.json'
import jobs from './jobs.json'
import { Names } from './comp/section-top/names.comp'
import { Contacts } from './comp/section-top/contacts.comp'
import { AboutMe } from './comp/section-top/about-me.comp'
import { Job } from './comp/section-bottom/job'
import { NeuralField } from './comp/neural-field/neural-field'
import { NeuralFieldToggle } from './comp/neural-field/neural-field-toggle'
import { CvAssistant } from './comp/cv-assistant/cv-assistant'

function fireSynapse(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  window.dispatchEvent(new CustomEvent('neural:pulse', {
    detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
  }))
}

function App() {
  const [paused, setPaused] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  return (
    <>
      <NeuralField paused={paused} />
      <NeuralFieldToggle paused={paused} onToggle={() => setPaused((p) => !p)} />
      <CvAssistant />

      <main className="paper">
        <header className="masthead">
          <Names />
          <Contacts />
        </header>

        <hr className="masthead-rule" />

        <section className="section" aria-labelledby="abstract-heading">
          <h2 id="abstract-heading" className="section-heading">Abstract</h2>
          <AboutMe />
        </section>

        <section className="section" aria-labelledby="keywords-heading">
          <h2 id="keywords-heading" className="section-heading">Keywords</h2>
          <div className="keywords-grid">
            {skills.map((s) => (
              <div className="keyword-entry" key={s.name} onMouseEnter={fireSynapse}>
                <div className="keyword-head">
                  <span className="keyword-name">{s.name}</span>
                  <span className="keyword-index">{s.level}</span>
                </div>
                <div className="keyword-bar" role="img" aria-label={`Proficiency ${s.level} of 100`}>
                  <span style={{ width: `${s.level}%` }} />
                </div>
                <p className="keyword-tools">
                  {s.tools.map((t, i) => (
                    <span key={t.name} className={t.favorite ? 'tool-tag tool-tag--favorite' : 'tool-tag'}>
                      {t.name}{i < s.tools.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="employment-heading">
          <h2 id="employment-heading" className="section-heading">Employment History</h2>
          <ol className="employment-list">
            {jobs.map((job, i) => (
              <Job
                key={`${job.company}-${job.years}`}
                index={i + 1}
                title={job.title}
                company={job.company}
                years={job.years}
                tech={job.tech}
                explanations={job.explanations}
              />
            ))}
          </ol>
        </section>

        <footer className="colophon">
          <p>Curriculum Vitæ &middot; compiled 2026 &middot; available upon request</p>
        </footer>
      </main>
    </>
  );
}

export default App;
