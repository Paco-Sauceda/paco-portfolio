import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AdminLogin.css'

function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, signInAdmin, hasSupabaseConfig } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user) {
    return <Navigate replace to="/admin" />
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    const error = await signInAdmin(email, password)

    if (error) {
      setErrorMessage(error)
      setIsSubmitting(false)
      return
    }

    const nextPath = (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname

    navigate(nextPath ?? '/admin', { replace: true })
  }

  return (
    <section className="admin-login-page">
      <div className="admin-login-card">
        <p className="admin-login-eyebrow">Admin login</p>
        <h1 className="admin-login-title">Acceso privado</h1>
        <p className="admin-login-copy">
          Ingresa con las credenciales de Supabase Auth. Idealmente usa un usuario admin dedicado.
        </p>

        {!hasSupabaseConfig ? (
          <div className="admin-login-notice">
            Faltan variables de entorno. Configura VITE_SUPABASE_URL y
            VITE_SUPABASE_PUBLISHABLE_KEY.
          </div>
        ) : null}

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label className="admin-login-label">
            Email
            <input
              className="admin-login-input"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@tuestudio.com"
              required
              type="email"
              value={email}
            />
          </label>

          <label className="admin-login-label">
            Password
            <input
              className="admin-login-input"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Tu password"
              required
              type="password"
              value={password}
            />
          </label>

          <button className="admin-login-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {errorMessage ? <p className="admin-login-error">{errorMessage}</p> : null}
      </div>
    </section>
  )
}

export default AdminLogin