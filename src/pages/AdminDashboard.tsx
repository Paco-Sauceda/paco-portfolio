import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import MessagesTable, { type MessageRow } from '../components/MessagesTable'
import ProductAnalytics from '../components/ProductAnalytics'
import ProjectForm, { type NewProjectInput } from '../components/ProjectForm'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import './AdminDashboard.css'

interface SiteStatRow {
  id: number | string
  clients_count: number
  sessions_count: number
  videos_count: number
}

interface ProjectRow {
  id: number | string
  slug: string
  title: string
  category: string
  year: string
  featured: boolean
  published: boolean
}

interface DashboardErrorState {
  messages: string | null
  stats: string | null
  projects: string | null
  createProject: string | null
}

const initialErrors: DashboardErrorState = {
  messages: null,
  stats: null,
  projects: null,
  createProject: null,
}

type MessageFilter = 'all' | 'new' | 'read' | 'archived'

function AdminDashboard() {
  const { signOutAdmin, user } = useAuth()
  const [messages, setMessages] = useState<MessageRow[]>([])
  const [stats, setStats] = useState<SiteStatRow | null>(null)
  const [projects, setProjects] = useState<ProjectRow[]>([])
  const [loading, setLoading] = useState(true)
  const [savingStatId, setSavingStatId] = useState<number | string | null>(null)
  const [updatingProjectId, setUpdatingProjectId] = useState<number | string | null>(null)
  const [updatingMessageId, setUpdatingMessageId] = useState<number | string | null>(null)
  const [creatingProject, setCreatingProject] = useState(false)
  const [errors, setErrors] = useState<DashboardErrorState>(initialErrors)
  const [messageFilter, setMessageFilter] = useState<MessageFilter>('all')

  const statsSummary = useMemo(() => {
    const newMessages = messages.filter((m) => (m.status ?? 'new') === 'new').length
    return {
      totalMessages: messages.length,
      newMessages,
      featuredProjects: projects.filter((project) => project.featured).length,
      publishedProjects: projects.filter((project) => project.published).length,
    }
  }, [messages, projects])

  const setError = (key: keyof DashboardErrorState, value: string | null) => {
    setErrors((prev) => ({ ...prev, [key]: value }))
  }

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('id, name, email, project_type, message, status, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      setError('messages', error.message)
      return
    }

    setError('messages', null)
    setMessages((data ?? []) as MessageRow[])
  }

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('site_stats')
      .select('id, clients_count, sessions_count, videos_count')
      .limit(1)
      .single()

    if (error) {
      setError('stats', error.message)
      return
    }

    setError('stats', null)
    setStats(data as SiteStatRow)
  }

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('id, slug, title, category, year, featured, published')
      .order('year', { ascending: false })

    if (error) {
      setError('projects', error.message)
      return
    }

    setError('projects', null)
    setProjects(
      ((data ?? []) as ProjectRow[]).map((item) => ({
        ...item,
        year: String(item.year ?? ''),
        featured: Boolean(item.featured),
        published: Boolean(item.published),
      })),
    )
  }

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      setLoading(true)
      await Promise.all([fetchMessages(), fetchStats(), fetchProjects()])
      if (isMounted) setLoading(false)
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [])

  const handleUpdateMessageStatus = async (
    id: number | string,
    status: 'new' | 'read' | 'archived',
  ) => {
    setUpdatingMessageId(id)

    const { error } = await supabase
      .from('messages')
      .update({ status })
      .eq('id', id)

    if (error) {
      setError('messages', error.message)
      setUpdatingMessageId(null)
      return
    }

    setError('messages', null)
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m)),
    )
    setUpdatingMessageId(null)
  }

  const handleStatChange = (
    field: 'clients_count' | 'sessions_count' | 'videos_count',
    value: number,
  ) => {
    setStats((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  const handleSaveStats = async () => {
    if (!stats) return
    setSavingStatId(stats.id)

    const { error } = await supabase
      .from('site_stats')
      .update({
        clients_count: stats.clients_count,
        sessions_count: stats.sessions_count,
        videos_count: stats.videos_count,
      })
      .eq('id', stats.id)

    if (error) {
      setError('stats', error.message)
      setSavingStatId(null)
      return
    }

    setError('stats', null)
    setSavingStatId(null)
  }

  const handleToggleProject = async (
    project: ProjectRow,
    field: 'featured' | 'published',
  ) => {
    setUpdatingProjectId(project.id)

    const { error } = await supabase
      .from('projects')
      .update({ [field]: !project[field] })
      .eq('id', project.id)

    if (error) {
      setError('projects', error.message)
      setUpdatingProjectId(null)
      return
    }

    setError('projects', null)
    setProjects((prev) =>
      prev.map((item) =>
        item.id === project.id ? { ...item, [field]: !item[field] } : item,
      ),
    )
    setUpdatingProjectId(null)
  }

  const handleCreateProject = async (input: NewProjectInput) => {
    setCreatingProject(true)

    const payload = {
      slug: input.slug,
      title: input.title,
      category: input.category,
      location: 'Por definir',
      year: input.year,
      format: 'Fotografía',
      summary: input.summary,
      description: input.summary,
      services: [],
      cover_image: input.coverImage,
      gallery: [],
      featured: input.featured,
      published: input.published,
      metrics: [],
    }

    const { error } = await supabase.from('projects').insert([payload])

    if (error) {
      setError('createProject', error.message)
      setCreatingProject(false)
      return false
    }

    setError('createProject', null)
    await fetchProjects()
    setCreatingProject(false)
    return true
  }

  return (
    <section className="admin-dashboard-page">
      <div className="admin-dashboard-container">
        {/* Header + quick stats */}
        <div className="admin-dashboard-main-grid">
          <div className="admin-dashboard-card">
            <p className="admin-kicker">Dashboard</p>
            <h1 className="admin-dashboard-title">Panel privado</h1>
            <p className="admin-dashboard-copy">
              Sesión activa como <strong>{user?.email}</strong>
            </p>
            <p className="admin-dashboard-muted">Gestiona contenido público desde Supabase.</p>

            <div className="admin-dashboard-actions">
              <Link className="admin-dashboard-button" to="/portfolio">
                Ver sitio público
              </Link>
              <button
                className="admin-dashboard-button admin-dashboard-button-ghost"
                onClick={() => void signOutAdmin()}
                type="button"
              >
                Cerrar sesión
              </button>
            </div>
          </div>

          <div className="admin-dashboard-stats-grid">
            <div className="admin-dashboard-metric">
              <strong>{statsSummary.totalMessages}</strong>
              <span>Mensajes totales</span>
            </div>
            <div className={`admin-dashboard-metric ${statsSummary.newMessages > 0 ? 'metric-highlight' : ''}`}>
              <strong>{statsSummary.newMessages}</strong>
              <span>Sin leer</span>
            </div>
            <div className="admin-dashboard-metric">
              <strong>{statsSummary.featuredProjects}</strong>
              <span>Featured activos</span>
            </div>
            <div className="admin-dashboard-metric">
              <strong>{statsSummary.publishedProjects}</strong>
              <span>Proyectos publicados</span>
            </div>
          </div>
        </div>

        {/* Product analytics */}
        <ProductAnalytics messages={messages} />

        {/* Messages inbox + Project form */}
        <div className="admin-dashboard-full-width">
          <MessagesTable
            errorMessage={errors.messages}
            filter={messageFilter}
            isLoading={loading}
            messages={messages}
            onFilterChange={setMessageFilter}
            onUpdateStatus={handleUpdateMessageStatus}
            updatingId={updatingMessageId}
          />
        </div>

        <div className="admin-dashboard-full-width">
          <ProjectForm
            errorMessage={errors.createProject}
            isSubmitting={creatingProject}
            onCreateProject={handleCreateProject}
          />
        </div>

        {/* Site stats editor */}
        <section className="admin-panel-card">
          <div className="admin-panel-header">
            <div>
              <p className="admin-kicker">Home público</p>
              <h2 className="admin-section-title">Estadísticas del sitio</h2>
            </div>
          </div>

          {errors.stats ? <p className="admin-error">{errors.stats}</p> : null}

          {stats ? (
            <div className="admin-stats-editor-list">
              <article className="admin-stats-editor-item">
                <label className="admin-field">
                  Clientes
                  <input
                    className="admin-input"
                    type="number"
                    onChange={(event) => handleStatChange('clients_count', Number(event.target.value))}
                    value={stats.clients_count}
                  />
                </label>

                <label className="admin-field">
                  Sesiones
                  <input
                    className="admin-input"
                    type="number"
                    onChange={(event) => handleStatChange('sessions_count', Number(event.target.value))}
                    value={stats.sessions_count}
                  />
                </label>

                <label className="admin-field">
                  Videos
                  <input
                    className="admin-input"
                    type="number"
                    onChange={(event) => handleStatChange('videos_count', Number(event.target.value))}
                    value={stats.videos_count}
                  />
                </label>

                <button
                  className="admin-btn admin-btn-ghost"
                  disabled={savingStatId === stats.id}
                  onClick={() => void handleSaveStats()}
                  type="button"
                >
                  {savingStatId === stats.id ? 'Guardando...' : 'Guardar'}
                </button>
              </article>
            </div>
          ) : null}
        </section>

        {/* Projects list */}
        <div className="admin-dashboard-list-shell">
          <div>
            <p className="admin-kicker">Inventario visual</p>
            <h2 className="admin-section-title">Proyectos</h2>
          </div>

          {errors.projects ? <p className="admin-error">{errors.projects}</p> : null}

          <div className="admin-dashboard-project-list">
            {projects.map((project) => (
              <article className="admin-dashboard-project-item" key={project.slug}>
                <div>
                  <p className="admin-kicker">{project.category}</p>
                  <h3 className="admin-dashboard-project-title">{project.title}</h3>
                  <p className="admin-dashboard-project-summary">Slug: {project.slug}</p>
                </div>

                <div className="admin-dashboard-project-meta">
                  <span>{project.year}</span>
                  <span>
                    Featured: <strong>{project.featured ? 'Sí' : 'No'}</strong>
                  </span>
                  <span>
                    Published: <strong>{project.published ? 'Sí' : 'No'}</strong>
                  </span>
                  <Link className="admin-dashboard-link" to={`/portfolio/${project.slug}`}>
                    Abrir detalle
                  </Link>
                  <div className="admin-project-actions">
                    <button
                      className="admin-btn admin-btn-ghost"
                      disabled={updatingProjectId === project.id}
                      onClick={() => void handleToggleProject(project, 'featured')}
                      type="button"
                    >
                      Toggle featured
                    </button>
                    <button
                      className="admin-btn admin-btn-ghost"
                      disabled={updatingProjectId === project.id}
                      onClick={() => void handleToggleProject(project, 'published')}
                      type="button"
                    >
                      Toggle published
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard
