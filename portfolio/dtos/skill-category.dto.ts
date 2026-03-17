import type { SkillCategory } from '@/models/skill-category.model'
import type { Skill } from '@/models/skill.model'

/** Skill category with its associated skills — used for the skills section. */
export type SkillCategoryWithSkills = {
  category: SkillCategory
  skills:   Skill[]
}
