import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">LESS - Landing</h1>
      <button
        className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded"
        onClick={() => navigate("/home")}
      >
        Go to homepage
      </button>
    </div>
  )
}
