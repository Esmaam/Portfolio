import type { RoleWithDetails } from '@/services/role.service'
import styles from './experience-section.module.css'

type Props = {
  roles: RoleWithDetails[]
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Présent'
  const [year, month] = dateStr.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
}

/**
 * Experience section of the CV page.
 * Lists all visible professional roles with company, dates, description and keywords.
 */
export default function ExperienceSection({ roles }: Props) {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Expérience</h2>
        <div className={styles.list}>
          {roles.map(({ role, company, keywords }) => (
            <div key={role.idRole} className={styles.entry}>
              <div className={styles.entryMeta}>
                <span className={styles.dates}>
                  {formatDate(role.startDate)} — {formatDate(role.endDate)}
                </span>
                <span className={styles.city}>{role.city}</span>
              </div>
              <div className={styles.entryBody}>
                <div className={styles.company}>{company.name}</div>
                <div className={styles.roleTitle}>{role.title}</div>
                <p className={styles.description}>{role.description}</p>
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
      </div>
    </section>
  )
}
