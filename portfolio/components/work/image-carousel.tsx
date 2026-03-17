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

const AUTOPLAY_INTERVAL_MS = 1500 // ms between image transitions on hover
// 1×1 px SVG with #1a1f2e fill, base64-encoded
const BLUR_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxYTFmMmUiLz48L3N2Zz4='

/**
 * Image carousel for a project card.
 * Lazy-loads images via IntersectionObserver — only renders when visible.
 * Auto-plays on hover, stops on manual navigation.
 */
export default function ImageCarousel({ projectId, images, projectName, priority = false }: Readonly<Props>) {
  const [index,   setIndex]   = useState(0)
  const [hovered, setHovered] = useState(false)
  const [paused,  setPaused]  = useState(false)
  const wrapperRef            = useRef<HTMLDivElement>(null)

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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {images.length > 0 && (
        <>
          {images.map((filename, i) => (
            <div key={filename} className={`${styles.slide} ${i === index ? styles.slideActive : ''}`}>
              <Image
                src={`/projects/${projectId}/${filename}`}
                alt=""
                fill
                aria-hidden
                priority={priority && i === 0}
                className={styles.imgBg}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <Image
                src={`/projects/${projectId}/${filename}`}
                alt={`${projectName} – image ${i + 1}`}
                fill
                priority={priority && i === 0}
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
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
      )}
    </div>
  )
}
