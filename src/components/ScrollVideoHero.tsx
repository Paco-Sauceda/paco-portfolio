import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollVideoHeroProps {
  eyebrow: string
  title: string
  subtitle: string
  ctaPrimaryLabel: string
  ctaPrimaryTo: string
  ctaSecondaryLabel: string
  ctaSecondaryTo: string
  videoSrc: string
  poster: string
}

function ScrollVideoHero({
  eyebrow,
  title,
  subtitle,
  ctaPrimaryLabel,
  ctaPrimaryTo,
  ctaSecondaryLabel,
  ctaSecondaryTo,
  videoSrc,
  poster,
}: ScrollVideoHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '.hero-copy > *',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
        },
      )

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
        .to('.hero-video-frame', { scale: 1.08, y: 80, ease: 'none' }, 0)
        .to('.hero-copy', { y: -72, opacity: 0.25, ease: 'none' }, 0)
    }, sectionRef)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section className="hero-section" ref={sectionRef}>
      <div className="hero-video-frame">
        <video autoPlay className="hero-video" loop muted playsInline poster={poster}>
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>

        <div className="hero-actions">
          <Link className="button" to={ctaPrimaryTo}>
            {ctaPrimaryLabel}
          </Link>
          <Link className="button button-ghost" to={ctaSecondaryTo}>
            {ctaSecondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ScrollVideoHero