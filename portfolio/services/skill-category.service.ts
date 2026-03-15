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
   * @returns {Promise<SkillCategory[]>} All skill categories.
   */
  async getAll(): Promise<SkillCategory[]> {
    return this.categoryRepository.getAll()
  }

  /**
   * Returns all skill categories enriched with their associated skills.
   * @returns {Promise<SkillCategoryWithSkills[]>} All categories with their skills.
   */
  async getAllWithSkills(): Promise<SkillCategoryWithSkills[]> {
    const categories = await this.categoryRepository.getAll()
    return Promise.all(
      categories.map(async category => ({
        category,
        skills: await this.skillRepository.getByCategory(category.idCategory),
      }))
    )
  }
}
