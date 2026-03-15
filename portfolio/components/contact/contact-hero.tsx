import Link from 'next/link'
import styles from './contact-hero.module.css'

/**
 * Hero section for the contact page.
 * Displays a full-viewport call-to-action with LinkedIn and form anchor links.
 */
export default function ContactHero() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>Prenons contact</h1>
        <p className={styles.subtitle}>
          N&apos;hésitez pas à me contacter pour une opportunité, <br />
          une question, ou simplement pour échanger.
        </p>
        <div className={styles.actions}>
          <a
            className={styles.btnLight}
            href="https://www.linkedin.com/in/ama%C3%AFa-mescco-88472a308/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Se connecter sur LinkedIn
          </a>
          <a className={styles.btnDark} href="#contact-form">
            Envoyer un message
          </a>
        </div>
      </div>
      <a className={styles.scroll} href="#contact-form" aria-label="Défiler vers le formulaire">
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <path d="M8 0v20M1 13l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </section>
  )
}
