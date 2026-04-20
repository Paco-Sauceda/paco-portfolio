import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollVideoHero.css'

gsap.registerPlugin(ScrollTrigger)

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function ScrollVideoHero({
  videoSrc,
  poster,
  name = 'Paco Sauceda',
  subtitle = 'Fotografia y videografia con direccion cinematografica.',
}) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const textRef = useRef(null)

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current
    const videoEl = videoRef.current
    const textEl = textRef.current

    if (!sectionEl || !videoEl || !textEl) {
      return undefined
    }

    let videoDuration = Number.isFinite(videoEl.duration) ? videoEl.duration : 0

    const syncVideoToScroll = (progress) => {
      if (!videoDuration) {
        return
      }

      const safeProgress = clamp(progress, 0, 1)
      const targetTime = safeProgress * videoDuration * 0.999

      if (Math.abs(videoEl.currentTime - targetTime) > 0.016) {
        videoEl.currentTime = targetTime
      }
    }

    const onLoadedMetadata = () => {
      videoDuration = Number.isFinite(videoEl.duration) ? videoEl.duration : 0
      ScrollTrigger.refresh()
    }

    if (videoEl.readyState >= 1) {
      onLoadedMetadata()
    } else {
      videoEl.addEventListener('loadedmetadata', onLoadedMetadata)
    }

    const context = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: '+=220%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            syncVideoToScroll(self.progress)
          },
        },
      }).to(
        textEl,
        {
          opacity: 0.45,
          yPercent: -10,
        },
        0,
      )
    }, sectionEl)

    return () => {
      videoEl.removeEventListener('loadedmetadata', onLoadedMetadata)
      context.revert()
    }
  }, [])

  return (
    <section className="svh" ref={sectionRef}>
      <div className="svh__media" aria-hidden="true">
        <video
          ref={videoRef}
          className="svh__video"
          src={videoSrc}
          poster={poster}
          muted
          playsInline
          preload="auto"
        />
        <div className="svh__overlay" />
      </div>

      <div className="svh__content" ref={textRef}>
        <p className="svh__eyebrow">Visual Storytelling</p>
        <h1 className="svh__name">{name}</h1>
        <p className="svh__subtitle">{subtitle}</p>
      </div>
    </section>
  )
}

export default ScrollVideoHero
