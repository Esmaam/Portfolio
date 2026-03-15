import { SkillCategoryRepository } from '@/repositories/skill-category.repository'
import { SkillRepository } from '@/repositories/skill.repository'
import type { SkillCategory } from '@/models/skill-category.model'
import type { Skill } from '@/models/skill.model'

export type SkillCategoryWithSkills = {
  category: SkillCategory
  skills:   Skill[]
}

/**
 * Business logic for the SkillCategory entity.
 */
export class SkillCategoryService {
  constructor(
    private readonly categoryRepository: SkillCategoryRepository,
    private readonly skillRepository:    SkillRepository,
  ) {}

  /**
   * Returns all skill categories.
   * @returns {SkillCategory[]} All skill categories.
   */
  getAll(): SkillCategory[] {
    return this.categoryRepository.getAll()
  }

  /**
   * Returns all skill categories enriched with their associated skills.
   * @returns {SkillCategoryWithSkills[]} All categories with their skills.
   */
  getAllWithSkills(): SkillCategoryWithSkills[] {
    const categories = this.categoryRepository.getAll()
    return categories.map(category => ({
      category,
      skills: this.skillRepository.getByCategory(category.idCategory),
    }))
  }
}
