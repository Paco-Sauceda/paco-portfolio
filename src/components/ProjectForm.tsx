import { useState } from 'react'

export interface NewProjectInput {
  title: string
  slug: string
  category: 'Fotografía' | 'Marcos' | 'Video' | 'Bodas' | 'Comercial'
  year: string
  summary: string
  coverImage: string
  featured: boolean
  published: boolean
}

interface ProjectFormProps {
  onCreateProject: (input: NewProjectInput) => Promise<boolean>
  isSubmitting: boolean
  errorMessage: string | null
}

const defaultFormValues: NewProjectInput = {
  title: '',
  slug: '',
  category: 'Fotografía',
  year: String(new Date().getFullYear()),
  summary: '',
  coverImage: '',
  featured: false,
  published: true,
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function ProjectForm({ onCreateProject, isSubmitting, errorMessage }: ProjectFormProps) {
  const [formValues, setFormValues] = useState<NewProjectInput>(defaultFormValues)

  const updateField = <K extends keyof NewProjectInput>(field: K, value: NewProjectInput[K]) => {
    setFormValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const created = await onCreateProject(formValues)

    if (created) {
      setFormValues(defaultFormValues)
    }
  }

  return (
    <form className="admin-panel-card project-form" onSubmit={handleSubmit}>
      <div>
        <p className="admin-kicker">Nuevo proyecto</p>
        <h3 className="admin-section-title">Crear proyecto</h3>
      </div>

      <label className="admin-field">
        Titulo
        <input
          className="admin-input"
          onChange={(event) => {
            const title = event.target.value
            updateField('title', title)

            if (!formValues.slug) {
              updateField('slug', slugify(title))
            }
          }}
          placeholder="Luz de Medianoche"
          required
          value={formValues.title}
        />
      </label>

      <label className="admin-field">
        Slug
        <input
          className="admin-input"
          onChange={(event) => updateField('slug', slugify(event.target.value))}
          placeholder="luz-de-medianoche"
          required
          value={formValues.slug}
        />
      </label>

      <div className="admin-grid-2">
        <label className="admin-field">
          Categoria
          <select
            className="admin-input"
            onChange={(event) =>
              updateField('category', event.target.value as NewProjectInput['category'])
            }
            value={formValues.category}
          >
            <option value="Fotografía">Fotografía</option>
            <option value="Marcos">Marcos</option>
            <option value="Video">Video</option>
            <option value="Bodas">Bodas</option>
            <option value="Comercial">Comercial</option>
          </select>
        </label>

        <label className="admin-field">
          Anio
          <input
            className="admin-input"
            onChange={(event) => updateField('year', event.target.value)}
            placeholder="2026"
            required
            value={formValues.year}
          />
        </label>
      </div>

      <label className="admin-field">
        Resumen
        <textarea
          className="admin-input"
          onChange={(event) => updateField('summary', event.target.value)}
          placeholder="Descripcion corta del proyecto"
          required
          rows={4}
          value={formValues.summary}
        />
      </label>

      <label className="admin-field">
        Cover image URL
        <input
          className="admin-input"
          onChange={(event) => updateField('coverImage', event.target.value)}
          placeholder="https://..."
          required
          type="url"
          value={formValues.coverImage}
        />
      </label>

      <div className="admin-check-row">
        <label className="admin-checkbox">
          <input
            checked={formValues.featured}
            onChange={(event) => updateField('featured', event.target.checked)}
            type="checkbox"
          />
          Destacado (featured)
        </label>

        <label className="admin-checkbox">
          <input
            checked={formValues.published}
            onChange={(event) => updateField('published', event.target.checked)}
            type="checkbox"
          />
          Publicado
        </label>
      </div>

      <button className="admin-btn" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Guardando...' : 'Crear proyecto'}
      </button>

      {errorMessage ? <p className="admin-error">{errorMessage}</p> : null}
    </form>
  )
}

export default ProjectForm
