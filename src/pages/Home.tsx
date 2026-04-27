import { Link } from 'react-router-dom'
import ScrollVideoHero from '../components/ScrollVideoHero'
import { services, aboutPhoto, heroVideo } from '../data/services'

function Home() {
  return (
    <>
      <ScrollVideoHero
        ctaPrimaryLabel="Ver servicios"
        ctaPrimaryTo="/portfolio"
        ctaSecondaryLabel="Contáctame"
        ctaSecondaryTo="/contacto"
        eyebrow="Paco Sauceda"
        poster={services[0].cover}
        subtitle="Fotografía y video profesional para bodas, XV años, marcos y contenido comercial."
        title="Tu momento, capturado con estilo."
        videoSrc={heroVideo}
      />

      {/* ─── Services Section ─────────────────────────────── */}
      <section className="section-block">
        <div className="container section-heading-row">
          <div>
            <span className="eyebrow">Servicios</span>
            <h2>Lo que puedo hacer por ti.</h2>
          </div>
          <Link className="text-link" to="/portfolio">
            Ver todo
          </Link>
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
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── About Section ────────────────────────────────── */}
      <section className="section-block">
        <div className="container about-grid">
          <div
            className="about-photo"
            style={{ backgroundImage: `url(${aboutPhoto})` }}
          />
          <div className="about-copy">
            <span className="eyebrow">Sobre mí</span>
            <h2>Paco Sauceda</h2>
            <p>
              Fotógrafo y videógrafo profesional. Me especializo en capturar
              momentos que importan — bodas, XV años, sesiones de retrato y
              contenido comercial para marcas que quieren destacar.
            </p>
            <p>
              Cada proyecto tiene su propio lenguaje visual. Mi trabajo es
              encontrarlo y hacer que se sienta auténtico.
            </p>
            <div className="about-actions">
              <Link className="button" to="/contacto">
                Trabajemos juntos
              </Link>
              <a
                className="button button-ghost"
                href="https://instagram.com/franciscosaucedam"
                rel="noreferrer"
                target="_blank"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
