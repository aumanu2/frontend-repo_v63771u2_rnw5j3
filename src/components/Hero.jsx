export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-24 border-b">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Learn. Grow. Lead.
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Welcome to Blue Ridge College – a modern campus fostering innovation and excellence.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/admission" className="px-5 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700">Apply Now</a>
            <a href="/about" className="px-5 py-3 bg-white text-blue-600 border rounded shadow hover:bg-blue-50">Learn More</a>
          </div>
        </div>
        <img className="rounded-lg shadow-lg hidden md:block" src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop" alt="Campus" />
      </div>
    </section>
  )
}
