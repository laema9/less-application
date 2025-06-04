import { useState } from "react"
import { supabase } from "@/lib/supabase"

export function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage("Check your email to confirm your registration.")
    }
  }

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-2 max-w-sm">
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded px-3 py-2"
      />
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Sign up
      </button>
    </form>
  )
}
