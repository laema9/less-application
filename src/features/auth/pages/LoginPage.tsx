import { LoginForm } from "../components/LoginForm"
import { Link } from "react-router-dom"

export default function LoginPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <LoginForm />
      <p className="text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}
