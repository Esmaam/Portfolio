import type { SkillCategoryWithSkills } from '@/dtos/skill-category.dto'
import styles from './skills-section.module.css'

type Props = {
  categories: SkillCategoryWithSkills[]
}

/**
 * Section displaying skill categories and their associated skills from the database.
 */
export default function SkillsSection({ categories }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.headline}>
          J&apos;ai travaillé sur des{' '}
          <strong>applications dans divers domaines</strong>{' '}
          <span className={styles.muted}>et technologies.</span>
        </h2>
        <div className={styles.grid}>
          {categories.map(({ category, skills }) => (
            <div key={category.idCategory} className={styles.card}>
              <div className={styles.cardTitle}>{category.title}</div>
              <p className={styles.cardSkills}>
                {skills.map(s => s.title).join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
