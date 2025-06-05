import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

export function useUser() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    fetchUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return user
}
