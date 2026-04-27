export interface ServicePackage {
  id: string
  serviceSlug: string
  name: string
  price: string
  includes: string[]
  highlight?: boolean
}

export const packages: ServicePackage[] = [
  // ─── Fotografía ──────────────────────────────────────
  {
    id: 'foto-basico',
    serviceSlug: 'fotografia',
    name: 'Basico',
    price: 'Desde $2,500 MXN',
    includes: [
      '1 hora de sesion',
      '15 fotos editadas',
      'Entrega digital',
    ],
  },
  {
    id: 'foto-premium',
    serviceSlug: 'fotografia',
    name: 'Premium',
    price: 'Desde $5,000 MXN',
    includes: [
      '2 horas de sesion',
      '30 fotos editadas',
      'Entrega digital + galeria privada',
      'Cambio de vestuario',
    ],
    highlight: true,
  },
  {
    id: 'foto-completo',
    serviceSlug: 'fotografia',
    name: 'Completo',
    price: 'Desde $8,000 MXN',
    includes: [
      'Sesion completa sin limite de tiempo',
      '50+ fotos editadas',
      'Galeria privada + descarga HD',
      'Direccion creativa incluida',
      '2 locaciones',
    ],
  },

  // ─── Marcos ──────────────────────────────────────────
  {
    id: 'marcos-basico',
    serviceSlug: 'marcos',
    name: 'Individual',
    price: 'Desde $800 MXN',
    includes: [
      '1 marco impreso',
      'Acabado premium',
      'Tamano 8x10"',
    ],
  },
  {
    id: 'marcos-premium',
    serviceSlug: 'marcos',
    name: 'Coleccion',
    price: 'Desde $2,000 MXN',
    includes: [
      '3 marcos impresos',
      'Acabado premium',
      'Tamanos variados',
      'Empaque de regalo',
    ],
    highlight: true,
  },
  {
    id: 'marcos-completo',
    serviceSlug: 'marcos',
    name: 'Galeria',
    price: 'Desde $4,500 MXN',
    includes: [
      '6+ marcos impresos',
      'Acabados mixtos',
      'Diseno de composicion para pared',
      'Instalacion incluida',
    ],
  },

  // ─── XV Años ─────────────────────────────────────────
  {
    id: 'xv-basico',
    serviceSlug: 'xv-anos',
    name: 'Esencial',
    price: 'Desde $8,000 MXN',
    includes: [
      'Cobertura de ceremonia o fiesta',
      '50 fotos editadas',
      'Entrega digital',
    ],
  },
  {
    id: 'xv-premium',
    serviceSlug: 'xv-anos',
    name: 'Premium',
    price: 'Desde $15,000 MXN',
    includes: [
      'Sesion pre-evento',
      'Cobertura completa ceremonia + fiesta',
      '100+ fotos editadas',
      'Video highlight 3 min',
      'Galeria privada',
    ],
    highlight: true,
  },
  {
    id: 'xv-completo',
    serviceSlug: 'xv-anos',
    name: 'Completo',
    price: 'Desde $25,000 MXN',
    includes: [
      'Sesion pre-evento en locacion',
      'Cobertura dia completo',
      '200+ fotos editadas',
      'Video cinematografico 5-8 min',
      'Album impreso',
      'Galeria privada + descarga HD',
    ],
  },

  // ─── Bodas ───────────────────────────────────────────
  {
    id: 'boda-basico',
    serviceSlug: 'bodas',
    name: 'Esencial',
    price: 'Desde $12,000 MXN',
    includes: [
      'Cobertura ceremonia + recepcion',
      '80 fotos editadas',
      'Entrega digital',
    ],
  },
  {
    id: 'boda-premium',
    serviceSlug: 'bodas',
    name: 'Premium',
    price: 'Desde $22,000 MXN',
    includes: [
      'Cobertura dia completo',
      '150+ fotos editadas',
      'Video highlight 3-5 min',
      'Sesion de pareja previa',
      'Galeria privada',
    ],
    highlight: true,
  },
  {
    id: 'boda-completo',
    serviceSlug: 'bodas',
    name: 'Cinematografico',
    price: 'Desde $35,000 MXN',
    includes: [
      'Cobertura dia completo + getting ready',
      '250+ fotos editadas',
      'Video cinematografico 8-12 min',
      'Sesion de pareja previa',
      'Album impreso premium',
      'Galeria privada + descarga HD',
      'Segundo fotografo',
    ],
  },

  // ─── Comercial ───────────────────────────────────────
  {
    id: 'comercial-basico',
    serviceSlug: 'comercial',
    name: 'Starter',
    price: 'Desde $4,000 MXN',
    includes: [
      '10 fotos de producto o marca',
      'Edicion profesional',
      'Uso para redes sociales',
    ],
  },
  {
    id: 'comercial-premium',
    serviceSlug: 'comercial',
    name: 'Marca',
    price: 'Desde $8,000 MXN',
    includes: [
      '25 fotos de producto o marca',
      'Direccion creativa',
      'Uso para redes + web',
      'Video reel 30s para redes',
    ],
    highlight: true,
  },
  {
    id: 'comercial-completo',
    serviceSlug: 'comercial',
    name: 'Campana',
    price: 'Desde $15,000 MXN',
    includes: [
      '40+ fotos para campana completa',
      'Direccion creativa + moodboard',
      'Video promocional 1-2 min',
      'Uso ilimitado comercial',
      'Entrega express',
    ],
  },
]
