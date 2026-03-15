'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './image-carousel.module.css'

type Props = {
  images:      string[]
  projectName: string
}

/**
 * Image carousel for a project card.
 * Allows navigating through multiple images with previous/next controls.
 */
export default function ImageCarousel({ images, projectName }: Props) {
  const [index, setIndex] = useState(0)

  if (images.length === 0) {
    return <div className={styles.placeholder} />
  }

  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setIndex(i => (i + 1) % images.length)

  return (
    <div className={styles.wrapper}>
      <Image
        src={`/projects/${images[index]}`}
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
            {images.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
