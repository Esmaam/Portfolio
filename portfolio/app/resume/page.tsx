import type { Metadata } from 'next'
import { ownerController }        from '@/controllers/owner.controller'
import { roleController }          from '@/controllers/role.controller'
import { projectController }       from '@/controllers/project.controller'
import { skillCategoryController } from '@/controllers/skill-category.controller'
import { educationController }     from '@/controllers/education.controller'
import AboutSection      from '@/components/resume/about-section'
import ExperienceSection from '@/components/resume/experience-section'
import ProjectsSection   from '@/components/resume/projects-section'
import ParcourSection    from '@/components/resume/parcours-section'
import BackgroundSection from '@/components/resume/background-section'

export const metadata: Metadata = {
  title: 'CV – Amaïa Mescco',
}

/**
 * CV page — assembles all resume sections with data fetched from the database.
 */
export default async function ResumePage() {
  const [owner, roles, projects, categories, education] = await Promise.all([
    ownerController.getOwner(),
    roleController.getVisibleWithDetails(),
    projectController.getAllWithKeywords(),
    skillCategoryController.getAllWithSkills(),
    educationController.getAll(),
  ])

  const categoriesDto = categories.map(({ category, skills }) => ({
    category: { idCategory: category.idCategory, title: category.title },
    skills: skills.map(s => ({
      idSkill: s.idSkill, title: s.title, tagline: s.tagline, description: s.description,
    })),
  }))

  return (
    <main>
      <AboutSection      owner={owner} />
      <ExperienceSection roles={roles} />
      <ProjectsSection   projects={projects} />
      <ParcourSection    roles={roles} education={education} />
      <BackgroundSection categories={categoriesDto} />
    </main>
  )
}
