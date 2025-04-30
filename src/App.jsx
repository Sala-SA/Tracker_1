import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'
// ...existing imports...

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          {/* ...existing routes... */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}