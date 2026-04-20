import { useState } from 'react'
import { sendContactMessage } from '../lib/supabaseClient'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState('Fotografía')
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
    setProjectType('Fotografía')
    setMessage('')
  }

  return (
    <div className="panel contact-form-panel">
      <div className="section-copy-block">
        <span className="eyebrow">Contacto</span>
        <h2>Cuéntame qué quieres construir.</h2>
        <p>
          Comparte contexto, fechas y formato. La respuesta inicial normalmente sale en menos
          de 24 horas.
        </p>
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
          Tipo de proyecto
          <select onChange={(event) => setProjectType(event.target.value)} value={projectType}>
            <option>Fotografía</option>
            <option>Marcos</option>
            <option>Video</option>
            <option>Bodas</option>
            <option>Comercial</option>
          </select>
        </label>

        <label>
          Brief
          <textarea
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Objetivo, locacion, fechas y entregables esperados"
            required
            rows={6}
            value={message}
          />
        </label>

        <button className="button" disabled={status === 'sending'} type="submit">
          {status === 'sending' ? 'Enviando...' : 'Enviar consulta'}
        </button>

        {status === 'success' ? (
          <p className="form-success">
            Gracias. Tu mensaje fue enviado correctamente.
          </p>
        ) : null}

        {status === 'error' && errorMessage ? <p className="form-error">{errorMessage}</p> : null}
      </form>
    </div>
  )
}

export default ContactForm