import Link from 'next/link'
import type { RoleWithDetails } from '@/dtos/role.dto'
import styles from './feature-section.module.css'

type Props = {
  featured: RoleWithDetails
}

/**
 * Spotlight section highlighting the owner's most recent professional role.
 */
export default function FeatureSection({ featured }: Props) {
  const { role, company, keywords } = featured

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.headline}>
          Mon expérience la plus récente{' '}
          <strong>au {company.name}</strong>
          {', '} en tant qu' 
          <strong>{role.title}.</strong>
        </h2>
        <div className={styles.company}>{company.name}</div>
        <div className={styles.roleTitle}>{role.title}</div>
        <p className={styles.desc}>{role.description}</p>
        {keywords.length > 0 && (
          <div className={styles.tags}>
            {keywords.map(k => (
              <span key={k.idKeyword} className={styles.tag}>{k.text}</span>
            ))}
          </div>
        )}
        <Link href="/resume" className={styles.btn}>Voir mon CV complet</Link>
      </div>
    </section>
  )
}
