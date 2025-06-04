import { ThemeProvider } from "@/components/theme-provider"
import Router from "@/router"
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
