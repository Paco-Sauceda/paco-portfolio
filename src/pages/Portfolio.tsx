import { Link } from 'react-router-dom'
import { services } from '../data/services'

function Portfolio() {
  return (
    <section className="page">
      <div className="container page-header">
        <span className="eyebrow">Servicios</span>
        <h1>Elige el servicio que necesitas.</h1>
        <p>
          Explora mi trabajo por categoría. Haz clic en cualquier servicio para ver
          la galería completa y solicitar una cotización.
        </p>
      </div>

      <div className="container services-grid">
        {services.map((service) => (
          <Link
            className="service-card"
            key={service.slug}
            to={`/portfolio/${service.slug}`}
          >
            <div
              className="service-card-media"
              style={{ backgroundImage: `url(${service.cover})` }}
            />
            <div className="service-card-body">
              <span className="service-card-sub">{service.subtitle}</span>
              <h3>{service.title}</h3>
              <p style={{ marginTop: 8, fontSize: '0.88rem' }}>{service.description}</p>
            </div>
            <div className="service-card-hover">Ver galería</div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Portfolio
