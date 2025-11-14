import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

export default function AdmissionsAdmin({ user, onLogout }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [message, setMessage] = useState('')

  const load = async () => {
    const res = await fetch(`${baseUrl}/api/admissions`)
    const data = await res.json()
    setItems(data)
  }
  useEffect(()=>{ load() },[])

  const accept = async (id) => {
    setMessage('Accepting...')
    const res = await fetch(`${baseUrl}/api/admissions/${id}/accept`, { method: 'POST' })
    if (res.ok) {
      setMessage('Accepted! Student created.')
      load()
    } else {
      setMessage('Failed to accept')
    }
  }

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Admissions (Admin)</h1>
        <div className="space-y-3">
          {items.map(a => (
            <div key={a.id} className="p-4 border rounded bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{a.full_name} • {a.program}</p>
                  <p className="text-sm text-gray-600">{a.email} • {a.phone}</p>
                  <p className="text-xs text-gray-500">Status: {a.status}</p>
                </div>
                {a.status === 'pending' && (
                  <button onClick={()=>accept(a.id)} className="px-3 py-1.5 bg-green-600 text-white rounded">Accept</button>
                )}
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-gray-600">No applications yet.</p>}
        </div>
        <p className="text-sm text-gray-600 mt-3">{message}</p>
      </div>
    </div>
  )
}
