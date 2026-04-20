import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <section className="page page-centered">
        <div className="panel panel-compact">
          <span className="eyebrow">Proyecto no encontrado</span>
          <h1>Este caso no existe o fue removido.</h1>
          <Link className="button" to="/portfolio">
            Volver al portfolio
          </Link>
        </div>
      </section>
    )
  }

  return (
    <article className="page project-detail-page">
      <div className="container project-hero-grid">
        <div className="section-copy-block">
          <span className="eyebrow">
            {project.category} · {project.year}
          </span>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div className="chip-row">
            {project.services.map((service) => (
              <span className="chip" key={service}>
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="project-hero-media" style={{ backgroundImage: `url(${project.coverImage})` }}></div>
      </div>

      <section className="section-block">
        <div className="container detail-grid">
          <div className="panel">
            <span className="eyebrow">Resumen</span>
            <p>{project.summary}</p>
          </div>
          <div className="detail-metrics-grid">
            {project.metrics.map((metric) => (
              <div className="panel metric-card" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container section-heading-row">
          <div>
            <span className="eyebrow">Galeria</span>
            <h2>Frames y stills seleccionados.</h2>
          </div>
          <Link className="text-link" to="/contacto">
            Solicitar proyecto similar
          </Link>
        </div>

        <div className="container gallery-grid">
          {project.gallery.map((image, index) => (
            <div
              aria-label={`Imagen ${index + 1} de ${project.title}`}
              className="gallery-card"
              key={image}
              role="img"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
        </div>
      </section>
    </article>
  )
}

export default ProjectDetail