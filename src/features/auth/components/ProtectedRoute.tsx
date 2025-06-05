import type { ReactNode } from "react"
import { useRequireAuth } from "../hooks/useRequireAuth"

/**
 * Usage : 
 * <ProtectedRoute><DashboardPage /></ProtectedRoute>
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useRequireAuth()

  if (loading) {
    return <div className="text-center mt-10">Chargement...</div>
  }

  if (!session) {
    return null 
  }

  return <>{children}</>
}

