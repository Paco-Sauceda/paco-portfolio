import { useState } from 'react'
import { sendContactMessage } from '../lib/supabaseClient'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const SERVICE_OPTIONS = ['Fotografía', 'Marcos', 'Video', 'Bodas', 'XV Años', 'Comercial']

interface ContactFormProps {
  initialService?: string
}

function ContactForm({ initialService }: ContactFormProps) {
  const defaultService =
    SERVICE_OPTIONS.find((s) => s === initialService) ?? 'Fotografía'

  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [projectType, setProjectType] = useState(defaultService)
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage(null)

    const { error } = await sendContactMessage({
      name,
      email,
      projectType,
      message,
    })

    if (error) {
      setStatus('error')
      setErrorMessage(error)
      return
    }

    setStatus('success')
    setName('')
    setEmail('')
    setPhone('')
    setProjectType('Fotografía')
    setMessage('')
  }

  return (
    <div className="panel contact-form-panel">
      <div className="section-copy-block">
        <span className="eyebrow">Formulario</span>
        <h2>Envíame tu mensaje.</h2>
        {initialService ? (
          <p>
            Interesado en <strong>{initialService}</strong> — completa los datos
            y te contacto pronto.
          </p>
        ) : (
          <p>Comparte los detalles de tu proyecto y te respondo en menos de 24 horas.</p>
        )}
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            onChange={(event) => setName(event.target.value)}
            placeholder="Tu nombre"
            required
            type="text"
            value={name}
          />
        </label>

        <label>
          Email
          <input
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu@email.com"
            required
            type="email"
            value={email}
          />
        </label>

        <label>
          Teléfono (opcional)
          <input
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+52 ..."
            type="tel"
            value={phone}
          />
        </label>

        <label>
          Servicio
          <select onChange={(event) => setProjectType(event.target.value)} value={projectType}>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </label>

        <label>
          Cuéntame sobre tu proyecto
          <textarea
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Fecha, ubicación, cantidad de personas, qué tipo de resultado esperas..."
            required
            rows={6}
            value={message}
          />
        </label>

        <button className="button" disabled={status === 'sending'} type="submit">
          {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
        </button>

        {status === 'success' ? (
          <p className="form-success">
            Gracias. Tu mensaje fue enviado. Te contacto pronto.
          </p>
        ) : null}

        {status === 'error' && errorMessage ? <p className="form-error">{errorMessage}</p> : null}
      </form>
    </div>
  )
}

export default ContactForm
