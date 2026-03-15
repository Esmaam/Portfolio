import type { Owner } from '@/models/owner.model'
import styles from './about-section.module.css'

type Props = {
  owner: Owner
}

const LANGUAGES = [
  { name: 'Français',  level: 'Langue maternelle' },
  { name: 'Anglais',   level: 'Courant technique' },
  { name: 'Espagnol',  level: 'Intermédiaire' },
  { name: 'Chinois',   level: 'Notions' },
]

const INTERESTS = ['Jeux vidéo', 'Natation', 'Voyages et cultures du monde']

/**
 * About section of the CV page.
 * Displays owner identity, bio, languages and interests.
 */
export default function AboutSection({ owner }: Props) {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.initials}>
            {owner.firstName[0]}{owner.lastName[0]}
          </div>
          <div>
            <h1 className={styles.name}>{owner.firstName} {owner.lastName}</h1>
            <p className={styles.role}>Développeuse Polyvalente Junior</p>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.bio}>
            <p>
              Développeuse dans l&apos;innovation technologique appliquée à la santé.
              Assistante ingénieure en alternance depuis 1 an, recrutée après un stage en IA oncologique.
              Maîtrise du développement informatique au sens large&nbsp;: web, logiciel et intelligence artificielle.
              Compétences en gestion de projet, expertise en anglais technique.
            </p>
            <div className={styles.links}>
              <a href={`mailto:${owner.email}`} className={styles.link}>{owner.email}</a>
              {owner.linkedinProfileUrl && (
                <a href={owner.linkedinProfileUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          <div className={styles.aside}>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Langues</h3>
              <ul className={styles.langList}>
                {LANGUAGES.map(l => (
                  <li key={l.name} className={styles.langItem}>
                    <span className={styles.langName}>{l.name}</span>
                    <span className={styles.langLevel}>{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Centres d&apos;intérêt</h3>
              <p className={styles.interests}>{INTERESTS.join(' · ')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
