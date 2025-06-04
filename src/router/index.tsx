import { Routes, Route } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import HomePage from "../pages/HomePage"


export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  )
}
