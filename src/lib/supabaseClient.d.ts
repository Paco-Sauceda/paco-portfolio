import type { SupabaseClient } from '@supabase/supabase-js'

export interface PublicProjectMetric {
  label: string
  value: string
}

export interface PublicProject {
  slug: string
  title: string
  category: 'Fotografía' | 'Marcos' | 'Video' | 'Bodas' | 'Comercial'
  location: string
  year: string
  format: string
  summary: string
  description: string
  services: string[]
  coverImage: string
  gallery: string[]
  featured: boolean
  metrics: PublicProjectMetric[]
}

export interface SiteStat {
  value: string
  label: string
  detail: string
}

export interface RawSiteStats {
  id: number
  clients_count: number
  sessions_count: number
  videos_count: number
}

export interface ContactMessagePayload {
  name: string
  email: string
  projectType: string
  message: string
}

export interface SupabaseResult<T> {
  data: T | null
  error: string | null
}

export const hasSupabaseConfig: boolean
export const supabase: SupabaseClient

export function getFeaturedProjects(limit?: number): Promise<SupabaseResult<PublicProject[]>>
export function getSiteStats(): Promise<SupabaseResult<SiteStat[]>>
export function getRawSiteStats(): Promise<SupabaseResult<RawSiteStats>>
export function sendContactMessage(
  payload: ContactMessagePayload,
): Promise<SupabaseResult<{ ok: boolean }>>