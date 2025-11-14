import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Admission({ user, onLogout }) {
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', address: '', program: '', dob: '', previous_education: ''
  })
  const [status, setStatus] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const res = await fetch(`${baseUrl}/api/admissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, dob: form.dob })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to submit')
      setStatus('Application submitted successfully!')
      setForm({ full_name: '', email: '', phone: '', address: '', program: '', dob: '', previous_education: '' })
    } catch (e) {
      setStatus(e.message)
    }
  }

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Admission Application</h1>
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
          {[
            ['Full Name','full_name','text'],
            ['Email','email','email'],
            ['Phone','phone','text'],
            ['Address','address','text'],
            ['Program','program','text'],
            ['Date of Birth','dob','date'],
            ['Previous Education','previous_education','text'],
          ].map(([label, key, type]) => (
            <div key={key} className={key==='previous_education' ? 'md:col-span-2' : ''}>
              <label className="block text-sm mb-1">{label}</label>
              <input type={type} value={form[key]} onChange={e=>setForm({...form,[key]: e.target.value})} className="w-full border rounded px-3 py-2" required={key!=='previous_education'} />
            </div>
          ))}
          <div className="md:col-span-2 flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
            <span className="text-sm text-gray-600">{status}</span>
          </div>
        </form>
      </div>
    </div>
  )
}
