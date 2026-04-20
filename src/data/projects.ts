import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    slug: 'luz-de-medianoche',
    title: 'Luz de Medianoche',
    category: 'Comercial',
    location: 'Ciudad de Mexico',
    year: '2026',
    format: 'Campana editorial',
    summary:
      'Una narrativa visual nocturna para una firma de moda independiente con enfoque en contraste, textura y movimiento.',
    description:
      'Dirigi una produccion hibrida de fotografia y video pensada para editoriales digitales, piezas sociales y visuales de lanzamiento. El resultado mezcla encuadres silenciosos, humo, reflejos y un ritmo visual contenido.',
    services: ['Direccion creativa', 'Fotografia', 'Video vertical', 'Color grading'],
    coverImage:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: true,
    metrics: [
      { label: 'Piezas finales', value: '42' },
      { label: 'Dias de rodaje', value: '03' },
      { label: 'Entregables', value: 'Foto + Reel' },
    ],
  },
  {
    slug: 'sombra-marina',
    title: 'Sombra Marina',
    category: 'Video',
    location: 'Baja California',
    year: '2025',
    format: 'Fashion film',
    summary:
      'Pieza cinematografica de ritmo lento para una coleccion resort con predominio de siluetas oscuras y horizon line.',
    description:
      'La propuesta se construyo sobre planos largos, textura de viento, capas sonoras tenues y una direccion de movimiento minimal. Se priorizo un lenguaje sobrio que mantiene la atencion en materia, caida y presencia.',
    services: ['Direccion', 'Video', 'Edicion', 'Postproduccion'],
    coverImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: true,
    metrics: [
      { label: 'Duracion', value: '01:28' },
      { label: 'Aspect ratios', value: '3' },
      { label: 'Entrega', value: '7 dias' },
    ],
  },
  {
    slug: 'retratos-del-silencio',
    title: 'Retratos del Silencio',
    category: 'Fotografía',
    location: 'Monterrey',
    year: '2025',
    format: 'Serie de retrato',
    summary:
      'Sesion intimista para talento creativo con direccion de luz puntual y composiciones sobrias.',
    description:
      'El proyecto explora rostro, manos y pausa. Se trabajo con una paleta reducida, fondos profundos y microgestos para construir una narrativa elegante orientada a branding personal y prensa.',
    services: ['Retrato', 'Styling visual', 'Retoque', 'Seleccion editorial'],
    coverImage:
      'https://images.unsplash.com/photo-1514926255734-79b0670bde25?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1492288991661-058aa541ff43?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: true,
    metrics: [
      { label: 'Looks', value: '05' },
      { label: 'Frames curados', value: '28' },
      { label: 'Entrega', value: '48 h' },
    ],
  },
  {
    slug: 'acero-y-piel',
    title: 'Acero y Piel',
    category: 'Comercial',
    location: 'Guadalajara',
    year: '2024',
    format: 'Lanzamiento de marca',
    summary:
      'Campana para accesorios con una mezcla de superficies frias, destellos controlados y retrato editorial.',
    description:
      'Se produjo un set modular adaptable a formatos de ecommerce premium, anuncios cortos y piezas hero. La ejecucion priorizo consistencia visual y entregables pensados para distintos puntos de contacto.',
    services: ['Concepto visual', 'Stills', 'Video producto'],
    coverImage:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: false,
    metrics: [
      { label: 'SKU fotografiados', value: '18' },
      { label: 'Setups', value: '04' },
      { label: 'Formatos', value: 'Web + Social' },
    ],
  },
  {
    slug: 'orbita-intima',
    title: 'Orbita Intima',
    category: 'Video',
    location: 'Oaxaca',
    year: '2024',
    format: 'Live session',
    summary:
      'Registro performativo en una locacion de concreto crudo con iluminacion puntual y camara flotante.',
    description:
      'La pieza busca cercania sin perder escala. Se alternaron desplazamientos lentos, planos detalle y una correccion de color contenida para conservar textura real en piel, tela y espacio.',
    services: ['Cobertura en vivo', 'Edicion', 'Master vertical'],
    coverImage:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: false,
    metrics: [
      { label: 'Camaras', value: '02' },
      { label: 'Audio', value: 'Multitrack' },
      { label: 'Entrega', value: '72 h' },
    ],
  },
  {
    slug: 'negro-solar',
    title: 'Negro Solar',
    category: 'Fotografía',
    location: 'Tulum',
    year: '2023',
    format: 'Lookbook exterior',
    summary:
      'Serie fotografica para resortwear con luz dura, sombras geometricas y composicion arquitectonica.',
    description:
      'La serie combina cuerpos en reposo, lineas limpias y contraste fuerte para construir un imaginario sofisticado y veraniego sin perder la identidad oscura de la marca.',
    services: ['Lookbook', 'Casting visual', 'Edicion color'],
    coverImage:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: false,
    metrics: [
      { label: 'Dias de sesion', value: '02' },
      { label: 'Looks', value: '11' },
      { label: 'Assets', value: '36' },
    ],
  },
]

export const featuredProjects = projects.filter((project) => project.featured)