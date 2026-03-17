import type { SkillCategory } from '@/models/skill-category.model'
import type { Skill } from '@/models/skill.model'

export type SkillCategoryWithSkills = {
  category: SkillCategory
  skills:   Skill[]
}
