import { useSearchParams } from 'react-router-dom'
import ContactForm from '../components/ContactForm'

function Contact() {
  const [searchParams] = useSearchParams()
  const initialService = searchParams.get('servicio') ?? undefined

  return (
    <section className="page">
      <div className="container contact-grid">
        <div className="section-copy-block contact-copy">
          <span className="eyebrow">Contacto</span>
          <h1>Cuéntame sobre tu proyecto.</h1>
          <p>
            Comparte los detalles de lo que buscas y te envío una cotización
            personalizada. Respondo en menos de 24 horas.
          </p>

          <div className="contact-details panel">
            <p>
              <strong>Email</strong>
              <span>fsaucedamoreno@gmail.com</span>
            </p>
            <p>
              <strong>Instagram</strong>
              <a
                href="https://instagram.com/franciscosaucedam"
                rel="noreferrer"
                style={{ color: 'var(--accent)' }}
                target="_blank"
              >
                @franciscosaucedam
              </a>
            </p>
            <p>
              <strong>Servicios</strong>
              <span>Fotografía, Marcos, Video, Bodas, XV Años, Comercial</span>
            </p>
          </div>
        </div>

        <ContactForm initialService={initialService} />
      </div>
    </section>
  )
}

export default Contact
