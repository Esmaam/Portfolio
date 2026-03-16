import Link from 'next/link'
import type { RoleWithDetails } from '@/services/role.service'
import styles from './roles-section.module.css'

type Props = {
  roles: RoleWithDetails[]
}

/**
 * Section displaying featured professional roles from the database.
 */
export default function RolesSection({ roles }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {roles.map(({ role, company }) => (
            <div key={role.idRole} className={styles.card}>
              <div className={styles.company}>{company.name}</div>
              <div className={styles.roleTitle}>{role.title}</div>
              <div className={styles.tagline}>{role.tagline}</div>
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          <Link href="/resume" className={styles.btn}>Voir toutes mes expériences</Link>
        </div>
      </div>
    </section>
  )
}
