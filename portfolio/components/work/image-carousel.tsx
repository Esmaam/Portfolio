'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './image-carousel.module.css'

type Props = {
  projectId:   number
  images:      string[]
  projectName: string
  priority?:   boolean
}

const VISIBILITY_THRESHOLD = 0    // start loading as soon as the element enters the DOM
const AUTOPLAY_INTERVAL_MS = 1500 // ms between image transitions on hover

/**
 * Image carousel for a project card.
 * Lazy-loads images via IntersectionObserver — only renders when visible.
 * Auto-plays on hover, stops on manual navigation.
 */
export default function ImageCarousel({ projectId, images, projectName, priority = false }: Readonly<Props>) {
  const [index,   setIndex]   = useState(0)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [paused,  setPaused]  = useState(false)
  const wrapperRef            = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: VISIBILITY_THRESHOLD }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hovered || paused || images.length <= 1) return
    const interval = setInterval(() => setIndex(i => (i + 1) % images.length), AUTOPLAY_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [hovered, paused, images.length])

  function prev() {
    setPaused(true)
    setIndex(i => (i - 1 + images.length) % images.length)
  }

  function next() {
    setPaused(true)
    setIndex(i => (i + 1) % images.length)
  }

  function handleMouseLeave() {
    setHovered(false)
    setPaused(false)
    setIndex(0)
  }

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      role="presentation"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {visible && images.length > 0 ? (
        <>
          {images.map((filename, i) => (
            <div key={filename} className={`${styles.slide} ${i === index ? styles.slideActive : ''}`}>
              <Image
                src={`/projects/${projectId}/${filename}`}
                alt={`${projectName} – image ${i + 1}`}
                fill
                priority={priority && i === 0}
                className={styles.img}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          ))}
          {images.length > 1 && (
            <>
              <button className={`${styles.btn} ${styles.btnPrev}`} onClick={prev} aria-label="Image précédente">‹</button>
              <button className={`${styles.btn} ${styles.btnNext}`} onClick={next} aria-label="Image suivante">›</button>
              <div className={styles.dots}>
                {images.map((filename, i) => (
                  <button
                    key={filename}
                    className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                    onClick={() => { setPaused(true); setIndex(i) }}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className={styles.placeholder} />
      )}
    </div>
  )
}
