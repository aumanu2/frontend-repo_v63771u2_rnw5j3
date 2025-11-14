import Navbar from '../components/Navbar'

export default function About({ user, onLogout }) {
  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <section className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 leading-7">Blue Ridge College is dedicated to academic excellence and holistic development. Our mission is to empower students to become leaders and innovators in their fields.</p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {["Experienced Faculty","Modern Labs","Vibrant Campus"].map((t,i)=>(
            <div key={i} className="p-4 border rounded bg-white">
              <h3 className="font-semibold mb-1">{t}</h3>
              <p className="text-sm text-gray-600">We provide world-class infrastructure and mentorship to our students.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
