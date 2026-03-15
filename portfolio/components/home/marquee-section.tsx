import type { Keyword } from '@/models/keyword.model'
import styles from './marquee-section.module.css'

type Props = {
  keywords: Keyword[]
}

/**
 * Horizontally scrolling marquee of keywords, displayed between sections.
 */
export default function MarqueeSection({ keywords }: Props) {
  const doubled = [...keywords, ...keywords]

  return (
    <div className={styles.bar}>
      <div className={styles.track}>
        {doubled.map((k, i) => (
          <span key={i} className={styles.item}>{k.text}</span>
        ))}
      </div>
    </div>
  )
}
