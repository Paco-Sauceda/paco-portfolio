import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer-shell">
      <div className="container footer">
        <div>
          <span className="eyebrow">Disponible para proyectos</span>
          <p className="footer-title">
            Fotografía y video profesional para tus momentos más importantes.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/portfolio">Servicios</Link>
          <Link to="/contacto">Contacto</Link>
          <a href="mailto:fsaucedamoreno@gmail.com">Email</a>
          <a
            href="https://instagram.com/franciscosaucedam"
            rel="noreferrer"
            target="_blank"
          >
            @franciscosaucedam
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
