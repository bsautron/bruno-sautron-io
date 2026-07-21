import './neural-field-toggle.css'

export function NeuralFieldToggle({ paused, onToggle }) {
  return (
    <button
      type="button"
      className="neural-toggle"
      onClick={onToggle}
      aria-pressed={paused}
      aria-label={paused ? 'Resume neural field animation' : 'Pause neural field animation'}
      title={paused ? 'Resume field' : 'Pause field'}
    >
      <span className="neural-toggle-dot" data-active={!paused} aria-hidden="true" />
      <span aria-hidden="true">{paused ? 'Paused' : 'Live'}</span>
    </button>
  )
}
