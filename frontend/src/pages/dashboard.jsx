
import { useNavigate } from 'react-router-dom'
import { SupabaseClient } from '@supabase/supabase-js/dist/index.cjs'

export default function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await SupabaseClient.auth.signOut()
    navigate('/')
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Performance Dashboard</h1>
      <p className="mt-4 text-slate-600">Welcome to your secure area.</p>
      <button 
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Sign Out
      </button>
    </div>
  )
}