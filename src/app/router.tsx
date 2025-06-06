import { Routes, Route } from "react-router-dom"
import LandingPage from "@/features/landing/pages/LandingPage"
import HomePage from "@/features/home/pages/HomePage"
import DashboardPage from "@/features/dashboard/pages/DashboardPage"
import CryptoListPage from "@/features/tools/crypto-list-table/pages/CryptoListPage"
import AppLayout from "@/shared/layout/AppLayout"
import LoginPage from "@/features/auth/pages/LoginPage"
import SignupPage from "@/features/auth/pages/SignupPage"
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute"
import SettingsPage from "@/features/settings/pages/SettingsPage"
import ToolsPage from "@/features/tools/tools-page/pages/ToolsPage"

export default function Router() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Routes privées avec layout */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/cryptolist" element={<CryptoListPage />} />
      </Route>
    </Routes>
  )
}
