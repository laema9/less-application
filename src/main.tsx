import * as ReactDOM from "react-dom/client"
import App from "./app/App"
import * as Sentry from "@sentry/react"
import "./index.css" 


// Initialisation Sentry
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
})


const container = document.getElementById("root")!
const root = ReactDOM.createRoot(container)
root.render(<App />)
