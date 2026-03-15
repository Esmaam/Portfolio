import Link from 'next/link'
import type { Owner } from '@/models/owner.model'
import type { HeroMessage } from '@/models/hero-message.model'
import TypingText from './typing-text'
import styles from './hero-section.module.css'

type Props = {
  owner:        Owner
  heroMessages: HeroMessage[]
}

/**
 * Full-viewport hero section for the home page.
 * Displays the owner's name, a cycling typewriter headline from the database, and primary CTAs.
 */
export default function HeroSection({ owner, heroMessages }: Props) {
  const messages = heroMessages.length > 0
    ? heroMessages.map(m => m.text)
    : ['une développeuse désireuse de créer des solutions utiles et bien construites.']
  const initials = `${owner.firstName[0]}${owner.lastName[0]}`

  return (
    <section className={styles.section}>
      <div className={styles.avatar}>{initials}</div>
      <h1 className={styles.title}>
        Je suis {owner.firstName},{' '}
        <span className={styles.titleStrong}>
          <TypingText messages={messages} />
        </span>
      </h1>
      <p className={styles.sub}>Conceptrice-développeuse logiciel junior</p>
      <Link href="/contact" className={styles.btn}>Prenons contact</Link>
      <span className={styles.scrollHint} aria-hidden="true">↓</span>
    </section>
  )
}
