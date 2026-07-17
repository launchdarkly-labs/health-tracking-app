import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk'
import './index.css'
import App from './App.jsx'

const clientSideID = import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID

async function render() {
  const container = document.getElementById('root')

  if (!clientSideID) {
    createRoot(container).render(
      <StrictMode>
        <div className="missing-key">
          <h1>LaunchDarkly client-side ID missing</h1>
          <p>
            Copy <code>.env.example</code> to <code>.env</code> and paste your
            client-side ID from the LaunchDarkly dashboard, then restart the
            dev server.
          </p>
        </div>
      </StrictMode>
    )
    return
  }

  const LDProvider = await asyncWithLDProvider({
    clientSideID,
    context: { kind: 'user', key: 'demo-user', anonymous: true },
    reactOptions: { useCamelCaseFlagKeys: false },
  })

  createRoot(container).render(
    <StrictMode>
      <LDProvider>
        <App />
      </LDProvider>
    </StrictMode>
  )
}

render()
