import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Completed from './pages/Completed'
import InProgress from './pages/InProgress'
import ToDo from './pages/ToDo'
import TeamPage from './pages/TeamPage'
import Trash from './pages/Trash'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'
import Settings from './pages/Settings'
import { TaskProvider } from './context/TaskContext'
import { TeamProvider } from './context/TeamContext'

export default function App() {
  return (
    <TeamProvider>
      <TaskProvider>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-6 flex-1 overflow-auto">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/to-do" element={<ToDo />} />
                <Route path="/in-progress" element={<InProgress />} />
                <Route path="/completed" element={<Completed />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/trash" element={<Trash />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </TaskProvider>
    </TeamProvider>
  )
}
