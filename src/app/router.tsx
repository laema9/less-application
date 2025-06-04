import { Routes, Route } from "react-router-dom"
import LandingPage from "@/features/landing/pages/LandingPage"
import HomePage from "@/features/home/pages/HomePage"
import DashboardPage from "@/features/dashboard/pages/DashboardPage"
import AppLayout from "@/shared/layout/AppLayout"
import LoginPage from "@/features/auth/pages/LoginPage"

export default function Router() {
  return (
    <Routes>
      {/* Route sans layout (pas de sidebar) */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Routes avec sidebar */}
      <Route element={<AppLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}
