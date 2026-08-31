import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext'

export default function ProtectedRoute({ children }) {
  const { authenticated, loading } = useAdminAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="admin-login-page">
        <p className="admin-login-sub">Loading…</p>
      </div>
    )
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
  }

  return children
}
