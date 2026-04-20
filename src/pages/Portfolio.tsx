import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const categories = ['Todos', 'Fotografía', 'Marcos', 'Video', 'Bodas', 'Comercial'] as const

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('Todos')

  const visibleProjects =
    activeCategory === 'Todos'
      ? projects
      : projects.filter((project) => project.category === activeCategory)

  return (
    <section className="page">
      <div className="container page-header">
        <span className="eyebrow">Portfolio</span>
        <h1>Fotografia y video para marcas que cuidan la atmosfera.</h1>
        <p>
          Una seleccion de trabajos donde el lujo no depende del exceso, sino del control de luz,
          gesto, ritmo y textura.
        </p>
      </div>

      <div className="container filter-row" role="tablist" aria-label="Filtrar portfolio">
        {categories.map((category) => (
          <button
            className={category === activeCategory ? 'filter-pill is-active' : 'filter-pill'}
            key={category}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="container portfolio-grid">
        {visibleProjects.map((project) => (
          <article className="project-card portfolio-card" key={project.slug}>
            <div
              aria-hidden="true"
              className="project-card-media tall-media"
              style={{ backgroundImage: `url(${project.coverImage})` }}
            ></div>
            <div className="project-card-body">
              <div className="project-card-topline">
                <span>{project.category}</span>
                <span>{project.location}</span>
              </div>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <Link className="text-link" to={`/portfolio/${project.slug}`}>
                Ver detalle
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Portfolio