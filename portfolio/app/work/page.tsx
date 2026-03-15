import type { Metadata } from 'next'
import { projectController } from '@/controllers/project.controller'
import { keywordController }  from '@/controllers/keyword.controller'
import WorkGrid       from '@/components/work/work-grid'
import MarqueeSection from '@/components/home/marquee-section'
import styles from './work.module.css'

export const metadata: Metadata = {
  title: 'Projets – Amaïa Mescco',
}

/**
 * Work page — displays all projects in a filterable grid with image carousels.
 */
export default async function WorkPage() {
  const [projects, keywords] = await Promise.all([
    projectController.getAllWithDetails(),
    keywordController.getAll(),
  ])

  const projectsDto = projects.map(({ project, keywords: kws, images }) => ({
    project: {
      idProject:    project.idProject,
      name:         project.name,
      contribution: project.contribution,
      description:  project.description,
    },
    keywords: kws.map(k => ({ idKeyword: k.idKeyword, text: k.text })),
    images:   images.map(i => ({ idImage: i.idImage, filename: i.filename })),
  }))

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Projets <span className={styles.muted}>sur lesquels</span>{' '}
          <strong>j&apos;ai travaillé.</strong>
        </h1>
      </section>

      <WorkGrid projects={projectsDto} />
      <MarqueeSection keywords={keywords} />
    </main>
  )
}
