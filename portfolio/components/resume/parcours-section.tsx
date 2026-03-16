import type { RoleWithDetails } from '@/services/role.service'
import type { Education } from '@/models/education.model'
import styles from './parcours-section.module.css'

type TimelineItem =
  | { kind: 'role';      date: string; label: string; sub: string; detail: string }
  | { kind: 'education'; date: string; label: string; sub: string; detail: string }

type Props = {
  roles:     RoleWithDetails[]
  education: Education[]
}

function formatYear(dateStr: string): string {
  return dateStr.slice(0, 4)
}

/**
 * Parcours section of the CV page.
 * Displays a chronological timeline combining professional roles and education.
 */
export default function ParcourSection({ roles, education }: Props) {
  const items: TimelineItem[] = [
    ...roles.map(({ role, company }) => ({
      kind:   'role' as const,
      date:   role.startDate,
      label:  company.name,
      sub:    role.title,
      detail: role.endDate ? `${formatYear(role.startDate)} – ${formatYear(role.endDate)}` : `Depuis ${formatYear(role.startDate)}`,
    })),
    ...education.map(e => ({
      kind:   'education' as const,
      date:   e.startDate,
      label:  e.establishment,
      sub:    e.degree,
      detail: e.endDate ? `${formatYear(e.startDate)} – ${formatYear(e.endDate)}` : `Depuis ${formatYear(e.startDate)}`,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <section id="parcours" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Parcours</h2>
        <p className={styles.intro}>
          Mon parcours est atypique, et c&apos;est précisément ce qui a forgé ma grande capacité d&apos;adaptation.
          Chaque étape ci-dessous a contribué à élargir ma perspective : sens du service, communication, gestion du stress, travail en équipe.
          Des compétences que je mets aujourd&apos;hui au service du développement.
        </p>
        <div className={styles.timeline}>
          {items.map((item, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemDot} data-kind={item.kind} />
              <div className={styles.itemContent}>
                <span className={styles.itemDate}>{item.detail}</span>
                <div className={styles.itemLabel}>{item.label}</div>
                <div className={styles.itemSub}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
