import { ownerController }        from '@/controllers/owner.controller'
import { heroMessageController }   from '@/controllers/hero-message.controller'
import { roleController }          from '@/controllers/role.controller'
import { skillCategoryController } from '@/controllers/skill-category.controller'
import { keywordController }       from '@/controllers/keyword.controller'
import HeroSection    from '@/components/home/hero-section'
import PillarsSection from '@/components/home/pillars-section'
import SkillsSection  from '@/components/home/skills-section'
import FeatureSection from '@/components/home/feature-section'
import MarqueeSection from '@/components/layout/marquee/marquee-section'

/**
 * Home page — assembles all homepage sections with data fetched from the database.
 */
export default async function HomePage() {
  const [owner, heroMessages, allFeatured, categories, keywords] = await Promise.all([
    ownerController.getOwner(),
    heroMessageController.getAll(),
    roleController.getFeatured(1),
    skillCategoryController.getAllWithSkills(),
    keywordController.getAll(),
  ])

  return (
    <main>
      <HeroSection    owner={owner} heroMessages={heroMessages} />
      <PillarsSection />
      <SkillsSection  categories={categories} />
      {allFeatured[0] && <FeatureSection featured={allFeatured[0]} />}
      <MarqueeSection keywords={keywords} />
    </main>
  )
}
