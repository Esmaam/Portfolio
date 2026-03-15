import type { ProjectWithKeywords } from '@/services/project.service'
import styles from './projects-section.module.css'

type Props = {
  projects: ProjectWithKeywords[]
}

/**
 * Projects section of the CV page.
 * Displays all projects with their description and associated keywords.
 */
export default function ProjectsSection({ projects }: Props) {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Projets</h2>
        <div className={styles.grid}>
          {projects.map(({ project, keywords }) => (
            <div key={project.idProject} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.projectName}>{project.name}</div>
                <div className={styles.contribution}>{project.contribution}</div>
              </div>
              <p className={styles.description}>{project.description}</p>
              {keywords.length > 0 && (
                <div className={styles.tags}>
                  {keywords.map(k => (
                    <span key={k.idKeyword} className={styles.tag}>{k.text}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
