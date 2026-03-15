import type { Education } from '@/models/education.model'
import styles from './education-section.module.css'

type Props = {
  education: Education[]
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Présent'
  const [year, month] = dateStr.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
}

/**
 * Education section of the CV page.
 * Lists all education entries with establishment, degree and dates.
 */
export default function EducationSection({ education }: Props) {
  return (
    <section id="education" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Formation</h2>
        <div className={styles.list}>
          {education.map(entry => (
            <div key={entry.idEducation} className={styles.entry}>
              <div className={styles.entryMeta}>
                <span className={styles.dates}>
                  {formatDate(entry.startDate)} — {formatDate(entry.endDate)}
                </span>
              </div>
              <div className={styles.entryBody}>
                <div className={styles.establishment}>{entry.establishment}</div>
                <div className={styles.degree}>{entry.degree}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
