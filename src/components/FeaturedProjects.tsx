import { Link } from 'react-router-dom'
import type { Project } from '../types/project'

interface FeaturedProjectsProps {
  projects: Project[]
}

function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="section-block">
      <div className="container section-heading-row">
        <div>
          <span className="eyebrow">Selecciones destacadas</span>
          <h2>Proyectos con una direccion visual sobria y cinematografica.</h2>
        </div>
        <Link className="text-link" to="/portfolio">
          Ver portfolio completo
        </Link>
      </div>

      <div className="container project-grid featured-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.slug}>
            <div
              aria-hidden="true"
              className="project-card-media"
              style={{ backgroundImage: `url(${project.coverImage})` }}
            ></div>
            <div className="project-card-body">
              <div className="project-card-topline">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <Link className="text-link" to={`/portfolio/${project.slug}`}>
                Explorar caso
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeaturedProjects