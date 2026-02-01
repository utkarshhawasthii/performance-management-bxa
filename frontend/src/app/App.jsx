import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../Pages/login'
import Dashboard from '../pages/dashboard'
function App() {
  return (
    <Router>
      <Routes>
        {/* Route 1: The Login Page (Default) */}
        <Route path="/" element={<Login />} />

        {/* Route 2: The Protected Dashboard */}
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  )
}

export default App