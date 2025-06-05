import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSession } from "./useSession"

/**
 * Hook to protect private routes.
 * Redirects to /login if there is no active session.
 */
export function useRequireAuth() {
  const { session, loading } = useSession()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!loading && !session) {
      navigate("/login", { state: { from: location }, replace: true })
    }
  }, [loading, session, navigate, location])

  return { session, loading }
}

