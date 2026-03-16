import Link from 'next/link'
import styles from './footer.module.css'

/**
 * Site-wide footer with owner identity and navigation links.
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <span className={styles.name}>Amaïa Mescco</span>
        <span className={styles.separator}>/</span>
        Conception, Développement &amp; Validation · Conceptrice-développeuse junior
      </div>
      <div className={styles.links}>
        <a
          href="https://github.com/Esmaam/Portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/ama%C3%AFa-mescco-88472a308/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <Link href="/resume">CV</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </footer>
  )
}
