const STORAGE_BASE =
  'https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/videos/FotosP'

export interface Service {
  slug: string
  title: string
  subtitle: string
  description: string
  cover: string
  photos: string[]
}

export const services: Service[] = [
  {
    slug: 'fotografia',
    title: 'Fotografía',
    subtitle: 'Editorial & retrato',
    description:
      'Sesiones de fotografía profesional con dirección visual cuidada. Retratos, campañas, producto y contenido editorial con luz natural y estudio.',
    cover: `${STORAGE_BASE}/DSCF6902.jpg`,
    photos: [
      `${STORAGE_BASE}/DSCF6902.jpg`,
      `${STORAGE_BASE}/DSCF3219.jpg`,
      `${STORAGE_BASE}/DSCF6611.jpg`,
      `${STORAGE_BASE}/DSCF6918.jpg`,
      `${STORAGE_BASE}/DSCF7517.jpg`,
      `${STORAGE_BASE}/DSCF7536.jpg`,
      `${STORAGE_BASE}/DSCF7601.jpg`,
      `${STORAGE_BASE}/Landscape.JPG`,
      `${STORAGE_BASE}/cover.jpg`,
    ],
  },
  {
    slug: 'marcos',
    title: 'Marcos',
    subtitle: 'Frames impresos',
    description:
      'Fotografía enmarcada con acabados premium. Impresiones de alta calidad listas para decorar espacios, regalos personalizados y piezas de colección.',
    cover: `${STORAGE_BASE}/PHOTO-2024-06-25-16-26-15.jpg`,
    photos: [
      `${STORAGE_BASE}/PHOTO-2024-06-25-16-26-15.jpg`,
      `${STORAGE_BASE}/PHOTO-2024-06-25-16-26-15%202.jpg`,
      `${STORAGE_BASE}/PHOTO-2024-06-25-16-26-16.jpg`,
      `${STORAGE_BASE}/IMG_5928.HEIC`,
      `${STORAGE_BASE}/IMG_6926.HEIC`,
    ],
  },
  {
    slug: 'xv-anos',
    title: 'XV Años',
    subtitle: 'Quinceañeras',
    description:
      'Cobertura completa de XV años con un estilo moderno y elegante. Sesión pre-evento, ceremonia, fiesta y retratos que capturan cada momento especial.',
    cover: `${STORAGE_BASE}/Quincea1.JPG`,
    photos: [
      `${STORAGE_BASE}/Quincea1.JPG`,
      `${STORAGE_BASE}/Quincea2.JPG`,
      `${STORAGE_BASE}/Quincea3.JPG`,
    ],
  },
  {
    slug: 'bodas',
    title: 'Bodas',
    subtitle: 'Weddings',
    description:
      'Fotografía y video de bodas con una mirada cinematográfica. Desde la preparación hasta la fiesta, capturando emociones reales con un estilo atemporal.',
    cover: `${STORAGE_BASE}/Wedding.JPG`,
    photos: [
      `${STORAGE_BASE}/Wedding.JPG`,
      `${STORAGE_BASE}/Wedding2.JPG`,
    ],
  },
  {
    slug: 'comercial',
    title: 'Comercial',
    subtitle: 'Contenido para marcas',
    description:
      'Producción de contenido visual para marcas y negocios. Fotografía de producto, campañas publicitarias, contenido para redes sociales y material corporativo.',
    cover: `${STORAGE_BASE}/DSCF7517.jpg`,
    photos: [
      `${STORAGE_BASE}/DSCF7517.jpg`,
      `${STORAGE_BASE}/DSCF7536.jpg`,
      `${STORAGE_BASE}/DSCF6611.jpg`,
    ],
  },
]

export const aboutPhoto = `${STORAGE_BASE}/FotoPaco.JPG`
export const heroVideo = 'https://fpzawlsfnruffhxwogtm.supabase.co/storage/v1/object/public/photos/hero.mp4'
