export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">🏠 Home</h1>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => {
          throw new Error("This is your first error!")
        }}
      >
        Break the world
      </button>
    </div>
  )
}
