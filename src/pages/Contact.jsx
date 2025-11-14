import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

export default function Contact({ user, onLogout }) {
  const [info, setInfo] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(()=>{(async()=>{
    const res = await fetch(`${baseUrl}/api/info/contact`)
    const data = await res.json()
    setInfo(data)
  })()},[])

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <section className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        {!info ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="space-y-2 bg-white p-4 border rounded">
            <p><span className="font-semibold">Address:</span> {info.address}</p>
            <p><span className="font-semibold">Email:</span> {info.email}</p>
            <p><span className="font-semibold">Phone:</span> {info.phone}</p>
            <p><span className="font-semibold">Office Hours:</span> {info.office_hours}</p>
          </div>
        )}
      </section>
    </div>
  )
}
