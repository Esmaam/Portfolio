'use client'

import { useEffect, useState } from 'react'
import styles from './sub-nav.module.css'

const SUB_NAV_LINKS = [
  { label: 'À propos',   sectionId: 'about'      },
  { label: 'Expérience', sectionId: 'experience' },
  { label: 'Projets',    sectionId: 'projects'      },
  { label: 'Parcours',   sectionId: 'background' },
  { label: 'Formation',  sectionId: 'education'  },
]

/**
 * Secondary navigation bar for the CV page.
 * Tracks active section via IntersectionObserver and highlights the corresponding link.
 * Stays visible at all times — sticks below the main Navbar using --nav-visible-height.
 */
export default function SubNav() {
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    SUB_NAV_LINKS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className={styles.subNav} aria-label="Sections du CV">
      {SUB_NAV_LINKS.map(({ label, sectionId }) => (
        <a
          key={sectionId}
          href={`#${sectionId}`}
          className={`${styles.link} ${activeSection === sectionId ? styles.active : ''}`}
        >
          {label}
        </a>
      ))}
    </nav>
  )
}
