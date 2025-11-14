import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

export default function Attendance({ user, onLogout }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [students, setStudents] = useState([])
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [statusMap, setStatusMap] = useState({})
  const [message, setMessage] = useState('')

  useEffect(() => { load() }, [])

  const load = async () => {
    const res = await fetch(`${baseUrl}/api/students`)
    const data = await res.json()
    setStudents(data)
    // Load existing attendance for date
    const att = await fetch(`${baseUrl}/api/attendance?on_date=${date}`).then(r=>r.json())
    const map = {}
    att.forEach(a => { map[a.student_id] = a.status })
    setStatusMap(map)
  }

  const mark = (sid, st) => setStatusMap(prev => ({ ...prev, [sid]: st }))

  const save = async () => {
    setMessage('Saving...')
    for (const s of students) {
      const st = statusMap[s.id] || 'absent'
      await fetch(`${baseUrl}/api/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: s.id, date, status: st })
      })
    }
    setMessage('Saved!')
  }

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Attendance</h1>
        <div className="flex items-center gap-3 mb-4">
          <label>Date:</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border rounded px-3 py-2" />
          <button onClick={load} className="px-3 py-2 bg-gray-100 rounded">Load</button>
        </div>
        <div className="space-y-3">
          {students.map(s => (
            <div key={s.id} className="flex items-center justify-between border rounded p-3 bg-white">
              <div>
                <p className="font-medium">{s.full_name}</p>
                <p className="text-sm text-gray-600">{s.program}</p>
              </div>
              <div className="flex gap-2">
                {['present','absent','late'].map(st => (
                  <button
                    key={st}
                    onClick={() => mark(s.id, st)}
                    className={`px-3 py-1.5 rounded border ${statusMap[s.id]===st ? 'bg-blue-600 text-white' : 'bg-white'}`}
                  >{st}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">Save Attendance</button>
          <span className="text-sm text-gray-600">{message}</span>
        </div>
      </div>
    </div>
  )
}
