import ContactForm from '../components/ContactForm'

function Contact() {
  return (
    <section className="page">
      <div className="container contact-grid">
        <div className="section-copy-block contact-copy">
          <span className="eyebrow">Contacto</span>
          <h1>Disponible para campañas, retratos y piezas audiovisuales selectas.</h1>
          <p>
            Si buscas una direccion visual limpia, oscura y premium, comparte el brief. Puedo
            apoyar desde la idea hasta la entrega final.
          </p>

          <div className="contact-details panel">
            <p>
              <strong>Email</strong>
              <span>hola@pacosauceda.com</span>
            </p>
            <p>
              <strong>Base</strong>
              <span>Mexico, disponible para viajar</span>
            </p>
            <p>
              <strong>Formatos</strong>
              <span>Editorial, campañas, reels, lookbooks, retrato</span>
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}

export default Contact