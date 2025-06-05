import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Button } from "@/shared/ui/button"

export function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      setMessage("Check your email to confirm your registration.")
    }
  }

  return (
    <form onSubmit={handleSignup} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {message && <p className="text-green-600 text-sm">{message}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  )
}
