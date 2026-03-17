'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './image-carousel.module.css'

type Props = {
  projectId:   number
  images:      string[]
  projectName: string
}

const VISIBILITY_THRESHOLD  = 0.1  // % of the element visible before loading images
const AUTOPLAY_INTERVAL_MS  = 1500 // ms between image transitions on hover

/**
 * Image carousel for a project card.
 * Lazy-loads images via IntersectionObserver — only renders when visible.
 */
export default function ImageCarousel({ projectId, images, projectName }: Readonly<Props>) {
  const [index, setIndex]       = useState(0)
  const [visible, setVisible]   = useState(false)
  const [hovered, setHovered]   = useState(false)
  const wrapperRef              = useRef<HTMLDivElement>(null)

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
    if (!hovered || images.length <= 1) return
    const interval = setInterval(() => setIndex(i => (i + 1) % images.length), AUTOPLAY_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [hovered, images.length])

  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setIndex(i => (i + 1) % images.length)

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      role="presentation"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setIndex(0) }}
    >
      {visible && images.length > 0 ? (
        <>
          <Image
            src={`/projects/${projectId}/${images[index]}`}
            alt={`${projectName} – image ${index + 1}`}
            fill
            className={styles.img}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          {images.length > 1 && (
            <>
              <button className={`${styles.btn} ${styles.btnPrev}`} onClick={prev} aria-label="Image précédente">‹</button>
              <button className={`${styles.btn} ${styles.btnNext}`} onClick={next} aria-label="Image suivante">›</button>
              <div className={styles.dots}>
                {images.map((filename, i) => (
                  <button
                    key={filename}
                    className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                    onClick={() => setIndex(i)}
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
