'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import styles from './navbar.module.css'

const NAV_LINKS = [
  { label: 'Accueil',    href: '/'        },
  { label: 'CV',         href: '/resume'  },
  { label: 'Contact',    href: '/contact' },
  { label: 'Projets →',  href: '/work'    },
]

/**
 * Fixed navigation bar with scroll-aware visibility.
 * Hides on scroll down, reveals on scroll up, always visible at page top.
 * Updates --nav-visible-height on :root so dependent elements (e.g. SubNav) can react.
 */
export default function Navbar() {
  const pathname = usePathname()
  const [isVisible, setIsVisible]   = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--nav-visible-height',
      isVisible ? 'var(--nav-height)' : '0px'
    )
  }, [isVisible])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY

      if (currentY < 80) {
        setIsVisible(true)
      } else if (currentY < lastScrollY.current) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsMenuOpen(false)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.navbar} ${isVisible ? '' : styles.hidden}`}>
      <div className={styles.inner}>
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className={`${styles.link} ${pathname === href ? styles.active : ''}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <button
        className={styles.hamburger}
        onClick={() => setIsMenuOpen(prev => !prev)}
        aria-label="Ouvrir le menu de navigation"
        aria-expanded={isMenuOpen}
      >
        <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen1 : ''}`} />
        <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen2 : ''}`} />
        <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen3 : ''}`} />
      </button>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`${styles.mobileLink} ${pathname === href ? styles.active : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
