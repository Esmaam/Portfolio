import SubNav from '@/components/layout/sub-nav/sub-nav'

/**
 * Layout for the CV page.
 * Offsets content by --nav-height so SubNav sits flush below the fixed Navbar.
 */
export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 'var(--nav-height)' }}>
      <SubNav />
      {children}
    </div>
  )
}
