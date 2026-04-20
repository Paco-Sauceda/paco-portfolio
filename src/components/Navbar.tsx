import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/portfolio', label: 'Servicios' },
  { to: '/contacto', label: 'Contacto' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuth()

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className="navbar-shell">
      <div className="container navbar">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark">PS</span>
          <span className="brand-copy">
            <strong>Paco Sauceda</strong>
            <small>Fotografia y video</small>
          </span>
        </Link>

        <button
          aria-expanded={menuOpen}
          aria-label="Abrir navegacion"
          className="nav-toggle"
          onClick={() => setMenuOpen((current) => !current)}
          type="button"
        >
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
              end={item.end}
              onClick={closeMenu}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}

          <Link className="button button-ghost nav-admin-link" onClick={closeMenu} to="/admin">
            {user ? 'Dashboard' : 'Admin'}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar