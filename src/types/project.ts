export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
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
  metrics: ProjectMetric[]
}