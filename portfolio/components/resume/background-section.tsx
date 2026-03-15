'use client'

import { useState } from 'react'
import styles from './background-section.module.css'

type SkillDto = {
  idSkill:     number
  title:       string
  tagline:     string
  description: string
}

type CategoryDto = {
  idCategory: number
  title:      string
}

type CategoryWithSkillsDto = {
  category: CategoryDto
  skills:   SkillDto[]
}

type Props = {
  categories: CategoryWithSkillsDto[]
}

/**
 * Background section of the CV page.
 * Displays skill categories as tabs; clicking a tab shows its associated skills.
 */
export default function BackgroundSection({ categories }: Props) {
  const [activeId, setActiveId] = useState(categories[0]?.category.idCategory ?? 0)

  const activeCategory = categories.find(c => c.category.idCategory === activeId)

  return (
    <section id="background" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Compétences</h2>
        <div className={styles.tabs}>
          {categories.map(({ category }) => (
            <button
              key={category.idCategory}
              className={`${styles.tab} ${activeId === category.idCategory ? styles.tabActive : ''}`}
              onClick={() => setActiveId(category.idCategory)}
            >
              {category.title}
            </button>
          ))}
        </div>
        {activeCategory && (
          <div className={styles.skills}>
            {activeCategory.skills.map(skill => (
              <div key={skill.idSkill} className={styles.skillCard}>
                <div className={styles.skillTitle}>{skill.title}</div>
                <div className={styles.skillTagline}>{skill.tagline}</div>
                <p className={styles.skillDesc}>{skill.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
