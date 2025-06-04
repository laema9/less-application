import { SignupForm } from "../components/SignupForm"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      {/* Top nav */}
      <div className="absolute top-4 left-4">
        <Link to="/login">
          <Button variant="ghost" size="sm">
            ← Back to login
          </Button>
        </Link>
      </div>

      {/* Logo */}
      <div className="mb-6 text-2xl font-bold"></div>

      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  )
}
