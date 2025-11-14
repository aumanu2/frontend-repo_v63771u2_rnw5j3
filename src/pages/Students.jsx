import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

export default function Students({ user, onLogout }) {
  const [students, setStudents] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => { fetchStudents() }, [])

  const fetchStudents = async () => {
    const res = await fetch(`${baseUrl}/api/students`)
    const data = await res.json()
    setStudents(data)
  }

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Students</h1>
        <div className="grid md:grid-cols-2 gap-4">
          {students.map(s => (
            <div key={s.id} className="border rounded p-4 bg-white">
              <h3 className="font-semibold">{s.full_name}</h3>
              <p className="text-sm text-gray-600">{s.email}</p>
              <p className="text-sm">Program: {s.program}</p>
              <p className="text-sm">Year: {s.year || '-'}</p>
            </div>
          ))}
          {students.length === 0 && (
            <p className="text-gray-600">No students yet. Accept an admission to create a student record.</p>
          )}
        </div>
      </div>
    </div>
  )
}
