import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext'
import { PublishStatus } from './AdminEditors'
import './admin.css'

const NAV = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/theme', label: 'Theme & Colors' },
  { to: '/admin/hero', label: 'Hero & Site' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/case-studies', label: 'Case Studies' },
  { to: '/admin/about', label: 'About' },
  { to: '/admin/faq', label: 'FAQ' },
  { to: '/admin/footer', label: 'Footer & Contact' },
  { to: '/admin/cta', label: 'CTA Banner' },
  { to: '/admin/orbit', label: 'Orbit Icons' },
]

export default function AdminLayout() {
  const { logout } = useAdminAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-head">
          <p className="admin-sidebar-eyebrow">Builder</p>
          <p className="admin-sidebar-title">Haider Portfolio</p>
        </div>
        <nav className="admin-nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `admin-nav-link${isActive ? ' admin-nav-link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-foot">
          <Link className="admin-nav-link" to="/" target="_blank" rel="noreferrer">
            View site ↗
          </Link>
          <button type="button" className="admin-nav-link admin-nav-link--btn" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <PublishStatus />
        <Outlet />
      </main>
    </div>
  )
}
