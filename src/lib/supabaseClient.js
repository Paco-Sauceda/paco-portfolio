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

// ─── Storage helpers ─────────────────────────────────────────────────────────
//
// Your current Supabase Storage layout:
//   videos bucket → FotosP/ → all your photos
//   photos bucket → your hero video file
//
// To organize photos by project later, create subfolders inside FotosP:
//   videos/FotosP/luz-de-medianoche/cover.jpg
//   videos/FotosP/luz-de-medianoche/gallery-1.jpg
// If no subfolder exists for a slug, shows all photos from FotosP.

const PHOTOS_BUCKET = 'videos'   // bucket where your photos live
const PHOTOS_FOLDER = 'FotosP'   // folder inside that bucket
const VIDEO_BUCKET  = 'photos'   // bucket where your hero video lives

/**
 * Lists photos for a project from Supabase Storage.
 * First tries videos/FotosP/<slug>/ — if empty, falls back to videos/FotosP/.
 * Returns public URLs, with any file named "cover.*" sorted first.
 */
export async function getProjectPhotos(slug) {
  if (!hasSupabaseConfig) return createResult([], null)

  const buildUrls = (files, folder) =>
    files
      .filter((f) => f.name !== '.emptyFolderPlaceholder' && f.id)
      .map((f) => {
        const { data } = supabase.storage
          .from(PHOTOS_BUCKET)
          .getPublicUrl(`${folder}/${f.name}`)
        return data.publicUrl
      })
      .sort((a, b) => {
        if (a.includes('/cover.')) return -1
        if (b.includes('/cover.')) return 1
        return 0
      })

  return withErrorHandling(async () => {
    // Try project-specific subfolder first
    const slugFolder = `${PHOTOS_FOLDER}/${slug}`
    const { data: slugFiles } = await supabase.storage
      .from(PHOTOS_BUCKET)
      .list(slugFolder, { sortBy: { column: 'name', order: 'asc' } })

    if (slugFiles && slugFiles.filter((f) => f.id).length > 0) {
      return createResult(buildUrls(slugFiles, slugFolder), null)
    }

    // Fallback: all photos in FotosP
    const { data: allFiles, error } = await supabase.storage
      .from(PHOTOS_BUCKET)
      .list(PHOTOS_FOLDER, { sortBy: { column: 'name', order: 'asc' } })

    if (error) return createResult([], error.message)
    if (!allFiles || allFiles.length === 0) return createResult([], null)

    return createResult(buildUrls(allFiles, PHOTOS_FOLDER), null)
  }, 'No fue posible cargar las fotos del proyecto.')
}

/**
 * Returns the public URL of the hero video.
 * Default: looks in the "photos" bucket at the root.
 * Pass the exact filename you uploaded (e.g. 'mi-video.mp4').
 */
export function getHeroVideoUrl(filename) {
  if (!filename) return ''
  const { data } = supabase.storage.from(VIDEO_BUCKET).getPublicUrl(filename)
  return data?.publicUrl ?? ''
}

export async function sendContactMessage({ name, email, phone, projectType, message }) {
  if (!hasSupabaseConfig) {
    return createResult(null, 'Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_PUBLISHABLE_KEY.')
  }

  const payload = {
    name: name?.trim(),
    email: email?.trim(),
    phone: phone?.trim() || null,
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


/**
 *
 * Every photo URL:https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/cover.jpg
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/DSCF3219.jpg
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/DSCF6611.jpg
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/DSCF6902.jpg
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/DSCF6918.jpg
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/DSCF7517.jpg
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/DSCF7536.jpg
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/DSCF7601.jpg
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/IMG_5928.HEIC
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/IMG_6926.HEIC
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/PHOTO-2024-06-25-16-26-15%202.jpg
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/PHOTO-2024-06-25-16-26-15.jpg
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/PHOTO-2024-06-25-16-26-16.jpg
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/FotoPaco.JPG
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/Landscape.JPG
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/Quincea1.JPG
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/Quincea2.JPG
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/Quincea3.JPG
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/Wedding.JPG
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP/Wedding2.JPG
 * video:
 * https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/photos/hero.mp4
 *
 */
