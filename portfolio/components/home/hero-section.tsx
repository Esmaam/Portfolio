import Link from 'next/link'
import Image from 'next/image'
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

  return (
    <section className={styles.section}>
      <Image
        src="/avatar.jpg"
        alt={`${owner.firstName} ${owner.lastName}`}
        width={100}
        height={100}
        className={styles.avatar}
        priority
      />
      <h1 className={styles.title}>
        Je suis {owner.firstName},{' '}
        <span className={styles.titleStrong}>
          <TypingText messages={messages} />
        </span>
      </h1>
      <p className={styles.sub}>Conceptrice-développeuse logiciel junior</p>
      <Link href="/work" className={styles.btn}>Voir mes projets</Link>
      <span className={styles.scrollHint} aria-hidden="true">↓</span>
    </section>
  )
}
