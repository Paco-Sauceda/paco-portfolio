import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { services } from '../data/services'
import { packages } from '../data/packages'

function ServiceGallery() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const servicePackages = packages.filter((p) => p.serviceSlug === slug)

  const nextMonth = new Date()
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  const nextMonthName = nextMonth.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })

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

        {/* Packages */}
        {servicePackages.length > 0 && (
          <div className="container packages-section" style={{ paddingTop: 48 }}>
            <div className="section-heading-row">
              <div>
                <span className="eyebrow">Paquetes</span>
                <h2>Elige tu paquete de {service.title}.</h2>
              </div>
            </div>

            <div className="packages-grid">
              {servicePackages.map((pkg) => (
                <div
                  className={`package-card${pkg.highlight ? ' package-card-highlight' : ''}`}
                  key={pkg.id}
                >
                  <span className="package-card-name">{pkg.name}</span>
                  <span className="package-card-price">{pkg.price}</span>
                  <ul className="package-card-includes">
                    {pkg.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link
                    className="button"
                    to={`/contacto?servicio=${encodeURIComponent(service.title)}&paquete=${encodeURIComponent(pkg.name)}`}
                  >
                    Cotizar {pkg.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="container gallery-cta-section">
          <span className="eyebrow">Te interesa?</span>
          <h2>Hagamos tu sesion de {service.title}.</h2>
          <div className="availability-notice">
            <span className="availability-notice-dot" />
            Agenda disponible para {nextMonthName}.
          </div>
          <p>Cuentame que tienes en mente y te envio una cotizacion.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link
              className="button"
              to={`/contacto?servicio=${encodeURIComponent(service.title)}`}
            >
              Solicitar cotizacion
            </Link>
            <Link className="button button-ghost" to="/portfolio">
              Ver mas servicios
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
