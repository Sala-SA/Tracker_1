import Notifications from './Notifications'
import ProfileMenu from './ProfileMenu'

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* ...existing nav items... */}
          
          <div className="flex items-center space-x-4">
            <Notifications />
            <ProfileMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}