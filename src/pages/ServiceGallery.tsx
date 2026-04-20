import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { services } from '../data/services'

function ServiceGallery() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  if (!service) {
    return (
      <section className="page page-centered">
        <div className="panel panel-compact">
          <span className="eyebrow">Servicio no encontrado</span>
          <h1>Esta categoría no existe.</h1>
          <Link className="button" to="/portfolio">
            Ver servicios
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero banner */}
      <div className="gallery-hero">
        <div
          className="gallery-hero-bg"
          style={{ backgroundImage: `url(${service.cover})` }}
        />
        <div className="gallery-hero-content">
          <span className="eyebrow">{service.subtitle}</span>
          <h1>{service.title}</h1>
          <p style={{ maxWidth: '60ch' }}>{service.description}</p>
        </div>
      </div>

      {/* Gallery masonry */}
      <section className="page" style={{ paddingTop: 48 }}>
        <div className="container gallery-masonry">
          {service.photos.map((photo, i) => (
            <div
              className="gallery-masonry-item"
              key={photo}
              onClick={() => setLightboxSrc(photo)}
            >
              <img
                alt={`${service.title} - foto ${i + 1}`}
                loading="lazy"
                src={photo}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="container gallery-cta-section">
          <span className="eyebrow">Te interesa?</span>
          <h2>Hagamos tu sesión de {service.title}.</h2>
          <p>Cuéntame qué tienes en mente y te envío una cotización.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link
              className="button"
              to={`/contacto?servicio=${encodeURIComponent(service.title)}`}
            >
              Solicitar cotización
            </Link>
            <Link className="button button-ghost" to="/portfolio">
              Ver más servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxSrc ? (
        <div className="lightbox" onClick={() => setLightboxSrc(null)}>
          <button
            className="lightbox-close"
            onClick={() => setLightboxSrc(null)}
            type="button"
          >
            ✕
          </button>
          <img alt="Vista ampliada" src={lightboxSrc} />
        </div>
      ) : null}
    </>
  )
}

export default ServiceGallery
