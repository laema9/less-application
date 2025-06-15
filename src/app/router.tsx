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
import ScreenerPage from "@/features/screener/pages/ScreenerPage"
import Dashboard from "@/features/screener/pages/DemoScreenerPage"
import SuperchartsPage from "@/features/tools/supercharts/pages/SuperchartsPage"
import EtfTracker from "@/features/tools/etf-tracker/pages/EtfTracker"
import CalendarPage from "@/features/tools/calendar/pages/CalendarPage"

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
        <Route path="/screener" element={<ScreenerPage />} />
        <Route path="/screener2" element={<Dashboard />} />
        <Route path="/supercharts" element={<SuperchartsPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/cryptolist" element={<CryptoListPage />} />
        <Route path="/tools/etf" element={<EtfTracker />} />
        <Route path="/tools/calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  )
}
