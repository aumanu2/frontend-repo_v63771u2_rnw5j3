import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

export default function Home({ user, onLogout }) {
  const [about, setAbout] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(()=>{(async()=>{
    const res = await fetch(`${baseUrl}/api/info/about`)
    const data = await res.json()
    setAbout(data)
  })()},[])

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <Hero />
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {about?.programs?.slice(0,3).map((p,i)=>(
            <div key={i} className="p-4 bg-white border rounded">
              <h3 className="font-semibold">{p}</h3>
              <p className="text-sm text-gray-600">Explore our {p} program with expert faculty.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
