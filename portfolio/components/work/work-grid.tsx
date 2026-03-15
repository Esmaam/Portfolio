'use client'

import { useState } from 'react'
import ImageCarousel from './image-carousel'
import styles from './work-grid.module.css'

type ProjectDto = {
  idProject:    number
  name:         string
  contribution: string
  description:  string
}

type KeywordDto = {
  idKeyword: number
  text:      string
}

type ImageDto = {
  idImage:  number
  filename: string
}

type ProjectWithDetailsDto = {
  project:  ProjectDto
  keywords: KeywordDto[]
  images:   ImageDto[]
}

type Props = {
  projects: ProjectWithDetailsDto[]
}

/**
 * Filterable project grid with keyword filters and per-card image carousel.
 */
export default function WorkGrid({ projects }: Props) {
  const [activeFilter, setActiveFilter] = useState('Tous')

  const allKeywords = Array.from(
    new Set(projects.flatMap(p => p.keywords.map(k => k.text)))
  )

  const filtered = activeFilter === 'Tous'
    ? projects
    : projects.filter(p => p.keywords.some(k => k.text === activeFilter))

  return (
    <>
      <div className={styles.filters}>
        {['Tous', ...allKeywords].map(label => (
          <button
            key={label}
            className={`${styles.filterBtn} ${activeFilter === label ? styles.filterActive : ''}`}
            onClick={() => setActiveFilter(label)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map(({ project, keywords, images }) => (
          <div key={project.idProject} className={styles.card}>
            <ImageCarousel
              images={images.map(img => img.filename)}
              projectName={project.name}
            />
            <div className={styles.cardBody}>
              <div className={styles.cardName}>{project.name}</div>
              <div className={styles.cardContrib}>{project.contribution}</div>
              <p className={styles.cardDesc}>{project.description}</p>
              {keywords.length > 0 && (
                <div className={styles.tags}>
                  {keywords.map(k => (
                    <span key={k.idKeyword} className={styles.tag}>{k.text}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
