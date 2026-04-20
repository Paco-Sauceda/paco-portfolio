import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollVideoHero.css'

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
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Scrub video currentTime with scroll — Apple style
  useEffect(() => {
    const video = videoRef.current
    const wrapper = wrapperRef.current
    if (!video || !wrapper) return

    // Wait for metadata so we know video duration
    const setup = () => {
      const duration = video.duration
      if (!duration) return

      // Scrub video with scroll
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          video.currentTime = self.progress * duration
        },
      })

      // Fade in opening text as user lands
      gsap.fromTo(
        '.svh__intro',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 },
      )

      // Intro text fades out as scroll starts
      gsap.to('.svh__intro', {
        opacity: 0,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: '20% top',
          scrub: true,
        },
      })

      // Mid text fades in then out
      gsap.fromTo(
        '.svh__mid',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: '25% top',
            end: '40% top',
            scrub: true,
          },
        },
      )
      gsap.to('.svh__mid', {
        opacity: 0,
        y: -24,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: '50% top',
          end: '65% top',
          scrub: true,
        },
      })

      // End CTA fades in at the bottom
      gsap.fromTo(
        '.svh__end',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: '72% top',
            end: '88% top',
            scrub: true,
          },
        },
      )
    }

    if (video.readyState >= 1) {
      setup()
    } else {
      video.addEventListener('loadedmetadata', setup, { once: true })
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [videoSrc])

  return (
    // Tall wrapper — scroll distance = how long the scrub lasts
    <div className="svh-wrapper" ref={wrapperRef}>
      {/* Sticky viewport that stays pinned while you scroll */}
      <div className="svh-sticky">
        {/* Video */}
        <video
          className="svh-video"
          muted
          playsInline
          poster={poster}
          preload="auto"
          ref={videoRef}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Dark gradient overlay */}
        <div className="svh-overlay" />

        {/* Opening title — visible at top */}
        <div className="svh-content svh__intro">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="svh-title">{title}</h1>
          <p className="svh-subtitle">{subtitle}</p>
        </div>

        {/* Mid text — appears mid-scroll */}
        <div className="svh-content svh-content--center svh__mid">
          <p className="svh-mid-text">Cada encuadre tiene intención.</p>
        </div>

        {/* End CTA — appears near bottom of scroll section */}
        <div className="svh-content svh-content--bottom svh__end">
          <div className="hero-actions">
            <Link className="button" to={ctaPrimaryTo}>
              {ctaPrimaryLabel}
            </Link>
            <Link className="button button-ghost" to={ctaSecondaryTo}>
              {ctaSecondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollVideoHero
