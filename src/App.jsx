import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'
import Dashboard from './components/Dashboard'
import TaskList from './components/TaskList'
import TeamPanel from './components/TeamPanel'
// ...existing imports...

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/team" element={<TeamPanel />} />
          {/* ...existing routes... */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}