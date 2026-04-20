import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer-shell">
      <div className="container footer">
        <div>
          <span className="eyebrow">Disponible para proyectos selectos</span>
          <p className="footer-title">Imagen premium para marcas, artistas y editoriales.</p>
        </div>

        <div className="footer-links">
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/contacto">Contacto</Link>
          <a href="mailto:hola@pacosauceda.com">hola@pacosauceda.com</a>
          <a href="https://instagram.com" rel="noreferrer" target="_blank">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer