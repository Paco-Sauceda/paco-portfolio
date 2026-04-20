import { useEffect, useState } from 'react'
import FeaturedProjects from '../components/FeaturedProjects'
import ScrollVideoHero from '../components/ScrollVideoHero'
import StatsSection from '../components/StatsSection'
import { featuredProjects } from '../data/projects'
import type { Project } from '../types/project'
import { getFeaturedProjects, getSiteStats } from '../lib/supabaseClient'

const fallbackStats = [
  {
    value: '40+',
    label: 'Producciones entregadas',
    detail: 'Moda, retrato, hospitality y contenido premium para marcas.',
  },
  {
    value: '06',
    label: 'Anios afinando lenguaje visual',
    detail: 'Direccion sobria, iluminacion precisa y edicion contenida.',
  },
  {
    value: 'Foto + Video',
    label: 'Cobertura hibrida',
    detail: 'Una misma narrativa adaptada a editorial, social y lanzamiento.',
  },
]

function Home() {
  const [projectsData, setProjectsData] = useState<Project[]>(featuredProjects)
  const [statsData, setStatsData] = useState(fallbackStats)

  useEffect(() => {
    let isMounted = true

    const loadHomeData = async () => {
      const [projectsResult, statsResult] = await Promise.all([
        getFeaturedProjects(3),
        getSiteStats(),
      ])

      if (!isMounted) {
        return
      }

      if (projectsResult.data && projectsResult.data.length > 0) {
        setProjectsData(projectsResult.data)
      }

      if (statsResult.data && statsResult.data.length > 0) {
        setStatsData(statsResult.data)
      }
    }

    void loadHomeData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <ScrollVideoHero
        ctaPrimaryLabel="Ver proyectos"
        ctaPrimaryTo="/portfolio"
        ctaSecondaryLabel="Hablemos"
        ctaSecondaryTo="/contacto"
        eyebrow="Portafolio premium"
        poster="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
        subtitle="Fotografia y videografia con una sensibilidad oscura, minimalista y cinematografica para marcas, artistas y editoriales."
        title="Imagen que respira lujo, tension y presencia."
        videoSrc="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
      />

      <section className="section-block intro-shell">
        <div className="container intro-grid">
          <div className="section-copy-block">
            <span className="eyebrow">Direccion visual</span>
            <h2>Narrativas visuales sobrias, elegantes y precisas.</h2>
          </div>
          <p className="lead-copy">
            Trabajo desde concepto, captura y acabado final para construir material con valor de
            marca. Menos ruido, mejor ritmo, decisiones visuales intencionales.
          </p>
        </div>
      </section>

      <FeaturedProjects projects={projectsData} />
      <StatsSection items={statsData} />
    </>
  )
}

export default Home