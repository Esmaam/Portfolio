'use client'

import { useState } from 'react'
import ImageCarousel from './image-carousel'
import styles from './work-grid.module.css'

type CategoryDto = {
  idCategory: number
  name:       string
}

type KeywordDto = {
  idKeyword:  number
  text:       string
  idCategory: number | null
}

type ProjectDto = {
  idProject:    number
  name:         string
  contribution: string
  description:  string
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
  projects:   ProjectWithDetailsDto[]
  categories: CategoryDto[]
}

/**
 * Filterable project grid — category row then keyword chips, then project cards.
 */
export default function WorkGrid({ projects, categories }: Props) {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null)
  const [activeKeywordId,  setActiveKeywordId]  = useState<number | null>(null)

  // Keywords visible in the second row — those belonging to the active category
  // and actually used by at least one project
  const usedKeywordIds = new Set(projects.flatMap(p => p.keywords.map(k => k.idKeyword)))

  const visibleKeywords = activeCategoryId === null
    ? []
    : projects
        .flatMap(p => p.keywords)
        .filter(k => k.idCategory === activeCategoryId && usedKeywordIds.has(k.idKeyword))
        .reduce<KeywordDto[]>((acc, k) => {
          if (!acc.some(x => x.idKeyword === k.idKeyword)) acc.push(k)
          return acc
        }, [])

  const filtered = projects.filter(p =>
    activeCategoryId === null ||
    (p.keywords.some(k => k.idCategory === activeCategoryId) &&
      (activeKeywordId === null || p.keywords.some(k => k.idKeyword === activeKeywordId)))
  )

  function selectCategory(id: number | null) {
    setActiveCategoryId(id)
    setActiveKeywordId(null)
  }

  function selectKeyword(id: number) {
    setActiveKeywordId(prev => (prev === id ? null : id))
  }

  return (
    <>
      {/* Category row */}
      <div className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${activeCategoryId === null ? styles.filterActive : ''}`}
          onClick={() => selectCategory(null)}
        >
          Tous
        </button>
        {categories.map(cat => (
          <button
            key={cat.idCategory}
            className={`${styles.filterBtn} ${activeCategoryId === cat.idCategory ? styles.filterActive : ''}`}
            onClick={() => selectCategory(cat.idCategory)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Keyword row — only visible when a category is selected */}
      {visibleKeywords.length > 0 && (
        <div className={styles.keywordFilters}>
          {visibleKeywords.map(k => (
            <button
              key={k.idKeyword}
              className={`${styles.keywordBtn} ${activeKeywordId === k.idKeyword ? styles.keywordActive : ''}`}
              onClick={() => selectKeyword(k.idKeyword)}
            >
              {k.text}
            </button>
          ))}
        </div>
      )}

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
