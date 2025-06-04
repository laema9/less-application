import { Routes, Route } from "react-router-dom"
import LandingPage from "@/features/landing/pages/LandingPage"
import HomePage  from "@/features/home/pages/HomePage"
import DashboardPage from "@/features/dashboard/pages/DashboardPage"

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}
