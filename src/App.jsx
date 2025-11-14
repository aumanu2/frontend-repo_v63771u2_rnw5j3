import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Admission from './pages/Admission'
import Students from './pages/Students'
import Attendance from './pages/Attendance'
import Login from './pages/Login'
import AdmissionsAdmin from './pages/AdmissionsAdmin'

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (user && window.location.pathname === '/login') {
      navigate('/')
    }
  }, [user])

  return (
    <Routes>
      <Route path="/" element={<Home user={user} onLogout={()=>setUser(null)} />} />
      <Route path="/about" element={<About user={user} onLogout={()=>setUser(null)} />} />
      <Route path="/contact" element={<Contact user={user} onLogout={()=>setUser(null)} />} />
      <Route path="/admission" element={<Admission user={user} onLogout={()=>setUser(null)} />} />
      <Route path="/students" element={<Students user={user} onLogout={()=>setUser(null)} />} />
      <Route path="/attendance" element={<Attendance user={user} onLogout={()=>setUser(null)} />} />
      <Route path="/login" element={<Login user={user} setUser={setUser} />} />
      <Route path="/admissions-admin" element={<AdmissionsAdmin user={user} onLogout={()=>setUser(null)} />} />
    </Routes>
  )
}

export default App
