import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './ProtectedRoute.css'

function ProtectedRoute() {
  const { isAdmin, loading, user } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <section className="protected-route-shell">
        <div className="protected-route-card">
          <p className="protected-route-eyebrow">Admin</p>
          <h1 className="protected-route-title">Verificando acceso</h1>
          <p className="protected-route-copy">Estamos restaurando tu sesion segura.</p>
        </div>
      </section>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute