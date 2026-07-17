import { useState } from 'react'
import { useFlags } from 'launchdarkly-react-client-sdk'
import './App.css'

const FLAG_KEY = 'show-daily-checkin'
const MOODS = [
  { emoji: '😞', label: 'Low' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '🙂', label: 'Great' },
]

function App() {
  const flags = useFlags()
  const showDailyCheckin = flags[FLAG_KEY]

  const [selectedMood, setSelectedMood] = useState(null)

  return (
    <main className="app">
      <header>
        <h1>Mood Tracker</h1>
        <p className="subtitle">A tiny LaunchDarkly sample app.</p>
      </header>

      {showDailyCheckin && (
        <aside
          className="daily-checkin"
          role="region"
          aria-label="Daily check-in"
        >
          <h2>How are you feeling today?</h2>
          <p className="checkin-sub">
            Tap a mood to log how your day is going.
          </p>
          <div className="mood-buttons">
            {MOODS.map((m) => (
              <button
                key={m.label}
                type="button"
                className={`mood ${selectedMood === m.label ? 'selected' : ''}`}
                onClick={() => setSelectedMood(m.label)}
                aria-pressed={selectedMood === m.label}
              >
                <span className="emoji" aria-hidden="true">
                  {m.emoji}
                </span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
          {selectedMood && (
            <p className="checkin-confirm">
              Logged: <strong>{selectedMood}</strong>
            </p>
          )}
        </aside>
      )}

      <section className="flag-status">
        <p>
          Flag <code>{FLAG_KEY}</code> is currently{' '}
          <strong>{String(showDailyCheckin)}</strong>.
        </p>
        <p className="hint">
          Toggle it in your LaunchDarkly dashboard and this page will update
          live &mdash; no reload needed.
        </p>
      </section>
    </main>
  )
}

export default App
