import type { Metadata } from 'next'
import { projectController }        from '@/controllers/project.controller'
import { keywordController }         from '@/controllers/keyword.controller'
import { keywordCategoryController } from '@/controllers/keyword-category.controller'
import WorkGrid       from '@/components/work/work-grid'
import MarqueeSection from '@/components/layout/marquee/marquee-section'
import styles from './work.module.css'

export const metadata: Metadata = {
  title: 'Projets – Amaïa Mescco',
}

/**
 * Work page — displays all projects in a filterable grid with image carousels.
 */
export default async function WorkPage() {
  const [projects, keywords, categories] = await Promise.all([
    projectController.getAllWithDetails(),
    keywordController.getAll(),
    keywordCategoryController.getAll(),
  ])

  const projectsDto = projects.map(({ project, keywords: kws, images }) => ({
    project: {
      idProject:    project.idProject,
      name:         project.name,
      contribution: project.contribution,
      description:  project.description,
    },
    keywords: kws.map(k => ({ idKeyword: k.idKeyword, text: k.text, idCategory: k.idCategory })),
    images:   images.map(i => ({ idImage: i.idImage, filename: i.filename })),
  }))

  const categoriesDto = categories.map(c => ({ idCategory: c.idCategory, name: c.name }))

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Quelques projets <span className={styles.muted}>sur lesquels</span>{' '}
          <strong>j&apos;ai travaillé.</strong>
        </h1>
      </section>

      <WorkGrid projects={projectsDto} categories={categoriesDto} />
      <MarqueeSection keywords={keywords} />
    </main>
  )
}
