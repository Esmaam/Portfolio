import { ownerController }        from '@/controllers/owner.controller'
import { heroMessageController }   from '@/controllers/hero-message.controller'
import { roleController }          from '@/controllers/role.controller'
import { skillCategoryController } from '@/controllers/skill-category.controller'
import { keywordController }       from '@/controllers/keyword.controller'
import HeroSection    from '@/components/home/hero-section'
import PillarsSection from '@/components/home/pillars-section'
import RolesSection   from '@/components/home/roles-section'
import SkillsSection  from '@/components/home/skills-section'
import FeatureSection from '@/components/home/feature-section'
import MarqueeSection from '@/components/home/marquee-section'

/**
 * Home page — assembles all homepage sections with data fetched from the database.
 */
export default function HomePage() {
  const owner         = ownerController.getOwner()
  const heroMessages  = heroMessageController.getAll()
  const featuredRoles = roleController.getFeatured(2)
  const allFeatured   = roleController.getFeatured(1)
  const categories    = skillCategoryController.getAllWithSkills()
  const keywords      = keywordController.getAll()

  return (
    <main>
      <HeroSection    owner={owner} heroMessages={heroMessages} />
      <PillarsSection />
      <RolesSection   roles={featuredRoles} />
      <SkillsSection  categories={categories} />
      {allFeatured[0] && <FeatureSection featured={allFeatured[0]} />}
      <MarqueeSection keywords={keywords} />
    </main>
  )
}
