import styles from './pillars-section.module.css'

const PILLARS = [
  {
    title: 'Conception',
    desc:  'Je traduis un besoin en expériences utilisateur claires, en appliquant les principes d\'architecture logicielle.',
  },
  {
    title: 'Développement',
    desc:  'Je construis des applications maintenables, suivant une conception, avec une appétance particulière pour le back-end.',
  },
  {
    title: 'Validation',
    desc:  'Je garantis une qualité logiciel par des tests fonctionnels et unitaires, ainsi que des revues de code accompagnées d\'une démarche rigoureuse.',
  },
]

/**
 * Static section presenting the three pillars of the owner's expertise.
 */
export default function PillarsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.headline}>
          J’accorde une attention particulière à la conception d’applications <strong>utiles, maintenables</strong>,{' '}
          et pensées pour répondre à un besoin, avec <strong>méthode et rigueur</strong>.
        </h2>
        <div className={styles.grid}>
          {PILLARS.map(pillar => (
            <div key={pillar.title} className={styles.card}>
              <div className={styles.cardTitle}>{pillar.title}</div>
              <p className={styles.cardDesc}>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
