import { createClient } from '@supabase/supabase-js'

const fallbackUrl = 'https://demo.supabase.co'
const fallbackKey = 'demo-publishable-key'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? fallbackUrl
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  fallbackKey

export const hasSupabaseConfig =
  supabaseUrl !== fallbackUrl && supabasePublishableKey !== fallbackKey

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

const createResult = (data, error) => ({ data, error })

const withErrorHandling = async (action, fallbackMessage) => {
  try {
    return await action()
  } catch (error) {
    const message = error instanceof Error ? error.message : fallbackMessage
    return createResult(null, message)
  }
}

const mapProject = (row) => ({
  slug: row.slug,
  title: row.title,
  category: row.category,
  location: row.location,
  year: String(row.year ?? ''),
  format: row.format,
  summary: row.summary,
  description: row.description,
  services: Array.isArray(row.services) ? row.services : [],
  coverImage: row.cover_image ?? row.coverImage ?? '',
  gallery: Array.isArray(row.gallery) ? row.gallery : [],
  featured: Boolean(row.featured),
  metrics: Array.isArray(row.metrics) ? row.metrics : [],
})

export async function getFeaturedProjects(limit = 3) {
  if (!hasSupabaseConfig) {
    return createResult(null, 'Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_PUBLISHABLE_KEY.')
  }

  return withErrorHandling(async () => {
    const { data, error } = await supabase
      .from('projects')
      .select(
        'slug, title, category, location, year, format, summary, description, services, cover_image, gallery, featured, metrics',
      )
      .eq('featured', true)
      .order('year', { ascending: false })
      .limit(limit)

    if (error) {
      return createResult(null, error.message)
    }

    return createResult((data ?? []).map(mapProject), null)
  }, 'No fue posible obtener proyectos destacados.')
}

export async function getSiteStats() {
  if (!hasSupabaseConfig) {
    return createResult(null, 'Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_PUBLISHABLE_KEY.')
  }

  return withErrorHandling(async () => {
    const { data, error } = await supabase
      .from('site_stats')
      .select('id, clients_count, sessions_count, videos_count')
      .limit(1)
      .single()

    if (error) {
      return createResult(null, error.message)
    }

    const row = data ?? {}
    const stats = [
      { value: String(row.clients_count ?? 0), label: 'Clientes', detail: 'Clientes satisfechos' },
      { value: String(row.sessions_count ?? 0), label: 'Sesiones', detail: 'Sesiones realizadas' },
      { value: String(row.videos_count ?? 0), label: 'Videos', detail: 'Videos producidos' },
    ]

    return createResult(stats, null)
  }, 'No fue posible obtener estadisticas del sitio.')
}

export async function sendContactMessage({ name, email, projectType, message }) {
  if (!hasSupabaseConfig) {
    return createResult(null, 'Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_PUBLISHABLE_KEY.')
  }

  const payload = {
    name: name?.trim(),
    email: email?.trim(),
    project_type: projectType?.trim(),
    message: message?.trim(),
  }

  if (!payload.name || !payload.email || !payload.message) {
    return createResult(null, 'Nombre, email y mensaje son obligatorios.')
  }

  return withErrorHandling(async () => {
    const { error } = await supabase.from('messages').insert([payload])

    if (error) {
      return createResult(null, error.message)
    }

    return createResult({ ok: true }, null)
  }, 'No fue posible enviar tu mensaje. Intenta nuevamente.')
}