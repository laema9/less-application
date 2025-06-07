import { ThemeProvider } from "./theme-provider"
import AppRouter from "./router"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "sonner" 
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppRouter />
        <Toaster
          toastOptions={{
            className: "bg-background text-foreground border border-border shadow-lg",
            style: { borderRadius: "12px" },
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
