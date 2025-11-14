import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate()
  const handleLogout = () => {
    onLogout()
    navigate('/')
  }
  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-10 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">Blue Ridge College</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link className="hover:text-blue-600" to="/about">About</Link>
          <Link className="hover:text-blue-600" to="/contact">Contact</Link>
          <Link className="hover:text-blue-600" to="/admission">Admission</Link>
          {user && (
            <>
              <Link className="hover:text-blue-600" to="/students">Students</Link>
              <Link className="hover:text-blue-600" to="/attendance">Attendance</Link>
            </>
          )}
          {!user ? (
            <Link className="px-3 py-1.5 bg-blue-600 text-white rounded" to="/login">Admin Login</Link>
          ) : (
            <button onClick={handleLogout} className="px-3 py-1.5 bg-gray-800 text-white rounded">Logout</button>
          )}
        </nav>
      </div>
    </header>
  )
}
